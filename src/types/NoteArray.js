import Note from "./Note";
import GuitarNote from "./GuitarNote";
import { clipValue } from "../utils/MathUtils";
import { min } from "d3";

/**
 * This class represents an array of note objects.
 * This can be used to simplify operations on a track.
 */
export default class NoteArray {

    #notes;

    /**
     * Creates a new NoteArray,
     * will make a copy of the passed array and cast all notes
     * @param {Note[]} notes notes, default: []
     */
    constructor(notes = []) {
        // Parse notes
        this.#notes = notes.map(d => {
            if (d.string !== undefined && d.fret !== undefined) {
                return GuitarNote.from(d);
            }
            return Note.from(d);
        });
    }

    /**
     * Returns a simple array with all Note objects.
     * @returns {Note[]} array with Note objects
     */
    getNotes() {
        return this.#notes;
    }

    /**
     * Appends notes to this note array
     * @param {Note[]} notes
     * @param {boolean} sort iff ture, sorts notes by start timeafter adding
     *      the new ones (default:true)
     * @returns {NoteArray} itself
     */
    addNotes(notes, sort = true) {
        this.#notes = this.#notes.concat(notes);
        if (sort) {
            this.sortByTime();
        }
        return this;
    }

    /**
     * Adds the notes from another NoteArray to this NoteArray
     * IMPORTANT: this does not change the notes or sort them!
     * Take a look at NoteArry.append() if you want to extend
     * a track at its end.
     * @param {NoteArray} noteArray another NoteArray
     * @returns {NoteArray} itself
     */
    concat(noteArray) {
        this.#notes = this.#notes.concat(noteArray.#notes);
        return this;
    }

    /**
     * Appends notes to the end of this NoteArray, after shifting them by its
     * duration. Set gap to something != 0 to create a gap or overlap.
     * @param {NoteArray} noteArray another NoteArray
     * @param {number} gap in seconds between the two parts
     * @returns {NoteArray} itself
     */
    append(noteArray, gap = 0) {
        const duration = this.getDuration();
        const clone = noteArray.clone();
        clone.shiftTime(duration + gap);
        this.#notes = this.#notes.concat(clone.#notes);
        this.sortByTime();
        return this;
    }

    /**
     * Repeats the notes of this array by concatenating a time-shifted copy
     * @param {number} times number of times to repeat it
     * @returns {NoteArray} a new NoteArray with the repeated note sequence
     */
    repeat(times) {
        const result = this.clone();
        const copy = this.clone();
        const duration = this.getDuration();
        if (times < 2) {
            return result;
        }
        for (let i = 1; i < times; i++) {
            // Shift notes in time
            copy.shiftTime(duration);
            result.concat(copy);
        }
        return result;
    }

    /**
     * Returns the number of Note objects in this NoteArray
     * @returns {number} note count
     */
    length() {
        return this.#notes.length;
    }

    /**
     * Returns the start time of the earliest note in this NoteArray
     * @returns {number} start time
     */
    getStartTime() {
        return min(this.#notes, d => d.start);
    }

    /**
     * Returns the duration of this note array in seconds
     * @returns {number} duration
     */
    getDuration() {
        let duration = 0;
        for (let note of this.#notes) {
            const noteEnd = note.end === null ? note.start : note.end;
            if (noteEnd > duration) {
                duration = noteEnd;
            }
        }
        return duration;
    }

    /**
     * Scales the time of each note by factor
     * @param {number} factor factor
     * @returns {NoteArray} itself
     */
    scaleTime(factor) {
        this.#notes = this.#notes.map(n => n.scaleTime(factor));
        return this;
    }

    /**
     * Adds the speicifed number of seconds to each note
     * @param {number} addedSeconds time to add in seconds
     * @returns {NoteArray} itself
     */
    shiftTime(addedSeconds) {
        this.#notes = this.#notes.map(n => n.shiftTime(addedSeconds));
        return this;
    }

    /**
     * Moves all notes s.t. the first starts at <start>
     * Will sort the notes by start time.
     * @param {number} startTime the new start time for the earliest note
     * @returns {NoteArray} itself
     */
    shiftToStartAt(startTime) {
        this.sortByTime();
        const firstNoteStart = this.#notes[0].start;
        const offset = firstNoteStart - startTime;
        this.#notes.forEach(n => {
            n.start -= offset;
            if (n.end !== null) {
                n.end -= offset;
            }
        });
        return this;
    }

    /**
     * Similar to Array.forEach
     * @param {*} fn
     */
    forEach(fn) {
        this.#notes.forEach(fn);
        return this;
    }

    /**
     * Sorts the notes
     * @param {Function} sortFunction sort function, e.g. (a, b)=>a.start-b.start
     * @returns {NoteArray} itself
     */
    sort(sortFunction) {
        this.#notes = this.#notes.sort(sortFunction);
        return this;
    }

    /**
     * Sorts the notes by start time
     * @returns {NoteArray} itself
     */
    sortByTime() {
        this.#notes = this.#notes.sort((a, b) => a.start - b.start);
        return this;
    }

    /**
     * Maps the notes using some mapping function
     * @param {Function} mapFunction mapping function with same signature as
     *      Array.map()
     * @returns {NoteArray} itself
     */
    map(mapFunction) {
        this.#notes = this.#notes.map(mapFunction);
        return this;
    }

    /**
     * Slices the notes by index, like Array.slice()
     * @param {number} start start index
     * @param {number} end end index
     * @returns {NoteArray} itself
     */
    slice(start, end) {
        this.#notes = this.#notes.slice(start, end);
        return this;
    }

    /**
     * Slices the notes by time
     * @param {number} start start of the filter range in seconds
     * @param {number} end end of the filter range in seconds (exclusive)
     * @param {string} mode controls which note time to consider, one of:
     *      - start (note.start must be inside range),
     *      - end (note.end ''),
     *      - contained (both note.start and note.end must be inside range)
     *      (contained is default)
     * @returns {NoteArray} itself
     */
    sliceTime(startTime, endTime, mode = 'contained') {
        const s = startTime;
        const e = endTime;
        if (mode === 'start') {
            this.#notes = this.#notes.filter(n => n.start >= s && n.start < e);
        }
        if (mode === 'end') {
            this.#notes = this.#notes.filter(n => n.end >= s && n.end < e);
        }
        if (mode === 'contained') {
            this.#notes = this.#notes.filter(n => {
                if (n.end === null) {
                    return n => n.start >= s && n.start < e;
                }
                return n => n.start >= s && n.end < e;
            });
        }
        return this;
    }

    /**
     * Filters the NoteArray like you would filter via Array.filter().
     * @param {Function} filterFunction filter function, same signature as
     *      Array.filter()
     * @returns {NoteArray} itself
     */
    filter(filterFunction) {
        this.#notes = this.#notes.filter(filterFunction);
        return this;
    }

    /**
     * Filters by pitch, keeping only pitches specified in <pitches>
     * @param {number[]} pitches array of pitches to keep
     * @returns {NoteArray} itself
     */
    filterPitches(pitches) {
        this.#notes = this.#notes.filter(n => pitches.includes(n.pitch));
        return this;
    }

    /**
     * Transposes each note by <steps> semitones, will clip pitches to [0, 127]
     * @param {number} steps number of semitones to transpose, can be negative
     * @returns {NoteArray} itself
     */
    transpose(steps) {
        for (let n of this.#notes) {
            n.pitch = clipValue(n.pitch + steps, 0, 127);
        }
        return this;
    }

    /**
     * Reverses the note array, such that it can be played backwards.
     * @returns {NoteArray} itself
     */
    reverse() {
        // Update note start and end times
        const duration = this.getDuration();
        for (let n of this.#notes) {
            n.start = duration - n.end;
            n.end = duration - n.start;
        }
        // Sort by time
        this.sortByTime();
        return this;
    }

    /**
    * Returns true if this note and otherNote have equal attributes.
    * @param {NoteArray} otherNoteArray another NoteArray
    * @returns {boolen} true if equal
    */
    equals(otherNoteArray) {
        if (!(otherNoteArray instanceof NoteArray)) {
            return false;
        }
        const notes = otherNoteArray.getNotes();
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
     * Deep clone, all contained notes are cloned ass well.
     * @returns {NoteArray} clone
     */
    clone() {
        return new NoteArray(this.#notes);
    }
}