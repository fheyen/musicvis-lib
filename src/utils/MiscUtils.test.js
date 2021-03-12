import { bpmToSecondsPerBeat, deepCloneFlatObjectMap, groupNotesByPitch, reverseString, findNearest } from './MiscUtils';
import Note from '../types/Note';


describe('utils/MiscUtils', () => {

    describe('bpmToSecondsPerBeat', () => {
        test('30bpm', () => {
            expect(bpmToSecondsPerBeat(30)).toBe(2);
        });

        test('60bpm', () => {
            expect(bpmToSecondsPerBeat(60)).toBe(1);
        });

        test('120bpm', () => {
            expect(bpmToSecondsPerBeat(120)).toBe(0.5);
        });
    });

    describe('deepCloneFlatObjectMap', () => {
        test('empty', () => {
            const map = new Map();
            expect(deepCloneFlatObjectMap(map)).not.toBe(map);
            expect(deepCloneFlatObjectMap(map)).toStrictEqual(map);
        });

        test('map', () => {
            const map = new Map([
                [1, { a: 1, b: 2 }],
                [2, { a: 3, b: 4 }],
                [3, { a: 5, b: 6 }],
            ]);
            expect(deepCloneFlatObjectMap(map)).not.toBe(map);
            expect(deepCloneFlatObjectMap(map)).toStrictEqual(map);
        });
    });

    describe('groupNotesByPitch', () => {
        test('empty', () => {
            const map = new Map();
            expect(groupNotesByPitch([])).toStrictEqual(map);
        });

        test('notes', () => {
            const notes = [
                Note.from({ pitch: 1 }),
                Note.from({ pitch: 1 }),
                Note.from({ pitch: 2 }),
                Note.from({ pitch: 1 }),
                Note.from({ pitch: 3 }),
                Note.from({ pitch: 3 }),
            ];
            const map = new Map([
                [1, [
                    Note.from({ pitch: 1 }),
                    Note.from({ pitch: 1 }),
                    Note.from({ pitch: 1 }),
                ]],
                [2, [
                    Note.from({ pitch: 2 }),
                ]],
                [3, [
                    Note.from({ pitch: 3 }),
                    Note.from({ pitch: 3 }),
                ]],
            ]);
            // D3 now uses InternMap, so we need to convert to have the same data type as well
            expect(new Map(groupNotesByPitch(notes))).toStrictEqual(map);
        });
    });

    describe('reverseString', () => {
        test('hallo', () => {
            expect(reverseString('hallo')).toBe('ollah');
        });

        test('reverse twice', () => {
            expect(reverseString(reverseString('hallo'))).toBe('hallo');
        });
    });

    describe('findNearest', () => {
        test('empty', () => {
            const note = Note.from({ start: 3, end: 3 });
            expect(findNearest()).toStrictEqual(null);
            expect(findNearest([], note)).toStrictEqual(null);
        });

        test('same', () => {
            const note = Note.from({ start: 3, end: 3 });
            expect(findNearest([note], note)).toStrictEqual(note);
        });

        const notes = [
            Note.from({ start: 4 }),
            Note.from({ start: 1 }),
            Note.from({ start: 3 }),
            Note.from({ start: 2 }),
        ];

        test('contains same', () => {
            const note = Note.from({ start: 3 });
            expect(findNearest(notes, note)).toStrictEqual(note);
        });

        test('slighly higher', () => {
            const note = Note.from({ start: 3.1 });
            expect(findNearest(notes, note)).toStrictEqual(
                Note.from({ start: 3 })
            );
        });

        test('slighly lower', () => {
            const note = Note.from({ start: 2.9 });
            expect(findNearest(notes, note)).toStrictEqual(
                Note.from({ start: 3 })
            );
        });

        test('middle', () => {
            const note = Note.from({ start: 2.5 });
            expect(findNearest(notes, note)).toStrictEqual(
                Note.from({ start: 3 })
            );
        });
    });
});
