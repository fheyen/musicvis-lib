import * as d3 from 'd3';

/**
 * @module utils/StatisticsUtils
 */

/**
 * Calculates a 95% confidence interval
 *
 * @see https://www.alchemer.com/resources/blog/how-to-calculate-confidence-intervals/
 * @param {numnber[]} values values
 * @returns {object} {mean, low, high}
 */
export function confidenceInterval(values) {
    const n = values.length;
    const m = d3.mean(values);
    const s = d3.deviation(values);
    const z = 1.96; // 95% CI
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
    const minValue = values[0];
    const maxValue = values[values.length - 1];
    const q1 = d3.quantile(values, 0.25);
    const q2 = d3.quantile(values, 0.5);
    const q3 = d3.quantile(values, 0.75);
    const iqr = q3 - q1;
    const r0 = Math.max(minValue, q1 - iqr * 1.5);
    const r1 = Math.min(maxValue, q3 + iqr * 1.5);
    return { q1, q2, q3, r0, r1 };
}

/**
 * Returns a kernel desity estimator function.
 *
 * @see https://www.d3-graph-gallery.com/graph/violin_basicDens.html
 * @example
 * // With x being a d3.scaleLinear() scale
 * const kde = kernelDensityEstimator(kernelEpanechnikov(0.2), x.ticks(50));
 * const estimate = kde(data);
 * @param {Function} kernel kernel function
 * @param {number[]} X domain
 * @returns {Function} kernel density estimator
 */
export function kernelDensityEstimator(kernel, X) {
    /**
     * Kernel desity estimator
     * For each value of X it computes the estimated density of the data values
     * in V. The result has the form [ [x1, est1], [x2, est2], ... ]
     *
     * @param {number[]} V values
     * @returns {number[][]} estimates for points of X
     */
    const estimator = (V) => {
        return X.map(x => [
            x,
            d3.mean(V, (v) => kernel(x - v)),
        ]);
    };
    return estimator;
}

/**
 * Epanechnikov kernel
 *
 * @param {number} k kernel size
 * @returns {Function} kernel function with curried k
 */
export function kernelEpanechnikov(k) {
    /**
     * Epanechnokov kernel function
     *
     * @param {number} v value
     * @returns {number} result
     */
    const epKernel = (v) => Math.abs(v /= k) <= 1 ?
        0.75 * (1 - v * v) / k :
        0;
    return epKernel;
}

/**
 * Gauss kernel
 *
 * @param {number} k kernel size
 * @returns {Function} kernel function with curried k
 */
export function kernelGauss(k) {
    /**
     * Gaussian kernel function
     *
     * @param {number} v value
     * @returns {number} result
     */
    const gaKernel = (v) => Math.abs(v / k) <= 1 ?
        ((1 / Math.sqrt(2 * Math.PI)) * Math.E ** ((-1 / 2) * v * v)) :
        0;
    return gaKernel;
}
