import Note from './Note.js';
import HarmonicaNote from './HarmonicaNote.js';


const note1 = new HarmonicaNote(0, 0.0, 127, 0, 3.0, 0, 0);

describe('HarmonicaNote', () => {
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
        const gtNote = HarmonicaNote.fromNote(note, 1, 2);
        const note2 = gtNote.toNote();
        expect(note.equals(note2)).toBe(true);
    });

    test('Note() shold be equal to Note.from with empty object', () => {
        const note1 = new HarmonicaNote();
        const note2 = HarmonicaNote.from({});
        expect(note1.equals(note2)).toBe(true);
    });

    test('toString', () => {
        const note = new HarmonicaNote(12, 1.25, 120, 0, 3.0, 4, 'blow');
        expect(note.toString()).toBe(
            `HarmonicaNote(name: C0, pitch: 12, start: 1.25, end: 3, velocity: 120, channel: 0, hole: 4, instruction: blow)`
        );
        expect(note.toString(true)).toBe(
            `HarmonicaNote(n: C0, p: 12, s: 1.25, e: 3, v: 120, c: 0, h: 4, i: blow)`
        );
    });

    describe('Note.from()', () => {
        test('defaults', () => {
            expect(HarmonicaNote.from({})).toStrictEqual(new HarmonicaNote());
            expect(HarmonicaNote.from({}).equals(new HarmonicaNote())).toBe(true);
        });

        test('simple', () => {
            expect(HarmonicaNote.from({
                pitch: 12,
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0,
                hole: 1,
                instruction: 'blow'
            })).toStrictEqual(new HarmonicaNote(12, 0.5, 50, 0, 1.5, 1, 'blow'));
        });

        test('HarmonicaNote name correct', () => {
            expect(HarmonicaNote.from({
                pitch: 'C0',
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            })).toStrictEqual(HarmonicaNote.from({
                pitch: 12,
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            }));
        });

        test('HarmonicaNote name incorrect', () => {
            expect(() => HarmonicaNote.from({
                pitch: 'invalid',
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            })).toThrowError(`Invalid pitch for HarmonicaNote.from()`);
        });
    });
});
