import { max, min } from 'd3';
import DynamicTimeWarping from 'dynamic-time-warping-2';


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
                    dist
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
        similarParts
    };
}

/**
 * Uses dynamic time warping (DTW) to calculate the distance between
 * two discretized tracks, for each pitch separately.
 * Pitch-wise distances are averaged and a penalty if added to the distance
 * for pithces that are not occuring in both tracks
 * https://github.com/GordonLesti/dynamic-time-warping
 *
 * @param {Map} discrA discretized track
 * @param {Map} discrB discretized track
 * @param {string} distance one of: 'dtw', 'euclidean', 'nearest'
 */
export function getTrackSimilarity(discrA, discrB, distance) {
    // Get common pitches
    const common = [];
    for (let key of discrA.keys()) {
        if (discrB.has(key)) {
            common.push(key);
        }
    }
    // Get distance for each pitch and add to weighted average
    let totalDist = 0;
    // Get DTW distance for each common pitch
    for (let pitch of common) {
        const binsA = discrA.get(pitch);
        const binsB = discrB.get(pitch);
        let dist;
        if (distance === 'dtw') {
            const dtw = new DynamicTimeWarping(binsA, binsB, (a, b) => Math.abs(a - b));
            dist = dtw.getDistance();
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
    for (let discr of [discrA, discrB]) {
        for (let key of discr.keys()) {
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
 */
export function discretizeTime(track, secondsPerBin) {
    const minTime = min(track, d => d.start);
    const maxTime = max(track, d => d.end);
    const binCount = Math.ceil((maxTime - minTime) / secondsPerBin);
    // Map pitch->timeBinArray
    const result = new Map();
    for (let note of track) {
        const startBin = Math.round((note.start - minTime) / secondsPerBin);
        const endBin = Math.round((note.end - minTime) / secondsPerBin);
        const pitch = note.pitch;
        let binArray;
        if (result.has(pitch)) {
            binArray = result.get(pitch);
        } else {
            binArray = new Array(binCount).fill(0);
        }
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
 * @param {number[]} binArray
 */
function countActiveNoteBins(binArray) {
    let count = 0;
    for (let bin of binArray) {
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
 */
function sliceDiscretizedTrack(trackMap, startBin, endBin) {
    const slice = new Map();
    trackMap.forEach((value, key) => {
        slice.set(key, value.slice(startBin, endBin));
    });
    return slice;
}


/**
 * Returns sum_{i=0}^{N-1}{(a_i-b_i)^2},
 * i.e. Euclidean distance but without square root
 *
 * @param {number[]} A
 * @param {number[]} B
 */
function euclideanDistanceSquared(A, B) {
    const maxBins = Math.max(A.length, B.length);
    let sum = 0;
    for (let i = 0; i < maxBins; i++) {
        // If undefined (because one array is shorter)
        // use 0 as padding value
        const a = A[i] || 0;
        const b = B[i] || 0;
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
 * @param {number[]} A
 * @param {number[]} B
 */
function neirestNeighborDistance(A, B) {
    const maxBins = Math.max(A.length, B.length);
    const maxOffset = Math.round(maxBins / 4);
    let sum = 0;
    for (let i = 0; i < maxBins; i++) {
        let offset = 0;
        // If undefined (because one array is shorter)
        // use 0 as padding value
        const a = A[i] || 0;
        const b = B[i] || 0;
        if (a === b) {
            // 0 cost
        } else if (a === 0 && b === 1) {
            // If b == 1, look for the nearest 1 in a
            // Out of bounds does not matter since undefined !== 1
            // while (i - offset > 0 && i + offset < (maxBins-1) && offset <= maxOffset) {
            while (offset <= maxOffset) {
                offset++;
                if (a[i - offset] === 1 || a[i + offset === 1]) {
                    break;
                }
            }
        } else if (a === 1 && b === 0) {
            // If a == 1, look for the nearest 1 in b
            while (offset <= maxOffset) {
                offset++;
                if (b[i - offset] === 1 || b[i + offset === 1]) {
                    break;
                }
            }
        }
        sum += offset;
    }
    return sum;
}


// TODO: get similarity without binning by just comparing note start times




/**
 * @param notes
 * @todo abandones for now
 * @todo use a greedy approach:
 * Start at the first notes start and take the first 2 notes
 */
export function getSimilarPartsViaMatching(notes) {
    // TODO: Sort notes by time AND pitch to make sure chords are in the same order?

    if (notes === undefined) {
        console.log('[Similarity] Undefined notes');
        return [];
    }

    if (notes.length < 5) {
        console.log('[Similarity] Not enough notes to calculate similar parts');
        return [];
    }

    let finished = [];

    for (let sequenceStart = 0; sequenceStart < notes.length - 3; sequenceStart++) {
        // Take first note
        let currentIndex = sequenceStart;
        let startNote = notes[currentIndex];

        // Get all notes with same pitch
        let candidateSequences = [];
        for (let i = 0; i < notes.length; i++) {
            const n = notes[i];
            if (n.pitch === startNote.pitch) {
                candidateSequences.push({
                    startIndex: i,
                    length: 1
                });
            }
        }
        currentIndex++;

        // For each of those start notes, see if the following notes are the same
        while (currentIndex < notes.length && candidateSequences.length > 1) {
            let nextPitch = notes[currentIndex].pitch;
            // Only keep best candidates
            // eslint-disable-next-line
            candidateSequences = candidateSequences.filter(cs => {
                const nextIndex = cs.startIndex + currentIndex;
                if (nextIndex < notes.length) {
                    const next = notes[nextIndex];
                    if (next.pitch === nextPitch) {
                        cs.length++;
                        return true;
                    }
                }
                // Remove
                finished.push(cs);
                return false;
            });
            currentIndex++;
        }
    }

    // Filter out short sequences
    finished = finished.filter(d => d.length > 4).sort((a, b) => a.length - b.length);

    for (const f of finished) {
        const { startIndex, length } = f;
        const end = startIndex + length;
        console.log(`Sequence ${startIndex} - ${end} length ${length}`);
        const seq = notes.slice(startIndex, end);
        console.log(seq.map(d => d.pitch).join(', '));
    }



}
