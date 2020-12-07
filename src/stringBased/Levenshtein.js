/**
 * Adapted from https://gist.github.com/andrei-m/982927#gistcomment-1931258
 * By https://github.com/kigiri
 * MIT License
 */


/**
 * Computes the Levenshtein distance of two strings or arrays.
 * TODO: add transposition for damerau levenshtein?
 * @param {string|Array} a a string
 * @param {string|Array} b another string
 * @returns {number} Levenshtein distance
 */
export function levenshtein(a, b) {
    if (a.length === 0) { return b.length; }
    if (b.length === 0) { return a.length; }
    let tmp, i, j, prev, val, row;
    // swap to save some memory O(min(a,b)) instead of O(a)
    if (a.length > b.length) {
        tmp = a;
        a = b;
        b = tmp;
    }
    // init the row
    row = Array(a.length + 1);
    for (i = 0; i <= a.length; i++) {
        row[i] = i;
    }
    // fill in the rest
    for (i = 1; i <= b.length; i++) {
        prev = i;
        for (j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                val = row[j - 1]; // match
            } else {
                val = Math.min(
                    row[j - 1] + 1, // substitution
                    Math.min(
                        prev + 1,   // insertion
                        row[j] + 1  // deletion
                    )
                );
            }
            row[j - 1] = prev;
            prev = val;
        }
        row[a.length] = prev;
    }
    return row[a.length];
}


/**
 * Normalizes the result of levenshtein() by dividing by the longer string's
 * length.
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
