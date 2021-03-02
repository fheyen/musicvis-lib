import NoteArray from '../types/NoteArray';
import { group, max } from 'd3';

/**
 * Global alignment.
 *
 * Returns an array with matches sorted by magnitude of agreement.
 * The offsetMilliseconds value describes at what time the first note of the
 * recording should start.
 *
 * Goal: Know which part of ground truth (GT) was played in recording (rec)
 * Assumptions:
 * - Rec has same tempo as GT
 * - Rec does not start before GT
 * - Rec does not repeat something that is not repeated in the GT
 * - Rec does not have gaps
 * Ideas:
 * - Brute-force
 * - Sliding window
 * - Using diff between time-pitch matrix of GT and rec
 * - Only compute agreement (correct diff part) for the current overlap
 * - For each time position save the agreement magnitude
 * - Optionally: repeat around local maxima with finer binSize
 *
 * @param {Note[]} gtNotes ground truth notes
 * @param {Note[]} recNotes recorded notes
 * @param {number} binSize time bin size in milliseconds
 * @returns {object[]} best offsets with agreements
 */
export function alignGtAndRecToMinimizeDiffError(gtNotes, recNotes, binSize) {
    gtNotes = new NoteArray(gtNotes);
    recNotes = new NoteArray(recNotes).shiftToStartAt(0);
    const gtDuration = gtNotes.getDuration();
    const recDuration = recNotes.getDuration();
    const nBins = Math.ceil((gtDuration * 1000) / binSize) + 1;
    const nRecBins = Math.ceil((recDuration * 1000) / binSize) + 1;
    // TODO: just switch them around?
    if (nRecBins > nBins) {
        console.warn('Cannot compare GT and rec if rec is longer');
    }
    // Get activation maps
    const gtActivation = activationMap(gtNotes.getNotes(), binSize);
    const recActivation = activationMap(recNotes.getNotes(), binSize);
    // Compare with sliding window
    const agreementsPerOffset = [];
    for (let offset = 0; offset < nBins - nRecBins + 1; offset++) {
        const currentAgreement = agreement(gtActivation, recActivation, offset);
        // console.log(`Comparing gt bins ${offset}...${offset + nRecBins} to rec\nGot agreement ${currentAgreement}`);
        agreementsPerOffset.push({
            offsetBins: offset,
            offsetMilliseconds: offset * binSize,
            agreement: currentAgreement,
        });
    }
    // Sort by best match
    const sorted = agreementsPerOffset.sort((a, b) => b.agreement - a.agreement);
    return sorted;
}

/**
 * Returns an activation map, that maps pitch to an array of time bins.
 * Each bin contains a 0 when there is no note or a 1 when there is one.
 *
 * @param {Note[]} allNotes notes
 * @param {number} binSize time bin size in milliseconds
 * @returns {Map} activation map
 */
export function activationMap(allNotes, binSize = 100) {
    const activationMap = new Map();
    for (const [pitch, notes] of group(allNotes, d => d.pitch).entries()) {
        const maxTime = max(notes, d => d.end);
        const nBins = Math.ceil((maxTime * 1000) / binSize) + 1;
        const pitchActivationMap = Array.from({ length: nBins }).fill(0);
        // Calculate heatmap by writing 1 where a note is active
        for (const note of notes) {
            const start = Math.round(note.start * 1000 / binSize);
            const end = Math.round(note.end * 1000 / binSize);
            for (let bin = start; bin <= end; bin++) {
                pitchActivationMap[bin] = 1;
            }
        }
        activationMap.set(pitch, pitchActivationMap);
    }
    return activationMap;
}

/**
 * Given two activation maps, simply counts the number of bins [pitch, time]
 * where both have a 1, so an acitve note
 * Gtmust be longer than rec
 *
 * @todo also count common 0s?
 * @param {Map} gtActivations see activationMap()
 * @param {Map} recActivations see activationMap()
 * @param {number} offset offset for activation2 when comparing
 * @returns {number} agreement
 */
export function agreement(gtActivations, recActivations, offset) {
    const allPitches = [...new Set([
        ...gtActivations.keys(),
        ...recActivations.keys(),
    ])];
    let agreement = 0;
    for (const pitch of allPitches) {
        // Handle pitches that occur only in one of both
        if (!gtActivations.has(pitch)) {
            // All notes are missing
        } else if (!recActivations.has(pitch)) {
            // All notes are additional
        } else {
            // Compare both bins for each time slice
            const gtA = gtActivations.get(pitch);
            const recA = recActivations.get(pitch);
            // Go through full rec, and compare to current section of GT
            // eslint-disable-next-line unicorn/no-for-loop
            for (let index = 0; index < recA.length; index++) {
                const gtValue = gtA[index + offset] || 0;
                const recValue = recA[index] || 0;
                if (gtValue === 1 && recValue === 1) {
                    agreement++;
                }
            }

        }
    }
    return agreement;
}
