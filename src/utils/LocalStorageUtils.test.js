import { storeObjectInLocalStorage, getObjectFromLocalStorage } from './LocalStorageUtils';
// import { spyOn } from 'jest';

// beforeEach(() => {});

afterEach(() => {
    localStorage.removeItem('__test_storage__');
});

test('storing Object works', () => {
    const toStore = {
        a: 1,
        b: {
            c: 2,
            d: true,
            f: 'test'
        }
    };
    storeObjectInLocalStorage('__test_storage__', toStore);
    const retrieved = getObjectFromLocalStorage('__test_storage__');
    expect(retrieved).toStrictEqual(toStore);
});

test('storing Array works', () => {
    const toStore = [1, 2, 3, '4'];
    storeObjectInLocalStorage('__test_storage__', toStore);
    const retrieved = getObjectFromLocalStorage('__test_storage__');
    expect(retrieved).toStrictEqual(toStore);
});

test('storing Map does not work', () => {
    const toStore = new Map([
        [1, 2],
        [3, 4],
    ]);
    storeObjectInLocalStorage('__test_storage__', toStore);
    const retrieved = getObjectFromLocalStorage('__test_storage__');
    expect(retrieved).toStrictEqual({});
});

test('storing string', () => {
    const toStore = 'test';
    storeObjectInLocalStorage('__test_storage__', toStore);
    const retrieved = getObjectFromLocalStorage('__test_storage__');
    expect(retrieved).toBe(toStore);
});

test('storing number', () => {
    const toStore = 42.0;
    storeObjectInLocalStorage('__test_storage__', toStore);
    const retrieved = getObjectFromLocalStorage('__test_storage__');
    expect(retrieved).toBe(toStore);
});

test('storing invalid JSON', () => {
    const key = '__test_storage__';
    // const consoleSpy = spyOn(console, 'warn');
    const toStore = 'invalid # json';
    localStorage.setItem(key, toStore);
    const retrieved = getObjectFromLocalStorage(key);
    expect(retrieved).toBe(null);
    // expect(consoleSpy).toHaveBeenCalledWith(`LocalStorage has no key ${key}`);
});

test('retrieving non-existent key', () => {
    const retrieved = getObjectFromLocalStorage('__test_storage_non-existent__');
    expect(retrieved).toBe(null);
});
