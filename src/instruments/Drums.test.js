import Note from '../types/Note';
import * as Drums from './Drums';

test('drumPitchReplacementMapMPS850', () => {
    expect(
        Drums.drumPitchReplacementMapMPS850.get(36)
    ).toStrictEqual(
        { repPitch: 36, zone: 2, order: 111, line: 8, shape: 'o', label: 'BD', name: 'Bass Drum' }
    );
});

describe('simplifyDrumPitches', () => {
    test('nothing to do', () => {
        const notes = [
            Note.from({ pitch: 36 }),
            Note.from({ pitch: 41 }),
            Note.from({ pitch: 43 }),
        ];
        expect(
            Drums.simplifyDrumPitches(notes, Drums.drumPitchReplacementMapMPS850)
        ).toStrictEqual(notes);
    });

    test('need to change', () => {
        const notes = [
            Note.from({ pitch: 36 }),
            Note.from({ pitch: 35 }),
            Note.from({ pitch: 41 }),
            Note.from({ pitch: 39 }),
            Note.from({ pitch: 43 }),
            Note.from({ pitch: 58 }),
        ];
        const notes2 = [
            Note.from({ pitch: 36 }),
            Note.from({ pitch: 36 }),
            Note.from({ pitch: 41 }),
            Note.from({ pitch: 41 }),
            Note.from({ pitch: 43 }),
            Note.from({ pitch: 43 }),
        ];
        expect(
            Drums.simplifyDrumPitches(notes, Drums.drumPitchReplacementMapMPS850)
        ).toStrictEqual(notes2);
    });

    test('cannot handle some pitches', () => {
        const notes = [
            Note.from({ pitch: 0 }),
            Note.from({ pitch: 36 }),
            Note.from({ pitch: 35 }),
            Note.from({ pitch: 1 }),
        ];
        expect(
            Drums.simplifyDrumPitches(notes, Drums.drumPitchReplacementMapMPS850)
        ).toStrictEqual(
            [
                Note.from({ pitch: 0 }),
                Note.from({ pitch: 36 }),
                Note.from({ pitch: 36 }),
                Note.from({ pitch: 1 }),
            ]
        );
    });

    test('no map given', () => {
        const notes = [
            Note.from({ pitch: 0 }),
            Note.from({ pitch: 36 }),
        ];
        expect(
            () => Drums.simplifyDrumPitches(notes)
        ).toThrow('No replacement map given!');
    });
});

test('getPitch2PositionMap', () => {
    expect(
        Drums.getPitch2PositionMap(Drums.drumPitchReplacementMapMPS850)
    ).toStrictEqual(
        new Map([
            [36, 10],
            [38, 5],
            [41, 7],
            [43, 6],
            [44, 3],
            [45, 9],
            [46, 2],
            [48, 8],
            [49, 0],
            [51, 4],
            [57, 1],
        ])
    );
});

describe('generateDrumVariation, ', () => {
    test('nothing changes', () => {
        const notes = [
            Note.from({ pitch: 36, start: 0, end: 1 }),
            Note.from({ pitch: 36, start: 1, end: 2 }),
            Note.from({ pitch: 41, start: 1, end: 2 }),
            Note.from({ pitch: 36, start: 2, end: 3 }),
            Note.from({ pitch: 36, start: 3, end: 4 }),
            Note.from({ pitch: 41, start: 3, end: 4 }),
        ];
        expect(
            Drums.generateDrumVariation(notes, 0, 0, 0)
        ).toStrictEqual(notes);
    });

    test('something changes', () => {
        const notes = [
            Note.from({ pitch: 36, start: 0, end: 1 }),
            Note.from({ pitch: 36, start: 1, end: 2 }),
            Note.from({ pitch: 41, start: 1, end: 2 }),
            Note.from({ pitch: 36, start: 2, end: 3 }),
            Note.from({ pitch: 36, start: 3, end: 4 }),
            Note.from({ pitch: 41, start: 3, end: 4 }),
        ];
        expect(
            Drums.generateDrumVariation(notes, 1, 0, 0)
        ).not.toStrictEqual(notes);
    });

    test('something changes, full code explored', () => {
        const notes = [
            Note.from({ pitch: 36, start: 0, end: 1 }),
            Note.from({ pitch: 36, start: 1, end: 2 }),
            Note.from({ pitch: 41, start: 1, end: 2 }),
            Note.from({ pitch: 36, start: 2, end: 3 }),
            Note.from({ pitch: 36, start: 3, end: 4 }),
            Note.from({ pitch: 41, start: 3, end: 4 }),
        ];
        expect(
            Drums.generateDrumVariation(notes, 1, 1, 1)
        ).not.toStrictEqual(notes);
    });

    test('something changes, full code explored, default parameters', () => {
        const notes = [
            Note.from({ pitch: 36, start: 0, end: 1 }),
            Note.from({ pitch: 36, start: 1, end: 2 }),
            Note.from({ pitch: 41, start: 1, end: 2 }),
            Note.from({ pitch: 36, start: 2, end: 3 }),
            Note.from({ pitch: 36, start: 3, end: 4 }),
            Note.from({ pitch: 41, start: 3, end: 4 }),
        ];
        expect(
            Drums.generateDrumVariation(notes)
        ).not.toStrictEqual(notes);
    });
});
