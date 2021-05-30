import { countOnesOfBinary } from './MathUtils';
import { binarySearch } from './ArrayUtils';
import { extent } from 'd3';

/**
 * @module utils/MusicUtils
 */

/**
 * Converts beats per minute to seconds per beat
 *
 * @param {number} bpm tempo in beats per minute
 * @returns {number} seconds per beat
 */
export function bpmToSecondsPerBeat(bpm) {
    return 1 / (bpm / 60);
}

/**
 * Maps any frequency (in Hz) to an approximate MIDI note number. Result can be
 * rounded to get to the closest MIDI note or used as is for a sound in between
 * two notes.
 *
 * @param {number} frequency a frequency in Hz
 * @returns {number} MIDI note number (not rounded)
 */
export function freqToApproxMidiNr(frequency) {
    return 12 * Math.log2(frequency / 440) + 69;
}

/**
 * Turns a chord into an integer that uniquely describes the occuring chroma.
 * If the same chroma occurs twice this will not make a difference
 * (e.g. [C4, E4, G4, C5] will equal [C4, E4, G4])
 *
 * How it works:
 * Chord has C, E, and G
 * x = 000010010001
 *         G  E   C
 *
 * @param {Note[]} notes notes
 * @returns {number} an integer that uniquely identifies this chord's chroma
 */
export function chordToInteger(notes) {
    let value = 0x0;
    for (const note of notes) {
        const chroma = note.pitch % 12;
        // eslint-disable-next-line no-bitwise
        const noteInteger = 1 << chroma;
        // eslint-disable-next-line no-bitwise
        value = value | noteInteger;
    }
    return value;
}

/**
 * Takes two chord integer representations from chordToInteger() and computes
 * the Jaccard index
 *
 * @param {number} chord1 chord as integer representation
 * @param {number} chord2 chord as integer representation
 * @returns {number} Jackard index, from 0 for different to 1 for identical
 */
export function chordIntegerJaccardIndex(chord1, chord2) {
    if (chord1 === chord2) {
        return 1;
    }
    // eslint-disable-next-line no-bitwise
    const intersection = chord1 & chord2;
    // eslint-disable-next-line no-bitwise
    const union = chord1 | chord2;
    const intersectionSize = countOnesOfBinary(intersection);
    const unionSize = countOnesOfBinary(union);
    return intersectionSize / unionSize;
}

/*
 * noteTypeDurationRatios
 * 1 = whole note, 1/2 = half note, ...
 *
 * With added dots:
 * o. has duration of 1.5, o.. 1.75, ...
 */
const noteTypeDurationRatios = [];
const baseDurations = [2, 1, 1 / 2, 1 / 4, 1 / 8, 1 / 16, 1 / 32, 1 / 64];
for (const d of baseDurations) {
    for (let dots = 0; dots < 4; dots++) {
        let duration = d;
        let toAdd = d;
        for (let dot = 0; dot < dots; dot++) {
            // Each dot after the note adds half of the one before
            toAdd /= 2;
            duration += toAdd;
        }
        noteTypeDurationRatios.push({
            type: d,
            dots,
            duration,
        });
    }
}
noteTypeDurationRatios.sort((a, b) => a.duration - b.duration);

/**
 * Estimates the note type (whole, quarter, ...) and number of dots for dotted
 * notes
 *
 * @todo test if corrrectly 'calibrated'
 * @param {number} duration duration of a note
 * @param {number} bpm tempo of the piece in bpm
 * @returns {object} note type and number of dots
 *      e.g. { "dots": 0, "duration": 1, "type": 1 } for a whole note
 *      e.g. { "dots": 1, "duration": 1.5, "type": 1 } for a dotted whole note
 */
export function noteDurationToNoteType(duration, bpm) {
    const quarterDuration = bpmToSecondsPerBeat(bpm);
    const ratio = duration / quarterDuration / 4;
    // TODO: round to finest representable step?

    // Binary search
    return binarySearch(noteTypeDurationRatios, ratio, d => d.duration);
}

/**
 * Circle of 5ths as
 * [midiNr, noteAsSharp, noteAsFlat, numberOfSharps, numberOfFlats]
 *
 * @see https://en.wikipedia.org/wiki/Circle_of_fifths
 * @type {any[][]}
 */
export const CIRCLE_OF_5THS = [
    [0, 'C', 'C', 0, 0],
    [7, 'G', 'G', 1, 0],
    [2, 'D', 'D', 2, 0],
    [9, 'A', 'A', 3, 0],
    [4, 'E', 'E', 4, 0],
    [11, 'B', 'B', 5, 7],
    [6, 'F#', 'Gb', 6, 6],
    [1, 'C#', 'Db', 7, 5],
    [8, 'G#', 'Ab', 0, 4],
    [3, 'D#', 'Eb', 0, 3],
    [10, 'A#', 'Bb', 0, 2],
    [5, 'F', 'F', 0, 1],
];

/**
 * Maps number of semitones to interval name
 * m - minor
 * M - major
 * P - perfect
 * aug - augmented
 *
 * @type {Map<number,string>}
 */
export const INTERVALS = new Map([
    [1, 'unison'],
    [1, 'm2'],
    [2, 'M2'],
    [3, 'm3'],
    [4, 'M3'],
    [5, 'P4'],
    [6, 'aug4'],
    [7, 'P5'],
    [8, 'm6'],
    [9, 'M6'],
    [10, 'm7'],
    [11, 'M7'],
    [12, 'P8'],
]);


/**
 * Estimates a difficulty score for playing a set of notes.
 * Can be used for an entire piece or measure-by-measure.
 *
 * @todo different modi, e.g. for piano or guitar (fingering is different)
 * @param {Note[]} notes notes
 * @param {string} mode mode
 * @param {number[]} fingering finger as number for each note, same order
 * @returns {number} difficulty, can range within [0, infinity)
 * @throws {'Invalid mode parameter'} when mode is invalid
 */
// export function estimateDifficulty(notes, mode, fingering) {
//     if (mode === 'noteDensity') {
//         // Naive mode, only look at density of notes
//         const startTimeExtent = extent(notes, d => d.start);
//         return notes.length / startTimeExtent;
//     } else if (mode === 'fingering') {
//         // TODO: check complexity of fingering
//     }
//     throw new Error('Invalid mode parameter');
// }
