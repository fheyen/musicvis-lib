import NoteArray from '../../src/types/NoteArray';
import Note from '../../src/types/Note';

const na = new NoteArray([
    new Note(69, 0.0, 127, 0, 1.0),
    new Note(69, 1.0, 127, 0, 2.0),
    new Note(71, 1.0, 127, 0, 2.0),
    new Note(67, 2.0, 127, 0, 3.0),
]);

describe('NoteArray', () => {
    test('is equal to itself', () => {
        expect(na.equals(na)).toBe(true);
    });

    test('NoteArray\'s clone is equal', () => {
        const na2 = na.clone();
        expect(na.equals(na2)).toBe(true);
    });

    test('is unequal if other object is not of type NoteArray', () => {
        expect(na.equals({})).toBe(false);
    });

    test('is unequal if lengths differ', () => {
        const na2 = na.clone().slice(0, 2);
        expect(na.equals(na2)).toBe(false);
    });

    test('is unequal if notes differ', () => {
        const na = new NoteArray([
            new Note(69, 0.0, 127, 0, 1.0),
            new Note(69, 1.0, 127, 0, 2.0),
            new Note(71, 1.0, 127, 0, 2.0),
            new Note(67, 2.0, 127, 0, 3.0),
        ]);
        const na2 = new NoteArray([
            new Note(12, 0.0, 127, 0, 1.0),
            new Note(69, 1.0, 127, 0, 2.0),
            new Note(71, 1.0, 127, 0, 2.0),
            new Note(67, 2.0, 127, 0, 3.0),
        ]);
        expect(na.equals(na2)).toBe(false);
    });

    test('has correct duration', () => {
        expect(na.getDuration()).toBe(3.0);
    });

    test('has correct duration when shifted', () => {
        expect(na.clone().shiftTime(2.0).getDuration()).toBe(5.0);
    });

    test('has correct start time', () => {
        expect(na.getStartTime()).toBe(0.0);
    });

    test('has correct start time when shifted', () => {
        expect(na.clone().shiftTime(2.0).getStartTime()).toBe(2.0);
        expect(na.clone().shiftTime(-2.0).getStartTime()).toBe(-2.0);
    });

    test('has correct start time when shifted to startAt', () => {
        expect(na.clone().shiftToStartAt(2.0).getStartTime()).toBe(2.0);
        expect(na.clone().shiftToStartAt(3.0).getStartTime()).toBe(3.0);
        expect(na.clone().shiftToStartAt(-1.0).getStartTime()).toBe(-1.0);
        expect(na.clone().shiftToStartAt(0).getStartTime()).toBe(0);
    });

    test('has correct duration when scaled', () => {
        expect(na.clone().scaleTime(2.0).getDuration()).toBe(6.0);
    });


    test('can be transposed back and forth', () => {
        const transp = na.clone().transpose(12).transpose(-12);
        expect(na.equals(transp)).toBe(true);
    });

    test('transposed transitively', () => {
        const transp1 = na.clone().transpose(6).transpose(6);
        const transp2 = na.clone().transpose(12);
        expect(transp1.equals(transp2)).toBe(true);
    });

    test('sortByTime', () => {
        const na = new NoteArray([
            Note.from({ start: 3.5 }),
            Note.from({ start: 2.0 }),
            Note.from({ start: 1 }),
            Note.from({ start: 3 }),
            Note.from({ start: 4.1 }),
            Note.from({ start: 0 }),
            Note.from({ start: -1 }),
            Note.from({ start: 3.75 }),
        ]);
        const na2 = new NoteArray([
            Note.from({ start: -1 }),
            Note.from({ start: 0 }),
            Note.from({ start: 1 }),
            Note.from({ start: 2.0 }),
            Note.from({ start: 3 }),
            Note.from({ start: 3.5 }),
            Note.from({ start: 3.75 }),
            Note.from({ start: 4.1 }),
        ]);
        const sorted = na.clone().sortByTime();
        expect(sorted.getNotes()).toStrictEqual(na2.getNotes());
    });

    test('map', () => {
        const na = new NoteArray([
            new Note(71, 1.0, 20),
            new Note(69, 1.0, 30),
        ]);
        const na2 = new NoteArray([
            new Note(71, 1.0, 40),
            new Note(69, 1.0, 60),
        ]);
        const mapped = na.clone().map(n => Note.from({ ...n, velocity: n.velocity * 2 }));
        expect(mapped.getNotes()).toStrictEqual(na2.getNotes());
    });

    describe('scliceTime', () => {
        const toSlice = new NoteArray([
            Note.from({ start: 0, end: 1 }),
            Note.from({ start: 0, end: 2 }),
            Note.from({ start: 1, end: 2 }),
            Note.from({ start: 1 }),
            Note.from({ start: 1, end: 2 }),
            Note.from({ start: 1, end: 3 }),
            Note.from({ start: 2, end: 3 }),
            Note.from({ start: 2 }),
            Note.from({ start: 3, end: 4 }),
            Note.from({ start: 4, end: 5 }),
        ]);
        test('length', () => {
            expect(toSlice.length()).toBe(10);
        });

        describe('contained', () => {
            test('simple case', () => {
                expect(
                    toSlice.clone().sliceTime(0.5, 2.5).getNotes()
                ).toStrictEqual(
                    new NoteArray([
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1, end: 2 }),
                    ]).getNotes()
                );
            });
            test('default param', () => {
                expect(
                    toSlice.clone().sliceTime(0.5, 2.5).getNotes()
                ).toStrictEqual(
                    toSlice.clone().sliceTime(0.5, 2.5, 'contained').getNotes()
                );
            });
            test('exact time 1 2', () => {
                expect(
                    toSlice.clone().sliceTime(1, 2).getNotes()
                ).toStrictEqual(
                    new NoteArray([

                    ]).getNotes()
                );
            });
            test('exact time 1 3', () => {
                expect(
                    toSlice.clone().sliceTime(1, 3).getNotes()
                ).toStrictEqual(
                    new NoteArray([
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1, end: 2 }),
                    ]).getNotes()
                );
            });
        });

        test('start', () => {
            expect(
                toSlice.clone().sliceTime(1, 3, 'start').getNotes()
            ).toStrictEqual(
                new NoteArray([
                    Note.from({ start: 1, end: 2 }),
                    Note.from({ start: 1 }),
                    Note.from({ start: 1, end: 2 }),
                    Note.from({ start: 1, end: 3 }),
                    Note.from({ start: 2, end: 3 }),
                    Note.from({ start: 2 }),
                ]).getNotes()
            );
        });

        test('end', () => {
            expect(
                toSlice.clone().sliceTime(1, 3, 'end').getNotes()
            ).toStrictEqual(
                new NoteArray([
                    Note.from({ start: 0, end: 1 }),
                    Note.from({ start: 0, end: 2 }),
                    Note.from({ start: 1, end: 2 }),
                    Note.from({ start: 1, end: 2 }),
                ]).getNotes()
            );
        });
    });

    test('filter', () => {
        const na = new NoteArray([
            new Note(69, 0.0, 127, 0, 1.0),
            new Note(71, 1.0, 20, 0, 2.0),
            new Note(69, 1.0, 30, 0, 2.0),
            new Note(67, 2.0, 127, 0, 3.0),
        ]);
        const na2 = new NoteArray([
            new Note(71, 1.0, 20, 0, 2.0),
            new Note(69, 1.0, 30, 0, 2.0),
        ]);
        const filtered = na.clone().filter(n => n.velocity < 50);
        expect(filtered.getNotes()).toStrictEqual(na2.getNotes());
    });

    test('filterPitches', () => {
        const na = new NoteArray([
            new Note(69, 0.0, 127, 0, 1.0),
            new Note(71, 1.0, 127, 0, 2.0),
            new Note(69, 1.0, 127, 0, 2.0),
            new Note(67, 2.0, 127, 0, 3.0),
        ]);
        const na2 = new NoteArray([
            new Note(71, 1.0, 127, 0, 2.0),
            new Note(67, 2.0, 127, 0, 3.0),
        ]);
        const filtered = na.clone().filterPitches([71, 67]);
        expect(filtered.getNotes()).toStrictEqual(na2.getNotes());
    });

    test.skip('can be reversed back and forth', () => {
        const rev = na.clone().reverse().reverse();
        expect(rev.getNotes()).toStrictEqual(na.getNotes());
    });
});
