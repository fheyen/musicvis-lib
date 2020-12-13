import { getMidiNoteByNr } from '../Midi';

/**
 * Stores a sequence of pitches and provides some methods to simplify and
 * manipulate it.
 */
export default class PitchSequence {

    #pitches = [];

    constructor(pitches = []) {
        this.#pitches = pitches;
    }

    /**
     * TODO: implement keepOnlyHighestConcurrentNotes
     * @param {*} notes
     * @param {*} keepOnlyHighestConcurrentNotes
     */
    static fromNotes(notes = [], keepOnlyHighestConcurrentNotes = false) {
        const pitches = notes
            .slice()
            .sort((a, b) => {
                if (a.start === b.start) {
                    return a.pitch - b.pitch;
                }
                return a.start - b.start;
            })
            .map(d => d.pitch);
        return new PitchSequence(pitches);
    }

    static fromCharString(string) {
        if (!string || !string.length) { return new PitchSequence(); }
        const pitches = string.split('').map((d, i) => string.charCodeAt(i));
        return new PitchSequence(pitches);
    }

    getPitches() {
        return this.#pitches;
    }

    length() {
        return this.#pitches.length;
    }

    /**
     * Turns pitch sequence into a string by turning each  pitch into a character
     * (based on Unicode index)
     * @returns {string} string representation of note pitches
     */
    toCharString() {
        if (!this.#pitches || !this.#pitches.length) {
            return '';
        }
        return String.fromCharCode(...this.#pitches);
    }

    toNoteNameString() {
        return this.#pitches.map(p => getMidiNoteByNr(p).label).join(' ');
    }

    reverse() {
        this.#pitches = this.#pitches.reverse();
        return this;
    }

    /**
     * Takes a sequence of MIDI pitches and nomralizes them to be in [0, 11]
     */
    removeOctaves() {
        this.#pitches = this.#pitches.map(d => d % 12);
        return this;
    }

    /**
     * Transforms note pitches to intervals, i.e. diffrences between to subsequent
     * notes: C, C#, C, D => 1, -1, 2
     * @param {number[]} pitchSequence array with MIDI pitches
     * @returns {number[]} intervals
     */
    toIntervals() {
        const p = this.#pitches;
        if (!p || !p.length || p.length < 2) {
            return [];
        }
        const result = new Array(p.length - 1);
        for (let i = 1; i < p.length; i++) {
            result[i - 1] = p[i] - p[i - 1];
        }
        return result;
    }

    clone() {
        return new PitchSequence(this.#pitches);
    }

    /**
     * Returns true if this NoteArray and otherNoteArray have equal attributes.
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
        for (let i = 0; i < p.length; i++) {
            if (this.#pitches[i] !== p[i]) {
                return false;
            }
        }
        return true;
    }
}
