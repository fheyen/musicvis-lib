import { bpmToSecondsPerBeat, deepCloneFlatObjectMap, groupNotesByPitch, noteArrayToPitchSequence, noteArrayToString, pitchSequenceToString, pitchSequenceFromString, reverseString, pitchSequenceWithoutOctaves, pitchSequenceToInvervals, findNearest } from '../../src/utils/MiscUtils';
import Note from '../../src/types/Note';


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
        expect(groupNotesByPitch(notes)).toStrictEqual(map);
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

describe('noteArrayToPitchSequence', () => {
    test('empty', () => {
        expect(noteArrayToPitchSequence([])).toStrictEqual([]);
    });

    test('notes', () => {
        const notes = [
            Note.from({ pitch: 1, start: 1.0, end: 2.0 }),
            Note.from({ pitch: 2, start: 1.0, end: 2.0 }),
            Note.from({ pitch: 2, start: 2.0, end: 3.0 }),
            Note.from({ pitch: 1, start: 4.0, end: 5.0 }),
            Note.from({ pitch: 3, start: 6.0, end: 7.0 }),
            Note.from({ pitch: 3, start: 7.0, end: 9.0 }),
        ];
        const expected = [1, 2, 2, 1, 3, 3];
        expect(noteArrayToPitchSequence(notes)).toStrictEqual(expected);
    });
});

describe('pitchSequenceToString', () => {
    test('empty', () => {
        expect(pitchSequenceToString([])).toBe('');
    });

    test('simple', () => {
        expect(pitchSequenceToString([65, 66, 67])).toBe('ABC');
    });

    test('each pitch is different', () => {
        for (let i = 0; i < 128; i++) {
            for (let j = i + 1; j < 128; j++) {
                expect(
                    pitchSequenceToString([i])
                ).not.toStrictEqual(
                    pitchSequenceToString([j])
                );
            }
        }
    });
});

describe('pitchSequenceFromString', () => {
    test('empty', () => {
        expect(pitchSequenceFromString('')).toStrictEqual([]);
    });

    test('simple', () => {
        expect(pitchSequenceFromString('ABC')).toStrictEqual([65, 66, 67]);
    });
});

describe('pitchSequenceToString & pitchSequenceFromString', () => {

    test('invert', () => {
        expect(
            pitchSequenceToString(pitchSequenceFromString('12345'))
        ).toBe('12345');
    });

    test('invert 2', () => {
        expect(
            pitchSequenceFromString(pitchSequenceToString([1, 2, 3, 4, 5]))
        ).toStrictEqual([1, 2, 3, 4, 5]);
    });
});

describe('noteArrayToString', () => {
    test('empty', () => {
        expect(noteArrayToString([])).toBe('');
    });

    test('notes', () => {
        const notes = [
            Note.from({ pitch: 65, start: 1.0, end: 2.0 }),
            Note.from({ pitch: 65, start: 1.0, end: 2.0 }),
            Note.from({ pitch: 66, start: 2.0, end: 3.0 }),
            Note.from({ pitch: 67, start: 4.0, end: 5.0 }),
            Note.from({ pitch: 66, start: 6.0, end: 7.0 }),
            Note.from({ pitch: 65, start: 7.0, end: 9.0 }),
        ];
        const expected = 'AABCBA';
        expect(noteArrayToString(notes)).toBe(expected);
    });
});

describe('pitchSequenceWithoutOctaves', () => {
    test('nothing to do', () => {
        const seq = [0, 1, 4, 5, 8, 11];
        expect(pitchSequenceWithoutOctaves(seq)).toStrictEqual(seq);
    });

    test('one to change', () => {
        const seq = [0, 1, 4, 12];
        expect(pitchSequenceWithoutOctaves(seq)).toStrictEqual([0, 1, 4, 0]);
    });
});

describe('pitchSequenceToInvervals', () => {
    test('empty', () => {
        expect(pitchSequenceToInvervals([])).toStrictEqual([]);
    });

    test('1 notes', () => {
        expect(pitchSequenceToInvervals([0])).toStrictEqual([]);
    });

    test('2 notes', () => {
        expect(pitchSequenceToInvervals([1, 2])).toStrictEqual([1]);
    });

    test('all 1', () => {
        const seq = [0, 1, 2, 3, 4, 5];
        expect(pitchSequenceToInvervals(seq)).toStrictEqual([1, 1, 1, 1, 1]);
    });

    test('1, 3, 3, -1, -2, 0, 0', () => {
        const seq = [0, 1, 4, 7, 6, 4, 4, 4];
        expect(pitchSequenceToInvervals(seq)).toStrictEqual([1, 3, 3, -1, -2, 0, 0]);
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
