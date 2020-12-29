import { preprocessMidiFileData } from '../../src/fileFormats/MidiParser';

describe('MidiFileParser', () => {

    test.skip('empty', () => {
        // expect(preprocessMidiFileData()).toStrictEqual([]);
        // expect(preprocessMidiFileData([])).toStrictEqual([]);
        expect(preprocessMidiFileData()).toBe(undefined);
        expect(preprocessMidiFileData({})).toBe(undefined);
    });

});
