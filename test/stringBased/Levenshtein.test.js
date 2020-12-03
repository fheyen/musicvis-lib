import { levenshtein } from '../../src/stringBased/Levenshtein';

describe('levenshtein', () => {
    test('both empty: 0', () => {
        expect(levenshtein('', '')).toBe(0);
    });

    test('left empty: right.lengh', () => {
        expect(levenshtein('', '123')).toBe(3);
    });

    test('right empty: left.lengh', () => {
        expect(levenshtein('1234', '')).toBe(4);
    });

    test('insert end', () => {
        expect(levenshtein('1234', '12345')).toBe(1);
    });

    test('insert begin', () => {
        expect(levenshtein('1234', '01234')).toBe(1);
    });

    test('insert middle', () => {
        expect(levenshtein('1234', '12304')).toBe(1);
    });

    test('delete end', () => {
        expect(levenshtein('12345', '1234')).toBe(1);
    });

    test('delete begin', () => {
        expect(levenshtein('01234', '1234')).toBe(1);
    });

    test('delete middle', () => {
        expect(levenshtein('12304', '1234')).toBe(1);
    });

    test('numbers', () => {
        const a = [1, 2, 3, 4];
        const b = [1, 2, 3, 3, 4, 5];
        expect(levenshtein(a, b)).toBe(2);
    });
});
