/**
 * @module utils/ArrayUtils
 */

import * as d3 from 'd3';

/**
 * Shallow compares two arrays
 *
 * @param {Array} a an array
 * @param {Array} b another array
 * @returns {boolean} true iff equal
 */
export function arrayShallowEquals(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (const [index, element] of a.entries()) {
        if (element !== b[index]) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if two arrays contain the same elements,
 * ignoring their ordering in each array.
 *
 * @param {Array} a an array
 * @param {Array} b another array
 * @param {boolean} checkLength also checks if arrays have the same length
 * @returns {boolean} true iff arrays contain same elements
 */
export function arrayHasSameElements(a, b, checkLength = true) {
    if (checkLength && a.length !== b.length) {
        return false;
    }
    const setA = new Set(a);
    const setB = new Set(b);
    for (const element of setA) {
        if (!setB.has(element)) {
            return false;
        }
    }
    for (const element of setB) {
        if (!setA.has(element)) {
            return false;
        }
    }
    return true;
}

/**
 * Jaccard index calulates the similarity of the sets as the size of the set
 * interaction divided by the size of the set union:
 * jackard_index = |intersection| / |union|
 *
 * @see https://en.wikipedia.org/wiki/Jaccard_index
 * @param {number[]} set1 set 1
 * @param {number[]} set2 set 2
 * @returns {number} similarity in [0, 1]
 */
export function jaccardIndex(set1, set2) {
    if (set1.length === 0 && set2.length === 0) {
        return 1;
    }
    return d3.intersection(set1, set2).size / d3.union(set1, set2).size;
}

/**
 * Kendall Tau distance
 *
 * @see https://en.wikipedia.org/wiki/Kendall_tau_distance
 * @todo naive implementation, can be sped up with hints on Wikipedia,
 *    see also https://stackoverflow.com/questions/6523712/calculating-the-number-of-inversions-in-a-permutation/6523781#6523781
 * @param {number[]} ranking1 a ranking, i.e. for each entry the rank
 * @param {number[]} ranking2 a ranking, i.e. for each entry the rank
 * @param {boolean} [normalize=true] normalize to [0, 1]?
 * @returns {number} Kendall tau distance
 * @throws {'Ranking length must be equal'} if rankings don't have euqal length
 */
export function kendallTau(ranking1, ranking2, normalize = true) {
    if (ranking1.length !== ranking2.length) {
        throw new Error('Ranking length must be equal');
    }
    if (ranking1.length === 0) {
        return 0;
    }
    let inversions = 0;
    const n = ranking1.length;
    for (let a = 0; a < n; a++) {
        for (let b = a + 1; b < n; b++) {
            const r1smaller = ranking1[a] < ranking1[b];
            const r2smaller = ranking2[a] < ranking2[b];
            if (r1smaller !== r2smaller) {
                inversions++;
            }
        }
    }
    if (normalize) {
        inversions /= n * (n - 1) / 2;
    }
    return inversions;
}

/**
 * Removes duplicates from an Array by converting to a Set and back
 *
 * @param {Array} array an array
 * @returns {Array} array without duplicates
 */
export function removeDuplicates(array) {
    return [...new Set(array)];
}

/**
 * Checks whether the array a contains the array b, i.e. whether the first
 * b.length elements are the same.
 *
 * @todo rename to arrayStartsWithArray
 * @param {Array} a an array
 * @param {Array} b a shorter array
 * @returns {boolean} true iff a contains b
 */
export function arrayContainsArray(a, b) {
    if (a.length < b.length) {
        return false;
    }
    for (const [index, element] of b.entries()) {
        if (a[index] !== element) {
            return false;
        }
    }
    return true;
}

/**
 * Compares a slice of a with a slice of b.
 * Slices start at startA and startB and have the same length
 *
 * @param {Array} a an Array
 * @param {Array} b an Array
 * @param {number} length slice length
 * @param {number} [startA=0] start index for the slice in a to compare
 * @param {number} [startB=0] start index for the slice in b to compare
 * @returns {boolean} true if slices are equal
 * @throws {'undefined length'} length is undefined
 * @throws {'start < 0'} when start is negative
 */
export function arraySlicesEqual(a, b, length, startA = 0, startB = 0) {
    if (length === null || length === undefined) {
        throw new Error('undefined length');
    }
    if (startA < 0 || startB < 0) {
        throw new Error('start < 0');
    }
    if (a.length < startA + length || b.length < startB + length) {
        // Array(s) too small for slicing with this start and length
        return false;
    }
    for (let offset = 0; offset < length; offset++) {
        if (a[startA + offset] !== b[startB + offset]) {
            return false;
        }
    }
    return true;
}

/**
 * Finds an array in another array, only shallow comparison
 *
 * @param {Array} haystack array to search in
 * @param {Array} needle array to search for
 * @param {number} [startIndex=0] index from which to start searching
 * @returns {number} index or -1 when not found
 */
export function arrayIndexOf(haystack, needle, startIndex = 0) {
    if (needle.length === 0) { return -1; }
    for (
        let index = startIndex;
        index < haystack.length - needle.length + 1;
        ++index
    ) {
        if (haystack[index] === needle[0]) {
            let found = true;
            for (let offset = 1; offset < needle.length; ++offset) {
                if (haystack[index + offset] !== needle[offset]) {
                    found = false;
                    break;
                }
            }
            if (found) {
                return index;
            }
        }
    }
    return -1;
}

/**
 * Returns the maximum numerical value from an array of arrays with arbitrary
 * depth and structure.
 *
 * @param {Array} array array
 * @returns {number} maximum value
 */
export function getArrayMax(array) {
    return d3.max(array.flat(Number.POSITIVE_INFINITY));
}

/**
 * Normalizes by dividing all entries by the maximum.
 * Only for positive values!
 *
 * @param {Array} array nD array with arbitrary depth and structure
 * @returns {Array} normalized array
 */
export function normalizeNdArray(array) {
    const max = d3.max(array.flat(Number.POSITIVE_INFINITY));
    const normalize = (array_, maxValue) =>
        array_.map((d) => {
            return d.length !== undefined ? normalize(d, maxValue) : d / maxValue;
        });
    return normalize(array, max);
}


/**
 * Assumes same shape of matrices.
 *
 * @param {number[][]} matrixA a matrix
 * @param {number[][]} matrixB a matrix
 * @returns {number} Euclidean distance of the two matrices
 */
export function euclideanDistance(matrixA, matrixB) {
    const valuesA = matrixA.flat();
    const valuesB = matrixB.flat();
    const diffs = valuesA.map((d, i) => d - valuesB[i]);
    return Math.hypot(...diffs);
}

/**
 * Stringifies a 2D array / matrix for logging onto the console.
 *
 * @param {any[][]} matrix the matrix
 * @param {string} colSeparator column separator
 * @param {string} rowSeparator row separator
 * @param {Function} formatter formatting for each element
 * @returns {string} stringified matrix
 */
export function formatMatrix(matrix, colSeparator = ', ', rowSeparator = '\n', formatter) {
    if (!matrix || matrix.length === 0) { return ''; }
    if (formatter) {
        matrix = matrix.map(row => row.map(value => formatter(value)));
    }
    return matrix.map(row => row.join(colSeparator)).join(rowSeparator);
}

/**
 * Returns the value in array that is closest to value.
 * Array MUST be sorted ascending.
 *
 * @param {Array} array array
 * @param {*} value value
 * @param {Function} accessor accessor
 * @returns {*} value in array closest to value
 */
export function binarySearch(array, value, accessor = d => d) {
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

/**
 * Finds streaks of values in an array.
 *
 * @param {Array} values array
 * @param {Function} accessor value to compare
 * @param {Function} equality comparator for equality of two values
 * @returns {object[]} {startIndex, endIndex, length}[]
 * @example
 *   const arr = [1, 1, 2, 3, 3, 3];
 *   const streaks = findStreaks(arr);
 */
export function findStreaks(
    values,
    accessor = (d) => d,
    equality = (a, b) => a === b,
) {
    let startIndex = 0;
    const result = [];
    let startValue = accessor(values[0]);
    for (const [index, value] of values.entries()) {
        const v = accessor(value);
        if (!equality(startValue, v)) {
            result.push({
                startIndex,
                endIndex: index - 1,
                length: index - startIndex,
            });
            startIndex = index;
            startValue = v;
        }
    }
    // Finish last streak
    if (values.length > 0) {
        result.push({
            startIndex,
            endIndex: values.length - 1,
            length: values.length - startIndex,
        });
    }
    return result;
}


/**
 * For each element in a sequence, finds the lowest index where an equal element
 * occurs.
 *
 * @param {Array} sequence an Array
 * @param {Function} equals euqality function
 * @returns {number[]} result
 */
export function findRepeatedIndices(sequence, equals = (a, b) => a === b) {
    return sequence.map((element) => {
        for (const [index2, element2] of sequence.entries()) {
            if (equals(element, element2)) {
                return index2;
            }
        }
        return null;
    });
}
