/**
 * Calculates all n-grams with a specified length
 *
 * @param {string} string a string
 * @param {number} length length (n) of n-grams
 * @returns {Map<string,number>} maps n-gram to its number of occurences
 */
export function getNGrams (string, length) {
  if (length <= 0) {
    return new Map()
  }
  length = Math.min(length, string.length)
  const nGrams = new Map()
  for (let index = 0; index < string.length - length + 1; index++) {
    const subString = string.slice(index, index + length)
    if (nGrams.has(subString)) {
      nGrams.set(subString, nGrams.get(subString) + 1)
    } else {
      nGrams.set(subString, 1)
    }
  }
  return nGrams
}

/**
 * Calculates all n-grams with a specified length
 *
 * @param {Array} array an array of primitive data types
 * @param {number} length length (n) of n-grams
 * @returns {Map<string,object>} maps n-gram, joined with ' ', to its number of
 * occurences and value
 */
export function getNGramsForArray (array, length) {
  if (length <= 0) {
    return new Map()
  }
  length = Math.min(length, array.length)
  const nGrams = new Map()
  for (let index = 0; index < array.length - length + 1; index++) {
    const subArray = array.slice(index, index + length)
    const key = subArray.join(' ')
    let count = 1
    if (nGrams.has(key)) {
      count = nGrams.get(key).count + 1
    }
    nGrams.set(key, {
      value: subArray,
      count
    })
  }
  return nGrams
}
