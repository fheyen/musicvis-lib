import NoteArray from './NoteArray';
import { arrayShallowEquals } from '../utils/ArrayUtils';

/**
 * Class for storing recorded notes alongside meta information.
 */
class Recording extends NoteArray {
    /**
     * Creates a new Recording
     *
     * @param {string} name name if the song
     * @param {Date} date date of the recording
     * @param {Note[]} notes array of Note objects
     * @param {number} [speed=1] relative speed compared to ground truth,
     *      e.g. 0.5 for half as fast
     * @param {number} [selectedTrack=0] track number of the ground truth to which
     *      this recording belongs
     * @param {number[]|null} [timeSelection=null] time selection of the ground
     *      truth to which this recording belongs, or null if full duration
     * @param {string} [comment=''] a free-text comment for the user to annotate
     *      the recording
     */
    constructor(name, date, notes, speed = 1, selectedTrack = 0, timeSelection = null, comment = '') {
        super(notes);
        this.name = name;
        this.date = date;
        // Save formatted date for faster access
        this.dateString = date.toISOString()
            .slice(0, 19)
            .replace('T', ' ');
        this.speed = +speed;
        this.selectedTrack = +selectedTrack;
        this.timeSelection = timeSelection;
        this.sortByTime();
        this.comment = comment;
    }

    /**
     * Returns a copy of the Note object
     *
     * @returns {Recording} new recording
     */
    clone() {
        return new Recording(
            this.name,
            this.date,
            this.getNotes().map(d => d.clone()),
            this.speed,
            this.selectedTrack,
            this.timeSelection === null ? null : [...this.timeSelection],
            this.comment,
        );
    }

    /**
     * Returns true if this Recording and otherRecording have equal attributes.
     *
     * @param {Recording} otherRecording another Recording
     * @returns {boolean} true if equal
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
            if (!arrayShallowEquals(this.timeSelection, otherRecording.timeSelection)) {
                return false;
            }
        }
        // Below is the same as NoteArray
        const notes1 = this.getNotes();
        const notes2 = otherRecording.getNotes();
        if (notes1.length !== notes2.length) {
            return false;
        }
        for (const [index, element] of notes1.entries()) {
            if (!element.equals(notes2[index])) {
                return false;
            }
        }
        if (this.comment !== otherRecording.comment) { return false; }
        return true;
    }

    /**
     * Turns the recoring into a simple object with the same properties
     *
     * @returns {object} simple object representation of the recording
     */
    toSimpleObject() {
        return {
            name: this.name,
            date: this.date,
            notes: this.getNotes(),
            speed: this.speed,
            selectedTrack: this.selectedTrack,
            timeSelection: this.timeSelection,
            comment: this.comment,
        };
    }

    /**
     * Creates a Note object from an object via destructuring
     *
     * @param {object} object object with at least {name, date, notes, speed}
     * @returns {Recording} new note
     * @throws {Error} when name, date, or notes are missing
     */
    static from(object) {
        // Support old format
        let { name, date, notes, _notes } = object;
        if (notes === undefined) { notes = _notes; }
        // Check for undefined
        const values = [name, date, notes];
        const names = ['name', 'date', 'notes'];
        for (const [index, value] of values.entries()) {
            if (value === undefined || value === null) {
                throw new Error(`Cannot create Recording with undefined ${names[index]}`);
            }
        }
        // Parse date if it is a string
        if (typeof (date) === 'string') {
            date = new Date(Date.parse(date));
        }
        const { speed, selectedTrack, timeSelection, comment } = object;
        return new Recording(
            name,
            date,
            notes,
            speed,
            selectedTrack,
            timeSelection,
            comment,
        );
    }
}

export default Recording;
