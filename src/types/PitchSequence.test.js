import NoteArray from './NoteArray';
import Note from './Note';
import PitchSequence from './PitchSequence';

describe('PitchSequence', () => {

    test('constructor', () => {
        const ps = new PitchSequence();
        expect(ps.length()).toBe(0);
        expect(ps.getPitches()).toStrictEqual([]);
    });

    test('from noteArray', () => {
        const notes = [
            Note.from({ pitch: 1, start: 1.0, end: 2.0 }),
            Note.from({ pitch: 2, start: 1.0, end: 2.0 }),
            Note.from({ pitch: 2, start: 2.0, end: 3.0 }),
            Note.from({ pitch: 1, start: 4.0, end: 5.0 }),
            Note.from({ pitch: 3, start: 6.0, end: 7.0 }),
            Note.from({ pitch: 3, start: 7.0, end: 9.0 }),
        ];
        const expected = [1, 2, 2, 1, 3, 3];
        expect(PitchSequence.fromNotes(notes).getPitches()).toStrictEqual(expected);
    });

    describe('to string', () => {
        test('empty', () => {
            expect(new PitchSequence().toCharString()).toBe('');
            expect(new PitchSequence([]).toCharString()).toBe('');
        });

        test('simple', () => {
            expect(new PitchSequence([65, 66, 67]).toCharString()).toBe('ABC');
        });

        test('each pitch is different', () => {
            for (let i = 0; i < 128; i++) {
                for (let j = i + 1; j < 128; j++) {
                    expect(
                        new PitchSequence([i]).toCharString()
                    ).not.toBe(
                        new PitchSequence([j]).toCharString()
                    );
                }
            }
        });
    });

    describe('from string', () => {
        test('empty', () => {
            expect(
                PitchSequence.fromCharString('').getPitches()
            ).toStrictEqual([]);
        });

        test('simple', () => {
            expect(
                PitchSequence.fromCharString('ABC').getPitches()
            ).toStrictEqual([65, 66, 67]);
        });
    });

    describe('pitchSequenceToString & pitchSequenceFromString', () => {

        test('invert', () => {
            expect(
                PitchSequence.fromCharString('12345').toCharString()
            ).toBe('12345');
        });

        test('invert 2', () => {
            expect(
                PitchSequence.fromCharString(
                    new PitchSequence([1, 2, 3, 4, 5]).toCharString()
                ).getPitches()
            ).toStrictEqual([1, 2, 3, 4, 5]);
        });
    });

    describe('from note array to string', () => {
        test('empty', () => {
            expect(PitchSequence.fromNotes([]).toCharString()).toBe('');
        });

        test('notes', () => {
            const notes = [
                Note.from({ pitch: 65, start: 1.0, end: 2.0 }),
                Note.from({ pitch: 65, start: 1.0, end: 2.0 }),
                Note.from({ pitch: 66, start: 2.0, end: 3.0 }),
                Note.from({ pitch: 67, start: 4.0, end: 5.0 }),
                Note.from({ pitch: 66, start: 6.0, end: 7.0 }),
                Note.from({ pitch: 65, start: 7.0, end: 9.0 }),
            ];
            const expected = 'AABCBA';
            expect(PitchSequence.fromNotes(notes).toCharString()).toBe(expected);
        });
    });

    describe('without octaves', () => {
        test('nothing to do', () => {
            const seq = [0, 1, 4, 5, 8, 11];
            expect(
                new PitchSequence(seq).removeOctaves().getPitches()
            ).toStrictEqual(seq);
        });

        test('one to change', () => {
            const seq = [0, 1, 4, 12];
            expect(
                new PitchSequence(seq).removeOctaves().getPitches()
            ).toStrictEqual([0, 1, 4, 0]);
        });
    });

    describe('intervals', () => {
        test('1 notes', () => {
            expect(
                new PitchSequence([0]).toIntervals()).toStrictEqual([]);
        });

        test('2 notes', () => {
            expect(
                new PitchSequence([1, 2]).toIntervals()).toStrictEqual([1]);
        });

        test('all 1', () => {
            const seq = [0, 1, 2, 3, 4, 5];
            expect(
                new PitchSequence(seq).toIntervals()).toStrictEqual([1, 1, 1, 1, 1]);
        });

        test('1, 3, 3, -1, -2, 0, 0', () => {
            const seq = [0, 1, 4, 7, 6, 4, 4, 4];
            expect(
                new PitchSequence(seq).toIntervals()).toStrictEqual([1, 3, 3, -1, -2, 0, 0]);
        });
    });

    test('reverse', () => {
        const seq = [0, 1, 4, 7, 6, 4, 4, 4];
        expect(
            new PitchSequence(seq).reverse().getPitches()
        ).toStrictEqual([4, 4, 4, 6, 7, 4, 1, 0]);
        expect(
            new PitchSequence(seq).reverse().reverse().getPitches()
        ).toStrictEqual(seq);
    });

    test('clone is equal', () => {
        const seq = [0, 1, 4, 7, 6, 4, 4, 4];
        const ps = new PitchSequence(seq);
        expect(
            ps.clone().getPitches()
        ).toStrictEqual(seq);
        expect(
            ps.clone().equals(ps)
        ).toBe(true);
    });

    test('equals', () => {
        const seq = [0, 1, 4, 7, 6, 4, 4, 4];
        const ps = new PitchSequence(seq);
        const ps2 = new PitchSequence(seq);
        const psDifferent = new PitchSequence([1, 2, 3]);
        const psDifferentSameLength = new PitchSequence([8, 1, 4, 7, 6, 4, 4, 4]);
        expect(ps.equals(ps)).toBe(true);
        expect(ps.equals(ps2)).toBe(true);
        expect(ps.equals(psDifferent)).toBe(false);
        expect(ps.equals(psDifferentSameLength)).toBe(false);
        expect(ps.equals([0, 1, 4, 7, 6, 4, 4, 4])).toBe(false);
    });

    test('toNoteNameString', () => {
        expect(
            new PitchSequence().toNoteNameString()
        ).toBe('');

        const seq = [0, 12, 24, 25, 42];
        expect(
            new PitchSequence(seq).toNoteNameString()
        ).toBe(
            'C-1 C0 C1 C#1 F#2'
        );
    });
});
