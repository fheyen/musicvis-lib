import { clipValue } from '../../src/utils/MathUtils';


describe('clip value', () => {
    test('does clip to min', () => {
        expect(clipValue(1, 2, 3)).toBe(2);
    });

    test('does clip to max', () => {
        expect(clipValue(4, 2, 3)).toBe(3);
    });

    test('negative, does clip to max', () => {
        expect(clipValue(-1, -3, -2)).toBe(-2);
    });

    test('does not clip if unnecessary', () => {
        expect(clipValue(2, 1, 3)).toBe(2);
    });

    test('negative, does not clip if unnecessary', () => {
        expect(clipValue(-2, -3, -1)).toBe(-2);
    });


});
