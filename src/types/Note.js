import { getMidiNoteByLabel, getMidiNoteByNr } from '../fileFormats/Midi.js'

/**
 * Note class that reflects MIDI properties but has
 * absolute start and end times in seconds.
 */
class Note {
  /**
     * Creates a new Note. Note.from() is preferred over using the constructor.
     *
     * @param {number} pitch pitch
     * @param {number} start start time in seconds
     * @param {number} velocity velocity
     * @param {number} channel MIDI channel
     * @param {number} end end time in seconds
     */
  constructor (
    pitch = 0,
    start = 0,
    velocity = 127,
    channel = 0,
    end = null
  ) {
    // Get note name, e.g. C#4
    if (pitch < 0 || pitch > 127) {
      throw new Error(`Invalid pitch ${pitch}`)
    }
    try {
      this.name = getMidiNoteByNr(pitch).label
    } catch {
      throw new Error(`Invalid pitch ${pitch}`)
    }
    this.pitch = pitch
    this.start = start
    this.velocity = velocity
    this.channel = channel
    this.end = end
    // TODO: breaks tests
    // const duration = end - start;
    // this.duration = Number.isNaN(duration) ? null : duration;
  }

  /**
     * Creates a Note object from an object via destructuring.
     * Use either 'end' or 'duration', if both are specified, end will be used.
     *
     * @example <caption>Using end</caption>
     *  const n = Note.from({
     *      pitch: 'C#4',     // e.g. 12 or C#4
     *      start: 0.5,       // start time in seconds
     *      end: 1.5,         // end time in seconds
     *      velocity: 127,    // MIDI velocity
     *      channel: 0,       // MIDI channel
     *  });
     * @example <caption>Using duration</caption>
     *  const n = Note.from({
     *      pitch: 'C#4',
     *      start: 0.5,
     *      duration: 1.2,
     *  });
     * @param {object} object object with at least {pitch}
     * @param {number|string} object.pitch e.G. 12 or C#4
     * @param {number} object.start start time in seconds
     * @param {number} object.end end time in seconds
     * @param {number} object.duration duration in seconds
     * @param {number} object.velocity MIDI velocity
     * @param {number} object.channel MIDI channel
     * @returns {Note} new note
     * @throws {Error} when pitch is invalid
     */
  static from (object) {
    let {
      pitch = 0,
      start = 0,
      velocity = 127,
      channel = 0,
      end = null,
      duration = null
    } = object
    // Pitch can either be a number or a string
    if ((typeof pitch === 'string') && Number.isNaN(+pitch)) {
      const note = getMidiNoteByLabel(pitch)
      if (note === null || note === undefined) {
        throw new Error('Invalid pitch for Note.from()')
      }
      pitch = note.pitch
    }
    // Use either end or duration
    if (
      (end === undefined || end === null) &&
      duration !== null &&
      !Number.isNaN(duration)
    ) {
      end = start + duration
    }
    return new Note(pitch, start, velocity, channel, end)
  }

  /**
   * Allows to sort notes by time ascending, notes with equal start time will
   * be sorted by pitch ascending.
   *
   * @param {Note} a a note to compare
   * @param {Note} b a note to compare
   * @returns {number} negative for smaller, positive for greater, 0 for euqal
   */
  static startPitchComparator (a, b) {
    return a.start !== b.start ? a.start - b.start : a.pitch - b.pitch
  }

  /**
     * Returns a copy of the Note object
     *
     * @returns {Note} new note
     */
  clone () {
    return new Note(
      this.pitch,
      this.start,
      this.velocity,
      this.channel,
      this.end
    )
  }

  /**
     * Returns the duration of this note in seconds
     *
     * @returns {number} note duration
     */
  getDuration () {
    if (this.end === null) {
      return 0
    }
    return this.end - this.start
  }

  /**
     * Returns the note's name and octave, e.g. 'C#3'
     *
     * @returns {string} note name as string
     */
  getName () {
    return this.name
  }

  /**
     * Returns the note's name WITHOUT the octave, e.g. 'C#'
     *
     * @returns {string} note name as string
     */
  getLetter () {
    return getMidiNoteByNr(this.pitch).name
  }

  /**
     * Returns the note's octave
     *
     * @returns {number} the note's octave
     */
  getOctave () {
    return getMidiNoteByNr(this.pitch).octave
  }

  /**
     * Returns a new Note where start and end are multiplied by factor
     *
     * @param {number} addedSeconds seconds to be added to start and end
     * @returns {Note} new note
     */
  shiftTime (addedSeconds) {
    const n = this.clone()
    n.start += addedSeconds
    n.end = n.end === null ? null : n.end + addedSeconds
    return n
  }

  /**
     * Returns a new Note where start and end are multiplied by factor
     *
     * @param {number} factor factor to scale start and end with
     * @returns {Note} new note
     */
  scaleTime (factor) {
    const n = this.clone()
    n.start *= factor
    n.end = n.end === null ? null : n.end * factor
    return n
  }

  /**
     * Returns true, if this Note and otherNote overlap in time.
     *
     * @param {Note} otherNote another Note
     * @returns {boolean} true if they overlap
     */
  overlapsInTime (otherNote) {
    return (this.start >= otherNote.start && this.start <= otherNote.end) ||
      (this.end >= otherNote.start && this.end <= otherNote.end)
  }

  /**
     * Returns the amount of seconds this Note and otherNote overlap in time.
     *
     * @param {Note} otherNote another Note
     * @returns {number} seconds of overlap
     */
  overlapInSeconds (otherNote) {
    if (!this.overlapsInTime(otherNote)) {
      return 0
    }
    const laterStart = Math.max(this.start, otherNote.start)
    const earlierEnd = Math.min(this.end, otherNote.end)
    return earlierEnd - laterStart
  }

  /**
     * Returns true if this note and otherNote have equal attributes.
     *
     * @param {Note} otherNote another Note
     * @returns {boolean} true if equal
     */
  equals (otherNote) {
    if (!(otherNote instanceof Note)) {
      return false
    }
    return (
      this.pitch === otherNote.pitch &&
      this.start === otherNote.start &&
      this.velocity === otherNote.velocity &&
      this.channel === otherNote.channel &&
      this.end === otherNote.end
    )
  }

  /**
     * Human-readable string representation of this Note
     *
     * @param {boolean} short if true, attribute names will be shortened
     * @returns {string} string representation
     */
  toString (short = false) {
    if (short) {
      return `Note(n: ${this.name}, p: ${this.pitch}, s: ${this.start}, e: ${this.end}, v: ${this.velocity}, c: ${this.channel})`
    }
    return `Note(name: ${this.name}, pitch: ${this.pitch}, start: ${this.start}, end: ${this.end}, velocity: ${this.velocity}, channel: ${this.channel})`
  }
}

export default Note
