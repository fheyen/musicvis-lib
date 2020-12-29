import { preprocessMusicXmlData } from '../../src/fileFormats/MusicXmlParser';

describe('MusicXmlParser', () => {

    test('empty', () => {
        expect(() => preprocessMusicXmlData()).toThrowError(TypeError);
    });

});
