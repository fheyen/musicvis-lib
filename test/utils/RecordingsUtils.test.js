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
        const notes = [
            Note.from({ pitch: 0 }),
            Note.from({ pitch: 35 }),
            Note.from({ pitch: 15 }),
            Note.from({ pitch: 10 }),
            Note.from({ pitch: 20 }),
            Note.from({ pitch: 30 }),
            Note.from({ pitch: 80 }),
            Note.from({ pitch: 30 }),
            Note.from({ pitch: 100 }),
        ];
        const gt = [
            [
                Note.from({ pitch: 15 }),
                Note.from({ pitch: 10 }),
                Note.from({ pitch: 30 }),
                Note.from({ pitch: 20 }),
            ],
            [
                Note.from({ pitch: 10 }),
                Note.from({ pitch: 0 }),
                Note.from({ pitch: 80 }),
            ],
            [
                Note.from({ pitch: 0 }),
                Note.from({ pitch: 127 }),
            ],
            [
                Note.from({ pitch: 120 }),
                Note.from({ pitch: 130 }),
            ],
        ];
        const recs = [
            new Recording('test', new Date(), notes, 1, 0),
            new Recording('test', new Date(), notes, 1, 1),
            new Recording('test', new Date(), notes, 1, 2),
            new Recording('test', new Date(), notes, 1, 3),
        ];
        const filtered = RecUtils.clipRecordingsPitchesToGtRange(recs, gt);

        test('track 0', () => {
            expect(filtered[0].getNotes()).toStrictEqual([
                Note.from({ pitch: 15 }),
                Note.from({ pitch: 10 }),
                Note.from({ pitch: 20 }),
                Note.from({ pitch: 30 }),
                Note.from({ pitch: 30 }),
            ]);
        });

        test('track 1', () => {
            expect(filtered[1].getNotes()).toStrictEqual([
                Note.from({ pitch: 0 }),
                Note.from({ pitch: 35 }),
                Note.from({ pitch: 15 }),
                Note.from({ pitch: 10 }),
                Note.from({ pitch: 20 }),
                Note.from({ pitch: 30 }),
                Note.from({ pitch: 80 }),
                Note.from({ pitch: 30 }),
            ]);
        });

        test('track 2 all kept', () => {
            expect(filtered[2].getNotes()).toStrictEqual(notes);
        });

        test('track 3 none kept', () => {
            expect(filtered[3].getNotes()).toStrictEqual([]);
        });
    });

    describe('recordingsHeatmap', () => {
        test('empty', () => {
            expect(RecUtils.recordingsHeatmap([])
            ).toStrictEqual(new Map());
            expect(RecUtils.recordingsHeatmap([], 0, 20, 'pitch')
            ).toStrictEqual(new Map());
        });

        test('single note', () => {
            expect(
                RecUtils.recordingsHeatmap(
                    [Note.from({ pitch: 1, start: 0, end: 1 })],
                    1,
                    200,
                    'pitch'
                )
            ).toStrictEqual(
                new Map([
                    [1, [1, 1, 1, 1, 1, 1]]
                ])
            );
        });

        test('single note, does not start at 0, round down', () => {
            expect(
                RecUtils.recordingsHeatmap(
                    [Note.from({ pitch: 1, start: 0.4, end: 1.2 })],
                    1,
                    200,
                    'pitch'
                )
            ).toStrictEqual(
                new Map([
                    [1, [0, 0, 1, 1, 1, 1, 1]]
                ])
            );
        });

        test('single note, does not start at 0, round up', () => {
            expect(
                RecUtils.recordingsHeatmap(
                    [Note.from({ pitch: 1, start: 0.5, end: 1.2 })],
                    1,
                    200,
                    'pitch'
                )
            ).toStrictEqual(
                new Map([
                    [1, [0, 0, 0, 1, 1, 1, 1]]
                ])
            );
        });

        test('two notes', () => {
            const notes = [
                Note.from({ pitch: 1, start: 0.5, end: 1.5 }),
                Note.from({ pitch: 1, start: 1, end: 2 }),
            ];
            expect(
                RecUtils.recordingsHeatmap(notes, 1, 200, 'pitch')
            ).toStrictEqual(
                new Map([
                    [1, [0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 1]]
                ])
            );
        });

        test('many notes', () => {
            const notes = [
                Note.from({ pitch: 1, start: 0, end: 1 }),
                Note.from({ pitch: 1, start: 2, end: 3 }),
                Note.from({ pitch: 1, start: 3, end: 4 }),
                Note.from({ pitch: 2, start: 1, end: 2 }),
                Note.from({ pitch: 2, start: 2, end: 3 }),
                Note.from({ pitch: 3, start: 2, end: 3 }),
                Note.from({ pitch: 3, start: 2, end: 3 }),
                Note.from({ pitch: 3, start: 2, end: 3 }),
            ];
            expect(
                RecUtils.recordingsHeatmap(
                    notes, 1, 200, 'pitch')
            ).toStrictEqual(
                new Map([
                    [1, [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]],
                    [2, [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]],
                    [3, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3]],
                ])
            );
        });

        test('does normalize', () => {
            const notes = [
                Note.from({ pitch: 1, start: 0, end: 3.5 }),
                Note.from({ pitch: 1, start: 2, end: 4 }),
                Note.from({ pitch: 1, start: 3, end: 4 }),
            ];
            expect(
                RecUtils.recordingsHeatmap(
                    notes, 1, 200, 'pitch')
            ).toStrictEqual(
                new Map([
                    [1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2]],
                ])
            );
            expect(
                RecUtils.recordingsHeatmap(
                    notes, 3, 200, 'pitch')
            ).toStrictEqual(
                new Map([
                    [1, [1 / 3, 1 / 3, 1 / 3, 1 / 3, 1 / 3, 1 / 3, 1 / 3, 1 / 3, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 2 / 3, 2 / 3, 2 / 3, 3 / 3, 3 / 3, 3 / 3, 3 / 3, 2 / 3, 2 / 3]],
                ])
            );
        });
    });

    describe('averageRecordings', () => {

        test('empty', () => {
            expect(RecUtils.averageRecordings(new Map(), 200, 0.8)).toStrictEqual([]);
        });
    });

    describe('averageRecordings2', () => {

        test('empty', () => {
            expect(RecUtils.averageRecordings2(new Map(), 200, 0.8)).toStrictEqual([]);
        });
    });

    describe('differenceMap', () => {

        test('empty', () => {
            expect(RecUtils.differenceMap([], [], 200)).toStrictEqual(new Map());
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
