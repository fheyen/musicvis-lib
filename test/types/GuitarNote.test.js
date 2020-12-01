import { Note } from '../../src';
import GuitarNote from '../../src/types/GuitarNote';


const note1 = new GuitarNote(0, 0.0, 127, 0, 3.0, 0, 0);

test('note is euqal to itself', () => {
    expect(note1.equals(note1)).toBe(true);
});

test('note\'s clone is equal', () => {
    const note2 = note1.clone();
    expect(note1.equals(note2)).toBe(true);
});

test('note is unequal if other object is not of type Note', () => {
    expect(note1.equals({})).toBe(false);
});

test('from note to note should be equal', () => {
    const note = new Note(0, 0.0, 127, 0, 3.0);
    const gtNote = GuitarNote.fromNote(note, 1, 2);
    const note2 = gtNote.toNote();
    expect(note.equals(note2)).toBe(true);
});
