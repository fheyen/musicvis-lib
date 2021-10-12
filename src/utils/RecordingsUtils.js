import * as d3 from 'd3';
import Note from '../types/Note.js';
import { bpmToSecondsPerBeat } from './MusicUtils.js';
import { kernelDensityEstimator, kernelEpanechnikov } from './StatisticsUtils.js';
import { findLocalMaxima } from './MathUtils.js';
import Recording from '../types/Recording.js'; /* eslint-disable-line no-unused-vars */

/**
 * @module utils/RecordingsUtils
 */

/**
 * Filters notes of a recording to remove noise from the MIDI device or pickup
 *
 * @todo detect gaps and fill them
 * @param {Recording} recording a recording
 * @param {number} velocityThreshold notes with velocity < velocityThreshold
 *      are removed
 * @param {number} durationThreshold notes with duration < velocityThreshold
 *      are removed (value in seconds)
 * @returns {Recording} clone of the recording with filtered notes
 */
export function filterRecordingNoise(recording, velocityThreshold = 0, durationThreshold = 0) {
    const result = recording
        .clone()
        .filter(note => {
            if (note.velocity < velocityThreshold) {
                return false;
            }
            if (note.getDuration() < durationThreshold) {
                return false;
            }
            return true;
        });
    // console.log(`Filtered recording, ${result.length()} of ${recording.length()} notes left`);
    return result;
}

/**
 * Removes notes from a recordings which are outside the range of the ground
 * truth and therefore likely noise.
 * Looks up the pitch range from the track of the GT that the recording was made
 * for.
 *
 * @param {Recording[]} recordings recordings
 * @param {Note[][]} groundTruth ground truth
 * @returns {Recording[]} filtered recordings
 */
export function clipRecordingsPitchesToGtRange(recordings, groundTruth) {
    // Speed up by getting range only once for all tracks
    const pitchRanges = new Map();
    for (const [index, part] of groundTruth.entries()) {
        const pitchExtent = d3.extent(part, d => d.pitch);
        pitchRanges.set(index, pitchExtent);
    }
    return recordings.map(recording => {
        const track = recording.selectedTrack;
        const [minPitch, maxPitch] = pitchRanges.get(track);
        return recording.clone().filter(note => note.pitch >= minPitch && note.pitch <= maxPitch);
    });
}

/**
 * Removes notes from a recordings which are outside the fretboard range of the
 * ground truth and therefore likely noise.
 * Looks up the fretboard position range from the track of the GT that the
 * recording was made for.
 *
 * @param {Recording[]} recordings recordings
 * @param {Note[][]} groundTruth ground truth
 * @param {'exact'|'area'} [mode=exact] mode for which fretboard positions to
 *      include: exact will only keep notes that have positions that occur in
 *      the GT, area will get a rectangular area of the fretboard that contains
 *      all GT positions and fill filter on that.
 * @returns {Recording[]} filtered recordings
 */
export function clipRecordingsPitchesToGtFretboardRange(recordings, groundTruth, mode = 'exact') {
    if (mode === 'exact') {
        // Speed up by getting range only once for all tracks
        const occuringPositions = new Map();
        for (const [index, part] of groundTruth.entries()) {
            const positions = new Set(part.map(note => `${note.string} ${note.fret}`));
            occuringPositions.set(index, positions);
        }
        return recordings.map(recording => {
            const track = recording.selectedTrack;
            const validPositions = occuringPositions.get(track);
            return recording.clone().filter(note => validPositions.has(`${note.string} ${note.fret}`));
        });
    } else {
        // Speed up by getting range only once for all tracks
        const positionRanges = new Map();
        for (const [index, part] of groundTruth.entries()) {
            const stringExtent = d3.extent(part, d => d.string);
            const fretExtent = d3.extent(part, d => d.fret);
            positionRanges.set(index, { stringExtent, fretExtent });
        }
        return recordings.map(recording => {
            const track = recording.selectedTrack;
            const { stringExtent, fretExtent } = positionRanges.get(track);
            const [minString, maxString] = stringExtent;
            const [minFret, maxFret] = fretExtent;
            return recording.clone().filter(note => {
                return note.string >= minString && note.string <= maxString
                    && note.fret >= minFret && note.fret <= maxFret;
            });
        });
    }
}

/**
 * Aligns notes to a rhythmic pattern
 *
 * @todo not used
 * @param {Note[]} notes notes
 * @param {number} bpm e.g. 120 for tempo 120
 * @param {number} timeDivision e.g. 16 for 16th note steps
 * @returns {Note[]} aligned notes
 */
export function alignNotesToBpm(notes, bpm, timeDivision = 16) {
    const secondsPerBeat = bpmToSecondsPerBeat(bpm);
    const secondsPerDivision = secondsPerBeat / timeDivision;
    return notes.map(note => {
        const n = note.clone();
        n.start = Math.round(n.start / secondsPerDivision) * secondsPerDivision;
        n.end = Math.round(n.end / secondsPerDivision) * secondsPerDivision;
        return n;
    });
}


/**
 * Calculates a heatmap either pitch- or channel-wise.
 * Pitch-time heatmap:
 * Calculates a heatmap of multiple recordings, to see the note density in the
 * pitch-time-space.
 * Channel-time heatmap:
 * Calculates a heatmap of multiple recordings, to see the note density in the
 * channel-time-space. Channel could be a guitar string or left and right hand
 * for example.
 *
 * @param {Note[]} recNotes recordings
 * @param {number} nRecs number of recordings
 * @param {number} binSize time bin size in milliseconds
 * @param {string} attribute 'pitch' | 'channel'
 * @returns {Map} pitch->heatmap; heatmap is number[] for all time slices
 */
export function recordingsHeatmap(recNotes, nRecs, binSize = 10, attribute = 'pitch') {
    let groupedByAttribute;
    if (attribute === 'pitch') {
        groupedByAttribute = d3.group(recNotes, d => d.pitch);
    } else if (attribute === 'channel') {
        groupedByAttribute = d3.group(recNotes, d => d.channel);
    } else {
        console.warn(`Invalid attribute parameter '${attribute}'`);
    }

    const heatmapByAttribute = new Map();
    for (const [attribute_, notes] of groupedByAttribute.entries()) {
        // Calculate heatmap
        const maxTime = d3.max(notes, d => d.end);
        const nBins = Math.ceil((maxTime * 1000) / binSize) + 1;
        const heatmap = Array.from({ length: nBins }).fill(0);
        for (const note of notes) {
            const start = Math.round(note.start * 1000 / binSize);
            const end = Math.round(note.end * 1000 / binSize);
            for (let bin = start; bin <= end; bin++) {
                heatmap[bin] += 1;
            }
        }
        // Normalize
        for (let bin = 0; bin < heatmap.length; bin++) {
            heatmap[bin] /= nRecs;
        }
        heatmapByAttribute.set(attribute_, heatmap);
    }
    return heatmapByAttribute;
}

/**
 * 'Averages' multiple recordings of the same piece to get an approximation of
 * the ground truth.
 *
 * @todo use velocity?
 * @param {Map} heatmapByPitch haetmap from recordingsHeatmap()
 * @param {number} binSize size of time bins in milliseconds
 * @param {number} threshold note is regarded as true when this ratio of
 *      recordings has a note there
 * @returns {Note[]} approximated ground truth notes
 */
export function averageRecordings(heatmapByPitch, binSize, threshold = 0.8) {
    const newNotes = [];
    for (const [pitch, heatmap] of heatmapByPitch.entries()) {
        // Threshold to get note timespans -> array with booleans (is note here?)
        // TODO: use Canny Edge Detector? Fill Gaps?
        for (let bin = 0; bin < heatmap.length; bin++) {
            heatmap[bin] = heatmap[bin] > threshold;
        }
        // Extract notes
        let currentNote = null;
        for (let bin = 0; bin < heatmap.length; bin++) {
            // Detect note start
            if (!currentNote && heatmap[bin]) {
                const time = bin * binSize / 1000;
                currentNote = new Note(pitch, time, 127, 0);
            }
            // Detect note end or end of array
            if (currentNote && (!heatmap[bin] || bin === heatmap.length - 1)) {
                const time = bin * binSize / 1000;
                currentNote.end = time;
                newNotes.push(currentNote);
                currentNote = null;
            }
        }
    }
    // Sort new notes
    newNotes.sort((a, b) => a.start - b.start);
    return newNotes;
}

/**
 * Extracts a probable ground truth from multiple recordings. Uses one KDE for
 * each note starts and ends, detects maxima in the KDE and thresholds them.
 * Then uses alternating start end end candidates to create notes.
 *
 * @param {Note[]} recNotes recordings notes
 * @param {number} bandwidth kernel bandwidth
 * @param {number} ticksPerSecond number of ticks per second
 * @param {number} threshold threshold
 * @returns {Note[]} new notes
 */
export function averageRecordings2(recNotes, bandwidth = 0.01, ticksPerSecond, threshold) {
    const groupedByPitch = d3.group(recNotes, d => d.pitch);
    const newNotes = [];
    for (const [pitch, notes] of groupedByPitch.entries()) {
        const starts = notes.map(d => d.start);
        const ends = notes.map(d => d.end);
        // Create KDE
        const duration = d3.max(ends);
        const ticks = Math.ceil(ticksPerSecond * duration);
        const x = d3.scaleLinear()
            .domain([0, duration])
            .range([0, duration]);
        const kde = kernelDensityEstimator(kernelEpanechnikov(bandwidth), x.ticks(ticks));
        const estimateStarts = kde(starts);
        const estimateEnds = kde(ends);
        // Search for density maxima
        const maximaStarts = findLocalMaxima(estimateStarts.map(d => d[1]));
        const maximaEnds = findLocalMaxima(estimateEnds.map(d => d[1]));
        // If density value > threshold, update note state
        const chosenStarts = maximaStarts
            .filter(d => estimateStarts[d][1] > threshold)
            .map(d => estimateStarts[d][0]);
        const chosenEnds = maximaEnds
            .filter(d => estimateEnds[d][1] > threshold)
            .map(d => estimateEnds[d][0]);
        // Create notes
        while (chosenStarts.length > 0) {
            const nextStart = chosenStarts.shift();
            // Remove ends before nextStart
            while (chosenEnds.length > 0 && chosenEnds[0] < nextStart) {
                chosenEnds.shift();
            }
            const nextEnd = chosenEnds.shift();
            // Remove starts before nextEnd
            while (chosenStarts.length > 0 && chosenStarts[0] < nextEnd) {
                chosenStarts.shift();
            }
            newNotes.push(new Note(pitch, nextStart, 127, 0, nextEnd));
        }
    }
    // Sort new notes
    newNotes.sort((a, b) => a.start - b.start);
    return newNotes;
}


/**
 * Returns a Map: pitch->differenceMap, differenceMap is an Array with time bins
 * and each bin is either
 *      0 (none, neither GT nor rec have a note here)
 *      1 (missing, only GT has a note here)
 *      2 (additional, only rec has a note here)
 *      3 (both, both have a note here)
 *
 * @todo move to comparison
 * @param {Note[]} gtNotes ground truth notes
 * @param {Note[]} recNotes recrodings notes
 * @param {number} binSize size of a time bin in milliseconds
 * @returns {Map} pitch->differenceMap; differenceMap is number[] for all time slices
 * @example
 *      const diffMap = differenceMap(gtNotes, recNotes, 10);
 */
export function differenceMap(gtNotes, recNotes, binSize) {
    const recHeatmap = recordingsHeatmap(recNotes, 1, binSize);
    const gtHeatmap = recordingsHeatmap(gtNotes, 1, binSize);
    const allPitches = [...new Set([
        ...recHeatmap.keys(),
        ...gtHeatmap.keys(),
    ])];
    const resultMap = new Map();
    for (const pitch of allPitches) {
        let result;
        // Handle pitches that occur only in one of both
        if (!recHeatmap.has(pitch)) {
            // All notes are missing
            result = gtHeatmap.get(pitch).map(d => d !== 0 ? 1 : 0);
        } else if (!gtHeatmap.has(pitch)) {
            // All notes are additional
            result = recHeatmap.get(pitch).map(d => d !== 0 ? 2 : 0);
        } else {
            // Compare both bins for each time slice
            const recH = recHeatmap.get(pitch);
            const gtH = gtHeatmap.get(pitch);
            const nBins = Math.max(recH.length, gtH.length);
            result = Array.from({ length: nBins }).fill(0);
            for (let index = 0; index < result.length; index++) {
                const gtValue = gtH[index] || 0;
                const recValue = recH[index] || 0;
                if (gtValue === 0 && recValue === 0) {
                    // None
                    result[index] = 0;
                }
                if (gtValue !== 0 && recValue === 0) {
                    // Missing
                    result[index] = 1;
                }
                if (gtValue === 0 && recValue !== 0) {
                    // Additional
                    result[index] = 2;
                }
                if (gtValue !== 0 && recValue !== 0) {
                    // Both
                    result[index] = 3;
                }
            }
        }
        resultMap.set(pitch, result);
    }
    return resultMap;
}

/**
 * Computes the 'area' of error from a differenceMap normalized by total area.
 * The area is simply the number of bins with each value, total area is max.
 * number of bins in all pitches * the number of pitches.
 *
 * @todo move to comparison
 * @todo not used or tested yet
 * @todo add threshold for small errors (i.e. ignore area left and right of notes' start and end (masking?)))
 * @param {Map} differenceMap differenceMap from differenceMap()
 * @returns {object} {missing, additional, correct} area ratios
 * @example
 *      const diffMap = differenceMap(gtNotes, recNotes, 10);
 *      const diffMapErrors = differenceMapErrorAreas(diffMap);
 *      const {missing, additional, correct} = diffMapErrors;
 */
export function differenceMapErrorAreas(differenceMap) {
    // Count bins for each error type
    let missingBins = 0;
    let additionalBins = 0;
    let correctBins = 0;

    for (const diffMap of differenceMap.values()) {
        for (const bin of diffMap) {
            if (bin === 1) { missingBins++; }
            else if (bin === 2) { additionalBins++; }
            else if (bin === 3) { correctBins++; }
        }
    }

    // Normalize
    const maxLength = d3.max([...differenceMap], d => d[1].length);
    const totalArea = differenceMap.size * maxLength;

    return {
        missing: missingBins / totalArea,
        additional: additionalBins / totalArea,
        correct: correctBins / totalArea,
    };
}
