/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import fs from 'fs';
import path from 'path';
import { bpmToSecondsPerBeat, freqToApproxMidiNr, chordToInteger, chordIntegerJaccardIndex, noteDurationToNoteType, metronomeTrackFromTempoAndMeter, metronomeTrackFromMusicPiece } from './MusicUtils';
import Note from '../types/Note';
import MusicPiece from '../types/MusicPiece';
import { readXmlFile } from '../../test/testTools/readTestAssetFiles';

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

            test('[Test] Increasing tempo for metronome track.musicxml', () => {
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


            test('3-4 meter.mid', () => {
                const midi = readMidiFile('[Test] 3-4 meter.mid');
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
