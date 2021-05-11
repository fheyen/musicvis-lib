import Note from './Note';
import GuitarNote from './GuitarNote';
import { clipValue } from '../utils/MathUtils';
import { min } from 'd3';

/**
 * This class represents an array of note objects.
 * It can be used to simplify operations on a track.
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
 *
 *   // Get Note objects back in a simple Array
 *   const transformedNotes = noteArr.getNotes();
 *   // [Note, Note, Note, ...]
 *
 *   // Or use an iterator
 *   for (const note of noteArr) {
 *       console.log(note);
 *   }
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
     * @example <caption>Getting notes as simple Note[]</caption>
     *      const na = new NoteArray(someNotes);
     *      const notes = na.getNotes();
     * @example <caption>Using an iterator instead</caption>
     *      const na = new NoteArray(someNotes);
     *      for (const note of na) {
     *          console.log(note);
     *      }
     *      // Or copy all Notes to an array with
     *      const array = [...na];
     */
    getNotes() {
        return this._notes;
    }

    /**
     * Makes this class iterable
     *
     * @yields {Note} note
     * @example <caption>Using an iterator for NoteArray</caption>
     *      const na = new NoteArray(someNotes);
     *      for (const note of na) {
     *          console.log(note);
     *      }
     */
    *[Symbol.iterator]() {
        for (const note of this._notes) {
            yield note;
        }
    }

    /**
     * Appends notes to this NoteArray
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
        this._notes.forEach(
            (element, index, array) => func(element, index, array),
        );
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
        this._notes = this._notes.map(
            (element, index, array) => mapFunction(element, index, array),
        );
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
     * The modes 'end' and 'contained' will remove all notes with end === null!
     * Notes will not be changed, e.g. start time will remain the same.
     *
     * @param {number} startTime start of the filter range in seconds
     * @param {number} endTime end of the filter range in seconds (exclusive)
     * @param {string} [mode=contained] controls which note time to consider,
     *      one of:
     *      - start: note.start must be inside range
     *      - end: note.end must be inside range
     *      - contained: BOTH note.start and note.end must be inside range
     *      - touched: EITHER start or end (or both) must be inside range)
     *      - touched-included: like touched, but also includes notes where
     *          neither start nor end inside range, but range is completely
     *          inside the note
     *      (contained is default)
     * @returns {NoteArray} itself
     * @throws {'Invalid slicing mode'} When slicing mode is not one of the
     *      above values
     */
    sliceTime(startTime, endTime, mode = 'contained') {
        const start = startTime;
        const end = endTime;
        let filterFunc;
        if (mode === 'start') {
            filterFunc = n => n.start >= start && n.start < end;
        } else if (mode === 'end') {
            filterFunc = n => n.end !== null && n.end >= start && n.end < end;
        } else if (mode === 'contained') {
            filterFunc = n => n.end !== null && n.start >= start && n.end < end;
        } else if (mode === 'touched') {
            filterFunc = n =>
                (n.start >= start && n.start <= end) ||
                (n.end !== null && n.end >= start && n.end <= end);
        } else if (mode === 'touched-included') {
            filterFunc = n =>
                // like touched
                (n.start >= start && n.start <= end) ||
                (n.end !== null && n.end >= start && n.end <= end) ||
                // filter range inside note range
                (n.end !== null && n.start <= start && n.end >= end);
        } else {
            throw new Error('Invalid slicing mode');
        }
        // eslint-disable-next-line unicorn/no-array-callback-reference
        this._notes = this._notes.filter(filterFunc);
        return this;
    }

    /**
     * Slices this NoteArray into slices by the given times. Will not return
     * NoteArrays but simple Note[][], where each item contains all notes of one
     * time slice. Do not include 0, it will be assumed as first time to slice.
     * To make sure notes are not contained twice in different slices use the
     * mode 'start'.
     *
     * @param {number[]} times points of time at which to slice (in seconds)
     * @param {string} mode see NoteArray.sliceTime()
     * @returns {Note[][]} time slices
     * @example
     *      // Slice into 1 second slices
     *      const slices = noteArray.sliceAtTimes([1, 2, 3], 'start)
     */
    sliceAtTimes(times, mode) {
        if (times.length === 0) {
            return [this._notes];
        }
        // Make sure notes at the end are also in a slice
        const duration = this.getDuration();
        if (Math.max(...times) <= duration) {
            times.push(duration + 1);
        }
        const slices = [];
        let lastTime = 0;
        for (const time of times) {
            slices.push(
                this.clone()
                    .sliceTime(lastTime, time, mode)
                    .getNotes(),
            );
            lastTime = time;
        }
        return slices;
    }

    /**
     * Segments the NoteArray into smaller ones at times where no note occurs
     * for a specified amount of time.
     * This method is useful for segmenting a recording session into separate
     * songs, riffs, licks, ...
     *
     * @param {number} gapDuration duration of seconds for a gap to be used as
     *      segmenting time
     * @param {'start-start'|'end-start'} mode gaps can either be considered as
     *      the maximum time between two note's starts or the end of the first
     *      and the start of the second note
     * @returns {Note[][]} segments
     */
    segmentAtGaps(gapDuration, mode) {
        if (this._notes.length < 2) {
            return [this._notes];
        }
        if (mode === 'start-start') {
            const notes = this.clone().sortByTime().getNotes();
            const cuts = [];
            for (let index = 1; index < notes.length; index++) {
                if (notes[index].start - notes[index - 1].start >= gapDuration) {
                    cuts.push(notes[index].start);
                }
            }
            return this.sliceAtTimes(cuts, 'start');
        } else {
            // Get blocks of occupied time in the NoteArray's duration
            const occupiedTimes = [];
            // TODO: can probably be made faster in the future
            for (const note of this._notes) {
                const { start, end } = note;
                // Check for collision
                const collisions = [];
                for (let index = 0; index < occupiedTimes.length; index++) {
                    // eslint-disable-next-line unicorn/prevent-abbreviations
                    const [s, e] = occupiedTimes[index];
                    if (
                        (s >= start && s <= end)
                        || (e >= start && e <= end)
                    ) {
                        occupiedTimes.splice(index, 1);
                        collisions.push([s, e]);
                    }
                }
                if (collisions.length === 0) {
                    // Just add note time span
                    occupiedTimes.push([start, end]);
                } else {
                    // Merge
                    const newStart = Math.min(start, ...collisions.map(d => d[0]));
                    const newEnd = Math.max(end, ...collisions.map(d => d[1]));
                    occupiedTimes.push([newStart, newEnd]);
                }
            }
            // Gaps are just between two following blocks of occupied time
            if (occupiedTimes.length === 1) {
                // One block, so no gaps
                return [this._notes];
            }
            const cuts = [];
            for (let index = 1; index < occupiedTimes.length; index++) {
                const currentStart = occupiedTimes[index][0];
                const lastEnd = occupiedTimes[index - 1][1];
                if (currentStart - lastEnd >= gapDuration) {
                    cuts.push(currentStart);
                }
            }
            return this.sliceAtTimes(cuts, 'start');
        }
    }

    /**
     * Filters the NoteArray like you would filter via Array.filter().
     *
     * @param {Function} filterFunction filter function, same signature as
     *      Array.filter()
     * @returns {NoteArray} itself
     * @example
     *      // Only keep notes longer than 1 second
     *      const filtered = noteArray.filter(note=>note.getDuration()>1);
     */
    filter(filterFunction) {
        this._notes = this._notes.filter((element, index, array) => filterFunction(element, index, array));
        return this;
    }

    /**
     * Filters by pitch, keeping only pitches specified in <pitches>
     *
     * @param {number[]|Set<number>} pitches array or Set of pitches to keep
     * @returns {NoteArray} itself
     */
    filterPitches(pitches) {
        if (!(pitches instanceof Set)) {
            pitches = new Set(pitches);
        }
        this._notes = this._notes.filter(n => pitches.has(n.pitch));
        return this;
    }

    /**
     * Transposes each note by <steps> semitones, will clip pitches to [0, 127]
     *
     * @param {number} steps number of semitones to transpose, can be negative
     * @returns {NoteArray} itself
     */
    transpose(steps) {
        this._notes = this._notes.map(n => Note.from({
            ...n,
            pitch: clipValue(n.pitch + steps, 0, 127),
        }));
        return this;
    }

    /**
     * Will set the octave of all notes to -1.
     * This might cause two notes to exist at the same time and pitch!
     *
     * @returns {NoteArray} itself
     */
    removeOctaves() {
        this._notes = this._notes.map(note => Note.from({
            ...note,
            pitch: note.pitch % 12,
        }));
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
