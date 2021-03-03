import Note from '../types/Note';
import GuitarNote from '../types/GuitarNote';
import * as Guitar from './Guitar';
import * as Midi from '../fileFormats/Midi';

const stdTuning = Guitar.stringedTunings.get('Guitar').get(6)[0];
const dropD = Guitar.stringedTunings.get('Guitar').get(6)[1];
const bass1down = Guitar.stringedTunings.get('Bass').get(4)[3];

describe('Guitar.js', () => {
    describe('stringedTunings', () => {
        test('std', () => {
            expect(stdTuning.name).toBe('E stand.');
            expect(stdTuning.stringCount).toBe(6);
            expect(stdTuning.pitches).toStrictEqual([40, 45, 50, 55, 59, 64]);
        });
        test('dropD', () => {
            expect(dropD.name).toBe('Drop D');
            expect(stdTuning.stringCount).toBe(6);
            expect(dropD.pitches).toStrictEqual([38, 45, 50, 55, 59, 64]);
        });
        test('bass 1 down', () => {
            expect(bass1down.name).toBe('1 down');
            expect(bass1down.stringCount).toBe(4);
            expect(bass1down.pitches).toStrictEqual([26, 31, 36, 41]);
        });

        // test('tunings key === tuning.name', () => {
        //     for (let instrument of Guitar.stringedTunings.values()) {
        //         for (let [key, value] of instrument.entries()) {
        //             expect(value.name).toBe(key);
        //         }
        //     }
        // });
    });

    test('stringColors', () => {
        expect(Guitar.stringColors.length).toBe(9);
        expect(Guitar.stringColors).toStrictEqual([
            '#888',
            '#d122e9',
            '#31eb1c',
            '#f37c14',
            '#10edfc',
            '#ffeb09',
            '#ff210d',
            'silver',
            'gold',
        ]);
    });

    describe('getTuningFromPitches', () => {
        test('std', () => {
            expect(Guitar.getTuningFromPitches([40, 45, 50, 55, 59, 64])).toStrictEqual(stdTuning);
        });
        test('dropD', () => {
            expect(Guitar.getTuningFromPitches([38, 45, 50, 55, 59, 64])).toStrictEqual(dropD);
        });
        test('bass 1 down', () => {
            expect(Guitar.getTuningFromPitches([26, 31, 36, 41])).toStrictEqual(bass1down);
        });
        test('invalid', () => {
            expect(Guitar.getTuningFromPitches([1, 2, 3])).toBe(null);
        });
    });

    describe('getPitchFromFretboardPos', () => {
        test('E2, std', () => {
            expect(
                Guitar.getPitchFromFretboardPos(6, 0, stdTuning)
            ).toBe(40);
        });
        test('E2, std, fret', () => {
            expect(
                Guitar.getPitchFromFretboardPos(5, 10, stdTuning)
            ).toBe(55);
        });
        test('D2, dropD', () => {
            expect(
                Guitar.getPitchFromFretboardPos(6, 0, dropD)
            ).toBe(38);
        });
    });

    describe('getTuningPitchRange', () => {
        test('std', () => {
            expect(Guitar.getTuningPitchRange(stdTuning, 24)).toStrictEqual([40, 88]);
        });
        test('std, 22 frets', () => {
            expect(Guitar.getTuningPitchRange(stdTuning, 22)).toStrictEqual([40, 86]);
        });
        test('bass1down, 15 frets', () => {
            expect(Guitar.getTuningPitchRange(bass1down, 15)).toStrictEqual([26, 56]);
        });
        test('dropD', () => {
            expect(Guitar.getTuningPitchRange(dropD, 24)).toStrictEqual([38, 88]);
        });
    });


    describe('guitarNoteFromNote', () => {
        test('E2', () => {
            const note = Note.from({ pitch: 40, channel: 5 });
            expect(
                Guitar.guitarNoteFromNote(note, stdTuning)
            ).toStrictEqual(
                GuitarNote.fromNote(note, 5, 0)
            );
        });

        test('F2', () => {
            const note = Note.from({ pitch: 41, channel: 5 });
            expect(
                Guitar.guitarNoteFromNote(note, stdTuning)
            ).toStrictEqual(
                GuitarNote.fromNote(note, 5, 1)
            );
        });

        test('A3', () => {
            const note = Note.from({ pitch: 45, channel: 4 });
            expect(
                Guitar.guitarNoteFromNote(note, stdTuning)
            ).toStrictEqual(
                GuitarNote.fromNote(note, 4, 0)
            );
        });

        test('A4', () => {
            const note = Note.from({ pitch: 57, channel: 4 });
            expect(
                Guitar.guitarNoteFromNote(note, stdTuning)
            ).toStrictEqual(
                GuitarNote.fromNote(note, 4, 12)
            );
        });
    });

    describe('getNoteInfoFromFretboardPos', () => {
        test('E2', () => {
            expect(
                Guitar.getNoteInfoFromFretboardPos(6, 0, stdTuning)
            ).toStrictEqual(
                Midi.getMidiNoteByNr(40)
            );
        });
        test('G2', () => {
            expect(
                Guitar.getNoteInfoFromFretboardPos(6, 2, stdTuning)
            ).toStrictEqual(
                Midi.getMidiNoteByNr(42)
            );
        });
        test('A4', () => {
            expect(
                Guitar.getNoteInfoFromFretboardPos(5, 12, stdTuning)
            ).toStrictEqual(
                Midi.getMidiNoteByNr(57)
            );
        });
    });

    describe('getFretboardPositionsFromPitch', () => {
        test('E2', () => {
            expect(
                Guitar.getFretboardPositionsFromPitch(40, stdTuning, 24)
            ).toStrictEqual(
                [{ string: 6, fret: 0 }]
            );
        });
        test('A3', () => {
            expect(
                Guitar.getFretboardPositionsFromPitch(45, stdTuning, 24)
            ).toStrictEqual(
                [{ string: 6, fret: 5 }, { string: 5, fret: 0 }]
            );
        });
        test('E3', () => {
            expect(
                Guitar.getFretboardPositionsFromPitch(52, stdTuning, 24)
            ).toStrictEqual(
                [{ string: 6, fret: 12 }, { string: 5, fret: 7 }, { string: 4, fret: 2 }]
            );
        });
        test('E5', () => {
            expect(
                Guitar.getFretboardPositionsFromPitch(76, stdTuning, 24)
            ).toStrictEqual(
                [{ string: 3, fret: 21 }, { string: 2, fret: 17 }, { string: 1, fret: 12 }]
            );
        });
    });

    describe('getFretboardPositionsFromNoteName', () => {
        test('E', () => {
            expect(
                Guitar.getFretboardPositionsFromNoteName('E', stdTuning, 12)
            ).toStrictEqual(
                [
                    { string: 6, fret: 0 },
                    { string: 6, fret: 12 },
                    { string: 5, fret: 7 },
                    { string: 4, fret: 2 },
                    { string: 3, fret: 9 },
                    { string: 2, fret: 5 },
                    { string: 1, fret: 0 },
                    { string: 1, fret: 12 },
                ]
            );
        });
        test('A', () => {
            expect(
                Guitar.getFretboardPositionsFromNoteName('A', stdTuning, 12)
            ).toStrictEqual(
                [
                    { string: 6, fret: 5 },
                    { string: 5, fret: 0 },
                    { string: 5, fret: 12 },
                    { string: 4, fret: 7 },
                    { string: 3, fret: 2 },
                    { string: 2, fret: 10 },
                    { string: 1, fret: 5 },
                ]
            );
        });
        test('invalid', () => {
            expect(
                Guitar.getFretboardPositionsFromNoteName('c')
            ).toBe(null);
        });
    });

    describe('generateExampleData', () => {
        test('correct count', () => {
            expect(
                Guitar.generateExampleData(0, 10, stdTuning).length
            ).toBe(10);
        });
        test('different each time', () => {
            expect(
                Guitar.generateExampleData(0, 10, stdTuning)
            ).not.toStrictEqual(
                Guitar.generateExampleData(0, 10, stdTuning)
            );
        });
    });

    describe.skip('fretboardPositionsFromMidi', () => {
        test('empty notes', () => {
            expect(
                Guitar.fretboardPositionsFromMidi([], stdTuning, 24)
            ).toStrictEqual([]);
        });
    });
});
