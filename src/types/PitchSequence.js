import { getMidiNoteByNr } from '../fileFormats/Midi';

/**
 * Stores a sequence of pitches and provides some methods to simplify and
 * manipulate it.
 *
 * @todo implement keepOnlyHighestConcurrentNotes
 */
class PitchSequence {

    #pitches = [];

    /**
     * @param {number[]} pitches pitches
     */
    constructor(pitches = []) {
        this.#pitches = pitches;
    }

    /**
     * Creates a pitch sequence from an array of Notes
     *
     * @param {Note[]} notes notes
     * @returns {PitchSequence} pitch sequence
     */
    static fromNotes(notes = []) {
        const pitches = [...notes]
            .sort((a, b) => {
                if (a.start === b.start) {
                    return a.pitch - b.pitch;
                }
                return a.start - b.start;
            })
            .map(d => d.pitch);
        return new PitchSequence(pitches);
    }

    /**
     * @param {string} string a string of Unicode characters
     * @returns {PitchSequence} pitch sequence
     */
    static fromCharString(string) {
        if (!string || string.length === 0) { return new PitchSequence(); }
        const pitches = string.split('').map((d, index) => string.charCodeAt(index));
        return new PitchSequence(pitches);
    }

    /**
     * @returns {number[]} pitches
     */
    getPitches() {
        return this.#pitches;
    }

    /**
     * @returns {number} number of pitches
     */
    length() {
        return this.#pitches.length;
    }

    /**
     * Turns pitch sequence into a string by turning each  pitch into a character
     * (based on Unicode index)
     *
     * @returns {string} string representation of note pitches
     */
    toCharString() {
        if (!this.#pitches || this.#pitches.length === 0) {
            return '';
        }
        return String.fromCharCode(...this.#pitches);
    }

    /**
     * @returns {string} a string with the notes' names
     */
    toNoteNameString() {
        return this.#pitches.map(p => getMidiNoteByNr(p).label).join(' ');
    }

    /**
     * Reverses the order of pitches in this PitchSequence
     *
     * @returns {PitchSequence} this
     */
    reverse() {
        this.#pitches = this.#pitches.reverse();
        return this;
    }

    /**
     * Takes a sequence of MIDI pitches and nomralizes them to be in [0, 11]
     *
     * @returns {PitchSequence} this
     */
    removeOctaves() {
        this.#pitches = this.#pitches.map(d => d % 12);
        return this;
    }

    /**
     * Transforms note pitches to intervals, i.e. diffrences between to subsequent
     * notes: C, C#, C, D => 1, -1, 2
     *
     * @returns {number[]} intervals
     */
    toIntervals() {
        const p = this.#pitches;
        if (!p || p.length === 0 || p.length < 2) {
            return [];
        }
        const result = Array.from({ length: p.length - 1 });
        for (let index = 1; index < p.length; index++) {
            result[index - 1] = p[index] - p[index - 1];
        }
        return result;
    }

    /**
     * @returns {PitchSequence} clone
     */
    clone() {
        return new PitchSequence(this.#pitches);
    }

    /**
     * Returns true if this NoteArray and otherNoteArray have equal attributes.
     *
     * @param {NoteArray} otherPitchSequence another NoteArray
     * @returns {boolean} true if equal
     */
    equals(otherPitchSequence) {
        if (!(otherPitchSequence instanceof PitchSequence)) {
            return false;
        }
        const p = otherPitchSequence.getPitches();
        if (this.#pitches.length !== p.length) {
            return false;
        }
        for (const [index, element] of p.entries()) {
            if (this.#pitches[index] !== element) {
                return false;
            }
        }
        return true;
    }
}

export default PitchSequence;
