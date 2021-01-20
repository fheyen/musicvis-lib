/**
 * Computes the Levenshtein distance of two strings or arrays.
 *
 * @see https://gist.github.com/andrei-m/982927#gistcomment-1931258
 * @author https://github.com/kigiri
 * @license MIT
 *
 * @param {string|Array} a a string
 * @param {string|Array} b another string
 * @returns {number} Levenshtein distance
 */
export function levenshtein(a, b) {
    if (a.length === 0) { return b.length; }
    if (b.length === 0) { return a.length; }
    let i, j, previous, value;
    // swap to save some memory O(min(a,b)) instead of O(a)
    if (a.length > b.length) {
        const temporary = a;
        a = b;
        b = temporary;
    }
    // init the row
    const row = Array.from({ length: a.length + 1 });
    for (i = 0; i <= a.length; i++) {
        row[i] = i;
    }
    // fill in the rest
    for (i = 1; i <= b.length; i++) {
        previous = i;
        for (j = 1; j <= a.length; j++) {
            value = b[i - 1] === a[j - 1] ? row[j - 1] : Math.min(
                row[j - 1] + 1, // substitution
                Math.min(
                    previous + 1,   // insertion
                    row[j] + 1,  // deletion
                ),
            );
            row[j - 1] = previous;
            previous = value;
        }
        row[a.length] = previous;
    }
    return row[a.length];
}


/**
 * Computes the Damerau-Levenshtein distance of two strings or arrays.
 *
 * @see https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
 * @param {string|Array} a a string
 * @param {string|Array} b another string
 * @returns {number} Levenshtein distance
 */
export function damerauLevenshtein(a, b) {
    if (a.length === 0) { return b.length; }
    if (b.length === 0) { return a.length; }
    const d = Array.from({ length: a.length + 1 })
        .map(() => Array.from({ length: b.length }));
    for (let i = 0; i <= a.length; i++) {
        d[i][0] = i;
    }
    for (let i = 0; i <= b.length; i++) {
        d[0][i] = i;
    }
    let cost;
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            cost = a[i - 1] === b[j - 1] ? 0 : 1;
            d[i][j] = Math.min(
                d[i - 1][j] + 1,        // deletion
                d[i][j - 1] + 1,        // insertion
                d[i - 1][j - 1] + cost,  // substitution
            );
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                // transposition
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
            }
        }
    }
    return d[a.length][b.length];
}


/**
 * Normalizes the result of levenshtein() by dividing by the longer string's
 * length.
 *
 * @param {string|Array} a a string
 * @param {string|Array} b another string
 * @returns {number} Levenshtein distance
 */
export function normalizedLevenshtein(a, b) {
    const longerLength = Math.max(a.length, b.length);
    if (longerLength === 0) {
        return 0;
    }
    return levenshtein(a, b) / longerLength;
}
