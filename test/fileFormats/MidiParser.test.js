import { preprocessMidiFileData } from '../../src/fileFormats/MidiParser';
import fs from 'fs';
import path from 'path';
import midiParser from 'midi-parser-js';

function readMidiFile(fileName) {
    const file = path.join(__dirname, '..', '_test_assets', fileName);
    const binary = fs.readFileSync(file, 'base64');
    return midiParser.parse(binary);
}

describe('MidiFileParser', () => {

    test.skip('empty', () => {
        // expect(preprocessMidiFileData()).toStrictEqual([]);
        // expect(preprocessMidiFileData([])).toStrictEqual([]);
        expect(preprocessMidiFileData()).toBe(undefined);
        expect(preprocessMidiFileData({})).toBe(undefined);
    });

    // TODO: how to test minor?
    test('key signatures', () => {
        const midi = readMidiFile('[Test] Key Signatures 2.mid');
        const parsed = preprocessMidiFileData(midi);
        expect(parsed.parts[0].keySignatureChanges).toStrictEqual([
            {
                "key": "C",
                "scale": "major",
                "tick": 0,
                "time": 0,
            },
            {
                "key": "G",
                "scale": "major",
                "tick": 1920,
                "time": 2,
            },
            {
                "key": "D",
                "scale": "major",
                "tick": 3840,
                "time": 4,
            },
            {
                "key": "A",
                "scale": "major",
                "tick": 5760,
                "time": 6,
            },
            {
                "key": "E",
                "scale": "major",
                "tick": 7680,
                "time": 8,
            },
            {
                "key": "B",
                "scale": "major",
                "tick": 9600,
                "time": 10,
            },
            {
                "key": "F#",
                "scale": "major",
                "tick": 11520,
                "time": 12,
            },
            {
                "key": "C#",
                "scale": "major",
                "tick": 13440,
                "time": 14,
            },
            {
                "key": "C",
                "scale": "major",
                "tick": 15360,
                "time": 16,
            },
            {
                "key": "F",
                "scale": "major",
                "tick": 17280,
                "time": 18,
            },
            {
                "key": "Bb",
                "scale": "major",
                "tick": 19200,
                "time": 20,
            },
            {
                "key": "Eb",
                "scale": "major",
                "tick": 21120,
                "time": 22,
            },
            {
                "key": "Ab",
                "scale": "major",
                "tick": 23040,
                "time": 24,
            },
            {
                "key": "Db",
                "scale": "major",
                "tick": 24960,
                "time": 26,
            },
            {
                "key": "Gb",
                "scale": "major",
                "tick": 26880,
                "time": 28,
            },
            {
                "key": "Cb",
                "scale": "major",
                "tick": 28800,
                "time": 30,
            },
        ]);
    });


});
