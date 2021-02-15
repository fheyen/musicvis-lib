/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import fs from 'fs';
import path from 'path';
import MusicPiece from '../types/MusicPiece';
import { metronomeTrackFromTempoAndMeter, metronomeTrackFromMusicPiece } from './MetronomeTrack';

const GT_DIR = path.join(__dirname, '..', '..', 'test', '_test_assets');

function readMidiFile(fileName) {
    const file = path.join(GT_DIR, fileName);
    return fs.readFileSync(file, 'base64');
}

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
