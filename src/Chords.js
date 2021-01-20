import { group } from 'd3';
import { arrayShallowEquals } from './utils/ArrayUtils';
import { Chord } from '@tonaljs/tonal';
import Note from '../src/types/Note'; /* eslint-disable-line no-unused-vars */


/**
 * @module Chords
 */

/**
 * Detects chords as those notes that have the exact same start time, only works
 * for ground truth (since recordings are not exact)
 * Does only work if groundtruth is aligned! TuxGuitar produces unaligned MIDI.
 *
 * @param {Note[]} notes notes
 * @returns {Note[][]} array of chord arrays
 */
export function detectChordsByExactStart(notes) {
    const grouped = group(notes, d => d.start);
    const chords = [...grouped]
        .map(d => d[1])
        // Sort chords by time
        .sort((a, b) => a[0].start - b[0].start)
        // Sort notes in each chord by pitch
        .map(chord => chord.sort((a, b) => a.pitch - b.pitch));
    return chords;
}

/**
 * Detects chords, by simply looking for notes that overlap each other in time.
 * Example:
 *    =======
 *       =========
 *         ========
 * Important: Notes must be sorted by start time for this to work correctly.
 *
 * @todo not used yet
 * @todo optional minimum overlap ratio
 * @todo new definition of chord? i.e. notes have to start 'together'
 * @param {Note[]} notes array of Note objects
 * @param {boolean} sortByPitch sort chords by pitch? (otherwise sorted
 *      by note start time)
 * @returns {Note[][]} array of chord arrays
 */
export function detectChordsByOverlap(notes, sortByPitch = true) {
    if (!notes || notes.length === 0) { return []; }
    if (notes.length === 1) { return [[notes[0]]]; }
    const sorted = notes.slice().sort((a, b) => { a.start !== b.start ? (a.start - b.start) : a.pitch - b.pitch; });
    const notesTodo = new Set(sorted);
    const chords = [];
    // Find all overlaps with brute force
    while (notesTodo.size > 0) {
        // Take a new note and make a new chord
        const note1 = notesTodo.values().next().value;
        notesTodo.delete(note1);
        let chord = [note1];
        // Add all notes that overap note1
        for (const note2 of notesTodo.values()) {
            if (note1.overlapInSeconds(note2) >= 0.5 * note1.getDuration()) {
                chord.push(note2);
                notesTodo.delete(note2);
            }
        }
        if (sortByPitch) {
            chord = chord.sort((a, b) => a.pitch - b.pitch);
        }
        chords.push(chord);
    }
    return chords;
}
// export function detectChordsByOverlap(notes, sortByPitch = true) {
//     if (!notes || !notes.length) { return []; }
//     if (notes.length === 1) { return [[notes[0]]]; }
//     const chords = [];
//     let currentChord = [notes[0]];
//     for (let i = 1; i < notes.length; i++) {
//         const note = notes[i];
//         console.log(i);
//         console.log(currentChord);
//         console.log(note);

//         // Check for overlap with current chord
//         let overlaps = false;
//         for (let note2 of currentChord) {
//             if (note.overlapsInTime(note2)) {
//                 overlaps = true;
//                 break;
//             }
//         }
//         console.log(overlaps);
//         if (overlaps) {
//             currentChord.push(note);
//             // TODO: also check the distance from the first note of the chord!
//             // TODO:jump ahead to not count the cord multiple times (partially)
//         } else {
//             // If not, the previous chord is finished
//             // Sort chord by pitch?
//             if (sortByPitch) {
//                 currentChord = currentChord.sort((a, b) => a.pitch - b.pitch);
//             }
//             chords.push(currentChord);
//             // Start new chord
//             if (i < notes.length - 1) {
//                 currentChord = [notes[i + 1]];
//                 i++;
//             }
//         }
//     }
//     // finish last chord
//     chords.push(currentChord);
//     return chords;
// }


/**
 * Maps number of steps (number of notes -1) to possible chord types
 */
const chordTypes = new Map([
    [
        1,
        [
            // TODO: how to handle inversions?
            { steps: [5], name: 'Inverted power chord', suffix: '?' },
            { steps: [7], name: 'Power chord', suffix: '5' },
        ],
    ],
    [
        2,
        [
            { steps: [2, 7], name: 'Suspended second', suffix: 'sus2' },
            { steps: [3, 6], name: 'Diminished', suffix: 'dim' },
            { steps: [3, 7], name: 'Minor', suffix: 'min' },
            { steps: [4, 10], name: 'Seventh', suffix: '7' },
            { steps: [4, 7], name: 'Major', suffix: '' },
            { steps: [4, 8], name: 'Augmented', suffix: 'aug' },
            { steps: [4, 9], name: 'Sixth', suffix: '6' },
            { steps: [5, 7], name: 'Suspended fourth', suffix: 'sus4' },
        ],
    ],
    [
        3,
        [
            { steps: [2, 3, 7], name: 'Minor, added ninth', suffix: 'm(add9)' },
            { steps: [2, 4, 7], name: 'Added ninth', suffix: 'add9' },
            { steps: [3, 6, 10], name: 'Minor seventh, flat fifth', suffix: 'm7b5' },
            { steps: [3, 7, 10], name: 'Minor seventh', suffix: 'm7' },
            { steps: [3, 7, 11], name: 'Minor, major seventh', suffix: 'm(Maj7)' },
            { steps: [3, 7, 8], name: 'Minor, flat sixth', suffix: 'mb6' },
            { steps: [3, 7, 9], name: 'Minor sixth', suffix: 'm6' },
            { steps: [4, 5, 11], name: 'Major eleventh (no fifth, no ninth)', suffix: 'Maj11' },
            { steps: [4, 5, 7], name: 'Added fourth', suffix: 'add4' },
            { steps: [4, 7, 10], name: 'Dominant seventh', suffix: '7' },
            { steps: [4, 7, 11], name: 'Major seventh', suffix: 'Maj7' },
            { steps: [4, 7, 9], name: 'Major Sixth', suffix: 'Maj6' },
        ],
    ],
    [
        4,
        [
            { steps: [2, 3, 6, 10], name: 'Minor ninth flat fifth', suffix: 'm9b5' },
            { steps: [2, 3, 7, 10], name: 'Minor ninth', suffix: 'm9' },
            { steps: [2, 3, 7, 11], name: 'Minor ninth, major seventh', suffix: 'm9(Maj7)' },
            { steps: [2, 3, 7, 9], name: 'Minor sixth, added ninth', suffix: 'm6/9' },
            { steps: [2, 4, 7, 11], name: 'Major ninth', suffix: 'Maj9' },
            { steps: [2, 4, 7, 9], name: 'Sixth, added ninth', suffix: '6/9' },
            { steps: [4, 5, 7, 11], name: 'Major eleventh (no ninth)', suffix: 'Maj11' },
            { steps: [4, 6, 7, 10], name: 'Seventh, sharp eleventh', suffix: '7#11' },
            { steps: [4, 6, 7, 11], name: 'Major seventh, sharp eleventh', suffix: 'Maj7#11' },
        ],
    ],
    [
        5,
        [
            { steps: [2, 4, 5, 7, 11], name: 'Major eleventh', suffix: 'Maj11' },
            { steps: [2, 4, 7, 9, 11], name: 'Major thirteen', suffix: 'Maj13' },
        ],
    ],
    [
        6,
        [
            { steps: [2, 3, 4, 6, 7, 10], name: 'Minor thirteen', suffix: 'm13' },
        ],
    ],
]);

/**
 * Returns chord type, e.g. 'Major', 'Diminished', ...
 * Important: Notes must be sorted by pitch ascending
 *
 * @todo some chords might be multiple types
 * @param {Note[]} notes notes (sorted by pitch asc.)
 * @returns {string} chord type
 */
export function getChordType(notes) {
    if (!notes || notes.length === 0) { return { name: 'No note' }; }
    if (notes.length === 1) { return { name: 'Single note' }; }
    // Get distances in semitones
    let steps = [];
    const lowest = notes[0].pitch;
    for (let index = 1; index < notes.length; index++) {
        steps.push(notes[index].pitch - lowest);
    }
    // Normalize higher than octave
    steps = steps.map(d => d % 12);
    // Filter octaves
    steps = steps.filter(d => d !== 0);
    // Filter doubles
    steps = [...new Set(steps)];
    if (steps.length === 0) { return { name: 'Octave' }; }
    steps.sort((a, b) => a - b);

    // Now get the chord type
    const candidates = chordTypes.get(steps.length);
    for (const cand of candidates) {
        if (arrayShallowEquals(steps, cand.steps)) {
            return cand;
        }
    }
    return { name: 'Unknown chord type' };
}

/**
 * https://github.com/tonaljs/tonal/tree/master/packages/chord
 * Detected chords can be used with https://github.com/tonaljs/tonal/tree/master/packages/chord-type
 *
 * @param {Note[]} notes notes
 * @returns {string[]} possible chord types
 */
export function getChordName(notes) {
    const noteLetters = notes
        .sort((a, b) => a.pitch - b.pitch)
        .map(d => d.getLetter());
    const chords = Chord.detect(noteLetters);
    return chords;
}

// /**
//  * Estimates the name of a given chord of notes
//  *
//  * @param {string} chord name
//  * @return {Note[]} notes array of Note objects
//  * @todo use tonaljs
//  * @todo use this https://github.com/greird/chordictionaryjs
//  */
// export function getNotesFromChordName(name, length = 1, start = 0) {
//     console.error('NIY');
// }
