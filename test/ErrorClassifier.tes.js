import { GuitarNote } from '../src';
import * as ErrorClassifer from '../src/ErrorClassifier';

const NoteState = ErrorClassifer.NoteState;

test.skip('every note on point', () => {
    const gt = [
        GuitarNote.from({ start: 0, end: 1, string: 3, fret: 0 }),
        GuitarNote.from({ start: 1, end: 2, string: 4, fret: 0 }),
        GuitarNote.from({ start: 1.5, end: 2.5, string: 5, fret: 0 }),
    ];
    const result = ErrorClassifer.classifyErrors(gt, gt);
    const states = result.map(d => d.state)
    const expected = [
        NoteState.SAME,
        NoteState.SAME,
        NoteState.SAME,
    ];
    expect(states).toStrictEqual(expected);
});
