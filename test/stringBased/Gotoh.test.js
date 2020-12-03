import { gotoh, matchMissmatchSimilarity, differenceSimilarity } from '../../src/stringBased/Gotoh';

describe('matchMissmatchSimilarity', () => {
    test('equal', () => {
        expect(matchMissmatchSimilarity('a', 'a')).toBe(1);
    });
    test('not equal', () => {
        expect(matchMissmatchSimilarity('a', 'b')).toBe(-1);
    });
});

describe('differenceSimilarity', () => {
    test('equal', () => {
        expect(differenceSimilarity(1, 1)).toBe(-0);
    });
    test('equal negative', () => {
        expect(differenceSimilarity(-1, -1)).toBe(-0);
    });
    test('not equal', () => {
        expect(differenceSimilarity(2, 3)).toBe(-1);
    });
    test('not equal one negative', () => {
        expect(differenceSimilarity(-2, 3)).toBe(-5);
    });
    test('not equal both negative', () => {
        expect(differenceSimilarity(-2, -3)).toBe(-1);
    });
});


describe('gotoh', () => {
    test('both empty: 0', () => {
        expect(gotoh('', '', matchMissmatchSimilarity)).toBe(0);
    });

    test('left empty', () => {
        expect(gotoh('', '123', matchMissmatchSimilarity, -1, -1)).toBe(-3);
    });

    test('right empty', () => {
        expect(gotoh('1234', '', matchMissmatchSimilarity, -1, -1)).toBe(-4);
    });

    test('same', () => {
        expect(gotoh('1234', '1234', matchMissmatchSimilarity, -1, -1)).toBe(4);
    });

    test('insert end', () => {
        expect(gotoh('1234', '12345', matchMissmatchSimilarity, -1, -1)).toBe(3);
    });

    test('insert begin', () => {
        expect(gotoh('1234', '01234', matchMissmatchSimilarity, -1, -1)).toBe(3);
    });

    test('insert middle', () => {
        expect(gotoh('1234', '12304', matchMissmatchSimilarity, -1, -1)).toBe(3);
    });

    test('delete end', () => {
        expect(gotoh('12345', '1234', matchMissmatchSimilarity, -1, -1)).toBe(3);
    });

    test('delete begin', () => {
        expect(gotoh('01234', '1234', matchMissmatchSimilarity, -1, -1)).toBe(3);
    });

    test('delete middle', () => {
        expect(gotoh('12304', '1234', matchMissmatchSimilarity, -1, -1)).toBe(3);
    });

    test('numbers and string should have same result (a,a)', () => {
        const simFunc = matchMissmatchSimilarity;
        const a = [1, 2, 3, 4];
        expect(
            gotoh(a, a, simFunc, -10, -1)
        ).toBe(
            gotoh(a.join(''), a.join(''), simFunc, -10, -1)
        );
    });

    test('numbers and string should have same result (a,b)', () => {
        const simFunc = matchMissmatchSimilarity;
        const a = [1, 2, 3, 4, 6];
        const b = [1, 2, 3, 0, 4, 5, 6];
        expect(
            gotoh(a, b, simFunc, -10, -1)
        ).toBe(
            gotoh(a.join(''), b.join(''), simFunc, -10, -1)
        );
    });

    test('numbers1 same', () => {
        const a = [1, 2, 3, 4];
        expect(gotoh(a, a, matchMissmatchSimilarity, -1, -1)).toBe(4);
    });

    test('numbers2', () => {
        const a = [1, 2, 3, 4];
        const b = [1, 2, 3, 3, 4, 5];
        expect(gotoh(a, b, matchMissmatchSimilarity, -1, -1)).toBe(2);
    });

    test.skip('numbers3', () => {
        const a = [1, 2, 3, 4, 2];
        const b = [1, 3, 4, 2];
        const f = (a, b) => 3 * matchMissmatchSimilarity(a, b);
        const result = gotoh(a, b, f, -10, -0.5);
        expect(result).toBe(3);
    });

    test('gap', () => {
        const a = [1, 2, 3, 4, 5];
        const b = [1, 2, 3, 0, 0, 0, 0, 4, 5];
        const result = gotoh(a, b, matchMissmatchSimilarity, -10, -1);
        expect(result).toBe(-8);
    });
});
