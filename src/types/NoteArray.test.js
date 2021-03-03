import NoteArray from './NoteArray';
import Note from './Note';
import GuitarNote from './GuitarNote';

const na = new NoteArray([
    new Note(69, 0.0, 127, 0, 1.0),
    new Note(69, 1.0, 127, 0, 2.0),
    new Note(71, 1.0, 127, 0, 2.0),
    new Note(67, 2.0, 127, 0, 3.0),
]);

describe('NoteArray', () => {
    test('preserves guitar notes', () => {
        const notes = [
            GuitarNote.from({ string: 1, fret: 0 }),
            GuitarNote.from({ string: 2, fret: 0 }),
            GuitarNote.from({ string: 2, fret: 1 }),
            GuitarNote.from({ string: 3, fret: 2 }),
        ];
        const na = new NoteArray(notes);
        expect(na.getNotes()).toStrictEqual(notes);
    });

    test('is equal to itself', () => {
        expect(na.equals(na)).toBe(true);
    });

    test('add notes', () => {
        const na = new NoteArray([
            Note.from({ start: 1 }),
            Note.from({ start: 2 }),
            Note.from({ start: 3 }),
        ]);
        const na2 = new NoteArray([
            Note.from({ start: 1 }),
            Note.from({ start: 2 }),
            Note.from({ start: 3 }),
            Note.from({ start: 1.5 }),
        ]);
        const na3 = new NoteArray([
            Note.from({ start: 1 }),
            Note.from({ start: 1.5 }),
            Note.from({ start: 2 }),
            Note.from({ start: 3 }),
        ]);

        expect(
            na.clone().addNotes([Note.from({ start: 1.5 })], false).getNotes()
        ).toStrictEqual(
            na2.getNotes()
        );
        expect(
            na.clone().addNotes([Note.from({ start: 1.5 })], true).getNotes()
        ).toStrictEqual(
            na3.getNotes()
        );
        expect(
            na.clone().addNotes([Note.from({ start: 1.5 })]).getNotes()
        ).toStrictEqual(
            na3.getNotes()
        );
    });

    test('concat', () => {
        const na = new NoteArray([
            new Note(69, 0.0, 127, 0, 1.0),
            new Note(69, 1.0, 127, 0, 2.0),
        ]);
        const na2 = new NoteArray([
            new Note(69, 0.0, 127, 0, 1.0),
            new Note(69, 1.0, 127, 0, 2.0),
            new Note(69, 0.0, 127, 0, 1.0),
            new Note(69, 1.0, 127, 0, 2.0),
        ]);
        expect(na.clone().concat(na).getNotes()).toStrictEqual(na2.getNotes());
    });

    describe('append', () => {
        test('no gap', () => {
            const na = new NoteArray([
                new Note(69, 0.0, 127, 0, 1.0),
                new Note(69, 1.0, 127, 0, 2.0),
            ]);
            const na2 = new NoteArray([
                new Note(69, 0.0, 127, 0, 1.0),
                new Note(69, 1.0, 127, 0, 2.0),
                new Note(69, 2.0, 127, 0, 3.0),
                new Note(69, 3.0, 127, 0, 4.0),
            ]);
            const newNa = na.clone().append(na);
            expect(newNa.getDuration()).toBe(na2.getDuration());
            expect(newNa.getNotes()).toStrictEqual(na2.getNotes());
        });
        test('gap', () => {
            const na = new NoteArray([
                new Note(69, 0.0, 127, 0, 1.0),
                new Note(69, 1.0, 127, 0, 2.0),
            ]);
            const na2 = new NoteArray([
                new Note(69, 0.0, 127, 0, 1.0),
                new Note(69, 1.0, 127, 0, 2.0),
                new Note(69, 4.0, 127, 0, 5.0),
                new Note(69, 5.0, 127, 0, 6.0),
            ]);
            const gap = 2.0;
            const newNa = na.clone().append(na, gap);
            expect(newNa.getDuration()).toBe(na2.getDuration());
            expect(newNa.getNotes()).toStrictEqual(na2.getNotes());
        });
    });

    describe('repeat', () => {
        const na = new NoteArray([
            new Note(69, 1.0, 127, 0, 2.0),
            new Note(69, 2.0, 127, 0, 3.0),
        ]);
        const na2 = new NoteArray([
            new Note(69, 1.0, 127, 0, 2.0),
            new Note(69, 2.0, 127, 0, 3.0),
            new Note(69, 4.0, 127, 0, 5.0),
            new Note(69, 5.0, 127, 0, 6.0),
        ]);
        const na3 = new NoteArray([
            new Note(69, 1.0, 127, 0, 2.0),
            new Note(69, 2.0, 127, 0, 3.0),
            new Note(69, 4.0, 127, 0, 5.0),
            new Note(69, 5.0, 127, 0, 6.0),
            new Note(69, 7.0, 127, 0, 8.0),
            new Note(69, 8.0, 127, 0, 9.0),
        ]);
        test('< 1 time', () => {
            expect(na.clone().repeat(0).getNotes()).toStrictEqual([]);
        });
        test('1 time', () => {
            expect(na.clone().repeat(1).getNotes()).toStrictEqual(na.getNotes());
        });
        test('2 times', () => {
            expect(na.clone().repeat(2).getNotes()).toStrictEqual(na2.getNotes());
        });
        test('3 times', () => {
            expect(na.clone().repeat(3).getNotes()).toStrictEqual(na3.getNotes());
        });
    });

    test('clone is equal', () => {
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

    test('has correct duration with note.end == null', () => {
        const na = new NoteArray([
            new Note(69, 0.0, 127, 0, 1.0),
            new Note(69, 1.0, 127, 0),
            new Note(71, 1.0, 127, 0, 2.0),
            new Note(67, 3.0, 127, 0),
        ]);
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
        expect(na.clone().shiftToStartAt(3.5).getStartTime()).toBe(3.5);
        expect(na.clone().shiftToStartAt(-1.0).getStartTime()).toBe(-1.0);
        expect(na.clone().shiftToStartAt(0).getStartTime()).toBe(0);
    });

    test('has correct start time when shifted to startAt, note.end == null', () => {
        const na = new NoteArray([
            new Note(69, 0.0, 127, 0, 1.0),
            new Note(69, 1.0, 127, 0),
            new Note(71, 1.0, 127, 0, 2.0),
            new Note(67, 3.0, 127, 0),
        ]);
        expect(na.clone().shiftToStartAt(2.0).getStartTime()).toBe(2.0);
        expect(na.clone().shiftToStartAt(3.5).getStartTime()).toBe(3.5);
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

    test('removeOctaves', () => {
        const na = new NoteArray([
            new Note(60, 0.0, 127, 0, 1.0),
            new Note(65, 1.0, 127, 0, 2.0),
            new Note(72, 1.0, 127, 0, 2.0),
            new Note(67, 2.0, 127, 0, 3.0),
        ]);
        expect(
            na.removeOctaves().getNotes()
        ).toStrictEqual([
            new Note(0, 0.0, 127, 0, 1.0),
            new Note(5, 1.0, 127, 0, 2.0),
            new Note(0, 1.0, 127, 0, 2.0),
            new Note(7, 2.0, 127, 0, 3.0),
        ]);
    });

    test('forEach', () => {
        const na = new NoteArray([
            Note.from({ channel: 1 }),
            Note.from({ channel: 2 }),
            Note.from({ channel: 3 }),
            Note.from({ channel: 4 }),
        ]);
        const expected = new NoteArray([
            Note.from({ channel: 0 }),
            Note.from({ channel: 1 }),
            Note.from({ channel: 2 }),
            Note.from({ channel: 3 }),
        ]);
        const processed = new NoteArray();
        na.forEach(n => processed.addNotes([
            Note.from({ ...n, channel: n.channel - 1 })
        ]));
        expect(processed.getNotes()).toStrictEqual(expected.getNotes());
    });

    test('sort', () => {
        const na = new NoteArray([
            Note.from({ channel: 3 }),
            Note.from({ channel: 2 }),
            Note.from({ channel: 7 }),
            Note.from({ channel: 5 }),
            Note.from({ channel: 4 }),
            Note.from({ channel: 8 }),
            Note.from({ channel: 1 }),
            Note.from({ channel: 6 }),
        ]);
        const expected = new NoteArray([
            Note.from({ channel: 1 }),
            Note.from({ channel: 2 }),
            Note.from({ channel: 3 }),
            Note.from({ channel: 4 }),
            Note.from({ channel: 5 }),
            Note.from({ channel: 6 }),
            Note.from({ channel: 7 }),
            Note.from({ channel: 8 }),
        ]);
        const sorted = na.clone().sort((a, b) => a.channel - b.channel);
        expect(sorted.getNotes()).toStrictEqual(expected.getNotes());
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
                    new NoteArray([]).getNotes()
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

            test('invalid mode', () => {
                expect(
                    () => toSlice.sliceTime(1, 3, 'invalid')
                ).toThrow('Invalid slicing mode');
            });
        });

        describe('touched', () => {
            test('simple case', () => {
                expect(
                    toSlice.clone().sliceTime(0.5, 2.5, 'touched').getNotes()
                ).toStrictEqual(
                    new NoteArray([
                        Note.from({ start: 0, end: 1 }),
                        Note.from({ start: 0, end: 2 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1, end: 3 }),
                        Note.from({ start: 2, end: 3 }),
                        Note.from({ start: 2 }),
                    ]).getNotes()
                );
            });
            test('exact time 1 2', () => {
                expect(
                    toSlice.clone().sliceTime(1, 2, 'touched').getNotes()
                ).toStrictEqual(
                    new NoteArray([
                        Note.from({ start: 0, end: 1 }),
                        Note.from({ start: 0, end: 2 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1, end: 3 }),
                        Note.from({ start: 2, end: 3 }),
                        Note.from({ start: 2 }),
                    ]).getNotes()
                );
            });
            test('exact time 1 1', () => {
                expect(
                    toSlice.clone().sliceTime(1, 1, 'touched').getNotes()
                ).toStrictEqual(
                    new NoteArray([
                        Note.from({ start: 0, end: 1 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1, end: 3 }),
                    ]).getNotes()
                );
            });
        });

        describe('touched-included', () => {
            test('simple case', () => {
                expect(
                    toSlice.clone().sliceTime(0.5, 2.5, 'touched-included').getNotes()
                ).toStrictEqual(
                    new NoteArray([
                        Note.from({ start: 0, end: 1 }),
                        Note.from({ start: 0, end: 2 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1, end: 3 }),
                        Note.from({ start: 2, end: 3 }),
                        Note.from({ start: 2 }),
                    ]).getNotes()
                );
            });
            test('exact time 1 2', () => {
                expect(
                    toSlice.clone().sliceTime(1, 2, 'touched-included').getNotes()
                ).toStrictEqual(
                    new NoteArray([
                        Note.from({ start: 0, end: 1 }),
                        Note.from({ start: 0, end: 2 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1, end: 3 }),
                        Note.from({ start: 2, end: 3 }),
                        Note.from({ start: 2 }),
                    ]).getNotes()
                );
            });
            test('exact time 1 1', () => {
                expect(
                    toSlice.clone().sliceTime(1, 1, 'touched-included').getNotes()
                ).toStrictEqual(
                    new NoteArray([
                        Note.from({ start: 0, end: 1 }),
                        Note.from({ start: 0, end: 2 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1 }),
                        Note.from({ start: 1, end: 2 }),
                        Note.from({ start: 1, end: 3 }),
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

    describe('reverse', () => {
        test('same when reversed', () => {
            const na = new NoteArray([
                Note.from({ start: 0, end: 1 }),
                Note.from({ start: 1, end: 2 }),
                Note.from({ start: 2, end: 3 }),
                Note.from({ start: 3, end: 4 }),
            ]);
            const rev = na.clone().reverse();
            expect(rev.getNotes()).toStrictEqual(na.getNotes());
            const rev2times = na.clone().reverse().reverse();
            expect(rev2times.getNotes()).toStrictEqual(na.getNotes());
        });

        test('can be reversed back and forth', () => {
            const na = new NoteArray([
                // TODO: make work with negative?
                // Note.from({ start: -1, end: 1 }),
                Note.from({ start: 0, end: 2 }),
                Note.from({ start: 1, end: 3 }),
                Note.from({ start: 2.0, end: 2.5 }),
                Note.from({ start: 3, end: 4 }),
                Note.from({ start: 3.5, end: 4 }),
                Note.from({ start: 3.75, end: 5 }),
                Note.from({ start: 4.1, end: 6 }),
            ]);
            const rev = na.clone().reverse().reverse();
            expect(rev.getNotes()).toStrictEqual(na.getNotes());
        });
    });
});
