import { preprocessMidiFileData } from './MidiParser';
import fs from 'fs';
import path from 'path';
import midiParser from 'midi-parser-js';


function listMidiFiles() {
    const GT_DIR = path.join(__dirname, '..', '..', 'test', '_test_assets_private');
    return fs.readdirSync(GT_DIR)
        .filter(d => d.endsWith('.mid') || d.endsWith('.midi'));
}

function readMidiFile(fileName) {
    const file = path.join(__dirname, '..', '..', 'test', '_test_assets', fileName);
    const binary = fs.readFileSync(file, 'base64');
    return midiParser.parse(binary);
}

function readMidiFilePrivate(fileName) {
    const file = path.join(__dirname, '..', '..', 'test', '_test_assets_private', fileName);
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
        expect(parsed.keySignatureChanges).toStrictEqual([
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

    test('beat types', () => {
        const midi = readMidiFile('[Test] Beat type change.mid');
        const parsed = preprocessMidiFileData(midi);
        expect(parsed.beatTypeChanges).toStrictEqual([
            {
                "beatType": 4,
                "beats": 3,
                "tick": 0,
                "time": 0,
            },
            {
                "beatType": 4,
                "beats": 4,
                "tick": 2880,
                "time": 3,
            },
            {
                "beatType": 4,
                "beats": 3,
                "tick": 6720,
                "time": 7,
            },
            {
                "beatType": 4,
                "beats": 4,
                "tick": 9600,
                "time": 10,
            },
        ]);
    });

    test('tempos', () => {
        const midi = readMidiFile('[Test] Tempo change.mid');
        const parsed = preprocessMidiFileData(midi);
        expect(parsed.tempoChanges).toStrictEqual([
            {
                "tempo": 120,
                "tick": 0,
                "time": 0,
            },
            {
                "tempo": 160,
                "tick": 1920,
                "time": 2,
            },
            {
                "tempo": 200,
                "tick": 3840,
                "time": 3.5,
            },
            {
                "tempo": 240,
                "tick": 5760,
                "time": 4.7,
            },
        ]);
    });

    test('tempos 2', () => {
        const midi = readMidiFile('[Test] Tempo Change 2.mid');
        const parsed = preprocessMidiFileData(midi);
        expect(parsed.tempoChanges).toStrictEqual([
            {
                "tempo": 110,
                "tick": 0,
                "time": 0,
            },
            {
                "tempo": 120,
                "tick": 1920,
                "time": 2.18182,
            },
            {
                "tempo": 90,
                "tick": 3840,
                "time": 4.18182,
            },
            {
                "tempo": 80,
                "tick": 5760,
                "time": 6.84848,
            },
            {
                "tempo": 85,
                "tick": 7680,
                "time": 9.84848,
            },
            {
                "tempo": 120,
                "tick": 8640,
                "time": 11.26025,
            },
            {
                "tempo": 80,
                "tick": 9600,
                "time": 12.26025,
            },
            {
                "tempo": 120,
                "tick": 10560,
                "time": 13.76025,
            },
            {
                "tempo": 100,
                "tick": 11520,
                "time": 14.76025,
            },
            {
                "tempo": 80,
                "tick": 12000,
                "time": 15.36025,
            },
            {
                "tempo": 100,
                "tick": 12480,
                "time": 16.11025,
            },
            {
                "tempo": 80,
                "tick": 12960,
                "time": 16.71025,
            },
        ]);
    });

    // TODO: more tests
    test('measure times', () => {
        const midi = readMidiFile('[Test] Tempo Change.mid');
        const parsed = preprocessMidiFileData(midi);
        expect(parsed.measureLinePositions).toStrictEqual([
            2,
            3.5,
            4.7,
            5.7,
        ]);
    });

    // Worked
    describe.skip('Breaking MIDI files', () => {
        const files = listMidiFiles();

        test.each(files)('Exept no throw %s', (file) => {
            const midi = readMidiFilePrivate(file);
            expect(() => preprocessMidiFileData(midi)).not.toThrow();
        });

        test.skip.each(files)('to have tracks %s', (file) => {
            const midi = readMidiFilePrivate(file);
            expect(preprocessMidiFileData(midi)).toStrictEqual();
        });
    });
});
