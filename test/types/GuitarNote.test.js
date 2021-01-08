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
            `GuitarNote(name: C0, pitch: 12, start: 1.25, end: 3, velocity: 120, channel: 0, string: 4, fret: 12)`
        );
        expect(note.toString(true)).toBe(
            `GuitarNote(n: C0, p: 12, s: 1.25, e: 3, v: 120, c: 0, s: 4, f: 12)`
        );
    });

    describe('Note.from()', () => {
        test('defaults', () => {
            expect(GuitarNote.from({})).toStrictEqual(new GuitarNote());
            expect(GuitarNote.from({}).equals(new GuitarNote())).toBe(true);
        });

        test('simple', () => {
            expect(GuitarNote.from({
                pitch: 12,
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0,
                string: 1,
                fret: 2
            })).toStrictEqual(new GuitarNote(12, 0.5, 50, 0, 1.5, 1, 2));
        });

        test('GuitarNote name correct', () => {
            expect(GuitarNote.from({
                pitch: 'C0',
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            })).toStrictEqual(GuitarNote.from({
                pitch: 12,
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            }));
        });

        test('GuitarNote name incorrect', () => {
            expect(() => GuitarNote.from({
                pitch: 'invalid',
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            })).toThrowError(`Invalid pitch for GuitarNote.from()`);
        });
    });
});
