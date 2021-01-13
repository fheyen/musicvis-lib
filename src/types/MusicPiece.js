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
     * @param {string} name name (e.g. file name or piece name)
     * @param {TempoDefinition[]} tempos tempos
     * @param {TimeSignature[]} timeSignatures time signatures
     * @param {KeySignature[]} keySignatures key signatures
     * @param {Track[]} tracks tracks
     * @todo key signatures not yet supported
     */
    constructor(name, tempos, timeSignatures, keySignatures, tracks) {
        this.name = name;
        this.tempos = tempos;
        this.timeSignatures = timeSignatures;
        this.keySignatures = keySignatures;
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
        // tempos
        let tempos = [];
        if (parsed.parts.length > 0) {
            tempos = parsed.parts[0].tempoChanges
                .map(d => new TempoDefinition(d.time, d.tempo));
        }
        // time signatures
        let timeSignatures = [];
        if (parsed.parts.length > 0) {
            timeSignatures = parsed.parts[0].beatTypeChanges
                .map(d => new TimeSignature(d.time, [d.beats, d.beatType]));
        }
        // key signatures
        let keySignatures = [];
        if (parsed.parts.length > 0) {
            keySignatures = parsed.parts[0].keySignatureChanges
                .map(d => new KeySignature(d.time, d.key, d.scale));
        }
        // tracks signatures
        const tracks = parsed.parts
            .map((t, i) => Track.fromMidi(
                parsed.partNames[i],
                parsed.instruments[i],
                t.noteObjs,
                i,
            ));
        // TODO:
        return new MusicPiece(
            name,
            tempos,
            timeSignatures,
            keySignatures,
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
    static fromMusicXML(name, xmlFile) {
        if (!xmlFile) {
            throw new Error('No MusicXML file content given');
        }
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlFile, 'text/xml');
        // TODO:
        const parsed = preprocessMusicXmlData(xmlDoc);

        // console.log(parsed);
        // tempos
        let tempos = [];
        if (parsed.parts.length > 0) {
            tempos = parsed.parts[0].tempoChanges
                .map(d => new TempoDefinition(d.time, d.tempo));
        }
        // time signatures
        let timeSignatures = [];
        if (parsed.parts.length > 0) {
            timeSignatures = parsed.parts[0].beatTypeChanges
                .map(d => new TimeSignature(d.time, [d.beats, d.beatType]));
        }
        // key signatures
        let keySignatures = [];
        if (parsed.parts.length > 0) {
            keySignatures = parsed.parts[0].keySignatureChanges
                .map(d => new KeySignature(d.time, d.key, d.scale));
        }
        // tracks
        const tracks = parsed.parts
            .map((t, i) => Track.fromMusicXml(
                parsed.partNames[i],
                parsed.instruments[i],
                t.noteObjs,
                i,
            ));
        return new MusicPiece(
            name,
            tempos,
            timeSignatures,
            keySignatures,
            tracks,
        );
    }

    // /**
    //  * @returns {Buffer} MIDI binary
    //  * @todo not needed currently
    //  */
    // toMidi() {
    //     const midi = new Midi();
    //     // TODO: more
    //     this.tracks.forEach(t => t.toMidi(midi));
    //     return Buffer.fromArray(midi.toArray());
    // }

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


    /**
     *
     */
    // clone() {

    // }
}

/**
 * Used by MusicPiece, should not be used directly
 *
 * @private
 */
class Track {

    /**
     * @param {string} name name
     * @param {string} instrument instrument name
     * @param {Note[]} notes notes
     */
    constructor(name, instrument, notes) {
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
        name = name.replace('\x00', '');
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
        name = name.replace('\x00', '');
        notes = notes.map(n => Note.from({
            ...n,
            channel,
        }));
        return new Track(name, instrument, notes);
    }

    // /**
    //  * Used by MusicPiece for its toMidi method
    //  *
    //  * @todo not needed currently
    //  * @param {Midi} midi Tonejs Midi
    //  */
    // toMidi(midi) {
    //     const track = midi.addTrack();
    //     for (const note of this.notes) {
    //         track.addNote({
    //             midi: note.pitch,
    //             time: note.start,
    //             duration: note.getDuration(),
    //             // TODO: more
    //         });
    //     }
    // }
}

/**
 * Tempo definition
 *
 * @private
 */
class TempoDefinition {
    /**
     * @param {number} time in seconds
     * @param {number} bpm tempo in seconds per beat
     */
    constructor(time, bpm) {
        this.time = time;
        this.bpm = bpm;
    }
}

/**
 * Time signature definition
 *
 * @private
 */
class TimeSignature {
    /**
     * @param {number} time in seconds
     * @param {number[]} signature time signature as [beats, beatType]
     */
    constructor(time, signature) {
        this.time = time;
        this.signature = signature;
    }
}

/**
 * Key signature definition
 *
 * @private
 */
class KeySignature {
    /**
     * @param {number} time in seconds
     * @param {string} key key e.g. 'C'
     * @param {string} scale scale e.g. 'major'
     */
    constructor(time, key, scale) {
        this.time = time;
        this.key = key;
        this.scale = scale;
    }
}

export default MusicPiece;
