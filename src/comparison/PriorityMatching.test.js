import { priorityMatching, getMatrixMinPosition, balancedNoteDistance, errorFromPriorityMatching } from './PriorityMatching';
import Note from '../types/Note';

describe('PriorityMatching', () => {
    describe('priorityMatching', () => {
        test('equal', () => {
            const a = [1, 2, 3, 4];
            const distanceFunction = (a, b) => Math.abs(a - b);
            expect(
                priorityMatching(a, a, distanceFunction)
            ).toStrictEqual(
                new Map([
                    [0, 0],
                    [1, 1],
                    [2, 2],
                    [3, 3],
                ])
            );
        });

        test('different', () => {
            const a = [1, 2, 3, 4];
            const b = [2, 1, 3, 4];
            const distanceFunction = (a, b) => Math.abs(a - b);
            expect(
                priorityMatching(a, b, distanceFunction)
            ).toStrictEqual(
                new Map([
                    [0, 1],
                    [1, 0],
                    [2, 2],
                    [3, 3],
                ])
            );
        });

        test('different lengths', () => {
            const a = [0, 1, 2, 3, 4];
            const b = [6, 2, 1, 3, 4, 5, 7];
            const distanceFunction = (a, b) => Math.abs(a - b);
            expect(
                priorityMatching(a, b, distanceFunction)
            ).toStrictEqual(
                new Map([
                    [0, 5],
                    [1, 2],
                    [2, 1],
                    [3, 3],
                    [4, 4],
                ])
            );
        });

        test('different lengths 2', () => {
            const a = [6, 2, 1, 3, 4, 5, 7];
            const b = [0, 1, 2, 3, 4];
            const distanceFunction = (a, b) => Math.abs(a - b);
            expect(
                priorityMatching(a, b, distanceFunction)
            ).toStrictEqual(
                new Map([
                    [0, 0],
                    [1, 2],
                    [2, 1],
                    [3, 3],
                    [4, 4],
                ])
            );
        });
    });


    describe('balancedNoteDistance', () => {
        const note = Note.from({
            pitch: 12,
            start: 5,
            duration: 2
        });

        test('equal', () => {
            expect(balancedNoteDistance(note, note)).toBe(0);
        });

        test('different', () => {
            const note2 = Note.from({
                pitch: 13,
                start: 4,
                duration: 3
            });
            expect(balancedNoteDistance(note, note2)).toBe(3.5);
        });
    });


    describe('errorFromPriorityMatching', () => {
        test('with simple numbers', () => {
            const a = [6, 2, 1, 3, 4, 5, 7];
            const b = [0, 1, 2, 3, 4];
            const distanceFunction = (a, b) => Math.abs(a - b);
            expect(
                errorFromPriorityMatching(a, b, distanceFunction)
            ).toStrictEqual(
                new Map([
                    [1, 0],
                    [2, 0],
                    [3, 0],
                    [4, 0],
                    [6, 6],
                ])
            );
        });

        test('with actual notes', () => {
            const a = [
                Note.from({ pitch: 12, start: 0, duration: 1 }),
                Note.from({ pitch: 13, start: 1, duration: 1 }),
                Note.from({ pitch: 14, start: 2, duration: 1 }),
                Note.from({ pitch: 12, start: 3, duration: 1 }),
                Note.from({ pitch: 24, start: 3, duration: 1 }),
            ];
            const b = [
                Note.from({ pitch: 12, start: 0, duration: 1.1 }),
                Note.from({ pitch: 13, start: 1.1, duration: 1.2 }),
                Note.from({ pitch: 14, start: 2.2, duration: 1.1 }),
                Note.from({ pitch: 12, start: 3.1, duration: 1.4 }),
                Note.from({ pitch: 25, start: 3, duration: 1.3 }),
            ];
            const distanceFunction = balancedNoteDistance;
            expect(
                errorFromPriorityMatching(a, b, distanceFunction)
            ).toStrictEqual(
                new Map([
                    [
                        {
                            "channel": 0,
                            "end": 2,
                            "name": "C#0",
                            "pitch": 13,
                            "start": 1,
                            "velocity": 127,
                        },
                        0.19999999999999996
                    ],
                    [
                        {
                            "channel": 0,
                            "end": 1,
                            "name": "C0",
                            "pitch": 12,
                            "start": 0,
                            "velocity": 127,
                        },
                        0.050000000000000044
                    ],
                    [
                        {
                            "channel": 0,
                            "end": 4,
                            "name": "C0",
                            "pitch": 12,
                            "start": 3,
                            "velocity": 127,
                        },
                        0.30000000000000004
                    ],
                    [
                        {
                            "channel": 0,
                            "end": 4,
                            "name": "C1",
                            "pitch": 24,
                            "start": 3,
                            "velocity": 127,
                        },
                        2.15
                    ],
                    [
                        {
                            "channel": 0,
                            "end": 3,
                            "name": "D0",
                            "pitch": 14,
                            "start": 2,
                            "velocity": 127,
                        },
                        0.2500000000000002
                    ],
                ])
            );
        });
    });


    describe('getMatrixMinPosition', () => {
        test('simple', () => {
            const matrix = [
                [2, 3, 1, 5, 6, 7],
                [2, 3, 1, 5, 6, 7],
                [2, 3, 1, 0, 6, 7],
                [2, 3, -1, 5, 6, 7],
                [2, 3, 1, 5, 6, 7],
            ];
            expect(
                getMatrixMinPosition(matrix)
            ).toStrictEqual(
                [3, 2]
            );
        });

        test('with null', () => {
            const matrix = [
                [2, 3, 1, 5, 6, 7],
                [2, null, 1, 5, 6, undefined],
                [2, 3, 1, 0, 6, 7],
                [2, 3, -1, null, 6, 7],
                [undefined, 3, 1, 5, 6, null],
            ];
            expect(
                getMatrixMinPosition(matrix)
            ).toStrictEqual(
                [3, 2]
            );
        });
    });
});
