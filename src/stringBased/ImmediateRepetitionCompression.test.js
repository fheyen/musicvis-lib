import * as compr from './ImmediateRepetitionCompression.js';


const examples = [
    ["1", "1"],
    ["111", "(3x 1)"],
    ["111222", "(3x 1) (3x 2)"],
    ["1112333", "(3x 1) 2 (3x 3)"],
    ["12223", "1 (3x 2) 3"],
    ["1231231414", "(2x 1 2 3) (2x 1 4)"],
    ["112311231123", "(3x (2x 1) 2 3)"],
    ["1222312223", "(2x 1 (3x 2) 3)"],
    ["1222333222333", "1 (2x (3x 2) (3x 3))"],
    ["1111", "(4x 1)"],
    ["111111", "(6x 1)"],
    ["111111111", "(9x 1)"],
    ["1212121212121212", "(8x 1 2)"],
    ["1112111", "(3x 1) 2 (3x 1)"],
];

describe('ImmediateRepetitionCompression', () => {

    describe('getImmediateRepetitions', () => {
        test('null', () => {
            expect(compr.getImmediateRepetitions()).toStrictEqual(null);
        });

        test('empty', () => {
            expect(compr.getImmediateRepetitions([])).toStrictEqual(null);
        });

    });

    describe('compress', () => {
        test('null', () => {
            expect(compr.getImmediateRepetitions()).toStrictEqual(null);
        });

        test('empty', () => {
            expect(compr.getImmediateRepetitions([])).toStrictEqual(null);
        });

        test.each(examples)('compress -> decompress works', (example) => {
            const sequence = example.split('');
            const compressed = compr.compress(sequence);
            const decoded = compr.decompress(compressed);
            expect(decoded).toStrictEqual(sequence);
        });

        test.each(examples)(`check examples with compress -> toString %s`, (example, expectedString) => {
            const sequence = example.split('');
            const compressed = compr.compress(sequence);
            const string = compr.toString(compressed);
            expect(string).toStrictEqual(expectedString);
        });
    });

    describe('toString', () => {
        test('null', () => {
            expect(compr.toString(compr.compress())).toBe('');
        });
        test('empty', () => {
            expect(compr.toString(compr.compress([]))).toBe('');
        });
        test('111', () => {
            expect(compr.toString(compr.compress('111'.split('')))).toBe('(3x 1)');
        });
        test('122211', () => {
            expect(compr.toString(compr.compress('122211'.split('')))).toBe('1 (3x 2) (2x 1)');
        });
    });

    describe('compressionRate', () => {
        test('null', () => {
            expect(() => compr.compressionRate()).toThrow('Invalid hierarchy');
        });
        test('invalid', () => {
            expect(() => compr.compressionRate({ length: 1 })).toThrow('Invalid hierarchy');
        });
        test('valid', () => {
            expect(compr.compressionRate(compr.compress('111'.split('')))).toBe(1 / 3);
            expect(compr.compressionRate(compr.compress('111222'.split('')))).toBe(2 / 6);
        });
    });
});
