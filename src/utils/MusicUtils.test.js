import { chordToInteger, chordIntegerJaccardIndex, noteDurationToNoteType } from './MusicUtils';
import Note from '../types/Note';

describe('MusicUtils', () => {


    describe('chordToInteger', () => {
        test('empty', () => {
            expect(chordToInteger([])).toBe(0);
        });

        test.each([
            [0, 1],
            [1, 2],
            [2, 4],
            [3, 8],
            [4, 16],
            [5, 32],
            [8, 256],
            [11, 2048],
            [12, 1],
            [24, 1],
            [25, 2],
        ])('single note with pitch %s', (pitch, integer) => {
            expect(
                chordToInteger([Note.from({ pitch })])
            ).toBe(integer);
        });

        test('works for simple chord', () => {
            const chord = [
                Note.from({ pitch: 65 }),
                Note.from({ pitch: 67 }),
                Note.from({ pitch: 69 }),
            ];
            expect(chordToInteger(chord)).toBe(32 + 128 + 512);
        });
    });

    describe('chordIntegerJaccardIndex', () => {
        test.each([
            ['00000000', '00000000', 1],
            ['00000000', '00000001', 0],
            ['00000000', '00010001', 0],
            ['00010000', '00010001', 1 / 2],
            ['10010000', '00010001', 1 / 3],
        ])('%s', (chord1, chord2, result) => {
            const c1 = parseInt(chord1, 2);
            const c2 = parseInt(chord2, 2);
            expect(chordIntegerJaccardIndex(c1, c2)).toBe(result);
        });
    });

    describe('noteDurationToNoteType', () => {
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
        ])('%s', (value) => {
            const { duration, bpm, result } = value;
            expect(noteDurationToNoteType(duration, bpm)).toStrictEqual(result);
        });
    });


});
