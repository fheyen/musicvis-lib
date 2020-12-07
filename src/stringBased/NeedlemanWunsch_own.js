import { printMatrix } from "../utils/ArrayUtils";


export function NeedlemanWunsch(a, b, gapPenalty, substitutionCostFn, NormalizeResults) {
    if (a.length === 0 || b.length === 0) {
        return null;
    }
    // TODO: swap arrays for better performance?
    let maxValue = -Infinity;
    // create dynamic programming table
    const table = new Array(a.length).fill(0).map(() => new Array(b.length));
    // fill in values
    table[0][0] = 0;
    // first row
    const pitch2 = b[0];
    for (let i = 1; i < a.length; i++) {
        let pitch1 = a[i];
        let value = substitutionCostFn(pitch1, pitch2);
        table[i][0] = value;
        if (value > maxValue) {
            maxValue = value;
        }
    }
    // first column
    const pitch1 = a[0];
    for (let i = 1; i < b.length; i++) {
        let pitch2 = b[i];
        let value = substitutionCostFn(pitch1, pitch2);
        table[0][i] = value;
        if (value > maxValue) {
            maxValue = value;
        }
    }
    // fill the rest of the table
    // TODO: re-use two arrays instead of using n^2 array
    for (let i = 1; i < a.length; i++) {
        const pitch1 = a[i];
        for (let j = 1; j < b.length; j++) {
            const pitch2 = b[j];
            // get value for the momentanous AOI pair
            let value = substitutionCostFn(pitch1, pitch2);
            // add max value from former row or former column (consider gap penalty)
            let max = -Infinity;
            for (let k = 0; k < i; k++) {
                const val = table[k][j - 1] + (i - k - 1) * gapPenalty;
                if (max < val) {
                    max = val;
                }
            }
            for (let k = 0; k < j; k++) {
                const val = table[i - 1][k] + (j - k - 1) * gapPenalty;
                if (max < val) {
                    max = val;
                }
            }
            value += max;
            table[i][j] = value;
            if (value > maxValue) {
                maxValue = value;
            }
        }
    }
    printMatrix(table, '\t ');

    // get result (largest value in table)
    let result = maxValue;
    // normalize result
    // if (NormalizeResults) {
    //         let MaxValue = double.MinValue;
    //         for (let i = 0; i < NumberOfAOIs; i++) {
    //             for (let j = 0; j < NumberOfAOIs; j++) {
    //                 if (SubstitutionMatrix[i, j] > MaxValue) {
    //                     MaxValue = SubstitutionMatrix[i, j];
    //                 }
    //             }
    //         }
    //         result /= Math.Max(A.length, B.length) * MaxValue;
    // }
    return result;
}
