
/**
 * Shallow compares two arrays
 * @param {Array} a an array
 * @param {Array} b another array
 * @returns {boolean} true iff equal
 */
export function arrayShallowEquals(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

// TODO: use https://github.com/d3/d3-array/blob/master/README.md#intersection etc

/**
 * Checks if two arrays contain the same elements,
 * ignoring their ordering in each array.
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
    for (let element of setA) {
        if (!setB.has(element)) {
            return false;
        }
    }
    for (let element of setB) {
        if (!setA.has(element)) {
            return false;
        }
    }
    return true;
}

/**
 * Removes duplicates from an Array by converting to a Set and back
 * @param {Array} array an array
 * @returns {Array} array without duplicates
 */
export function removeDuplicates(array) {
    return Array.from(new Set(array));
}

/**
 * Checks whether the array a contains the array b, i.e. whether the first
 * b.length elements are the same.
 * TODO: rename to arrayStartsWithArray
 * @param {Array} a an array
 * @param {Array} b a shorter array
 * @returns {boolean} true iff a contains b
 */
export function arrayContainsArray(a, b) {
    if (a.length < b.length) {
        return false;
    }
    for (let i = 0; i < b.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Turns an array of array into a flat array by concatenating all arrays
 * @param {any[][]} array array of arrays
 * @returns {any[]} flattened array
 */
export function flattenArray(array) {
    return [].concat(...array);
}

/**
 * Returns the maximum numerical value from an array of arrays
 * @param {number[][]} matrix
 * @returns {number} maximum value
 */
export function getMatrixMax(matrix) {
    let maximum = -Infinity;
    for (let row of matrix) {
        const value = Math.max(...row);
        if (value > maximum) {
            maximum = value;
        }
    }
    return maximum;
}

/**
 * Prints a 2D array / matrix onto the console.
 * @param {any[][]} matrix the matrix
 * @param {string} colSep column separator
 * @param {string} rowSep row separator
 * @param {Function} formatter formatting for each element
 */
export function printMatrix(matrix, colSep = ', ', rowSep = '\n', formatter) {
    if (formatter) {
        matrix = matrix.map(row => row.map(value => formatter(value)));
    }
    console.log(matrix.map(row => row.join(colSep)).join(rowSep));
}
