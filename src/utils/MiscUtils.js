import { group } from "d3";
import { flattenArray } from "./ArrayUtils";


/**
 * Converts beats per minute to seconds per beat
 * @param {number} bpm tempo in beats per minute
 * @returns {number} seconds per beat
 */
export function bpmToSecondsPerBeat(bpm) {
    return 1 / (bpm / 60);
}

/**
 * Clones a map where the values are flat objects,
 * i.e. values do not contain objects themselfes.
 * @param {Map} map a map with object values
 * @returns {Map} a copy of the map with copies of the value objects
 */
export function deepCloneFlatObjectMap(map) {
    const result = new Map();
    map.forEach((value, key) => {
        result.set(key, { ...value });
    });
    return result;
}

/**
 * Groups the Notes from multiple tracks
 * @param {Note[][]} tracks array of arrays of Note objects
 * @returns {Map} grouping
 */
export function groupNotesByPitch(tracks) {
    let allNotes = flattenArray(tracks);
    return group(allNotes, d => d.pitch);
}

/**
 * From an array of Notes, kepp only the highest pitched note of each 'chord'
 * of notes where a chord is simply all notes that start at the same time.
 * @param {Note[]} notes array with Note objects
 * @returns {Note[]} notes array with filtered Note objects
 */
// export function keepOnlyHighestConcurrentNotes(notes) {
//     const grp = Array.from(group(notes, d => d.start));
//     grp.sort((a, b) => a.start - b.start);

// }

/**
 * Sorts notes by time and pitch, then maps them to an array of their pitches.
 * @param {Note[]} notes array with Note objects
 * @returns {number[]} array of note pitches
 */
export function noteArrayToPitchSequence(notes) {
    return notes
        .sort((a, b) => {
            if (a.start === b.start) {
                return a.pitch - b.pitch;
            }
            return a.start - b.start;
        })
        .map(d => d.pitch);
}

/**
 * Sorts notes by time and pitch, then turns them into a string by turning each
 * note's pitch into a character (based on Unicode index).
 * @param {Note[]} notes array with Note objects
 * @returns {string} string representation of note pitches
 */
export function noteArrayToString(notes) {
    const sequence = noteArrayToPitchSequence(notes);
    return String.fromCharCode(...sequence);
}

/**
 * Reverses a given string.
 * @param {string} s string
 * @returns {string} reversed string
 */
export function reverseString(s) {
    return s.split('').reverse().join('');
}

/**
 * Takes a sequence of MIDI pitches and nomralizes them to be in [0, 11]
 * @param {number[]} pitchSequence array with MIDI pitches
 * @returns {number[]} intervals
 */
export function pitchSequenceWithoutOctaves(pitchSequence) {
    return pitchSequence.map(d => d % 12);
}

/**
 * Transforms note pitches to intervals, i.e. diffrences between to subsequent
 * notes: C, C#, C, D => 1, -1, 2
 * @param {number[]} pitchSequence array with MIDI pitches
 * @returns {number[]} intervals
 */
export function pitchSequenceToInvervals(pitchSequence) {
    const result = new Array(pitchSequence.length - 1);
    for (let i = 1; i < pitchSequence.length; i++) {
        result[i - 1] = pitchSequence[i] - pitchSequence[i - 1];
    }
    return result;
}
