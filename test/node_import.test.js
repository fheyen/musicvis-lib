import { StringBased as StringBased_production } from '../dist/musicvislib.min.js';
import { StringBased as StringBased_development } from '../dist/musicvislib.js';

describe('Node import test with require', () => {
    describe('development build', () => {
        test('levenshtein', () => {
            const result = StringBased_development.Levenshtein.levenshtein('abcd', 'abCd');
            expect(result).toBe(1);
        });
    });

    describe('producation build', () => {
        test('levenshtein', () => {
            const result = StringBased_production.Levenshtein.levenshtein('abcd', 'abCd');
            expect(result).toBe(1);
        });
    });
});
