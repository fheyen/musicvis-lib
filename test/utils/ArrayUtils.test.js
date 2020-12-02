import { arrayContainsArray, arrayShallowEquals, arrayHasSameElements, removeDuplicates, flattenArray } from '../../src/utils/ArrayUtils';


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

describe('flattenArray', () => {
    test('empty', () => {
        expect(flattenArray([])).toStrictEqual([]);
    });

    test('already flat', () => {
        expect(flattenArray([1, 2, 3])).toStrictEqual([1, 2, 3]);
    });

    test('1 level', () => {
        expect(flattenArray([1, [20, 21], 3])).toStrictEqual([1, 20, 21, 3]);
    });

    test('2 levels', () => {
        expect(flattenArray([1, [20, [210, 211]], 3])).toStrictEqual([1, 20, [210, 211], 3]);
    });

    test('matrix', () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        expect(flattenArray(matrix)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
