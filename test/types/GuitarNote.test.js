import Note from '../../src/types/Note';
import GuitarNote from '../../src/types/GuitarNote';


const note1 = new GuitarNote(0, 0.0, 127, 0, 3.0, 0, 0);

describe('GuitarNote', () => {
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

    test('Note() shold be equal to Note.from with empty object', () => {
        const note1 = new GuitarNote();
        const note2 = GuitarNote.from({});
        expect(note1.equals(note2)).toBe(true);
    });

    test('toString', () => {
        const note = new GuitarNote(12, 1.25, 120, 0, 3.0, 4, 12);
        expect(note.toString()).toBe(
            `GuitarNote(pitch: 12, start: 1.25, end: 3, velocity: 120, channel: 0, string: 4, fret: 12)`
        );
        expect(note.toString(true)).toBe(
            `GuitarNote(p: 12, s: 1.25, e: 3, v: 120, c: 0, s: 4, f: 12)`
        );
    });
});
