import { quantile, mean, deviation } from 'd3';

/**
 * @module utils/StatisticsUtils
 */

/**
 * Calculates a confidence interval
 *
 * @see https://www.alchemer.com/resources/blog/how-to-calculate-confidence-intervals/
 * @param {numnber[]} values values
 * @returns {object} {mean, low, high}
 */
export function confidenceInterval(values) {
    const n = values.length;
    const m = mean(values);
    const s = deviation(values);
    const z = 1.960; // 95% CI
    // const z = 2.576; // 99% CI
    const part = z * (s / Math.sqrt(n));
    const low = m - part;
    const high = m + part;
    return { mean: m, low, high };
}

/**
 * Given an array of Note objects, returns the numbers
 * that are drawn in a box plot (of the Note.start property)
 *
 * @param {number[]} values values
 * @returns {object} { q1, q2, q3, r0, r1 }
 */
export function getBoxplotCharacteristics(values) {
    values.sort((a, b) => a - b);
    const minVal = values[0];
    const maxVal = values[values.length - 1];
    const q1 = quantile(values, 0.25);
    const q2 = quantile(values, 0.50);
    const q3 = quantile(values, 0.75);
    const iqr = q3 - q1;
    const r0 = Math.max(minVal, q1 - iqr * 1.5);
    const r1 = Math.min(maxVal, q3 + iqr * 1.5);
    return { q1, q2, q3, r0, r1 };
}

/**
 * Returns a kernel desity estimator function.
 *
 * @see https://www.d3-graph-gallery.com/graph/violin_basicDens.html
 * @example
 * const kde = kernelDensityEstimator(kernelEpanechnikov(0.2), x.ticks(50));
 * const estimate = kde(data);
 * @param {Function} kernel kernel function
 * @param {number[]} X domain
 * @returns {Function} kernel density estimator
 *
 */
export function kernelDensityEstimator(kernel, X) {
    return V => {
        return X.map(x => {
            return [x, mean(V, (v) => kernel(x - v))];
        });
    };
}

/**
 * Epanechnikov kernel
 *
 * @param {number} k kernel size
 * @returns {Function} kernel function
 */
export function kernelEpanechnikov(k) {
    return v => Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
}

/**
 * Gauss kernel
 *
 * @param {number} k kernel size
 * @returns {Function} kernel function
 */
export function kernelGauss(k) {
    return v => Math.abs(v / k) <= 1 ? ((1 / Math.sqrt(2 * Math.PI)) * Math.pow(Math.E, (-1 / 2) * v * v)) : 0;
}
