import { levenshtein, normalizedLevenshtein } from '../../src/stringBased/Levenshtein';

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

    test('same', () => {
        expect(levenshtein('12345', '12345')).toBe(0);
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

    test('add one, delete one', () => {
        expect(levenshtein('1234', '2345')).toBe(2);
    });

    test('numbers', () => {
        const a = [1, 2, 3, 4];
        const b = [1, 2, 3, 3, 4, 5];
        expect(levenshtein(a, b)).toBe(2);
    });
});

describe('normalized levenshtein', () => {
    test('both empty: 0', () => {
        expect(normalizedLevenshtein('', '')).toBe(0);
    });

    test('left empty: right.lengh', () => {
        expect(normalizedLevenshtein('', '123')).toBe(1);
    });

    test('right empty: left.lengh', () => {
        expect(normalizedLevenshtein('1234', '')).toBe(1);
    });

    test('same', () => {
        expect(levenshtein('12345', '12345')).toBe(0);
    });

    test('insert end', () => {
        expect(normalizedLevenshtein('1234', '12345')).toBe(0.2);
    });

    test('all different', () => {
        expect(normalizedLevenshtein('12345', '67890')).toBe(1);
    });

    test('add one, delete one', () => {
        expect(normalizedLevenshtein('1234', '2345')).toBe(0.5);
    });

    test('numbers', () => {
        const a = [1, 2, 3, 4];
        const b = [1, 2, 3, 3, 4, 5];
        expect(normalizedLevenshtein(a, b)).toBe(1 / 3);
    });
});
