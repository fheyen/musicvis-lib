import * as RecUtils from './RecordingsUtils';
import Note from '../types/Note';
import Recording from '../types/Recording';
import GuitarNote from '../types/GuitarNote';

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
                Note.from({ pitch: 122 }),
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

    describe('clipRecordingsPitchesToGtFretboardRange', () => {
        const notes = [
            GuitarNote.from({ string: 0, fret: 0 }),
            GuitarNote.from({ string: 1, fret: 1 }),
            GuitarNote.from({ string: 2, fret: 2 }),
            GuitarNote.from({ string: 3, fret: 3 }),
        ];
        const notesRemovedByExact = [
            ...notes,
            GuitarNote.from({ string: 1, fret: 2 }),
            GuitarNote.from({ string: 2, fret: 3 }),
            GuitarNote.from({ string: 8, fret: 3 }),
        ];
        const notesRemovedByArea = [
            ...notes,
            GuitarNote.from({ string: 4, fret: 2 }),
            GuitarNote.from({ string: 2, fret: 6 }),
        ];
        test('nothing to remove', () => {
            const recs = [new Recording('', new Date(), notes)];
            expect(
                RecUtils.clipRecordingsPitchesToGtFretboardRange(recs, [notes], 'exact')
            ).toStrictEqual(recs);
            expect(
                RecUtils.clipRecordingsPitchesToGtFretboardRange(recs, [notes], 'area')
            ).toStrictEqual(recs);
        });

        test('filtering exact', () => {
            const recs = [new Recording('', new Date(), notesRemovedByExact)];
            const filteredNotes = RecUtils.clipRecordingsPitchesToGtFretboardRange(recs, [notes], 'exact')[0].getNotes();
            expect(filteredNotes).toStrictEqual(notes);
        });
        test('filtering area', () => {
            const recs = [new Recording('', new Date(), notesRemovedByArea)];
            const filteredNotes = RecUtils.clipRecordingsPitchesToGtFretboardRange(recs, [notes], 'area')[0].getNotes();
            expect(filteredNotes).toStrictEqual(notes);
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

    describe.skip('differenceMapErrorAreas', () => {

        test('', () => {
        });
    });

    describe('alignNotesToBpm', () => {

        test('empty', () => {
            expect(RecUtils.alignNotesToBpm([], 120)).toStrictEqual([]);
        });

        const notesAligned = [
            Note.from({ pitch: 'C4', start: 0, end: 0.5 }),
            Note.from({ pitch: 'E4', start: 0, end: 0.5 }),
            Note.from({ pitch: 'D4', start: 0.5, end: 1 }),
            Note.from({ pitch: 'E4', start: 0.5, end: 1.5 }),
        ];

        test('already aligned', () => {
            expect(
                RecUtils.alignNotesToBpm(notesAligned, 120, 4)
            ).toStrictEqual(notesAligned);
        });

        test('not already aligned', () => {
            const notes = [
                Note.from({ pitch: 'C4', start: 0.11, end: 0.5 }),
                Note.from({ pitch: 'E4', start: 0.01, end: 0.6 }),
                Note.from({ pitch: 'D4', start: 0.55, end: 1.1 }),
                Note.from({ pitch: 'E4', start: 0.45, end: 1.6 }),
            ];
            expect(
                RecUtils.alignNotesToBpm(notes, 120, 2)
            ).toStrictEqual(notesAligned);
        });
    });

});
