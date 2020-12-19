import * as Lamellophone from '../../src/instruments/Lamellophone';
import Note from '../../src/types/Note';

const tuning = Lamellophone.lamellophoneTunings?.get('Kalimba')?.get('17 C Major');

describe('Kalimba', () => {
    describe('tunings', () => {
        test('tunings are defined', () => {
            expect(Lamellophone.lamellophoneTunings).toBeDefined();
            expect(Lamellophone.lamellophoneTunings.get('Kalimba').get('17 C Major')).toBeDefined();
        });

        test('tunings pitches', () => {
            expect(tuning.pitches).toStrictEqual(
                [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84, 86, 88]
            );
        });

        test('tunings number notation', () => {
            expect(
                tuning.getNumbers()
            ).toStrictEqual(
                ['1', "2", "3", "4", "5", "6", "7", "1°", "2°", "3°", "4°", "5°", "6°", "7°", "1°°", "2°°", "3°°"]
            );
        });

        test('tunings letter notation', () => {
            expect(
                tuning.getLetters()
            ).toStrictEqual(
                ['C', "D", "E", "F", "G", "A", "B", "C°", "D°", "E°", "F°", "G°", "A°", "B°", "C°°", "D°°", "E°°"]
            );
        });


    });

    describe('convertNotesToTab', () => {
        test('one note after another', () => {
            const notes = [
                Note.from({ pitch: 'C4', start: 0, end: 1 }),
                Note.from({ pitch: 'D4', start: 1, end: 2 }),
                Note.from({ pitch: 'E4', start: 2, end: 3 }),
                Note.from({ pitch: 'F4', start: 3, end: 4 }),
                Note.from({ pitch: 'D5', start: 4, end: 5 }),
                Note.from({ pitch: 'C6', start: 5, end: 6 }),
            ];
            expect(
                Lamellophone.convertNotesToTab(notes, tuning, 'letter', 0.1)
            ).toBe(
                `C D E F D° C°°`
            );
        });

        test('chords', () => {
            const notes = [
                Note.from({ pitch: 'C4', start: 0, end: 1 }),
                Note.from({ pitch: 'D4', start: 1, end: 2 }),
                Note.from({ pitch: 'D5', start: 1, end: 2 }),
                Note.from({ pitch: 'E4', start: 2, end: 3 }),
                Note.from({ pitch: 'F5', start: 3, end: 4 }),
            ];
            expect(
                Lamellophone.convertNotesToTab(notes, tuning, 'letter', 0.1)
            ).toBe(
                `C (D D°) E F°`
            );
        });

        test('gaps', () => {
            const notes = [
                Note.from({ pitch: 'C4', start: 0, end: 1 }),
                Note.from({ pitch: 'D4', start: 1, end: 2 }),
                Note.from({ pitch: 'D5', start: 1, end: 2 }),
                Note.from({ pitch: 'E4', start: 3, end: 4 }),
                Note.from({ pitch: 'F4', start: 4, end: 5 }),
            ];
            expect(
                Lamellophone.convertNotesToTab(notes, tuning, 'letter', 0.1)
            ).toBe(
                `C (D D°)\nE F`
            );
        });

        test('gaps, number format', () => {
            const notes = [
                Note.from({ pitch: 'C4', start: 0, end: 1 }),
                Note.from({ pitch: 'D4', start: 1, end: 2 }),
                Note.from({ pitch: 'D5', start: 1, end: 2 }),
                Note.from({ pitch: 'E4', start: 3, end: 4 }),
                Note.from({ pitch: 'F4', start: 4, end: 5 }),
            ];
            expect(
                Lamellophone.convertNotesToTab(notes, tuning, 'number', 0.1)
            ).toBe(
                `1 (2 2°)\n3 4`
            );
        });
    });

    describe('convertNumbersToLetters', () => {
        // https://www.kalimbatabs.net/kalimba-tabs-tutorials/harry-potter-hedwigs-theme/
        const original = `
                3 (6 1) 1º 7 (6 1) 3º (4 2º) (5 7)
                (6 1) 1º 7 (2 5) (6 1) (1 3)
                3 (6 1) 1º 7 (6 1) 3º (5º 5) 4º (4 4º)
                1º (6 4º) 3º (4 2º) 2 1º (6 1)
                1º (3º 3) 1º (3º 5) 1º (6 4º) 3 (4 2º)

                7 (1º 1) 3º (4 2º) 2 1º (6 1º)
                1º (3º 3) 1º (3 5) 1º (5º 5) 4º (6 4º)
                (1º 1) 4º 3º (4 2º) 2 1º (6 1)`;
        const expected = `
                E (A C) C° B (A C) E° (F D°) (G B)
                (A C) C° B (D G) (A C) (C E)
                E (A C) C° B (A C) E° (G° G) F° (F F°)
                C° (A F°) E° (F D°) D C° (A C)
                C° (E° E) C° (E° G) C° (A F°) E (F D°)

                B (C° C) E° (F D°) D C° (A C°)
                C° (E° E) C° (E G) C° (G° G) F° (A F°)
                (C° C) F° E° (F D°) D C° (A C)`;

        test('given map', () => {
            const numberLetterMap = new Map([
                [1, 'C'],
                [2, 'D'],
                [3, 'E'],
                [4, 'F'],
                [5, 'G'],
                [6, 'A'],
                [7, 'B'],
            ]);
            expect(
                Lamellophone.convertNumbersToLetters(original, numberLetterMap)
            ).toBe(expected);
        });

        test('map from tuning', () => {
            const numberLetterMap = new Map();
            const numbers = tuning.getNumbers();
            const letters = tuning.getLetters();
            for (let i = 0; i < tuning.keyCount; i++) {
                const number = numbers[i];
                const letter = letters[i];
                numberLetterMap.set(number, letter);
            }
            expect(
                Lamellophone.convertNumbersToLetters(original, numberLetterMap)
            ).toBe(expected);
        });
    });

    describe.skip('bestTransposition', () => {
        const tuning = Lamellophone.lamellophoneTunings.get('Kalimba').get('17 C Major');
        test('empty', () => {
            expect(
                Lamellophone.bestTransposition([], tuning)
            ).toStrictEqual(
                { transpose: 0, retune: new Map() }
            );
        });

        test('already fits', () => {
            const notes = tuning.pitches.map(pitch => Note.from({ pitch }));
            expect(
                Lamellophone.bestTransposition(notes, tuning)
            ).toStrictEqual(
                { transpose: 0, retune: new Map() }
            );
        });

        test('fits when transposed by -3', () => {
            const notes = tuning.pitches.map(pitch => Note.from({ pitch: pitch + 3 }));
            expect(
                Lamellophone.bestTransposition(notes, tuning)
            ).toStrictEqual(
                { transpose: -3, retune: new Map() }
            );
        });

        test('fits when transposed by 3', () => {
            const notes = tuning.pitches.map(pitch => Note.from({ pitch: pitch - 3 }));
            expect(
                Lamellophone.bestTransposition(notes, tuning)
            ).toStrictEqual(
                { transpose: +3, retune: new Map() }
            );
        });

        test('only some used', () => {
            const notes = tuning.pitches.map(pitch => Note.from({ pitch: pitch - 3 }));
            expect(
                Lamellophone.bestTransposition(notes.slice(3, 10), tuning)
            ).toStrictEqual(
                { transpose: 3, retune: new Map() }
            );
            expect(
                Lamellophone.bestTransposition(notes.slice(10, 12), tuning)
            ).toStrictEqual(
                { transpose: 0, retune: new Map() }
            );
        });

        test('need to retune C to C#', () => {
            const notes = [
                Note.from({ pitch: 'C#4' }),
                Note.from({ pitch: 'F4' }),
                Note.from({ pitch: 'D4' }),
                Note.from({ pitch: 'E4' }),
                Note.from({ pitch: 'C5' }),
            ];
            expect(
                Lamellophone.bestTransposition(notes, tuning)
            ).toStrictEqual(
                {
                    transpose: 0,
                    retune: new Map([
                        [60, 1]
                    ])
                }
            );
        });
    });
});
