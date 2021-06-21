import GuitarNote from '../types/GuitarNote.js';
import Note from '../types/Note.js';
import * as ErrorClassifier from './ErrorClassifier.js';

const NoteState = ErrorClassifier.NoteState;

const gt = [
    GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 }),
    GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
    GuitarNote.from({ start: 1.5, end: 2.5, string: 5, fret: 0 }),
];

describe('ErrorClassifier', () => {

    describe.skip('classifyErrors', () => {
        test('every note on point', () => {
            const result = ErrorClassifier.classifyErrors(gt, gt, 'string');
            const states = result.map(d => d.state);
            const expected = [
                NoteState.SAME,
                NoteState.SAME,
                NoteState.SAME,
            ];
            expect(states).toStrictEqual(expected);
        });

        test('last missing', () => {
            const rec = [
                GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 }),
                GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
            ];
            const result = ErrorClassifier.classifyErrors(gt, rec, 'string');
            const states = result.map(d => d.state);
            const expected = [
                NoteState.SAME,
                NoteState.SAME,
                NoteState.MISSED,
            ];
            expect(states).toStrictEqual(expected);
        });

        test('one extra', () => {
            const rec = [
                GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 }),
                GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
                GuitarNote.from({ start: 1.5, end: 2.5, string: 5, fret: 0 }),
                GuitarNote.from({ start: 2.5, end: 3.5, string: 5, fret: 0 }),
            ];
            const result = ErrorClassifier.classifyErrors(gt, rec, 'string');
            const states = result.map(d => d.state);
            const expected = [
                NoteState.SAME,
                NoteState.SAME,
                NoteState.SAME,
                NoteState.EXTRA,
            ];
            expect(states).toStrictEqual(expected);
        });

        describe('early/late', () => {
            test('one late', () => {
                const rec = [
                    GuitarNote.from({ start: 0.2, end: 1, string: 3, fret: 0 }),
                    GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
                    GuitarNote.from({ start: 1.5, end: 2.5, string: 5, fret: 0 }),
                ];
                const result = ErrorClassifier.classifyErrors(gt, rec, 'string');
                const states = result.map(d => d.state);
                const expected = [
                    NoteState.LATE,
                    NoteState.SAME,
                    NoteState.SAME,
                ];
                expect(states).toStrictEqual(expected);
            });

            test('one early', () => {
                const rec = [
                    GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 }),
                    GuitarNote.from({ start: 0.5, end: 2, string: 4, fret: 0 }),
                    GuitarNote.from({ start: 1.5, end: 2.5, string: 5, fret: 0 }),
                ];
                const result = ErrorClassifier.classifyErrors(gt, rec, 'string');
                const states = result.map(d => d.state);
                const expected = [
                    NoteState.SAME,
                    NoteState.EARLY,
                    NoteState.SAME,
                ];
                expect(states).toStrictEqual(expected);
            });
        });

        describe('short/long', () => {
            test('one short', () => {
                const rec = [
                    GuitarNote.from({ start: 0, end: 0.5, string: 3, fret: 0 }),
                    GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
                    GuitarNote.from({ start: 1.5, end: 2.5, string: 5, fret: 0 }),
                ];
                const result = ErrorClassifier.classifyErrors(gt, rec, 'string');
                const states = result.map(d => d.state);
                const expected = [
                    NoteState.SHORT,
                    NoteState.SAME,
                    NoteState.SAME,
                ];
                expect(states).toStrictEqual(expected);
            });
            test('one short, one long', () => {
                const rec = [
                    GuitarNote.from({ start: 0, end: 0.5, string: 3, fret: 0 }),
                    GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
                    GuitarNote.from({ start: 1.5, end: 3, string: 5, fret: 0 }),
                ];
                const result = ErrorClassifier.classifyErrors(gt, rec, 'string');
                const states = result.map(d => d.state);
                const expected = [
                    NoteState.SHORT,
                    NoteState.SAME,
                    NoteState.LONG,
                ];
                expect(states).toStrictEqual(expected);
            });
        });

        describe('different', () => {
            test('last different string', () => {
                const rec = [
                    GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 }),
                    GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
                    GuitarNote.from({ start: 1.5, end: 2.5, string: 2, fret: 0 }),
                ];
                const result = ErrorClassifier.classifyErrors(gt, rec, 'string');
                const states = result.map(d => d.state);
                const expected = [
                    NoteState.SAME,
                    NoteState.SAME,
                    NoteState.DIFFERENT,
                ];
                expect(states).toStrictEqual(expected);
            });

            test('last different fret', () => {
                const rec = [
                    GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 }),
                    GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
                    GuitarNote.from({ start: 1.5, end: 2.5, string: 2, fret: 2 }),
                ];
                const result = ErrorClassifier.classifyErrors(gt, rec, 'string');
                const states = result.map(d => d.state);
                const expected = [
                    NoteState.SAME,
                    NoteState.SAME,
                    NoteState.DIFFERENT,
                ];
                expect(states).toStrictEqual(expected);
            });
        });

        describe('conflicting matches', () => {
            test('gt and 2 recs', () => {
                const gt = [
                    GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 })
                ];
                const rec = [
                    GuitarNote.from({ start: 0.5, end: 1.5, string: 3, fret: 0 }),
                    GuitarNote.from({ start: 1.5, end: 2.5, string: 4, fret: 0 }),
                ];
                const result = ErrorClassifier.classifyErrors(gt, rec, 'string');
                const states = result.map(d => d.state);
                const expected = [
                    NoteState.SAME,
                    NoteState.DIFFERENT,
                ];
                expect(states).toStrictEqual(expected);
            });

            test('rec and 2 gts', () => {
                const gt = [
                    GuitarNote.from({ start: 0.5, end: 1.5, string: 3, fret: 0 }),
                    GuitarNote.from({ start: 1.5, end: 2.5, string: 4, fret: 0 }),
                ];
                const rec = [
                    GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 })
                ];
                const result = ErrorClassifier.classifyErrors(gt, rec, 'string');
                const states = result.map(d => d.state);
                const expected = [
                    NoteState.SAME,
                ];
                expect(states).toStrictEqual(expected);
            });
        });
    });

    describe('compareNotes', () => {
        test('different string', () => {
            const n1 = GuitarNote.from({ start: 0, end: 1, string: 1, fret: 0 });
            const n2 = GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 });
            expect(ErrorClassifier.compareNotes(n1, n2)).toStrictEqual(NoteState.DIFFERENT);
        });
        test('different fret', () => {
            const n1 = GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 });
            const n2 = GuitarNote.from({ start: 0, end: 1, string: 3, fret: 1 });
            expect(ErrorClassifier.compareNotes(n1, n2)).toStrictEqual(NoteState.DIFFERENT);
        });
        test('different string and fret', () => {
            const n1 = GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 });
            const n2 = GuitarNote.from({ start: 0, end: 1, string: 2, fret: 1 });
            expect(ErrorClassifier.compareNotes(n1, n2)).toStrictEqual(NoteState.DIFFERENT);
        });
        test('same (identical)', () => {
            const n1 = GuitarNote.from({ start: 0.5, end: 1, string: 3, fret: 0 });
            expect(ErrorClassifier.compareNotes(n1, n1)).toStrictEqual(NoteState.SAME);
        });
        test('same (close)', () => {
            const n1 = GuitarNote.from({ start: 0.5, end: 1, string: 3, fret: 0 });
            const n2 = GuitarNote.from({ start: 0.54, end: 1.04, string: 3, fret: 0 });
            expect(ErrorClassifier.compareNotes(n1, n2)).toStrictEqual(NoteState.SAME);
        });
        test('short', () => {
            const n1 = GuitarNote.from({ start: 0.5, end: 1, string: 3, fret: 0 });
            const n2 = GuitarNote.from({ start: 0.54, end: 0.7, string: 3, fret: 0 });
            expect(ErrorClassifier.compareNotes(n1, n2)).toStrictEqual(NoteState.SHORT);
        });
        test('long', () => {
            const n1 = GuitarNote.from({ start: 0.5, end: 1, string: 3, fret: 0 });
            const n2 = GuitarNote.from({ start: 0.54, end: 1.5, string: 3, fret: 0 });
            expect(ErrorClassifier.compareNotes(n1, n2)).toStrictEqual(NoteState.LONG);
        });
        test('early', () => {
            const n1 = GuitarNote.from({ start: 0.5, end: 1, string: 3, fret: 0 });
            const n2 = GuitarNote.from({ start: 0.4, end: 1.5, string: 3, fret: 0 });
            expect(ErrorClassifier.compareNotes(n1, n2)).toStrictEqual(NoteState.EARLY);
        });
        test('late', () => {
            const n1 = GuitarNote.from({ start: 0.5, end: 1, string: 3, fret: 0 });
            const n2 = GuitarNote.from({ start: 0.6, end: 1.2, string: 3, fret: 0 });
            expect(ErrorClassifier.compareNotes(n1, n2)).toStrictEqual(NoteState.LATE);
        });
    });

    describe('findBestMatchBasedOnTime', () => {
        const candidates = [
            Note.from({ start: 0 }),
            Note.from({ start: 1 }),
            Note.from({ start: 2 }),
            Note.from({ start: 4 }),
        ];
        test('first', () => {
            expect(
                ErrorClassifier.findBestMatchBasedOnTime(Note.from({ start: 0.3 }), candidates)
            ).toStrictEqual(
                Note.from({ start: 0 })
            );
        });
        test('2nd', () => {
            expect(
                ErrorClassifier.findBestMatchBasedOnTime(Note.from({ start: 0.9 }), candidates)
            ).toStrictEqual(
                Note.from({ start: 1 })
            );
        });
    });

    describe('findBestMatch', () => {
        describe('same pitch', () => {
            const candidates = new Set([
                Note.from({ start: 0 }),
                Note.from({ start: 1 }),
                Note.from({ start: 2 }),
                Note.from({ start: 4 }),
            ]);
            test('first', () => {
                expect(
                    ErrorClassifier.findBestMatch(Note.from({ start: 0.3 }), candidates)
                ).toStrictEqual(
                    Note.from({ start: 0 })
                );
            });
            test('2nd', () => {
                expect(
                    ErrorClassifier.findBestMatch(Note.from({ start: 0.9 }), candidates)
                ).toStrictEqual(
                    Note.from({ start: 1 })
                );
            });
        });

        describe('different pitch', () => {
            const candidates = new Set([
                GuitarNote.from({ start: 0, pitch: 41, string: 5, fret: 1 }),
                GuitarNote.from({ start: 1, pitch: 40, string: 5, fret: 0 }),
                GuitarNote.from({ start: 2, pitch: 40, string: 5, fret: 0 }),
                GuitarNote.from({ start: 4, pitch: 42, string: 5, fret: 2 }),
            ]);
            test('2nd instead of first', () => {
                expect(
                    ErrorClassifier.findBestMatch(GuitarNote.from({ start: 0.3, pitch: 40, string: 5, fret: 0 }), candidates)
                ).toStrictEqual(
                    GuitarNote.from({ start: 1, pitch: 40, string: 5, fret: 0 })
                );
            });
            test('3rd instead of 4th', () => {
                expect(
                    ErrorClassifier.findBestMatch(GuitarNote.from({ start: 3.5, pitch: 40, string: 5, fret: 0 }), candidates)
                ).toStrictEqual(
                    GuitarNote.from({ start: 2, pitch: 40, string: 5, fret: 0 })
                );
            });
        });

        describe('empty candidates', () => {
            const candidates = new Set();
            test('', () => {
                expect(
                    ErrorClassifier.findBestMatch(GuitarNote.from({ start: 0.3, pitch: 40, string: 5, fret: 0 }), candidates)
                ).toBe(undefined);
            });
        });
    });

    describe('separateMissed', () => {
        const classified = [
            new ErrorClassifier.NoteWithState(new Note(1), NoteState.MISSED),
            new ErrorClassifier.NoteWithState(new Note(2), NoteState.SAME),
            new ErrorClassifier.NoteWithState(new Note(3), NoteState.MISSED),
            new ErrorClassifier.NoteWithState(new Note(4), NoteState.EARLY),
        ];
        test('', () => {
            const result = ErrorClassifier.separateMissed(classified);
            const expected = {
                missed: [
                    new ErrorClassifier.NoteWithState(new Note(1), NoteState.MISSED),
                    new ErrorClassifier.NoteWithState(new Note(3), NoteState.MISSED),
                ],
                notMissed: [
                    new ErrorClassifier.NoteWithState(new Note(2), NoteState.SAME),
                    new ErrorClassifier.NoteWithState(new Note(4), NoteState.EARLY),
                ]
            };
            expect(result).toStrictEqual(expected);
        });
    });
});
