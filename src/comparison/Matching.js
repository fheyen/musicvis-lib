import { group } from 'd3';
import * as Utils from '../utils';


/**
 * @module comparison/Matching
 */

/**
 * For one recording, separately for each pitch,
 * matches each recorded note to its closest ground truth note.
 * If there are multiple matches, the best (smallest time difference)
 * will be kept and others will be regarded as additional notes.
 * Ground truth notes without match will be regarded as missing notes.
 *
 * Result format (separated by pitch in a Map):
 * Map:pitch->{
 *    gtRecMap           matched rec. note for each GT note Map:gtNoteStart->recNote,
 *    additionalNotes:   rec. notes without matched GT note
 *    missingNotes:      GT notes without matched rec. note
 *    gtNotes:           all GT notes
 * }
 *
 * @todo add max distance?
 * @param {Note[]} recNotes recorded notes of a single recording
 * @param {Note[]} gtNotes ground truth notes
 */
export function matchGtAndRecordingNotes(recNotes, gtNotes) {
    const groupedByPitch = group(gtNotes, d => d.pitch);
    const groupedByPitchRec = group(recNotes, d => d.pitch);
    const result = new Map();
    // For each pitch, map recorded notes to GT notes
    groupedByPitch.forEach((gtNotes, pitch) => {
        const gtRecMap = new Map();
        const additionalNotes = [];
        const missingNotes = [];
        for (let n of gtNotes) {
            gtRecMap.set(n.start, null);
        }
        // Recording might be missing this pitch, then all notes are missing
        if (!groupedByPitchRec.has(pitch)) {
            result.set(pitch, {
                gtRecMap: new Map(),
                additionalNotes: [],
                missingNotes: gtNotes,
                gtNotes: gtNotes
            });
            return;
        }
        const recNotes = groupedByPitchRec.get(pitch);
        for (let r of recNotes) {
            // Match each recorded note to the closest ground truth note
            const nearest = Utils.findNearest(gtNotes, r);
            const currentEntry = gtRecMap.get(nearest.start);
            if (currentEntry === null) {
                // If empty, take
                gtRecMap.set(nearest.start, r);
            } else {
                // If it is taken, overtake it if the new match is closer
                if (Math.abs(nearest.start - r.start) < Math.abs(currentEntry.start - r.start)) {
                    // If it can overtake, add the old note to 'wrong additional notes' list
                    gtRecMap.set(nearest.start, r);
                    additionalNotes.push(currentEntry);
                } else {
                    // If it cannot overtake, add note to 'wrong additional notes' list
                    additionalNotes.push(r);
                }
            }
        }
        // Go trough all GT notes, those that have no recording assigned to it are missing notes
        for (let n of gtNotes) {
            if (gtRecMap.get(n.start) === null) {
                missingNotes.push(n);
            }
        }
        // Store result in map pitch->groupings
        result.set(pitch, {
            gtRecMap,
            additionalNotes,
            missingNotes,
            gtNotes: gtNotes
        });
    });
    // If a recording has a pitch that GT has not, all those notes are additional notes
    groupedByPitchRec.forEach((recNotes, pitch) => {
        if (!groupedByPitch.has(pitch)) {
            result.set(pitch, {
                gtRecMap: new Map(),
                additionalNotes: recNotes,
                missingNotes: [],
                gtNotes: []
            });
            return;
        }
    });
    // console.log(result);
    return result;
}

/**
 * Matches all recorded notes from multiple recordings to the nearest
 * ground truth (GT) note.
 * Contrary to the matching created by matchGtAndRecordingNotes()
 * missing and additional notes are not considered, so multiple notes
 * from a single recording can be matched to the same GT note.
 *
 * Result format:
 * Map:pitch->Map:gtStart->arrayOfMatchedRecNotes
 *
 * @param {Recording[]} recordings recordings
 * @param {Note[]} gtNotes ground truth notes
 *
 */
export function matchGtAndMultipleRecordings(recordings, gtNotes) {
    const allRecNotes = Utils.flattenArray(recordings.map(d => d.notes));
    const groupedByPitch = group(gtNotes, d => d.pitch);
    const groupedByPitchRec = group(allRecNotes, d => d.pitch);
    const result = new Map();
    // For each pitch, map recorded notes to GT notes and keep track of misses
    groupedByPitch.forEach((gtNotes, pitch) => {
        const gtRecMap = new Map();
        for (let n of gtNotes) {
            gtRecMap.set(n.start, []);
        }
        // Recording might be missing this pitch, then match is empty
        if (!groupedByPitchRec.has(pitch)) {
            result.set(pitch, new Map());
            return;
        }
        const recNotes = groupedByPitchRec.get(pitch);
        for (let r of recNotes) {
            // Match each recorded note to the closest ground truth note
            const nearest = Utils.findNearest(gtNotes, r);
            const currentEntry = gtRecMap.get(nearest.start);
            currentEntry.push(r);
            gtRecMap.set(nearest.start, currentEntry);
        }
        // Store result in map pitch->groupings
        result.set(pitch, gtRecMap);
    });
    // console.log(result);
    return result;
}

/**
 * Calculates (for each pitch) the average error for each GT note (averaged
 * over all matched notes in the recordings),
 * as well as the maximum of all those average errors.
 * GT notes that have no matched recorded notes will have an error of 0.
 *
 * @param {Map} multiMatching matching with a GT and multiple recordings
 * @param {number} errorThreshold number seconds of deviation above which
 *      to exclude an error
 * @returns {Map} error summary Map:pitch->{gtErrorMap, maxError},
 *      gtErrorMap is Map:gtStart->error (error is average over all time
 *      differences between the GT note and matched recNotes)
 */
export function getMultiMatchingErrorPerNote(multiMatching, errorThreshold = 3) {
    const result = new Map();
    multiMatching.forEach((gtRecMap, pitch) => {
        const gtErrorMap = new Map();
        let maxError = 0;
        // Go through all gtStart and matched notes
        gtRecMap.forEach((matchedRecNotes, gtStart) => {
            let error = 0;
            if (matchedRecNotes.length > 0) {
                for (let note of matchedRecNotes) {
                    const err = Math.abs(note.start - gtStart);
                    if (err <= errorThreshold) {
                        error += err;
                    }
                }
                error /= matchedRecNotes.length;
                if (error > maxError) {
                    maxError = error;
                }
            }
            gtErrorMap.set(gtStart, error);
        });
        result.set(pitch, {
            gtErrorMap,
            maxError
        });
    });
    return result;
}

/**
 * Calculates the error of a matching by applying penalties and summing up
 *
 * @param {Map} matching a matching created by matchGtAndRecordingNotes
 * @param {number} addPenalty penalty for each additonal note
 * @param {number} missPenalty penalty for each missing note
 * @param {number} timingPenalty penalty for note timing differences in seconds
 * @param {number} timeThreshold timing errors below it (absolute) are ignored
 * @returns {object}
 */
export function getMatchingError(matching, addPenalty, missPenalty, timingPenalty, timeThreshold = 0) {
    const result = {
        total: 0,
        totalAdd: 0,
        totalMiss: 0,
        totalCorrect: 0,
        totalTime: 0,
        totalNumberOfGtNotes: 0,
        perPitch: new Map(),
    };
    matching.forEach((m, pitch) => {
        const { gtRecMap, additionalNotes, missingNotes, gtNotes } = m;
        const addError = additionalNotes.length * addPenalty;
        const missError = missingNotes.length * missPenalty;
        let correct = 0;
        let timeError = 0;
        gtRecMap.forEach((matchedRecNote, gtStart) => {
            // If it is null, this is handled in missingNotes
            if (matchedRecNote !== null) {
                correct++;
                const err = Math.abs(matchedRecNote.start - gtStart);
                if (err > timeThreshold) {
                    timeError += err;
                }
            }
        });
        const total = addError + missError + timeError * timingPenalty;
        result.perPitch.set(pitch, {
            total,
            addError,
            missError,
            correct,
            timeError,
            numberOfGtNotes: gtNotes.length
        });
        // Update total
        result.totalAdd += addError;
        result.totalMiss += missError;
        result.totalCorrect += correct;
        result.totalTime += timeError;
        result.total += total;
        result.totalNumberOfGtNotes += gtNotes.length;
    });
    return result;
}

/**
 * Cuts a section from a matching by filtering on the start times
 * of ground truth, missing, and additonal notes
 *
 * @param {Map} matching matching
 * @param {number} start start time (inclusive)
 * @param {number} end end time (exclusive)
 * @returns {Map} section of matching
 */
export function getMatchingSection(matching, start, end) {
    const result = new Map();
    matching.forEach((m, pitch) => {
        const { gtRecMap, additionalNotes, missingNotes, gtNotes } = m;
        const newGtRecMap = new Map();
        gtRecMap.forEach((matchedRecNote, gtStart) => {
            // If it is null, this is handled in missingNotes
            if (matchedRecNote !== null) {
                if (gtStart >= start && gtStart < end) {
                    newGtRecMap.set(gtStart, matchedRecNote);
                }
            }
        });
        result.set(pitch, {
            gtRecMap: newGtRecMap,
            additionalNotes: additionalNotes.filter(d => d.start >= start && d.start < end),
            missingNotes: missingNotes.filter(d => d.start >= start && d.start < end),
            gtNotes: gtNotes,
        });
    });
    return result;
}

/**
 * Shortcut for getMatchingSection and getMatchingError,
 * see them for parameter details.
 *
 * @param {Map} matching matching
 * @param {number} start start time (inclusive)
 * @param {number} end end time (exclusive)
 * @param {number} addPenalty penalty for each additonal note
 * @param {number} missPenalty penalty for each missing note
 * @param {number} timingPenalty penalty for note timing differences in seconds
 */
export function getMatchingSliceError(matching, start, end, addPenalty, missPenalty, timingPenalty) {
    const section = getMatchingSection(matching, start, end);
    const error = getMatchingError(section, addPenalty, missPenalty, timingPenalty);
    return error;
}
