import NoteArray from "./NoteArray";
import { arrayShallowEquals } from "../utils/ArrayUtils";

// export function newRecording(name, date, notes, speed, selectedTrack, timeSelection) {
//     return new Recording(name, date, notes, speed, selectedTrack, timeSelection);
// }

/**
 * Class for storing recorded notes alongside meta information.
 */
export default class Recording extends NoteArray {

    #notes = [];

    /**
     * Creates a new Recording
     * @param {string} name name if the song
     * @param {Date} date date of the recording
     * @param {Note[]} notes array of Note objects
     * @param {number} speed relative speed compared to ground truth, e.g. 0.5
     *      for half as fast
     * @param {number} selectedTrack track number of the ground truth to which
     *      this recording belongs
     * @param {number[]|null} timeSelection time selection of the ground truth
     *      to which this recording belongs, or null if full duration
     */
    constructor(name, date, notes, speed = 1, selectedTrack = 0, timeSelection = null) {
        super(notes);
        this.name = name;
        this.date = date;
        // Save formatted date for faster access
        this.dateString = date.toISOString().substring(0, 19).replace('T', ' ');
        this.speed = +speed;
        this.selectedTrack = +selectedTrack;
        this.timeSelection = timeSelection;
        this.sortByTime();
    }

    /**
     * Returns a copy of the Note object
     * @returns {Recording} new recording
     */
    clone() {
        return new Recording(
            this.name,
            this.date,
            this.getNotes().map(d => d.clone()),
            this.speed,
            this.selectedTrack,
            this.timeSelection === null ? null : [...this.timeSelection]
        );
    }

    /**
     * Returns true if this Recording and otherRecording have equal attributes.
     * @param {Recording} otherRecording another Recording
     * @returns {boolen} true if equal
     */
    equals(otherRecording) {
        if (!(otherRecording instanceof Recording)) { return false; }
        if (this.name !== otherRecording.name) { return false; }
        if (this.date.getTime() !== otherRecording.date.getTime()) { return false; }
        if (this.speed !== otherRecording.speed) { return false; }
        if (this.selectedTrack !== otherRecording.selectedTrack) { return false; }
        if (this.timeSelection !== otherRecording.timeSelection) {
            if (this.timeSelection === null || otherRecording.timeSelection === null) {
                return false;
            }
            return arrayShallowEquals(this.timeSelection, otherRecording.timeSelection);
        }
        // Below is the same as NoteArray
        const notes = otherRecording.getNotes();
        if (this.#notes.length !== notes.length) {
            return false;
        }
        for (let i = 0; i < notes.length; i++) {
            if (!this.#notes[i].equals(notes[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * Turns the recoring into a simple object with the same properties
     * @returns {Object} simple object representation of the recording
     */
    toSimpleObject() {
        return {
            name: this.name,
            date: this.date,
            notes: this.getNotes(),
            speed: this.speed,
            selectedTrack: this.selectedTrack,
            timeSelection: this.timeSelection
        }
    }

    /**
     * Creates a Note object from an object via destructuring
     * @param {Object} obj object with at least {name, data, notes, speed}
     * @returns {Recording} new note
     */
    static from(obj) {
        let { name, date, notes } = obj;
        // Check for undefined
        const values = [name, date, notes];
        const names = ['name', 'date', 'notes'];
        for (let i = 0; i < values.length; i++) {
            if (values[i] === undefined || values[i] === null) {
                console.error(`Cannot create Recording with undefined ${names[i]}`);
                return null;
            }
        }
        // Parse date if it is a string
        if (typeof (date) === 'string') {
            date = new Date(Date.parse(date));
        }
        return new Recording(
            name,
            date,
            notes,
            obj.speed,
            obj.selectedTrack,
            obj.timeSelection
        );
    }
}
