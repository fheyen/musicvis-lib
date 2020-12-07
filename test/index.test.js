import * as lib from '../';

describe('index.js', () => {
    test('index.js imports', () => {
        expect(lib.Midi.isSharp).toBeDefined();
    });
});
