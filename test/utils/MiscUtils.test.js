import { bpmToSecondsPerBeat, reverseString, pitchSequenceWithoutOctaves, pitchSequenceToInvervals } from '../../src/utils/MiscUtils';


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

describe('reverseString', () => {
    test('hallo', () => {
        expect(reverseString('hallo')).toBe('ollah');
    });

    test('reverse twice', () => {
        expect(reverseString(reverseString('hallo'))).toBe('hallo');
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
