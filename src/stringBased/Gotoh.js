/**
 * @module stringBased/Gotoh
 */


/**
 * Calculates the SIMILARITY for two strings or arrays.
 * Similar to NeedlemanWunsch but O(n^2) instead of O(n^3)
 * IMPORTANT: This metric is not symmetric!
 *
 * @todo normalize to [0, 1], but how?
 * @todo somehow the the matched sequences and gaps...
 * @see https://de.wikipedia.org/wiki/Gotoh-Algorithmus
 * @param {string|Array} seqA a sequence
 * @param {string|Array} seqB a sequence
 * @param {Function} similarityFunction a function that takes two elements and
 *      returns their similarity score (higher => more similar)
 *      (a:any, b:any):number
 * @param {number} gapPenaltyStart cost for starting a new gap (negative)
 * @param {number} gapPenaltyExtend cost for continuing a gap (negative)
 * @returns {number} similarity score
 */
export function gotoh(
    seqA,
    seqB,
    similarityFunction = matchMissmatchSimilarity,
    gapPenaltyStart = -1,
    gapPenaltyExtend = -0.1,
) {
    // check if strings are empty
    if (seqA.length === 0 && seqB.length === 0) { return 0; }
    // gap penalty function
    const gap = (index) => gapPenaltyStart + (index - 1) * gapPenaltyExtend;
    const lengthA = seqA.length;
    const lengthB = seqB.length;
    // initialize matrices
    const a = Array.from({ length: lengthA + 1 }).map(() => Array.from({ length: lengthB + 1 }));
    const b = Array.from({ length: lengthA + 1 }).map(() => Array.from({ length: lengthB + 1 }));
    const c = Array.from({ length: lengthA + 1 }).map(() => Array.from({ length: lengthB + 1 }));
    a[0][0] = 0;
    b[0][0] = 0;
    c[0][0] = 0;
    for (let i = 1; i <= lengthA; i++) {
        a[i][0] = c[i][0] = Number.NEGATIVE_INFINITY;
        b[i][0] = gap(i);
    }
    for (let i = 1; i <= lengthB; i++) {
        a[0][i] = b[0][i] = Number.NEGATIVE_INFINITY;
        c[0][i] = gap(i);
    }
    // compute matrices
    for (let i = 1; i <= lengthA; i++) {
        for (let j = 1; j <= lengthB; j++) {
            const sim = similarityFunction(seqA[i - 1], seqB[j - 1]);
            a[i][j] = Math.max(
                a[i - 1][j - 1],
                b[i - 1][j - 1],
                c[i - 1][j - 1]) + sim;
            b[i][j] = Math.max(
                a[i - 1][j] + gapPenaltyStart,
                b[i - 1][j] + gapPenaltyExtend,
                c[i - 1][j] + gapPenaltyStart);
            c[i][j] = Math.max(
                a[i][j - 1] + gapPenaltyStart,
                b[i][j - 1] + gapPenaltyStart,
                c[i][j - 1] + gapPenaltyExtend);
        }
    }
    return Math.max(
        a[lengthA][lengthB],
        b[lengthA][lengthB],
        c[lengthA][lengthB],
    );
}

/**
 * Idea: what would the max. similarity value be? the string with itself!
 * So just compare the longer string to itself and use that similarity to
 * normalize
 *
 * @todo does this work with negative costs and/or results?
 * @todo can this be optimized since only the similarityFunction is needed?
 * @todo only compute 'a' matrix for maxSimilarity
 * @param {string|Array} seqA a sequence
 * @param {string|Array} seqB a sequence
 * @param {Function} similarityFunction a function that takes two elements and
 *      returns their similarity score (higher => more similar)
 *      (a:any, b:any):number
 * @param {number} gapPenaltyStart cost for starting a new gap (negative)
 * @param {number} gapPenaltyExtend cost for continuing a gap (negative)
 * @returns {number} normalized similarity score
 */
export function normalizedGotoh(
    seqA,
    seqB,
    similarityFunction = matchMissmatchSimilarity,
    gapPenaltyStart = -1,
    gapPenaltyExtend = -0.1,
) {
    const similarity = gotoh(seqA, seqB, similarityFunction, gapPenaltyStart, gapPenaltyExtend);
    const longer = seqA.length >= seqB.length ? seqA : seqB;
    const maxSimilarity = gotoh(longer, longer, similarityFunction, gapPenaltyStart, gapPenaltyExtend);
    if (maxSimilarity === 0) {
        // TODO: can this happen? what would be reasonable here?
        return similarity;
    }
    return similarity / maxSimilarity;
}

/**
 * Cost function that simply checks whether two values are equal or not with ===
 *
 * @param {any} a some value
 * @param {any} b some value
 * @returns {number} 1 if equal, -1 otherwise
 */
export const matchMissmatchSimilarity = (a, b) => a === b ? 1 : -1;


/**
 * Cost function that takes the negative absolute value of the value's
 * difference, assuming that close values are more similar
 *
 * @param {number} a some value
 * @param {number} b some value
 * @returns {number} -Math.abs(a - b)
 */
export const differenceSimilarity = (a, b) => -Math.abs(a - b);
