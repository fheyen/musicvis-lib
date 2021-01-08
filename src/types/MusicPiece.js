import { Midi } from '@tonejs/midi';
import NoteArray from './NoteArray';
import Note from './Note';
import { preprocessMusicXmlData } from '../fileFormats/MusicXmlParser';

/**
 * Represents a parsed MIDI or MusicXML file.
 * Close to the structure of @Tonejs/Midi
 *
 * @see https://github.com/Tonejs/Midi
 */
class MusicPiece {

    /**
     *
     * @param {string} name name
     * @param {object[]} tempos tempos
     * @param {object[]} keySignatures key signatures
     * @param {Track[]} tracks tracks
     */
    constructor(name, tempos, keySignatures, tracks) {
        this.tempos = tempos;
        this.keySignatures = keySignatures;
        this.name = name;
        this.tracks = tracks;
    }

    /**
     * Creates a MusicPiece object from a MIDI file binary
     *
     * @param {ArrayBuffer} midiFile MIDI file
     * @returns {MusicPiece} new MusicPiece
     */
    static fromMidi(midiFile) {

        const midi = new Midi(midiFile);
        this.tempos = midi.tempos;
        this.keySignatures = midi.keySignatures;
        this.name = midi.name;

        // Tracks
        const tracks = midi.tracks.map(t => Track.fromMidi(t));

        return new MusicPiece(
            midi.name,
            midi.tempos,
            midi.keySignatures,
            tracks,
        );
    }

    /**
     * Creates a MusicPiece object from a MusicXML string
     *
     * @param {string} xmlFile MusicXML file content
     * @returns {MusicPiece} new MusicPiece
     */
    static fromMusicXML(xmlFile) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlFile, 'text/xml');
        // TODO:
        const parsed = preprocessMusicXmlData(xmlDoc);

        // TODO:
        return new MusicPiece();
    }

    /**
     * @returns {Buffer} MIDI binary
     */
    toMidi() {
        const midi = new Midi();
        // TODO: more
        this.tracks.forEach(t => t.toMidi(midi));
        return Buffer.fromArray(midi.toArray());
    }

    /**
     *
     */
    // clone() {

    // }
}

/**
 *
 * @augments NoteArray
 */
class Track extends NoteArray {

    #notes;

    /**
     * @param {object} midiTrack MIDI track
     * @returns {Track} new Track
     */
    static fromMidi(midiTrack) {
        const notes = midiTrack.notes.map(note => Note.from({
            pitch: note.midi,
            start: note.time,
            end: note.time + note.duration,
            velocity: Math.round(note.velocity * 127),
            channel: midiTrack.channel,
        }));
        return new Track(notes);
    }

    /**
     * Used by MusicPiece for its toMidi method
     *
     * @param midi
     */
    toMidi(midi) {
        const track = midi.addTrack();
        for (const note of this.#notes) {
            track.addNote({
                midi: note.pitch,
                time: note.start,
                duration: note.getDuration(),
                // TODO: more
            });
        }
    }

    // TODO: clone, equals
}

export default MusicPiece;



const example = {
    'header': {
        'keySignatures': [],
        'meta': [],
        'name': '',
        'ppq': 960,
        'tempos': [
            {
                'bpm': 140.00014000014,
                'ticks': 0,
            },
        ],
        'timeSignatures': [
            {
                'ticks': 0,
                'timeSignature': [
                    2,
                    4,
                ],
                'measures': 0,
            },
            {
                'ticks': 1920,
                'timeSignature': [
                    4,
                    4,
                ],
                'measures': 1,
            },
        ],
    },
    'tracks': [
        {
            'channel': 0,
            'controlChanges': {
                '6': [
                    {
                        'number': 6,
                        'ticks': 0,
                        'time': 0,
                        'value': 0.09448818897637795,
                    },
                ],
                '38': [
                    {
                        'number': 38,
                        'ticks': 0,
                        'time': 0,
                        'value': 0,
                    },
                ],
                '100': [
                    {
                        'number': 100,
                        'ticks': 0,
                        'time': 0,
                        'value': 0,
                    },
                ],
                '101': [
                    {
                        'number': 101,
                        'ticks': 0,
                        'time': 0,
                        'value': 0,
                    },
                ],
            },
            'pitchBends': [],
            'instrument': {
                'family': 'piano',
                'name': 'acoustic grand piano',
                'number': 0,
            },
            'name': '',
            'notes': [],
        },
        {
            'channel': 0,
            'controlChanges': {
                '7': [
                    {
                        'number': 7,
                        'ticks': 0,
                        'time': 0,
                        'value': 0.8110236220472441,
                    },
                ],
                '10': [
                    {
                        'number': 10,
                        'ticks': 0,
                        'time': 0,
                        'value': 0.49606299212598426,
                    },
                ],
                '11': [
                    {
                        'number': 11,
                        'ticks': 0,
                        'time': 0,
                        'value': 1,
                    },
                ],
                '91': [
                    {
                        'number': 91,
                        'ticks': 0,
                        'time': 0,
                        'value': 0,
                    },
                ],
                '92': [
                    {
                        'number': 92,
                        'ticks': 0,
                        'time': 0,
                        'value': 0,
                    },
                ],
                '93': [
                    {
                        'number': 93,
                        'ticks': 0,
                        'time': 0,
                        'value': 0,
                    },
                ],
                '95': [
                    {
                        'number': 95,
                        'ticks': 0,
                        'time': 0,
                        'value': 0,
                    },
                ],
            },
            'pitchBends': [
                {
                    'ticks': 0,
                    'time': 0,
                    'value': 0,
                },
            ],
            'instrument': {
                'family': 'piano',
                'name': 'acoustic grand piano',
                'number': 0,
            },
            'name': '',
            'notes': [],
        },
        {
            'channel': 0,
            'controlChanges': {
                '7': [
                    {
                        'number': 7,
                        'ticks': 0,
                        'time': 0,
                        'value': 0.8110236220472441,
                    },
                ],
                '10': [
                    {
                        'number': 10,
                        'ticks': 0,
                        'time': 0,
                        'value': 0.49606299212598426,
                    },
                ],
                '11': [
                    {
                        'number': 11,
                        'ticks': 0,
                        'time': 0,
                        'value': 1,
                    },
                ],
                '91': [
                    {
                        'number': 91,
                        'ticks': 0,
                        'time': 0,
                        'value': 0,
                    },
                ],
                '92': [
                    {
                        'number': 92,
                        'ticks': 0,
                        'time': 0,
                        'value': 0,
                    },
                ],
                '93': [
                    {
                        'number': 93,
                        'ticks': 0,
                        'time': 0,
                        'value': 0,
                    },
                ],
                '95': [
                    {
                        'number': 95,
                        'ticks': 0,
                        'time': 0,
                        'value': 0,
                    },
                ],
            },
            'pitchBends': [],
            'instrument': {
                'family': 'piano',
                'name': 'acoustic grand piano',
                'number': 0,
            },
            'name': '',
            'notes': [],
        },
        {
            'channel': 0,
            'controlChanges': {},
            'pitchBends': [],
            'instrument': {
                'family': 'bass',
                'name': 'electric bass (finger)',
                'number': 33,
            },
            'name': '',
            'notes': [
                {
                    'duration': 0.21428550000000002,
                    'durationTicks': 480,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 480,
                    'time': 0.21428550000000002,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428550000000002,
                    'durationTicks': 480,
                    'midi': 42,
                    'name': 'F#2',
                    'ticks': 960,
                    'time': 0.42857100000000004,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428550000000002,
                    'durationTicks': 480,
                    'midi': 43,
                    'name': 'G2',
                    'ticks': 1440,
                    'time': 0.6428565,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.42857100000000004,
                    'durationTicks': 960,
                    'midi': 45,
                    'name': 'A2',
                    'ticks': 1920,
                    'time': 0.8571420000000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428550000000013,
                    'durationTicks': 480,
                    'midi': 42,
                    'name': 'F#2',
                    'ticks': 2880,
                    'time': 1.285713,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 3360,
                    'time': 1.4999985000000002,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 38,
                    'name': 'D2',
                    'ticks': 3840,
                    'time': 1.7142840000000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 4320,
                    'time': 1.9285695,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428550000000035,
                    'durationTicks': 480,
                    'midi': 42,
                    'name': 'F#2',
                    'ticks': 4800,
                    'time': 2.142855,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285709999999998,
                    'durationTicks': 960,
                    'midi': 43,
                    'name': 'G2',
                    'ticks': 5280,
                    'time': 2.3571405000000003,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428550000000035,
                    'durationTicks': 480,
                    'midi': 43,
                    'name': 'G2',
                    'ticks': 6240,
                    'time': 2.7857115,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 6720,
                    'time': 2.9999970000000005,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 38,
                    'name': 'D2',
                    'ticks': 7200,
                    'time': 3.2142825000000004,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 37,
                    'name': 'C#2',
                    'ticks': 7680,
                    'time': 3.4285680000000003,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 33,
                    'name': 'A1',
                    'ticks': 8160,
                    'time': 3.6428535,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 38,
                    'name': 'D2',
                    'ticks': 8640,
                    'time': 3.857139,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 9120,
                    'time': 4.0714245,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285710000000007,
                    'durationTicks': 960,
                    'midi': 42,
                    'name': 'F#2',
                    'ticks': 9600,
                    'time': 4.28571,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 38,
                    'name': 'D2',
                    'ticks': 10560,
                    'time': 4.714281000000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 37,
                    'name': 'C#2',
                    'ticks': 11040,
                    'time': 4.9285665000000005,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 35,
                    'name': 'B1',
                    'ticks': 11520,
                    'time': 5.142852,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 37,
                    'name': 'C#2',
                    'ticks': 12000,
                    'time': 5.3571375,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 38,
                    'name': 'D2',
                    'ticks': 12480,
                    'time': 5.571423,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285710000000007,
                    'durationTicks': 960,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 12960,
                    'time': 5.7857085,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 13920,
                    'time': 6.214279500000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 38,
                    'name': 'D2',
                    'ticks': 14400,
                    'time': 6.428565000000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142854999999999,
                    'durationTicks': 480,
                    'midi': 37,
                    'name': 'C#2',
                    'ticks': 14880,
                    'time': 6.642850500000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285709999999998,
                    'durationTicks': 960,
                    'midi': 34,
                    'name': 'A#1',
                    'ticks': 15360,
                    'time': 6.857136000000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285709999999998,
                    'durationTicks': 960,
                    'midi': 30,
                    'name': 'F#1',
                    'ticks': 16320,
                    'time': 7.285707,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285709999999998,
                    'durationTicks': 960,
                    'midi': 35,
                    'name': 'B1',
                    'ticks': 17280,
                    'time': 7.714278,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 38,
                    'name': 'D2',
                    'ticks': 18240,
                    'time': 8.142849,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428549999999902,
                    'durationTicks': 480,
                    'midi': 35,
                    'name': 'B1',
                    'ticks': 18720,
                    'time': 8.3571345,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 37,
                    'name': 'C#2',
                    'ticks': 19200,
                    'time': 8.57142,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 19680,
                    'time': 8.7857055,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428549999999902,
                    'durationTicks': 480,
                    'midi': 37,
                    'name': 'C#2',
                    'ticks': 20160,
                    'time': 8.999991000000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285709999999998,
                    'durationTicks': 960,
                    'midi': 38,
                    'name': 'D2',
                    'ticks': 20640,
                    'time': 9.2142765,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 42,
                    'name': 'F#2',
                    'ticks': 21600,
                    'time': 9.6428475,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428549999999902,
                    'durationTicks': 480,
                    'midi': 38,
                    'name': 'D2',
                    'ticks': 22080,
                    'time': 9.857133000000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285710000000016,
                    'durationTicks': 960,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 22560,
                    'time': 10.0714185,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428549999999902,
                    'durationTicks': 480,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 23520,
                    'time': 10.499989500000002,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 42,
                    'name': 'F#2',
                    'ticks': 24000,
                    'time': 10.714275,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428549999999902,
                    'durationTicks': 480,
                    'midi': 43,
                    'name': 'G2',
                    'ticks': 24480,
                    'time': 10.928560500000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285709999999998,
                    'durationTicks': 960,
                    'midi': 45,
                    'name': 'A2',
                    'ticks': 24960,
                    'time': 11.142846,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 42,
                    'name': 'F#2',
                    'ticks': 25920,
                    'time': 11.571417,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 26400,
                    'time': 11.785702500000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428549999999902,
                    'durationTicks': 480,
                    'midi': 38,
                    'name': 'D2',
                    'ticks': 26880,
                    'time': 11.999988000000002,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 27360,
                    'time': 12.214273500000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428549999999902,
                    'durationTicks': 480,
                    'midi': 42,
                    'name': 'F#2',
                    'ticks': 27840,
                    'time': 12.428559000000002,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285709999999998,
                    'durationTicks': 960,
                    'midi': 43,
                    'name': 'G2',
                    'ticks': 28320,
                    'time': 12.6428445,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 43,
                    'name': 'G2',
                    'ticks': 29280,
                    'time': 13.0714155,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428549999999902,
                    'durationTicks': 480,
                    'midi': 40,
                    'name': 'E2',
                    'ticks': 29760,
                    'time': 13.285701000000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 38,
                    'name': 'D2',
                    'ticks': 30240,
                    'time': 13.4999865,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285709999999998,
                    'durationTicks': 960,
                    'midi': 37,
                    'name': 'C#2',
                    'ticks': 30720,
                    'time': 13.714272000000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.4285709999999998,
                    'durationTicks': 960,
                    'midi': 34,
                    'name': 'A#1',
                    'ticks': 31680,
                    'time': 14.142843000000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.8571419999999996,
                    'durationTicks': 1920,
                    'midi': 35,
                    'name': 'B1',
                    'ticks': 32640,
                    'time': 14.571414,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 35,
                    'name': 'B1',
                    'ticks': 34560,
                    'time': 15.428556,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.2142855000000008,
                    'durationTicks': 480,
                    'midi': 33,
                    'name': 'A1',
                    'ticks': 35040,
                    'time': 15.642841500000001,
                    'velocity': 0.7480314960629921,
                },
                {
                    'duration': 0.21428549999999902,
                    'durationTicks': 480,
                    'midi': 35,
                    'name': 'B1',
                    'ticks': 35520,
                    'time': 15.857127000000002,
                    'velocity': 0.7480314960629921,
                },
            ],
        },
        {
            'channel': 0,
            'controlChanges': {},
            'pitchBends': [],
            'instrument': {
                'family': 'bass',
                'name': 'electric bass (finger)',
                'number': 33,
            },
            'name': '',
            'notes': [],
        },
    ],
};
