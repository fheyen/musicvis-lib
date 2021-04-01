import { max, min } from 'd3';
// import DynamicTimeWarping from 'dynamic-time-warping-2';
// eslint-disable-next-line no-unused-vars
import Note from '../types/Note';

/**
 * @module comparison/Similarity
 */

/**
 * Given a track, a selected time interval and a threshold,
 * this function searches for parts in the track that are
 * similar to the selection.
 * It uses a sliding window with the size of the selection
 * and a stride given as argument.
 *
 * @param {Note[]} track array of Note objects
 * @param {number[]} selectedInterval [startTime, endTime] in seconds
 * @param {number} stride stride for the sliding window in number of bins
 * @param {number} threshold distance threshold below which parts are considered similar
 * @param {number} secondsPerBin time bin size in seconds
 * @param {string} distance one of: 'dtw', 'euclidean', 'nearest'
 * @returns {object} similar parts
 */
export function getSimilarParts(track, selectedInterval, stride, threshold, secondsPerBin = 1 / 16, distance = 'euclidean') {
    console.log(`Searching for similar parts based on selection, using ${distance}`);
    if (track === undefined || track.length === 0) {
        console.warn('No or empty track given');
        return;
    }
    // Discretize track (instead of doing this for every part)
    const minTime = min(track, d => d.start);
    const maxTime = max(track, d => d.end);
    const binCount = Math.ceil((maxTime - minTime) / secondsPerBin);
    const discrTrack = discretizeTime(track, secondsPerBin);
    // Selection
    const startBin = Math.floor((selectedInterval[0] - minTime) / secondsPerBin);
    const endBin = Math.ceil((selectedInterval[1] - minTime) / secondsPerBin);
    const selection = sliceDiscretizedTrack(discrTrack, startBin, endBin);
    const selectionSize = endBin - startBin;
    // Sliding window through the track
    const similarParts = [];
    for (let pos = 0; pos < binCount - selectionSize; pos += stride) {
        const pos2 = pos + selectionSize;
        // Ignore intersections with selection
        if (!(pos >= startBin && pos <= endBin) && !(pos2 >= startBin && pos2 <= endBin)) {
            const part = sliceDiscretizedTrack(discrTrack, pos, pos2);
            const dist = getTrackSimilarity(selection, part, distance);
            if (dist <= threshold) {
                similarParts.push({
                    startBin: pos,
                    endBin: pos2,
                    startTime: minTime + pos * secondsPerBin,
                    endTime: minTime + pos2 * secondsPerBin,
                    dist,
                });
            }
        }
    }
    return {
        selection: {
            startBin,
            endBin,
            startTime: minTime + startBin * secondsPerBin,
            endTime: minTime + endBin * secondsPerBin,
        },
        similarParts,
    };
}

/**
 * Uses calculates the distance between
 * two discretized tracks, for each pitch separately.
 * Pitch-wise distances are averaged and a penalty is added to the distance
 * for pitches that are not occuring in both tracks
 *
 * @see https://github.com/GordonLesti/dynamic-time-warping
 *
 * @param {Map} discrA discretized track
 * @param {Map} discrB discretized track
 * @param {string} distance one of: 'euclidean', 'nearest'
 * @returns {number} distance
 */
export function getTrackSimilarity(discrA, discrB, distance) {
    // Get common pitches
    const common = [];
    for (const key of discrA.keys()) {
        if (discrB.has(key)) {
            common.push(key);
        }
    }
    // Get distance for each pitch and add to weighted average
    let totalDist = 0;
    // Get DTW distance for each common pitch
    for (const pitch of common) {
        const binsA = discrA.get(pitch);
        const binsB = discrB.get(pitch);
        let dist;
        if (distance === 'dtw') {
            // const dtw = new DynamicTimeWarping(binsA, binsB, (a, b) => Math.abs(a - b));
            // dist = dtw.getDistance();
        } else if (distance === 'euclidean') {
            dist = euclideanDistanceSquared(binsA, binsB);
        } else if (distance === 'nearest') {
            dist = neirestNeighborDistance(binsA, binsB);
        }
        // Get weighted average
        // TODO: How to weight the average?
        const weight = 1;
        // const weight = countActiveNoteBins(binsA) + countActiveNoteBins(binsB);
        // const weight = 1 / (countActiveNoteBins(binsA) + countActiveNoteBins(binsB));
        totalDist += weight * dist;
    }
    // TODO: add penalty for uncommon pitches
    // Depending on number of 1s?
    let penaltyWeight = 0;
    for (const discr of [discrA, discrB]) {
        for (const key of discr.keys()) {
            if (!common.includes(key)) {
                penaltyWeight += countActiveNoteBins(discr.get(key));
            }
        }
    }
    return totalDist + penaltyWeight;
}

/**
 * - Normalizes Note times to be between 0 and (maxTime - minTime),
 * - discretizes the start and end time by using Math.round to get
 * the closest time bin (beat) and
 * - Creates one array for each pitch, where each entry contains
 * either a 0 (no note at that time bin) or a 1 (note at that time bin)
 *
 * @param {Note[]} track an array of Note objects
 * @param {number} secondsPerBin time bin size in seconds
 * @returns {Map} pitch to binArray
 */
export function discretizeTime(track, secondsPerBin) {
    const minTime = min(track, d => d.start);
    const maxTime = max(track, d => d.end);
    const binCount = Math.ceil((maxTime - minTime) / secondsPerBin);
    // Map pitch->timeBinArray
    const result = new Map();
    for (const note of track) {
        const startBin = Math.round((note.start - minTime) / secondsPerBin);
        const endBin = Math.round((note.end - minTime) / secondsPerBin);
        const pitch = note.pitch;
        let binArray;
        binArray = result.has(pitch) ? result.get(pitch) : Array.from({ length: binCount }).fill(0);
        for (let bin = startBin; bin <= endBin; bin++) {
            binArray[bin] = 1;
        }
        result.set(pitch, binArray);
    }
    return result;
}

/**
 * Counts the occurence of 1 in an array
 *
 * @param {number[]} binArray array
 * @returns {number} occurence of 1
 */
function countActiveNoteBins(binArray) {
    let count = 0;
    for (const bin of binArray) {
        if (bin === 1) {
            count++;
        }
    }
    return count;
}

/**
 * Slices bins out of a discretices track.
 * This is done for each pitch separately
 *
 * @param {Map} trackMap Map pitch->binArray
 * @param {number} startBin index of first bin
 * @param {number} endBin index of last bin
 * @returns {Map} map with sliced arrays
 */
function sliceDiscretizedTrack(trackMap, startBin, endBin) {
    const slice = new Map();
    for (const [key, value] of trackMap.entries()) {
        slice.set(key, value.slice(startBin, endBin));
    }
    return slice;
}

/**
 * Returns sum_{i=0}^{N-1}{(a_i-b_i)^2},
 * i.e. Euclidean distance but without square root
 *
 * @param {number[]} A an array
 * @param {number[]} B  another array
 * @returns {number} Euclidean distance
 */
function euclideanDistanceSquared(A, B) {
    const maxBins = Math.max(A.length, B.length);
    let sum = 0;
    for (let index = 0; index < maxBins; index++) {
        // If undefined (because one array is shorter)
        // use 0 as padding value
        const a = A[index] || 0;
        const b = B[index] || 0;
        const diff = a - b;
        sum += diff * diff;
    }
    return sum;
}

/**
 * Given two arrays containing 1s and 0s, this algorithm
 * goes through all bins and for each bin where one array
 * has a 1 and the other a 0, it searches for the closest 1
 * next to the 0.
 * The distance is then added to the global distance.
 *
 * @param {number[]} A an array
 * @param {number[]} B  another array
 * @returns {number} nearest neighbor distance
 */
function neirestNeighborDistance(A, B) {
    const maxBins = Math.max(A.length, B.length);
    const maxOffset = Math.round(maxBins / 4);
    let sum = 0;
    for (let index = 0; index < maxBins; index++) {
        let offset = 0;
        // If undefined (because one array is shorter)
        // use 0 as padding value
        const a = A[index] || 0;
        const b = B[index] || 0;
        if (a === b) {
            // 0 cost
        } else if (a === 0 && b === 1) {
            // If b == 1, look for the nearest 1 in a
            // Out of bounds does not matter since undefined !== 1
            // while (i - offset > 0 && i + offset < (maxBins-1) && offset <= maxOffset) {
            while (offset <= maxOffset) {
                offset++;
                if (a[index - offset] === 1 || a[index + offset === 1]) {
                    break;
                }
            }
        } else if (a === 1 && b === 0) {
            // If a == 1, look for the nearest 1 in b
            while (offset <= maxOffset) {
                offset++;
                if (b[index - offset] === 1 || b[index + offset === 1]) {
                    break;
                }
            }
        }
        sum += offset;
    }
    return sum;
}
