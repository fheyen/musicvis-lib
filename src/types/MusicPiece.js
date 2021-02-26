// eslint-disable-next-line no-unused-vars
import Note from './Note';
import midiParser from 'midi-parser-js';
import { preprocessMusicXmlData } from '../fileFormats/MusicXmlParser';
import { preprocessMidiFileData } from '../fileFormats/MidiParser';
import NoteArray from './NoteArray';

/**
 * Represents a parsed MIDI or MusicXML file in a uniform format.
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
        this.name = name;
        this.tempos = tempos;
        this.timeSignatures = timeSignatures;
        this.keySignatures = keySignatures;
        this.measureTimes = measureTimes;

        if (!tracks || tracks.length === 0) {
            throw new Error('No or invalid tracks given');
        }
        this.tracks = tracks;
        this.duration = Math.max(...this.tracks.map(d => d.duration));
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
     * @param {string} xmlFile MusicXML file content
     * @returns {MusicPiece} new MusicPiece
     * @throws {'No MusicXML file content given'} when MusicXML file is
     *  undefined or null
     */
    static fromMusicXml(name, xmlFile) {
        if (!xmlFile) {
            throw new Error('No MusicXML file content given');
        }
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlFile, 'text/xml');
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
     * @private
     * @param {string} name name
     * @param {string} instrument instrument name
     * @param {Note[]} notes notes
     */
    constructor(name, instrument, notes) {
        name = !name?.length ? 'unnamed' : name.replace('\u0000', '');
        this.name = name;
        this.instrument = instrument;
        this.notes = notes;
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
