import Note from "./Note";

/**
 * Guitar note class that reflects MIDI properties but has
 * absolute start and end times in seconds and
 * information on how to play it.
 */
export default class GuitarNote extends Note {
    /**
     * Creates a new Note
     * @param {number} pitch pitch
     * @param {number} start start time in seconds
     * @param {number} velocity velocity
     * @param {number} channel MIDI channel
     * @param {number} end end time in seconds
     * @param {number} string guitar string
     * @param {number} fret guitar fret
     */
    constructor(
        pitch = 0,
        start = 0,
        velocity = 127,
        channel = 0,
        end = null,
        // This is different to the base Note class
        string = null,
        fret = null,
    ) {
        super(pitch, start, velocity, channel, end);
        this.string = string;
        this.fret = fret;
    }

    /**
    * Creates a GuitarNote object from an object via destructuring
    * @param {Object} object object with at least {pitch}
    * @returns {GuitarNote} new note
    */
    static from(object) {
        const {
            pitch = 0,
            start = 0,
            velocity = 127,
            channel = 0,
            end = null,
            // This is different to the base Note class
            string = null,
            fret = null,
        } = object;
        return new GuitarNote(pitch, start, velocity, channel, end, string, fret);
    }

    /**
     * Converts a Note to a GuitarNote
     * @param {Note} note note
     * @param {number} string string
     * @param {number} fret fret
     * @returns {GuitarNote} guitar note
     */
    static fromNote(note, string, fret) {
        return new GuitarNote(note.pitch, note.start, note.velocity, note.channel, note.end, string, fret);
    }

    /**
     * Simplifies the GuitarNote to a Note
     * @returns {Note} note
     */
    toNote() {
        return new Note(this.pitch, this.start, this.velocity, this.channel, this.end);
    }

    /**
     * Returns a copy of the Note object
     * @returns {GuitarNote} new note
     */
    clone() {
        return new GuitarNote(
            this.pitch,
            this.start,
            this.velocity,
            this.channel,
            this.end,
            // This is different to the base Note class
            this.string,
            this.fret
        );
    }

    /**
     * Returns true if this note and otherNote have equal attributes.
     * @param {GuitarNote} otherNote another GuitarNote
     * @returns {boolen} true if equal
     */
    equals(otherNote) {
        if (!(otherNote instanceof GuitarNote)) {
            return false;
        }
        return (
            this.pitch === otherNote.pitch &&
            this.start === otherNote.start &&
            this.velocity === otherNote.velocity &&
            this.channel === otherNote.channel &&
            this.end === otherNote.end &&
            // This is different to the base Note class
            this.string === otherNote.string &&
            this.fret === otherNote.fret
        );
    }
}
