import { max } from 'd3'
import Note from '../types/Note.js'
import GuitarNote from '../types/GuitarNote.js'
import { getMidiNoteByNameAndOctave } from './Midi.js'
import { roundToNDecimals } from '../utils/MathUtils.js'
// import DrumNote from '../types/DrumNote.js';

/**
 * @module fileFormats/MusicXmlParser
 */

// Precision in number of digits when rounding seconds
const ROUNDING_PRECISION = 5

/**
 * Converts a collection of MusicXML measures to JavaScript Objects with timing information in seconds.
 * Also calculates the position of measure lines and the total time in seconds.
 *
 * @param {XMLDocument} xml MusicXML document
 * @param {boolean} log set to true to log results etc. to the console
 * @returns {object} parsed document
 */
export function preprocessMusicXmlData (xml, log = false) {
  if (log) {
    console.groupCollapsed('[MusicXmlParser] Parsing MusicXML')
    console.log(xml)
  }
  // Get part and instrument names
  const partNameElements = xml.querySelectorAll('part-name')
  const instruments = xml.querySelectorAll('score-instrument')
  const partNames = []
  const instrumentNames = []
  for (const p of partNameElements) {
    partNames.push(p.innerHTML)
  }
  for (const index of instruments) {
    instrumentNames.push(index.children[0].innerHTML)
  }
  // Get instrument definitions
  const drumInstrumentMap = getDrumInstrumentMap(xml)
  // Preprocess notes
  const parts = xml.querySelectorAll('part')
  const parsedParts = []
  for (const part of parts) {
    parsedParts.push(preprocessMusicXmlPart(part, drumInstrumentMap))
  }
  const result = {
    parts: parsedParts,
    partNames,
    instruments: instrumentNames,
    totalTime: max(parsedParts, d => d.totalTime)
  }
  if (log) {
    console.log(result)
    console.groupEnd()
  }
  return result
}

/**
 * Converts a collection of MusicXML measures to JavaScript Objects with timing information in seconds.
 * Also calculates the position of measure lines and the total time in seconds.
 *
 * @private
 * @param {HTMLElement} part MusicXML part
 * @param {Map} drumInstrumentMap midiPitch = map.get(partId).get(instrId)
 * @returns {object} parsed measures
 */
function preprocessMusicXmlPart (part, drumInstrumentMap) {
  // Handle Guitar sheets with stave and tab (so dublicate notes)
  part = handleStaveAndTab(part)
  // Handle repetitions by duplicating measures
  let measures = part.children
  measures = duplicateRepeatedMeasures(measures)

  // For each parsed note, store the corresponding XML notes
  const xmlNotes = part.querySelectorAll('note')
  const xmlNoteIndexMap = new Map([...xmlNotes].map((d, i) => [d, i]))
  const xmlNoteIndices = []

  let currentTime = 0
  let divisions
  let tempo = 120
  let beats = 4
  let beatType = 4
  // Default velocity is 90 https://www.musicxml.com/tutorial/the-midi-compatible-part/sound-suggestions/
  const defaultVelocity = 90
  const velocityFactor = 64 / 71
  let velocity = Math.round(defaultVelocity * velocityFactor)

  // Handle changing tempo and beat type
  const tempoChanges = []
  const beatTypeChanges = []
  const keySignatureChanges = []
  const noteObjs = []
  const measureRehearsalMap = new Map()
  const noteLyricsMap = new Map()
  // Time in seconds of the start of new measures
  const measureLinePositions = []
  // Indices of notes where a new measure starts
  const measureIndices = []
  for (const measure of measures) {
    const currentTimeRounded = roundToNDecimals(currentTime, ROUNDING_PRECISION)
    // Try to update metrics (if they are not set, keep the old ones)
    try {
      const soundElements = measure.querySelectorAll('sound')
      // eslint-disable-next-line
      for (const element of soundElements) {
        const tempoValue = element.getAttribute('tempo')
        if (tempoValue !== null) {
          tempo = roundToNDecimals(+tempoValue, 3)
          tempoChanges.push({
            time: currentTimeRounded,
            tempo
          })
        }
        // TODO: this only support one tempo change per measure!
        // TODO: tempo changes that are not at the measure start will be false
        // TODO: solution: go trough all children of measure: notes and other children
        // notes will update the time
        break
      }
    } catch { }
    try {
      divisions = +measure.querySelectorAll('divisions')[0].innerHTML
    } catch { }
    try {
      beats = +measure.querySelectorAll('beats')[0].innerHTML
      beatType = +measure.querySelectorAll('beat-type')[0].innerHTML
      beatTypeChanges.push({
        time: currentTimeRounded,
        beats,
        beatType
      })
    } catch { }
    const secondsPerBeat = 1 / (tempo / 60)
    try {
      const fifths = +measure.querySelectorAll('fifths')[0].innerHTML
      const { key, scale } = keySignatureMap.get(fifths)
      keySignatureChanges.push({
        time: currentTimeRounded,
        key,
        scale
      })
    } catch { }

    // If measure is empty, still increase currentTime
    if (measure.querySelectorAll('note').length === 0) {
      const measureDuration = beats * (beatType / 4) * secondsPerBeat
      currentTime += measureDuration
    }

    // Read notes
    let lastNoteDuration = 0
    for (const child of measure.children) {
      if (child.nodeName === 'backup') {
        // Handle backup, which reduces the current time to handle multiple staves
        const duration = +child.querySelectorAll('duration')[0].innerHTML
        const durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat)
        currentTime -= durationInSeconds
      } else if (child.nodeName === 'forward') {
        // Forward is inverse of backward
        const duration = +child.querySelectorAll('duration')[0].innerHTML
        const durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat)
        currentTime += durationInSeconds
      } else if (child.nodeName === 'direction') {
        // Handle directions such as dynamics
        for (const direction of child.children) {
          if (direction.nodeName === 'sound' && direction.getAttribute('dynamics')) {
            // Dynamics: convert number...
            // https://www.musicxml.com/tutorial/the-midi-compatible-part/sound-suggestions/
            velocity = Math.round(velocityFactor * +direction.getAttribute('dynamics'))
          }
          if (child.querySelectorAll('rehearsal').length > 0) {
            // Reheasal marks (used as section indicators by GuitarPro)
            const rehearsals = child.querySelectorAll('rehearsal')
            const marks = []
            for (const r of rehearsals) {
              if (r.textContent !== '') {
                marks.push(r.textContent)
              }
            }
            if (marks.length > 0) {
              let text = marks.join(' ')
              const measureIndex = measureIndices.length
              if (measureRehearsalMap.has(measureIndex)) {
                const oldText = measureRehearsalMap.get(measureIndex)
                text = `${oldText} ${text}`
              }
              measureRehearsalMap.set(measureIndex, text)
            }
          }
          // TODO: handle others, e.g. tempo
          // if (direction.nodeName === 'sound' && direction.getAttribute('tempo')) {
          //     const tempoValue = Math.round(+direction.getAttribute('tempo'));
          //     tempo = roundToNDecimals(tempoValue, 3);
          //     tempoChanges.push({
          //         time: roundToNDecimals(currentTime, ROUNDING_PRECISION),
          //         tempo,
          //     });
          // }
        }
      } else if (child.nodeName === 'note') {
        const note = child

        try {
          // Get note duration in seconds
          let durationInSeconds
          // Handle grace notes
          if (note.querySelectorAll('grace').length > 0) {
            // Take duration from type
            const type = note.querySelectorAll('type').textContent
            if (type === '64th') {
              durationInSeconds = secondsPerBeat / 16
            } else if (type === '32nd') {
              durationInSeconds = secondsPerBeat / 8
            } else if (type === '16th') {
              durationInSeconds = secondsPerBeat / 4
            } else if (type === 'eighth') {
              durationInSeconds = secondsPerBeat / 2
            } else if (type === 'quarter') {
              durationInSeconds = secondsPerBeat
            } else if (type === 'half') {
              durationInSeconds = secondsPerBeat * 2
            } else {
              // TODO: better fallback solution?
              durationInSeconds = 0.01
            }
          } else {
            const duration = +note.querySelectorAll('duration')[0].innerHTML
            durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat)
          }

          // Do not create note object for rests, only increase time
          const isRest = note.querySelectorAll('rest').length > 0
          if (isRest) {
            currentTime += durationInSeconds
            continue
          }
          const isUnpitched = note.querySelectorAll('unpitched').length > 0
          let pitch
          if (isUnpitched) {
            // Handle drum notes
            const instrumentId = note.querySelectorAll('instrument')[0].id
            pitch = drumInstrumentMap.get(part.id).get(instrumentId)
          } else {
            // Get MIDI pitch
            // Handle <alter> tag for accidentals
            const alter = +(note.querySelectorAll('alter')[0]?.innerHTML ?? 0)
            const step = note.querySelectorAll('step')[0].innerHTML
            const octave = +note.querySelectorAll('octave')[0].innerHTML
            pitch = getMidiNoteByNameAndOctave(step, octave).pitch + alter
          }
          // TODO: Handle dynamics defined as tag inside a note
          const dynamicsTag = note.querySelectorAll('dynamics')[0]?.children[0]
          if (dynamicsTag) {
            velocity = dynamicsMap.get(dynamicsTag.nodeName)
          }

          // Is this a chord?
          // https://www.musicxml.com/tutorial/the-midi-compatible-part/chords/
          const isChord = note.querySelectorAll('chord').length > 0
          if (isChord) {
            currentTime -= lastNoteDuration
          }
          // Is this note tied?
          const tieElement = note.querySelectorAll('tie')[0]
          if (tieElement && tieElement.getAttribute('type') === 'stop') {
            const noteEnd = currentTime + durationInSeconds
            // Find last note with this pitch and update end
            for (let index = noteObjs.length - 1; index > 0; index--) {
              const noteObject = noteObjs[index]
              if (noteObject.pitch === pitch) {
                noteObject.end = noteEnd
                // Read lyrics and add to note
                const lyrics = getLyricsFromNote(note)
                if (lyrics.length > 0) {
                  const oldLyrics = noteLyricsMap.get(index) ?? ''
                  const newLyrics = `${oldLyrics} ${lyrics}`
                  noteLyricsMap.set(index, newLyrics)
                }
                // Save XML note index
                xmlNoteIndices[index].push(xmlNoteIndexMap.get(note))
                break
              }
            }
          } else {
            // Save XML note index
            xmlNoteIndices.push([xmlNoteIndexMap.get(note)])
            // Staff is used as note's channel for non-guitar notes
            const staff = +(note.querySelectorAll('staff')[0]?.innerHTML ?? 1)
            // TODO: use xml note type?
            // const type = note.getElementsByTagName('type')[0].innerHTML;
            const startTime = roundToNDecimals(currentTime, ROUNDING_PRECISION)
            const endTime = roundToNDecimals(currentTime + durationInSeconds, ROUNDING_PRECISION)
            // Try to get guitar specific data
            let string = null
            let fret = null
            try {
              fret = +note.querySelectorAll('fret')[0].innerHTML
              string = +note.querySelectorAll('string')[0].innerHTML
            } catch { }
            if (string !== null && fret !== null) {
              noteObjs.push(new GuitarNote(
                pitch,
                startTime,
                velocity,
                string,
                endTime,
                string,
                fret
              ))
              // TODO: use drum notes and store part name and action directly
              // } else if (isUnpitched) {
              //     const part = '';
              //     const action = '';
              //     noteObjs.push(new DrumNote(
              //         pitch,
              //         startTime,
              //         velocity,
              //         staff - 1,
              //         endTime,
              //         part,
              //         action,
              //     ));
            } else {
              noteObjs.push(new Note(
                pitch,
                startTime,
                velocity,
                // MusicXML starts with 1 but MIDI with 0
                staff - 1,
                endTime
              ))
            }
            // Read lyrics
            const lyrics = getLyricsFromNote(note)
            if (lyrics.length > 0) {
              noteLyricsMap.set(noteObjs.length - 1, lyrics)
            }
          }
          lastNoteDuration = durationInSeconds
          currentTime += durationInSeconds
        } catch (error) {
          console.warn('[MusicXmlParser] Cannot parse MusicXML note', error, note)
        }
      }
    }
    // Add measure line position
    measureLinePositions.push(roundToNDecimals(currentTime, ROUNDING_PRECISION))
    measureIndices.push(noteObjs.length)
  }
  // Defaults
  if (tempoChanges.length === 0 || tempoChanges[0].time > 0) {
    tempoChanges.unshift({ tempo: 120, time: 0 })
  }
  if (beatTypeChanges.length === 0 || beatTypeChanges[0].time > 0) {
    beatTypeChanges.unshift({ beats: 4, beatType: 4, time: 0 })
  }
  if (keySignatureChanges.length === 0 || keySignatureChanges[0].time > 0) {
    keySignatureChanges.unshift({ key: 'C', scale: 'major', time: 0 })
  }
  // TODO: Remove duplicates from measureRehearsalMap

  const result = {
    noteObjs: noteObjs,
    totalTime: currentTime,
    measureLinePositions,
    measureIndices,
    measureRehearsalMap,
    xmlNoteIndices,
    tempoChanges,
    beatTypeChanges,
    keySignatureChanges,
    tuning: getTuningPitches(measures),
    noteLyricsMap
  }
  // console.log('[MusicXmlParser] Parsed part: ', result);
  return result
}

/**
 * Reads lyrics from a note element
 *
 * @param {HTMLElement} note note element
 * @returns {string} lyrics for this note
 */
function getLyricsFromNote (note) {
  const lyric = note.querySelectorAll('lyric')
  const texts = []
  for (const l of lyric) {
    texts.push(l.querySelectorAll('text')[0].textContent)
  }
  const text = texts.join(' ')
  return text
}

/**
 * Calculates the duration in seconds of a note, rest or backup
 *
 * @private
 * @param {number} duration duration of the event in divisions
 * @param {number} divisions MusicXML time divisions value
 * @param {number} secondsPerBeat seconds per beat
 * @returns {number} duration in seconds
 */
function getDurationInSeconds (duration, divisions, secondsPerBeat) {
  const durationInBeats = duration / divisions
  const durationInSeconds = durationInBeats * secondsPerBeat
  return durationInSeconds
}

/**
 * Resolves repetitions by simply duplicating repeated measures.
 * Handles volta lines (ending one, ending two).
 *
 * @todo handle 3x etc
 * @todo write tests
 * @see https://www.musicxml.com/tutorial/the-midi-compatible-part/repeats/
 * @private
 * @param {HTMLCollection} measures measures
 * @returns {HTMLAllCollection[]} processed measures
 */
function duplicateRepeatedMeasures (measures) {
  let resultMeasures = []
  let currentRepeatedSection = []
  let isAlternativeEndingOne = false
  for (const measure of measures) {
    // Check if this is the first measure of an volta ending 1
    const endingMarks = measure.querySelectorAll('ending')
    if (
      +(endingMarks[0]?.getAttribute('number')) === 1 &&
      endingMarks[0]?.getAttribute('type') === 'start'
    ) {
      isAlternativeEndingOne = true
    }
    // Handle repetition marks
    const repetitionMarks = measure.querySelectorAll('repeat')
    if (repetitionMarks.length === 2) {
      // Only this measure is repeated
      // TODO: volta endings don't make sense here so no need to handle?
      const times = repetitionMarks[1].getAttribute('times') || 2
      const repetition = Array.from({ length: +times }).fill(measure)
      if (currentRepeatedSection.length === 0) {
        resultMeasures = [...resultMeasures, ...repetition]
      } else {
        currentRepeatedSection = [...currentRepeatedSection, ...repetition]
      }
    } else if (repetitionMarks.length === 1) {
      // Repetition either starts or ends here
      const direction = repetitionMarks[0].getAttribute('direction')
      if (direction === 'forward') {
        // Start new repetition
        currentRepeatedSection.push(measure)
      } else if (direction === 'backward') {
        const times = repetitionMarks[0].getAttribute('times') || 2
        if (currentRepeatedSection.length > 0) {
          // Finish current repetition
          if (!isAlternativeEndingOne) {
            currentRepeatedSection.push(measure)
            for (let index = 0; index < times; index++) {
              resultMeasures = [...resultMeasures, ...currentRepeatedSection]
            }
          } else {
            // Only include ending 1 in first repetition
            const firstRepetition = [...currentRepeatedSection, measure]
            resultMeasures = [...resultMeasures, ...firstRepetition]
            for (let index = 1; index < times; index++) {
              resultMeasures = [...resultMeasures, ...currentRepeatedSection]
            }
          }
          currentRepeatedSection = []
        } else {
          // Repetition started at the start of the piece, repeat all
          // we have until here
          const allMeasuresUntilHere = [...resultMeasures]
          for (let index = 1; index < times; index++) {
            resultMeasures = [...resultMeasures, ...allMeasuresUntilHere]
          }
          // resultMeasures = [...resultMeasures, ...resultMeasures];
        }
      }
    } else {
      if (!isAlternativeEndingOne) {
        // Measure without repetition marks, but might still be inside a
        // repetition
        if (currentRepeatedSection.length === 0) {
          resultMeasures.push(measure)
        } else {
          currentRepeatedSection.push(measure)
        }
      }
    }
    // Check if this is the last measure of a volta ending 1
    if (isAlternativeEndingOne) {
      for (const endingMark of endingMarks) {
        if (
          +(endingMark.getAttribute('number')) === 1 &&
          endingMark.getAttribute('type') === 'stop'
        ) {
          isAlternativeEndingOne = false
        }
      }
    }
  }
  return resultMeasures
}

/**
 * Handles MusicXML measures that contain both a stave and a tab. Since every
 * note is described twice, we just need to remove those without string, fret
 * information
 * This function also removes <backup> tags which should not be necessary after
 * removing dublicate notes (only if string, fret notes were found).
 *
 * @private
 * @param {HTMLElement} track a MusicXML track, i.e. its measures
 * @returns {HTMLCollection} cleaned-up MusicXML measure
 */
function handleStaveAndTab (track) {
  const notes = track.querySelectorAll('note')
  // Check whether this file has notes with string, fret information
  let hasStringFretNotes = false
  for (const note of notes) {
    if (
      note.querySelectorAll('string').length > 0 &&
      note.querySelectorAll('fret').length > 0
    ) {
      hasStringFretNotes = true
      break
    }
  }
  // If some notes have string and fret information, remove all the others
  // Do *not* remove all rests, keep the one in the first voice!
  if (hasStringFretNotes) {
    for (const note of notes) {
      const voice = +(note.querySelectorAll('voice')[0].innerHTML ?? 1)
      const isFirstVoiceRest = note.querySelectorAll('rest').length > 0 &&
        voice === 1
      if (
        !isFirstVoiceRest &&
        note.querySelectorAll('fret').length === 0
      ) {
        note.remove()
      }
    }
    // Also remove <backup> tags which were only there due to having two
    // staves
    const backups = track.querySelectorAll('backup')
    for (const backup of backups) {
      backup.remove()
    }
  }
  return track
}

/**
 * Gets the tuning for a MusicXML part
 *
 * @private
 * @param {HTMLCollection} measures the measures of the parts
 * @returns {number[]} pitches of the tuning or [] if none is found
 */
function getTuningPitches (measures) {
  for (const measure of measures) {
    try {
      const tuningPitches = []
      const staffTunings = measure.querySelectorAll('staff-tuning')
      for (const st of staffTunings) {
        const tuningNote = st.querySelectorAll('tuning-step')[0].innerHTML
        const tuningOctave = +st.querySelectorAll('tuning-octave')[0].innerHTML
        // let line = +st.getAttribute('line');
        // console.log(`String ${line} is tuned to ${tuningNote}${tuningOctave}`);
        tuningPitches.push(getMidiNoteByNameAndOctave(tuningNote, tuningOctave).pitch)
      }
      return tuningPitches
    } catch { }
  }
  return []
}

/**
 * Extracts information about the XML's parts for different instruments
 *
 * @param {XMLDocument} xml MusicXML
 * @returns {object[]} part definitions
 */
// function getPartDefinitions (xml) {
//   const partDefinitions = xml.querySelectorAll('score-part')
//   const result = []
//   for (const partDefinition of partDefinitions) {
//     // Instruments (e.g., drum parts have multiple)
//     const instruments = new Map()
//     const instrDefs = partDefinition.querySelectorAll('score-instrument')
//     for (const instrumentDefinition of instrDefs) {
//       const id = instrumentDefinition.getAttribute('id')
//       instruments.set(id, {
//         id,
//         name: instrumentDefinition.querySelectorAll('instrument-name')[0].textContent
//       })
//     }
//     const instrMidiDefs = partDefinition.querySelectorAll('midi-instrument')
//     for (const instrumentDefinition of instrMidiDefs) {
//       const midiNote = instrumentDefinition.querySelectorAll('midi-unpitched')[0]?.textContent
//       if (!midiNote) {
//         continue
//       }
//       const id = instrumentDefinition.getAttribute('id')
//       instruments.get(id).midiNote = +midiNote
//     }
//     // Parsed part definitions
//     result.push({
//       id: partDefinition.getAttribute('id'),
//       name: partDefinition.querySelectorAll('part-name')[0].textContent,
//       abbr: partDefinition.querySelectorAll('part-abbreviation')[0].textContent,
//       instruments: instruments.size > 0 ? instruments : null
//     })
//   }
//   return result
// }

/**
 * Returns a map containing maps, such that result.get(partId).get(instrId)
 * gives you the instrument with the ID instrId as defined in the part partId.
 *
 * This is needed to map drum notes to MIDI pitches.
 *
 * @param {XMLDocument} xml MusicXML
 * @returns {Map} map with structure result.get(partId).get(instrId)
 */
function getDrumInstrumentMap (xml) {
  const partMap = new Map()
  const scoreParts = xml.querySelectorAll('part-list')[0]?.querySelectorAll('score-part')
  if (!scoreParts) { return partMap }
  for (const scorePart of scoreParts) {
    const partId = scorePart.id
    const instruMap = new Map()
    const midiInstrs = scorePart.querySelectorAll('midi-instrument')
    for (const midiInstr of midiInstrs) {
      const instrId = midiInstr.id
      const pitch = midiInstr.querySelectorAll('midi-unpitched')[0]?.innerHTML
      if (pitch) {
        instruMap.set(instrId, +pitch)
      }
    }
    partMap.set(partId, instruMap)
  }
  return partMap
}

/**
 * Checks whether a note is palm-muted
 *
 * @param {HTMLElement} note note element
 * @returns {boolean} true if note is palm-muted
 */
// function isPalmMuted (note) {
//   const mute = note.querySelectorAll('mute')
//   if (mute.length > 0 && mute[0].textContent === 'palm') {
//     return true
//   }
//   return false
// }

/**
 * Checks whether a note is hammer-on
 *
 * @param {HTMLElement} note note element
 * @returns {boolean} true if note is hammer-on
 */
// function isHammeron (note) {
//   return note.querySelectorAll('hammer-on').length > 0
// }

/**
 * Map from fiths to key signature
 *
 * @type {Map<number,object>}
 */
const keySignatureMap = new Map([
  [-7, { key: 'Cb', scale: 'major' }],
  [-6, { key: 'Gb', scale: 'major' }],
  [-5, { key: 'Db', scale: 'major' }],
  [-4, { key: 'Ab', scale: 'major' }],
  [-3, { key: 'Eb', scale: 'major' }],
  [-2, { key: 'Bb', scale: 'major' }],
  [-1, { key: 'F', scale: 'major' }],
  [0, { key: 'C', scale: 'major' }],
  [1, { key: 'G', scale: 'major' }],
  [2, { key: 'D', scale: 'major' }],
  [3, { key: 'A', scale: 'major' }],
  [4, { key: 'E', scale: 'major' }],
  [5, { key: 'B', scale: 'major' }],
  [6, { key: 'F#', scale: 'major' }],
  [7, { key: 'C#', scale: 'major' }]
])

/**
 * Maps dynamics to MIDI velocity numbers, i.e. 'ff' to 102
 *
 * @type {Map<string,number>}
 */
const dynamicsMap = new Map([
  ['ppp', 25],
  ['pp', 38],
  ['p', 51],
  ['mp', 64],
  ['mf', 76],
  ['f', 89],
  ['ff', 102],
  ['fff', 114]
])
