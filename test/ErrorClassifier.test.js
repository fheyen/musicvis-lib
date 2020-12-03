import GuitarNote from '../src/types/GuitarNote';
import * as ErrorClassifer from '../src/ErrorClassifier';

const NoteState = ErrorClassifer.NoteState;

const gt = [
    GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 }),
    GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
    GuitarNote.from({ start: 1.5, end: 2.5, string: 5, fret: 0 }),
];

test('every note on point', () => {
    const result = ErrorClassifer.classifyErrors(gt, gt, 'string');
    const states = result.map(d => d.state)
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
    const result = ErrorClassifer.classifyErrors(gt, rec, 'string');
    const states = result.map(d => d.state)
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
    const result = ErrorClassifer.classifyErrors(gt, rec, 'string');
    const states = result.map(d => d.state)
    const expected = [
        NoteState.SAME,
        NoteState.SAME,
        NoteState.SAME,
        NoteState.EXTRA,
    ];
    expect(states).toStrictEqual(expected);
});

describe.skip('early/late', () => {
    test('one late', () => {
        const rec = [
            GuitarNote.from({ start: 0.2, end: 1, string: 3, fret: 0 }),
            GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
            GuitarNote.from({ start: 1.5, end: 2.5, string: 5, fret: 0 }),
        ];
        const result = ErrorClassifer.classifyErrors(gt, rec, 'string');
        const states = result.map(d => d.state)
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
        const result = ErrorClassifer.classifyErrors(gt, rec, 'string');
        const states = result.map(d => d.state)
        const expected = [
            NoteState.SAME,
            NoteState.EARLY,
            NoteState.SAME,
        ];
        expect(states).toStrictEqual(expected);
    });
});

describe.skip('short/long', () => {
    test('one short', () => {
        const rec = [
            GuitarNote.from({ start: 0, end: 0.5, string: 3, fret: 0 }),
            GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
            GuitarNote.from({ start: 1.5, end: 2.5, string: 5, fret: 0 }),
        ];
        const result = ErrorClassifer.classifyErrors(gt, rec, 'string');
        const states = result.map(d => d.state)
        const expected = [
            NoteState.SHORT,
            NoteState.SAME,
            NoteState.SAME,
        ];
        expect(states).toStrictEqual(expected);
    });
});

describe.skip('different', () => {
    test('last different string', () => {
        const rec = [
            GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 }),
            GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
            GuitarNote.from({ start: 1.5, end: 2.5, string: 2, fret: 0 }),
        ];
        const result = ErrorClassifer.classifyErrors(gt, rec, 'string');
        const states = result.map(d => d.state)
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
        const result = ErrorClassifer.classifyErrors(gt, rec, 'string');
        const states = result.map(d => d.state)
        const expected = [
            NoteState.SAME,
            NoteState.SAME,
            NoteState.DIFFERENT,
        ];
        expect(states).toStrictEqual(expected);
    });
});
