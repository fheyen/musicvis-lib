import { getVersion as vDev, StringBased as StringBasedDev } from '../dist/musicvislib.js'
import { getVersion as vProd, StringBased as StringBasedProd } from '../dist/musicvislib.min.js'

describe('Node import test with require', () => {
  describe('development build', () => {
    test('version', () => {
      expect(vDev).toBeDefined()
    })
    test('levenshtein', () => {
      const result = StringBasedDev.Levenshtein.levenshtein('abcd', 'abCd')
      expect(result).toBe(1)
    })
  })

  describe('production build', () => {
    test('version', () => {
      expect(vProd).toBeDefined()
    })
    test('levenshtein', () => {
      const result = StringBasedProd.Levenshtein.levenshtein('abcd', 'abCd')
      expect(result).toBe(1)
    })
  })
})
