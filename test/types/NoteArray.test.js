import NoteArray from '../../src/types/NoteArray';
import Note from '../../src/types/Note';

const na = new NoteArray([
    new Note(69, 0.0, 127, 0, 1.0),
    new Note(69, 1.0, 127, 0, 2.0),
    new Note(71, 1.0, 127, 0, 2.0),
    new Note(67, 2.0, 127, 0, 3.0),
]);

test('NoteArray is equal to itself', () => {
    expect(na.equals(na)).toBe(true);
});

test('NoteArray\'s clone is equal', () => {
    const na2 = na.clone();
    expect(na.equals(na2)).toBe(true);
});
