import * as Chords from './Chords.js'
import Note from '../types/Note.js'

describe('Chords', () => {
  describe('detectChordsByExactStart', () => {
    test('exact same start and end, gap', () => {
      const notes = [
        Note.from({ pitch: 1, start: 0, end: 1 }),
        Note.from({ pitch: 2, start: 0, end: 1 }),
        Note.from({ pitch: 3, start: 0, end: 1 }),
        Note.from({ pitch: 4, start: 2, end: 3 }),
        Note.from({ pitch: 5, start: 2, end: 3 }),
        Note.from({ pitch: 6, start: 2, end: 3 })
      ]
      const expected = [
        [
          Note.from({ pitch: 1, start: 0, end: 1 }),
          Note.from({ pitch: 2, start: 0, end: 1 }),
          Note.from({ pitch: 3, start: 0, end: 1 })
        ], [
          Note.from({ pitch: 4, start: 2, end: 3 }),
          Note.from({ pitch: 5, start: 2, end: 3 }),
          Note.from({ pitch: 6, start: 2, end: 3 })
        ]
      ]
      expect(Chords.detectChordsByExactStart(notes)).toStrictEqual(expected)
    })

    test('exact same start and end, no gap', () => {
      const notes = [
        Note.from({ pitch: 1, start: 0, end: 1 }),
        Note.from({ pitch: 2, start: 0, end: 1 }),
        Note.from({ pitch: 3, start: 0, end: 1 }),
        Note.from({ pitch: 4, start: 1, end: 3 }),
        Note.from({ pitch: 5, start: 1, end: 3 }),
        Note.from({ pitch: 6, start: 1, end: 3 })
      ]
      const expected = [
        [
          Note.from({ pitch: 1, start: 0, end: 1 }),
          Note.from({ pitch: 2, start: 0, end: 1 }),
          Note.from({ pitch: 3, start: 0, end: 1 })
        ], [
          Note.from({ pitch: 4, start: 1, end: 3 }),
          Note.from({ pitch: 5, start: 1, end: 3 }),
          Note.from({ pitch: 6, start: 1, end: 3 })
        ]
      ]
      expect(Chords.detectChordsByExactStart(notes)).toStrictEqual(expected)
    })

    test('exact same start and end, overlap', () => {
      const notes = [
        Note.from({ pitch: 1, start: 0, end: 1 }),
        Note.from({ pitch: 2, start: 0, end: 1 }),
        Note.from({ pitch: 3, start: 0, end: 1 }),
        Note.from({ pitch: 4, start: 0.5, end: 3 }),
        Note.from({ pitch: 5, start: 0.5, end: 3 }),
        Note.from({ pitch: 6, start: 0.5, end: 3 })
      ]
      const expected = [
        [
          Note.from({ pitch: 1, start: 0, end: 1 }),
          Note.from({ pitch: 2, start: 0, end: 1 }),
          Note.from({ pitch: 3, start: 0, end: 1 })
        ], [
          Note.from({ pitch: 4, start: 0.5, end: 3 }),
          Note.from({ pitch: 5, start: 0.5, end: 3 }),
          Note.from({ pitch: 6, start: 0.5, end: 3 })
        ]
      ]
      expect(Chords.detectChordsByExactStart(notes)).toStrictEqual(expected)
    })

    test('single notes', () => {
      const notes = [
        Note.from({ pitch: 1, start: 0, end: 1 }),
        Note.from({ pitch: 2, start: 0, end: 1 }),
        Note.from({ pitch: 3, start: 0, end: 0.5 }),
        Note.from({ pitch: 7, start: 1, end: 3 }),
        Note.from({ pitch: 4, start: 2, end: 4 }),
        Note.from({ pitch: 5, start: 2, end: 3 }),
        Note.from({ pitch: 6, start: 2, end: 2 }),
        Note.from({ pitch: 8, start: 3, end: 5 })
      ]
      const expected = [
        [
          Note.from({ pitch: 1, start: 0, end: 1 }),
          Note.from({ pitch: 2, start: 0, end: 1 }),
          Note.from({ pitch: 3, start: 0, end: 0.5 })
        ], [
          Note.from({ pitch: 7, start: 1, end: 3 })
        ], [
          Note.from({ pitch: 4, start: 2, end: 4 }),
          Note.from({ pitch: 5, start: 2, end: 3 }),
          Note.from({ pitch: 6, start: 2, end: 2 })
        ], [
          Note.from({ pitch: 8, start: 3, end: 5 })
        ]
      ]
      expect(Chords.detectChordsByExactStart(notes)).toStrictEqual(expected)
    })
  })

  // TODO: test more thouroughfully
  describe('detectChordsByExactStart', () => {
    expect(Chords.detectChordsBySimilarStart(
      [{ start: 0 }, { start: 0.5 }, { start: 1 }, { start: 1.5 }, { start: 2 }],
      1
    )).toStrictEqual([
      [{ start: 0 }], [{ start: 1.5 }]])
  })

  describe('detectChordsByOverlap', () => {
    test('no note', () => {
      expect(Chords.detectChordsByOverlap()).toStrictEqual([])
      expect(Chords.detectChordsByOverlap([])).toStrictEqual([])
    })

    test('one note', () => {
      expect(Chords.detectChordsByOverlap(
        [Note.from({ pitch: 1, start: 0, end: 1 })]
      )).toStrictEqual([[Note.from({ pitch: 1, start: 0, end: 1 })]])
    })

    test('two single notes', () => {
      const notes = [
        Note.from({ pitch: 1, start: 0, end: 1 }),
        Note.from({ pitch: 2, start: 2, end: 3 })
      ]
      const expected = [
        [
          Note.from({ pitch: 1, start: 0, end: 1 })
        ], [
          Note.from({ pitch: 2, start: 2, end: 3 })
        ]
      ]
      expect(Chords.detectChordsByOverlap(notes, true)).toStrictEqual(expected)
    })

    test('two overlapping notes', () => {
      const notes = [
        Note.from({ pitch: 1, start: 0.0, end: 2 }),
        Note.from({ pitch: 2, start: 0.5, end: 3 })
      ]
      const expected = [
        [
          Note.from({ pitch: 1, start: 0.0, end: 2 }),
          Note.from({ pitch: 2, start: 0.5, end: 3 })
        ]
      ]
      expect(Chords.detectChordsByOverlap(notes, true)).toStrictEqual(expected)
    })

    test('exact same start and end, gap', () => {
      const notes = [
        Note.from({ pitch: 1, start: 0, end: 1 }),
        Note.from({ pitch: 2, start: 0, end: 1 }),
        Note.from({ pitch: 3, start: 0, end: 1 }),
        Note.from({ pitch: 4, start: 2, end: 3 }),
        Note.from({ pitch: 5, start: 2, end: 3 }),
        Note.from({ pitch: 6, start: 2, end: 3 })
      ]
      const expected = [
        [
          Note.from({ pitch: 1, start: 0, end: 1 }),
          Note.from({ pitch: 2, start: 0, end: 1 }),
          Note.from({ pitch: 3, start: 0, end: 1 })
        ], [
          Note.from({ pitch: 4, start: 2, end: 3 }),
          Note.from({ pitch: 5, start: 2, end: 3 }),
          Note.from({ pitch: 6, start: 2, end: 3 })
        ]
      ]
      expect(Chords.detectChordsByOverlap(notes, true)).toStrictEqual(expected)
    })

    test('exact same start and end, no gap', () => {
      const notes = [
        Note.from({ pitch: 1, start: 0, end: 1 }),
        Note.from({ pitch: 2, start: 0, end: 1 }),
        Note.from({ pitch: 3, start: 0, end: 1 }),
        Note.from({ pitch: 4, start: 1, end: 3 }),
        Note.from({ pitch: 5, start: 1, end: 3 }),
        Note.from({ pitch: 6, start: 1, end: 3 })
      ]
      const expected = [
        [
          Note.from({ pitch: 1, start: 0, end: 1 }),
          Note.from({ pitch: 2, start: 0, end: 1 }),
          Note.from({ pitch: 3, start: 0, end: 1 })
        ], [
          Note.from({ pitch: 4, start: 1, end: 3 }),
          Note.from({ pitch: 5, start: 1, end: 3 }),
          Note.from({ pitch: 6, start: 1, end: 3 })
        ]
      ]
      expect(Chords.detectChordsByOverlap(notes, true)).toStrictEqual(expected)
    })

    test('slightly different start', () => {
      const notes = [
        Note.from({ pitch: 1, start: 0.0, end: 1 }),
        Note.from({ pitch: 2, start: 0.1, end: 1 }),
        Note.from({ pitch: 3, start: 0.2, end: 1 }),
        Note.from({ pitch: 4, start: 1.0, end: 3 }),
        Note.from({ pitch: 5, start: 1.1, end: 3 }),
        Note.from({ pitch: 6, start: 1.2, end: 3 })
      ]
      const expected = [
        [
          Note.from({ pitch: 1, start: 0.0, end: 1 }),
          Note.from({ pitch: 2, start: 0.1, end: 1 }),
          Note.from({ pitch: 3, start: 0.2, end: 1 })
        ], [
          Note.from({ pitch: 4, start: 1.0, end: 3 }),
          Note.from({ pitch: 5, start: 1.1, end: 3 }),
          Note.from({ pitch: 6, start: 1.2, end: 3 })
        ]
      ]
      expect(Chords.detectChordsByOverlap(notes, true)).toStrictEqual(expected)
    })

    test('confusing overlaps', () => {
      const notes = [
        Note.from({ pitch: 1, start: 1, end: 4 }),
        Note.from({ pitch: 2, start: 2, end: 5 }),
        Note.from({ pitch: 3, start: 3, end: 6 }),
        Note.from({ pitch: 4, start: 4, end: 7 }),
        Note.from({ pitch: 5, start: 5, end: 8 }),
        Note.from({ pitch: 6, start: 6, end: 9 })
      ]
      const expected = [
        [
          Note.from({ pitch: 1, start: 1, end: 4 }),
          Note.from({ pitch: 2, start: 2, end: 5 })
        ], [
          Note.from({ pitch: 3, start: 3, end: 6 }),
          Note.from({ pitch: 4, start: 4, end: 7 })
        ], [
          Note.from({ pitch: 5, start: 5, end: 8 }),
          Note.from({ pitch: 6, start: 6, end: 9 })
        ]
      ]
      expect(Chords.detectChordsByOverlap(notes, true)).toStrictEqual(expected)
    })

    describe('sorting', () => {
      const notes = [
        Note.from({ pitch: 2, start: 1, end: 4 }),
        Note.from({ pitch: 1, start: 2, end: 5 }),
        Note.from({ pitch: 3, start: 3, end: 6 }),
        Note.from({ pitch: 4, start: 4, end: 7 }),
        Note.from({ pitch: 6, start: 5, end: 8 }),
        Note.from({ pitch: 5, start: 6, end: 9 })
      ]
      test('confusing overlaps, no pitch sorting', () => {
        const expected = [
          [
            Note.from({ pitch: 2, start: 1, end: 4 }),
            Note.from({ pitch: 1, start: 2, end: 5 })
          ], [
            Note.from({ pitch: 3, start: 3, end: 6 }),
            Note.from({ pitch: 4, start: 4, end: 7 })
          ], [
            Note.from({ pitch: 6, start: 5, end: 8 }),
            Note.from({ pitch: 5, start: 6, end: 9 })
          ]
        ]
        expect(Chords.detectChordsByOverlap(notes, false)).toStrictEqual(expected)
      })
      test('confusing overlaps, with pitch sorting', () => {
        const expected = [
          [
            Note.from({ pitch: 1, start: 2, end: 5 }),
            Note.from({ pitch: 2, start: 1, end: 4 })
          ], [
            Note.from({ pitch: 3, start: 3, end: 6 }),
            Note.from({ pitch: 4, start: 4, end: 7 })
          ], [
            Note.from({ pitch: 5, start: 6, end: 9 }),
            Note.from({ pitch: 6, start: 5, end: 8 })
          ]
        ]
        expect(Chords.detectChordsByOverlap(notes, true)).toStrictEqual(expected)
      })
    })
  })

  describe('getChordType', () => {
    test('no note', () => {
      expect(Chords.getChordType()).toStrictEqual({ name: 'No note' })
      expect(Chords.getChordType([])).toStrictEqual({ name: 'No note' })
    })

    test('single note', () => {
      expect(Chords.getChordType([Note.from({ pitch: 1 })])).toStrictEqual({ name: 'Single note' })
      expect(Chords.getChordType([Note.from({ pitch: 63 })])).toStrictEqual({ name: 'Single note' })
    })

    test('unknown', () => {
      const notes = [
        Note.from({ pitch: 0 }),
        Note.from({ pitch: 1 })
      ]
      expect(Chords.getChordType(notes)).toStrictEqual(
        { name: 'Unknown chord type' }
      )
    })

    test('octave', () => {
      const notes = [
        Note.from({ pitch: 12 }),
        Note.from({ pitch: 24 })
      ]
      expect(Chords.getChordType(notes)).toStrictEqual(
        { name: 'Octave' }
      )
    })

    test('power chord', () => {
      const notes = [
        Note.from({ pitch: 20 }),
        Note.from({ pitch: 27 })
      ]
      expect(Chords.getChordType(notes)).toStrictEqual(
        { steps: [7], name: 'Power chord', suffix: '5' }
      )
    })

    test('complex', () => {
      const notes = [
        Note.from({ pitch: 0 }),
        Note.from({ pitch: 4 }),
        Note.from({ pitch: 6 }),
        Note.from({ pitch: 7 }),
        Note.from({ pitch: 11 })
      ]
      expect(Chords.getChordType(notes)).toStrictEqual(
        { steps: [4, 6, 7, 11], name: 'Major seventh, sharp eleventh', suffix: 'Maj7#11' }
      )
    })

    test('power chord plus octave', () => {
      const notes = [
        Note.from({ pitch: 20 }),
        Note.from({ pitch: 27 }),
        Note.from({ pitch: 32 })
      ]
      expect(Chords.getChordType(notes)).toStrictEqual(
        { steps: [7], name: 'Power chord', suffix: '5' }
      )
    })
  })

  describe('getChordName', () => {
    test('CEG', () => {
      const notes = [
        Note.from({ pitch: 0 }),
        Note.from({ pitch: 4 }),
        Note.from({ pitch: 7 })
      ]
      expect(Chords.getChordName(notes)).toStrictEqual(
        ['CM', 'Em#5/C']
      )
    })

    // example from https://github.com/tonaljs/tonal/tree/master/packages/chord#chorddetectnotes-string--string
    // Chord.detect(["D", "F#", "A", "C"]); // => ["D7"]
    test('["D", "F#", "A", "C"]', () => {
      const notes = [
        Note.from({ pitch: 2 }),
        Note.from({ pitch: 6 }),
        Note.from({ pitch: 9 }),
        Note.from({ pitch: 12 })
      ]
      expect(Chords.getChordName(notes)).toStrictEqual(
        ['D7']
      )
    })

    // example from https://github.com/tonaljs/tonal/tree/master/packages/chord#chorddetectnotes-string--string
    // Chord.detect(["F#", "A", "C", "D"]); // => ["D7/F#"]
    test('["F#", "A", "C", "D"]', () => {
      const notes = [
        Note.from({ pitch: 6 }),
        Note.from({ pitch: 9 }),
        Note.from({ pitch: 12 }),
        Note.from({ pitch: 14 })
      ]
      expect(Chords.getChordName(notes)).toStrictEqual(
        ['D7/F#']
      )
    })

    test('["F#", "A", "C", "D"] wrong order', () => {
      const notes = [
        Note.from({ pitch: 14 }),
        Note.from({ pitch: 6 }),
        Note.from({ pitch: 12 }),
        Note.from({ pitch: 9 })
      ]
      expect(Chords.getChordName(notes)).toStrictEqual(
        ['D7/F#']
      )
    })
  })
})
