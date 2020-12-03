/**
 * Calculates the SIMILARITY for two strings or arrays.
 * Similar to NeedlemanWunsch but O(n^2) instead of O(n^3)
 * TODO: normalize to [0, 1], but how?
 * TODO: somehow the the matched sequences and gaps...
 * IMPORTANT: This metric is not symmetric!
 * From https://de.wikipedia.org/wiki/Gotoh-Algorithmus
 * @param {string|Array} seqA a sequence
 * @param {string|Array} seqB a sequence
 * @param {Function} similarityFunction a function that takes two elements and
 *      returns their similarity score (higher => more similar)
 * @param {number} gapPenaltyStart cost for starting a new gap (negative)
 * @param {number} gapPenaltyExtend cost for continuing a gap (negative)
 * @returns {number} similarity score
 */
export function gotoh(
    seqA,
    seqB,
    similarityFunction = matchMissmatchSimilarity,
    gapPenaltyStart = -1,
    gapPenaltyExtend = -0.1
) {
    // gap penalty function
    const gap = (index) => gapPenaltyStart + (index - 1) * gapPenaltyExtend;
    // maximum of 3 values
    const max = (a, b, c) => Math.max(Math.max(a, b), c);
    const lenA = seqA.length;
    const lenB = seqB.length;
    // initialize matrices
    const a = new Array(lenA + 1).fill(0).map(() => new Array(lenB + 1));
    const b = new Array(lenA + 1).fill(0).map(() => new Array(lenB + 1));
    const c = new Array(lenA + 1).fill(0).map(() => new Array(lenB + 1));
    a[0][0] = 0;
    b[0][0] = 0;
    c[0][0] = 0;
    for (let i = 1; i <= lenA; i++) {
        a[i][0] = c[i][0] = -Infinity;
        b[i][0] = gap(i);
    }
    for (let j = 1; j <= lenB; j++) {
        a[0][j] = b[0][j] = -Infinity;
        c[0][j] = gap(j);
    }
    // compute matrices
    for (let i = 1; i <= lenA; i++) {
        for (let j = 1; j <= lenB; j++) {
            const sim = similarityFunction(seqA[i - 1], seqB[j - 1]);
            a[i][j] = max(
                a[i - 1][j - 1],
                b[i - 1][j - 1],
                c[i - 1][j - 1]) + sim;
            b[i][j] = max(
                a[i - 1][j] + gapPenaltyStart,
                b[i - 1][j] + gapPenaltyExtend,
                c[i - 1][j] + gapPenaltyStart);
            c[i][j] = max(
                a[i][j - 1] + gapPenaltyStart,
                b[i][j - 1] + gapPenaltyStart,
                c[i][j - 1] + gapPenaltyExtend);
        }
    }
    return max(
        a[lenA][lenB],
        b[lenA][lenB],
        c[lenA][lenB]
    );
}

/**
 * Cost function that simply checks whether two values are equal or not
 * @param {any} a some value
 * @param {any} b some value
 * @returns {number} 1 if equal, -1 otherwise
 */
export const matchMissmatchSimilarity = (a, b) => a === b ? 1 : -1;


/**
 * Cost function that takes the negative absolute value of the value's
 * difference, assuming that close values are more similar
 * @param {number} a some value
 * @param {number} b some value
 * @returns {number} -Math.abs(a - b)
 */
export const differenceSimilarity = (a, b) => -Math.abs(a - b);
