import { averageColor, getColorLightness } from './ColorUtils.js'

describe('ColorUtils', () => {
  describe('getColorLightness', () => {
    test('gray scale', () => {
      expect(getColorLightness('white')).toBe(100)
      expect(getColorLightness('black')).toBe(0)
      expect(Math.round(getColorLightness('rgb(128, 128, 128)'))).toBe(50)
    })
  })

  describe('averageColor', () => {
    test('gray scale', () => {
      expect(averageColor(['white', 'black'])).toBe('rgb(128, 128, 128)')
    })
  })
})
