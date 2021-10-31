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
