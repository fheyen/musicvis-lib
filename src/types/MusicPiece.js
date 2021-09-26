import * as midiParser from 'midi-parser-js';
import { Midi } from '@tonejs/midi';
import Note from './Note.js';
import { preprocessMusicXmlData } from '../fileFormats/MusicXmlParser.js';
import { preprocessMidiFileData } from '../fileFormats/MidiParser.js';
import NoteArray from './NoteArray.js';
import GuitarNote from './GuitarNote.js';



/**
 * Represents a parsed MIDI or MusicXML file in a uniform format.
 */
class MusicPiece {

    /**
     * Do not use this constructor, but the static methods MusicPiece.fromMidi
     * and MusicPiece.fromMusicXml instead.
     *
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
     * @example <caption>In Node.js</caption>
     *      const file = path.join(directory, fileName);
     *      const data = fs.readFileSync(file, 'base64');
     *      const mp = MusicPiece.fromMidi(fileName, data);
     * @example <caption>In the browser</caption>
     *      const uintArray = new Uint8Array(midiBinary);
     *      const MP = MusicPiece.fromMidi(filename, uintArray);
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
            // Tempos
            tempos = parsed.tempoChanges
                .map(d => new TempoDefinition(d.time, d.tempo));
            // Time signatures
            timeSignatures = parsed.beatTypeChanges
                .map(d => new TimeSignature(d.time, [d.beats, d.beatType]));
            // Key signatures
            keySignatures = parsed.keySignatureChanges
                .map(d => new KeySignature(d.time, d.key, d.scale));
            // Measure times
            measureTimes = parsed.measureLinePositions;
        }
        // Tracks
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
     * Creates a MusicPiece object from a MIDI file binary
     *
     * @todo on hold until @tonejs/midi adds time in seconds for meta events
     * @deprecated This is not fully implemented yet
     * @todo use @tonejs/midi for parsing, but the same information as with
     * MusicPiece.fromMidi()
     * @see https://github.com/Tonejs/Midi
     * @param {string} name name
     * @param {ArrayBuffer} midiFile MIDI file
     * @returns {MusicPiece} new MusicPiece
     * @throws {'No MIDI file content given'} when MIDI file is undefined or null
     * @example <caption>In Node.js</caption>
     *      const file = path.join(directory, fileName);
     *      const data = fs.readFileSync(file);
     *      const mp = MusicPiece.fromMidi(fileName, data);
     * @example <caption>In the browser</caption>
     *      const uintArray = new Uint8Array(midiBinary);
     *      const MP = MusicPiece.fromMidi(filename, uintArray);
     */
    static fromMidi2(name, midiFile) {
        if (!midiFile) {
            throw new Error('No MIDI file content given');
        }

        const parsed = new Midi(midiFile);
        // const uintArray = new Uint8Array(midiFile);
        // const parsed = new Midi(uintArray);

        // Tracks
        const tracks = [];
        for (const track of parsed.tracks) {
            if (track.notes.length === 0) { continue; }
            const notes = track.notes.map(note => Note.from({
                pitch: note.midi,
                start: note.time,
                end: note.time + note.duration,
                velocity: Math.round(note.velocity * 127),
                channel: track.channel,
            }));
            tracks.push(
                Track.fromMidi(
                    track.trackName,
                    track.instrumentName,
                    notes,
                ),
            );
        }

        // TODO: convert ticks to seconds
        let tempos = [];
        let timeSignatures = [];
        let keySignatures = [];
        let measureTimes = [];
        if (parsed.tracks.length > 0) {
            // tempos
            tempos = parsed.header.tempos
                .map(d => new TempoDefinition(d.time, d.tempo));
            // time signatures
            timeSignatures = parsed.header.timeSignatures
                .map(d => new TimeSignature(d.time, [d.beats, d.beatType]));
            // key signatures
            keySignatures = parsed.header.keySignatures
                .map(d => new KeySignature(d.time, d.key, d.scale));
            // measure times
            measureTimes = parsed.measureLinePositions;
        }
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
            // Tempos
            tempos = parsed.parts[0].tempoChanges
                .map(d => new TempoDefinition(d.time, d.tempo));
            // Time signatures
            timeSignatures = parsed.parts[0].beatTypeChanges
                .map(d => new TimeSignature(d.time, [d.beats, d.beatType]));
            // Key signatures
            keySignatures = parsed.parts[0].keySignatureChanges
                .map(d => new KeySignature(d.time, d.key, d.scale));
        }
        // Measure times
        let measureTimes = [];
        if (parsed.parts.length > 0) {
            measureTimes = parsed.parts[0].measureLinePositions;
        }
        // Tracks
        const tracks = parsed.parts
            .map((t, index) => Track.fromMusicXml(
                parsed.partNames[index],
                parsed.instruments[index],
                t.noteObjs,
                index,
                t.tuning,
                t.measureIndices,
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
     * Allows to get a MusicPiece from JSON after doing JSON.stringify()
     *
     * @param {string|JSON} json JSON
     * @returns {MusicPiece} new MusicPiece
     * @example
     *      const jsonString = mp.toJson();
     *      const recovered = MusicPiece.fromJson(jsonString);
     */
    static fromJson(json) {
        json = (typeof json === 'string') ? JSON.parse(json) : json;
        const name = json.name;
        const tempos = json.tempos.map(d => new TempoDefinition(d.time, d.bpm));
        const timeSignatures = json.timeSignatures.map(d => new TimeSignature(d.time, d.signature));
        const keySignatures = json.keySignatures.map(d => new KeySignature(d.time, d.key, d.scale));
        const measureTimes = json.measureTimes;
        const tracks = json.tracks.map(track => {
            const notes = track.notes.map(note => {
                return note.string !== undefined && note.fret !== undefined
                    ? GuitarNote.from(note)
                    : Note.from(note);
            });
            return new Track(
                track.name,
                track.instrument,
                notes,
                track.tuningPitches,
                track.measureIndices,
            );
        });
        return new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks);
    }

    /**
     * Returns a JSON-serialized representation
     *
     * @param {boolean} pretty true for readable (prettified) JSON
     * @returns {string} JSON as string
     * @example
     *      const jsonString = mp.toJson();
     *      const recovered = MusicPiece.fromJson(jsonString);
     */
    toJson(pretty = false) {
        return JSON.stringify(this, undefined, pretty ? 2 : 0);
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
     * @param {'all'|number|number[]} indices either 'all', a number, or an
     *      Array with numbers
     * @param {boolean} sortByTime true: sort notes by time (not needed for a
     *      single track)
     * @returns {Note[]} Array with all notes from the specified tracks
     */
    getNotesFromTracks(indices = 'all', sortByTime = false) {
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

    /**
     * Transposes all or only the specified tracks by the specified number of
     * (semitone) steps.
     * Will return a new MusicPiece instance.
     * Note pitches will be clipped to [0, 127].
     *
     * @param {number} steps number of semitones to transpose (can be negative)
     * @param {'all'|number|number[]} tracks tracks to transpose
     * @returns {MusicPiece} a new, transposed MusicPiece
     */
    transpose(steps = 0, tracks = 'all') {
        const newTracks = this.tracks.map((track, index) => {
            const change = (
                tracks === 'all'
                || (Array.isArray(tracks) && tracks.includes(index))
                || tracks === index
            );
            const na = new NoteArray(track.notes);
            let tuning = track.tuningPitches;
            if (change) {
                // Transpose notes and tuning pitches
                na.transpose(steps);
                tuning = track.tuningPitches.map(d => d + steps);
            }
            return new Track(
                track.name,
                track.instrument,
                na.getNotes(),
                tuning,
                track.measureIndices,
            );
        });
        return new MusicPiece(
            this.name,
            [...this.tempos],
            [...this.timeSignatures],
            [...this.keySignatures],
            [...this.measureTimes],
            newTracks,
        );
    }
}

/**
 * Used by MusicPiece, should not be used directly
 */
export class Track {
    /**
     * Do not use this constructor, but the static methods Track.fromMidi
     * and Track.fromMusicXml instead.
     *
     * Notes will be sorted by start time.
     *
     * @param {string} name name
     * @param {string} instrument instrument name
     * @param {Note[]} notes notes
     * @param {number[]} [tuningPitches=null] MIDI note numbers of the track's tuning
     * @param {number[]} [measureIndices=null] note indices where new measures start
     * @throws {'Notes are undefined or not an array'} for invalid notes
     */
    constructor(
        name,
        instrument,
        notes,
        tuningPitches = null,
        measureIndices = null,
    ) {
        name = !name?.length ? 'unnamed' : name.replace('\u0000', '');
        this.name = name;
        this.instrument = instrument;
        if (!notes || notes.length === undefined) {
            throw new Error('Notes are undefined or not an array');
        }
        this.notes = notes.sort((a, b) => a.start - b.start);
        this.tuningPitches = tuningPitches;
        this.measureIndices = measureIndices;
        // Computed properties
        this.duration = new NoteArray(notes).getDuration();
        this.hasStringFret = false;
        for (const note of notes) {
            if (note.string !== undefined && note.fret !== undefined) {
                this.hasStringFret = true;
                break;
            }
        }
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
     * @param {number[]} tuningPitches MIDI note numbers of the track's tuning
     * @param {number[]} [measureIndices=null] note indices where new measures start
     * @returns {Track} new Track
     */
    static fromMusicXml(
        name,
        instrument,
        notes,
        channel,
        tuningPitches = null,
        measureIndices = null,
    ) {
        for (const n of notes) {
            n.channel = channel;
        }
        return new Track(
            name,
            instrument,
            notes,
            tuningPitches,
            measureIndices,
        );
    }
}

/**
 * Tempo definition
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
