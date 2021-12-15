import { noteColorFromPitch } from './NoteColorUtils.js'

describe('NoteColorUtils', () => {
  describe('noteColorFromPitch', () => {
    test('default', () => {
      expect(noteColorFromPitch(0)).toBe('rgb(191, 64, 64)')
    })

    test('default', () => {
      expect(noteColorFromPitch(12, 'default')).toBe('rgb(191, 64, 64)')
    })

    test('accessible', () => {
      expect(noteColorFromPitch(12, 'accessible')).toBe('#6699ff')
    })

    test('gradient', () => {
      expect(noteColorFromPitch(0, 'gradient')).toBe('rgb(0, 0, 0)')
    })
  })
})
