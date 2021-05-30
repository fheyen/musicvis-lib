/**
 * TODO: find way to automatically compute patterns from scales, get scales from tonaljs
 */

/**
 * Contains patterns for exercises, such as scales
 */
const patterns = new Map([
    ['pentatonic C type', {
        name: 'Pentatonic scale C type',
        rootNotePositions: ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 0],
            [1, 3],
        ],
    }],
    ['pentatonic A type', {
        name: 'Pentatonic scale A type',
        rootNotePositions: ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 0],
            [4, 3],
            [3, 0],
            [3, 3],
            [2, 1],
            [2, 3],
            [1, 1],
            [1, 3],
        ],
    }],
    ['pentatonic G type', {
        name: 'Pentatonic scale G type',
        rootNotePositions: ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 0],
            [6, 3],
            [5, 0],
            [5, 2],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 0],
            [2, 3],
            [1, 0],
            [1, 3],
        ],
    }],
    ['pentatonic E type', {
        name: 'Pentatonic scale E type',
        rootNotePositions: ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 0],
            [5, 3],
            [4, 0],
            [4, 3],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 1],
            [1, 3],
        ],
    }],
    ['pentatonic D type', {
        name: 'Pentatonic scale D type',
        rootNotePositions: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 1],
            [4, 3],
            [3, 0],
            [3, 3],
            [2, 1],
            [2, 4],
            [1, 1],
            [1, 3],
        ],
    }],
    ['pentatonic all', {
        name: 'Pentatonic scale all',
        rootNotePositions: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            // C
            [6, 0],
            [6, 3],
            [5, 0],
            [5, 3],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 0],
            [1, 3],
            // A
            [6, 3],
            [6, 5],
            [5, 3],
            [5, 5],
            [4, 2],
            [4, 5],
            [3, 2],
            [3, 5],
            [2, 3],
            [2, 5],
            [1, 3],
            [1, 5],
            // G
            [6, 5],
            [6, 8],
            [5, 5],
            [5, 7],
            [4, 5],
            [4, 7],
            [3, 5],
            [3, 7],
            [2, 5],
            [2, 8],
            [1, 5],
            [1, 8],
            // E
            [6, 8],
            [6, 10],
            [5, 7],
            [5, 10],
            [4, 7],
            [4, 9],
            [3, 7],
            [3, 9],
            [2, 8],
            [2, 10],
            [1, 8],
            [1, 10],
            // D
            [6, 10],
            [6, 12],
            [5, 10],
            [5, 12],
            [4, 10],
            [4, 12],
            [3, 9],
            [3, 12],
            [2, 10],
            [2, 13],
            [1, 10],
            [1, 12],
            // C
            [6, 12],
            [6, 15],
            [5, 12],
            [5, 15],
            [4, 12],
            [4, 14],
            [3, 12],
            [3, 14],
            [2, 13],
            [2, 15],
            [1, 12],
            [1, 15],
        ],
    }],

    /**
     * Heptatonic scales
     */
    ['haptatonic C type', {
        name: 'Heptatonic scale C type',
        rootNotePositions: ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 0],
            [1, 3],
        ],
    }],

    // TODO: other heptatonic patterns
    // TODO: all heptatonic patterns in one

    /**
     * Rows
     */
    ['rows of 4, left-right', {
        name: 'Rows left-right',
        rootNotePositions: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
        positions: Array.from({ length: 6 }).flatMap((d, string) =>
            Array.from({ length: 4 }).map((d, fret) => [6 - string, fret]),
        ),
    }],
    ['rows of 4, right-left', {
        name: 'Rows right-left',
        rootNotePositions: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
        positions: Array.from({ length: 6 }).flatMap((d, string) =>
            Array.from({ length: 4 }).map((d, fret) => [6 - string, 3 - fret]),
        ),
    }],
    ['rows of 4, left-right and right-left', {
        name: 'Rows left-right and right-left',
        rootNotePositions: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
        positions: Array.from({ length: 6 }).flatMap((d, string) =>
            Array.from({ length: 4 }).map((d, fret) => [6 - string, string % 2 === 0 ? fret : 3 - fret]),
        ),
    }],
]);

export default patterns;
