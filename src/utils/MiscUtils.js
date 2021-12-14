import * as d3 from 'd3';

/**
 * @module utils/MiscUtils
 */

/**
 * Clones a map where the values are flat objects,
 * i.e. values do not contain objects themselfes.
 *
 * @param {Map} map a map with object values
 * @returns {Map} a copy of the map with copies of the value objects
 */
export function deepCloneFlatObjectMap(map) {
    const result = new Map();
    for (const [key, value] of map.entries()) {
        result.set(key, { ...value });
    }
    return result;
}

/**
 * Groups the Notes from multiple tracks
 *
 * @param {Note[][]} tracks array of arrays of Note objects
 * @returns {Map} grouping
 */
export function groupNotesByPitch(tracks) {
    const allNotes = tracks.flat();
    if (allNotes.length === 0) {
        return new Map();
    }
    return d3.group(allNotes, d => d.pitch);
}

/**
 * Reverses a given string.
 *
 * @param {string} s string
 * @returns {string} reversed string
 */
export function reverseString(s) {
    return [...s].reverse().join('');
}

/**
 * Given some notes and a target note, finds
 * the note that has its start time closest to
 * the one of targetNote
 *
 * @todo replace by d3 argmin or sth?
 * @param {Note[]} notes notes
 * @param {Note} targetNote target note
 * @returns {Note} closest note to targetNote
 */
export function findNearest(notes, targetNote) {
    if (!notes || notes.length === 0 || !targetNote) {
        return null;
    }
    let nearest = null;
    let dist = Number.POSITIVE_INFINITY;
    const targetStart = targetNote.start;
    for (const n of notes) {
        const newDist = Math.abs(n.start - targetStart);
        if (newDist < dist) {
            dist = newDist;
            nearest = n;
        }
    }
    return nearest;
}

/**
 * Allows to wait for a number of seconds with async/await
 * IMPORTANT: This it not exact, it will at *least* wait for X seconds
 *
 * @param {number} seconds number of seconds to wait
 * @returns {Promise} empty Promise that will resolve after the specified amount
 *      of seconds
 */
export function delay(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}
