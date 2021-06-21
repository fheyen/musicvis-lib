import Fingers from './Fingers.js';

describe('Fingers', () => {

    test('fingers are unique values', () => {
        const entries = Object.entries(Fingers);
        for (let index = 0; index < entries.length; index++) {
            for (let index2 = index + 1; index2 < entries.length; index2++) {
                expect(entries[index]).not.toBe(entries[index2]);
            }
        }
    });
});
