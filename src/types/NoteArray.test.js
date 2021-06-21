import NoteArray from './NoteArray.js';
import Note from './Note.js';
import GuitarNote from './GuitarNote.js';

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

    test('preserves original notes when reUseNotes===true', () => {
        const notes = [
            Note.from({ pitch: 1 }),
            Note.from({ pitch: 2 }),
        ];
        // Should preserve
        const na1 = new NoteArray(notes, true);
        expect(na1.getNotes()[1]).toBe(notes[1]);
        // Should clone
        const na2 = new NoteArray(notes, false);
        expect(na2.getNotes()[1]).not.toBe(notes[1]);
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

    describe('Iterator', () => {
        const notes = na.getNotes();
        test('for-of', () => {
            let index = 0;
            for (const note of na) {
                expect(note).toBe(notes[index]);
                index++;
            }
        });
        test('spread into an array', () => {
            const notes2 = [...na];
            expect(notes2).toStrictEqual(notes);
        });
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


    describe('transpose', () => {
        test('can be transposed back and forth', () => {
            const transp = na.clone().transpose(12).transpose(-12);
            expect(na.equals(transp)).toBe(true);
        });

        test('transposed transitively', () => {
            const transp1 = na.clone().transpose(6).transpose(6);
            const transp2 = na.clone().transpose(12);
            expect(transp1.equals(transp2)).toBe(true);
        });
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


    // TODO: test other modes? more edge cases?
    describe('sliceAtTimes', () => {
        const toSlice = new NoteArray([
            Note.from({ start: 0, end: 1 }),
            Note.from({ start: 1, end: 2 }),
            Note.from({ start: 1, end: 2 }),
            Note.from({ start: 2, end: 3 }),
        ]);

        test('no times given', () => {
            expect(
                toSlice.sliceAtTimes([], 'touched')
            ).toStrictEqual([
                toSlice.getNotes()
            ]);
        });

        test('complete piece in one slice', () => {
            expect(
                toSlice.sliceAtTimes([4], 'touched')
            ).toStrictEqual([
                toSlice.getNotes()
            ]);
        });

        test('one chord in each slice', () => {
            expect(
                toSlice.sliceAtTimes([1, 2], 'start')
            ).toStrictEqual([
                [Note.from({ start: 0, end: 1 })],
                [Note.from({ start: 1, end: 2 }), Note.from({ start: 1, end: 2 })],
                [Note.from({ start: 2, end: 3 })],
            ]);
        });

        test('last slice time < duration', () => {
            expect(
                toSlice.sliceAtTimes([1, 2], 'start')
            ).toStrictEqual([
                [Note.from({ start: 0, end: 1 })],
                [Note.from({ start: 1, end: 2 }), Note.from({ start: 1, end: 2 })],
                [Note.from({ start: 2, end: 3 })],
            ]);
        });
    });


    describe('segmentAtGaps', () => {
        const naTooFew = new NoteArray([
            Note.from({ start: 0, duration: 1 }),
        ]);
        test('to few notes, start-start', () => {
            expect(naTooFew.segmentAtGaps(1, 'start-start')).toStrictEqual([naTooFew.getNotes()]);
        });
        test('to few notes, end-start', () => {
            expect(naTooFew.segmentAtGaps(1, 'end-start')).toStrictEqual([naTooFew.getNotes()]);
        });

        test('no gaps, start-start', () => {
            // start-start will see gaps when notes don't start at the same time!
            const naNoGaps = new NoteArray([
                Note.from({ start: 1 }),
                Note.from({ start: 1 }),
                Note.from({ start: 1 }),
            ]);
            expect(naNoGaps.segmentAtGaps(1, 'start-start')).toStrictEqual([naNoGaps.getNotes()]);
        });
        test('no gaps, end-start', () => {
            const naNoGaps = new NoteArray([
                Note.from({ start: 0, end: 1 }),
                Note.from({ start: 1, end: 2 }),
                Note.from({ start: 2, end: 3 }),
            ]);
            expect(naNoGaps.segmentAtGaps(1, 'end-start')).toStrictEqual([naNoGaps.getNotes()]);
        });

        test('no large enough gaps, start-start', () => {
            const naSmallGaps = new NoteArray([
                Note.from({ start: 0 }),
                Note.from({ start: 0.5 }),
                Note.from({ start: 1 }),
            ]);
            expect(naSmallGaps.segmentAtGaps(1, 'start-start')).toStrictEqual([naSmallGaps.getNotes()]);
        });
        test('no large enough gaps, end-start', () => {
            const naSmallGaps = new NoteArray([
                Note.from({ start: 0, end: 1 }),
                Note.from({ start: 1.5, end: 2 }),
                Note.from({ start: 2.5, end: 3 }),
            ]);
            expect(naSmallGaps.segmentAtGaps(1, 'end-start')).toStrictEqual([naSmallGaps.getNotes()]);
        });

        test('1 gap, start-start', () => {
            const na1Gap = new NoteArray([
                Note.from({ start: 0 }),
                Note.from({ start: 0 }),
                Note.from({ start: 3 }),
            ]);
            expect(na1Gap.segmentAtGaps(1, 'start-start')).toStrictEqual([
                [
                    Note.from({ start: 0 }),
                    Note.from({ start: 0 }),
                ],
                [
                    Note.from({ start: 3 }),
                ],
            ]);
        });
        test('1 gap, end-start', () => {
            const na1Gap = new NoteArray([
                Note.from({ start: 0, end: 1 }),
                Note.from({ start: 1.5, end: 2 }),
                Note.from({ start: 3, end: 4 }),
            ]);
            expect(na1Gap.segmentAtGaps(1, 'end-start')).toStrictEqual([
                [
                    Note.from({ start: 0, end: 1 }),
                    Note.from({ start: 1.5, end: 2 }),
                ],
                [
                    Note.from({ start: 3, end: 4 }),
                ],
            ]);
        });

        test('3 gaps, 2 large enough', () => {
            const naMoreGaps = new NoteArray([
                Note.from({ start: 0, end: 1 }),
                Note.from({ start: 1.5, end: 2 }),
                Note.from({ start: 3, end: 4 }),
                Note.from({ start: 4.5, end: 5 }),
                Note.from({ start: 6, end: 7 }),
            ]);
            expect(naMoreGaps.segmentAtGaps(1, 'end-start')).toStrictEqual([
                [
                    Note.from({ start: 0, end: 1 }),
                    Note.from({ start: 1.5, end: 2 }),
                ],
                [
                    Note.from({ start: 3, end: 4 }),
                    Note.from({ start: 4.5, end: 5 }),
                ],
                [
                    Note.from({ start: 6, end: 7 }),
                ],
            ]);
        });
    });


    describe('segmentAtIndices', () => {
        const na = new NoteArray(Array.from({ length: 20 }).map((d, i) => Note.from({ pitch: i })));
        test('empty', () => {
            const segments = new NoteArray().segmentAtIndices([3, 5, 10, 11, 16, 19]);
            expect(segments.map(d => d.length)).toStrictEqual([0, 0, 0, 0, 0, 0]);
        });
        test('simple case', () => {
            const segments = na.segmentAtIndices([3, 5, 10, 11, 16, 19]);
            expect(segments.map(d => d.length)).toStrictEqual([3, 2, 5, 1, 5, 3]);
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


    describe('filterPitches', () => {
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
        test('array', () => {
            const filtered = na.clone().filterPitches([71, 67]);
            expect(filtered.getNotes()).toStrictEqual(na2.getNotes());
        });
        test('Set', () => {
            const filtered = na.clone().filterPitches(new Set([71, 67]));
            expect(filtered.getNotes()).toStrictEqual(na2.getNotes());
        });
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
