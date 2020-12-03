import { lcs, lcsLength } from '../../src/stringBased/LongestCommonSubsequence';

describe('lcsLength', () => {
    test('both empty: 0', () => {
        expect(lcsLength('', '')).toBe(0);
    });

    test('left empty: 0', () => {
        expect(lcsLength('', '123')).toBe(0);
    });

    test('right empty: 0', () => {
        expect(lcsLength('1234', '')).toBe(0);
    });

    test('insert end', () => {
        expect(lcsLength('1234', '12345')).toBe(4);
    });

    test('insert begin', () => {
        expect(lcsLength('1234', '01234')).toBe(4);
    });

    test('insert middle', () => {
        expect(lcsLength('1234', '12304')).toBe(4);
    });

    test('delete end', () => {
        expect(lcsLength('12345', '1234')).toBe(4);
    });

    test('delete begin', () => {
        expect(lcsLength('01234', '1234')).toBe(4);
    });

    test('delete middle', () => {
        expect(lcsLength('12304', '1234')).toBe(4);
    });

    test('numbers', () => {
        const a = [1, 2, 3, 4];
        const b = [1, 2, 3, 3, 4, 5];
        expect(lcsLength(a, b)).toBe(4);
    });

    test('example1', () => {
        expect(lcsLength('1234', '1224533324')).toBe(4);
    });

    test('example2', () => {
        expect(lcsLength('thisisatest', 'testing123testing')).toBe(7);
    });

    test('example3', () => {
        expect(lcsLength([1, 2, 3, 4], [1, 2, 2, 4, 5, 3, 3, 3, 2, 4])).toBe(4);
    });
});

describe('lcs', () => {
    test('both empty: 0', () => {
        expect(lcs('', '')).toBe('');
    });

    test('left empty: 0', () => {
        expect(lcs('', '123')).toBe('');
    });

    test('right empty: 0', () => {
        expect(lcs('1234', '')).toBe('');
    });

    test('insert end', () => {
        expect(lcs('1234', '12345')).toBe('1234');
    });

    test('insert begin', () => {
        expect(lcs('1234', '01234')).toBe('1234');
    });

    test('insert middle', () => {
        expect(lcs('1234', '12304')).toBe('1234');
    });

    test('delete end', () => {
        expect(lcs('12345', '1234')).toBe('1234');
    });

    test('delete begin', () => {
        expect(lcs('01234', '1234')).toBe('1234');
    });

    test('delete middle', () => {
        expect(lcs('12304', '1234')).toBe('1234');
    });

    test('numbers', () => {
        const a = [1, 2, 3, 4];
        const b = [1, 2, 3, 3, 4, 5];
        expect(lcs(a, b)).toStrictEqual(a);
    });

    test('example1', () => {
        expect(lcs('1234', '1224533324')).toBe('1234');
    });

    test('example2', () => {
        expect(lcs('thisisatest', 'testing123testing')).toBe('tsitest');
    });
});
