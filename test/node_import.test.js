import { getVersion as v_dev, StringBased as StringBased_dev } from '../dist/musicvislib.js';
import { getVersion as v_prod, StringBased as StringBased_prod } from '../dist/musicvislib.min.js';

describe('Node import test with require', () => {
    describe('development build', () => {
        test('version', () => {
            expect(v_dev).toBeDefined();
        });
        test('levenshtein', () => {
            const result = StringBased_dev.Levenshtein.levenshtein('abcd', 'abCd');
            expect(result).toBe(1);
        });
    });

    describe('production build', () => {
        test('version', () => {
            expect(v_prod).toBeDefined();
        });
        test('levenshtein', () => {
            const result = StringBased_prod.Levenshtein.levenshtein('abcd', 'abCd');
            expect(result).toBe(1);
        });
    });
});
