import { noteDurationToNoteType, binarySearch } from './MusicUtils';

describe('MusicUtils', () => {

    test.skip.each([
        {
            duration: 1,
            bpm: 60,
            result: { "dots": 0, "duration": 0.25, "type": 0.25 },
        },
        {
            duration: 0.5,
            bpm: 120,
            result: { "dots": 0, "duration": 0.25, "type": 0.25 },
        },
        {
            duration: 1.5,
            bpm: 60,
            result: { "dots": 1, "duration": 0.75, "type": 0.5 },
        },
    ])('noteDurationToNoteType %s', (value) => {
        const { duration, bpm, result } = value;
        expect(noteDurationToNoteType(duration, bpm)).toStrictEqual(result);
    });

    describe('binarySearch', () => {
        const arrayEven = [-1, 0, 1, 2, 5, 6, 7, 8];
        const arrayOdd = [-1, 0, 1, 2, 5, 6, 7, 8, 9];

        test('even array', () => {
            expect(binarySearch(arrayEven, 2.3)).toBe(2);
            expect(binarySearch(arrayEven, 6.7)).toBe(7);
            expect(binarySearch(arrayEven, -10)).toBe(-1);
            expect(binarySearch(arrayEven, 10)).toBe(8);
        });

        test('odd array', () => {
            expect(binarySearch(arrayOdd, -0.3)).toBe(0);
            expect(binarySearch(arrayOdd, 0.3)).toBe(0);
            expect(binarySearch(arrayOdd, 2.3)).toBe(2);
            expect(binarySearch(arrayOdd, 8.51)).toBe(9);
        });

        test('accessor', () => {
            const array = [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 7 }, { v: 8 }, { v: 9 }];
            expect(binarySearch(array, 0.3, d => d.v)).toStrictEqual({ v: 1 });
            expect(binarySearch(array, 2.3, d => d.v)).toStrictEqual({ v: 2 });
            expect(binarySearch(array, 8.6, d => d.v)).toStrictEqual({ v: 9 });
        });

        const allCases = arrayEven;

        test.each(allCases)('same %s', (value) => {
            expect(binarySearch(arrayEven, value)).toBe(value);
        });

        test.each(allCases)('similar %s', (value) => {
            expect(
                binarySearch(arrayEven.map(d => d + 0.1), value)
            ).toBe(value + 0.1);
            expect(
                binarySearch(arrayEven.map(d => d - 0.1), value)
            ).toBe(value - 0.1);
        });
    });
});
