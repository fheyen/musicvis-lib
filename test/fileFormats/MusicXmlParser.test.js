import { preprocessMusicXmlData } from '../../src/fileFormats/MusicXmlParser';
import fs from 'fs';
import path from 'path';
import Note from '../../src/types/Note';

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

    test('beat types', () => {
        const midi = readXmlFile('[Test] Beat type change.musicxml');
        const parsed = preprocessMusicXmlData(midi);
        expect(parsed.parts[0].beatTypeChanges).toStrictEqual([
            {
                "beatType": 4,
                "beats": 3,
                "time": 0,
            },
            {
                "beatType": 4,
                "beats": 4,
                "time": 3,
            },
            {
                "beatType": 4,
                "beats": 3,
                "time": 7,
            },
            {
                "beatType": 4,
                "beats": 4,
                "time": 10,
            },
        ]);
    });

    test('tempos', () => {
        const midi = readXmlFile('[Test] Tempo change.musicxml');
        const parsed = preprocessMusicXmlData(midi);
        expect(parsed.parts[0].tempoChanges).toStrictEqual([
            {
                "tempo": 120,
                "time": 0,
            },
            {
                "tempo": 160,
                "time": 2,
            },
            {
                "tempo": 200,
                "time": 3.5,
            },
            {
                "tempo": 240,
                "time": 4.7,
            },
        ]);
    });

    // TODO: more tests
    test('measure times', () => {
        const midi = readXmlFile('[Test] Tempo change.musicxml');
        const parsed = preprocessMusicXmlData(midi);
        expect(parsed.parts[0].measureLinePositions).toStrictEqual([
            2,
            3.5,
            4.7,
            5.7,
        ]);
    });

    // TODO: multiple tempos whithin a measure do not work
    // TODO: tempos that are not at the start of measures do not work
    test.skip('tempos 2', () => {
        // test('tempos 2', () => {
        const midi = readXmlFile('[Test] Tempo Change 2.musicxml');
        const parsed = preprocessMusicXmlData(midi);
        expect(parsed.parts[0].tempoChanges).toStrictEqual([
            {
                "tempo": 110,
                "time": 0,
            },
            {
                "tempo": 120,
                "time": 2.181818181818,
            },
            {
                "tempo": 90,
                "time": 4.181818181818,
            },
            {
                "tempo": 80,
                "time": 6.848484848485,
            },
            {
                "tempo": 85,
                "time": 9.848484848485,
            },
            {
                "tempo": 120,
                "time": 11.260249554367,
            },
            {
                "tempo": 80,
                "time": 12.260249554367,
            },
            {
                "tempo": 120,
                "time": 13.760249554367,
            },
            {
                "tempo": 100,
                "time": 14.760249554367,
            },
            {
                "tempo": 80,
                "time": 15.360249554367,
            },
            {
                "tempo": 100,
                "time": 16.110249554367,
            },
            {
                "tempo": 80,
                "time": 16.710249554367,
            },
        ]);
    });


    test('Drum data', () => {
        const midi = readXmlFile('[Test] Simple Drum Pattern 1 120 bpm.musicxml');
        const parsed = preprocessMusicXmlData(midi);
        expect(parsed.parts[0].noteObjs).toStrictEqual([
            {
                "channel": 0,
                "end": 0.5,
                "name": "G2",
                "pitch": 43,
                "start": 0,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 0.5,
                "name": "C2",
                "pitch": 36,
                "start": 0,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 1,
                "name": "G2",
                "pitch": 43,
                "start": 0.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 1.5,
                "name": "G2",
                "pitch": 43,
                "start": 1,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 1.5,
                "name": "D#2",
                "pitch": 39,
                "start": 1,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 2,
                "name": "G2",
                "pitch": 43,
                "start": 1.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 2.5,
                "name": "G2",
                "pitch": 43,
                "start": 2,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 2.5,
                "name": "C2",
                "pitch": 36,
                "start": 2,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 3,
                "name": "G2",
                "pitch": 43,
                "start": 2.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 3,
                "name": "C2",
                "pitch": 36,
                "start": 2.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 3.5,
                "name": "G2",
                "pitch": 43,
                "start": 3,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 3.5,
                "name": "D#2",
                "pitch": 39,
                "start": 3,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 4,
                "name": "G2",
                "pitch": 43,
                "start": 3.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 4.5,
                "name": "G2",
                "pitch": 43,
                "start": 4,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 4.5,
                "name": "C2",
                "pitch": 36,
                "start": 4,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 5,
                "name": "G2",
                "pitch": 43,
                "start": 4.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 5.5,
                "name": "G2",
                "pitch": 43,
                "start": 5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 5.5,
                "name": "D#2",
                "pitch": 39,
                "start": 5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 6,
                "name": "G2",
                "pitch": 43,
                "start": 5.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 6.5,
                "name": "G2",
                "pitch": 43,
                "start": 6,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 6.5,
                "name": "C2",
                "pitch": 36,
                "start": 6,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 7,
                "name": "G2",
                "pitch": 43,
                "start": 6.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 7,
                "name": "C2",
                "pitch": 36,
                "start": 6.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 7.5,
                "name": "G2",
                "pitch": 43,
                "start": 7,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 7.5,
                "name": "D#2",
                "pitch": 39,
                "start": 7,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 8,
                "name": "G2",
                "pitch": 43,
                "start": 7.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 8.5,
                "name": "G2",
                "pitch": 43,
                "start": 8,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 8.5,
                "name": "C2",
                "pitch": 36,
                "start": 8,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 9,
                "name": "G2",
                "pitch": 43,
                "start": 8.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 9.5,
                "name": "G2",
                "pitch": 43,
                "start": 9,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 9.5,
                "name": "D#2",
                "pitch": 39,
                "start": 9,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 10,
                "name": "G2",
                "pitch": 43,
                "start": 9.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 10.5,
                "name": "G2",
                "pitch": 43,
                "start": 10,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 10.5,
                "name": "C2",
                "pitch": 36,
                "start": 10,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 11,
                "name": "G2",
                "pitch": 43,
                "start": 10.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 11,
                "name": "C2",
                "pitch": 36,
                "start": 10.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 11.5,
                "name": "G2",
                "pitch": 43,
                "start": 11,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 11.5,
                "name": "D#2",
                "pitch": 39,
                "start": 11,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 12,
                "name": "G2",
                "pitch": 43,
                "start": 11.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 12.5,
                "name": "G2",
                "pitch": 43,
                "start": 12,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 12.5,
                "name": "C2",
                "pitch": 36,
                "start": 12,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 13,
                "name": "G2",
                "pitch": 43,
                "start": 12.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 13.5,
                "name": "G2",
                "pitch": 43,
                "start": 13,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 13.5,
                "name": "D#2",
                "pitch": 39,
                "start": 13,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 14,
                "name": "G2",
                "pitch": 43,
                "start": 13.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 14.5,
                "name": "G2",
                "pitch": 43,
                "start": 14,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 14.5,
                "name": "C2",
                "pitch": 36,
                "start": 14,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 15,
                "name": "G2",
                "pitch": 43,
                "start": 14.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 15,
                "name": "C2",
                "pitch": 36,
                "start": 14.5,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 15.5,
                "name": "G2",
                "pitch": 43,
                "start": 15,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 15.5,
                "name": "D#2",
                "pitch": 39,
                "start": 15,
                "velocity": 127,
            },
            {
                "channel": 0,
                "end": 16,
                "name": "G2",
                "pitch": 43,
                "start": 15.5,
                "velocity": 127,
            },
        ].map(d => Note.from(d)));
    });

});
