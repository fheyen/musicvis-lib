import Note from "./Note";

/**
 * Class that allows to represent pitch-bends from a MIDI file
 *
 * @todo nothing other than in note.js implemented yet
 * @todo NYI
 * @todo not used yet
 */
class PitchBend extends Note {
    /**
     * @param {number} pitch pitch
     * @param {number} start start time in seconds
     * @param {number} velocity velocity
     * @param {number} channel MIDI channel
     * @param {number} end end time in seconds
     */
    constructor(
        pitch,
        start = 0,
        velocity = 127,
        channel = 0,
        end = null,
        // This is different to the base Note class

    ) {
        super(pitch, start, velocity, channel, end);

    }

    /**
    * Creates a GuitarNote object from an object via destructuring
    *
    * @param {object} object object with at least {pitch}
    * @returns {PitchBend} new note
    */
    static from(object) {
        const {
            pitch,
            start = 0,
            velocity = 127,
            channel = 0,
            end = null,
            // This is different to the base Note class

        } = object;
        if (pitch === undefined) {
            console.error('Cannot create Note with undefined pitch');
            return null;
        }
        return new PitchBend(pitch, start, velocity, channel, end);
    }

    /**
     * Converts a Note to a GuitarNote
     *
     * @param {Note} note note
     * @param {number} string string
     * @param {number} fret fret
     * @returns {PitchBend} guitar note
     */
    static fromNote(note) {
        return new PitchBend(note.pitch, note.start, note.velocity, note.channel, note.end);
    }

    /**
     * Returns a copy of the Note object
     *
     * @returns {PitchBend} new note
     */
    clone() {
        return new PitchBend(
            this.pitch,
            this.start,
            this.velocity,
            this.channel,
            this.end,
            // This is different to the base Note class
        );
    }

    /**
     * Returns true if this note and otherNote have equal attributes.
     *
     * @param {PitchBend} otherNote another GuitarNote
     * @returns {boolean} true if equal
     */
    equals(otherNote) {
        if (!(otherNote instanceof PitchBend)) {
            return false;
        }
        return (
            this.pitch === otherNote.pitch &&
            this.start === otherNote.start &&
            this.velocity === otherNote.velocity &&
            this.channel === otherNote.channel &&
            this.end === otherNote.end
            // This is different to the base Note class
        );
    }
}

export default PitchBend;
