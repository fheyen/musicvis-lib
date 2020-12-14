import { levenshtein } from "../stringBased/Levenshtein";
import PitchSequence from "../types/PitchSequence";

/**
 * Turns an array of notes into a string to perform pattern matching search for similar
 * patterns.
 * @param {Note[]} notes notes, must be sorted by Note.start
 * @param {number} startTime start time of the section to search
 * @param {number} endTime end time for the section to search
 * @param {number} threshold threshold for normalized Levenshtein distance in [0, 1]
 * @returns {Object[]} {index, distance, startTime, endTime}
 */
export function findSimilarNoteSections(notes, startTime, endTime, threshold = 0.5) {
    const selectedNotes = notes.filter(d => d.start >= startTime && d.end <= endTime);
    // Convert to string
    const dataString = PitchSequence.fromNotes(notes).getPitches();
    const searchString = PitchSequence.fromNotes(selectedNotes).getPitches();
    const len = searchString.length;
    if (len < 3) {
        return [];
    }
    // Find matches
    const matches = findSimilarStringSections(dataString, searchString, threshold);
    // Get time spans
    return matches.map(m => {
        const { index } = m;
        const note1 = notes[index];
        const note2 = notes[index + len];
        return {
            ...m,
            startTime: note1.start,
            endTime: note2.end
        };
    });
}

/**
 * Finds similar sections in a string via Levenshtein distance
 * @param {stringArray} dataString they string to search in
 * @param {stringArray} searchString the string to search for
 * @param {number} threshold threshold for normalized Levenshtein distance in [0, 1]
 * @returns {Object[]} {index, distance}
 */
export function findSimilarStringSections(dataString, searchString, threshold = 0.5) {
    const len = searchString.length;
    const matches = [];
    for (let i = 0; i < dataString.length - len; i++) {
        const slice = dataString.slice(i, i + len);
        const distance = levenshtein(searchString, slice) / len;
        if (distance < threshold) {
            matches.push({ index: i, distance });
        }
    }
    // Filter overlapping matches by removing the ones with larger distances
    const filtered = [];
    // Therefore, sort by distance ascending and add them one by one
    matches.sort((a, b) => a.distance - b.distance);
    // Speed up hit detection by keeping track of indices that are already occupied
    const occupied = new Array(dataString.length).fill(false);
    for (let m of matches) {
        const { index } = m;
        // Check if occupied
        let occ = false;
        for (let i = index; i < index + len; i++) {
            if (occupied[i]) {
                occ = true;
                break;
            }
        }
        // If not occupied, add and occupy
        if (!occ) {
            filtered.push(m);
            for (let i = index; i < index + len; i++) {
                occupied[i] = true;
            }
        }
    }
    return filtered;
}
