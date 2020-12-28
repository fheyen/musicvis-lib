/**
* TODO: Not used yet
 * A Measure is a part of a Track with *constant* tempo (bpm) and beat type.
 * This class should allow to do abstract music theretical stuff with a track of notes.
 */
class Measure {
    #notes = [];
    #bpm = 120;
    #beats = 4;
    #beatType = 4;

    /**
     * @param {NoteArray} notes notes
     * @param {number} bpm tempo in beats per minute, e.g. 120
     * @param {number} beat e.g. 3 for 3/4
     * @param {number} beatType e.g. 4 for 3/4
     */
    constructor(notes, bpm = 120, beats = 4, beatType = 4) {
        this.#notes = notes;
        this.#bpm = bpm;
        this.#beats = beats;
        this.#beatType = beatType;
    }

    get notes() { return this.#notes; }

    get bpm() { return this.#bpm; }

    get beats() { return this.#beats; }

    get beatType() { return this.#beatType; }

    /**
     *
     * @param {number} newBpm new bpm
     * @returns {Measure} itself
     */
    // scaleToBpm(newBpm) {
    //     const factor = newBpm / this.bpm;
    //     this.notes.scale(factor);
    // return this;
    // }

    clone() {
        return new Measure(this.#notes, this.#bpm, this.#beats, this.#beatType);
    }
}

export default Measure;
