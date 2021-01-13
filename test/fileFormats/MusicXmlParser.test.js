import { preprocessMusicXmlData } from '../../src/fileFormats/MusicXmlParser';
import fs from 'fs';
import path from 'path';

const parser = new DOMParser();

function readXmlFile(fileName) {
    const file = path.join(__dirname, '..', '_test_assets', fileName);
    const text = fs.readFileSync(file, 'utf8');
    return parser.parseFromString(text, 'text/xml');
}

describe('MusicXmlParser', () => {

    test('empty', () => {
        expect(() => preprocessMusicXmlData()).toThrowError(TypeError);
    });

    test('key signatures', () => {
        const file = readXmlFile('[Test] Key Signatures 2.musicxml');
        const parsed = preprocessMusicXmlData(file);
        expect(parsed.parts[0].keySignatureChanges).toStrictEqual([
            {
                "key": "C",
                "scale": "major",
                "time": 0,
            },
            {
                "key": "G",
                "scale": "major",
                "time": 2,
            },
            {
                "key": "D",
                "scale": "major",
                "time": 4,
            },
            {
                "key": "A",
                "scale": "major",
                "time": 6,
            },
            {
                "key": "E",
                "scale": "major",
                "time": 8,
            },
            {
                "key": "B",
                "scale": "major",
                "time": 10,
            },
            {
                "key": "F#",
                "scale": "major",
                "time": 12,
            },
            {
                "key": "C#",
                "scale": "major",
                "time": 14,
            },
            {
                "key": "C",
                "scale": "major",
                "time": 16,
            },
            {
                "key": "F",
                "scale": "major",
                "time": 18,
            },
            {
                "key": "Bb",
                "scale": "major",
                "time": 20,
            },
            {
                "key": "Eb",
                "scale": "major",
                "time": 22,
            },
            {
                "key": "Ab",
                "scale": "major",
                "time": 24,
            },
            {
                "key": "Db",
                "scale": "major",
                "time": 26,
            },
            {
                "key": "Gb",
                "scale": "major",
                "time": 28,
            },
            {
                "key": "Cb",
                "scale": "major",
                "time": 30,
            },
        ]);
    });

});
