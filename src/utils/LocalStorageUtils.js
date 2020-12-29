/**
 * @module utils/LocalStorageUtils
 */

/**
 * Stringifies an object and stores it in the localStorage
 *
 * @param {string} key key
 * @param {object} obj JSON compatible object
 */
export function storeObjectInLocalStorage(key, obj) {
    const str = JSON.stringify(obj);
    localStorage.setItem(key, str);
}

/**
 * Retrieves a stringified object from the localStorage and parses it.
 *
 * @param {string} key key
 * @returns {object|null} object or null of not possible
 */
export function getObjectFromLocalStorage(key) {
    const str = localStorage.getItem(key);
    if (str === null) {
        // console.warn(`LocalStorage has no key ${key}`);
        return null;
    }
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}
