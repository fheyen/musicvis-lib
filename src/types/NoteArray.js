import Note from './Note';
import GuitarNote from './GuitarNote';
import { clipValue } from '../utils/MathUtils';
import { min } from 'd3';

/**
 * This class represents an array of note objects.
 * This can be used to simplify operations on a track.
 *
 * @example
 *   const notes = [
 *       // Some Note objects
 *   ];
 *   const noteArr = new NoteArray(notes)
 *       // Add more notes (all notes will be sorted by time by default after this)
 *       .addNotes([])
 *       // Scale all note's sart and end time to make a track slower or faster
 *       .scaleTime(0.5)
 *       // Do more ...
 *       // This class also mirrors many functions from the Array class
 *       .sort(sortFunction).filter(filterFunction).map(mapFunction).slice(0, 20)
 *   // Get Note objects back in a simple Array
 *   const transformedNotes = noteArr.getNotes();
 *   // [Note, Note, Note, ...]
 */
class NoteArray {

    _notes;

    /**
     * Creates a new NoteArray,
     * will make a copy of the passed array and cast all notes
     *
     * @param {Note[]} notes notes, default: []
     */
    constructor(notes = []) {
        // Parse notes
        this._notes = notes.map(d => {
            if (d.string !== undefined && d.fret !== undefined) {
                return GuitarNote.from(d);
            }
            return Note.from(d);
        });
    }

    /**
     * Returns a simple array with all Note objects.
     *
     * @returns {Note[]} array with Note objects
     */
    getNotes() {
        return this._notes;
    }

    /**
     * Appends notes to this note array
     *
     * @param {Note[]} notes notes
     * @param {boolean} sort iff ture, sorts notes by start timeafter adding
     *      the new ones (default:true)
     * @returns {NoteArray} itself
     */
    addNotes(notes, sort = true) {
        this._notes = [...this._notes, ...notes];
        if (sort) {
            this.sortByTime();
        }
        return this;
    }

    /**
     * Adds the notes from another NoteArray to this NoteArray
     * IMPORTANT: this does not change the notes or sort them!
     * Take a look at NoteArray.append() if you want to extend
     * a track at its end.
     *
     * @param {NoteArray} noteArray another NoteArray
     * @returns {NoteArray} itself
     */
    concat(noteArray) {
        this._notes = [...this._notes, ...noteArray._notes];
        return this;
    }

    /**
     * Appends notes to the end of this NoteArray, after shifting them by its
     * duration. Set gap to something != 0 to create a gap or overlap.
     *
     * @param {NoteArray} noteArray another NoteArray
     * @param {number} gap in seconds between the two parts
     * @returns {NoteArray} itself
     */
    append(noteArray, gap = 0) {
        const duration = this.getDuration();
        const clone = noteArray.clone();
        clone.shiftTime(duration + gap);
        this._notes = [...this._notes, ...clone._notes];
        this.sortByTime();
        return this;
    }

    /**
     * Repeats the notes of this array by concatenating a time-shifted copy
     *
     * @param {number} times number of times to repeat it
     * @returns {NoteArray} a new NoteArray with the repeated note sequence
     */
    repeat(times) {
        const result = this.clone();
        if (times < 1) {
            return new NoteArray();
        }
        if (times === 1) {
            return result;
        }
        const copy = this.clone();
        const duration = this.getDuration();
        for (let index = 1; index < times; index++) {
            // Shift notes in time
            copy.shiftTime(duration);
            // Result is a NoteArray so use .concat
            // eslint-disable-next-line unicorn/prefer-spread
            result.concat(copy);
        }
        return result;
    }

    /**
     * Returns the number of Note objects in this NoteArray
     *
     * @returns {number} note count
     */
    length() {
        return this._notes.length;
    }

    /**
     * Returns the start time of the earliest note in this NoteArray
     *
     * @returns {number} start time
     */
    getStartTime() {
        return min(this._notes, d => d.start);
    }

    /**
     * Returns the duration of this note array in seconds from 0 to the end of
     * the latest note.
     *
     * @returns {number} duration
     */
    getDuration() {
        let duration = 0;
        for (const note of this._notes) {
            const noteEnd = note.end === null ? note.start : note.end;
            if (noteEnd > duration) {
                duration = noteEnd;
            }
        }
        return duration;
    }

    /**
     * Scales the time of each note by factor
     *
     * @param {number} factor factor
     * @returns {NoteArray} itself
     */
    scaleTime(factor) {
        this._notes = this._notes.map(n => n.scaleTime(factor));
        return this;
    }

    /**
     * Adds the speicifed number of seconds to each note
     *
     * @param {number} addedSeconds time to add in seconds
     * @returns {NoteArray} itself
     */
    shiftTime(addedSeconds) {
        this._notes = this._notes.map(n => n.shiftTime(addedSeconds));
        return this;
    }

    /**
     * Moves all notes s.t. the first starts at <start>
     * Will sort the notes by start time.
     *
     * @param {number} startTime the new start time for the earliest note
     * @returns {NoteArray} itself
     */
    shiftToStartAt(startTime) {
        this.sortByTime();
        const firstNoteStart = this._notes[0].start;
        const offset = firstNoteStart - startTime;
        this._notes.forEach(n => {
            n.start -= offset;
            if (n.end !== null) {
                n.end -= offset;
            }
        });
        return this;
    }

    /**
     * Similar to Array.forEach
     *
     * @param {Function} func a function
     * @returns {NoteArray} this
     */
    forEach(func) {
        this._notes.forEach((element, index, array) => func(element, index, array));
        return this;
    }

    /**
     * Sorts the notes
     *
     * @param {Function} sortFunction sort function, e.g. (a, b)=>a.start-b.start
     * @returns {NoteArray} itself
     */
    sort(sortFunction) {
        this._notes = this._notes.sort(sortFunction);
        return this;
    }

    /**
     * Sorts the notes by start time
     *
     * @returns {NoteArray} itself
     */
    sortByTime() {
        this._notes = this._notes.sort((a, b) => a.start - b.start);
        return this;
    }

    /**
     * Maps the notes using some mapping function
     *
     * @param {Function} mapFunction mapping function with same signature as
     *      Array.map()
     * @returns {NoteArray} itself
     */
    map(mapFunction) {
        this._notes = this._notes.map((element, index, array) => mapFunction(element, index, array));
        return this;
    }

    /**
     * Slices the notes by index, like Array.slice()
     *
     * @param {number} start start index
     * @param {number} end end index
     * @returns {NoteArray} itself
     */
    slice(start, end) {
        this._notes = this._notes.slice(start, end);
        return this;
    }

    /**
     * Slices the notes by time.
     * The modes end and contained will remove all notes with end === null!
     *
     * @param {number} startTime start of the filter range in seconds
     * @param {number} endTime end of the filter range in seconds (exclusive)
     * @param {string} mode controls which note time to consider, one of:
     *      - start (note.start must be inside range),
     *      - end (note.end ''),
     *      - contained (both note.start and note.end must be inside range)
     *      (contained is default)
     * @returns {NoteArray} itself
     */
    sliceTime(startTime, endTime, mode = 'contained') {
        const start = startTime;
        const end = endTime;
        if (mode === 'start') {
            this._notes = this._notes.filter(n => n.start >= start && n.start < end);
        }
        if (mode === 'end') {
            this._notes = this._notes.filter(n => n.end !== null && n.end >= start && n.end < end);
        }
        if (mode === 'contained') {
            this._notes = this._notes.filter(n => n.end !== null && n.start >= start && n.end < end);
        }
        return this;
    }

    /**
     * Filters the NoteArray like you would filter via Array.filter().
     *
     * @param {Function} filterFunction filter function, same signature as
     *      Array.filter()
     * @returns {NoteArray} itself
     */
    filter(filterFunction) {
        this._notes = this._notes.filter((element, index, array) => filterFunction(element, index, array));
        return this;
    }

    /**
     * Filters by pitch, keeping only pitches specified in <pitches>
     *
     * @param {number[]} pitches array of pitches to keep
     * @returns {NoteArray} itself
     */
    filterPitches(pitches) {
        this._notes = this._notes.filter(n => pitches.includes(n.pitch));
        return this;
    }

    /**
     * Transposes each note by <steps> semitones, will clip pitches to [0, 127]
     *
     * @param {number} steps number of semitones to transpose, can be negative
     * @returns {NoteArray} itself
     */
    transpose(steps) {
        for (const n of this._notes) {
            n.pitch = clipValue(n.pitch + steps, 0, 127);
        }
        return this;
    }

    /**
     * Reverses the note array, such that it can be played backwards.
     *
     * @returns {NoteArray} itself
     */
    reverse() {
        // Update note start and end times
        const duration = this.getDuration();
        // for (let n of this._notes) {
        //     n.start = duration - n.end;
        //     n.end = duration - n.start;
        // }
        this._notes = this._notes.map(n => {
            const newNote = n.clone();
            newNote.start = duration - n.end;
            newNote.end = newNote.start + n.getDuration();
            return newNote;
        });
        // Sort by time
        this.sortByTime();
        return this;
    }

    /**
     * Returns true if this NoteArray and otherNoteArray have equal attributes.
     *
     * @param {NoteArray} otherNoteArray another NoteArray
     * @returns {boolean} true if equal
     */
    equals(otherNoteArray) {
        if (!(otherNoteArray instanceof NoteArray)) {
            return false;
        }
        const notes = otherNoteArray.getNotes();
        if (this._notes.length !== notes.length) {
            return false;
        }
        for (const [index, note] of notes.entries()) {
            if (!this._notes[index].equals(note)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Deep clone, all contained notes are cloned as well.
     *
     * @returns {NoteArray} clone
     */
    clone() {
        return new NoteArray(this._notes);
    }
}

export default NoteArray;
