import { bpmToSecondsPerBeat } from '../../src/utils/MiscUtils';


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
