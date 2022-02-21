const libDev = require('../dist/musicvislib.node.js')
// const libProd = require('../dist/musicvislib.min.js')

describe('Node import test with require', () => {
  describe('development build', () => {
    test('version', () => {
      expect(libDev.getVersion).toBeDefined()
      expect(typeof libDev.getVersion()).toBe('string')
    })
    test('levenshtein', () => {
      const result = libDev.StringBased.Levenshtein.levenshtein('abcd', 'abCd')
      expect(result).toBe(1)
    })
    test('arrayShallowEquals', () => {
      const result = libDev.Utils.arrayShallowEquals([1, 2, 3], [1, 2, 3])
      expect(result).toBe(true)
    })
  })

  // describe('production build', () => {
  //   test('version', () => {
  //     expect(libProd.getVersion).toBeDefined()
  //     expect(typeof libProd.getVersion()).toBe('string')
  //   })
  //   test('levenshtein', () => {
  //     const result = libProd.StringBased.Levenshtein.levenshtein('abcd', 'abCd')
  //     expect(result).toBe(1)
  //   })
  //   test('arrayShallowEquals', () => {
  //     const result = libProd.Utils.arrayShallowEquals([1, 2, 3], [1, 2, 3])
  //     expect(result).toBe(true)
  //   })
  // })
})
