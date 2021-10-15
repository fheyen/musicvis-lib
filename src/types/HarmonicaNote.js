import { getMidiNoteByLabel } from '../fileFormats/Midi.js';
import Note from './Note.js';



/**
 * Harmonica note class that reflects MIDI properties but has
 * absolute start and end times in seconds and
 * information on how to play it.
 *
 * @augments Note
 */
class HarmonicaNote extends Note {
    /**
     * Creates a new Note
     *
     * @param {number} pitch pitch
     * @param {number} start start time in seconds
     * @param {number} velocity velocity
     * @param {number} channel MIDI channel
     * @param {number} end end time in seconds
     * @param {number} hole harmonica hole
     * @param {'blow'|'draw'|'bend'|'overblow'} instruction instruction, e.g., blow or draw
     */
    constructor(
        pitch = 0,
        start = 0,
        velocity = 127,
        channel = 0,
        end = null,
        // This is different to the base Note class
        hole = null,
        instruction = null,
    ) {
        super(pitch, start, velocity, channel, end);
        this.hole = hole;
        this.instruction = instruction;
    }

    /**
     * Creates a HarmonicaNote object from an object via destructuring
     *
     * @param {object} object object with at least {pitch}
     *  {
     *      pitch: number|string    e.g. 12 or C#4
     *      start: number           start time in seconds
     *      end: number             end time in seconds
     *      velocity: number        MIDI velocity
     *      channel: number         MIDI channel
     *      hole: number            harmonica hole
     *      instruction: string     instruction, e.g., blow or draw
     *  }
     * @returns {HarmonicaNote} new note
     * @throws {Error} when pitch is invalid
     */
    static from(object) {
        let {
            pitch = 0,
            start = 0,
            velocity = 127,
            channel = 0,
            end = null,
            // This is different to the base Note class
            hole = null,
            instruction = null,
        } = object;
        if (typeof pitch === 'string' && Number.isNaN(+pitch)) {
            const note = getMidiNoteByLabel(pitch);
            if (note === null || note === undefined) {
                throw new Error('Invalid pitch for HarmonicaNote.from()');
            }
            pitch = note.pitch;
        }
        return new HarmonicaNote(
            pitch,
            start,
            velocity,
            channel,
            end,
            hole,
            instruction,
        );
    }

    /**
     * Converts a Note to a Harmonica
     *
     * @param {Note} note note
     * @param {number} hole harmonica hole
     * @param {'blow'|'draw'|'bend'|'overblow'} instruction instruction, e.g., blow or draw
     * @returns {HarmonicaNote} harmonica note
     */
    static fromNote(note, hole, instruction) {
        return new HarmonicaNote(
            note.pitch,
            note.start,
            note.velocity,
            note.channel,
            note.end,
            hole,
            instruction,
        );
    }

    /**
     * Simplifies the HarmonicaNote to a Note
     *
     * @returns {Note} note
     */
    toNote() {
        return new Note(
            this.pitch,
            this.start,
            this.velocity,
            this.channel,
            this.end,
        );
    }

    /**
     * Returns a copy of the Note object
     *
     * @returns {GuitarNote} new note
     */
    clone() {
        return new HarmonicaNote(
            this.pitch,
            this.start,
            this.velocity,
            this.channel,
            this.end,
            // This is different to the base Note class
            this.hole,
            this.instruction,
        );
    }

    /**
     * Returns true if this note and otherNote have equal attributes.
     *
     * @param {GuitarNote} otherNote another GuitarNote
     * @returns {boolean} true if equal
     */
    equals(otherNote) {
        if (!(otherNote instanceof HarmonicaNote)) {
            return false;
        }
        return (
            this.pitch === otherNote.pitch &&
            this.start === otherNote.start &&
            this.velocity === otherNote.velocity &&
            this.channel === otherNote.channel &&
            this.end === otherNote.end &&
            // This is different to the base Note class
            this.hole === otherNote.hole &&
            this.instruction === otherNote.instruction
        );
    }

    /**
     * Human-readable string representation of this HarmonicaNote
     *
     * @param {boolean} short if true, attribute names will be shortened
     * @returns {string} string representation
     */
    toString(short = false) {
        if (short) {
            return `HarmonicaNote(n: ${this.name}, p: ${this.pitch}, s: ${this.start}, e: ${this.end}, v: ${this.velocity}, c: ${this.channel}, h: ${this.hole}, i: ${this.instruction})`;
        }
        return `HarmonicaNote(name: ${this.name}, pitch: ${this.pitch}, start: ${this.start}, end: ${this.end}, velocity: ${this.velocity}, channel: ${this.channel}, hole: ${this.hole}, instruction: ${this.instruction})`;
    }
}

export default HarmonicaNote;
