/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import fs from 'fs';
import path from 'path';
import { bpmToSecondsPerBeat, freqToApproxMidiNr, chordToInteger, chordIntegerJaccardIndex, noteDurationToNoteType, metronomeTrackFromTempoAndMeter, metronomeTrackFromMusicPiece } from './MusicUtils.js';
import Note from '../types/Note.js';
import MusicPiece from '../types/MusicPiece.js';
import { readXmlFile } from '../../test/testTools/readTestAssetFiles.js';

const GT_DIR = path.join(__dirname, '..', '..', 'test', '_test_assets');

function readMidiFile(fileName) {
    const file = path.join(GT_DIR, fileName);
    return fs.readFileSync(file, 'base64');
}

describe('MusicUtils', () => {

    describe('bpmToSecondsPerBeat', () => {
        test('30bpm', () => {
            expect(bpmToSecondsPerBeat(30)).toBe(2);
        });

        test('60bpm', () => {
            expect(bpmToSecondsPerBeat(60)).toBe(1);
        });

        test('120bpm', () => {
            expect(bpmToSecondsPerBeat(120)).toBe(0.5);
        });
    });


    describe('freqToApproxMidiNr', () => {
        test('440', () => {
            expect(freqToApproxMidiNr(440)).toBe(69);
        });

        test('880', () => {
            expect(freqToApproxMidiNr(880)).toBe(81);
        });

        test('1234', () => {
            expect(freqToApproxMidiNr(1234).toFixed(3)).toBe('86.853');
        });

        test('approx. E7', () => {
            expect(Math.round(freqToApproxMidiNr(2638))).toBe(100);
        });
    });


    describe('chordToInteger', () => {
        test('empty', () => {
            expect(chordToInteger([])).toBe(0);
        });

        test.each([
            [0, 1],
            [1, 2],
            [2, 4],
            [3, 8],
            [4, 16],
            [5, 32],
            [8, 256],
            [11, 2048],
            [12, 1],
            [24, 1],
            [25, 2],
        ])('single note with pitch %s', (pitch, integer) => {
            expect(
                chordToInteger([Note.from({ pitch })])
            ).toBe(integer);
        });

        test('works for simple chord', () => {
            const chord = [
                Note.from({ pitch: 65 }),
                Note.from({ pitch: 67 }),
                Note.from({ pitch: 69 }),
            ];
            expect(chordToInteger(chord)).toBe(32 + 128 + 512);
        });
    });


    describe('chordIntegerJaccardIndex', () => {
        test.each([
            ['00000000', '00000000', 1],
            ['00000000', '00000001', 0],
            ['00000000', '00010001', 0],
            ['00010000', '00010001', 1 / 2],
            ['10010000', '00010001', 1 / 3],
        ])('%s', (chord1, chord2, result) => {
            const c1 = parseInt(chord1, 2);
            const c2 = parseInt(chord2, 2);
            expect(chordIntegerJaccardIndex(c1, c2)).toBe(result);
        });
    });


    describe('noteDurationToNoteType', () => {
        test.skip.each([
            {
                duration: 1,
                bpm: 60,
                result: { "dots": 0, "duration": 0.25, "type": 0.25 },
            },
            {
                duration: 0.5,
                bpm: 120,
                result: { "dots": 0, "duration": 0.25, "type": 0.25 },
            },
            {
                duration: 1.5,
                bpm: 60,
                result: { "dots": 1, "duration": 0.75, "type": 0.5 },
            },
        ])('%s', (value) => {
            const { duration, bpm, result } = value;
            expect(noteDurationToNoteType(duration, bpm)).toStrictEqual(result);
        });
    });



    describe('MetronomeTrack', () => {
        describe('from tempo and meter', () => {
            test('120bpm 4/4', () => {
                expect(
                    metronomeTrackFromTempoAndMeter(120, [4, 4], 5)
                ).toStrictEqual([
                    {
                        'accent': true,
                        'time': 0,
                    },
                    {
                        'accent': false,
                        'time': 0.5,
                    },
                    {
                        'accent': false,
                        'time': 1,
                    },
                    {
                        'accent': false,
                        'time': 1.5,
                    },
                    {
                        'accent': true,
                        'time': 2,
                    },
                    {
                        'accent': false,
                        'time': 2.5,
                    },
                    {
                        'accent': false,
                        'time': 3,
                    },
                    {
                        'accent': false,
                        'time': 3.5,
                    },
                    {
                        'accent': true,
                        'time': 4,
                    },
                    {
                        'accent': false,
                        'time': 4.5,
                    },
                    {
                        'accent': false,
                        'time': 5,
                    },
                ]);
            });

            test('120bpm 3/4', () => {
                expect(
                    metronomeTrackFromTempoAndMeter(120, [3, 4], 5)
                ).toStrictEqual([
                    {
                        'accent': true,
                        'time': 0,
                    },
                    {
                        'accent': false,
                        'time': 0.5,
                    },
                    {
                        'accent': false,
                        'time': 1,
                    },
                    {
                        'accent': true,
                        'time': 1.5,
                    },
                    {
                        'accent': false,
                        'time': 2,
                    },
                    {
                        'accent': false,
                        'time': 2.5,
                    },
                    {
                        'accent': true,
                        'time': 3,
                    },
                    {
                        'accent': false,
                        'time': 3.5,
                    },
                    {
                        'accent': false,
                        'time': 4,
                    },
                    {
                        'accent': true,
                        'time': 4.5,
                    },
                    {
                        'accent': false,
                        'time': 5,
                    },
                ]);
            });

            test('120bpm 6/8', () => {
                expect(
                    metronomeTrackFromTempoAndMeter(120, [6, 8], 5)
                ).toStrictEqual([
                    {
                        "accent": true,
                        "time": 0,
                    },
                    {
                        "accent": false,
                        "time": 0.25,
                    },
                    {
                        "accent": false,
                        "time": 0.5,
                    },
                    {
                        "accent": false,
                        "time": 0.75,
                    },
                    {
                        "accent": false,
                        "time": 1,
                    },
                    {
                        "accent": false,
                        "time": 1.25,
                    },
                    {
                        "accent": true,
                        "time": 1.5,
                    },
                    {
                        "accent": false,
                        "time": 1.75,
                    },
                    {
                        "accent": false,
                        "time": 2,
                    },
                    {
                        "accent": false,
                        "time": 2.25,
                    },
                    {
                        "accent": false,
                        "time": 2.5,
                    },
                    {
                        "accent": false,
                        "time": 2.75,
                    },
                    {
                        "accent": true,
                        "time": 3,
                    },
                    {
                        "accent": false,
                        "time": 3.25,
                    },
                    {
                        "accent": false,
                        "time": 3.5,
                    },
                    {
                        "accent": false,
                        "time": 3.75,
                    },
                    {
                        "accent": false,
                        "time": 4,
                    },
                    {
                        "accent": false,
                        "time": 4.25,
                    },
                    {
                        "accent": true,
                        "time": 4.5,
                    },
                    {
                        "accent": false,
                        "time": 4.75,
                    },
                    {
                        "accent": false,
                        "time": 5,
                    },
                ]);
            });
        });


        describe('from music piece', () => {
            test('MIDI and XML are equal', () => {
                const midi = readMidiFile('[Test] Increasing tempo for metronome track.mid');
                const xml = readXmlFile('[Test] Increasing tempo for metronome track.musicxml', GT_DIR);
                const mp1 = MusicPiece.fromMidi('test', midi);
                const mp2 = MusicPiece.fromMusicXml('test', xml);
                expect(
                    metronomeTrackFromMusicPiece(mp1)
                ).toStrictEqual(
                    metronomeTrackFromMusicPiece(mp2)
                );
            });

            test('[Test] Increasing tempo for metronome track', () => {
                const xml = readXmlFile('[Test] Increasing tempo for metronome track.musicxml', GT_DIR);
                const mp = MusicPiece.fromMusicXml('test', xml);
                // console.log(mp.measureTimes);
                // console.log(mp.tracks[0].notes.map(d => d.start));
                expect(
                    metronomeTrackFromMusicPiece(mp).map(d => d.time)
                ).toStrictEqual([
                    0,
                    0.5,
                    1,
                    1.5,
                    2,
                    2.25,
                    2.5,
                    2.75,
                    3,
                    3.5,
                    4,
                    4.5,
                    5,
                    5.25,
                    5.5,
                    5.75,
                    6,
                ]);
            });

            test('A min pent increasing tempo', () => {
                const xml = readXmlFile('[Test] A min pent increasing tempo.musicxml', GT_DIR);
                const mp = MusicPiece.fromMusicXml('test', xml);
                // console.log(mp.measureTimes);
                // console.log(mp.tracks[0].notes.map(d => d.start));
                // console.log(mp.tempos);
                expect(
                    metronomeTrackFromMusicPiece(mp).map(d => d.time)
                ).toStrictEqual([
                    0,
                    0.6,
                    1.2,
                    1.8,
                    2.4,
                    3,
                    3.6,
                    4.2,
                    4.8,
                    5.4,
                    6,
                    6.6,
                    7.2,
                    7.8,
                    8.4,
                    9,
                    9.6,
                    10.2,
                    10.8,
                    11.4,
                    12,
                    12.6,
                    13.2,
                    13.8,
                    14.4,
                    14.9,
                    15.4,
                    15.9,
                    16.4,
                    16.9,
                    17.4,
                    17.9,
                    18.4,
                    18.9,
                    19.4,
                    19.9,
                    20.4,
                    20.9,
                    21.4,
                    21.9,
                    22.4,
                    22.9,
                    23.4,
                    23.9,
                    24.4,
                    24.9,
                    25.4,
                    25.9,
                    26.4,
                    26.829,
                    27.257,
                    27.686,
                    28.114,
                    28.543,
                    28.971,
                    29.4,
                    29.829,
                    30.257,
                    30.686,
                    31.114,
                    31.543,
                    31.971,
                    32.4,
                    32.829,
                    33.257,
                    33.686,
                    34.114,
                    34.543,
                    34.971,
                    35.4,
                    35.829,
                    36.257,
                    36.686,
                    37.061,
                    37.436,
                    37.811,
                    38.186,
                    38.561,
                    38.936,
                    39.311,
                    39.686,
                    40.061,
                    40.436,
                    40.811,
                    41.186,
                    41.561,
                    41.936,
                    42.311,
                    42.686,
                    43.061,
                    43.436,
                    43.811,
                    44.186,
                    44.561,
                    44.936,
                    45.311,
                ]);
            });


            const mp_4_3_meter = MusicPiece.fromMidi('test', readMidiFile('[Test] 3-4 meter.mid'));
            test('3-4 meter.mid', () => {
                expect(
                    metronomeTrackFromMusicPiece(mp_4_3_meter)
                ).toStrictEqual([
                    {
                        "accent": true,
                        "time": 0,
                    },
                    {
                        "accent": false,
                        "time": 0.5,
                    },
                    {
                        "accent": false,
                        "time": 1,
                    },
                    {
                        "accent": true,
                        "time": 1.5,
                    },
                    {
                        "accent": false,
                        "time": 2,
                    },
                    {
                        "accent": false,
                        "time": 2.5,
                    },
                    {
                        "accent": true,
                        "time": 3,
                    },
                    {
                        "accent": false,
                        "time": 3.5,
                    },
                    {
                        "accent": false,
                        "time": 4,
                    },
                ]);
            });

            test('tempo factor', () => {
                expect(
                    metronomeTrackFromMusicPiece(mp_4_3_meter, 0.5)
                ).toStrictEqual([
                    {
                        "accent": true,
                        "time": 0,
                    },
                    {
                        "accent": false,
                        "time": 1,
                    },
                    {
                        "accent": false,
                        "time": 2,
                    },
                    {
                        "accent": true,
                        "time": 3,
                    },
                    {
                        "accent": false,
                        "time": 4,
                    },
                    {
                        "accent": false,
                        "time": 5,
                    },
                    {
                        "accent": true,
                        "time": 6,
                    },
                    {
                        "accent": false,
                        "time": 7,
                    },
                    {
                        "accent": false,
                        "time": 8,
                    },
                ]);
            });

            // TODO: not sure if correct result
            test.skip('6-8 meter.mid', () => {
                const midi = readMidiFile('[Test] 6-8 meter.mid');
                const mp = MusicPiece.fromMidi('test', midi);
                expect(
                    metronomeTrackFromMusicPiece(mp)
                ).toStrictEqual([
                    {
                        "accent": true,
                        "time": 0,
                    },
                    {
                        "accent": false,
                        "time": 0.25,
                    },
                    {
                        "accent": false,
                        "time": 0.5,
                    },
                    {
                        "accent": false,
                        "time": 0.75,
                    },
                    {
                        "accent": false,
                        "time": 1,
                    },
                    {
                        "accent": false,
                        "time": 1.25,
                    },
                    {
                        "accent": true,
                        "time": 1.5,
                    },
                    {
                        "accent": false,
                        "time": 1.75,
                    },
                    {
                        "accent": false,
                        "time": 2,
                    },
                    {
                        "accent": false,
                        "time": 2.25,
                    },
                    {
                        "accent": false,
                        "time": 2.5,
                    },
                    {
                        "accent": false,
                        "time": 2.75,
                    },
                    {
                        "accent": true,
                        "time": 3,
                    },
                    {
                        "accent": false,
                        "time": 3.25,
                    },
                    {
                        "accent": false,
                        "time": 3.5,
                    },
                    {
                        "accent": false,
                        "time": 3.75,
                    },
                    {
                        "accent": false,
                        "time": 4,
                    },
                    {
                        "accent": false,
                        "time": 4.25,
                    },
                    {
                        "accent": true,
                        "time": 4.5,
                    },
                    {
                        "accent": false,
                        "time": 5,
                    },
                    {
                        "accent": false,
                        "time": 5.5,
                    },
                    {
                        "accent": false,
                        "time": 6,
                    },
                    {
                        "accent": true,
                        "time": 6.5,
                    },
                    {
                        "accent": false,
                        "time": 7,
                    },
                    {
                        "accent": false,
                        "time": 7.5,
                    },
                    {
                        "accent": false,
                        "time": 8,
                    },
                    {
                        "accent": true,
                        "time": 8.5,
                    },
                    {
                        "accent": false,
                        "time": 8.75,
                    },
                    {
                        "accent": false,
                        "time": 9,
                    },
                    {
                        "accent": false,
                        "time": 9.25,
                    },
                    {
                        "accent": false,
                        "time": 9.5,
                    },
                    {
                        "accent": false,
                        "time": 9.75,
                    },
                    {
                        "accent": true,
                        "time": 10,
                    },
                    {
                        "accent": false,
                        "time": 10.25,
                    },
                    {
                        "accent": false,
                        "time": 10.5,
                    },
                    {
                        "accent": false,
                        "time": 10.75,
                    },
                    {
                        "accent": false,
                        "time": 11,
                    },
                    {
                        "accent": false,
                        "time": 11.25,
                    },
                    {
                        "accent": true,
                        "time": 11.5,
                    },
                    {
                        "accent": false,
                        "time": 11.75,
                    },
                    {
                        "accent": false,
                        "time": 12,
                    },
                    {
                        "accent": false,
                        "time": 12.25,
                    },
                    {
                        "accent": false,
                        "time": 12.5,
                    },
                    {
                        "accent": false,
                        "time": 12.75,
                    },
                ]);
            });

            // TODO: not sure if correct result
            test.skip('beat type change.mid', () => {
                const midi = readMidiFile('[Test] Beat type change.mid');
                const mp = MusicPiece.fromMidi('test', midi);
                expect(
                    metronomeTrackFromMusicPiece(mp)
                ).toStrictEqual([
                    {
                        "accent": true,
                        "time": 0,
                    },
                    {
                        "accent": false,
                        "time": 0.5,
                    },
                    {
                        "accent": false,
                        "time": 1,
                    },
                    {
                        "accent": true,
                        "time": 1.5,
                    },
                    {
                        "accent": false,
                        "time": 2,
                    },
                    {
                        "accent": false,
                        "time": 2.5,
                    },
                    {
                        "accent": true,
                        "time": 3,
                    },
                    {
                        "accent": false,
                        "time": 3.5,
                    },
                    {
                        "accent": false,
                        "time": 4,
                    },
                    {
                        "accent": false,
                        "time": 4.5,
                    },
                    {
                        "accent": true,
                        "time": 5,
                    },
                    {
                        "accent": false,
                        "time": 5.5,
                    },
                    {
                        "accent": false,
                        "time": 6,
                    },
                    {
                        "accent": false,
                        "time": 6.5,
                    },
                    {
                        "accent": true,
                        "time": 7,
                    },
                    {
                        "accent": false,
                        "time": 7.5,
                    },
                    {
                        "accent": false,
                        "time": 8,
                    },
                    {
                        "accent": true,
                        "time": 8.5,
                    },
                    {
                        "accent": false,
                        "time": 9,
                    },
                    {
                        "accent": false,
                        "time": 9.5,
                    },
                    {
                        "accent": true,
                        "time": 10,
                    },
                    {
                        "accent": false,
                        "time": 10.5,
                    },
                    {
                        "accent": false,
                        "time": 11,
                    },
                    {
                        "accent": false,
                        "time": 11.5,
                    },
                    {
                        "accent": true,
                        "time": 12,
                    },
                    {
                        "accent": false,
                        "time": 12.5,
                    },
                    {
                        "accent": false,
                        "time": 13,
                    },
                    {
                        "accent": false,
                        "time": 13.5,
                    },
                ]);
            });
        });


    });
});
