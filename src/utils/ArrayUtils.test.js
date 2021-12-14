import { arrayContainsArray, arrayShallowEquals, arrayHasSameElements, removeDuplicates, getArrayMax, formatMatrix, jaccardIndex, binarySearch, kendallTau, normalizeNdArray, euclideanDistance, arrayIndexOf } from './ArrayUtils.js';
import * as au from './ArrayUtils.js';

describe('ArrayUtils', () => {

    describe('arrayContainsArray', () => {
        test('2 empty', () => {
            expect(arrayContainsArray([], [])).toBe(true);
        });

        test('1 empty', () => {
            expect(arrayContainsArray([1, 2, 3], [])).toBe(true);
        });

        test('1 empty, false', () => {
            expect(arrayContainsArray([], [1, 2, 3])).toBe(false);
        });

        test('does contain single', () => {
            expect(arrayContainsArray([1, 2, 3], [1])).toBe(true);
        });

        test('does contain begin', () => {
            expect(arrayContainsArray([1, 2, 3], [1, 2])).toBe(true);
        });

        test('does not contain end', () => {
            expect(arrayContainsArray([1, 2, 3], [2, 3])).toBe(false);
        });

        test('does not contain middle', () => {
            expect(arrayContainsArray([1, 2, 3, 4], [2, 3])).toBe(false);
        });

        test('does contain identical', () => {
            const arr = [1, 2, 3, 4, 5];
            expect(arrayContainsArray(arr, arr)).toBe(true);
        });

        test('does not contain different, same length', () => {
            const arr = [1, 2, 3, 4, 5];
            const arr2 = [12, 2, 3, 4, 5];
            expect(arrayContainsArray(arr, arr2)).toBe(false);
        });

        test('does not contain different, different length', () => {
            const arr = [1, 2, 3, 4];
            const arr2 = [1, 20, 3];
            expect(arrayContainsArray(arr, arr2)).toBe(false);
        });
    });


    describe('arraySlicesEqual', () => {
        test('undefined length', () => {
            expect(() => au.arraySlicesEqual([], [])).toThrow('undefined length');
        });

        test('invalid start', () => {
            expect(() => au.arraySlicesEqual([], [], 0, -1, 0)).toThrow('start < 0');
            expect(() => au.arraySlicesEqual([], [], 0, 0, -1)).toThrow('start < 0');
        });

        test('empty, length == 0', () => {
            expect(au.arraySlicesEqual([], [1, 2, 3], 0)).toBe(true);
            expect(au.arraySlicesEqual([1, 2, 3], [], 0)).toBe(true);
        });

        test('empty, but length > 0', () => {
            expect(au.arraySlicesEqual([], [1, 2, 3], 1)).toBe(false);
            expect(au.arraySlicesEqual([1, 2, 3], [], 1)).toBe(false);
        });

        test('start at 0', () => {
            expect(au.arraySlicesEqual([1, 2, 3, 4], [1, 2, 3, 5], 0)).toBe(true);
            expect(au.arraySlicesEqual([1, 2, 3, 4], [1, 2, 3, 5], 1)).toBe(true);
            expect(au.arraySlicesEqual([1, 2, 3, 4], [1, 2, 3, 5], 2)).toBe(true);
            expect(au.arraySlicesEqual([1, 2, 3, 4], [1, 2, 3, 5], 3)).toBe(true);
            expect(au.arraySlicesEqual([1, 2, 3, 4], [1, 2, 3, 5], 4)).toBe(false);
        });

        test('start at 1', () => {
            expect(au.arraySlicesEqual([1, 2, 3, 4], [1, 2, 3, 5], 0, 1, 1)).toBe(true);
            expect(au.arraySlicesEqual([1, 2, 3, 4], [1, 2, 3, 5], 1, 1, 1)).toBe(true);
            expect(au.arraySlicesEqual([1, 2, 3, 4], [1, 2, 3, 5], 2, 1, 1)).toBe(true);
            expect(au.arraySlicesEqual([1, 2, 3, 4], [1, 2, 3, 5], 3, 1, 1)).toBe(false);
        });

        test('start at different indices', () => {
            expect(au.arraySlicesEqual([1, 2, 3, 4], [0, 1, 2, 3, 5], 3, 0, 1)).toBe(true);
        });

        test('start at different indices, no match', () => {
            expect(au.arraySlicesEqual([1, 2, 3, 4], [0, 1, 7, 3, 5], 3, 0, 1)).toBe(false);
        });
    });

    describe('arrayIndexOf', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7];

        test('empty', () => {
            expect(arrayIndexOf([], arr)).toBe(-1);
            expect(arrayIndexOf(arr, [])).toBe(-1);
        });

        test('same', () => {
            expect(arrayIndexOf(arr, arr)).toBe(0);
        });

        test('at start', () => {
            expect(arrayIndexOf(arr, [1, 2, 3])).toBe(0);
        });

        test('at end', () => {
            expect(arrayIndexOf(arr, [5, 6, 7])).toBe(4);
        });

        test('center', () => {
            expect(arrayIndexOf(arr, [3, 4, 5])).toBe(2);
        });

        test('not contained', () => {
            expect(arrayIndexOf(arr, [3, 5])).toBe(-1);
        });

        test('startIndex', () => {
            expect(arrayIndexOf([1, 2, 3, 1, 2, 3], [1, 2, 3], 3)).toBe(3);
        });

    });


    describe('arrayShallowEquals', () => {
        test('2 empty', () => {
            expect(arrayShallowEquals([], [])).toBe(true);
        });

        test('1 empty', () => {
            expect(arrayShallowEquals([1, 2, 3], [])).toBe(false);
            expect(arrayShallowEquals([], [1, 2, 3])).toBe(false);
        });

        test('begin', () => {
            expect(arrayShallowEquals([1, 2, 3], [1, 2])).toBe(false);
        });

        test('does not equal different, same length', () => {
            const arr = [1, 2, 3, 4, 5];
            const arr2 = [12, 2, 3, 4, 5];
            expect(arrayShallowEquals(arr, arr2)).toBe(false);
        });

        test('does not equal different, different length', () => {
            const arr = [1, 2, 3, 4];
            const arr2 = [1, 20, 3];
            expect(arrayShallowEquals(arr, arr2)).toBe(false);
        });

        test('does equal same', () => {
            const arr = [1, 2, 3, 4, 5];
            expect(arrayShallowEquals(arr, arr)).toBe(true);
        });
    });

    describe('jaccardIndex', () => {
        test('empty', () => {
            expect(jaccardIndex([], [])).toBe(1);
            expect(jaccardIndex([1], [])).toBe(0);
            expect(jaccardIndex([], [1])).toBe(0);
        });

        test('simple cases', () => {
            expect(jaccardIndex([], [2, 3])).toBe(0);
            expect(jaccardIndex([1], [2, 3])).toBe(0);
            expect(jaccardIndex([1], [1, 2, 3])).toBe(1 / 3);
            expect(jaccardIndex([1, 2], [1, 2, 3])).toBe(2 / 3);
            expect(jaccardIndex([1, 2, 3], [1, 2, 3])).toBe(1);
            expect(jaccardIndex([1, 2, 3, 2], [1, 2, 3])).toBe(1);
            expect(jaccardIndex([1, 2, 3, 2], [1, 2, 3, 3])).toBe(1);
        });
    });

    describe('kendallTau', () => {
        test('empty', () => {
            expect(kendallTau([], [])).toBe(0);
        });
        test('different length', () => {
            expect(() => kendallTau([1], [])).toThrow('Ranking length must be equal');
        });
        test('no inversions', () => {
            expect(
                kendallTau([1, 2, 4, 3], [1, 2, 4, 3], false)
            ).toBe(0);
        });
        test('1 inversion', () => {
            expect(
                kendallTau([1, 2, 3, 4], [1, 2, 4, 3], false)
            ).toBe(1);
        });
        test('2 inversions', () => {
            expect(
                kendallTau([1, 2, 3, 4], [2, 1, 4, 3], false)
            ).toBe(2);
        });
        test('2 inversions, normalized', () => {
            expect(
                kendallTau([1, 2, 3, 4], [2, 1, 4, 3])
            ).toBe(2 / (4 * 3 / 2));
        });
        test('Wikipedia example', () => {
            // https://en.wikipedia.org/wiki/Kendall_tau_distance
            const r1 = [1, 2, 3, 4, 5];
            const r2 = [3, 4, 1, 2, 5];
            expect(kendallTau(r1, r2, false)).toBe(4);
            expect(kendallTau(r1, r2)).toBe(0.4);
        });
    });

    describe('arrayHasSameElements', () => {
        test('2 empty', () => {
            expect(arrayHasSameElements([], [])).toBe(true);
        });

        test('same', () => {
            const arr = [1, 2, 3, 4, 5];
            expect(arrayHasSameElements(arr, arr)).toBe(true);
        });

        test('one more', () => {
            const arr = [1, 2, 3, 4, 5];
            const arr2 = [1, 2, 3, 4, 5, 6];
            expect(arrayHasSameElements(arr, arr2, false)).toBe(false);
        });

        test('one less', () => {
            const arr = [1, 2, 3, 4, 5];
            const arr2 = [1, 2, 3, 4];
            expect(arrayHasSameElements(arr, arr2, false)).toBe(false);
        });

        test('one double', () => {
            const arr = [1, 2, 3, 4, 5];
            const arr2 = [1, 2, 3, 4, 5, 3];
            expect(arrayHasSameElements(arr, arr2, false)).toBe(true);
        });

        test('two double', () => {
            const arr = [1, 2, 3, 4, 5];
            const arr2 = [1, 2, 3, 4, 5, 3, 4];
            expect(arrayHasSameElements(arr, arr2, false)).toBe(true);
        });

        test('two double and length check', () => {
            const arr = [1, 2, 3, 4, 5];
            const arr2 = [1, 2, 3, 4, 5, 3, 4];
            expect(arrayHasSameElements(arr, arr2, true)).toBe(false);
        });
    });

    describe('removeDuplicates', () => {
        test('empty', () => {
            expect(removeDuplicates([])).toStrictEqual([]);
        });

        test('no duplicates', () => {
            const arr = [1, 2, 3, 4, 5];
            expect(removeDuplicates(arr)).toStrictEqual(arr);
        });


        test('one double', () => {
            const arr = [1, 2, 3, 4, 5];
            const arr2 = [1, 2, 3, 4, 5, 3];
            expect(removeDuplicates(arr2)).toStrictEqual(arr);
        });

        test('two double', () => {
            const arr = [1, 2, 3, 4, 5];
            const arr2 = [1, 2, 3, 4, 5, 3, 4];
            expect(removeDuplicates(arr2)).toStrictEqual(arr);
        });
    });

    describe('getArrayMax', () => {
        test('empty', () => {
            expect(getArrayMax([])).toBe(undefined);
        });

        test('1x1 matrix', () => {
            const matrix = [[1]];
            expect(getArrayMax(matrix)).toBe(1);
        });

        test('sorted matrix', () => {
            const matrix = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];
            expect(getArrayMax(matrix)).toBe(9);
        });

        test('invalid value', () => {
            const matrix = [
                [1, 2, 3],
                [4, null, 6]
            ];
            expect(getArrayMax(matrix)).toBe(6);
        });

        test('invalid value 2', () => {
            const matrix = [
                [1, 2, 3],
                [4, 'hello', 6]
            ];
            expect(getArrayMax(matrix)).toBe(6);
        });

        test('negative matrix', () => {
            const matrix = [
                [-4, 5, -6],
                [-1, -2, -3],
                [7, -8, -9]
            ];
            expect(getArrayMax(matrix)).toBe(7);
        });
    });


    describe('normalizeNdArray', () => {
        test('empty', () => {
            expect(normalizeNdArray([])).toStrictEqual([]);
            expect(normalizeNdArray([[], []])).toStrictEqual([[], []]);
        });
        test('simple', () => {
            expect(normalizeNdArray([1, 2, 4])).toStrictEqual([0.25, 0.5, 1]);
        });
        test('rectangular', () => {
            expect(normalizeNdArray([
                [1, 2, 4],
                [1, 2, 4],
                [1, 2, 4],
            ])).toStrictEqual([
                [0.25, 0.5, 1],
                [0.25, 0.5, 1],
                [0.25, 0.5, 1],
            ]);
        });
        test('irregular', () => {
            expect(normalizeNdArray([
                [1, 2, 4],
                [1, 2],
                [1],
            ])).toStrictEqual([
                [0.25, 0.5, 1],
                [0.25, 0.5],
                [0.25],
            ]);
        });
    });


    describe('euclideanDistance', () => {
        test('empty', () => {
            expect(euclideanDistance([], [])).toBe(0);
        });
        test('vector', () => {
            expect(euclideanDistance([0, 1], [1, 0])).toBe(Math.sqrt(2));
        });
        test('matrix', () => {
            const matrix = [
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
            ];
            expect(euclideanDistance(matrix, matrix)).toBe(0);
        });
    });



    describe('printMatrix', () => {
        test('empty', () => {
            expect(formatMatrix([])).toBe('');
        });

        test('1x1 matrix', () => {
            const matrix = [[1]];
            expect(formatMatrix(matrix)).toBe('1');
        });

        test('sorted matrix', () => {
            const matrix = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];
            expect(formatMatrix(matrix, ', ', '-')).toBe('1, 2, 3-4, 5, 6-7, 8, 9');
        });

        test('formatter', () => {
            const matrix = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];
            const formatter = value => 2 * value;
            expect(formatMatrix(matrix, ', ', '-', formatter)).toBe('2, 4, 6-8, 10, 12-14, 16, 18');
        });
    });


    describe('binarySearch', () => {
        const arrayEven = [-1, 0, 1, 2, 5, 6, 7, 8];
        const arrayOdd = [-1, 0, 1, 2, 5, 6, 7, 8, 9];

        test('even array', () => {
            expect(binarySearch(arrayEven, 2.3)).toBe(2);
            expect(binarySearch(arrayEven, 6.7)).toBe(7);
            expect(binarySearch(arrayEven, -10)).toBe(-1);
            expect(binarySearch(arrayEven, 10)).toBe(8);
        });

        test('odd array', () => {
            expect(binarySearch(arrayOdd, -0.3)).toBe(0);
            expect(binarySearch(arrayOdd, 0.3)).toBe(0);
            expect(binarySearch(arrayOdd, 2.3)).toBe(2);
            expect(binarySearch(arrayOdd, 8.51)).toBe(9);
        });

        test('accessor', () => {
            const array = [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 7 }, { v: 8 }, { v: 9 }];
            expect(binarySearch(array, 0.3, d => d.v)).toStrictEqual({ v: 1 });
            expect(binarySearch(array, 2.3, d => d.v)).toStrictEqual({ v: 2 });
            expect(binarySearch(array, 8.6, d => d.v)).toStrictEqual({ v: 9 });
        });

        const allCases = arrayEven;

        test.each(allCases)('same %s', (value) => {
            expect(binarySearch(arrayEven, value)).toBe(value);
        });

        test.each(allCases)('similar %s', (value) => {
            expect(
                binarySearch(arrayEven.map(d => d + 0.1), value)
            ).toBe(value + 0.1);
            expect(
                binarySearch(arrayEven.map(d => d - 0.1), value)
            ).toBe(value - 0.1);
        });
    });


    describe('findStreaks', () => {
        test('empty', () => {
            expect(au.findStreaks([])).toStrictEqual([]);
        });
        test('simple', () => {
            expect(au.findStreaks([1, 1, 2, 3, 3, 3])).toStrictEqual(
                [
                    { "startIndex": 0, "endIndex": 1, "length": 2 },
                    { "startIndex": 2, "endIndex": 2, "length": 1 },
                    { "startIndex": 3, "endIndex": 5, "length": 3 },
                ]
            );
        });
        test('no streak', () => {
            expect(au.findStreaks([1, 2, 3, 4])).toStrictEqual(
                [
                    { "startIndex": 0, "endIndex": 0, "length": 1 },
                    { "startIndex": 1, "endIndex": 1, "length": 1 },
                    { "startIndex": 2, "endIndex": 2, "length": 1 },
                    { "startIndex": 3, "endIndex": 3, "length": 1 },
                ]
            );
        });
        test('all the same', () => {
            expect(au.findStreaks([1, 1, 1, 1])).toStrictEqual(
                [
                    { "startIndex": 0, "endIndex": 3, "length": 4 },
                ]
            );
        });
    });
});
