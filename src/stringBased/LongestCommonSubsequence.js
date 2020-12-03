/**
 * Calculates the longest common subsequence.
 * From https://rosettacode.org/wiki/Longest_common_subsequence#JavaScript
 * @param {string|Array} x a string
 * @param {string|Array} y another string
 * @returns {string|Array} the longest common subsequence
 */
export function lcs(x, y) {
    // Make sure shorter string is the column string
    const m = x.length;
    const n = y.length;
    // Return now if one (or both) empty
    if (x.length === 0) { return x; }
    if (y.length === 0) { return y; }
    let i, j, lcs = [], row = [], c = [], left, diag, latch;
    // Build the c-table
    for (j = 0; j < n; row[j++] = 0);
    for (i = 0; i < m; i++) {
        c[i] = row = row.slice();
        for (diag = 0, j = 0; j < n; j++, diag = latch) {
            latch = row[j];
            if (x[i] === y[j]) {
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
                lcs.unshift(x[i]);
            // eslint-disable-next-line
            case (i && c[i - 1][j]):
                i--;
                continue;
            case (j && c[i][j - 1]):
                j--;
        }
    }
    // Only join when x and y are strings
    if ((x instanceof Array) || (y instanceof Array)) {
        return lcs;
    } else {
        return lcs.join('');
    }
}

/**
 * Calculates the *length* of the longest common subsequence.
 * Also works with arrays.
 * From https://rosettacode.org/wiki/Longest_common_subsequence#JavaScript
 * @param {string|Array} x a string
 * @param {string|Array} y another string
 * @returns {number} the length of longest common subsequence
 */
export function lcsLength(x, y) {
    // Make sure shorter string is the column string
    const m = x.length;
    const n = y.length;
    // Return now if one (or both) empty
    if (x.length === 0) { return 0; }
    if (y.length === 0) { return 0; }
    let i, j, row = [], c = [], left, diag, latch;
    // Build the c-table
    for (j = 0; j < n; row[j++] = 0);
    for (i = 0; i < m; i++) {
        c[i] = row = row.slice();
        for (diag = 0, j = 0; j < n; j++, diag = latch) {
            latch = row[j];
            if (x[i] === y[j]) {
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
