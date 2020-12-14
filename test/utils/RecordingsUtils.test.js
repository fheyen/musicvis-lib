import * as RecUtils from '../../src/utils/RecordingsUtils';
import Note from '../../src/types/Note';
import Recording from '../../src/types/Recording';

describe('RecordingsUtils', () => {

    describe('filterRecordingNoise', () => {
        const notes = [
            Note.from({ pitch: 12, start: 0, end: 1, velocity: 100 }),
            Note.from({ pitch: 35, start: 0, end: 1, velocity: 100 }),
            Note.from({ pitch: 15, start: 1, end: 2, velocity: 100 }),
            Note.from({ pitch: 10, start: 2, end: 3, velocity: 100 }),
            Note.from({ pitch: 20, start: 2, end: 3, velocity: 10 }),
            Note.from({ pitch: 30, start: 3, end: 3.01, velocity: 100 }),
            Note.from({ pitch: 30, start: 3, end: 4, velocity: 1 }),
            Note.from({ pitch: 30, start: 4, end: 4.2, velocity: 1 }),
            Note.from({ pitch: 0, start: 5, end: 6, velocity: 100 }),
        ];
        const rec = new Recording('test', new Date(), notes);

        test('returns a recording', () => {
            expect(
                RecUtils.filterRecordingNoise(rec)
            ).toBeInstanceOf(Recording);
            expect(
                RecUtils.filterRecordingNoise(rec, 0, 0)
            ).toBeInstanceOf(Recording);
        });

        test('nothing should be removed', () => {
            expect(
                RecUtils.filterRecordingNoise(rec).getNotes()
            ).toStrictEqual(notes);
            expect(
                RecUtils.filterRecordingNoise(rec, 0, 0).getNotes()
            ).toStrictEqual(notes);
        });

        test('filter velocity < 10', () => {
            expect(
                RecUtils.filterRecordingNoise(rec, 10, 0).getNotes()
            ).toStrictEqual([
                Note.from({ pitch: 12, start: 0, end: 1, velocity: 100 }),
                Note.from({ pitch: 35, start: 0, end: 1, velocity: 100 }),
                Note.from({ pitch: 15, start: 1, end: 2, velocity: 100 }),
                Note.from({ pitch: 10, start: 2, end: 3, velocity: 100 }),
                Note.from({ pitch: 20, start: 2, end: 3, velocity: 10 }),
                Note.from({ pitch: 30, start: 3, end: 3.01, velocity: 100 }),
                Note.from({ pitch: 0, start: 5, end: 6, velocity: 100 }),
            ]);
        });

        test('filter duration < 0.2', () => {
            expect(
                RecUtils.filterRecordingNoise(rec, 0, 0.2).getNotes()
            ).toStrictEqual([
                Note.from({ pitch: 12, start: 0, end: 1, velocity: 100 }),
                Note.from({ pitch: 35, start: 0, end: 1, velocity: 100 }),
                Note.from({ pitch: 15, start: 1, end: 2, velocity: 100 }),
                Note.from({ pitch: 10, start: 2, end: 3, velocity: 100 }),
                Note.from({ pitch: 20, start: 2, end: 3, velocity: 10 }),
                Note.from({ pitch: 30, start: 3, end: 4, velocity: 1 }),
                Note.from({ pitch: 30, start: 4, end: 4.2, velocity: 1 }),
                Note.from({ pitch: 0, start: 5, end: 6, velocity: 100 }),
            ]);
        });
    });

    describe('clipRecordingsPitchesToGtRange', () => {

        test('', () => {
        });
    });

    describe('recordingsHeatmap', () => {

        test('', () => {
        });
    });

    describe('averageRecordings', () => {

        test('', () => {
        });
    });

    describe('averageRecordings2', () => {

        test('', () => {
        });
    });

    describe('differenceMap', () => {

        test('', () => {
        });
    });

    describe('differenceMapErrorAreas', () => {

        test('', () => {
        });
    });

    describe('alignNotesToBpm', () => {

        test('', () => {
        });
    });

});
