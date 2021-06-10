import { getNGrams, getNGramsForArray } from './NGrams';

describe('NGrams', () => {
    describe('string', () => {
        test('simple', () => {
            expect(
                getNGrams('abcdefbcd', 3)
            ).toStrictEqual(new Map([
                ['abc', 1],
                ['bcd', 2],
                ['cde', 1],
                ['def', 1],
                ['efb', 1],
                ['fbc', 1],
            ]));
        });
        test('longer length', () => {
            expect(
                getNGrams('abcdefbcd', 5)
            ).toStrictEqual(new Map([
                ['abcde', 1],
                ['bcdef', 1],
                ['cdefb', 1],
                ['defbc', 1],
                ['efbcd', 1],
            ]));
        });
        test('longer length 2', () => {
            expect(
                getNGrams('abcdefbcd', 8)
            ).toStrictEqual(new Map([
                ['abcdefbc', 1],
                ['bcdefbcd', 1],
            ]));
        });
        test('full length', () => {
            expect(
                getNGrams('abcdefbcd', 9)
            ).toStrictEqual(new Map([
                ['abcdefbcd', 1],
            ]));
        });
        test('too long', () => {
            expect(
                getNGrams('abcdefbcd', 20)
            ).toStrictEqual(new Map([
                ['abcdefbcd', 1],
            ]));
        });
        test('length 1', () => {
            expect(
                getNGrams('abcdab', 1)
            ).toStrictEqual(new Map([
                ['a', 2],
                ['b', 2],
                ['c', 1],
                ['d', 1],
            ]));
        });
        test('length 0', () => {
            expect(
                getNGrams('abcdefbcd', 0)
            ).toStrictEqual(new Map());
        });
    });

    describe('array', () => {
        test('length 0', () => {
            expect(
                getNGramsForArray('abcdefbcd'.split(''), 0)
            ).toStrictEqual(new Map());
        });
        test('simple', () => {
            expect(
                getNGramsForArray('abcdefbcd'.split(''), 3)
            ).toStrictEqual(new Map([
                ['a b c', { value: 'abc'.split(''), count: 1 }],
                ['b c d', { value: 'bcd'.split(''), count: 2 }],
                ['c d e', { value: 'cde'.split(''), count: 1 }],
                ['d e f', { value: 'def'.split(''), count: 1 }],
                ['e f b', { value: 'efb'.split(''), count: 1 }],
                ['f b c', { value: 'fbc'.split(''), count: 1 }],
            ]));
        });
    });
});
