import Note from '../../src/types/Note';
import NoteArray from '../../src/types/NoteArray';

const note1 = new Note(0, 0.0, 127, 0, 3.0);

describe('Note', () => {
    test('note is equal to itself', () => {
        expect(note1.equals(note1)).toBe(true);
    });

    test('note\'s clone is equal', () => {
        const note2 = note1.clone();
        expect(note1.equals(note2)).toBe(true);
    });

    test('note is unequal if other object is not of type Note', () => {
        expect(note1.equals({})).toBe(false);
    });

    test('note is unequal if other note is different', () => {
        const note1 = new Note(0, 0.0, 127, 0, 3.0);
        const otherNotes = [
            new Note(1, 0.0, 127, 0, 3.0),
            new Note(0, 1.0, 127, 0, 3.0),
            new Note(0, 0.0, 64, 0, 3.0),
            new Note(0, 0.0, 127, 1, 3.0),
            new Note(0, 0.0, 127, 0, 2.0),
            new Note(1, 1.0, 64, 1, 2.0),
        ];
        for (let n of otherNotes) {
            expect(note1.equals(n)).toBe(false);
        }
    });

    describe('Note.from()', () => {
        test('defaults', () => {
            expect(Note.from({})).toStrictEqual(new Note());
            expect(Note.from({}).equals(new Note())).toBe(true);
        });

        test('simple', () => {
            expect(Note.from({
                pitch: 12,
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            })).toStrictEqual(new Note(12, 0.5, 50, 0, 1.5));
        });

        test('note name correct', () => {
            expect(Note.from({
                pitch: 'C0',
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            })).toStrictEqual(Note.from({
                pitch: 12,
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            }));
        });

        test('note name incorrect', () => {
            expect(() => Note.from({
                pitch: 'invalid',
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            })).toThrowError(`Invalid pitch for Note.from()`);
        });

        test('note name lowercase', () => {
            expect(() => Note.from({
                pitch: 'c4',
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            })).toThrowError(`Invalid pitch for Note.from()`);
        });

        test('note pitch incorrect', () => {
            expect(() => Note.from({
                pitch: -1,
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            })).toThrowError(`Invalid pitch -1`);
            expect(() => Note.from({
                pitch: 10.5,
                start: 0.5,
                end: 1.5,
                velocity: 50,
                channel: 0
            })).toThrowError(`Invalid pitch 10.5`);
        });
    });


    describe('overlaps in time', () => {
        test('note overlaps itself', () => {
            expect(note1.overlapsInTime(note1)).toBe(true);
        });

        test('notes do overlap', () => {
            const note1 = new Note(0, 1.0, 127, 0, 4.0);
            const note2 = new Note(0, 3.0, 127, 0, 5.0);
            const note3 = new Note(0, 0.0, 127, 0, 1.0);
            expect(note1.overlapsInTime(note2)).toBe(true);
            expect(note1.overlapsInTime(note3)).toBe(true);
        });

        test('notes do not overlap', () => {
            const note1 = new Note(0, 0.0, 127, 0, 3.0);
            const note2 = new Note(0, 4.0, 127, 0, 5.0);
            expect(note1.overlapsInTime(note2)).toBe(false);
        });
    });

    describe('overlap in seconds', () => {
        test('same', () => {
            const note1 = Note.from({ start: 1, end: 3 });
            expect(note1.overlapInSeconds(note1)).toBe(2);
        });

        test('no overlap', () => {
            const note1 = Note.from({ start: 1, end: 3 });
            const note2 = Note.from({ start: 4, end: 5 });
            expect(note1.overlapsInTime(note2)).toBe(false);
            expect(note1.overlapInSeconds(note2)).toBe(0);
        });

        test('touching', () => {
            const note1 = Note.from({ start: 1, end: 3 });
            const note2 = Note.from({ start: 3, end: 5 });
            expect(note1.overlapInSeconds(note2)).toBe(0);
        });

        test('A before B and reverse', () => {
            const note1 = Note.from({ start: 1, end: 3 });
            const note2 = Note.from({ start: 2, end: 4 });
            expect(note1.overlapInSeconds(note2)).toBe(1);
            expect(note2.overlapInSeconds(note1)).toBe(1);
        });

        test('same start, different end', () => {
            const note1 = Note.from({ start: 1, end: 3 });
            const note2 = Note.from({ start: 1, end: 4 });
            expect(note1.overlapInSeconds(note2)).toBe(2);
            expect(note2.overlapInSeconds(note1)).toBe(2);
        });

        test('same end, different start', () => {
            const note1 = Note.from({ start: 1, end: 3 });
            const note2 = Note.from({ start: 2, end: 3 });
            expect(note1.overlapInSeconds(note2)).toBe(1);
            expect(note2.overlapInSeconds(note1)).toBe(1);
        });
    });

    test('note duration is end - start', () => {
        expect(note1.getDuration()).toBe(3.0);
    });

    test('note duration is 0 when end is undefined/null', () => {
        const note = new Note(0, 0.0, 127, 0);
        expect(note.getDuration()).toBe(0);
    });

    test('note duration does not change when shifting in time', () => {
        const note = new Note(0, 0.0, 127, 0, 3.0).shiftTime(12);
        expect(note.getDuration()).toBe(3.0);
    });

    test('note duration does not change when shifting in time (end:null)', () => {
        const note = new Note(0, 0.0, 127, 0).shiftTime(12);
        expect(note.getDuration()).toBe(0);
    });

    test('note is shifted in time', () => {
        const note = new Note(0, 0.0, 127, 0).shiftTime(12);
        expect(note.start).toBe(12);
        const note2 = new Note(0, 0.0, 127, 0).shiftTime(-12);
        expect(note2.start).toBe(-12);
        const note3 = new Note(0, 3.0, 127, 0).shiftTime(4);
        expect(note3.start).toBe(7.0);
        const note4 = new Note(0, 3.0, 127, 0).shiftTime(-4);
        expect(note4.start).toBe(-1.0);
    });

    test('note duration is factor*oldDuration after scaling', () => {
        const note = new Note(0, 1.0, 127, 0, 3.0);
        const oldDuration = note.getDuration();
        const factor = 2.5;
        const note2 = note.scaleTime(factor);
        expect(note2.getDuration()).toBe(oldDuration * factor);
    });

    test('note start is factor*oldStart after scaling', () => {
        const note = new Note(0, 1.5, 127, 0, 3.0);
        const oldStart = note.start;
        const factor = 2.5;
        const note2 = note.scaleTime(factor);
        expect(note2.start).toBe(oldStart * factor);
    });

    test('note duration is still 0 after scaling (end:null)', () => {
        const note = new Note(0, 1.0, 127, 0).scaleTime(2);
        expect(note.getDuration()).toBe(0);
    });

    describe('MIDI info', () => {
        test('note letter', () => {
            const note = new Note(0, 1.0, 127, 0, 3.0);
            expect(note.getLetter()).toBe('C');
        });

        test('note name', () => {
            const note = new Note(0, 1.0, 127, 0, 3.0);
            expect(note.getName()).toBe('C-1');
        });

        test('note octave', () => {
            const note = new Note(0, 1.0, 127, 0, 3.0);
            expect(note.getOctave()).toBe(-1);
        });
    });

    test('Note.from with pitch', () => {
        const note1 = new Note(0, 1.0, 127, 0, 3.0);
        const note2 = Note.from({
            pitch: 0,
            start: 1.0,
            velocity: 127,
            channel: 0,
            end: 3.0
        });
        expect(note1.equals(note2)).toBe(true);
    });

    test('Note() shold be equal to Note.from with empty object', () => {
        const note1 = new Note();
        const note2 = Note.from({});
        expect(note1.equals(note2)).toBe(true);
    });

    test('toString', () => {
        const note = new Note(12, 1.25, 120, 0, 3.0);
        expect(note.toString()).toBe(
            `Note(name: C0, pitch: 12, start: 1.25, end: 3, velocity: 120, channel: 0)`
        );
        expect(note.toString(true)).toBe(
            `Note(n: C0, p: 12, s: 1.25, e: 3, v: 120, c: 0)`
        );
    });
});
