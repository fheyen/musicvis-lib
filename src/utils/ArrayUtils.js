/**
 * @module utils/ArrayUtils
 */

import { intersection, union } from 'd3';

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

// TODO: use https://github.com/d3/d3-array/blob/master/README.md#intersection etc

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
    return intersection(set1, set2).size / union(set1, set2).size;
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
 * Returns the maximum numerical value from an array of arrays
 *
 * @param {number[][]} matrix matrix
 * @returns {number} maximum value
 */
export function getMatrixMax(matrix) {
    let maximum = Number.NEGATIVE_INFINITY;
    for (const row of matrix) {
        for (const value of row) {
            if (Number.isNaN(+value)) { continue; }
            if (value > maximum) {
                maximum = value;
            }
        }
    }
    return maximum;
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
