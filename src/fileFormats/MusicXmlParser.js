import Note from '../types/Note';
import GuitarNote from '../types/GuitarNote';
import { getMidiNoteByNameAndOctave } from '../Midi';
import { max } from 'd3';
import { roundToNDecimals } from '../utils/MathUtils';

/**
 * @module fileFormats/MusicXmlParser
 */

/**
 * Converts a collection of MusicXML measures to JavaScript Objects with timing information in seconds.
 * Also calculates the position of measure lines and the total time in seconds.
 *
 * @todo use https://github.com/jnetterf/musicxml-interfaces ?
 * @param {XMLDocument} xml MusicXML document
 * @param {boolean} log set to true to log results etc. to the console
 * @returns {object} parsed document
 */
export function preprocessMusicXmlData(xml, log = false) {
    if (log) {
        console.groupCollapsed('[MusicXmlParser] Parsing MusicXML');
        console.log(xml);
    }
    // Get part and instrument names
    const partNameElements = xml.querySelectorAll('part-name');
    const instruments = xml.querySelectorAll('score-instrument');
    const partNames = [];
    const instrumentNames = [];
    for (const p of partNameElements) {
        partNames.push(p.innerHTML);
    }
    for (const index of instruments) {
        instrumentNames.push(index.children[0].innerHTML);
    }
    // Preprocess notes
    const parts = xml.querySelectorAll('part');
    const parsedParts = [];
    for (const part of parts) {
        const measures = part.children;
        parsedParts.push(preprocessMusicXmlMeasures(measures));
    }
    const result = {
        parts: parsedParts,
        partNames,
        instruments: instrumentNames,
        totalTime: max(parsedParts, d => d.totalTime),
        // This is the first tempo etc., changes are stored in each part
        bpm: parsedParts[0]?.bpm ?? 120,
        beats: parsedParts[0]?.beats ?? 4,
        beatType: parsedParts[0]?.beatType ?? 4,
    };
    if (log) {
        console.log(result);
        console.groupEnd();
    }
    return result;
}

/**
 * Converts a collection of MusicXML measures to JavaScript Objects with timing information in seconds.
 * Also calculates the position of measure lines and the total time in seconds.
 *
 * @private
 * @param {HTMLCollection} measures collection of measures with notes
 * @returns {object} parsed measures
 */
function preprocessMusicXmlMeasures(measures) {
    // Handle repetitions by duplicating measures
    measures = duplicateRepeatedMeasures(measures);

    let currentTime = 0;
    let divisions;
    let tempo = 120;
    let beats = 4;
    let beatType = 4;
    // Handle changing tempo and beat type
    const tempoChanges = [];
    const beatTypeChanges = [];
    const keySignatureChanges = [];
    const noteObjs = [];
    const measureLinePositions = [];
    // const directions = [];
    for (const measure of measures) {
        const currentTimeRounded = roundToNDecimals(currentTime, 12);
        // Try to update metrics (if they are not set, keep the old ones)
        try {
            const soundElements = measure.querySelectorAll('sound');
            for (const element of soundElements) {
                const tempoValue = element.getAttribute('tempo');
                if (tempoValue !== null) {
                    tempo = roundToNDecimals(+tempoValue, 3);
                    tempoChanges.push({
                        time: currentTimeRounded,
                        tempo,
                    });
                }
                // TODO: this only support one tempo change per measure!
                // TODO: tempo changes that are not at the measure start will be false
                // TODO: solution: go trough all children of measure: notes and other children
                // notes will update the time
                break;
            }
        } catch {}
        try {
            divisions = +measure.querySelectorAll('divisions')[0].innerHTML;
        } catch {}
        try {
            beats = +measure.querySelectorAll('beats')[0].innerHTML;
            beatType = +measure.querySelectorAll('beat-type')[0].innerHTML;
            beatTypeChanges.push({
                time: currentTimeRounded,
                beats,
                beatType,
            });
        } catch {}
        const secondsPerBeat = 1 / (tempo / 60);
        try {
            const fifths = +measure.querySelectorAll('fifths')[0].innerHTML;
            const { key, scale } = keySignatureMap.get(fifths);
            keySignatureChanges.push({
                time: currentTimeRounded,
                key,
                scale,
            });
        } catch {}

        // Read notes
        const notes = measure.querySelectorAll('note');
        let lastNoteDuration = 0;
        for (const note of notes) {
            try {
                // TODO: Ignore non-tab staff when there is a tab staff
                // Get note duration in seconds
                const duration = +note.querySelectorAll('duration')[0].innerHTML;
                const durationInBeats = duration / divisions;
                const durationInSeconds = durationInBeats * secondsPerBeat;
                // Do not create note object for rests, only increase time
                const isRest = note.querySelectorAll('rest').length > 0;
                if (isRest) {
                    currentTime += durationInSeconds;
                    continue;
                }
                // Get MIDI pitch
                const no = note.querySelectorAll('step')[0].innerHTML;
                const octave = +note.querySelectorAll('octave')[0].innerHTML;
                const pitch = getMidiNoteByNameAndOctave(no, octave).pitch;
                // Is this a chord? (https://www.musicxml.com/tutorial/the-midi-compatible-part/chords/)
                const isChord = note.querySelectorAll('chord').length > 0;
                if (isChord) {
                    currentTime -= lastNoteDuration;
                }
                // Is this note tied?
                const tieElement = note.querySelectorAll('tie')[0];
                if (tieElement && tieElement.getAttribute('type') === 'stop') {
                    const noteEnd = currentTime + durationInSeconds;
                    // Find last note with this pitch and update end
                    for (let index = noteObjs.length - 1; index > 0; index--) {
                        const n = noteObjs[index];
                        if (n.pitch === pitch) {
                            n.end = noteEnd;
                            break;
                        }
                    }
                } else {
                    // Try to get guitar specific data
                    let string = null;
                    let fret = null;
                    try {
                        fret = +note.querySelectorAll('fret')[0].innerHTML;
                        string = +note.querySelectorAll('string')[0].innerHTML;
                    } catch {/* Do nothing */ }
                    // TODO: use xml note type?
                    // const type = note.getElementsByTagName('type')[0].innerHTML;
                    const startTime = roundToNDecimals(currentTime, 12);
                    const endTime = roundToNDecimals(currentTime + durationInSeconds, 12);
                    if (string !== null && fret !== null) {
                        noteObjs.push(new GuitarNote(
                            pitch,
                            startTime,
                            127,
                            string,
                            endTime,
                            string,
                            fret,
                        ));
                    } else {
                        noteObjs.push(new Note(
                            pitch,
                            startTime,
                            127,
                            string,
                            endTime,
                        ));
                    }
                }
                lastNoteDuration = durationInSeconds;
                currentTime += durationInSeconds;
            } catch (error) {
                console.warn('[MusicXmlParser] Cannot parse MusicXML note', error, note);
            }
        }
        // Add measure line position
        measureLinePositions.push(roundToNDecimals(currentTime, 12));
    }
    // Defaults
    if (tempoChanges.length === 0) {
        tempoChanges.push({ tempo: 120, time: 0 });
    }
    if (beatTypeChanges.length === 0) {
        beatTypeChanges.push({ beats: 4, beatType: 4, time: 0 });
    }
    if (keySignatureChanges.length === 0) {
        keySignatureChanges.push({ key: 'C', scale: 'major', time: 0 });
    }
    const result = {
        noteObjs: noteObjs,
        totalTime: currentTime,
        measureLinePositions,
        tempoChanges,
        beatTypeChanges,
        keySignatureChanges,
        // Initial values
        bpm: tempoChanges[0]?.tempo || 120,
        beats: beatTypeChanges[0].beats,
        beatType: beatTypeChanges[0].beatType,
        tuning: getTuningPitches(measures),
    };
    // console.log('[MusicXmlParser] Parsed part: ', result);
    return result;
}

/**
 * Resolves repetitions by simply duplicating repeated measures.
 *
 * @todo handle 3x etc
 * @todo handle different endings
 * @see https://www.musicxml.com/tutorial/the-midi-compatible-part/repeats/
 * @private
 * @param {HTMLCollection} measures measures
 * @returns {*} processed measures
 */
function duplicateRepeatedMeasures(measures) {
    let repeatedMeasures = [];
    let currentRepetition = [];
    for (const measure of measures) {
        const rep = measure.querySelectorAll('repeat');
        if (rep.length === 2) {
            // Only this measure is repeated
            const times = rep[1].getAttribute('times') || 2;
            const repetition = Array.from({ length: +times }).fill(measure);
            if (currentRepetition.length === 0) {
                repeatedMeasures = repeatedMeasures.concat(repetition);
            } else {
                currentRepetition = currentRepetition.concat(repetition);
            }
        } else if (rep.length === 1) {
            // Repetition either starts or ends here
            const direction = rep[0].getAttribute('direction');
            if (direction === 'forward') {
                // Start new repetition
                currentRepetition.push(measure);
            } else if (direction === 'backward') {
                const times = rep[0].getAttribute('times') || 2;
                if (currentRepetition.length > 0) {
                    // Finish current repetition
                    currentRepetition.push(measure);
                    for (let index = 0; index < times; index++) {
                        repeatedMeasures = repeatedMeasures.concat(currentRepetition);
                    }
                    currentRepetition = [];
                } else {
                    // Repetition started at the start of the piece, repeat all
                    // we have until here
                    repeatedMeasures = repeatedMeasures.concat(repeatedMeasures);
                }
            }
        } else {
            // Measure without repetition marks, but might still be inside a
            // repetition
            if (currentRepetition.length === 0) {
                repeatedMeasures.push(measure);
            } else {
                currentRepetition.push(measure);
            }
        }
    }
    return repeatedMeasures;
}

/**
 * Gets the tuning for a MusicXML part
 *
 * @private
 * @param {HTMLCollection} measures the measures of the parts
 * @returns {number[]} pitches of the tuning or [] if none is found
 */
function getTuningPitches(measures) {
    for (const measure of measures) {
        try {
            const tuningPitches = [];
            const staffTunings = measure.querySelectorAll('staff-tuning');
            for (const st of staffTunings) {
                const tuningNote = st.querySelectorAll('tuning-step')[0].innerHTML;
                const tuningOctave = +st.querySelectorAll('tuning-octave')[0].innerHTML;
                // let line = +st.getAttribute('line');
                // console.log(`String ${line} is tuned to ${tuningNote}${tuningOctave}`);
                tuningPitches.push(getMidiNoteByNameAndOctave(tuningNote, tuningOctave).pitch);
            }
            return tuningPitches;
        } catch {}
    }
    return [];
}

/**
 * Map from fiths to key signature
 * TODO: how to do minor? does it exist?
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
    [7, { key: 'C#', scale: 'major' }],
]);
