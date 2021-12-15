/**
 * @module utils/LocalStorageUtils
 */

/**
 * Stringifies an object and stores it in the localStorage
 *
 * @param {string} key key
 * @param {object} object JSON compatible object
 */
export function storeObjectInLocalStorage (key, object) {
  const string = JSON.stringify(object)
  localStorage.setItem(key, string)
}

/**
 * Retrieves a stringified object from the localStorage and parses it.
 *
 * @param {string} key key
 * @returns {object|null} object or null of not possible
 */
export function getObjectFromLocalStorage (key) {
  const string = localStorage.getItem(key)
  if (string === null) {
    // console.warn(`LocalStorage has no key ${key}`);
    return null
  }
  try {
    return JSON.parse(string)
  } catch {
    return null
  }
}
