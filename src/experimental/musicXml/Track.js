/**
 * A Track is a collection of measures.
 * Since each Part can only have fixed tempo and beat type, tracks may be used
 * to represent music pieces where those attributes change.
 * This class should allow to do abstract music theretical stuff with a track of notes.
 *
 * @todo Not used yet
 * @ignore
 */
class Track {
    measures = [];
    #title = '';

    /**
     * @param {string} title title
     * @param {Measure[]} measures measures
     */
    constructor(title, measures = []) {
        this.#title = title;
        this.measures = measures;
    }

    // /**
    //  * @todo Reads attributes and notes from MIDI and create a JavaScript
    //  * representation.
    //  * @param {object} midiJson MIDI data parsed to JSON by midi-parser-js
    //  * @returns {Track} a track parsed from the given MIDI data
    //  */
    // static fromMidi(midiJson) {
    //     return null;
    // }

    // /**
    //  * @todo Reads attributes and notes from MusicXML and create a JavaScript
    //  * representation.
    //  * @param {XMLDocument} musicXml MusicXML document
    //  * @returns {Track} a track parsed from the given MIDI data
    //  */
    // static fromMusicXml(musicXml) {
    //     return null;
    // }

    /**
     * Returns all measures of this track.
     *
     * @returns {Measure[]} measures
     */
    get measures() {
        return this.measures;
    }

    /**
     * @returns {string} title
     */
    get title() {
        return this.#title;
    }

    /**
     * Returns the notes of all measures of this track sorted by start time.
     *
     * @returns {Note[]} notes of this track
     */
    getAllNotes() {
        let notes = [];
        // TODO: use flatmap
        for (const p of this.measures) {
            notes = [...notes, ...p.notes()];
        }
        return notes.sort((a, b) => a.start - b.start);
    }

    /**
     * @returns {Track} clone
     */
    clone() {
        return new Track(this.#title, this.measures);
    }
}

export default Track;
