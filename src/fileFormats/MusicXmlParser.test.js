import { preprocessMusicXmlData } from './MusicXmlParser';
import fs from 'fs';
import path from 'path';
import Note from '../types/Note';

const parser = new DOMParser();

function readXmlFile(fileName) {
    const file = path.join(__dirname, '..', '..', 'test', '_test_assets', fileName);
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
        const xml = readXmlFile('[Test] Beat type change.musicxml');
        const parsed = preprocessMusicXmlData(xml);
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

    test('tempo change', () => {
        const xml = readXmlFile('[Test] Tempo change.musicxml');
        const parsed = preprocessMusicXmlData(xml);
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

    describe('measure positions', () => {
        const xml = readXmlFile('[Test] Tempo change.musicxml');
        const parsed = preprocessMusicXmlData(xml);

        // TODO: more tests
        test('measure times', () => {
            expect(parsed.parts[0].measureLinePositions).toStrictEqual([
                2,
                3.5,
                4.7,
                5.7,
            ]);
        });

        test('measure indices', () => {
            expect(parsed.parts[0].measureIndices).toStrictEqual([
                4,
                8,
                12,
                16,
            ]);
        });
    });

    // TODO: multiple tempos whithin a measure do not work
    // TODO: tempos that are not at the start of measures do not work
    test.skip('tempos 2', () => {
        // test('tempos 2', () => {
        const xml = readXmlFile('[Test] Tempo Change 2.musicxml');
        const parsed = preprocessMusicXmlData(xml);
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

    describe('tunings', () => {
        test.each([
            ['[Test] Guitar Tuning E-Std.musicxml', [40, 45, 50, 55, 59, 64]],
            ['[Test] Guitar Tuning D-Std.musicxml', [38, 43, 48, 53, 57, 62]],
            ['[Test] Guitar Tuning DropD.musicxml', [38, 45, 50, 55, 59, 64]],
        ])('tuning %s', (file, tuning) => {
            const xml = readXmlFile(file);
            const parsed = preprocessMusicXmlData(xml);
            expect(parsed.parts[0].tuning).toStrictEqual(tuning);
        });
    });


    test('Drum data', () => {
        const xml = readXmlFile('[Test] Simple Drum Pattern 1 120 bpm.musicxml');
        const parsed = preprocessMusicXmlData(xml);
        expect(parsed.parts[0].noteObjs).toStrictEqual([
            {
                "channel": 0,
                "end": 0.5,
                "name": "G2",
                "pitch": 43,
                "start": 0,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 0.5,
                "name": "C2",
                "pitch": 36,
                "start": 0,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 1,
                "name": "G2",
                "pitch": 43,
                "start": 0.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 1.5,
                "name": "G2",
                "pitch": 43,
                "start": 1,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 1.5,
                "name": "D#2",
                "pitch": 39,
                "start": 1,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 2,
                "name": "G2",
                "pitch": 43,
                "start": 1.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 2.5,
                "name": "G2",
                "pitch": 43,
                "start": 2,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 2.5,
                "name": "C2",
                "pitch": 36,
                "start": 2,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 3,
                "name": "G2",
                "pitch": 43,
                "start": 2.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 3,
                "name": "C2",
                "pitch": 36,
                "start": 2.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 3.5,
                "name": "G2",
                "pitch": 43,
                "start": 3,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 3.5,
                "name": "D#2",
                "pitch": 39,
                "start": 3,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 4,
                "name": "G2",
                "pitch": 43,
                "start": 3.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 4.5,
                "name": "G2",
                "pitch": 43,
                "start": 4,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 4.5,
                "name": "C2",
                "pitch": 36,
                "start": 4,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 5,
                "name": "G2",
                "pitch": 43,
                "start": 4.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 5.5,
                "name": "G2",
                "pitch": 43,
                "start": 5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 5.5,
                "name": "D#2",
                "pitch": 39,
                "start": 5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 6,
                "name": "G2",
                "pitch": 43,
                "start": 5.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 6.5,
                "name": "G2",
                "pitch": 43,
                "start": 6,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 6.5,
                "name": "C2",
                "pitch": 36,
                "start": 6,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 7,
                "name": "G2",
                "pitch": 43,
                "start": 6.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 7,
                "name": "C2",
                "pitch": 36,
                "start": 6.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 7.5,
                "name": "G2",
                "pitch": 43,
                "start": 7,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 7.5,
                "name": "D#2",
                "pitch": 39,
                "start": 7,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 8,
                "name": "G2",
                "pitch": 43,
                "start": 7.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 8.5,
                "name": "G2",
                "pitch": 43,
                "start": 8,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 8.5,
                "name": "C2",
                "pitch": 36,
                "start": 8,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 9,
                "name": "G2",
                "pitch": 43,
                "start": 8.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 9.5,
                "name": "G2",
                "pitch": 43,
                "start": 9,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 9.5,
                "name": "D#2",
                "pitch": 39,
                "start": 9,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 10,
                "name": "G2",
                "pitch": 43,
                "start": 9.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 10.5,
                "name": "G2",
                "pitch": 43,
                "start": 10,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 10.5,
                "name": "C2",
                "pitch": 36,
                "start": 10,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 11,
                "name": "G2",
                "pitch": 43,
                "start": 10.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 11,
                "name": "C2",
                "pitch": 36,
                "start": 10.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 11.5,
                "name": "G2",
                "pitch": 43,
                "start": 11,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 11.5,
                "name": "D#2",
                "pitch": 39,
                "start": 11,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 12,
                "name": "G2",
                "pitch": 43,
                "start": 11.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 12.5,
                "name": "G2",
                "pitch": 43,
                "start": 12,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 12.5,
                "name": "C2",
                "pitch": 36,
                "start": 12,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 13,
                "name": "G2",
                "pitch": 43,
                "start": 12.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 13.5,
                "name": "G2",
                "pitch": 43,
                "start": 13,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 13.5,
                "name": "D#2",
                "pitch": 39,
                "start": 13,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 14,
                "name": "G2",
                "pitch": 43,
                "start": 13.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 14.5,
                "name": "G2",
                "pitch": 43,
                "start": 14,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 14.5,
                "name": "C2",
                "pitch": 36,
                "start": 14,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 15,
                "name": "G2",
                "pitch": 43,
                "start": 14.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 15,
                "name": "C2",
                "pitch": 36,
                "start": 14.5,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 15.5,
                "name": "G2",
                "pitch": 43,
                "start": 15,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 15.5,
                "name": "D#2",
                "pitch": 39,
                "start": 15,
                "velocity": 81
            },
            {
                "channel": 0,
                "end": 16,
                "name": "G2",
                "pitch": 43,
                "start": 15.5,
                "velocity": 81
            },
        ].map(d => Note.from(d)));
    });

    test('Guitar sheet with stave and tab do not lead to duplicate notes', () => {
        const xml = readXmlFile('[Test] Guitar Stave and Tab.musicxml');
        const parsed = preprocessMusicXmlData(xml);
        expect(parsed.parts[0].noteObjs.length).toBe(256);
    });

    test('Guitar sheet rests works', () => {
        const xml = readXmlFile('[Test] Guitar tab with rests.musicxml');
        const parsed = preprocessMusicXmlData(xml);
        expect(parsed.parts[0].noteObjs).toEqual([
            {
                "channel": 6,
                "end": 0.5,
                "fret": 1,
                "name": "F2",
                "pitch": 41,
                "start": 0,
                "string": 6,
                "velocity": 76,
            },
            {
                "channel": 6,
                "end": 1,
                "fret": 2,
                "name": "F#2",
                "pitch": 42,
                "start": 0.5,
                "string": 6,
                "velocity": 76,
            },
            {
                "channel": 6,
                "end": 1.5,
                "fret": 3,
                "name": "G2",
                "pitch": 43,
                "start": 1,
                "string": 6,
                "velocity": 76,
            },
            {
                "channel": 6,
                "end": 2,
                "fret": 4,
                "name": "G#2",
                "pitch": 44,
                "start": 1.5,
                "string": 6,
                "velocity": 76,
            },
            {
                "channel": 4,
                "end": 4,
                "fret": 5,
                "name": "G3",
                "pitch": 55,
                "start": 2,
                "string": 4,
                "velocity": 76,
            },
            {
                "channel": 4,
                "end": 6,
                "fret": 5,
                "name": "G3",
                "pitch": 55,
                "start": 4,
                "string": 4,
                "velocity": 76,
            },
            {
                "channel": 4,
                "end": 7,
                "fret": 6,
                "name": "G#3",
                "pitch": 56,
                "start": 6,
                "string": 4,
                "velocity": 76,
            },
            {
                "channel": 4,
                "end": 8,
                "fret": 8,
                "name": "A#3",
                "pitch": 58,
                "start": 7,
                "string": 4,
                "velocity": 76,
            },
            {
                "channel": 4,
                "end": 9,
                "fret": 9,
                "name": "B3",
                "pitch": 59,
                "start": 8,
                "string": 4,
                "velocity": 76,
            },
        ]);
    });

    test('Piano sheet with two staves leads to Notes with different channels', () => {
        const xml = readXmlFile('[Test] Piano Left and Right Hand Staves.musicxml');
        const parsed = preprocessMusicXmlData(xml);
        expect(parsed.parts[0].noteObjs.map(d => d.channel)).toStrictEqual([
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
        ]);
    });

    // TODO: not supported yet since this feature broke detecting tempo change times
    test.skip('Tempo change within measure is detected', () => {
        const xml = readXmlFile('[Test] Tempo Change Within Measure.musicxml');
        const parsed = preprocessMusicXmlData(xml);
        expect(parsed.parts[0].tempoChanges).toStrictEqual([

        ]);
    });

    test('Dynamics are parsed from <sound> tags', () => {
        const xml = readXmlFile('[Test] Dynamics.musicxml');
        const parsed = preprocessMusicXmlData(xml);
        expect(parsed.parts[0].noteObjs.map(d => d.velocity)).toStrictEqual([
            1,
            5,
            10,
            16,
            33,
            49,
            64,
            80,
            96,
            112,
            126,
            127,
            127,
            127,
        ]);
    });

    // TODO:
    test.skip('Repetition with alternate ending is handled correctly', () => {
        const xml = readXmlFile('[Test] Repetition with Alternate Endings.musicxml');
        const parsed = preprocessMusicXmlData(xml);
        // expect(parsed.parts[0].noteObjs.length).toBe(43);
        expect(parsed.parts[0].noteObjs.map(d => d.name)).toStrictEqual([
            "C5",
            "A4",
            "E4",
            "G4",

            "A4",
            "E4",
            "G4",
            "C4",

            "C5",
            "A4",
            "E4",
            "G4",

            "D4",
            "A3",
            "E3",
            "G3",

            "D4",
            "A3",
            "E3",
            "G3",

            "A3",
            "E3",
            "G3",
            "C4",

            "D4",
            "E4",
            "G4",
            "C4",

            "D4",
            "E4",
            "C4",
        ]);
    });

});
