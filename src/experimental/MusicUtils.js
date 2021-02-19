
/**
 * Converts beats per minute to seconds per beat
 *
 * @param {number} bpm tempo in beats per minute
 * @returns {number} seconds per beat
 */
export function bpmToSecondsPerBeat(bpm) {
    return 1 / (bpm / 60);
}

/**
 * noteTypeDurationRatios
 * 1 = whole note, 1/2 = half note, ...
 *
 * With added dots:
 * o. has duration of 1.5, o.. 1.75, ...
 */
const noteTypeDurationRatios = [];
const baseDurations = [2, 1, 1 / 2, 1 / 4, 1 / 8, 1 / 16, 1 / 32, 1 / 64];
for (const d of baseDurations) {
    for (let dots = 0; dots < 4; dots++) {
        let duration = d;
        let toAdd = d;
        for (let dot = 0; dot < dots; dot++) {
            // Each dot after the note adds half of the one before
            toAdd /= 2;
            duration += toAdd;
        }
        noteTypeDurationRatios.push({
            type: d,
            dots,
            duration,
        });
    }
}
noteTypeDurationRatios.sort((a, b) => a.duration - b.duration);

/**
 * Estimates the note type (whole, quarter, ...) and number of dots for dotted
 * notes
 *
 * @todo test if corrrectly 'calibrated'
 * @param {number} duration duration of a note
 * @param {number} bpm tempo of the piece in bpm
 * @returns {object} note type and number of dots
 *      e.g. { "dots": 0, "duration": 1, "type": 1 } for a whole note
 *      e.g. { "dots": 1, "duration": 1.5, "type": 1 } for a dotted whole note
 */
export function noteDurationToNoteType(duration, bpm) {
    const quarterDuration = bpmToSecondsPerBeat(bpm);
    const ratio = duration / quarterDuration / 4;
    // TODO: round to finest representable step?

    // Binary search
    return binarySearch(noteTypeDurationRatios, ratio, d => d.duration);
}

/**
 * Returns the value in array that is closest to value.
 * Array MUST be sorted ascending.
 *
 * @todo move to arrayutils
 * @param {Array} array array
 * @param {*} value value
 * @param {Function} accessor accessor
 * @returns {*} value in array closest to value
 */
export function binarySearch(array, value, accessor = d => d) {
    // console.log('search', array, 'for', value);
    // Handle short arrays
    if (array.length <= 3) {
        let closest = null;
        let diff = Number.POSITIVE_INFINITY;
        for (const element of array) {
            const value_ = accessor(element);
            const diff2 = Math.abs(value - value_);
            if (diff2 < diff) {
                closest = element;
                diff = diff2;
            }
        }
        return closest;
    }
    // Split longer array in two for binary search
    const pivotPosition = Math.floor(array.length / 2);
    const pivotElement = array[pivotPosition];
    const pivotValue = accessor(pivotElement);
    if (value === pivotValue) {
        return pivotElement;
    }
    if (value < pivotValue) {
        return binarySearch(array.slice(0, pivotPosition + 1), value, accessor);
    }
    if (value > pivotValue) {
        return binarySearch(array.slice(pivotPosition - 1), value, accessor);
    }
}
