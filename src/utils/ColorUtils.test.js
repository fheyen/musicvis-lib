import * as cu from './ColorUtils.js'

describe('ColorUtils', () => {
  describe('getColorLightness', () => {
    test('gray scale', () => {
      expect(cu.getColorLightness('white')).toBe(100)
      expect(cu.getColorLightness('black')).toBe(0)
      expect(Math.round(cu.getColorLightness('rgb(128, 128, 128)'))).toBe(50)
    })
  })

  describe('averageColor', () => {
    test('gray scale', () => {
      expect(cu.averageColor(['white', 'black'])).toBe('rgb(128, 128, 128)')
    })
  })

  describe('setOpacity', () => {
    test('default', () => {
      expect(cu.setOpacity('black')).toBe(cu.setOpacity('black', 1))
    })
    test('rgb', () => {
      expect(cu.setOpacity('rgb(0, 0, 0)', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
      expect(cu.setOpacity('rgb(0, 0, 0)', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
      expect(cu.setOpacity('rgb(0, 0, 0)', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
      expect(cu.setOpacity('rgb(0, 0, 0)', 1)).toBe('rgba(0, 0, 0, 1)')
      expect(cu.setOpacity('rgb(0, 0, 0)', 0)).toBe('rgba(0, 0, 0, 0)')
      expect(cu.setOpacity('rgb(123, 4, 56)', 0.5)).toBe('rgba(123, 4, 56, 0.5)')
      expect(cu.setOpacity('rgb(123, 4, 56)', 0.5)).toBe('rgba(123, 4, 56, 0.5)')
      expect(cu.setOpacity('rgb(123, 4, 56)', 0.5)).toBe('rgba(123, 4, 56, 0.5)')
      expect(cu.setOpacity('rgb(123, 4, 56)', 1)).toBe('rgba(123, 4, 56, 1)')
      expect(cu.setOpacity('rgb(123, 4, 56)', 0)).toBe('rgba(123, 4, 56, 0)')
    })
    // test('rgba', () => {
    //   expect(cu.setOpacity('rgba(0, 0, 0, 0)', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
    //   expect(cu.setOpacity('rgba(0, 0, 0, 0.5)', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
    //   expect(cu.setOpacity('rgba(0, 0, 0, 1)', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
    //   expect(cu.setOpacity('rgba(0, 0, 0, 1)', 1)).toBe('rgba(0, 0, 0, 1)');
    //   expect(cu.setOpacity('rgba(0, 0, 0, 1)', 0)).toBe('rgba(0, 0, 0, 0)');
    // });
    test('name', () => {
      expect(cu.setOpacity('black', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
      expect(cu.setOpacity('black', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
      expect(cu.setOpacity('black', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
      expect(cu.setOpacity('black', 1)).toBe('rgba(0, 0, 0, 1)')
      expect(cu.setOpacity('black', 0)).toBe('rgba(0, 0, 0, 0)')
    })
  })
})
