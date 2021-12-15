import { getMidiNoteByLabel } from '../fileFormats/Midi.js'
import Note from './Note.js'

/**
 * Guitar note class that reflects MIDI properties but has
 * absolute start and end times in seconds and
 * information on how to play it.
 *
 * @augments Note
 */
class GuitarNote extends Note {
  /**
     * Creates a new Note
     *
     * @param {number} pitch pitch
     * @param {number} start start time in seconds
     * @param {number} velocity velocity
     * @param {number} channel MIDI channel
     * @param {number} end end time in seconds
     * @param {number} string guitar string
     * @param {number} fret guitar fret
     */
  constructor (
    pitch = 0,
    start = 0,
    velocity = 127,
    channel = 0,
    end = null,
    // This is different to the base Note class
    string = null,
    fret = null
  ) {
    super(pitch, start, velocity, channel, end)
    this.string = string
    this.fret = fret
  }

  /**
     * Creates a GuitarNote object from an object via destructuring
     *
     * @param {object} object object with at least {pitch}
     *  {
     *      pitch: number|string    e.g. 12 or C#4
     *      start: number           start time in seconds
     *      end: number             end time in seconds
     *      velocity: number        MIDI velocity
     *      channel: number         MIDI channel
     *      string: number          guitar string
     *      fret: number            guitar fret
     *  }
     * @returns {GuitarNote} new note
     * @throws {Error} when pitch is invalid
     */
  static from (object) {
    let {
      pitch = 0,
      start = 0,
      velocity = 127,
      channel = 0,
      end = null,
      // This is different to the base Note class
      string = null,
      fret = null
    } = object
    if (typeof pitch === 'string' && Number.isNaN(+pitch)) {
      const note = getMidiNoteByLabel(pitch)
      if (note === null || note === undefined) {
        throw new Error('Invalid pitch for GuitarNote.from()')
      }
      pitch = note.pitch
    }
    return new GuitarNote(
      pitch,
      start,
      velocity,
      channel,
      end,
      string,
      fret
    )
  }

  /**
     * Converts a Note to a GuitarNote
     *
     * @param {Note} note note
     * @param {number} string string
     * @param {number} fret fret
     * @returns {GuitarNote} guitar note
     */
  static fromNote (note, string, fret) {
    return new GuitarNote(
      note.pitch,
      note.start,
      note.velocity,
      note.channel,
      note.end,
      string,
      fret
    )
  }

  /**
     * Simplifies the GuitarNote to a Note
     *
     * @returns {Note} note
     */
  toNote () {
    return new Note(
      this.pitch,
      this.start,
      this.velocity,
      this.channel,
      this.end
    )
  }

  /**
     * Returns a copy of the Note object
     *
     * @returns {GuitarNote} new note
     */
  clone () {
    return new GuitarNote(
      this.pitch,
      this.start,
      this.velocity,
      this.channel,
      this.end,
      // This is different to the base Note class
      this.string,
      this.fret
    )
  }

  /**
     * Returns true if this note and otherNote have equal attributes.
     *
     * @param {GuitarNote} otherNote another GuitarNote
     * @returns {boolean} true if equal
     */
  equals (otherNote) {
    if (!(otherNote instanceof GuitarNote)) {
      return false
    }
    return (
      this.pitch === otherNote.pitch &&
            this.start === otherNote.start &&
            this.velocity === otherNote.velocity &&
            this.channel === otherNote.channel &&
            this.end === otherNote.end &&
            // This is different to the base Note class
            this.string === otherNote.string &&
            this.fret === otherNote.fret
    )
  }

  /**
     * Human-readable string representation of this GuitarNote
     *
     * @param {boolean} short if true, attribute names will be shortened
     * @returns {string} string representation
     */
  toString (short = false) {
    if (short) {
      return `GuitarNote(n: ${this.name}, p: ${this.pitch}, s: ${this.start}, e: ${this.end}, v: ${this.velocity}, c: ${this.channel}, s: ${this.string}, f: ${this.fret})`
    }
    return `GuitarNote(name: ${this.name}, pitch: ${this.pitch}, start: ${this.start}, end: ${this.end}, velocity: ${this.velocity}, channel: ${this.channel}, string: ${this.string}, fret: ${this.fret})`
  }
}

export default GuitarNote
