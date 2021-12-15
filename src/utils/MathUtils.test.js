import { randFloat, clipValue, roundToNDecimals, choose, swapSoSmallerFirst, countOnesOfBinary, findLocalMaxima } from './MathUtils.js'

describe('MathUtils', () => {
  describe('randFloat', () => {
    test('default values', () => {
      const v = randFloat()
      expect(v).toBeLessThan(1)
      expect(v).toBeGreaterThanOrEqual(0)
    })

    test('normal case', () => {
      const v = randFloat(1, 10)
      expect(v).toBeLessThan(10)
      expect(v).toBeGreaterThanOrEqual(1)
    })

    test('negative', () => {
      const v = randFloat(-20, -10)
      expect(v).toBeLessThan(-10)
      expect(v).toBeGreaterThanOrEqual(-20)
    })

    test('negative and postive', () => {
      const v = randFloat(-10, 10)
      expect(v).toBeLessThan(10)
      expect(v).toBeGreaterThanOrEqual(-10)
    })
  })

  describe('choose', () => {
    test('single entry', () => {
      expect(choose([1])).toBe(1)
    })

    test('two entries', () => {
      expect([1, 2]).toContain(choose([1, 2]))
    })

    test('four entries', () => {
      expect([1, 2, 3, 4]).toContain(choose([1, 2, 3, 4]))
    })
  })

  describe('clip value', () => {
    test('does clip to min', () => {
      expect(clipValue(1, 2, 3)).toBe(2)
    })

    test('does clip to max', () => {
      expect(clipValue(4, 2, 3)).toBe(3)
    })

    test('negative, does clip to max', () => {
      expect(clipValue(-1, -3, -2)).toBe(-2)
    })

    test('does not clip if unnecessary', () => {
      expect(clipValue(2, 1, 3)).toBe(2)
    })

    test('negative, does not clip if unnecessary', () => {
      expect(clipValue(-2, -3, -1)).toBe(-2)
    })
  })

  describe('roundToNDecimals', () => {
    test('positive', () => {
      expect(roundToNDecimals(0.001, 2)).toBe(0)
      expect(roundToNDecimals(0.011, 2)).toBe(0.01)
      expect(roundToNDecimals(0.015, 2)).toBe(0.01)
      expect(roundToNDecimals(0.0155, 2)).toBe(0.02)
    })
    test('negative', () => {
      expect(roundToNDecimals(-0.001, 2)).toBe(-0)
      expect(roundToNDecimals(-0.011, 2)).toBe(-0.01)
      expect(roundToNDecimals(-0.015, 2)).toBe(-0.01)
      expect(roundToNDecimals(-0.0155, 2)).toBe(-0.02)
    })
  })

  describe('swapSoSmallerFirst', () => {
    test('same', () => {
      expect(swapSoSmallerFirst(1, 1)).toStrictEqual([1, 1])
    })

    test('correct', () => {
      expect(swapSoSmallerFirst(1, 2)).toStrictEqual([1, 2])
    })

    test('incorrect', () => {
      expect(swapSoSmallerFirst(2, 1)).toStrictEqual([1, 2])
    })
  })

  describe('countOnesOfBinary', () => {
    test.each([
      ['00000000', 0],
      ['01001011', 4],
      ['11001011', 5]
    ])('some cases from strings %s', (binaryString, result) => {
      const binary = parseInt(binaryString, 2)
      expect(countOnesOfBinary(binary)).toBe(result)
    })

    test.each([
      [0, 0],
      [4 + 8 + 32, 3],
      [1 + 4 + 16 + 32, 4]
    ])('some cases from sums %s', (binary, result) => {
      expect(countOnesOfBinary(binary)).toBe(result)
    })
  })

  describe('findLocalMaxima', () => {
    test('empty', () => {
      expect(findLocalMaxima([])).toStrictEqual([])
    })

    test('one value', () => {
      expect(findLocalMaxima([1])).toStrictEqual([])
    })

    test('two values', () => {
      expect(findLocalMaxima([1, 2])).toStrictEqual([1])
    })

    test('two values 2', () => {
      expect(findLocalMaxima([2, 1])).toStrictEqual([0])
    })

    test('two equal values', () => {
      expect(findLocalMaxima([1, 1])).toStrictEqual([])
    })

    test('three equal values', () => {
      expect(findLocalMaxima([1, 1, 1])).toStrictEqual([])
    })

    test('start', () => {
      expect(findLocalMaxima([2, 1, 1])).toStrictEqual([0])
    })

    test('middle', () => {
      expect(findLocalMaxima([1, 2, 1])).toStrictEqual([1])
    })

    test('end', () => {
      expect(findLocalMaxima([1, 1, 2])).toStrictEqual([2])
    })

    test('plateau', () => {
      expect(findLocalMaxima([1, 1, 2, 2, 1])).toStrictEqual([])
    })

    test('example', () => {
      expect(findLocalMaxima([0, 1, 2, 3, 2, 3, 1, 2])).toStrictEqual([3, 5, 7])
    })
  })
})
