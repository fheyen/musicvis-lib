/**
 * TODO: Not used yet
 * A Track is a collection of measures.
 * Since each Part can only have fixed tempo and beat type, tracks may be used
 * to represent music pieces where those attributes change.
 * This class should allow to do abstract music theretical stuff with a track of notes.
 */

export default class Track {
    measures = [];
    #title = '';

    constructor(title, measures = []) {
        this.#title = title;
        this.measures = measures;
    }

    /**
     * TODO: Reads attributes and notes from MIDI and create a JavaScript
     * representation.
     * @param {Object} midiJson MIDI data parsed to JSON by midi-parser-js
     * @returns {Track} a track parsed from the given MIDI data
     */
    static fromMidi(midiJson) {

    }

    /**
     * TODO: Reads attributes and notes from MusicXML and create a JavaScript
     * representation.
     * @param {XMLDocument} musicXml MusicXML document
     * @returns {Track} a track parsed from the given MIDI data
     */
    static fromMusicXml(musicXml) {

    }

    /**
     * Returns all measures of this track.
     * @returns {Measure[]} measures
     */
    get measures() {
        return this.measures;
    }

    get title() {
        return this.#title;
    }

    /**
     * Returns the notes of all measures of this track sorted by start time.
     * @return {Note[]} notes of this track
     */
    getAllNotes() {
        const notes = [];
        for (let p of this.measures) {
            notes = notes.concat(p.notes());
        }
        return notes.sort((a, b) => a.start - b.start);
    }

    clone() {
        return new Track(this.#title, this.measures);
    }
}
