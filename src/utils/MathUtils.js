import { randomInt } from "d3";

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
 * @param {number[]} arr array
 * @returns {number[]} array with indices of maxima
 */
export function findLocalMaxima(arr) {
    if (arr.length <= 1) { return []; }
    if (arr.length === 2) {
        if (arr[0] > arr[1]) { return [0]; }
        if (arr[1] > arr[0]) { return [1]; }
        return [];
    }
    // General case with 3 or more
    const maximaIndices = [];
    if (arr[0] > arr[1]) {
        maximaIndices.push(0);
    }
    let last = arr[0];
    let curr = arr[1];
    for (let i = 1; i < arr.length - 1; i++) {
        let next = arr[i + 1];
        if (curr > last && curr > next) {
            maximaIndices.push(i);
        }
        last = curr;
        curr = next;
    }
    const lastIndex = arr.length - 1;
    if (arr[lastIndex] > arr[lastIndex - 1]) {
        maximaIndices.push(arr.length - 1);
    }
    return maximaIndices;
}
