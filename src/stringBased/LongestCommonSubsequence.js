/**
 * Calculates the longest common subsequence.
 * @see https://rosettacode.org/wiki/Longest_common_subsequence#JavaScript
 * @example
 * const lcs = StringBased.LongestCommonSubsequence.lcs('hello world!', 'world');
 * // world
 * @param {string|Array} a a string
 * @param {string|Array} b another string
 * @returns {string|Array} the longest common subsequence
 */
export function lcs(a, b) {
    // Make sure shorter string is the column string
    const m = a.length;
    const n = b.length;
    // Return now if one (or both) empty
    if (a.length === 0) { return a; }
    if (b.length === 0) { return b; }
    let i, j, lcs = [], row = [], c = [], left, diag, latch;
    // Build the c-table
    for (j = 0; j < n; row[j++] = 0);
    for (i = 0; i < m; i++) {
        c[i] = row = row.slice();
        for (diag = 0, j = 0; j < n; j++, diag = latch) {
            latch = row[j];
            if (a[i] === b[j]) {
                row[j] = diag + 1;
            } else {
                left = row[j - 1] || 0;
                if (left > row[j]) {
                    row[j] = left;
                }
            }
        }
    }
    i--;
    j--;
    // row[j] now contains the length of the lcs
    // Recover the lcs from the table
    while (i > -1 && j > -1) {
        switch (c[i][j]) {
            default:
                j--;
                lcs.unshift(a[i]);
            // eslint-disable-next-line
            case (i && c[i - 1][j]):
                i--;
                continue;
            case (j && c[i][j - 1]):
                j--;
        }
    }
    // Only join when x and y are strings
    if ((a instanceof Array) || (b instanceof Array)) {
        return lcs;
    } else {
        return lcs.join('');
    }
}

/**
 * Calculates the *length* of the longest common subsequence.
 * Also works with arrays.
 * From https://rosettacode.org/wiki/Longest_common_subsequence#JavaScript
 * @example
 * const lcsLength = StringBased.LongestCommonSubsequence.lcs('hello world!', 'world');
 * // 5
 * @param {string|Array} a a string
 * @param {string|Array} b another string
 * @returns {number} the length of longest common subsequence
 */
export function lcsLength(a, b) {
    // Make sure shorter string is the column string
    const m = a.length;
    const n = b.length;
    // Return now if one (or both) empty
    if (a.length === 0) { return 0; }
    if (b.length === 0) { return 0; }
    let i, j, row = [], c = [], left, diag, latch;
    // Build the c-table
    for (j = 0; j < n; row[j++] = 0);
    for (i = 0; i < m; i++) {
        c[i] = row = row.slice();
        for (diag = 0, j = 0; j < n; j++, diag = latch) {
            latch = row[j];
            if (a[i] === b[j]) {
                row[j] = diag + 1;
            } else {
                left = row[j - 1] || 0;
                if (left > row[j]) {
                    row[j] = left;
                }
            }
        }
    }
    i--;
    j--;
    // row[j] now contains the length of the lcs
    return row[j];
}


/**
 * Normalizes the result of lcsLength() by dividing by the longer string's
 * length.
 * @param {string|Array} a a string
 * @param {string|Array} b another string
 * @returns {number} normalized length of longest common subsequence
 */
export function normalizedLcsLength(a, b) {
    const longerLength = Math.max(a.length, b.length);
    if (longerLength === 0) {
        return 0;
    }
    return lcsLength(a, b) / longerLength;
}
