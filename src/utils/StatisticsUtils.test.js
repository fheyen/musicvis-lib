import { confidenceInterval, getBoxplotCharacteristics, kernelDensityEstimator, kernelEpanechnikov, kernelGauss } from './StatisticsUtils';

describe('StatisticsUtils', () => {

    describe('confidenceInterval', () => {
        test('empty', () => {
            expect(
                confidenceInterval([])
            ).toStrictEqual({
                mean: undefined,
                low: NaN,
                high: NaN,
            });
        });

        test('single value', () => {
            expect(
                confidenceInterval([1])
            ).toStrictEqual({
                mean: 1,
                low: NaN,
                high: NaN,
            });
        });

        test('some equal values', () => {
            expect(
                confidenceInterval([1, 1, 1, 1, 1, 1])
            ).toStrictEqual({
                mean: 1,
                low: 1,
                high: 1,
            });
        });

        test('some different values', () => {
            expect(
                confidenceInterval([1, 1, 1, 1, 1, 1, 2, 4, 10, -5, 0.3, Math.PI])
            ).toStrictEqual({
                high: 3.6194512716061427,
                low: -0.21251916267451,
                mean: 1.7034660544658162,
            });
        });
    });

    describe('getBoxplotCharacteristics', () => {
        test('empty', () => {
            expect(
                getBoxplotCharacteristics([])
            ).toStrictEqual({
                q1: undefined,
                q2: undefined,
                q3: undefined,
                r0: NaN,
                r1: NaN,
            });
        });

        test('single value', () => {
            expect(
                getBoxplotCharacteristics([1])
            ).toStrictEqual({
                q1: 1,
                q2: 1,
                q3: 1,
                r0: 1,
                r1: 1,
            });
        });

        test('some equal values', () => {
            expect(
                getBoxplotCharacteristics([1, 1, 1, 1, 1, 1])
            ).toStrictEqual({
                q1: 1,
                q2: 1,
                q3: 1,
                r0: 1,
                r1: 1,
            });
        });

        test('some different values', () => {
            expect(
                getBoxplotCharacteristics([1, 1, 1, 1, 1, 1, 2, 4, 10, -5, 0.3, Math.PI])
            ).toStrictEqual({
                q1: 1,
                q2: 1,
                q3: 2.2853981633974483,
                r0: -0.9280972450961724,
                r1: 4.213495408493621,
            });
        });
    });

    describe('kernelDensityEstimator', () => {
        const kernel = kernelEpanechnikov(10);
        const domain = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
        const estimator = kernelDensityEstimator(kernel, domain);
        const data = [-1, -0.3, -0.1, 0, 0, 0.5, 0.6, 1, 1, 1, 1, 1.5, 2];

        test('empty', () => {
            expect(
                estimator([])
            ).toStrictEqual(
                domain.map(d => [d, undefined])
            );
        });

        test('0', () => {
            expect(
                estimator([100])
            ).toStrictEqual(
                domain.map(d => [d, 0])
            );
        });

        test('data', () => {
            expect(
                estimator(data)
            ).toStrictEqual(
                [
                    [
                        -2,
                        0.06964846153846155,
                    ],
                    [
                        -1.5,
                        0.07137634615384617,
                    ],
                    [
                        -1,
                        0.07272923076923075,
                    ],
                    [
                        -0.5,
                        0.07370711538461537,
                    ],
                    [
                        0,
                        0.07431,
                    ],
                    [
                        0.5,
                        0.0745378846153846,
                    ],
                    [
                        1,
                        0.07439076923076922,
                    ],
                    [
                        1.5,
                        0.07386865384615383,
                    ],
                    [
                        2,
                        0.07297153846153846,
                    ],
                ]
            );
        });
    });


    describe('kernelEpanechnikov', () => {
        const k = kernelEpanechnikov(10);

        test('does not throw', () => {
            expect(() => k(15)).not.toThrow();
            expect(() => k(-15)).not.toThrow();
            expect(() => k(-1)).not.toThrow();
            expect(() => k(1)).not.toThrow();
            expect(() => k(0)).not.toThrow();
        });

        test('outside k should be 0', () => {
            expect(k(15)).toBe(0);
            expect(k(-15)).toBe(0);
        });

        test('inside k', () => {
            expect(k(0)).toBe(0.075);
            expect(k(1)).toBe(0.07425);
            expect(k(-1)).toBe(0.07425);
        });
    });

    describe('kernelGauss', () => {
        const k = kernelGauss(10);

        test('does not throw', () => {
            expect(() => k(15)).not.toThrow();
            expect(() => k(-15)).not.toThrow();
            expect(() => k(-1)).not.toThrow();
            expect(() => k(1)).not.toThrow();
            expect(() => k(0)).not.toThrow();
        });

        test('outside k should be 0', () => {
            expect(k(15)).toBe(0);
            expect(k(-15)).toBe(0);
        });

        test('inside k', () => {
            expect(k(0)).toBe(0.3989422804014327);
            expect(k(1)).toBe(0.24197072451914337);
            expect(k(-1)).toBe(0.24197072451914337);
        });
    });
});
