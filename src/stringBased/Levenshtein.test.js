import { levenshtein, damerauLevenshtein, normalizedLevenshtein } from './Levenshtein';

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

    describe('normalized', () => {
        test('both empty: 0', () => {
            expect(levenshtein('', '', true)).toBe(0);
        });

        test('left empty: right.lengh', () => {
            expect(levenshtein('', '123', true)).toBe(1);
        });

        test('right empty: left.lengh', () => {
            expect(levenshtein('1234', '', true)).toBe(1);
        });

        test('same', () => {
            expect(levenshtein('12345', '12345', true)).toBe(0);
        });

        test('insert end', () => {
            expect(levenshtein('1234', '12345', true)).toBe(0.2);
        });

        test('all different', () => {
            expect(levenshtein('12345', '67890', true)).toBe(1);
        });

        test('add one, delete one', () => {
            expect(levenshtein('1234', '2345', true)).toBe(0.5);
        });

        test('numbers', () => {
            const a = [1, 2, 3, 4];
            const b = [1, 2, 3, 3, 4, 5];
            expect(levenshtein(a, b, true)).toBe(1 / 3);
        });
    });
});

describe('damerauLevenshtein', () => {
    test('both empty: 0', () => {
        expect(damerauLevenshtein('', '')).toBe(0);
    });

    test('left empty: right.lengh', () => {
        expect(damerauLevenshtein('', '123')).toBe(3);
    });

    test('right empty: left.lengh', () => {
        expect(damerauLevenshtein('1234', '')).toBe(4);
    });

    test('same', () => {
        expect(damerauLevenshtein('12345', '12345')).toBe(0);
    });

    test('insert end', () => {
        expect(damerauLevenshtein('1234', '12345')).toBe(1);
    });

    test('insert begin', () => {
        expect(damerauLevenshtein('1234', '01234')).toBe(1);
    });

    test('insert middle', () => {
        expect(damerauLevenshtein('1234', '12304')).toBe(1);
    });

    test('delete end', () => {
        expect(damerauLevenshtein('12345', '1234')).toBe(1);
    });

    test('delete begin', () => {
        expect(damerauLevenshtein('01234', '1234')).toBe(1);
    });

    test('delete middle', () => {
        expect(damerauLevenshtein('12304', '1234')).toBe(1);
    });

    test('add one, delete one', () => {
        expect(damerauLevenshtein('1234', '2345')).toBe(2);
    });

    test('numbers', () => {
        const a = [1, 2, 3, 4];
        const b = [1, 2, 3, 3, 4, 5];
        expect(damerauLevenshtein(a, b)).toBe(2);
    });

    // different from levenshtein
    test('transposition', () => {
        expect(damerauLevenshtein('1234', '1324')).toBe(1);
    });
    test('transposition 2 times', () => {
        expect(damerauLevenshtein('12345678', '13245687')).toBe(2);
    });
    test('transposition numbers', () => {
        const a = [1, 2, 3, 4, 5, 6];
        const b = [1, 2, 4, 3, 5, 6];
        expect(damerauLevenshtein(a, b)).toBe(1);
    });

    describe('normalized', () => {
        test('both empty: 0', () => {
            expect(damerauLevenshtein('', '', true)).toBe(0);
        });
        test('one empty: 1', () => {
            expect(damerauLevenshtein('', '123', true)).toBe(1);
            expect(damerauLevenshtein('123', '', true)).toBe(1);
        });
        test('same', () => {
            expect(damerauLevenshtein('12345', '12345', true)).toBe(0);
        });
        test('transposition 2 times', () => {
            expect(damerauLevenshtein('12345678', '13245687', true)).toBe(2 / 8);
        });

    });

});
