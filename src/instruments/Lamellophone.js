import { difference, extent, intersection, max } from 'd3'
import { getMidiNoteByLabel, getMidiNoteByNr } from '../fileFormats/Midi.js'
import { detectChordsByExactStart } from '../chords/Chords.js'
import Note from '../types/Note.js'
import { bpmToSecondsPerBeat } from '../utils/MusicUtils.js'

/**
 * @module instruments/Lamellophone
 */

/**
 * Represents Lamellophone tunings
 */
export class LamellophoneTuning {
  /**
     * Represents a tuning of lamellophone.
     *
     * @param {string} name name
     * @param {string[]} notes array of notes, same order as on instrument
     *      e.g. [..., 'D4','C4', 'F#4', ...]
     */
  constructor (name, notes) {
    this.name = name
    this.notes = notes
    this.short = notes.join(' ')
    this.pitches = notes.map(note => getMidiNoteByLabel(note).pitch)
    this.pitchesSorted = [...this.pitches]
      .sort((a, b) => a - b)
    this.keyCount = notes.length
  }

  /**
     * Returns an array of the tuning's notes as number representation:
     * Tuning notes:  C4, D4, ... C5, D5, ... C6,  D6
     * Number format: 1,  2,  ... 1°, 2°, ... 1°°, 2°°
     *
     * @returns {string[]} array with tuning notes in number representation
     */
  getNumbers () {
    const pitches = this.pitchesSorted
    const numbers = new Map()
    for (const [index, pitch] of pitches.entries()) {
      let number = index + 1
      let ending = ''
      let lowerOctave = pitch - 12
      while (lowerOctave > 0 && numbers.has(lowerOctave)) {
        number = numbers.get(lowerOctave).number
        ending += '°'
        lowerOctave -= 12
      }
      numbers.set(pitch, { number, numberString: `${number}${ending}` })
    }
    return [...numbers.values()]
      .map(d => d.numberString)
  }

  /**
     * Returns an array of the tuning's notes as letter representation:
     * Tuning notes:  C4, D4, ... C5, D5, ... C6,  D6
     * Number format: C,  D,  ... C°, D°, ... C°°, D°°
     *
     * @returns {string[]} array with tuning notes in letter representation
     */
  getLetters () {
    const pitches = this.pitchesSorted
    const numbers = new Map()
    for (const [index, pitch] of pitches.entries()) {
      let number = index + 1
      let ending = ''
      let lowerOctave = pitch - 12
      while (lowerOctave > 0 && numbers.has(lowerOctave)) {
        number = numbers.get(lowerOctave).number
        ending += '°'
        lowerOctave -= 12
      }
      const letter = getMidiNoteByNr(pitch).name
      numbers.set(pitch, { number, letterString: `${letter}${ending}` })
    }
    return [...numbers.values()].map(d => d.letterString)
  }
}

/**
 * Tunings.
 * Notes are in the same order as on the instrument
 *
 * @type {Map<string,Map<string,LamellophoneTuning>>}
 */
export const lamellophoneTunings = new Map([
  ['Kalimba', new Map([
    [
      '9 A Major',
      new LamellophoneTuning('9 A Major', ['A5', 'C#6', 'C#5', 'A5', 'A4', 'F#5', 'E5', 'E6', 'B5'])
    ],
    [
      '9 A Minor',
      new LamellophoneTuning('9 A Minor', ['A5', 'C6', 'C5', 'A5', 'A4', 'F5', 'E5', 'E6', 'B5'])
    ],
    [
      '9 A Minor 7',
      new LamellophoneTuning('9 A Minor 7', ['A5', 'C6', 'C5', 'A5', 'A4', 'F#5', 'E5', 'E6', 'B5'])
    ],
    [
      '9 A Ake Bono',
      new LamellophoneTuning('9 A Ake Bono', ['A5', 'D6', 'D5', 'A5', 'A4', 'F5', 'E5', 'E6', 'A#5'])
    ],
    [
      '9 A Hijaz',
      new LamellophoneTuning('9 A Hijaz', ['G5', 'D6', 'D5', 'A5', 'A4', 'F#5', 'D#5', 'D#6', 'A#5'])
    ],
    [
      '9 A Pygmy',
      new LamellophoneTuning('9 A Pygmy', ['G5', 'C6', 'C5', 'G5', 'G4', 'D#5', 'D5', 'D#6', 'A#5'])
    ],
    [
      '17 C Major',
      new LamellophoneTuning('17 C Major', ['D6', 'B5', 'G5', 'E5', 'C5', 'A4', 'F4', 'D4', 'C4', 'E4', 'G4', 'B4', 'D5', 'F5', 'A5', 'C6', 'E6'])
    ],
    [
      '21 C Major',
      new LamellophoneTuning('21 C Major', ['D6', 'B5', 'G5', 'E5', 'C5', 'A4', 'F4', 'D4', 'B3', 'G3', 'F3', 'A3', 'C4', 'E4', 'G4', 'B4', 'D5', 'F5', 'A5', 'C6', 'E6'])
    ]
  ])]
])

/**
 * Parses a tab into notes
 *
 * @param {string} tab in letter format
 * @param {LamellophoneTuning} tuning tuning
 * @param {number} tempo tempo in bpm
 * @returns {Note[]} notes
 */
export function convertTabToNotes (tab, tuning, tempo = 120) {
  if (!tab || tab.length === 0) { return [] }
  // Create a mapping symbol->pitch
  const symbolToPitchMap = new Map()
  const symbols = tuning.getLetters()
  for (let index = 0; index < tuning.keyCount; index++) {
    symbolToPitchMap.set(symbols[index], tuning.pitchesSorted[index])
  }
  // Parse tab to notes
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const noteNamesSet = new Set(noteNames)
  const lowestNote = tuning.pitchesSorted[0]
  const startOct = getMidiNoteByNr(lowestNote).octave
  const secondsPerBeat = bpmToSecondsPerBeat(tempo)
  let insideChord = false
  let insideNote = false
  let currentTime = 0
  let currentPitch = 0
  let currentOctOffset = 0
  const notes = []
  tab = `${tab.toUpperCase().replaceAll('\n', ' \n')} `
  // This is needed more often
  const finishNote = () => {
    try {
      notes.push(Note.from({
        pitch: currentPitch + 12 * (startOct + 1 + currentOctOffset),
        start: currentTime,
        end: currentTime + secondsPerBeat
      }))
      currentOctOffset = 0
      if (!insideChord) {
        currentTime += secondsPerBeat
      }
    } catch {
      console.log(currentPitch)
    }
    insideNote = false
  }
  for (const char of tab) {
    if (char === '(') {
      // Start chord (but finish current if any)
      if (insideChord) {
        insideChord = false
      }
      if (insideNote) {
        finishNote()
      }
      insideChord = true
    } else if (noteNamesSet.has(char)) {
      // Start note (but finish current if any)
      if (insideNote) {
        finishNote()
      }
      insideNote = true
      currentPitch = noteNames.indexOf(char)
    } else if (char === '#') {
      // Sharpen note
      currentPitch++
    } else if (char === '°') {
      // Increase ocatve
      currentOctOffset++
    } else if (char === ' ' || char === '\n' || char === ')') {
      // End chord and note if inside
      if (char === ')') {
        insideChord = false
      }
      if (char === '\n') {
        insideChord = false
        currentTime += secondsPerBeat
      }
      if (insideNote) {
        finishNote()
      }
    }
  }
  return notes
}

/**
 * Converts an array of notes into a text tab
 *
 * @param {Note[]} notes notes
 * @param {LamellophoneTuning} tuning tuning
 * @param {'letter'|'number'} mode mode
 * @param {number} restSize number of seconds for a gap between chords to insert
 *     a line break
 * @returns {string} text tab
 */
export function convertNotesToTab (notes, tuning, mode = 'letter', restSize = 0.1) {
  if (!notes || notes.length === 0) { return [] }
  // Create a mapping pitch->symbol
  const pitchToSymbolMap = new Map()
  const symbols = mode === 'letter' ? tuning.getLetters() : tuning.getNumbers()
  for (let index = 0; index < tuning.keyCount; index++) {
    pitchToSymbolMap.set(tuning.pitchesSorted[index], symbols[index])
  }
  // Get chords
  const chords = detectChordsByExactStart(notes)
  // Create tab
  let tab = ''
  let previousEnd = 0
  for (const chord of chords) {
    // Format chord's notes
    let chordString = chord
      .map(note => {
        if (pitchToSymbolMap.has(note.pitch)) {
          return pitchToSymbolMap.get(note.pitch) || `[${note.pitch}]`
        } else {
          return mode === 'letter' ? getMidiNoteByNr(note.pitch)?.name ?? note.pitch : note.pitch
        }
      })
      .join(' ')
    if (chord.length > 1) {
      // Mark chords with backets (for multiple notes)
      chordString = `(${chordString})`
    }
    tab = chord[0].start - previousEnd > restSize ? `${tab}\n${chordString}` : `${tab} ${chordString}`
    // Update last end time of chord
    previousEnd = max(chord, n => n.end)
  }
  // Remove leading space
  return tab.slice(1)
}

/**
 * Converts an array of notes into an HTML tab with colored notes
 *
 * @param {Note[]} notes notes
 * @param {LamellophoneTuning} tuning tuning
 * @param {'letter'|'number'} mode mode
 * @param {number} restSize number of seconds for a gap between chords to insert
 *     a line break
 * @param {Function} colormap color map function: pitch to color
 * @returns {string} HTML tab
 */
export function convertNotesToHtmlTab (
  notes,
  tuning,
  mode = 'letter',
  restSize = 0.1,
  colormap = () => 'black'
) {
  if (!notes || notes.length === 0) { return [] }
  // Create a mapping pitch->symbol
  const pitchToSymbolMap = new Map()
  const symbols = mode === 'letter' ? tuning.getLetters() : tuning.getNumbers()
  for (let index = 0; index < tuning.keyCount; index++) {
    pitchToSymbolMap.set(tuning.pitches[index], symbols[index])
  }
  // Get chords
  const chords = detectChordsByExactStart(notes)
  // Create tab
  let tab = ''
  let previousEnd = 0
  for (const chord of chords) {
    // Format chord's notes
    let chordString = chord
      .map(note => {
        let string
        if (pitchToSymbolMap.has(note.pitch)) {
          string = pitchToSymbolMap.get(note.pitch) || `[${note.pitch}]`
        } else {
          string = mode === 'letter' ? getMidiNoteByNr(note.pitch)?.name ?? note.pitch : note.pitch
        }
        const color = colormap(note.pitch)
        return `<span class='note' style='background-color: ${color}'>${string}</span>`
      })
      .join('\n')
    if (chord.length > 1) {
      // Mark chords with backets (for multiple notes)
      chordString = `<span class='chord'>${chordString}</span>`
    }
    tab = chord[0].start - previousEnd > restSize ? `${tab}<br/>${chordString}` : `${tab}${chordString}`
    // Update last end time of chord
    previousEnd = max(chord, n => n.end)
  }
  return tab
}

/**
 * Converts a number-based tab to note letter format
 *
 * @param {string} numberTab tab text with number format
 * @param {Map<number, string>} numberLetterMap maps numbers to letters
 * @returns {string} tab in letter format
 */
export function convertNumbersToLetters (numberTab, numberLetterMap) {
  if (!numberTab || numberTab.length === 0) { return '' }
  // Normalize to °
  numberTab = numberTab.replaceAll('\'', '°')
  numberTab = numberTab.replaceAll('’', '°')
  numberTab = numberTab.replaceAll('*', '°')
  numberTab = numberTab.replaceAll('º', '°')
  numberTab = numberTab.replaceAll('^', '°')
  for (const [key, value] of numberLetterMap.entries()) {
    numberTab = numberTab.replaceAll(key, value)
  }
  return numberTab
}

/**
 * Tries to find a transposition s.t. the tuning is able to play all notes.
 * If not not possible, return the transposition that requires the least keys to
 * be retuned.
 *
 * @todo tests fail
 * @param {Note[]} notes notes
 * @param {LamellophoneTuning} tuning tuning
 * @returns {object} {transpose: number, retune: Map}
 */
export function bestTransposition (notes, tuning) {
  if (!notes || notes.length === 0) {
    return { transpose: 0, retune: new Map() }
  }

  const occuringPitches = new Set(notes.map(n => n.pitch))
  if (occuringPitches.size > tuning.keyCount) {
    // Cannot play all notes, no matter the transp. and tuning
    // TODO:
    // just choose best approx?

  }
  const notePitches = [...occuringPitches]

  // Already perfect? return now
  if (difference(notePitches, tuning.pitches).size === 0) {
    return { transpose: 0, retune: new Map() }
  }

  const [minPitch, maxPitch] = extent(notePitches)
  const transpose = (array, steps) => array.map(d => d + steps)

  // Just brute force through all transpositions
  let bestSteps = 0
  let bestTransposed
  let commonPitches
  for (let steps = -minPitch; steps <= 127 - maxPitch; steps++) {
    const transposed = transpose(notePitches, steps)
    const common = intersection(transposed, tuning.pitches)
    if (!commonPitches || common.size > commonPitches.size) {
      bestSteps = steps
      bestTransposed = transposed
    }
  }
  bestTransposed = new Set(bestTransposed)

  // Get pitches in tuning but not in notes and other way round
  const uncommon = difference(bestTransposed, tuning.pitches)
  console.log(uncommon)

  const freePitches = new Set()
  const neededPitches = []
  for (const p of uncommon) {
    if (bestTransposed.has(p)) {
      neededPitches.push(p)
    } else {
      freePitches.add(p)
    }
  }
  console.log(neededPitches)
  console.log(freePitches)

  if (neededPitches.length === 0) {
    // Everything is fine!
    return {
      transpose: bestSteps,
      retune: new Map()
    }
  }
  if (freePitches.size === 0) {
    // Cannot solve this!
    return {
      transpose: bestSteps,
      retune: new Map()
    }
  }

  // Get closest free pitch for each needed one
  const retune = new Map()
  for (const neededPitch of neededPitches) {
    let bestMatch = null
    const bestDiff = Number.POSITIVE_INFINITY
    let freePitch
    for (freePitch of freePitches) {
      const diff = Math.abs(neededPitch - freePitch)
      if (diff < bestDiff) {
        bestMatch = freePitch
      }
    }
    freePitches.delete(bestMatch)
    retune.set(freePitch, neededPitch)
  }

  return {
    transpose: bestSteps,
    retune
  }
}
