const libDev = require('../dist/musicvislib.js');
const libProd = require('../dist/musicvislib.min.js');

describe('Node import test with require', () => {
    describe('development build', () => {
        test('levenshtein', () => {
            const result = libDev.StringBased.Levenshtein.levenshtein('abcd', 'abCd');
            expect(result).toBe(1);
        });
    });

    describe('producation build', () => {
        test('levenshtein', () => {
            const result = libProd.StringBased.Levenshtein.levenshtein('abcd', 'abCd');
            expect(result).toBe(1);
        });
    });
});
