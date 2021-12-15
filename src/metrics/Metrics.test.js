import * as Metrics from './Metrics'
import GuitarNote from '../types/GuitarNote'

describe('Metrics', () => {
  const notes = [
    GuitarNote.from({ start: 0.0, end: 1.0, string: 1, fret: 0, pitch: 'C4', velocity: 100 }),
    GuitarNote.from({ start: 0.5, end: 1.5, string: 2, fret: 0, pitch: 'C4', velocity: 100 }),
    GuitarNote.from({ start: 1.0, end: 2.0, string: 3, fret: 0, pitch: 'D4', velocity: 200 }),
    GuitarNote.from({ start: 1.5, end: 2.5, string: 5, fret: 2, pitch: 'E4', velocity: 300 }),
    GuitarNote.from({ start: 1.5, end: 2.5, string: 4, fret: 2, pitch: 'F4', velocity: 300 })
  ]

  const count = notes.length
  const duration = notes[count - 1].end

  test('notesCount', () => {
    expect(Metrics.notesCount(notes)).toBe(count)
  })

  test('duration', () => {
    expect(Metrics.duration(notes)).toBe(duration)
  })

  test('notesPerSecond', () => {
    expect(Metrics.notesPerSecond(notes)).toBe(count / duration)
  })

  test.skip('notesPerBeat', () => {
    expect(Metrics.notesPerBeat(notes, 120)).toBe()
  })

  test('ratioNotesInSet', () => {
    const abc = new Set([...'ABC'])
    expect(Metrics.ratioNotesInSet(notes, abc)).toBe(2 / 5)
  })

  test.skip('differentNotesUsed', () => {
    expect(Metrics.differentNotesUsed(notes, 'pitch')).toBe(4)
    expect(Metrics.differentNotesUsed(notes, 'chroma')).toBe(4)
    expect(Metrics.differentNotesUsed(notes, 'fretboardPos')).toBe(5)
  })
})
