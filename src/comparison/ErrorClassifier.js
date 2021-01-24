/**
 * Build on the concept of the algorithm introduced in
 * Jakub Krawczuk - Real-Time and Post-Hoc Visualizations of Guitar Perfomances as a Support for Music Education
 */

import { group } from 'd3';
import { GuitarNote } from '../types/GuitarNote'; /* eslint-disable-line no-unused-vars */
import { Note } from '../types/Note'; /* eslint-disable-line no-unused-vars */
import * as Utils from '../utils';


/**
 * @module comparison/ErrorClassifier
 */


/**
 * Compares a single recording to a ground truth and labels notes as missing,
 * extra, early/late, or short/long
 *
 * @todo generalize to channel/pitch instead of string and fret?
 *
 * @param {Note[]|GuitarNote[]} gtNotes ground truth notes
 * @param {Note[]|GuitarNote[]} recNotes recordings notes
 * @param {string} groupBy attribute to group notes by
 * @param {number} threshold time threshold for same-ness
 * @returns {NoteWithState[]} classified notes
 */
export function classifyErrors(gtNotes, recNotes, groupBy = 'pitch', threshold = 0.05) {
    let accessor;
    if (groupBy === 'pitch') {
        accessor = d => d.pitch;
    } else if (groupBy === 'channel') {
        accessor = d => d.channel;
    } else if (groupBy === 'string') {
        accessor = d => d.string;
    } else {
        console.warn(`Invalid groupBy '${groupBy}'`);
        return;
    }

    const gtGrouped = group(gtNotes, accessor);
    const recGrouped = group(recNotes, accessor);

    // Get all pitches / channels
    const gtKeys = [...gtGrouped.keys()];
    const recKeys = [...recGrouped.keys()];
    const allKeys = Utils.removeDuplicates([...gtKeys, ...recKeys]);

    let classifiedNotes = [];
    for (const key of allKeys) {
        const gt = gtGrouped.get(key);
        const rec = recGrouped.get(key);
        if (!gt) {
            // All rec notes are extra
            classifiedNotes = [
                ...classifiedNotes,
                ...rec.map(d => {
                    return new NoteWithState(d, NoteState.EXTRA);
                }),
            ];
        }
        if (!rec) {
            // All gt notes are missing
            classifiedNotes = [
                ...classifiedNotes,
                ...gt.map(d => {
                    return new NoteWithState(d, NoteState.MISSED);
                }),
            ];
        }
        if (gt && rec) {
            // There can by overlaps, handle this in other function
            const { classified, overlapping } = getGtRecOverlaps(gt, rec);
            const classifiedOverlaps = handleOverlappingNotes(overlapping, threshold);
            classifiedNotes = [...classifiedNotes, ...classified];
            classifiedNotes = [...classifiedNotes, ...classifiedOverlaps];
        }
    }
    classifiedNotes.sort((a, b) => a.start - b.start);
    return classifiedNotes;
}

/**
 * Separates classified GT and rec notes
 *
 * @param {NoteWithState[]} classifiedNotes classified notes
 * @returns {{missed:NoteWithState[], notMissed:NoteWithState[]}} separated notes
 */
export function separateMissed(classifiedNotes) {
    const grouped = group(classifiedNotes, d => d.state === NoteState.MISSED);
    return {
        missed: grouped.get(true),
        notMissed: grouped.get(false),
    };
}

/**
 * @todo use everywhere
 * @ignore
 */
class Overlap {
    /**
     *
     * @param {Note} gtNote ground truth note
     * @param {Note} recNote recorded note
     */
    constructor(gtNote, recNote) {
        this.gtNote = gtNote;
        this.recNote = recNote;
    }
}

/**
 * @todo use everywhere
 */
export const NoteState = {
    SAME: 'NoteState.SAME',
    DIFFERENT: 'NoteState.WRONG',
    EARLY: 'NoteState.EARLY',
    LATE: 'NoteState.LATE',
    SHORT: 'NoteState.SHORT',
    LONG: 'NoteState.LONG',
    MISSED: 'NoteState.MISSED',
    EXTRA: 'NoteState.EXTRA',
    UNKNOWN: 'NoteState.UNKNOWN',
};

/**
 * @ignore
 * @todo use everywhere
 */
export class NoteWithState {
    /**
     *
     * @param {Note} note note
     * @param {NoteState} state state
     */
    constructor(note, state) {
        this.note = note;
        this.state = state;
    }
}

// /**
//  * @param a
//  * @param b
//  */
// function sortByStartAndEnd(a, b) {
//     if (a.end === b.end) {
//         return a.start - b.start;
//     }
//     return a.end - b.end;
// }

/**
 * @param {Map} map map
 * @param {*} key key
 * @param {*} value value
 */
function setOrAdd(map, key, value) {
    if (map.has(key)) {
        map.get(key).add(value);
    } else {
        map.set(key, new Set([value]));
    }
}

/**
 * @param {Map} map map
 * @param {*} key key
 * @returns {boolean} true if map.get(key).size > 0
 */
function hasAtLeastOne(map, key) {
    return map.has(key) && map.get(key)?.size > 0;
}

/**
 * Classifies notes by overlap into missing / extra and overlapping rec notes
 *
 * @ignore
 * @todo Move somewhere else to make it shared?
 * @param {Note[]} gtNotes ground truth notes
 * @param {Note[]} recNotes recorded notes
 * @returns {{classified:NoteWithState[], overlapping:Array}} overlaps and classified notes
 */
function getGtRecOverlaps(gtNotes, recNotes) {
    const missedGtNotes = [];
    const extraRecNotes = new Set(recNotes);
    const overlaps = [];
    for (const gtN of gtNotes) {
        let gtMissed = true;
        for (const recN of recNotes) {
            if (gtN.overlapsInTime(recN)) {
                gtMissed = false;
                extraRecNotes.delete(recN);
                overlaps.push(new Overlap(gtN, recN));
            }
        }
        if (gtMissed) {
            missedGtNotes.push(gtN);
        }
    }
    const missed = missedGtNotes.map(d => new NoteWithState(d, NoteState.MISSED));
    const extra = [...extraRecNotes].map(d => new NoteWithState(d, NoteState.MISSED));
    return {
        classified: [...missed, ...extra],
        overlapping: overlaps,
    };
}

/**
 * Handles overlapping notes by finding best matches and classifying them.
 *
 * @ignore
 * @param {Overlap[]} overlapping pairs of GT and rec notes
 * @param {number} threshold threshold for 'same-ness' in seconds
 * @returns {NoteWithState[]} classified notes
 */
function handleOverlappingNotes(overlapping, threshold) {
    // Create a map gt  to all rec
    //              rec to all gt
    const gtRecMap = new Map();
    const recGtMap = new Map();

    for (const { gtNote, recNote } of overlapping) {
        setOrAdd(gtRecMap, gtNote, recNote);
        setOrAdd(recGtMap, recNote, gtNote);
    }

    const matchedOverlaps = [];
    const possiblyMissedGt = new Set();
    const possiblyExtraRec = new Set();

    // one Recorded note should correspond to one groundTruth note,
    // if it overlaps multiple ones the best match based on start time is
    // calculated and the other GT notes are missed
    for (const [recNote, gtCandidates] of recGtMap.entries()) {
        const gtMatchCandidate = findBestMatch(recNote, gtCandidates);
        if (gtMatchCandidate && hasAtLeastOne(gtRecMap, gtMatchCandidate)) {
            // for the best matching Gt note, get all other matching recordings
            const recMatchContender = gtRecMap.get(gtMatchCandidate);
            if (!recMatchContender) {
                console.log('Should Not happen');
                continue;
            }
            // check the other recordings, this match is either the same note or a better match
            const recActualBestMatch = findBestMatch(gtMatchCandidate, recMatchContender);
            if (!recActualBestMatch) {
                console.log('Should Not happen');
                continue;
            }
            // remove the matched recordedNote from the Set
            recMatchContender.delete(recActualBestMatch);
            // mark all unmatched notes as possibly extra
            for (const recordedNote of recMatchContender) {
                possiblyExtraRec.add(recordedNote);
            }
            // remove this groundTruthNote as it was handled
            gtRecMap.delete(gtMatchCandidate);
            // remove the matched recorded note from all other groundTruth notes
            for (const gtNote of gtCandidates) {
                gtRecMap.get(gtNote)?.delete(recActualBestMatch);
                if (!hasAtLeastOne(gtRecMap, gtNote)) {
                    gtRecMap.delete(gtNote);
                }
            }
            // add the matched pair for later analysis
            matchedOverlaps.push({ rec: recActualBestMatch, gt: gtMatchCandidate });
        } else {
            // the note has no matching GroundTruh Notes
            possiblyExtraRec.add(recNote);
        }
    }

    // Do the same for all unmatched GroundTruth Note
    // This should be a very small percentage
    for (const [gtNote, recCandidates] of gtRecMap.entries()) {
        // get a possible match Candidate
        const recMatchCandidate = findBestMatch(gtNote, recCandidates);
        if (recMatchCandidate && hasAtLeastOne(recGtMap, recMatchCandidate)) {
            const gtMatchContender = recGtMap.get(recMatchCandidate);
            if (!gtMatchContender) {
                console.log('Should Not happen');
                continue;
            }
            // check the other groundtruth Notes, this match is either the same note or a better match
            const gtActualBestMatch = findBestMatch(recMatchCandidate, gtMatchContender);
            if (!gtActualBestMatch) {
                console.log('Should Not happen');
                continue;
            }
            // the same procedure as during recording
            gtMatchContender.delete(gtActualBestMatch);
            for (const value of gtMatchContender) possiblyMissedGt.add(value);
            // remove the recording as its handled
            recGtMap.delete(recMatchCandidate);
            matchedOverlaps.push({ rec: recMatchCandidate, gt: gtActualBestMatch });
            for (const gtNote of recCandidates) {
                gtRecMap.get(gtNote)?.delete(gtActualBestMatch);
                if (!hasAtLeastOne(gtRecMap, gtNote)) {
                    gtRecMap.delete(gtNote);
                }
            }
        } else {
            possiblyMissedGt.add(gtNote);
        }
    }

    const resultingMatchedNotes = [];
    // clear the overlapping notes from the missed and extra Sets
    for (const value of matchedOverlaps) {
        const { gt, rec } = value;
        possiblyMissedGt.delete(gt);
        possiblyExtraRec.delete(rec);
        const state = compareNotes(gt, rec, threshold);
        resultingMatchedNotes.push(new NoteWithState(rec, state));
    }
    // certainly missed
    for (const [note] of possiblyMissedGt.entries()) {
        resultingMatchedNotes.push(new NoteWithState(note, NoteState.MISSED));
    }
    // certainly extra
    for (const [note] of possiblyExtraRec.entries()) {
        resultingMatchedNotes.push(new NoteWithState(note, NoteState.EXTRA));
    }
    return resultingMatchedNotes;
}

/**
 * Finds the best match of a baseNote with some candidates, and using only the
 * notes that were played on the same fret. If there are none, others will be
 * considered instead.
 *
 * @ignore
 * @param {GuitarNote} baseNote base notes
 * @param {Set<GuitarNote>} candidates matching candidates
 * @returns {GuitarNote} best matching note
 */
export function findBestMatch(baseNote, candidates) {
    if (candidates.size === 0) {
        return;
    }
    const sameNotes = [];
    const otherNotes = [];
    // first check if its the same note
    for (const [note] of candidates.entries()) {
        // TODO: replace by pitch to generalize?
        if (baseNote.fret === note.fret) {
            // if (baseNote.pitch === note.pitch) {
            sameNotes.push(note);
        } else {
            otherNotes.push(note);
        }
    }
    // only consider the same frets notes
    const notesToConsider = sameNotes.length > 0 ? sameNotes : otherNotes;
    return findBestMatchBasedOnTime(baseNote, notesToConsider);
}

/**
 * Returns the candidate with the least absolute time difference (in the note
 * start) to the baseNote.
 *
 * @ignore
 * @param {Note} baseNote base note
 * @param {Set<Note>} candidates matching candidates
 * @returns {Note} best matching note
 */
export function findBestMatchBasedOnTime(baseNote, candidates) {
    const candArray = [...candidates];
    const deltas = candArray.map((value) => Math.abs(baseNote.start - value.start));
    let minimum = Number.POSITIVE_INFINITY;
    let bestMatch = 0;
    for (const [index, value] of deltas.entries()) {
        if (value < minimum) {
            bestMatch = index;
            minimum = value;
        }
    }
    return candArray[bestMatch];
}

/**
 * Compares two matched notes to determine the state of the actual note
 * A delta of 50 ms is indistinguishable for human hearing
 *
 * @ignore
 * @param {GuitarNote} expectedNote expected note
 * @param {GuitarNote} actualNote actual note
 * @param {number} threshold threshold for 'same-ness' in seconds
 * @returns {NoteState} note state
 */
export function compareNotes(expectedNote, actualNote, threshold = 0.05) {
    if (
        // TODO: replace by pitch to generalize?
        expectedNote.fret !== actualNote.fret ||
        expectedNote.string !== actualNote.string
    ) {
        return NoteState.DIFFERENT;
    }
    // it is more important to hit the start
    const startDelta = expectedNote.start - actualNote.start;
    if (Math.abs(startDelta) < threshold) {
        const endDelta = expectedNote.end - actualNote.end;
        if (Math.abs(endDelta) < threshold) {
            // start and end matches
            return NoteState.SAME;
        }
        // Ends are less important than starts
        if (endDelta < 0) {
            return NoteState.LONG;
        }
        // we expect notes to be shorter than noted,
        // as the player needs time to play the next one perfectly
        // educated guess: 100ms should be enough to change to the next note
        return endDelta > 0.1 ? NoteState.SHORT : NoteState.SAME;
    }
    return startDelta < 0 ? NoteState.LATE : NoteState.EARLY;
}
