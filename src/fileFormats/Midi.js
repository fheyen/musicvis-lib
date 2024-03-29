/**
 * Lookup for many MIDI specifications.
 *
 * @module fileFormats/Midi
 * @see https://soundprogramming.net/file-formats/
 */

/**
 * @typedef {object} MidiNote A MIDI note
 * @property {number} pitch the MIDI note number e.g. 60 for C4
 * @property {string} name e.g. C#
 * @property {number} octave number in [-1, 9]
 * @property {string} label name and octave, e.g. C#5
 * @property {number} frequency physical frequency
 * @example <caption>Example for a MIDI note</caption>
 *      { pitch: 69, name: 'A', octave: 4, label: 'A4', frequency: 440.000 }
 */

const MidiNoteByPitch = new Map()
const MidiNoteByLabel = new Map()
const MidiInstrumentByNumber = new Map()
const MidiInstrumentByNumberLev2 = new Map()

/**
 * Returns information on the MIDI note with the specified number.
 *
 * @param {number} nr MIDI note number in [0, 127]
 * @returns {...MidiNote} MIDI note information as a {@link MidiNote}
 */
export function getMidiNoteByNr (nr) {
  return MidiNoteByPitch.get(nr)
}

/**
 * Returns information on the MIDI note with the specified label.
 *
 * @param {string} label note label, e.g. 'D#0'
 *      (upper-case and sharp notation necessary)
 * @returns {...MidiNote} MIDI note information as a {@link MidiNote}
 */
export function getMidiNoteByLabel (label) {
  return MidiNoteByLabel.get(label)
}

/**
 * Returns information on the MIDI note with the specified name and octave.
 *
 * @param {string} name note name, e.g. 'D#'
 *      (upper-case and sharp notation necessary)
 * @param {number} octave octave in [-1, 9]
 * @returns {...MidiNote} MIDI note information as a {@link MidiNote}
 */
export function getMidiNoteByNameAndOctave (name, octave) {
  return MidiNoteByLabel.get(`${name}${octave}`)
}

/**
 * Returns information on the MIDI instrument with the specified number.
 *
 * @param {number} nr MIDI instrument number in [0, 127]
 * @returns {object} note info, e.g.
 *      { number: 0, group: 'Piano', label: 'Acoustic Grand Piano' }
 */
export function getMidiInstrumentByNr (nr) {
  return MidiInstrumentByNumber.get(nr)
}

/**
 * Returns information on the MIDI instrument (MIDI level 2) with the
 * specified number.
 *
 * @param {number} nr MIDI instrument number in [0, 127]
 * @param {number} subNr MIDI instrument sub number in [0, 127]
 * @returns {object} note info, e.g.
 *      { number: 0, group: 'Piano', label: 'Acoustic Grand Piano' }
 */
export function getMidiInstrumentByNrL2 (nr, subNr) {
  const key = `${nr}-${subNr}`
  return MidiInstrumentByNumberLev2.get(key)
}

/**
 * Returns information on the MIDI instrument with the specified number.
 *
 * @param {number} nr MIDI drum note number in [27, 87]
 * @returns {string} note name, e.g. 'Bass Drum 1
 */
export function getMidiDrumNoteByNr (nr) {
  return GENERAL_MIDI_DRUM_NOTE_NUMBERS.get(nr)
}

/**
 * Returns true if a given MIDI pitch refers to a sharp note.
 *
 * @param {number} nr MIDI note number in [0, 127]
 * @returns {boolean} true if sharp, false otherwise
 */
export function isSharp (nr) {
  // return SHARPS.has(nr);
  const chroma = nr % 12
  return chroma === 1 ||
    chroma === 3 ||
    chroma === 6 ||
    chroma === 8 ||
    chroma === 10
}

/**
 * Returns a note name such as 'C#' (without octave) for a given MIDI
 * note number.
 *
 * @param {number} nr MIDI note number in [0, 127]
 * @returns {string} note name such as 'C#'
 */
export function getNoteNameFromNoteNr (nr) {
  return NOTE_NAMES[nr % 12]
}

/**
 * Maps flats to sharps, e.g. flatToSharp.get('Db') === 'C#'
 *
 * @type {Map<string,string>}
 */
export const flatToSharp = new Map([
  ['Cb', 'B'],
  ['Db', 'C#'],
  ['Eb', 'D#'],
  ['Fb', 'E'],
  ['Gb', 'F#'],
  ['Ab', 'G#'],
  ['Bb', 'A#']
])

/**
 * Maps shaprs to flats, e.g. sharpToFlat.get('C#') === 'Db'
 *
 * @type {Map<string,string>}
 */
export const sharpToFlat = new Map([
  ['C#', 'Db'],
  ['D#', 'Eb'],
  ['E#', 'F'],
  ['F#', 'Gb'],
  ['G#', 'Ab'],
  ['A#', 'Bb'],
  ['B#', 'C']
])

/**
 * Names of notes, indexed like MIDI numbers, i.e. C is 0
 *
 * @type {string[]}
 */
export const NOTE_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B'
]

/**
 * Names of notes, indexed like MIDI numbers, i.e. C is 0, with flats instead of
 * sharps.
 *
 * @type {string[]}
 */
export const NOTE_NAMES_FLAT = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B'
]

/**
 * Index equals MIDI note number
 *
 * @type {Array<MidiNote>}
 */
export const MIDI_NOTES = [
  { pitch: 0, name: 'C', octave: -1, label: 'C-1', frequency: 8.176 },
  { pitch: 1, name: 'C#', octave: -1, label: 'C#-1', frequency: 8.662 },
  { pitch: 2, name: 'D', octave: -1, label: 'D-1', frequency: 9.177 },
  { pitch: 3, name: 'D#', octave: -1, label: 'D#-1', frequency: 9.723 },
  { pitch: 4, name: 'E', octave: -1, label: 'E-1', frequency: 10.301 },
  { pitch: 5, name: 'F', octave: -1, label: 'F-1', frequency: 10.913 },
  { pitch: 6, name: 'F#', octave: -1, label: 'F#-1', frequency: 11.562 },
  { pitch: 7, name: 'G', octave: -1, label: 'G-1', frequency: 12.25 },
  { pitch: 8, name: 'G#', octave: -1, label: 'G#-1', frequency: 12.978 },
  { pitch: 9, name: 'A', octave: -1, label: 'A-1', frequency: 13.75 },
  { pitch: 10, name: 'A#', octave: -1, label: 'A#-1', frequency: 14.568 },
  { pitch: 11, name: 'B', octave: -1, label: 'B-1', frequency: 15.434 },
  { pitch: 12, name: 'C', octave: 0, label: 'C0', frequency: 16.352 },
  { pitch: 13, name: 'C#', octave: 0, label: 'C#0', frequency: 17.324 },
  { pitch: 14, name: 'D', octave: 0, label: 'D0', frequency: 18.354 },
  { pitch: 15, name: 'D#', octave: 0, label: 'D#0', frequency: 19.445 },
  { pitch: 16, name: 'E', octave: 0, label: 'E0', frequency: 20.602 },
  { pitch: 17, name: 'F', octave: 0, label: 'F0', frequency: 21.827 },
  { pitch: 18, name: 'F#', octave: 0, label: 'F#0', frequency: 23.125 },
  { pitch: 19, name: 'G', octave: 0, label: 'G0', frequency: 24.5 },
  { pitch: 20, name: 'G#', octave: 0, label: 'G#0', frequency: 25.957 },
  { pitch: 21, name: 'A', octave: 0, label: 'A0', frequency: 27.5 },
  { pitch: 22, name: 'A#', octave: 0, label: 'A#0', frequency: 29.135 },
  { pitch: 23, name: 'B', octave: 0, label: 'B0', frequency: 30.868 },
  { pitch: 24, name: 'C', octave: 1, label: 'C1', frequency: 32.703 },
  { pitch: 25, name: 'C#', octave: 1, label: 'C#1', frequency: 34.648 },
  { pitch: 26, name: 'D', octave: 1, label: 'D1', frequency: 36.708 },
  { pitch: 27, name: 'D#', octave: 1, label: 'D#1', frequency: 38.891 },
  { pitch: 28, name: 'E', octave: 1, label: 'E1', frequency: 41.203 },
  { pitch: 29, name: 'F', octave: 1, label: 'F1', frequency: 43.654 },
  { pitch: 30, name: 'F#', octave: 1, label: 'F#1', frequency: 46.249 },
  { pitch: 31, name: 'G', octave: 1, label: 'G1', frequency: 48.999 },
  { pitch: 32, name: 'G#', octave: 1, label: 'G#1', frequency: 51.913 },
  { pitch: 33, name: 'A', octave: 1, label: 'A1', frequency: 55 },
  { pitch: 34, name: 'A#', octave: 1, label: 'A#1', frequency: 58.27 },
  { pitch: 35, name: 'B', octave: 1, label: 'B1', frequency: 61.735 },
  { pitch: 36, name: 'C', octave: 2, label: 'C2', frequency: 65.406 },
  { pitch: 37, name: 'C#', octave: 2, label: 'C#2', frequency: 69.296 },
  { pitch: 38, name: 'D', octave: 2, label: 'D2', frequency: 73.416 },
  { pitch: 39, name: 'D#', octave: 2, label: 'D#2', frequency: 77.782 },
  { pitch: 40, name: 'E', octave: 2, label: 'E2', frequency: 82.407 },
  { pitch: 41, name: 'F', octave: 2, label: 'F2', frequency: 87.307 },
  { pitch: 42, name: 'F#', octave: 2, label: 'F#2', frequency: 92.499 },
  { pitch: 43, name: 'G', octave: 2, label: 'G2', frequency: 97.999 },
  { pitch: 44, name: 'G#', octave: 2, label: 'G#2', frequency: 103.826 },
  { pitch: 45, name: 'A', octave: 2, label: 'A2', frequency: 110 },
  { pitch: 46, name: 'A#', octave: 2, label: 'A#2', frequency: 116.541 },
  { pitch: 47, name: 'B', octave: 2, label: 'B2', frequency: 123.471 },
  { pitch: 48, name: 'C', octave: 3, label: 'C3', frequency: 130.813 },
  { pitch: 49, name: 'C#', octave: 3, label: 'C#3', frequency: 138.591 },
  { pitch: 50, name: 'D', octave: 3, label: 'D3', frequency: 146.832 },
  { pitch: 51, name: 'D#', octave: 3, label: 'D#3', frequency: 155.563 },
  { pitch: 52, name: 'E', octave: 3, label: 'E3', frequency: 164.814 },
  { pitch: 53, name: 'F', octave: 3, label: 'F3', frequency: 174.614 },
  { pitch: 54, name: 'F#', octave: 3, label: 'F#3', frequency: 184.997 },
  { pitch: 55, name: 'G', octave: 3, label: 'G3', frequency: 195.998 },
  { pitch: 56, name: 'G#', octave: 3, label: 'G#3', frequency: 207.652 },
  { pitch: 57, name: 'A', octave: 3, label: 'A3', frequency: 220 },
  { pitch: 58, name: 'A#', octave: 3, label: 'A#3', frequency: 233.082 },
  { pitch: 59, name: 'B', octave: 3, label: 'B3', frequency: 246.942 },
  { pitch: 60, name: 'C', octave: 4, label: 'C4', frequency: 261.626 },
  { pitch: 61, name: 'C#', octave: 4, label: 'C#4', frequency: 277.183 },
  { pitch: 62, name: 'D', octave: 4, label: 'D4', frequency: 293.665 },
  { pitch: 63, name: 'D#', octave: 4, label: 'D#4', frequency: 311.127 },
  { pitch: 64, name: 'E', octave: 4, label: 'E4', frequency: 329.628 },
  { pitch: 65, name: 'F', octave: 4, label: 'F4', frequency: 349.228 },
  { pitch: 66, name: 'F#', octave: 4, label: 'F#4', frequency: 369.994 },
  { pitch: 67, name: 'G', octave: 4, label: 'G4', frequency: 391.995 },
  { pitch: 68, name: 'G#', octave: 4, label: 'G#4', frequency: 415.305 },
  { pitch: 69, name: 'A', octave: 4, label: 'A4', frequency: 440 },
  { pitch: 70, name: 'A#', octave: 4, label: 'A#4', frequency: 466.164 },
  { pitch: 71, name: 'B', octave: 4, label: 'B4', frequency: 493.883 },
  { pitch: 72, name: 'C', octave: 5, label: 'C5', frequency: 523.251 },
  { pitch: 73, name: 'C#', octave: 5, label: 'C#5', frequency: 554.365 },
  { pitch: 74, name: 'D', octave: 5, label: 'D5', frequency: 587.33 },
  { pitch: 75, name: 'D#', octave: 5, label: 'D#5', frequency: 622.254 },
  { pitch: 76, name: 'E', octave: 5, label: 'E5', frequency: 659.255 },
  { pitch: 77, name: 'F', octave: 5, label: 'F5', frequency: 698.456 },
  { pitch: 78, name: 'F#', octave: 5, label: 'F#5', frequency: 739.989 },
  { pitch: 79, name: 'G', octave: 5, label: 'G5', frequency: 783.991 },
  { pitch: 80, name: 'G#', octave: 5, label: 'G#5', frequency: 830.609 },
  { pitch: 81, name: 'A', octave: 5, label: 'A5', frequency: 880 },
  { pitch: 82, name: 'A#', octave: 5, label: 'A#5', frequency: 932.328 },
  { pitch: 83, name: 'B', octave: 5, label: 'B5', frequency: 987.767 },
  { pitch: 84, name: 'C', octave: 6, label: 'C6', frequency: 1046.502 },
  { pitch: 85, name: 'C#', octave: 6, label: 'C#6', frequency: 1108.731 },
  { pitch: 86, name: 'D', octave: 6, label: 'D6', frequency: 1174.659 },
  { pitch: 87, name: 'D#', octave: 6, label: 'D#6', frequency: 1244.508 },
  { pitch: 88, name: 'E', octave: 6, label: 'E6', frequency: 1318.51 },
  { pitch: 89, name: 'F', octave: 6, label: 'F6', frequency: 1396.913 },
  { pitch: 90, name: 'F#', octave: 6, label: 'F#6', frequency: 1479.978 },
  { pitch: 91, name: 'G', octave: 6, label: 'G6', frequency: 1567.982 },
  { pitch: 92, name: 'G#', octave: 6, label: 'G#6', frequency: 1661.219 },
  { pitch: 93, name: 'A', octave: 6, label: 'A6', frequency: 1760 },
  { pitch: 94, name: 'A#', octave: 6, label: 'A#6', frequency: 1864.655 },
  { pitch: 95, name: 'B', octave: 6, label: 'B6', frequency: 1975.533 },
  { pitch: 96, name: 'C', octave: 7, label: 'C7', frequency: 2093.005 },
  { pitch: 97, name: 'C#', octave: 7, label: 'C#7', frequency: 2217.461 },
  { pitch: 98, name: 'D', octave: 7, label: 'D7', frequency: 2349.318 },
  { pitch: 99, name: 'D#', octave: 7, label: 'D#7', frequency: 2489.016 },
  { pitch: 100, name: 'E', octave: 7, label: 'E7', frequency: 2637.02 },
  { pitch: 101, name: 'F', octave: 7, label: 'F7', frequency: 2793.826 },
  { pitch: 102, name: 'F#', octave: 7, label: 'F#7', frequency: 2959.955 },
  { pitch: 103, name: 'G', octave: 7, label: 'G7', frequency: 3135.963 },
  { pitch: 104, name: 'G#', octave: 7, label: 'G#7', frequency: 3322.438 },
  { pitch: 105, name: 'A', octave: 7, label: 'A7', frequency: 3520 },
  { pitch: 106, name: 'A#', octave: 7, label: 'A#7', frequency: 3729.31 },
  { pitch: 107, name: 'B', octave: 7, label: 'B7', frequency: 3951.066 },
  { pitch: 108, name: 'C', octave: 8, label: 'C8', frequency: 4186.009 },
  { pitch: 109, name: 'C#', octave: 8, label: 'C#8', frequency: 4434.922 },
  { pitch: 110, name: 'D', octave: 8, label: 'D8', frequency: 4698.636 },
  { pitch: 111, name: 'D#', octave: 8, label: 'D#8', frequency: 4978.032 },
  { pitch: 112, name: 'E', octave: 8, label: 'E8', frequency: 5274.041 },
  { pitch: 113, name: 'F', octave: 8, label: 'F8', frequency: 5587.652 },
  { pitch: 114, name: 'F#', octave: 8, label: 'F#8', frequency: 5919.911 },
  { pitch: 115, name: 'G', octave: 8, label: 'G8', frequency: 6271.927 },
  { pitch: 116, name: 'G#', octave: 8, label: 'G#8', frequency: 6644.875 },
  { pitch: 117, name: 'A', octave: 8, label: 'A8', frequency: 7040 },
  { pitch: 118, name: 'A#', octave: 8, label: 'A#8', frequency: 7458.62 },
  { pitch: 119, name: 'B', octave: 8, label: 'B8', frequency: 7902.133 },
  { pitch: 120, name: 'C', octave: 9, label: 'C9', frequency: 8372.018 },
  { pitch: 121, name: 'C#', octave: 9, label: 'C#9', frequency: 8869.844 },
  { pitch: 122, name: 'D', octave: 9, label: 'D9', frequency: 9397.273 },
  { pitch: 123, name: 'D#', octave: 9, label: 'D#9', frequency: 9956.063 },
  { pitch: 124, name: 'E', octave: 9, label: 'E9', frequency: 10_548.08 },
  { pitch: 125, name: 'F', octave: 9, label: 'F9', frequency: 11_175.3 },
  { pitch: 126, name: 'F#', octave: 9, label: 'F#9', frequency: 11_839.82 },
  { pitch: 127, name: 'G', octave: 9, label: 'G9', frequency: 12_543.85 }
]

/**
 * Set of all MIDI notes that are sharp/flat
 *
 * @type {Set<number>}
 * @example <caption>Find out if a note is sharp/flat</caption>
 *      const midiNr = 42;
 *      const isSharp = Midi.SHARPS.has(midiNr);
 *      // true
 */
export const SHARPS = new Set([
  1,
  3,
  6,
  8,
  10,
  13,
  15,
  18,
  20,
  22,
  25,
  27,
  30,
  32,
  34,
  37,
  39,
  42,
  44,
  46,
  49,
  51,
  54,
  56,
  58,
  61,
  63,
  66,
  68,
  70,
  73,
  75,
  78,
  80,
  82,
  85,
  87,
  90,
  92,
  94,
  97,
  99,
  102,
  104,
  106,
  109,
  111,
  114,
  116,
  118,
  121,
  123,
  126
])

/**
 * @typedef {object} MidiCommand A MIDI command
 * @property {string} name e.g. 'noteOn'
 * @property {string} description e.g. 'Note-on'
 * @property {string[]|undefined} params additional prameters of that command
 * @example <caption>Example for a MIDI command</caption>
 *      { name: 'noteOn', description: 'Note-on', params: ['key', 'velocity'] }],
 */

/**
 * MIDI commands with code, name, and parameters
 * From: https://ccrma.stanford.edu/~craig/articles/linuxmidi/misc/essenmidi.html
 * https://www.midi.org/specifications/item/table-1-summary-of-midi-message
 *
 * @type {Map<number,MidiCommand>}
 */
export const MIDI_COMMANDS = new Map([
  [0x80, { name: 'noteOff', description: 'Note-off', params: ['key', 'velocity'] }],
  [0x90, { name: 'noteOn', description: 'Note-on', params: ['key', 'velocity'] }],
  [0xA0, { name: 'aftertouch', description: 'Aftertouch', params: ['key', 'touch'] }],
  [0xB0, { name: 'continuousController', description: 'Continuous controller', params: ['controller #', 'controller value'] }],
  [0xC0, { name: 'patchChange', description: 'Patch change', params: ['instrument number', 'instrument number'] }],
  [0xD0, { name: 'channelPressure', description: 'Channel Pressure', params: ['pressure'] }],
  [0xE0, { name: 'pitchBend', description: 'Pitch bend', params: ['lsb (7 bits)', 'msb (7 bits)'] }],
  [0xF0, { name: 'sysExStart', description: 'start of system exclusive message' }],
  [0xF1, { name: 'timeCodeQuarter', description: 'MIDI Time Code Quarter Frame (Sys Common)' }],
  [0xF2, { name: 'posPointer', description: 'Song Position Pointer (Sys Common)' }],
  [0xF3, { name: 'songSelect', description: 'Song Select (Sys Common)' }],
  [0xF4, { name: 'unknown1', description: '???' }],
  [0xF5, { name: 'unknown2', description: '???' }],
  [0xF6, { name: 'tuneRequest', description: 'Tune Request (Sys Common)' }],
  [0xF7, { name: 'syExEnd', description: 'end of system exclusive message 0' }],
  [0xF8, { name: 'timingClock', description: 'Timing Clock (Sys Realtime)' }],
  [0xFA, { name: 'start', description: 'Start (Sys Realtime)' }],
  [0xFB, { name: 'continue', description: 'Continue (Sys Realtime)' }],
  [0xFC, { name: 'stop', description: 'Stop (Sys Realtime)' }],
  [0xFD, { name: 'unknwon3', description: '???' }],
  [0xFE, { name: 'activeSensing', description: 'Active Sensing (Sys Realtime)' }],
  [0xFF, { name: 'systemReset', description: 'System Reset (Sys Realtime)' }]
])

/*
 * MIDI instruments with number, group, and label
 */
const MIDI_INSTRUMENTS = [
  { number: 0, group: 'Piano', label: 'Acoustic Grand Piano' },
  { number: 1, group: 'Piano', label: 'Bright Acoustic Piano' },
  { number: 2, group: 'Piano', label: 'Electric Grand Piano' },
  { number: 3, group: 'Piano', label: 'Honky-tonk Piano' },
  { number: 4, group: 'Piano', label: 'Electric Piano 1' },
  { number: 5, group: 'Piano', label: 'Electric Piano 2' },
  { number: 6, group: 'Piano', label: 'Harpsichord' },
  { number: 7, group: 'Piano', label: 'Clavinet' },
  { number: 8, group: 'Chromatic Percussion', label: 'Celesta' },
  { number: 9, group: 'Chromatic Percussion', label: 'Glockenspiel' },
  { number: 10, group: 'Chromatic Percussion', label: 'Music Box' },
  { number: 11, group: 'Chromatic Percussion', label: 'Vibraphone' },
  { number: 12, group: 'Chromatic Percussion', label: 'Marimba' },
  { number: 13, group: 'Chromatic Percussion', label: 'Xylophone' },
  { number: 14, group: 'Chromatic Percussion', label: 'Tubular Bells' },
  { number: 15, group: 'Chromatic Percussion', label: 'Dulcimer' },
  { number: 16, group: 'Organ', label: 'Drawbar Organ' },
  { number: 17, group: 'Organ', label: 'Percussive Organ' },
  { number: 18, group: 'Organ', label: 'Rock Organ' },
  { number: 19, group: 'Organ', label: 'Church Organ' },
  { number: 20, group: 'Organ', label: 'Reed Organ' },
  { number: 21, group: 'Organ', label: 'Accordion' },
  { number: 22, group: 'Organ', label: 'Harmonica' },
  { number: 23, group: 'Organ', label: 'Tango Accordion' },
  { number: 24, group: 'Guitar', label: 'Acoustic Guitar(nylon)' },
  { number: 25, group: 'Guitar', label: 'Acoustic Guitar(steel)' },
  { number: 26, group: 'Guitar', label: 'Electric Guitar(jazz)' },
  { number: 27, group: 'Guitar', label: 'Electric Guitar(clean)' },
  { number: 28, group: 'Guitar', label: 'Electric Guitar(muted)' },
  { number: 29, group: 'Guitar', label: 'Overdriven Guitar' },
  { number: 30, group: 'Guitar', label: 'Distortion Guitar' },
  { number: 31, group: 'Guitar', label: 'Guitar harmonics' },
  { number: 32, group: 'Bass', label: 'Acoustic Bass' },
  { number: 33, group: 'Bass', label: 'Electric Bass(finger)' },
  { number: 34, group: 'Bass', label: 'Electric Bass(pick)' },
  { number: 35, group: 'Bass', label: 'Fretless Bass' },
  { number: 36, group: 'Bass', label: 'Slap Bass 1' },
  { number: 37, group: 'Bass', label: 'Slap Bass 2' },
  { number: 38, group: 'Bass', label: 'Synth Bass 1' },
  { number: 39, group: 'Bass', label: 'Synth Bass 2' },
  { number: 40, group: 'Strings', label: 'Violin' },
  { number: 41, group: 'Strings', label: 'Viola' },
  { number: 42, group: 'Strings', label: 'Cello' },
  { number: 43, group: 'Strings', label: 'Contrabass' },
  { number: 44, group: 'Strings', label: 'Tremolo Strings' },
  { number: 45, group: 'Strings', label: 'Pizzicato Strings' },
  { number: 46, group: 'Strings', label: 'Orchestral Harp' },
  { number: 47, group: 'Strings', label: 'Timpani' },
  { number: 48, group: 'Strings (continued)', label: 'String Ensemble 1' },
  { number: 49, group: 'Strings (continued)', label: 'String Ensemble 2' },
  { number: 50, group: 'Strings (continued)', label: 'Synth Strings 1' },
  { number: 51, group: 'Strings (continued)', label: 'Synth Strings 2' },
  { number: 52, group: 'Strings (continued)', label: 'Choir Aahs' },
  { number: 53, group: 'Strings (continued)', label: 'Voice Oohs' },
  { number: 54, group: 'Strings (continued)', label: 'Synth Voice' },
  { number: 55, group: 'Strings (continued)', label: 'Orchestra Hit' },
  { number: 56, group: 'Brass', label: 'Trumpet' },
  { number: 57, group: 'Brass', label: 'Trombone' },
  { number: 58, group: 'Brass', label: 'Tuba' },
  { number: 59, group: 'Brass', label: 'Muted Trumpet' },
  { number: 60, group: 'Brass', label: 'French Horn' },
  { number: 61, group: 'Brass', label: 'Brass Section' },
  { number: 62, group: 'Brass', label: 'Synth Brass 1' },
  { number: 63, group: 'Brass', label: 'Synth Brass 2' },
  { number: 64, group: 'Reed', label: 'Soprano Sax' },
  { number: 65, group: 'Reed', label: 'Alto Sax' },
  { number: 66, group: 'Reed', label: 'Tenor Sax' },
  { number: 67, group: 'Reed', label: 'Baritone Sax' },
  { number: 68, group: 'Reed', label: 'Oboe' },
  { number: 69, group: 'Reed', label: 'English Horn' },
  { number: 70, group: 'Reed', label: 'Bassoon' },
  { number: 71, group: 'Reed', label: 'Clarinet' },
  { number: 72, group: 'Pipe', label: 'Piccolo' },
  { number: 73, group: 'Pipe', label: 'Flute' },
  { number: 74, group: 'Pipe', label: 'Recorder' },
  { number: 75, group: 'Pipe', label: 'Pan Flute' },
  { number: 76, group: 'Pipe', label: 'Blown Bottle' },
  { number: 77, group: 'Pipe', label: 'Shakuhachi' },
  { number: 78, group: 'Pipe', label: 'Whistle' },
  { number: 79, group: 'Pipe', label: 'Ocarina' },
  { number: 80, group: 'Synth Lead', label: 'Lead 1(square)' },
  { number: 81, group: 'Synth Lead', label: 'Lead 2(sawtooth)' },
  { number: 82, group: 'Synth Lead', label: 'Lead 3(calliope)' },
  { number: 83, group: 'Synth Lead', label: 'Lead 4(chiff)' },
  { number: 84, group: 'Synth Lead', label: 'Lead 5(charang)' },
  { number: 85, group: 'Synth Lead', label: 'Lead 6(voice)' },
  { number: 86, group: 'Synth Lead', label: 'Lead 7(fifths)' },
  { number: 87, group: 'Synth Lead', label: 'Lead 8(bass + lead)' },
  { number: 88, group: 'Synth Pad', label: 'Pad 1(new age)' },
  { number: 89, group: 'Synth Pad', label: 'Pad 2(warm)' },
  { number: 90, group: 'Synth Pad', label: 'Pad 3(polysynth)' },
  { number: 91, group: 'Synth Pad', label: 'Pad 4(choir)' },
  { number: 92, group: 'Synth Pad', label: 'Pad 5(bowed)' },
  { number: 93, group: 'Synth Pad', label: 'Pad 6(metallic)' },
  { number: 94, group: 'Synth Pad', label: 'Pad 7(halo)' },
  { number: 95, group: 'Synth Pad', label: 'Pad 8(sweep)' },
  { number: 96, group: 'Synth Effects', label: 'FX 1(rain)' },
  { number: 97, group: 'Synth Effects', label: 'FX 2(soundtrack)' },
  { number: 98, group: 'Synth Effects', label: 'FX 3(crystal)' },
  { number: 99, group: 'Synth Effects', label: 'FX 4(atmosphere)' },
  { number: 100, group: 'Synth Effects', label: 'FX 5(brightness)' },
  { number: 101, group: 'Synth Effects', label: 'FX 6(goblins)' },
  { number: 102, group: 'Synth Effects', label: 'FX 7(echoes)' },
  { number: 103, group: 'Synth Effects', label: 'FX 8(sci-fi)' },
  { number: 104, group: 'Ethnic', label: 'Sitar' },
  { number: 105, group: 'Ethnic', label: 'Banjo' },
  { number: 106, group: 'Ethnic', label: 'Shamisen' },
  { number: 107, group: 'Ethnic', label: 'Koto' },
  { number: 108, group: 'Ethnic', label: 'Kalimba' },
  { number: 109, group: 'Ethnic', label: 'Bag pipe' },
  { number: 110, group: 'Ethnic', label: 'Fiddle' },
  { number: 111, group: 'Ethnic', label: 'Shanai' },
  { number: 112, group: 'Percussive', label: 'Tinkle Bell' },
  { number: 113, group: 'Percussive', label: 'Agogo' },
  { number: 114, group: 'Percussive', label: 'Steel Drums' },
  { number: 115, group: 'Percussive', label: 'Woodblock' },
  { number: 116, group: 'Percussive', label: 'Taiko Drum' },
  { number: 117, group: 'Percussive', label: 'Melodic Tom' },
  { number: 118, group: 'Percussive', label: 'Synth Drum' },
  { number: 119, group: 'Sound Effects', label: 'Reverse Cymbal' },
  { number: 120, group: 'Sound Effects', label: 'Guitar Fret Noise' },
  { number: 121, group: 'Sound Effects', label: 'Breath Noise' },
  { number: 122, group: 'Sound Effects', label: 'Seashore' },
  { number: 123, group: 'Sound Effects', label: 'Bird Tweet' },
  { number: 124, group: 'Sound Effects', label: 'Telephone Ring' },
  { number: 125, group: 'Sound Effects', label: 'Helicopter' },
  { number: 126, group: 'Sound Effects', label: 'Applause' },
  { number: 127, group: 'Sound Effects', label: 'Gunshot' }
]

const MIDI_INSTRUMENTS_LEV2 = [
  { number: 1, subnumber: 0, group: 'Piano', label: 'Acoustic Grand Piano' },
  { number: 1, subnumber: 1, group: 'Piano', label: 'Wide Acoustic Grand' },
  { number: 1, subnumber: 2, group: 'Piano', label: 'Dark Acoustic Grand' },
  { number: 2, subnumber: 0, group: 'Piano', label: 'Bright Acoustic Piano' },
  { number: 2, subnumber: 1, group: 'Piano', label: 'Wide Bright Acoustic' },
  { number: 3, subnumber: 0, group: 'Piano', label: 'Electric Grand Piano' },
  { number: 3, subnumber: 1, group: 'Piano', label: 'Wide Electric Grand' },
  { number: 4, subnumber: 0, group: 'Piano', label: 'Honky-tonk Piano' },
  { number: 4, subnumber: 1, group: 'Piano', label: 'Wide Honky-tonk' },
  { number: 5, subnumber: 0, group: 'Piano', label: 'Rhodes Piano' },
  { number: 5, subnumber: 1, group: 'Piano', label: 'Detuned Electric Piano 1' },
  { number: 5, subnumber: 2, group: 'Piano', label: 'Electric Piano 1 Variation' },
  { number: 5, subnumber: 3, group: 'Piano', label: '60\'s Electric Piano' },
  { number: 6, subnumber: 0, group: 'Piano', label: 'Chorused Electric Piano' },
  { number: 6, subnumber: 1, group: 'Piano', label: 'Detuned Electric Piano 2' },
  { number: 6, subnumber: 2, group: 'Piano', label: 'Electric Piano 2 Variation' },
  { number: 6, subnumber: 3, group: 'Piano', label: 'Electric Piano Legend' },
  { number: 6, subnumber: 4, group: 'Piano', label: 'Electric Piano Phase' },
  { number: 7, subnumber: 0, group: 'Piano', label: 'Harpsichord' },
  { number: 7, subnumber: 1, group: 'Piano', label: 'Coupled Harpsichord' },
  { number: 7, subnumber: 2, group: 'Piano', label: 'Wide Harpsichord' },
  { number: 7, subnumber: 3, group: 'Piano', label: 'Open Harpsichord' },
  { number: 8, subnumber: 0, group: 'Piano', label: 'Clavinet' },
  { number: 8, subnumber: 1, group: 'Piano', label: 'Pulse Clavinet' },
  { number: 9, subnumber: 0, group: 'Chromatic Percussion', label: 'Celesta' },
  { number: 10, subnumber: 0, group: 'Chromatic Percussion', label: 'Glockenspiel' },
  { number: 11, subnumber: 0, group: 'Chromatic Percussion', label: 'Music Box' },
  { number: 12, subnumber: 0, group: 'Chromatic Percussion', label: 'Vibraphone' },
  { number: 12, subnumber: 1, group: 'Chromatic Percussion', label: 'Wet Vibraphone' },
  { number: 13, subnumber: 0, group: 'Chromatic Percussion', label: 'Marimba' },
  { number: 13, subnumber: 1, group: 'Chromatic Percussion', label: 'Wide Marimba' },
  { number: 14, subnumber: 0, group: 'Chromatic Percussion', label: 'Xylophone' },
  { number: 15, subnumber: 0, group: 'Chromatic Percussion', label: 'Tubular Bells' },
  { number: 15, subnumber: 1, group: 'Chromatic Percussion', label: 'Church Bells' },
  { number: 15, subnumber: 2, group: 'Chromatic Percussion', label: 'Carillon' },
  { number: 16, subnumber: 0, group: 'Chromatic Percussion', label: 'Dulcimer / Santur' },
  { number: 17, subnumber: 0, group: 'Organ', label: 'Hammond Organ' },
  { number: 17, subnumber: 1, group: 'Organ', label: 'Detuned Organ 1' },
  { number: 17, subnumber: 2, group: 'Organ', label: '60\'s Organ 1' },
  { number: 17, subnumber: 3, group: 'Organ', label: 'Organ 4' },
  { number: 18, subnumber: 0, group: 'Organ', label: 'Percussive Organ' },
  { number: 18, subnumber: 1, group: 'Organ', label: 'Detuned Organ 2' },
  { number: 18, subnumber: 2, group: 'Organ', label: 'Organ 5' },
  { number: 19, subnumber: 0, group: 'Organ', label: 'Rock Organ' },
  { number: 20, subnumber: 0, group: 'Organ', label: 'Church Organ 1' },
  { number: 20, subnumber: 1, group: 'Organ', label: 'Church Organ 2' },
  { number: 20, subnumber: 2, group: 'Organ', label: 'Church Organ 3' },
  { number: 21, subnumber: 0, group: 'Organ', label: 'Reed Organ' },
  { number: 21, subnumber: 1, group: 'Organ', label: 'Puff Organ' },
  { number: 22, subnumber: 0, group: 'Organ', label: 'French Accordion' },
  { number: 22, subnumber: 1, group: 'Organ', label: 'Italian Accordion' },
  { number: 23, subnumber: 0, group: 'Organ', label: 'Harmonica' },
  { number: 24, subnumber: 0, group: 'Organ', label: 'Bandoneon' },
  { number: 25, subnumber: 0, group: 'Guitar', label: 'Nylon-String Guitar' },
  { number: 25, subnumber: 1, group: 'Guitar', label: 'Ukelele' },
  { number: 25, subnumber: 2, group: 'Guitar', label: 'Open Nylon Guitar' },
  { number: 25, subnumber: 3, group: 'Guitar', label: 'Nylon Guitar 2' },
  { number: 26, subnumber: 0, group: 'Guitar', label: 'Steel-String Guitar' },
  { number: 26, subnumber: 1, group: 'Guitar', label: '12-String Guitar' },
  { number: 26, subnumber: 2, group: 'Guitar', label: 'Mandolin' },
  { number: 26, subnumber: 3, group: 'Guitar', label: 'Steel + Body' },
  { number: 27, subnumber: 0, group: 'Guitar', label: 'Jazz Guitar' },
  { number: 27, subnumber: 1, group: 'Guitar', label: 'Hawaiian Guitar' },
  { number: 28, subnumber: 0, group: 'Guitar', label: 'Clean Electric Guitar' },
  { number: 28, subnumber: 1, group: 'Guitar', label: 'Chorus Guitar' },
  { number: 28, subnumber: 2, group: 'Guitar', label: 'Mid Tone Guitar' },
  { number: 29, subnumber: 0, group: 'Guitar', label: 'Muted Electric Guitar' },
  { number: 29, subnumber: 1, group: 'Guitar', label: 'Funk Guitar' },
  { number: 29, subnumber: 2, group: 'Guitar', label: 'Funk Guitar 2' },
  { number: 29, subnumber: 3, group: 'Guitar', label: 'Jazz Man' },
  { number: 30, subnumber: 0, group: 'Guitar', label: 'Overdriven Guitar' },
  { number: 30, subnumber: 1, group: 'Guitar', label: 'Guitar Pinch' },
  { number: 31, subnumber: 0, group: 'Guitar', label: 'Distortion Guitar' },
  { number: 31, subnumber: 1, group: 'Guitar', label: 'Feedback Guitar' },
  { number: 31, subnumber: 2, group: 'Guitar', label: 'Distortion Rtm Guitar' },
  { number: 32, subnumber: 0, group: 'Guitar', label: 'Guitar Harmonics' },
  { number: 32, subnumber: 1, group: 'Guitar', label: 'Guitar Feedback' },
  { number: 33, subnumber: 0, group: 'Bass', label: 'Acoustic Bass' },
  { number: 34, subnumber: 0, group: 'Bass', label: 'Fingered Bass' },
  { number: 34, subnumber: 1, group: 'Bass', label: 'Finger Slap' },
  { number: 35, subnumber: 0, group: 'Bass', label: 'Picked Bass' },
  { number: 36, subnumber: 0, group: 'Bass', label: 'Fretless Bass' },
  { number: 37, subnumber: 0, group: 'Bass', label: 'Slap Bass 1' },
  { number: 38, subnumber: 0, group: 'Bass', label: 'Slap Bass 2' },
  { number: 39, subnumber: 0, group: 'Bass', label: 'Synth Bass 1' },
  { number: 39, subnumber: 1, group: 'Bass', label: 'Synth Bass 101' },
  { number: 39, subnumber: 2, group: 'Bass', label: 'Synth Bass 3' },
  { number: 39, subnumber: 3, group: 'Bass', label: 'Clavi Bass' },
  { number: 39, subnumber: 4, group: 'Bass', label: 'Hammer' },
  { number: 40, subnumber: 0, group: 'Bass', label: 'Synth Bass 2' },
  { number: 40, subnumber: 1, group: 'Bass', label: 'Synth Bass 4' },
  { number: 40, subnumber: 2, group: 'Bass', label: 'Rubber Bass' },
  { number: 40, subnumber: 3, group: 'Bass', label: 'Attack Pulse' },
  { number: 41, subnumber: 0, group: 'Strings', label: 'Violin' },
  { number: 41, subnumber: 1, group: 'Strings', label: 'Slow Violin' },
  { number: 42, subnumber: 0, group: 'Strings', label: 'Viola' },
  { number: 43, subnumber: 0, group: 'Strings', label: 'Cello' },
  { number: 44, subnumber: 0, group: 'Strings', label: 'Contrabass' },
  { number: 45, subnumber: 0, group: 'Strings', label: 'Tremolo Strings' },
  { number: 46, subnumber: 0, group: 'Strings', label: 'Pizzicato Strings' },
  { number: 47, subnumber: 0, group: 'Strings', label: 'Harp' },
  { number: 47, subnumber: 1, group: 'Strings', label: 'Yang Qin' },
  { number: 48, subnumber: 0, group: 'Strings', label: 'Timpani' },
  { number: 49, subnumber: 0, group: 'Orchestral Ensemble', label: 'String Ensemble' },
  { number: 49, subnumber: 1, group: 'Orchestral Ensemble', label: 'Orchestra Strings' },
  { number: 49, subnumber: 2, group: 'Orchestral Ensemble', label: '60\'s Strings' },
  { number: 50, subnumber: 0, group: 'Orchestral Ensemble', label: 'Slow String Ensemble' },
  { number: 51, subnumber: 0, group: 'Orchestral Ensemble', label: 'Synth Strings 1' },
  { number: 51, subnumber: 1, group: 'Orchestral Ensemble', label: 'Synth Strings 3' },
  { number: 52, subnumber: 0, group: 'Orchestral Ensemble', label: 'Synth Strings 2' },
  { number: 53, subnumber: 0, group: 'Orchestral Ensemble', label: 'Choir Aahs' },
  { number: 53, subnumber: 1, group: 'Orchestral Ensemble', label: 'Choir Aahs 2' },
  { number: 54, subnumber: 0, group: 'Orchestral Ensemble', label: 'Voice Oohs' },
  { number: 54, subnumber: 1, group: 'Orchestral Ensemble', label: 'Humming' },
  { number: 55, subnumber: 0, group: 'Orchestral Ensemble', label: 'Synth Voice' },
  { number: 55, subnumber: 1, group: 'Orchestral Ensemble', label: 'Analog Voice' },
  { number: 56, subnumber: 0, group: 'Orchestral Ensemble', label: 'Orchestra Hit' },
  { number: 56, subnumber: 1, group: 'Orchestral Ensemble', label: 'Bass Hit' },
  { number: 56, subnumber: 2, group: 'Orchestral Ensemble', label: '6th Hit' },
  { number: 56, subnumber: 3, group: 'Orchestral Ensemble', label: 'Euro Hit' },
  { number: 57, subnumber: 0, group: 'Brass', label: 'Trumpet' },
  { number: 57, subnumber: 1, group: 'Brass', label: 'Dark Trumpet' },
  { number: 58, subnumber: 0, group: 'Brass', label: 'Trombone' },
  { number: 58, subnumber: 1, group: 'Brass', label: 'Trombone 2' },
  { number: 58, subnumber: 2, group: 'Brass', label: 'Bright Trombone' },
  { number: 59, subnumber: 0, group: 'Brass', label: 'Tuba' },
  { number: 60, subnumber: 0, group: 'Brass', label: 'Muted Trumpet' },
  { number: 60, subnumber: 1, group: 'Brass', label: 'Muted Trumpet 2' },
  { number: 61, subnumber: 0, group: 'Brass', label: 'French Horn' },
  { number: 61, subnumber: 1, group: 'Brass', label: 'French Horn 2' },
  { number: 62, subnumber: 0, group: 'Brass', label: 'Brass Section' },
  { number: 62, subnumber: 1, group: 'Brass', label: 'Brass Section' },
  { number: 63, subnumber: 0, group: 'Brass', label: 'Synth Brass 1' },
  { number: 63, subnumber: 1, group: 'Brass', label: 'Synth Brass 3' },
  { number: 63, subnumber: 2, group: 'Brass', label: 'Analog Brass 1' },
  { number: 63, subnumber: 3, group: 'Brass', label: 'Jump Brass' },
  { number: 64, subnumber: 0, group: 'Brass', label: 'Synth Brass 2' },
  { number: 64, subnumber: 1, group: 'Brass', label: 'Synth Brass 4' },
  { number: 64, subnumber: 2, group: 'Brass', label: 'Analog Brass 2' },
  { number: 65, subnumber: 0, group: 'Reed', label: 'Soprano Sax' },
  { number: 66, subnumber: 0, group: 'Reed', label: 'Alto Sax' },
  { number: 67, subnumber: 0, group: 'Reed', label: 'Tenor Sax' },
  { number: 68, subnumber: 0, group: 'Reed', label: 'Baritone Sax' },
  { number: 69, subnumber: 0, group: 'Reed', label: 'Oboe' },
  { number: 70, subnumber: 0, group: 'Reed', label: 'English Horn' },
  { number: 71, subnumber: 0, group: 'Reed', label: 'Bassoon' },
  { number: 72, subnumber: 0, group: 'Reed', label: 'Clarinet' },
  { number: 73, subnumber: 0, group: 'Wind', label: 'Piccolo' },
  { number: 74, subnumber: 0, group: 'Wind', label: 'Flute' },
  { number: 75, subnumber: 0, group: 'Wind', label: 'Recorder' },
  { number: 76, subnumber: 0, group: 'Wind', label: 'Pan Flute' },
  { number: 77, subnumber: 0, group: 'Wind', label: 'Blown Bottle' },
  { number: 78, subnumber: 0, group: 'Wind', label: 'Shakuhachi' },
  { number: 79, subnumber: 0, group: 'Wind', label: 'Whistle' },
  { number: 80, subnumber: 0, group: 'Wind', label: 'Ocarina' },
  { number: 81, subnumber: 0, group: 'Lead', label: 'Square Lead' },
  { number: 81, subnumber: 1, group: 'Lead', label: 'Square Wave' },
  { number: 81, subnumber: 2, group: 'Lead', label: 'Sine Wave' },
  { number: 82, subnumber: 0, group: 'Lead', label: 'Saw Lead' },
  { number: 82, subnumber: 1, group: 'Lead', label: 'Saw Wave' },
  { number: 82, subnumber: 2, group: 'Lead', label: 'Doctor Solo' },
  { number: 82, subnumber: 3, group: 'Lead', label: 'Natural Lead' },
  { number: 82, subnumber: 4, group: 'Lead', label: 'Sequenced Saw' },
  { number: 83, subnumber: 0, group: 'Lead', label: 'Synth Calliope' },
  { number: 84, subnumber: 0, group: 'Lead', label: 'Chiffer Lead' },
  { number: 85, subnumber: 0, group: 'Lead', label: 'Charang' },
  { number: 85, subnumber: 1, group: 'Lead', label: 'Wire Lead' },
  { number: 86, subnumber: 0, group: 'Lead', label: 'Solo Synth Vox' },
  { number: 87, subnumber: 0, group: 'Lead', label: '5th Saw Wave' },
  { number: 88, subnumber: 0, group: 'Lead', label: 'Bass & Lead' },
  { number: 88, subnumber: 1, group: 'Lead', label: 'Delayed Lead' },
  { number: 89, subnumber: 0, group: 'Synth Pad', label: 'Fantasia Pad' },
  { number: 90, subnumber: 0, group: 'Synth Pad', label: 'Warm Pad' },
  { number: 90, subnumber: 1, group: 'Synth Pad', label: 'Sine Pad' },
  { number: 91, subnumber: 0, group: 'Synth Pad', label: 'Polysynth Pad' },
  { number: 92, subnumber: 0, group: 'Synth Pad', label: 'Space Voice Pad' },
  { number: 92, subnumber: 1, group: 'Synth Pad', label: 'Itopia' },
  { number: 93, subnumber: 0, group: 'Synth Pad', label: 'Bowed Glass Pad' },
  { number: 94, subnumber: 0, group: 'Synth Pad', label: 'Metal Pad' },
  { number: 95, subnumber: 0, group: 'Synth Pad', label: 'Halo Pad' },
  { number: 96, subnumber: 0, group: 'Synth Pad', label: 'Sweep Pad' },
  { number: 97, subnumber: 0, group: 'Synth Effects', label: 'Ice Rain' },
  { number: 98, subnumber: 0, group: 'Synth Effects', label: 'Soundtrack' },
  { number: 99, subnumber: 0, group: 'Synth Effects', label: 'Crystal' },
  { number: 99, subnumber: 1, group: 'Synth Effects', label: 'Synth Mallet' },
  { number: 100, subnumber: 0, group: 'Synth Effects', label: 'Atmosphere' },
  { number: 101, subnumber: 0, group: 'Synth Effects', label: 'Brightness' },
  { number: 102, subnumber: 0, group: 'Synth Effects', label: 'Goblin' },
  { number: 103, subnumber: 0, group: 'Synth Effects', label: 'Echo Drops' },
  { number: 103, subnumber: 1, group: 'Synth Effects', label: 'Echo Bell' },
  { number: 103, subnumber: 2, group: 'Synth Effects', label: 'Echo Pan' },
  { number: 104, subnumber: 0, group: 'Synth Effects', label: 'Star Theme' },
  { number: 105, subnumber: 0, group: 'Ethnic', label: 'Sitar' },
  { number: 105, subnumber: 1, group: 'Ethnic', label: 'Sitar 2' },
  { number: 106, subnumber: 0, group: 'Ethnic', label: 'Banjo' },
  { number: 107, subnumber: 0, group: 'Ethnic', label: 'Shamisen' },
  { number: 108, subnumber: 0, group: 'Ethnic', label: 'Koto' },
  { number: 108, subnumber: 1, group: 'Ethnic', label: 'Taisho Koto' },
  { number: 109, subnumber: 0, group: 'Ethnic', label: 'Kalimba' },
  { number: 110, subnumber: 0, group: 'Ethnic', label: 'Bagpipe' },
  { number: 111, subnumber: 0, group: 'Ethnic', label: 'Fiddle' },
  { number: 112, subnumber: 0, group: 'Ethnic', label: 'Shanai' },
  { number: 113, subnumber: 0, group: 'Percussive', label: 'Tinkle Bell' },
  { number: 114, subnumber: 0, group: 'Percussive', label: 'Agogo' },
  { number: 115, subnumber: 0, group: 'Percussive', label: 'Steel Drums' },
  { number: 116, subnumber: 0, group: 'Percussive', label: 'Woodblock' },
  { number: 116, subnumber: 1, group: 'Percussive', label: 'Castanets' },
  { number: 117, subnumber: 0, group: 'Percussive', label: 'Taiko Drum' },
  { number: 117, subnumber: 1, group: 'Percussive', label: 'Concert Bass Drum' },
  { number: 118, subnumber: 0, group: 'Percussive', label: 'Melodic Tom 1' },
  { number: 118, subnumber: 1, group: 'Percussive', label: 'Melodic Tom 2' },
  { number: 119, subnumber: 0, group: 'Percussive', label: 'Synth Drum' },
  { number: 119, subnumber: 1, group: 'Percussive', label: '808 Tom' },
  { number: 119, subnumber: 2, group: 'Percussive', label: 'Electric Percussion' },
  { number: 120, subnumber: 0, group: 'Percussive', label: 'Reverse Cymbal' },
  { number: 121, subnumber: 0, group: 'Sound Effects', label: 'Guitar Fret Noise' },
  { number: 121, subnumber: 1, group: 'Sound Effects', label: 'Guitar Cut Noise' },
  { number: 121, subnumber: 2, group: 'Sound Effects', label: 'String Slap' },
  { number: 122, subnumber: 0, group: 'Sound Effects', label: 'Breath Noise' },
  { number: 122, subnumber: 1, group: 'Sound Effects', label: 'Flute Key Click' },
  { number: 123, subnumber: 0, group: 'Sound Effects', label: 'Seashore' },
  { number: 123, subnumber: 1, group: 'Sound Effects', label: 'Rain' },
  { number: 123, subnumber: 2, group: 'Sound Effects', label: 'Thunder' },
  { number: 123, subnumber: 3, group: 'Sound Effects', label: 'Wind' },
  { number: 123, subnumber: 4, group: 'Sound Effects', label: 'Stream' },
  { number: 123, subnumber: 5, group: 'Sound Effects', label: 'Bubble' },
  { number: 124, subnumber: 0, group: 'Sound Effects', label: 'Bird Tweet' },
  { number: 124, subnumber: 1, group: 'Sound Effects', label: 'Dog' },
  { number: 124, subnumber: 2, group: 'Sound Effects', label: 'Horse Gallop' },
  { number: 124, subnumber: 3, group: 'Sound Effects', label: 'Bird 2' },
  { number: 125, subnumber: 0, group: 'Sound Effects', label: 'Telephone 1' },
  { number: 125, subnumber: 1, group: 'Sound Effects', label: 'Telephone 2' },
  { number: 125, subnumber: 2, group: 'Sound Effects', label: 'Door Creaking' },
  { number: 125, subnumber: 3, group: 'Sound Effects', label: 'Door Closing' },
  { number: 125, subnumber: 4, group: 'Sound Effects', label: 'Scratch' },
  { number: 125, subnumber: 5, group: 'Sound Effects', label: 'Wind Chimes' },
  { number: 126, subnumber: 0, group: 'Sound Effects', label: 'Helicopter' },
  { number: 126, subnumber: 1, group: 'Sound Effects', label: 'Car Engine' },
  { number: 126, subnumber: 2, group: 'Sound Effects', label: 'Car Stop' },
  { number: 126, subnumber: 3, group: 'Sound Effects', label: 'Car Pass' },
  { number: 126, subnumber: 4, group: 'Sound Effects', label: 'Car Crash' },
  { number: 126, subnumber: 5, group: 'Sound Effects', label: 'Siren' },
  { number: 126, subnumber: 6, group: 'Sound Effects', label: 'Train' },
  { number: 126, subnumber: 7, group: 'Sound Effects', label: 'Jetplane' },
  { number: 126, subnumber: 8, group: 'Sound Effects', label: 'Starship' },
  { number: 126, subnumber: 9, group: 'Sound Effects', label: 'Burst Noise' },
  { number: 127, subnumber: 0, group: 'Sound Effects', label: 'Applause' },
  { number: 127, subnumber: 1, group: 'Sound Effects', label: 'Laughing' },
  { number: 127, subnumber: 2, group: 'Sound Effects', label: 'Screaming' },
  { number: 127, subnumber: 3, group: 'Sound Effects', label: 'Punch' },
  { number: 127, subnumber: 4, group: 'Sound Effects', label: 'Heart Beat' },
  { number: 127, subnumber: 5, group: 'Sound Effects', label: 'Footsteps' },
  { number: 128, subnumber: 0, group: 'Sound Effects', label: 'Gun Shot' },
  { number: 128, subnumber: 1, group: 'Sound Effects', label: 'Machine Gun' },
  { number: 128, subnumber: 2, group: 'Sound Effects', label: 'Lasergun' },
  { number: 128, subnumber: 3, group: 'Sound Effects', label: 'Explosion' }
]

/**
 * @type {Map<number,string>}
 */
const GENERAL_MIDI_DRUM_NOTE_NUMBERS = new Map([
  [27, 'High Q(GM2)'],
  [28, 'Slap(GM2)'],
  [29, 'Scratch Push(GM2)'],
  [30, 'Scratch Pull(GM2)'],
  [31, 'Sticks(GM2)'],
  [32, 'Square Click(GM2)'],
  [33, 'Metronome Click(GM2)'],
  [34, 'Metronome Bell(GM2)'],
  [35, 'Bass Drum 2'],
  [36, 'Bass Drum 1'],
  [37, 'Side Stick'],
  [38, 'Snare Drum 1'],
  [39, 'Hand Clap'],
  [40, 'Snare Drum 2'],
  [41, 'Low Tom 2'],
  [42, 'Closed Hi-hat'],
  [43, 'Low Tom 1'],
  [44, 'Pedal Hi-hat'],
  [45, 'Mid Tom 2'],
  [46, 'Open Hi-hat'],
  [47, 'Mid Tom 1'],
  [48, 'High Tom 2'],
  [49, 'Crash Cymbal 1'],
  [50, 'High Tom 1'],
  [51, 'Ride Cymbal 1'],
  [52, 'Chinese Cymbal'],
  [53, 'Ride Bell'],
  [54, 'Tambourine'],
  [55, 'Splash Cymbal'],
  [56, 'Cowbell'],
  [57, 'Crash Cymbal 2'],
  [58, 'Vibra Slap'],
  [59, 'Ride Cymbal 2'],
  [60, 'High Bongo'],
  [61, 'Low Bongo'],
  [62, 'Mute High Conga'],
  [63, 'Open High Conga'],
  [64, 'Low Conga'],
  [65, 'High Timbale'],
  [66, 'Low Timbale'],
  [67, 'High Agogo'],
  [68, 'Low Agogo'],
  [69, 'Cabasa'],
  [70, 'Maracas'],
  [71, 'Short Whistle'],
  [72, 'Long Whistle'],
  [73, 'Short Guiro'],
  [74, 'Long Guiro'],
  [75, 'Claves'],
  [76, 'High Wood Block'],
  [77, 'Low Wood Block'],
  [78, 'Mute Cuica'],
  [79, 'Open Cuica'],
  [80, 'Mute Triangle'],
  [81, 'Open Triangle'],
  [82, 'Shaker(GM2)'],
  [83, 'Jingle Bell(GM2)'],
  [84, 'Belltree(GM2)'],
  [85, 'Castanets(GM2)'],
  [86, 'Mute Surdo(GM2)'],
  [87, 'Open Surdo(GM2)']
])

/**
 * @type {object[]}
 * @todo add instrument numbers
 * @todo This might be useful, e.g. to check which notes Player can play
 */
export const MIDI_NOTE_RANGES = [
  // Strings
  { instrNr: 40, nrL2: -1, subNrL2: -1, label: 'Violin', min: 55, max: 103 },
  { instrNr: 41, nrL2: -1, subNrL2: -1, label: 'Viola', min: 48, max: 91 },
  { instrNr: 42, nrL2: -1, subNrL2: -1, label: 'Cello', min: 36, max: 76 },
  { instrNr: -1, nrL2: -1, subNrL2: -1, label: 'Double Bass', min: 28, max: 67 },
  { instrNr: -1, nrL2: -1, subNrL2: -1, label: 'Bass Guitar', min: 28, max: 67 },
  { instrNr: -1, nrL2: -1, subNrL2: -1, label: 'Acoustic Guitar', min: 40, max: 88 },
  // Brass
  { instrNr: 58, nrL2: 59, subNrL2: 0, label: 'Tuba', min: 28, max: 58 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Bass Trombone', min: 34, max: 67 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'French Horn', min: 34, max: 77 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Trombone', min: 40, max: 72 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Trumpet', min: 55, max: 82 },
  // Woodwinds
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Piccolo', min: 74, max: 102 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Flute', min: 60, max: 96 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Oboe', min: 58, max: 91 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Alto Flute', min: 55, max: 91 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Cor Anglais (English Horn)', min: 52, max: 81 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Clarinet', min: 50, max: 94 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Bass Clarinet', min: 38, max: 77 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Bassoon', min: 34, max: 75 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Contrabassoon', min: 22, max: 53 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Soprano Recorder', min: 72, max: 98 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Alto Recorder', min: 65, max: 91 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Tenor Recorder', min: 60, max: 86 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Bass Recorder', min: 53, max: 79 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Baritone Sax', min: 36, max: 69 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Tenor Sax', min: 44, max: 76 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Alto Sax', min: 49, max: 81 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Soprano Sax', min: 56, max: 88 },
  // Tuned Percussion
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Glockenspiel', min: 79, max: 108 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Xylophone', min: 65, max: 108 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Vibraphone', min: 53, max: 89 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Marimba', min: 45, max: 96 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Bass Marimba', min: 33, max: 81 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Celeste', min: 60, max: 108 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Tubular Bells', min: 60, max: 77 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Timpani', min: 40, max: 55 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Harpsichord', min: 29, max: 89 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Kalimba', min: 60, max: 88 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: 'Harp', min: 24, max: 103 }
]

// Build lookup maps
for (const note of MIDI_NOTES) {
  MidiNoteByPitch.set(note.pitch, note)
  MidiNoteByLabel.set(note.label, note)
}
for (const instrument of MIDI_INSTRUMENTS) {
  MidiInstrumentByNumber.set(instrument.number, instrument)
}
for (const instrument of MIDI_INSTRUMENTS_LEV2) {
  const key = `${instrument.number}-${instrument.subnumber}`
  MidiInstrumentByNumberLev2.set(key, instrument)
}
