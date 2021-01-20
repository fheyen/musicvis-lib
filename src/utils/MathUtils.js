import { randomInt } from 'd3';

/**
 * @module utils/MathUtils
 */

/**
 * Generates a random float in [min, max)
 *
 * @param {number} min minimum
 * @param {number} max maximum
 * @returns {number} random float
 */
export function randFloat(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random element from the given array.
 *
 * @param {Array} array an array
 * @returns {any} random element from the array
 */
export function choose(array) {
    const index = randomInt(0, array.length)();
    return array[index];
}

/**
 * Shortcut for Math.max(minValue, Math.min(maxValue, value))
 *
 * @param {number} value value
 * @param {number} minValue lower limit
 * @param {number} maxValue upper limit
 * @returns {number} clipped number
 */
export function clipValue(value, minValue, maxValue) {
    return Math.max(minValue, Math.min(maxValue, value));
}

/**
 * Rounds a number to a given number of decimals
 *
 * @param {number} number a number
 * @param {number} n number of digits
 * @returns {number} rounded number
 */
export function roundToNDecimals(number, n) {
    return +number.toFixed(n);
}

/**
 * Swaps two numbers if the first is larger than the second
 *
 * @param {number} x a number
 * @param {number} y a number
 * @returns {number[]} array with the smaller number first
 */
export function swapSoSmallerFirst(x, y) {
    if (x <= y) {
        return [x, y];
    }
    return [y, x];
}

/**
 * Local maxima are found by looking at entries that are higher than their left
 * and right neighbor, or higher than their only neighbor if they are at the
 * boundary.
 * IMPORTANT: does not find plateaus
 *
 * @param {number[]} array array
 * @returns {number[]} array with indices of maxima
 */
export function findLocalMaxima(array) {
    if (array.length <= 1) { return []; }
    if (array.length === 2) {
        if (array[0] > array[1]) { return [0]; }
        if (array[1] > array[0]) { return [1]; }
        return [];
    }
    // General case with 3 or more
    const maximaIndices = [];
    if (array[0] > array[1]) {
        maximaIndices.push(0);
    }
    let last = array[0];
    let current = array[1];
    for (let index = 1; index < array.length - 1; index++) {
        const next = array[index + 1];
        if (current > last && current > next) {
            maximaIndices.push(index);
        }
        last = current;
        current = next;
    }
    const lastIndex = array.length - 1;
    if (array[lastIndex] > array[lastIndex - 1]) {
        maximaIndices.push(array.length - 1);
    }
    return maximaIndices;
}
