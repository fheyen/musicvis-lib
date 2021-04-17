const libDev = require('../dist/musicvislib.js');
const libProd = require('../dist/musicvislib.min.js');

describe('Node import test with require', () => {
    describe('development build', () => {
        test('version', () => {
            expect(libDev.getVersion).toBeDefined();
            expect(typeof libDev.getVersion()).toBe('string');
        });
        test('levenshtein', () => {
            const result = libDev.StringBased.Levenshtein.levenshtein('abcd', 'abCd');
            expect(result).toBe(1);
        });
    });

    describe('production build', () => {
        test('version', () => {
            expect(libProd.getVersion).toBeDefined();
            expect(typeof libProd.getVersion()).toBe('string');
        });
        test('levenshtein', () => {
            const result = libProd.StringBased.Levenshtein.levenshtein('abcd', 'abCd');
            expect(result).toBe(1);
        });
    });
});
