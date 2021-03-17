// eslint-disable-next-line no-unused-vars
import Note from './Note';
import midiParser from 'midi-parser-js';
import { preprocessMusicXmlData } from '../fileFormats/MusicXmlParser';
import { preprocessMidiFileData } from '../fileFormats/MidiParser';
import NoteArray from './NoteArray';

/**
 * Represents a parsed MIDI or MusicXML file in a uniform format.
 *
 * @module types/MusicPiece
 */
class MusicPiece {

    /**
     * Do not use this constructor, but the static methods MusicPiece.fromMidi
     * and MusicPiece.fromMusicXml instead.
     *
     * @private
     * @param {string} name name (e.g. file name or piece name)
     * @param {TempoDefinition[]} tempos tempos
     * @param {TimeSignature[]} timeSignatures time signatures
     * @param {KeySignature[]} keySignatures key signatures
     * @param {number[]} measureTimes time in seconds for each measure line
     * @param {Track[]} tracks tracks
     * @throws {'No or invalid tracks given!'} when invalid tracks are given
     */
    constructor(name, tempos, timeSignatures, keySignatures, measureTimes, tracks) {
        if (!tracks || tracks.length === 0) {
            throw new Error('No or invalid tracks given');
        }
        this.name = name;
        this.measureTimes = measureTimes;
        this.tracks = tracks;
        this.duration = Math.max(...this.tracks.map(d => d.duration));
        // Filter multiple identical consecutive infos
        this.tempos = tempos.slice(0, 1);
        let currentTempo = tempos[0];
        for (const tempo of tempos) {
            if (tempo.string !== currentTempo.string) {
                currentTempo = tempo;
                this.tempos.push(tempo);
            }
        }
        this.timeSignatures = timeSignatures.slice(0, 1);
        let currentTimeSig = timeSignatures[0];
        for (const timeSignature of timeSignatures) {
            if (timeSignature.string !== currentTimeSig.string) {
                currentTimeSig = timeSignature;
                this.timeSignatures.push(timeSignature);
            }
        }
        this.keySignatures = keySignatures.slice(0, 1);
        let currentKeySig = keySignatures[0];
        for (const keySignature of keySignatures) {
            if (keySignature.string !== currentKeySig.string) {
                currentKeySig = keySignature;
                this.keySignatures.push(keySignature);
            }
        }
    }

    /**
     * Creates a MusicPiece object from a MIDI file binary
     *
     * @param {string} name name
     * @param {ArrayBuffer} midiFile MIDI file
     * @returns {MusicPiece} new MusicPiece
     * @throws {'No MIDI file content given'} when MIDI file is undefined or null
     */
    static fromMidi(name, midiFile) {
        if (!midiFile) {
            throw new Error('No MIDI file content given');
        }
        const midi = midiParser.parse(midiFile);
        const parsed = preprocessMidiFileData(midi);
        let tempos = [];
        let timeSignatures = [];
        let keySignatures = [];
        let measureTimes = [];
        if (parsed.tracks.length > 0) {
            // tempos
            tempos = parsed.tempoChanges
                .map(d => new TempoDefinition(d.time, d.tempo));
            // time signatures
            timeSignatures = parsed.beatTypeChanges
                .map(d => new TimeSignature(d.time, [d.beats, d.beatType]));
            // key signatures
            keySignatures = parsed.keySignatureChanges
                .map(d => new KeySignature(d.time, d.key, d.scale));
            // measure times
            measureTimes = parsed.measureLinePositions;
        }
        // tracks signatures
        const tracks = parsed.tracks.map((t, index) => Track.fromMidi(
            t.trackName,
            t.instrumentName,
            t.noteObjs,
            index,
        ));
        return new MusicPiece(
            name,
            tempos,
            timeSignatures,
            keySignatures,
            measureTimes,
            tracks,
        );
    }

    /**
     * Creates a MusicPiece object from a MusicXML string
     *
     * @param {string} name name
     * @param {string|object} xmlFile MusicXML file content as string or object
     *      If it is an object, it must behave like a DOM, e.g. provide methods
     *      such as .querySelectorAll()
     * @returns {MusicPiece} new MusicPiece
     * @throws {'No MusicXML file content given'} when MusicXML file is
     *  undefined or null
     * @example Parsing a MusicPiece in Node.js
     *    const jsdom = require('jsdom');
     *    const xmlFile = fs.readFileSync('My Song.musicxml');
     *    const dom = new jsdom.JSDOM(xmlFile);
     *    const xmlDocument = dom.window.document;
     *    const mp = musicvislib.MusicPiece.fromMusicXml('My Song', xmlDocument);
     */
    static fromMusicXml(name, xmlFile) {
        if (!xmlFile) {
            throw new Error('No MusicXML file content given');
        }
        let xmlDocument = xmlFile;
        if (typeof xmlDocument === 'string') {
            const parser = new DOMParser();
            xmlDocument = parser.parseFromString(xmlFile, 'text/xml');
        }
        const parsed = preprocessMusicXmlData(xmlDocument);
        let tempos = [];
        let timeSignatures = [];
        let keySignatures = [];
        if (parsed.parts.length > 0) {
            // tempos
            tempos = parsed.parts[0].tempoChanges
                .map(d => new TempoDefinition(d.time, d.tempo));
            // time signatures
            timeSignatures = parsed.parts[0].beatTypeChanges
                .map(d => new TimeSignature(d.time, [d.beats, d.beatType]));
            // key signatures
            keySignatures = parsed.parts[0].keySignatureChanges
                .map(d => new KeySignature(d.time, d.key, d.scale));
        }
        // measure times
        let measureTimes = [];
        if (parsed.parts.length > 0) {
            measureTimes = parsed.parts[0].measureLinePositions;
        }
        // tracks
        const tracks = parsed.parts
            .map((t, index) => Track.fromMusicXml(
                parsed.partNames[index],
                parsed.instruments[index],
                t.noteObjs,
                index,
            ));
        return new MusicPiece(
            name,
            tempos,
            timeSignatures,
            keySignatures,
            measureTimes,
            tracks,
        );
    }

    /**
     * Returns an array with all notes from all tracks.
     *
     * @deprecated use getNotesFromTracks('all') instead.
     * @param {boolean} sortByTime true: sort notes by time
     * @returns {Note[]} all notes of this piece
     */
    getAllNotes(sortByTime = false) {
        const notes = this.tracks.flatMap(t => t.notes);
        if (sortByTime) {
            notes.sort((a, b) => a.start - b.start);
        }
        return notes;
    }

    /**
     * Returns an array with notes from the specified tracks.
     *
     * @param {string|number|number[]} indices either 'all', a number, or an
     *      Array with numbers
     * @param {boolean} sortByTime true: sort notes by time (not needed for a
     *      single track)
     * @returns {Note[]} Array with all notes from the specified tracks
     */
    getNotesFromTracks(indices, sortByTime = false) {
        let notes = [];
        if (indices === 'all') {
            // Return all notes from all tracks
            notes = this.tracks.flatMap(t => t.notes);
        } else if (Array.isArray(indices)) {
            // Return notes from some tracks
            notes = this.tracks
                .filter((d, i) => indices.includes(i))
                .flatMap(t => t.notes);
        } else {
            // Return notes from a single track
            notes = this.tracks[indices].notes;
            // Notes in each tracks are already sorted
            sortByTime = false;
        }
        if (sortByTime) {
            notes.sort((a, b) => a.start - b.start);
        }
        return notes;
    }
}

/**
 * Used by MusicPiece, should not be used directly
 *
 * @private
 */
export class Track {
    /**
     * Do not use this constructor, but the static methods Track.fromMidi
     * and Track.fromMusicXml instead.
     *
     * Notes will be sorted by start time.
     *
     * @private
     * @param {string} name name
     * @param {string} instrument instrument name
     * @param {Note[]} notes notes
     * @throws {'Notes are undefined or not an array'} for invalid notes
     */
    constructor(name, instrument, notes) {
        name = !name?.length ? 'unnamed' : name.replace('\u0000', '');
        this.name = name;
        this.instrument = instrument;
        if (!notes || notes.length === undefined) {
            throw new Error('Notes are undefined or not an array');
        }
        this.notes = notes.sort((a, b) => a.start - b.start);
        this.duration = new NoteArray(notes).getDuration();
    }

    /**
     * Creates a new Track from a MusicXML track
     *
     * @param {string} name name
     * @param {string} instrument instrument name
     * @param {Note[]} notes parsed MusicXML track's notes
     * @returns {Track} new Track
     */
    static fromMidi(name, instrument, notes) {
        return new Track(name, instrument, notes);
    }

    /**
     * Creates a new Track from a MusicXML track
     *
     * @param {string} name name
     * @param {string} instrument instrument name
     * @param {Note[]} notes parsed MusicXML track's notes
     * @param {number} channel channel
     * @returns {Track} new Track
     */
    static fromMusicXml(name, instrument, notes, channel) {
        for (const n of notes) {
            n.channel = channel;
        }
        return new Track(name, instrument, notes);
    }
}

/**
 * Tempo definition
 *
 * @private
 */
export class TempoDefinition {
    /**
     * @param {number} time in seconds
     * @param {number} bpm tempo in seconds per beat
     */
    constructor(time, bpm) {
        this.time = time;
        this.bpm = bpm;
        this.string = `${bpm} bpm`;
    }
}

/**
 * Time signature definition
 *
 * @private
 */
export class TimeSignature {
    /**
     * @param {number} time in seconds
     * @param {number[]} signature time signature as [beats, beatType]
     */
    constructor(time, signature) {
        this.time = time;
        this.signature = signature;
        this.string = signature.join('/');
    }
}

/**
 * Key signature definition
 *
 * @private
 */
export class KeySignature {
    /**
     * @param {number} time in seconds
     * @param {string} key key e.g. 'C'
     * @param {string} scale scale e.g. 'major'
     */
    constructor(time, key, scale) {
        this.time = time;
        this.key = key;
        this.scale = scale;
        this.string = `${key} ${scale}`;
    }
}

export default MusicPiece;
