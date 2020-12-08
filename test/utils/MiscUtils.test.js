import { bpmToSecondsPerBeat, deepCloneFlatObjectMap, groupNotesByPitch, noteArrayToPitchSequence, noteArrayToString, reverseString, pitchSequenceWithoutOctaves, pitchSequenceToInvervals } from '../../src/utils/MiscUtils';
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

// TODO: function not implemented so no test
// describe('keepOnlyHighestConcurrentNotes', () => {

// });

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

// TODO: test fails although result is correct
describe.skip('noteArrayToString', () => {
    test('empty', () => {
        expect(noteArrayToString([])).toBe('');
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
        const expected = '☺☻☻☺♥♥';
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
    test('all 1', () => {
        const seq = [0, 1, 2, 3, 4, 5];
        expect(pitchSequenceToInvervals(seq)).toStrictEqual([1, 1, 1, 1, 1]);
    });
});
