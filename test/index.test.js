import * as lib from '../';

describe.skip('index.js', () => {
    test('index.js imports', () => {
        expect(lib.Midi.isSharp).toBeDefined();
    });
});
