import { alignGtAndRecToMinimizeDiffError, agreement, alignRecordingToBestFit } from './DiffAlignment.js'
import Note from '../types/Note.js'
import NoteArray from '../types/NoteArray.js'
import Recording from '../types/Recording.js'
import { getAllNotesFromMidi } from '../../test/testTools/readTestAssetFiles.js'
import path from 'path'

describe('DiffAlignment', () => {
  const gt = [
    Note.from({ pitch: 1, start: 0, end: 1 }),
    Note.from({ pitch: 2, start: 1, end: 2 }),
    Note.from({ pitch: 3, start: 2, end: 3 }),
    Note.from({ pitch: 4, start: 4, end: 5 })
  ]
  const rec = [
    Note.from({ pitch: 1, start: 0, end: 1 }),
    Note.from({ pitch: 2, start: 1, end: 2 })
  ]
  describe('alignment', () => {
    test('Same', () => {
      expect(
        alignGtAndRecToMinimizeDiffError(gt, gt, 100)[0].offsetMilliseconds
      ).toBe(0)
    })

    test('Already aligned', () => {
      expect(
        alignGtAndRecToMinimizeDiffError(gt, rec, 100)[0].offsetMilliseconds
      ).toBe(0)
    })

    test('Shifted by 1 second', () => {
      const shifted = new NoteArray(rec).shiftTime(1).getNotes()
      expect(
        alignGtAndRecToMinimizeDiffError(gt, shifted, 100)[0].offsetMilliseconds
      ).toBe(0)
    })

    test('One note added before', () => {
      const gt = [
        Note.from({ pitch: 0, start: 0, end: 1 }),
        Note.from({ pitch: 1, start: 1, end: 2 }),
        Note.from({ pitch: 2, start: 2, end: 3 }),
        Note.from({ pitch: 3, start: 4, end: 5 })
      ]
      expect(
        alignGtAndRecToMinimizeDiffError(gt, rec, 100)[0].offsetMilliseconds
      ).toBe(1000)
    })

    describe('Multiple matches', () => {
      test('2 times in Gt', () => {
        const gt = [
          Note.from({ pitch: 1, start: 0, end: 1 }),
          Note.from({ pitch: 2, start: 1, end: 2 }),
          Note.from({ pitch: 3, start: 2, end: 3 }),
          Note.from({ pitch: 4, start: 4, end: 5 }),
          // Here it repeats
          Note.from({ pitch: 1, start: 5, end: 6 }),
          Note.from({ pitch: 2, start: 6, end: 7 }),
          Note.from({ pitch: 3, start: 7, end: 8 })
        ]
        const rec = [
          Note.from({ pitch: 1, start: 0, end: 1 }),
          Note.from({ pitch: 2, start: 1, end: 2 })
        ]
        expect(
          alignGtAndRecToMinimizeDiffError(gt, rec, 100).slice(0, 2)
        ).toStrictEqual([
          {
            agreement: 22,
            offsetBins: 0,
            offsetMilliseconds: 0
          },
          {
            agreement: 22,
            offsetBins: 50,
            offsetMilliseconds: 5000
          }
        ])
      })

      test('GT repeated 3 times', () => {
        const gtRepeated = new NoteArray(gt).repeat(3).getNotes()
        // console.log(gtRepeated);
        expect(
          alignGtAndRecToMinimizeDiffError(gtRepeated, rec, 100).slice(0, 3)
        ).toStrictEqual([
          {
            agreement: 22,
            offsetBins: 0,
            offsetMilliseconds: 0
          },
          {
            agreement: 22,
            offsetBins: 50,
            offsetMilliseconds: 5000
          },
          {
            agreement: 22,
            offsetBins: 100,
            offsetMilliseconds: 10000
          }
        ])
      })

      test('GT == rec repeated 3 times', () => {
        const gtRepeated = new NoteArray(rec).repeat(3).getNotes()
        // console.log(gtRepeated);
        expect(
          alignGtAndRecToMinimizeDiffError(gtRepeated, rec, 100).slice(0, 3)
        ).toStrictEqual([
          {
            agreement: 22,
            offsetBins: 0,
            offsetMilliseconds: 0
          },
          {
            agreement: 22,
            offsetBins: 20,
            offsetMilliseconds: 2000
          },
          {
            agreement: 22,
            offsetBins: 40,
            offsetMilliseconds: 4000
          }
        ])
      })
    })

    // Seems to work
    test.skip('Real songs', () => {
      const GT_DIR_PRIVATE = path.join(__dirname, '..', '..', 'test', '_test_assets_private')
      const gt = getAllNotesFromMidi('[Drums] A-ha - Take On Me1', GT_DIR_PRIVATE)
      const rec = gt.slice(0, 4)
      expect(
        alignGtAndRecToMinimizeDiffError(gt, rec, 100)
      ).toStrictEqual([
        0
      ])
    })
  })

  describe('automatic alignment', () => {
    test('already aligned', () => {
      const rec = new Recording('test', new Date(), gt)
      expect(
        alignRecordingToBestFit(gt, rec, 100).getNotes()
      ).toStrictEqual(gt)
    })

    test('needs alignment', () => {
      const gt = [
        Note.from({ pitch: 0, start: 0, end: 1 }),
        Note.from({ pitch: 1, start: 1, end: 2 }),
        Note.from({ pitch: 2, start: 2, end: 3 }),
        Note.from({ pitch: 3, start: 4, end: 5 })
      ]
      const recNotes = [
        Note.from({ pitch: 1, start: 0, end: 1 }),
        Note.from({ pitch: 2, start: 1, end: 2 })
      ]
      const rec = new Recording('test', new Date(), recNotes)
      expect(
        alignRecordingToBestFit(gt, rec, 100).getNotes()
      ).toStrictEqual([
        Note.from({ pitch: 1, start: 1, end: 2 }),
        Note.from({ pitch: 2, start: 2, end: 3 })
      ])
    })
  })
})

describe('agreement', () => {
  const gtActivations = new Map([
    [1, [0, 0, 1, 1, 1, 0, 0, 1, 1, 1]],
    [2, [0, 1, 1, 1, 0, 0, 1, 1, 1, 0]]
  ])
  const recActivations = new Map([
    [1, [0, 0, 1, 1, 1]],
    [2, [0, 1, 1, 1, 0]]
  ])

  test('no offset', () => {
    expect(agreement(gtActivations, recActivations, 0)).toBe(6)
  })

  test('offset 2', () => {
    expect(agreement(gtActivations, recActivations, 2)).toBe(2)
  })

  test('offset to match second occurence', () => {
    expect(agreement(gtActivations, recActivations, 5)).toBe(6)
  })
})
