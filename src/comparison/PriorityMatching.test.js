import { priorityMatching, getMatrixMinPosition, balancedNoteDistance } from './PriorityMatching';
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
