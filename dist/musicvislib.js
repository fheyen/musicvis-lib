// musicvis-lib v0.50.5 https://fheyen.github.io/musicvis-lib
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.musicvislib = global.musicvislib || {}));
}(this, (function (exports) { 'use strict';

  var version="0.50.5";

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
  const MidiNoteByPitch = new Map();
  const MidiNoteByLabel = new Map();
  const MidiInstrumentByNumber = new Map();
  const MidiInstrumentByNumberLev2 = new Map();
  /**
   * Returns information on the MIDI note with the specified number.
   *
   * @param {number} nr MIDI note number in [0, 127]
   * @returns {...MidiNote} MIDI note information as a {@link MidiNote}
   */

  function getMidiNoteByNr(nr) {
    return MidiNoteByPitch.get(nr);
  }
  /**
   * Returns information on the MIDI note with the specified label.
   *
   * @param {string} label note label, e.g. 'D#0'
   *      (upper-case and sharp notation necessary)
   * @returns {...MidiNote} MIDI note information as a {@link MidiNote}
   */

  function getMidiNoteByLabel(label) {
    return MidiNoteByLabel.get(label);
  }
  /**
   * Returns information on the MIDI note with the specified name and octave.
   *
   * @param {string} name note name, e.g. 'D#'
   *      (upper-case and sharp notation necessary)
   * @param {number} octave octave in [-1, 9]
   * @returns {...MidiNote} MIDI note information as a {@link MidiNote}
   */

  function getMidiNoteByNameAndOctave(name, octave) {
    return MidiNoteByLabel.get(`${name}${octave}`);
  }
  /**
   * Returns information on the MIDI instrument with the specified number.
   *
   * @param {number} nr MIDI instrument number in [0, 127]
   * @returns {object} note info, e.g.
   *      { number: 0, group: 'Piano', label: 'Acoustic Grand Piano' }
   */

  function getMidiInstrumentByNr(nr) {
    return MidiInstrumentByNumber.get(nr);
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

  function getMidiInstrumentByNrL2(nr, subNr) {
    const key = `${nr}-${subNr}`;
    return MidiInstrumentByNumberLev2.get(key);
  }
  /**
   * Returns information on the MIDI instrument with the specified number.
   *
   * @param {number} nr MIDI drum note number in [27, 87]
   * @returns {string} note name, e.g. 'Bass Drum 1
   */

  function getMidiDrumNoteByNr(nr) {
    return GENERAL_MIDI_DRUM_NOTE_NUMBERS.get(nr);
  }
  /**
   * Returns true if a given MIDI pitch refers to a sharp note.
   *
   * @param {number} nr MIDI note number in [0, 127]
   * @returns {boolean} true if sharp, false otherwise
   */

  function isSharp(nr) {
    return SHARPS.has(nr);
  }
  /**
   * Returns a note name such as 'C#' (without octave) for a given MIDI
   * note number.
   *
   * @param {number} nr MIDI note number in [0, 127]
   * @returns {string} note name such as 'C#'
   */

  function getNoteNameFromNoteNr(nr) {
    return NOTE_NAMES[nr % 12];
  }
  /**
   * Maps flats to sharps, e.g. flatToSharp.get('Db') === 'C#'
   *
   * @type {Map<string,string>}
   */

  const flatToSharp = new Map([['Cb', 'B'], ['Db', 'C#'], ['Eb', 'D#'], ['Fb', 'E'], ['Gb', 'F#'], ['Ab', 'G#'], ['Bb', 'A#']]);
  /**
   * Maps shaprs to flats, e.g. sharpToFlat.get('C#') === 'Db'
   *
   * @type {Map<string,string>}
   */

  const sharpToFlat = new Map([['C#', 'Db'], ['D#', 'Eb'], ['E#', 'F'], ['F#', 'Gb'], ['G#', 'Ab'], ['A#', 'Bb'], ['B#', 'C']]);
  /**
   * Names of notes, indexed like MIDI numbers, i.e. C is 0
   *
   * @type {string[]}
   */

  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  /**
   * Index equals MIDI note number
   *
   * @type {Array<MidiNote>}
   */

  const MIDI_NOTES = [{
    pitch: 0,
    name: 'C',
    octave: -1,
    label: 'C-1',
    frequency: 8.176
  }, {
    pitch: 1,
    name: 'C#',
    octave: -1,
    label: 'C#-1',
    frequency: 8.662
  }, {
    pitch: 2,
    name: 'D',
    octave: -1,
    label: 'D-1',
    frequency: 9.177
  }, {
    pitch: 3,
    name: 'D#',
    octave: -1,
    label: 'D#-1',
    frequency: 9.723
  }, {
    pitch: 4,
    name: 'E',
    octave: -1,
    label: 'E-1',
    frequency: 10.301
  }, {
    pitch: 5,
    name: 'F',
    octave: -1,
    label: 'F-1',
    frequency: 10.913
  }, {
    pitch: 6,
    name: 'F#',
    octave: -1,
    label: 'F#-1',
    frequency: 11.562
  }, {
    pitch: 7,
    name: 'G',
    octave: -1,
    label: 'G-1',
    frequency: 12.25
  }, {
    pitch: 8,
    name: 'G#',
    octave: -1,
    label: 'G#-1',
    frequency: 12.978
  }, {
    pitch: 9,
    name: 'A',
    octave: -1,
    label: 'A-1',
    frequency: 13.75
  }, {
    pitch: 10,
    name: 'A#',
    octave: -1,
    label: 'A#-1',
    frequency: 14.568
  }, {
    pitch: 11,
    name: 'B',
    octave: -1,
    label: 'B-1',
    frequency: 15.434
  }, {
    pitch: 12,
    name: 'C',
    octave: 0,
    label: 'C0',
    frequency: 16.352
  }, {
    pitch: 13,
    name: 'C#',
    octave: 0,
    label: 'C#0',
    frequency: 17.324
  }, {
    pitch: 14,
    name: 'D',
    octave: 0,
    label: 'D0',
    frequency: 18.354
  }, {
    pitch: 15,
    name: 'D#',
    octave: 0,
    label: 'D#0',
    frequency: 19.445
  }, {
    pitch: 16,
    name: 'E',
    octave: 0,
    label: 'E0',
    frequency: 20.602
  }, {
    pitch: 17,
    name: 'F',
    octave: 0,
    label: 'F0',
    frequency: 21.827
  }, {
    pitch: 18,
    name: 'F#',
    octave: 0,
    label: 'F#0',
    frequency: 23.125
  }, {
    pitch: 19,
    name: 'G',
    octave: 0,
    label: 'G0',
    frequency: 24.5
  }, {
    pitch: 20,
    name: 'G#',
    octave: 0,
    label: 'G#0',
    frequency: 25.957
  }, {
    pitch: 21,
    name: 'A',
    octave: 0,
    label: 'A0',
    frequency: 27.5
  }, {
    pitch: 22,
    name: 'A#',
    octave: 0,
    label: 'A#0',
    frequency: 29.135
  }, {
    pitch: 23,
    name: 'B',
    octave: 0,
    label: 'B0',
    frequency: 30.868
  }, {
    pitch: 24,
    name: 'C',
    octave: 1,
    label: 'C1',
    frequency: 32.703
  }, {
    pitch: 25,
    name: 'C#',
    octave: 1,
    label: 'C#1',
    frequency: 34.648
  }, {
    pitch: 26,
    name: 'D',
    octave: 1,
    label: 'D1',
    frequency: 36.708
  }, {
    pitch: 27,
    name: 'D#',
    octave: 1,
    label: 'D#1',
    frequency: 38.891
  }, {
    pitch: 28,
    name: 'E',
    octave: 1,
    label: 'E1',
    frequency: 41.203
  }, {
    pitch: 29,
    name: 'F',
    octave: 1,
    label: 'F1',
    frequency: 43.654
  }, {
    pitch: 30,
    name: 'F#',
    octave: 1,
    label: 'F#1',
    frequency: 46.249
  }, {
    pitch: 31,
    name: 'G',
    octave: 1,
    label: 'G1',
    frequency: 48.999
  }, {
    pitch: 32,
    name: 'G#',
    octave: 1,
    label: 'G#1',
    frequency: 51.913
  }, {
    pitch: 33,
    name: 'A',
    octave: 1,
    label: 'A1',
    frequency: 55
  }, {
    pitch: 34,
    name: 'A#',
    octave: 1,
    label: 'A#1',
    frequency: 58.27
  }, {
    pitch: 35,
    name: 'B',
    octave: 1,
    label: 'B1',
    frequency: 61.735
  }, {
    pitch: 36,
    name: 'C',
    octave: 2,
    label: 'C2',
    frequency: 65.406
  }, {
    pitch: 37,
    name: 'C#',
    octave: 2,
    label: 'C#2',
    frequency: 69.296
  }, {
    pitch: 38,
    name: 'D',
    octave: 2,
    label: 'D2',
    frequency: 73.416
  }, {
    pitch: 39,
    name: 'D#',
    octave: 2,
    label: 'D#2',
    frequency: 77.782
  }, {
    pitch: 40,
    name: 'E',
    octave: 2,
    label: 'E2',
    frequency: 82.407
  }, {
    pitch: 41,
    name: 'F',
    octave: 2,
    label: 'F2',
    frequency: 87.307
  }, {
    pitch: 42,
    name: 'F#',
    octave: 2,
    label: 'F#2',
    frequency: 92.499
  }, {
    pitch: 43,
    name: 'G',
    octave: 2,
    label: 'G2',
    frequency: 97.999
  }, {
    pitch: 44,
    name: 'G#',
    octave: 2,
    label: 'G#2',
    frequency: 103.826
  }, {
    pitch: 45,
    name: 'A',
    octave: 2,
    label: 'A2',
    frequency: 110
  }, {
    pitch: 46,
    name: 'A#',
    octave: 2,
    label: 'A#2',
    frequency: 116.541
  }, {
    pitch: 47,
    name: 'B',
    octave: 2,
    label: 'B2',
    frequency: 123.471
  }, {
    pitch: 48,
    name: 'C',
    octave: 3,
    label: 'C3',
    frequency: 130.813
  }, {
    pitch: 49,
    name: 'C#',
    octave: 3,
    label: 'C#3',
    frequency: 138.591
  }, {
    pitch: 50,
    name: 'D',
    octave: 3,
    label: 'D3',
    frequency: 146.832
  }, {
    pitch: 51,
    name: 'D#',
    octave: 3,
    label: 'D#3',
    frequency: 155.563
  }, {
    pitch: 52,
    name: 'E',
    octave: 3,
    label: 'E3',
    frequency: 164.814
  }, {
    pitch: 53,
    name: 'F',
    octave: 3,
    label: 'F3',
    frequency: 174.614
  }, {
    pitch: 54,
    name: 'F#',
    octave: 3,
    label: 'F#3',
    frequency: 184.997
  }, {
    pitch: 55,
    name: 'G',
    octave: 3,
    label: 'G3',
    frequency: 195.998
  }, {
    pitch: 56,
    name: 'G#',
    octave: 3,
    label: 'G#3',
    frequency: 207.652
  }, {
    pitch: 57,
    name: 'A',
    octave: 3,
    label: 'A3',
    frequency: 220
  }, {
    pitch: 58,
    name: 'A#',
    octave: 3,
    label: 'A#3',
    frequency: 233.082
  }, {
    pitch: 59,
    name: 'B',
    octave: 3,
    label: 'B3',
    frequency: 246.942
  }, {
    pitch: 60,
    name: 'C',
    octave: 4,
    label: 'C4',
    frequency: 261.626
  }, {
    pitch: 61,
    name: 'C#',
    octave: 4,
    label: 'C#4',
    frequency: 277.183
  }, {
    pitch: 62,
    name: 'D',
    octave: 4,
    label: 'D4',
    frequency: 293.665
  }, {
    pitch: 63,
    name: 'D#',
    octave: 4,
    label: 'D#4',
    frequency: 311.127
  }, {
    pitch: 64,
    name: 'E',
    octave: 4,
    label: 'E4',
    frequency: 329.628
  }, {
    pitch: 65,
    name: 'F',
    octave: 4,
    label: 'F4',
    frequency: 349.228
  }, {
    pitch: 66,
    name: 'F#',
    octave: 4,
    label: 'F#4',
    frequency: 369.994
  }, {
    pitch: 67,
    name: 'G',
    octave: 4,
    label: 'G4',
    frequency: 391.995
  }, {
    pitch: 68,
    name: 'G#',
    octave: 4,
    label: 'G#4',
    frequency: 415.305
  }, {
    pitch: 69,
    name: 'A',
    octave: 4,
    label: 'A4',
    frequency: 440
  }, {
    pitch: 70,
    name: 'A#',
    octave: 4,
    label: 'A#4',
    frequency: 466.164
  }, {
    pitch: 71,
    name: 'B',
    octave: 4,
    label: 'B4',
    frequency: 493.883
  }, {
    pitch: 72,
    name: 'C',
    octave: 5,
    label: 'C5',
    frequency: 523.251
  }, {
    pitch: 73,
    name: 'C#',
    octave: 5,
    label: 'C#5',
    frequency: 554.365
  }, {
    pitch: 74,
    name: 'D',
    octave: 5,
    label: 'D5',
    frequency: 587.33
  }, {
    pitch: 75,
    name: 'D#',
    octave: 5,
    label: 'D#5',
    frequency: 622.254
  }, {
    pitch: 76,
    name: 'E',
    octave: 5,
    label: 'E5',
    frequency: 659.255
  }, {
    pitch: 77,
    name: 'F',
    octave: 5,
    label: 'F5',
    frequency: 698.456
  }, {
    pitch: 78,
    name: 'F#',
    octave: 5,
    label: 'F#5',
    frequency: 739.989
  }, {
    pitch: 79,
    name: 'G',
    octave: 5,
    label: 'G5',
    frequency: 783.991
  }, {
    pitch: 80,
    name: 'G#',
    octave: 5,
    label: 'G#5',
    frequency: 830.609
  }, {
    pitch: 81,
    name: 'A',
    octave: 5,
    label: 'A5',
    frequency: 880
  }, {
    pitch: 82,
    name: 'A#',
    octave: 5,
    label: 'A#5',
    frequency: 932.328
  }, {
    pitch: 83,
    name: 'B',
    octave: 5,
    label: 'B5',
    frequency: 987.767
  }, {
    pitch: 84,
    name: 'C',
    octave: 6,
    label: 'C6',
    frequency: 1046.502
  }, {
    pitch: 85,
    name: 'C#',
    octave: 6,
    label: 'C#6',
    frequency: 1108.731
  }, {
    pitch: 86,
    name: 'D',
    octave: 6,
    label: 'D6',
    frequency: 1174.659
  }, {
    pitch: 87,
    name: 'D#',
    octave: 6,
    label: 'D#6',
    frequency: 1244.508
  }, {
    pitch: 88,
    name: 'E',
    octave: 6,
    label: 'E6',
    frequency: 1318.51
  }, {
    pitch: 89,
    name: 'F',
    octave: 6,
    label: 'F6',
    frequency: 1396.913
  }, {
    pitch: 90,
    name: 'F#',
    octave: 6,
    label: 'F#6',
    frequency: 1479.978
  }, {
    pitch: 91,
    name: 'G',
    octave: 6,
    label: 'G6',
    frequency: 1567.982
  }, {
    pitch: 92,
    name: 'G#',
    octave: 6,
    label: 'G#6',
    frequency: 1661.219
  }, {
    pitch: 93,
    name: 'A',
    octave: 6,
    label: 'A6',
    frequency: 1760
  }, {
    pitch: 94,
    name: 'A#',
    octave: 6,
    label: 'A#6',
    frequency: 1864.655
  }, {
    pitch: 95,
    name: 'B',
    octave: 6,
    label: 'B6',
    frequency: 1975.533
  }, {
    pitch: 96,
    name: 'C',
    octave: 7,
    label: 'C7',
    frequency: 2093.005
  }, {
    pitch: 97,
    name: 'C#',
    octave: 7,
    label: 'C#7',
    frequency: 2217.461
  }, {
    pitch: 98,
    name: 'D',
    octave: 7,
    label: 'D7',
    frequency: 2349.318
  }, {
    pitch: 99,
    name: 'D#',
    octave: 7,
    label: 'D#7',
    frequency: 2489.016
  }, {
    pitch: 100,
    name: 'E',
    octave: 7,
    label: 'E7',
    frequency: 2637.02
  }, {
    pitch: 101,
    name: 'F',
    octave: 7,
    label: 'F7',
    frequency: 2793.826
  }, {
    pitch: 102,
    name: 'F#',
    octave: 7,
    label: 'F#7',
    frequency: 2959.955
  }, {
    pitch: 103,
    name: 'G',
    octave: 7,
    label: 'G7',
    frequency: 3135.963
  }, {
    pitch: 104,
    name: 'G#',
    octave: 7,
    label: 'G#7',
    frequency: 3322.438
  }, {
    pitch: 105,
    name: 'A',
    octave: 7,
    label: 'A7',
    frequency: 3520
  }, {
    pitch: 106,
    name: 'A#',
    octave: 7,
    label: 'A#7',
    frequency: 3729.31
  }, {
    pitch: 107,
    name: 'B',
    octave: 7,
    label: 'B7',
    frequency: 3951.066
  }, {
    pitch: 108,
    name: 'C',
    octave: 8,
    label: 'C8',
    frequency: 4186.009
  }, {
    pitch: 109,
    name: 'C#',
    octave: 8,
    label: 'C#8',
    frequency: 4434.922
  }, {
    pitch: 110,
    name: 'D',
    octave: 8,
    label: 'D8',
    frequency: 4698.636
  }, {
    pitch: 111,
    name: 'D#',
    octave: 8,
    label: 'D#8',
    frequency: 4978.032
  }, {
    pitch: 112,
    name: 'E',
    octave: 8,
    label: 'E8',
    frequency: 5274.041
  }, {
    pitch: 113,
    name: 'F',
    octave: 8,
    label: 'F8',
    frequency: 5587.652
  }, {
    pitch: 114,
    name: 'F#',
    octave: 8,
    label: 'F#8',
    frequency: 5919.911
  }, {
    pitch: 115,
    name: 'G',
    octave: 8,
    label: 'G8',
    frequency: 6271.927
  }, {
    pitch: 116,
    name: 'G#',
    octave: 8,
    label: 'G#8',
    frequency: 6644.875
  }, {
    pitch: 117,
    name: 'A',
    octave: 8,
    label: 'A8',
    frequency: 7040
  }, {
    pitch: 118,
    name: 'A#',
    octave: 8,
    label: 'A#8',
    frequency: 7458.62
  }, {
    pitch: 119,
    name: 'B',
    octave: 8,
    label: 'B8',
    frequency: 7902.133
  }, {
    pitch: 120,
    name: 'C',
    octave: 9,
    label: 'C9',
    frequency: 8372.018
  }, {
    pitch: 121,
    name: 'C#',
    octave: 9,
    label: 'C#9',
    frequency: 8869.844
  }, {
    pitch: 122,
    name: 'D',
    octave: 9,
    label: 'D9',
    frequency: 9397.273
  }, {
    pitch: 123,
    name: 'D#',
    octave: 9,
    label: 'D#9',
    frequency: 9956.063
  }, {
    pitch: 124,
    name: 'E',
    octave: 9,
    label: 'E9',
    frequency: 10_548.08
  }, {
    pitch: 125,
    name: 'F',
    octave: 9,
    label: 'F9',
    frequency: 11_175.3
  }, {
    pitch: 126,
    name: 'F#',
    octave: 9,
    label: 'F#9',
    frequency: 11_839.82
  }, {
    pitch: 127,
    name: 'G',
    octave: 9,
    label: 'G9',
    frequency: 12_543.85
  }];
  /**
   * Set of all MIDI notes that are sharp/flat
   *
   * @type {Set<number>}
   * @example <caption>Find out if a note is sharp/flat</caption>
   *      const midiNr = 42;
   *      const isSharp = Midi.SHARPS.has(midiNr);
   *      // true
   */

  const SHARPS = new Set([1, 3, 6, 8, 10, 13, 15, 18, 20, 22, 25, 27, 30, 32, 34, 37, 39, 42, 44, 46, 49, 51, 54, 56, 58, 61, 63, 66, 68, 70, 73, 75, 78, 80, 82, 85, 87, 90, 92, 94, 97, 99, 102, 104, 106, 109, 111, 114, 116, 118, 121, 123, 126]);
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

  const MIDI_COMMANDS = new Map([[0x80, {
    name: 'noteOff',
    description: 'Note-off',
    params: ['key', 'velocity']
  }], [0x90, {
    name: 'noteOn',
    description: 'Note-on',
    params: ['key', 'velocity']
  }], [0xA0, {
    name: 'aftertouch',
    description: 'Aftertouch',
    params: ['key', 'touch']
  }], [0xB0, {
    name: 'continuousController',
    description: 'Continuous controller',
    params: ['controller #', 'controller value']
  }], [0xC0, {
    name: 'patchChange',
    description: 'Patch change',
    params: ['instrument number', 'instrument number']
  }], [0xD0, {
    name: 'channelPressure',
    description: 'Channel Pressure',
    params: ['pressure']
  }], [0xE0, {
    name: 'pitchBend',
    description: 'Pitch bend',
    params: ['lsb (7 bits)', 'msb (7 bits)']
  }], [0xF0, {
    name: 'sysExStart',
    description: 'start of system exclusive message'
  }], [0xF1, {
    name: 'timeCodeQuarter',
    description: 'MIDI Time Code Quarter Frame (Sys Common)'
  }], [0xF2, {
    name: 'posPointer',
    description: 'Song Position Pointer (Sys Common)'
  }], [0xF3, {
    name: 'songSelect',
    description: 'Song Select (Sys Common)'
  }], [0xF4, {
    name: 'unknown1',
    description: '???'
  }], [0xF5, {
    name: 'unknown2',
    description: '???'
  }], [0xF6, {
    name: 'tuneRequest',
    description: 'Tune Request (Sys Common)'
  }], [0xF7, {
    name: 'syExEnd',
    description: 'end of system exclusive message 0'
  }], [0xF8, {
    name: 'timingClock',
    description: 'Timing Clock (Sys Realtime)'
  }], [0xFA, {
    name: 'start',
    description: 'Start (Sys Realtime)'
  }], [0xFB, {
    name: 'continue',
    description: 'Continue (Sys Realtime)'
  }], [0xFC, {
    name: 'stop',
    description: 'Stop (Sys Realtime)'
  }], [0xFD, {
    name: 'unknwon3',
    description: '???'
  }], [0xFE, {
    name: 'activeSensing',
    description: 'Active Sensing (Sys Realtime)'
  }], [0xFF, {
    name: 'systemReset',
    description: 'System Reset (Sys Realtime)'
  }]]);
  /*
   * MIDI instruments with number, group, and label
   */

  const MIDI_INSTRUMENTS = [{
    number: 0,
    group: 'Piano',
    label: 'Acoustic Grand Piano'
  }, {
    number: 1,
    group: 'Piano',
    label: 'Bright Acoustic Piano'
  }, {
    number: 2,
    group: 'Piano',
    label: 'Electric Grand Piano'
  }, {
    number: 3,
    group: 'Piano',
    label: 'Honky-tonk Piano'
  }, {
    number: 4,
    group: 'Piano',
    label: 'Electric Piano 1'
  }, {
    number: 5,
    group: 'Piano',
    label: 'Electric Piano 2'
  }, {
    number: 6,
    group: 'Piano',
    label: 'Harpsichord'
  }, {
    number: 7,
    group: 'Piano',
    label: 'Clavinet'
  }, {
    number: 8,
    group: 'Chromatic Percussion',
    label: 'Celesta'
  }, {
    number: 9,
    group: 'Chromatic Percussion',
    label: 'Glockenspiel'
  }, {
    number: 10,
    group: 'Chromatic Percussion',
    label: 'Music Box'
  }, {
    number: 11,
    group: 'Chromatic Percussion',
    label: 'Vibraphone'
  }, {
    number: 12,
    group: 'Chromatic Percussion',
    label: 'Marimba'
  }, {
    number: 13,
    group: 'Chromatic Percussion',
    label: 'Xylophone'
  }, {
    number: 14,
    group: 'Chromatic Percussion',
    label: 'Tubular Bells'
  }, {
    number: 15,
    group: 'Chromatic Percussion',
    label: 'Dulcimer'
  }, {
    number: 16,
    group: 'Organ',
    label: 'Drawbar Organ'
  }, {
    number: 17,
    group: 'Organ',
    label: 'Percussive Organ'
  }, {
    number: 18,
    group: 'Organ',
    label: 'Rock Organ'
  }, {
    number: 19,
    group: 'Organ',
    label: 'Church Organ'
  }, {
    number: 20,
    group: 'Organ',
    label: 'Reed Organ'
  }, {
    number: 21,
    group: 'Organ',
    label: 'Accordion'
  }, {
    number: 22,
    group: 'Organ',
    label: 'Harmonica'
  }, {
    number: 23,
    group: 'Organ',
    label: 'Tango Accordion'
  }, {
    number: 24,
    group: 'Guitar',
    label: 'Acoustic Guitar(nylon)'
  }, {
    number: 25,
    group: 'Guitar',
    label: 'Acoustic Guitar(steel)'
  }, {
    number: 26,
    group: 'Guitar',
    label: 'Electric Guitar(jazz)'
  }, {
    number: 27,
    group: 'Guitar',
    label: 'Electric Guitar(clean)'
  }, {
    number: 28,
    group: 'Guitar',
    label: 'Electric Guitar(muted)'
  }, {
    number: 29,
    group: 'Guitar',
    label: 'Overdriven Guitar'
  }, {
    number: 30,
    group: 'Guitar',
    label: 'Distortion Guitar'
  }, {
    number: 31,
    group: 'Guitar',
    label: 'Guitar harmonics'
  }, {
    number: 32,
    group: 'Bass',
    label: 'Acoustic Bass'
  }, {
    number: 33,
    group: 'Bass',
    label: 'Electric Bass(finger)'
  }, {
    number: 34,
    group: 'Bass',
    label: 'Electric Bass(pick)'
  }, {
    number: 35,
    group: 'Bass',
    label: 'Fretless Bass'
  }, {
    number: 36,
    group: 'Bass',
    label: 'Slap Bass 1'
  }, {
    number: 37,
    group: 'Bass',
    label: 'Slap Bass 2'
  }, {
    number: 38,
    group: 'Bass',
    label: 'Synth Bass 1'
  }, {
    number: 39,
    group: 'Bass',
    label: 'Synth Bass 2'
  }, {
    number: 40,
    group: 'Strings',
    label: 'Violin'
  }, {
    number: 41,
    group: 'Strings',
    label: 'Viola'
  }, {
    number: 42,
    group: 'Strings',
    label: 'Cello'
  }, {
    number: 43,
    group: 'Strings',
    label: 'Contrabass'
  }, {
    number: 44,
    group: 'Strings',
    label: 'Tremolo Strings'
  }, {
    number: 45,
    group: 'Strings',
    label: 'Pizzicato Strings'
  }, {
    number: 46,
    group: 'Strings',
    label: 'Orchestral Harp'
  }, {
    number: 47,
    group: 'Strings',
    label: 'Timpani'
  }, {
    number: 48,
    group: 'Strings (continued)',
    label: 'String Ensemble 1'
  }, {
    number: 49,
    group: 'Strings (continued)',
    label: 'String Ensemble 2'
  }, {
    number: 50,
    group: 'Strings (continued)',
    label: 'Synth Strings 1'
  }, {
    number: 51,
    group: 'Strings (continued)',
    label: 'Synth Strings 2'
  }, {
    number: 52,
    group: 'Strings (continued)',
    label: 'Choir Aahs'
  }, {
    number: 53,
    group: 'Strings (continued)',
    label: 'Voice Oohs'
  }, {
    number: 54,
    group: 'Strings (continued)',
    label: 'Synth Voice'
  }, {
    number: 55,
    group: 'Strings (continued)',
    label: 'Orchestra Hit'
  }, {
    number: 56,
    group: 'Brass',
    label: 'Trumpet'
  }, {
    number: 57,
    group: 'Brass',
    label: 'Trombone'
  }, {
    number: 58,
    group: 'Brass',
    label: 'Tuba'
  }, {
    number: 59,
    group: 'Brass',
    label: 'Muted Trumpet'
  }, {
    number: 60,
    group: 'Brass',
    label: 'French Horn'
  }, {
    number: 61,
    group: 'Brass',
    label: 'Brass Section'
  }, {
    number: 62,
    group: 'Brass',
    label: 'Synth Brass 1'
  }, {
    number: 63,
    group: 'Brass',
    label: 'Synth Brass 2'
  }, {
    number: 64,
    group: 'Reed',
    label: 'Soprano Sax'
  }, {
    number: 65,
    group: 'Reed',
    label: 'Alto Sax'
  }, {
    number: 66,
    group: 'Reed',
    label: 'Tenor Sax'
  }, {
    number: 67,
    group: 'Reed',
    label: 'Baritone Sax'
  }, {
    number: 68,
    group: 'Reed',
    label: 'Oboe'
  }, {
    number: 69,
    group: 'Reed',
    label: 'English Horn'
  }, {
    number: 70,
    group: 'Reed',
    label: 'Bassoon'
  }, {
    number: 71,
    group: 'Reed',
    label: 'Clarinet'
  }, {
    number: 72,
    group: 'Pipe',
    label: 'Piccolo'
  }, {
    number: 73,
    group: 'Pipe',
    label: 'Flute'
  }, {
    number: 74,
    group: 'Pipe',
    label: 'Recorder'
  }, {
    number: 75,
    group: 'Pipe',
    label: 'Pan Flute'
  }, {
    number: 76,
    group: 'Pipe',
    label: 'Blown Bottle'
  }, {
    number: 77,
    group: 'Pipe',
    label: 'Shakuhachi'
  }, {
    number: 78,
    group: 'Pipe',
    label: 'Whistle'
  }, {
    number: 79,
    group: 'Pipe',
    label: 'Ocarina'
  }, {
    number: 80,
    group: 'Synth Lead',
    label: 'Lead 1(square)'
  }, {
    number: 81,
    group: 'Synth Lead',
    label: 'Lead 2(sawtooth)'
  }, {
    number: 82,
    group: 'Synth Lead',
    label: 'Lead 3(calliope)'
  }, {
    number: 83,
    group: 'Synth Lead',
    label: 'Lead 4(chiff)'
  }, {
    number: 84,
    group: 'Synth Lead',
    label: 'Lead 5(charang)'
  }, {
    number: 85,
    group: 'Synth Lead',
    label: 'Lead 6(voice)'
  }, {
    number: 86,
    group: 'Synth Lead',
    label: 'Lead 7(fifths)'
  }, {
    number: 87,
    group: 'Synth Lead',
    label: 'Lead 8(bass + lead)'
  }, {
    number: 88,
    group: 'Synth Pad',
    label: 'Pad 1(new age)'
  }, {
    number: 89,
    group: 'Synth Pad',
    label: 'Pad 2(warm)'
  }, {
    number: 90,
    group: 'Synth Pad',
    label: 'Pad 3(polysynth)'
  }, {
    number: 91,
    group: 'Synth Pad',
    label: 'Pad 4(choir)'
  }, {
    number: 92,
    group: 'Synth Pad',
    label: 'Pad 5(bowed)'
  }, {
    number: 93,
    group: 'Synth Pad',
    label: 'Pad 6(metallic)'
  }, {
    number: 94,
    group: 'Synth Pad',
    label: 'Pad 7(halo)'
  }, {
    number: 95,
    group: 'Synth Pad',
    label: 'Pad 8(sweep)'
  }, {
    number: 96,
    group: 'Synth Effects',
    label: 'FX 1(rain)'
  }, {
    number: 97,
    group: 'Synth Effects',
    label: 'FX 2(soundtrack)'
  }, {
    number: 98,
    group: 'Synth Effects',
    label: 'FX 3(crystal)'
  }, {
    number: 99,
    group: 'Synth Effects',
    label: 'FX 4(atmosphere)'
  }, {
    number: 100,
    group: 'Synth Effects',
    label: 'FX 5(brightness)'
  }, {
    number: 101,
    group: 'Synth Effects',
    label: 'FX 6(goblins)'
  }, {
    number: 102,
    group: 'Synth Effects',
    label: 'FX 7(echoes)'
  }, {
    number: 103,
    group: 'Synth Effects',
    label: 'FX 8(sci-fi)'
  }, {
    number: 104,
    group: 'Ethnic',
    label: 'Sitar'
  }, {
    number: 105,
    group: 'Ethnic',
    label: 'Banjo'
  }, {
    number: 106,
    group: 'Ethnic',
    label: 'Shamisen'
  }, {
    number: 107,
    group: 'Ethnic',
    label: 'Koto'
  }, {
    number: 108,
    group: 'Ethnic',
    label: 'Kalimba'
  }, {
    number: 109,
    group: 'Ethnic',
    label: 'Bag pipe'
  }, {
    number: 110,
    group: 'Ethnic',
    label: 'Fiddle'
  }, {
    number: 111,
    group: 'Ethnic',
    label: 'Shanai'
  }, {
    number: 112,
    group: 'Percussive',
    label: 'Tinkle Bell'
  }, {
    number: 113,
    group: 'Percussive',
    label: 'Agogo'
  }, {
    number: 114,
    group: 'Percussive',
    label: 'Steel Drums'
  }, {
    number: 115,
    group: 'Percussive',
    label: 'Woodblock'
  }, {
    number: 116,
    group: 'Percussive',
    label: 'Taiko Drum'
  }, {
    number: 117,
    group: 'Percussive',
    label: 'Melodic Tom'
  }, {
    number: 118,
    group: 'Percussive',
    label: 'Synth Drum'
  }, {
    number: 119,
    group: 'Sound Effects',
    label: 'Reverse Cymbal'
  }, {
    number: 120,
    group: 'Sound Effects',
    label: 'Guitar Fret Noise'
  }, {
    number: 121,
    group: 'Sound Effects',
    label: 'Breath Noise'
  }, {
    number: 122,
    group: 'Sound Effects',
    label: 'Seashore'
  }, {
    number: 123,
    group: 'Sound Effects',
    label: 'Bird Tweet'
  }, {
    number: 124,
    group: 'Sound Effects',
    label: 'Telephone Ring'
  }, {
    number: 125,
    group: 'Sound Effects',
    label: 'Helicopter'
  }, {
    number: 126,
    group: 'Sound Effects',
    label: 'Applause'
  }, {
    number: 127,
    group: 'Sound Effects',
    label: 'Gunshot'
  }];
  const MIDI_INSTRUMENTS_Lev2 = [{
    number: 1,
    subnumber: 0,
    group: 'Piano',
    label: 'Acoustic Grand Piano'
  }, {
    number: 1,
    subnumber: 1,
    group: 'Piano',
    label: 'Wide Acoustic Grand'
  }, {
    number: 1,
    subnumber: 2,
    group: 'Piano',
    label: 'Dark Acoustic Grand'
  }, {
    number: 2,
    subnumber: 0,
    group: 'Piano',
    label: 'Bright Acoustic Piano'
  }, {
    number: 2,
    subnumber: 1,
    group: 'Piano',
    label: 'Wide Bright Acoustic'
  }, {
    number: 3,
    subnumber: 0,
    group: 'Piano',
    label: 'Electric Grand Piano'
  }, {
    number: 3,
    subnumber: 1,
    group: 'Piano',
    label: 'Wide Electric Grand'
  }, {
    number: 4,
    subnumber: 0,
    group: 'Piano',
    label: 'Honky-tonk Piano'
  }, {
    number: 4,
    subnumber: 1,
    group: 'Piano',
    label: 'Wide Honky-tonk'
  }, {
    number: 5,
    subnumber: 0,
    group: 'Piano',
    label: 'Rhodes Piano'
  }, {
    number: 5,
    subnumber: 1,
    group: 'Piano',
    label: 'Detuned Electric Piano 1'
  }, {
    number: 5,
    subnumber: 2,
    group: 'Piano',
    label: 'Electric Piano 1 Variation'
  }, {
    number: 5,
    subnumber: 3,
    group: 'Piano',
    label: '60\'s Electric Piano'
  }, {
    number: 6,
    subnumber: 0,
    group: 'Piano',
    label: 'Chorused Electric Piano'
  }, {
    number: 6,
    subnumber: 1,
    group: 'Piano',
    label: 'Detuned Electric Piano 2'
  }, {
    number: 6,
    subnumber: 2,
    group: 'Piano',
    label: 'Electric Piano 2 Variation'
  }, {
    number: 6,
    subnumber: 3,
    group: 'Piano',
    label: 'Electric Piano Legend'
  }, {
    number: 6,
    subnumber: 4,
    group: 'Piano',
    label: 'Electric Piano Phase'
  }, {
    number: 7,
    subnumber: 0,
    group: 'Piano',
    label: 'Harpsichord'
  }, {
    number: 7,
    subnumber: 1,
    group: 'Piano',
    label: 'Coupled Harpsichord'
  }, {
    number: 7,
    subnumber: 2,
    group: 'Piano',
    label: 'Wide Harpsichord'
  }, {
    number: 7,
    subnumber: 3,
    group: 'Piano',
    label: 'Open Harpsichord'
  }, {
    number: 8,
    subnumber: 0,
    group: 'Piano',
    label: 'Clavinet'
  }, {
    number: 8,
    subnumber: 1,
    group: 'Piano',
    label: 'Pulse Clavinet'
  }, {
    number: 9,
    subnumber: 0,
    group: 'Chromatic Percussion',
    label: 'Celesta'
  }, {
    number: 10,
    subnumber: 0,
    group: 'Chromatic Percussion',
    label: 'Glockenspiel'
  }, {
    number: 11,
    subnumber: 0,
    group: 'Chromatic Percussion',
    label: 'Music Box'
  }, {
    number: 12,
    subnumber: 0,
    group: 'Chromatic Percussion',
    label: 'Vibraphone'
  }, {
    number: 12,
    subnumber: 1,
    group: 'Chromatic Percussion',
    label: 'Wet Vibraphone'
  }, {
    number: 13,
    subnumber: 0,
    group: 'Chromatic Percussion',
    label: 'Marimba'
  }, {
    number: 13,
    subnumber: 1,
    group: 'Chromatic Percussion',
    label: 'Wide Marimba'
  }, {
    number: 14,
    subnumber: 0,
    group: 'Chromatic Percussion',
    label: 'Xylophone'
  }, {
    number: 15,
    subnumber: 0,
    group: 'Chromatic Percussion',
    label: 'Tubular Bells'
  }, {
    number: 15,
    subnumber: 1,
    group: 'Chromatic Percussion',
    label: 'Church Bells'
  }, {
    number: 15,
    subnumber: 2,
    group: 'Chromatic Percussion',
    label: 'Carillon'
  }, {
    number: 16,
    subnumber: 0,
    group: 'Chromatic Percussion',
    label: 'Dulcimer / Santur'
  }, {
    number: 17,
    subnumber: 0,
    group: 'Organ',
    label: 'Hammond Organ'
  }, {
    number: 17,
    subnumber: 1,
    group: 'Organ',
    label: 'Detuned Organ 1'
  }, {
    number: 17,
    subnumber: 2,
    group: 'Organ',
    label: '60\'s Organ 1'
  }, {
    number: 17,
    subnumber: 3,
    group: 'Organ',
    label: 'Organ 4'
  }, {
    number: 18,
    subnumber: 0,
    group: 'Organ',
    label: 'Percussive Organ'
  }, {
    number: 18,
    subnumber: 1,
    group: 'Organ',
    label: 'Detuned Organ 2'
  }, {
    number: 18,
    subnumber: 2,
    group: 'Organ',
    label: 'Organ 5'
  }, {
    number: 19,
    subnumber: 0,
    group: 'Organ',
    label: 'Rock Organ'
  }, {
    number: 20,
    subnumber: 0,
    group: 'Organ',
    label: 'Church Organ 1'
  }, {
    number: 20,
    subnumber: 1,
    group: 'Organ',
    label: 'Church Organ 2'
  }, {
    number: 20,
    subnumber: 2,
    group: 'Organ',
    label: 'Church Organ 3'
  }, {
    number: 21,
    subnumber: 0,
    group: 'Organ',
    label: 'Reed Organ'
  }, {
    number: 21,
    subnumber: 1,
    group: 'Organ',
    label: 'Puff Organ'
  }, {
    number: 22,
    subnumber: 0,
    group: 'Organ',
    label: 'French Accordion'
  }, {
    number: 22,
    subnumber: 1,
    group: 'Organ',
    label: 'Italian Accordion'
  }, {
    number: 23,
    subnumber: 0,
    group: 'Organ',
    label: 'Harmonica'
  }, {
    number: 24,
    subnumber: 0,
    group: 'Organ',
    label: 'Bandoneon'
  }, {
    number: 25,
    subnumber: 0,
    group: 'Guitar',
    label: 'Nylon-String Guitar'
  }, {
    number: 25,
    subnumber: 1,
    group: 'Guitar',
    label: 'Ukelele'
  }, {
    number: 25,
    subnumber: 2,
    group: 'Guitar',
    label: 'Open Nylon Guitar'
  }, {
    number: 25,
    subnumber: 3,
    group: 'Guitar',
    label: 'Nylon Guitar 2'
  }, {
    number: 26,
    subnumber: 0,
    group: 'Guitar',
    label: 'Steel-String Guitar'
  }, {
    number: 26,
    subnumber: 1,
    group: 'Guitar',
    label: '12-String Guitar'
  }, {
    number: 26,
    subnumber: 2,
    group: 'Guitar',
    label: 'Mandolin'
  }, {
    number: 26,
    subnumber: 3,
    group: 'Guitar',
    label: 'Steel + Body'
  }, {
    number: 27,
    subnumber: 0,
    group: 'Guitar',
    label: 'Jazz Guitar'
  }, {
    number: 27,
    subnumber: 1,
    group: 'Guitar',
    label: 'Hawaiian Guitar'
  }, {
    number: 28,
    subnumber: 0,
    group: 'Guitar',
    label: 'Clean Electric Guitar'
  }, {
    number: 28,
    subnumber: 1,
    group: 'Guitar',
    label: 'Chorus Guitar'
  }, {
    number: 28,
    subnumber: 2,
    group: 'Guitar',
    label: 'Mid Tone Guitar'
  }, {
    number: 29,
    subnumber: 0,
    group: 'Guitar',
    label: 'Muted Electric Guitar'
  }, {
    number: 29,
    subnumber: 1,
    group: 'Guitar',
    label: 'Funk Guitar'
  }, {
    number: 29,
    subnumber: 2,
    group: 'Guitar',
    label: 'Funk Guitar 2'
  }, {
    number: 29,
    subnumber: 3,
    group: 'Guitar',
    label: 'Jazz Man'
  }, {
    number: 30,
    subnumber: 0,
    group: 'Guitar',
    label: 'Overdriven Guitar'
  }, {
    number: 30,
    subnumber: 1,
    group: 'Guitar',
    label: 'Guitar Pinch'
  }, {
    number: 31,
    subnumber: 0,
    group: 'Guitar',
    label: 'Distortion Guitar'
  }, {
    number: 31,
    subnumber: 1,
    group: 'Guitar',
    label: 'Feedback Guitar'
  }, {
    number: 31,
    subnumber: 2,
    group: 'Guitar',
    label: 'Distortion Rtm Guitar'
  }, {
    number: 32,
    subnumber: 0,
    group: 'Guitar',
    label: 'Guitar Harmonics'
  }, {
    number: 32,
    subnumber: 1,
    group: 'Guitar',
    label: 'Guitar Feedback'
  }, {
    number: 33,
    subnumber: 0,
    group: 'Bass',
    label: 'Acoustic Bass'
  }, {
    number: 34,
    subnumber: 0,
    group: 'Bass',
    label: 'Fingered Bass'
  }, {
    number: 34,
    subnumber: 1,
    group: 'Bass',
    label: 'Finger Slap'
  }, {
    number: 35,
    subnumber: 0,
    group: 'Bass',
    label: 'Picked Bass'
  }, {
    number: 36,
    subnumber: 0,
    group: 'Bass',
    label: 'Fretless Bass'
  }, {
    number: 37,
    subnumber: 0,
    group: 'Bass',
    label: 'Slap Bass 1'
  }, {
    number: 38,
    subnumber: 0,
    group: 'Bass',
    label: 'Slap Bass 2'
  }, {
    number: 39,
    subnumber: 0,
    group: 'Bass',
    label: 'Synth Bass 1'
  }, {
    number: 39,
    subnumber: 1,
    group: 'Bass',
    label: 'Synth Bass 101'
  }, {
    number: 39,
    subnumber: 2,
    group: 'Bass',
    label: 'Synth Bass 3'
  }, {
    number: 39,
    subnumber: 3,
    group: 'Bass',
    label: 'Clavi Bass'
  }, {
    number: 39,
    subnumber: 4,
    group: 'Bass',
    label: 'Hammer'
  }, {
    number: 40,
    subnumber: 0,
    group: 'Bass',
    label: 'Synth Bass 2'
  }, {
    number: 40,
    subnumber: 1,
    group: 'Bass',
    label: 'Synth Bass 4'
  }, {
    number: 40,
    subnumber: 2,
    group: 'Bass',
    label: 'Rubber Bass'
  }, {
    number: 40,
    subnumber: 3,
    group: 'Bass',
    label: 'Attack Pulse'
  }, {
    number: 41,
    subnumber: 0,
    group: 'Strings',
    label: 'Violin'
  }, {
    number: 41,
    subnumber: 1,
    group: 'Strings',
    label: 'Slow Violin'
  }, {
    number: 42,
    subnumber: 0,
    group: 'Strings',
    label: 'Viola'
  }, {
    number: 43,
    subnumber: 0,
    group: 'Strings',
    label: 'Cello'
  }, {
    number: 44,
    subnumber: 0,
    group: 'Strings',
    label: 'Contrabass'
  }, {
    number: 45,
    subnumber: 0,
    group: 'Strings',
    label: 'Tremolo Strings'
  }, {
    number: 46,
    subnumber: 0,
    group: 'Strings',
    label: 'Pizzicato Strings'
  }, {
    number: 47,
    subnumber: 0,
    group: 'Strings',
    label: 'Harp'
  }, {
    number: 47,
    subnumber: 1,
    group: 'Strings',
    label: 'Yang Qin'
  }, {
    number: 48,
    subnumber: 0,
    group: 'Strings',
    label: 'Timpani'
  }, {
    number: 49,
    subnumber: 0,
    group: 'Orchestral Ensemble',
    label: 'String Ensemble'
  }, {
    number: 49,
    subnumber: 1,
    group: 'Orchestral Ensemble',
    label: 'Orchestra Strings'
  }, {
    number: 49,
    subnumber: 2,
    group: 'Orchestral Ensemble',
    label: '60\'s Strings'
  }, {
    number: 50,
    subnumber: 0,
    group: 'Orchestral Ensemble',
    label: 'Slow String Ensemble'
  }, {
    number: 51,
    subnumber: 0,
    group: 'Orchestral Ensemble',
    label: 'Synth Strings 1'
  }, {
    number: 51,
    subnumber: 1,
    group: 'Orchestral Ensemble',
    label: 'Synth Strings 3'
  }, {
    number: 52,
    subnumber: 0,
    group: 'Orchestral Ensemble',
    label: 'Synth Strings 2'
  }, {
    number: 53,
    subnumber: 0,
    group: 'Orchestral Ensemble',
    label: 'Choir Aahs'
  }, {
    number: 53,
    subnumber: 1,
    group: 'Orchestral Ensemble',
    label: 'Choir Aahs 2'
  }, {
    number: 54,
    subnumber: 0,
    group: 'Orchestral Ensemble',
    label: 'Voice Oohs'
  }, {
    number: 54,
    subnumber: 1,
    group: 'Orchestral Ensemble',
    label: 'Humming'
  }, {
    number: 55,
    subnumber: 0,
    group: 'Orchestral Ensemble',
    label: 'Synth Voice'
  }, {
    number: 55,
    subnumber: 1,
    group: 'Orchestral Ensemble',
    label: 'Analog Voice'
  }, {
    number: 56,
    subnumber: 0,
    group: 'Orchestral Ensemble',
    label: 'Orchestra Hit'
  }, {
    number: 56,
    subnumber: 1,
    group: 'Orchestral Ensemble',
    label: 'Bass Hit'
  }, {
    number: 56,
    subnumber: 2,
    group: 'Orchestral Ensemble',
    label: '6th Hit'
  }, {
    number: 56,
    subnumber: 3,
    group: 'Orchestral Ensemble',
    label: 'Euro Hit'
  }, {
    number: 57,
    subnumber: 0,
    group: 'Brass',
    label: 'Trumpet'
  }, {
    number: 57,
    subnumber: 1,
    group: 'Brass',
    label: 'Dark Trumpet'
  }, {
    number: 58,
    subnumber: 0,
    group: 'Brass',
    label: 'Trombone'
  }, {
    number: 58,
    subnumber: 1,
    group: 'Brass',
    label: 'Trombone 2'
  }, {
    number: 58,
    subnumber: 2,
    group: 'Brass',
    label: 'Bright Trombone'
  }, {
    number: 59,
    subnumber: 0,
    group: 'Brass',
    label: 'Tuba'
  }, {
    number: 60,
    subnumber: 0,
    group: 'Brass',
    label: 'Muted Trumpet'
  }, {
    number: 60,
    subnumber: 1,
    group: 'Brass',
    label: 'Muted Trumpet 2'
  }, {
    number: 61,
    subnumber: 0,
    group: 'Brass',
    label: 'French Horn'
  }, {
    number: 61,
    subnumber: 1,
    group: 'Brass',
    label: 'French Horn 2'
  }, {
    number: 62,
    subnumber: 0,
    group: 'Brass',
    label: 'Brass Section'
  }, {
    number: 62,
    subnumber: 1,
    group: 'Brass',
    label: 'Brass Section'
  }, {
    number: 63,
    subnumber: 0,
    group: 'Brass',
    label: 'Synth Brass 1'
  }, {
    number: 63,
    subnumber: 1,
    group: 'Brass',
    label: 'Synth Brass 3'
  }, {
    number: 63,
    subnumber: 2,
    group: 'Brass',
    label: 'Analog Brass 1'
  }, {
    number: 63,
    subnumber: 3,
    group: 'Brass',
    label: 'Jump Brass'
  }, {
    number: 64,
    subnumber: 0,
    group: 'Brass',
    label: 'Synth Brass 2'
  }, {
    number: 64,
    subnumber: 1,
    group: 'Brass',
    label: 'Synth Brass 4'
  }, {
    number: 64,
    subnumber: 2,
    group: 'Brass',
    label: 'Analog Brass 2'
  }, {
    number: 65,
    subnumber: 0,
    group: 'Reed',
    label: 'Soprano Sax'
  }, {
    number: 66,
    subnumber: 0,
    group: 'Reed',
    label: 'Alto Sax'
  }, {
    number: 67,
    subnumber: 0,
    group: 'Reed',
    label: 'Tenor Sax'
  }, {
    number: 68,
    subnumber: 0,
    group: 'Reed',
    label: 'Baritone Sax'
  }, {
    number: 69,
    subnumber: 0,
    group: 'Reed',
    label: 'Oboe'
  }, {
    number: 70,
    subnumber: 0,
    group: 'Reed',
    label: 'English Horn'
  }, {
    number: 71,
    subnumber: 0,
    group: 'Reed',
    label: 'Bassoon'
  }, {
    number: 72,
    subnumber: 0,
    group: 'Reed',
    label: 'Clarinet'
  }, {
    number: 73,
    subnumber: 0,
    group: 'Wind',
    label: 'Piccolo'
  }, {
    number: 74,
    subnumber: 0,
    group: 'Wind',
    label: 'Flute'
  }, {
    number: 75,
    subnumber: 0,
    group: 'Wind',
    label: 'Recorder'
  }, {
    number: 76,
    subnumber: 0,
    group: 'Wind',
    label: 'Pan Flute'
  }, {
    number: 77,
    subnumber: 0,
    group: 'Wind',
    label: 'Blown Bottle'
  }, {
    number: 78,
    subnumber: 0,
    group: 'Wind',
    label: 'Shakuhachi'
  }, {
    number: 79,
    subnumber: 0,
    group: 'Wind',
    label: 'Whistle'
  }, {
    number: 80,
    subnumber: 0,
    group: 'Wind',
    label: 'Ocarina'
  }, {
    number: 81,
    subnumber: 0,
    group: 'Lead',
    label: 'Square Lead'
  }, {
    number: 81,
    subnumber: 1,
    group: 'Lead',
    label: 'Square Wave'
  }, {
    number: 81,
    subnumber: 2,
    group: 'Lead',
    label: 'Sine Wave'
  }, {
    number: 82,
    subnumber: 0,
    group: 'Lead',
    label: 'Saw Lead'
  }, {
    number: 82,
    subnumber: 1,
    group: 'Lead',
    label: 'Saw Wave'
  }, {
    number: 82,
    subnumber: 2,
    group: 'Lead',
    label: 'Doctor Solo'
  }, {
    number: 82,
    subnumber: 3,
    group: 'Lead',
    label: 'Natural Lead'
  }, {
    number: 82,
    subnumber: 4,
    group: 'Lead',
    label: 'Sequenced Saw'
  }, {
    number: 83,
    subnumber: 0,
    group: 'Lead',
    label: 'Synth Calliope'
  }, {
    number: 84,
    subnumber: 0,
    group: 'Lead',
    label: 'Chiffer Lead'
  }, {
    number: 85,
    subnumber: 0,
    group: 'Lead',
    label: 'Charang'
  }, {
    number: 85,
    subnumber: 1,
    group: 'Lead',
    label: 'Wire Lead'
  }, {
    number: 86,
    subnumber: 0,
    group: 'Lead',
    label: 'Solo Synth Vox'
  }, {
    number: 87,
    subnumber: 0,
    group: 'Lead',
    label: '5th Saw Wave'
  }, {
    number: 88,
    subnumber: 0,
    group: 'Lead',
    label: 'Bass & Lead'
  }, {
    number: 88,
    subnumber: 1,
    group: 'Lead',
    label: 'Delayed Lead'
  }, {
    number: 89,
    subnumber: 0,
    group: 'Synth Pad',
    label: 'Fantasia Pad'
  }, {
    number: 90,
    subnumber: 0,
    group: 'Synth Pad',
    label: 'Warm Pad'
  }, {
    number: 90,
    subnumber: 1,
    group: 'Synth Pad',
    label: 'Sine Pad'
  }, {
    number: 91,
    subnumber: 0,
    group: 'Synth Pad',
    label: 'Polysynth Pad'
  }, {
    number: 92,
    subnumber: 0,
    group: 'Synth Pad',
    label: 'Space Voice Pad'
  }, {
    number: 92,
    subnumber: 1,
    group: 'Synth Pad',
    label: 'Itopia'
  }, {
    number: 93,
    subnumber: 0,
    group: 'Synth Pad',
    label: 'Bowed Glass Pad'
  }, {
    number: 94,
    subnumber: 0,
    group: 'Synth Pad',
    label: 'Metal Pad'
  }, {
    number: 95,
    subnumber: 0,
    group: 'Synth Pad',
    label: 'Halo Pad'
  }, {
    number: 96,
    subnumber: 0,
    group: 'Synth Pad',
    label: 'Sweep Pad'
  }, {
    number: 97,
    subnumber: 0,
    group: 'Synth Effects',
    label: 'Ice Rain'
  }, {
    number: 98,
    subnumber: 0,
    group: 'Synth Effects',
    label: 'Soundtrack'
  }, {
    number: 99,
    subnumber: 0,
    group: 'Synth Effects',
    label: 'Crystal'
  }, {
    number: 99,
    subnumber: 1,
    group: 'Synth Effects',
    label: 'Synth Mallet'
  }, {
    number: 100,
    subnumber: 0,
    group: 'Synth Effects',
    label: 'Atmosphere'
  }, {
    number: 101,
    subnumber: 0,
    group: 'Synth Effects',
    label: 'Brightness'
  }, {
    number: 102,
    subnumber: 0,
    group: 'Synth Effects',
    label: 'Goblin'
  }, {
    number: 103,
    subnumber: 0,
    group: 'Synth Effects',
    label: 'Echo Drops'
  }, {
    number: 103,
    subnumber: 1,
    group: 'Synth Effects',
    label: 'Echo Bell'
  }, {
    number: 103,
    subnumber: 2,
    group: 'Synth Effects',
    label: 'Echo Pan'
  }, {
    number: 104,
    subnumber: 0,
    group: 'Synth Effects',
    label: 'Star Theme'
  }, {
    number: 105,
    subnumber: 0,
    group: 'Ethnic',
    label: 'Sitar'
  }, {
    number: 105,
    subnumber: 1,
    group: 'Ethnic',
    label: 'Sitar 2'
  }, {
    number: 106,
    subnumber: 0,
    group: 'Ethnic',
    label: 'Banjo'
  }, {
    number: 107,
    subnumber: 0,
    group: 'Ethnic',
    label: 'Shamisen'
  }, {
    number: 108,
    subnumber: 0,
    group: 'Ethnic',
    label: 'Koto'
  }, {
    number: 108,
    subnumber: 1,
    group: 'Ethnic',
    label: 'Taisho Koto'
  }, {
    number: 109,
    subnumber: 0,
    group: 'Ethnic',
    label: 'Kalimba'
  }, {
    number: 110,
    subnumber: 0,
    group: 'Ethnic',
    label: 'Bagpipe'
  }, {
    number: 111,
    subnumber: 0,
    group: 'Ethnic',
    label: 'Fiddle'
  }, {
    number: 112,
    subnumber: 0,
    group: 'Ethnic',
    label: 'Shanai'
  }, {
    number: 113,
    subnumber: 0,
    group: 'Percussive',
    label: 'Tinkle Bell'
  }, {
    number: 114,
    subnumber: 0,
    group: 'Percussive',
    label: 'Agogo'
  }, {
    number: 115,
    subnumber: 0,
    group: 'Percussive',
    label: 'Steel Drums'
  }, {
    number: 116,
    subnumber: 0,
    group: 'Percussive',
    label: 'Woodblock'
  }, {
    number: 116,
    subnumber: 1,
    group: 'Percussive',
    label: 'Castanets'
  }, {
    number: 117,
    subnumber: 0,
    group: 'Percussive',
    label: 'Taiko Drum'
  }, {
    number: 117,
    subnumber: 1,
    group: 'Percussive',
    label: 'Concert Bass Drum'
  }, {
    number: 118,
    subnumber: 0,
    group: 'Percussive',
    label: 'Melodic Tom 1'
  }, {
    number: 118,
    subnumber: 1,
    group: 'Percussive',
    label: 'Melodic Tom 2'
  }, {
    number: 119,
    subnumber: 0,
    group: 'Percussive',
    label: 'Synth Drum'
  }, {
    number: 119,
    subnumber: 1,
    group: 'Percussive',
    label: '808 Tom'
  }, {
    number: 119,
    subnumber: 2,
    group: 'Percussive',
    label: 'Electric Percussion'
  }, {
    number: 120,
    subnumber: 0,
    group: 'Percussive',
    label: 'Reverse Cymbal'
  }, {
    number: 121,
    subnumber: 0,
    group: 'Sound Effects',
    label: 'Guitar Fret Noise'
  }, {
    number: 121,
    subnumber: 1,
    group: 'Sound Effects',
    label: 'Guitar Cut Noise'
  }, {
    number: 121,
    subnumber: 2,
    group: 'Sound Effects',
    label: 'String Slap'
  }, {
    number: 122,
    subnumber: 0,
    group: 'Sound Effects',
    label: 'Breath Noise'
  }, {
    number: 122,
    subnumber: 1,
    group: 'Sound Effects',
    label: 'Flute Key Click'
  }, {
    number: 123,
    subnumber: 0,
    group: 'Sound Effects',
    label: 'Seashore'
  }, {
    number: 123,
    subnumber: 1,
    group: 'Sound Effects',
    label: 'Rain'
  }, {
    number: 123,
    subnumber: 2,
    group: 'Sound Effects',
    label: 'Thunder'
  }, {
    number: 123,
    subnumber: 3,
    group: 'Sound Effects',
    label: 'Wind'
  }, {
    number: 123,
    subnumber: 4,
    group: 'Sound Effects',
    label: 'Stream'
  }, {
    number: 123,
    subnumber: 5,
    group: 'Sound Effects',
    label: 'Bubble'
  }, {
    number: 124,
    subnumber: 0,
    group: 'Sound Effects',
    label: 'Bird Tweet'
  }, {
    number: 124,
    subnumber: 1,
    group: 'Sound Effects',
    label: 'Dog'
  }, {
    number: 124,
    subnumber: 2,
    group: 'Sound Effects',
    label: 'Horse Gallop'
  }, {
    number: 124,
    subnumber: 3,
    group: 'Sound Effects',
    label: 'Bird 2'
  }, {
    number: 125,
    subnumber: 0,
    group: 'Sound Effects',
    label: 'Telephone 1'
  }, {
    number: 125,
    subnumber: 1,
    group: 'Sound Effects',
    label: 'Telephone 2'
  }, {
    number: 125,
    subnumber: 2,
    group: 'Sound Effects',
    label: 'Door Creaking'
  }, {
    number: 125,
    subnumber: 3,
    group: 'Sound Effects',
    label: 'Door Closing'
  }, {
    number: 125,
    subnumber: 4,
    group: 'Sound Effects',
    label: 'Scratch'
  }, {
    number: 125,
    subnumber: 5,
    group: 'Sound Effects',
    label: 'Wind Chimes'
  }, {
    number: 126,
    subnumber: 0,
    group: 'Sound Effects',
    label: 'Helicopter'
  }, {
    number: 126,
    subnumber: 1,
    group: 'Sound Effects',
    label: 'Car Engine'
  }, {
    number: 126,
    subnumber: 2,
    group: 'Sound Effects',
    label: 'Car Stop'
  }, {
    number: 126,
    subnumber: 3,
    group: 'Sound Effects',
    label: 'Car Pass'
  }, {
    number: 126,
    subnumber: 4,
    group: 'Sound Effects',
    label: 'Car Crash'
  }, {
    number: 126,
    subnumber: 5,
    group: 'Sound Effects',
    label: 'Siren'
  }, {
    number: 126,
    subnumber: 6,
    group: 'Sound Effects',
    label: 'Train'
  }, {
    number: 126,
    subnumber: 7,
    group: 'Sound Effects',
    label: 'Jetplane'
  }, {
    number: 126,
    subnumber: 8,
    group: 'Sound Effects',
    label: 'Starship'
  }, {
    number: 126,
    subnumber: 9,
    group: 'Sound Effects',
    label: 'Burst Noise'
  }, {
    number: 127,
    subnumber: 0,
    group: 'Sound Effects',
    label: 'Applause'
  }, {
    number: 127,
    subnumber: 1,
    group: 'Sound Effects',
    label: 'Laughing'
  }, {
    number: 127,
    subnumber: 2,
    group: 'Sound Effects',
    label: 'Screaming'
  }, {
    number: 127,
    subnumber: 3,
    group: 'Sound Effects',
    label: 'Punch'
  }, {
    number: 127,
    subnumber: 4,
    group: 'Sound Effects',
    label: 'Heart Beat'
  }, {
    number: 127,
    subnumber: 5,
    group: 'Sound Effects',
    label: 'Footsteps'
  }, {
    number: 128,
    subnumber: 0,
    group: 'Sound Effects',
    label: 'Gun Shot'
  }, {
    number: 128,
    subnumber: 1,
    group: 'Sound Effects',
    label: 'Machine Gun'
  }, {
    number: 128,
    subnumber: 2,
    group: 'Sound Effects',
    label: 'Lasergun'
  }, {
    number: 128,
    subnumber: 3,
    group: 'Sound Effects',
    label: 'Explosion'
  }];
  /**
   * @type {Map<number,string>}
   */

  const GENERAL_MIDI_DRUM_NOTE_NUMBERS = new Map([[27, 'High Q(GM2)'], [28, 'Slap(GM2)'], [29, 'Scratch Push(GM2)'], [30, 'Scratch Pull(GM2)'], [31, 'Sticks(GM2)'], [32, 'Square Click(GM2)'], [33, 'Metronome Click(GM2)'], [34, 'Metronome Bell(GM2)'], [35, 'Bass Drum 2'], [36, 'Bass Drum 1'], [37, 'Side Stick'], [38, 'Snare Drum 1'], [39, 'Hand Clap'], [40, 'Snare Drum 2'], [41, 'Low Tom 2'], [42, 'Closed Hi-hat'], [43, 'Low Tom 1'], [44, 'Pedal Hi-hat'], [45, 'Mid Tom 2'], [46, 'Open Hi-hat'], [47, 'Mid Tom 1'], [48, 'High Tom 2'], [49, 'Crash Cymbal 1'], [50, 'High Tom 1'], [51, 'Ride Cymbal 1'], [52, 'Chinese Cymbal'], [53, 'Ride Bell'], [54, 'Tambourine'], [55, 'Splash Cymbal'], [56, 'Cowbell'], [57, 'Crash Cymbal 2'], [58, 'Vibra Slap'], [59, 'Ride Cymbal 2'], [60, 'High Bongo'], [61, 'Low Bongo'], [62, 'Mute High Conga'], [63, 'Open High Conga'], [64, 'Low Conga'], [65, 'High Timbale'], [66, 'Low Timbale'], [67, 'High Agogo'], [68, 'Low Agogo'], [69, 'Cabasa'], [70, 'Maracas'], [71, 'Short Whistle'], [72, 'Long Whistle'], [73, 'Short Guiro'], [74, 'Long Guiro'], [75, 'Claves'], [76, 'High Wood Block'], [77, 'Low Wood Block'], [78, 'Mute Cuica'], [79, 'Open Cuica'], [80, 'Mute Triangle'], [81, 'Open Triangle'], [82, 'Shaker(GM2)'], [83, 'Jingle Bell(GM2)'], [84, 'Belltree(GM2)'], [85, 'Castanets(GM2)'], [86, 'Mute Surdo(GM2)'], [87, 'Open Surdo(GM2)']]);
  /**
   * @type {object[]}
   * @todo add instrument numbers
   * @todo This might be useful, e.g. to check which notes Player can play
   */

  const MIDI_NOTE_RANGES = [// Strings
  {
    instrNr: 40,
    nrL2: -1,
    subNrL2: -1,
    label: 'Violin',
    min: 55,
    max: 103
  }, {
    instrNr: 41,
    nrL2: -1,
    subNrL2: -1,
    label: 'Viola',
    min: 48,
    max: 91
  }, {
    instrNr: 42,
    nrL2: -1,
    subNrL2: -1,
    label: 'Cello',
    min: 36,
    max: 76
  }, {
    instrNr: -1,
    nrL2: -1,
    subNrL2: -1,
    label: 'Double Bass',
    min: 28,
    max: 67
  }, {
    instrNr: -1,
    nrL2: -1,
    subNrL2: -1,
    label: 'Bass Guitar',
    min: 28,
    max: 67
  }, {
    instrNr: -1,
    nrL2: -1,
    subNrL2: -1,
    label: 'Acoustic Guitar',
    min: 40,
    max: 88
  }, // Brass
  {
    instrNr: 58,
    nrL2: 59,
    subNrL2: 0,
    label: 'Tuba',
    min: 28,
    max: 58
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Bass Trombone',
    min: 34,
    max: 67
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'French Horn',
    min: 34,
    max: 77
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Trombone',
    min: 40,
    max: 72
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Trumpet',
    min: 55,
    max: 82
  }, // Woodwinds
  {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Piccolo',
    min: 74,
    max: 102
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Flute',
    min: 60,
    max: 96
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Oboe',
    min: 58,
    max: 91
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Alto Flute',
    min: 55,
    max: 91
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Cor Anglais (English Horn)',
    min: 52,
    max: 81
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Clarinet',
    min: 50,
    max: 94
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Bass Clarinet',
    min: 38,
    max: 77
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Bassoon',
    min: 34,
    max: 75
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Contrabassoon',
    min: 22,
    max: 53
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Soprano Recorder',
    min: 72,
    max: 98
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Alto Recorder',
    min: 65,
    max: 91
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Tenor Recorder',
    min: 60,
    max: 86
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Bass Recorder',
    min: 53,
    max: 79
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Baritone Sax',
    min: 36,
    max: 69
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Tenor Sax',
    min: 44,
    max: 76
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Alto Sax',
    min: 49,
    max: 81
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Soprano Sax',
    min: 56,
    max: 88
  }, // Tuned Percussion
  {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Glockenspiel',
    min: 79,
    max: 108
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Xylophone',
    min: 65,
    max: 108
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Vibraphone',
    min: 53,
    max: 89
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Marimba',
    min: 45,
    max: 96
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Bass Marimba',
    min: 33,
    max: 81
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Celeste',
    min: 60,
    max: 108
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Tubular Bells',
    min: 60,
    max: 77
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Timpani',
    min: 40,
    max: 55
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Harpsichord',
    min: 29,
    max: 89
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Kalimba',
    min: 60,
    max: 88
  }, {
    instrNr: 0,
    nrL2: -1,
    subNrL2: -1,
    label: 'Harp',
    min: 24,
    max: 103
  }]; // Build lookup maps

  for (const note of MIDI_NOTES) {
    MidiNoteByPitch.set(note.pitch, note);
    MidiNoteByLabel.set(note.label, note);
  }

  for (const instrument of MIDI_INSTRUMENTS) {
    MidiInstrumentByNumber.set(instrument.number, instrument);
  }

  for (const instrument of MIDI_INSTRUMENTS_Lev2) {
    const key = `${instrument.number}-${instrument.subnumber}`;
    MidiInstrumentByNumberLev2.set(key, instrument);
  }

  var Midi$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getMidiNoteByNr: getMidiNoteByNr,
    getMidiNoteByLabel: getMidiNoteByLabel,
    getMidiNoteByNameAndOctave: getMidiNoteByNameAndOctave,
    getMidiInstrumentByNr: getMidiInstrumentByNr,
    getMidiInstrumentByNrL2: getMidiInstrumentByNrL2,
    getMidiDrumNoteByNr: getMidiDrumNoteByNr,
    isSharp: isSharp,
    getNoteNameFromNoteNr: getNoteNameFromNoteNr,
    flatToSharp: flatToSharp,
    sharpToFlat: sharpToFlat,
    NOTE_NAMES: NOTE_NAMES,
    MIDI_NOTES: MIDI_NOTES,
    SHARPS: SHARPS,
    MIDI_COMMANDS: MIDI_COMMANDS,
    MIDI_NOTE_RANGES: MIDI_NOTE_RANGES
  });

  /**
   * Note class that reflects MIDI properties but has
   * absolute start and end times in seconds.
   */

  class Note$2 {
    /**
     * Creates a new Note. Note.from() is preferred over using the constructor.
     *
     * @param {number} pitch pitch
     * @param {number} start start time in seconds
     * @param {number} velocity velocity
     * @param {number} channel MIDI channel
     * @param {number} end end time in seconds
     */
    constructor(pitch = 0, start = 0, velocity = 127, channel = 0, end = null) {
      // Get note name, e.g. C#4
      if (pitch < 0 || pitch > 127) {
        throw new Error(`Invalid pitch ${pitch}`);
      }

      try {
        this.name = getMidiNoteByNr(pitch).label;
      } catch {
        throw new Error(`Invalid pitch ${pitch}`);
      }

      this.pitch = pitch;
      this.start = start;
      this.velocity = velocity;
      this.channel = channel;
      this.end = end;
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


    static from(object) {
      let {
        pitch = 0,
        start = 0,
        velocity = 127,
        channel = 0,
        end = null,
        duration = null
      } = object; // Pitch can either be a number or a string

      if (typeof pitch === 'string' && Number.isNaN(+pitch)) {
        const note = getMidiNoteByLabel(pitch);

        if (note === null || note === undefined) {
          throw new Error('Invalid pitch for Note.from()');
        }

        pitch = note.pitch;
      } // Use either end or duration


      if ((end === undefined || end === null) && duration !== null && !Number.isNaN(duration)) {
        end = start + duration;
      }

      return new Note$2(pitch, start, velocity, channel, end);
    }
    /**
     * Returns a copy of the Note object
     *
     * @returns {Note} new note
     */


    clone() {
      return new Note$2(this.pitch, this.start, this.velocity, this.channel, this.end);
    }
    /**
     * Returns the duration of this note in seconds
     *
     * @returns {number} note duration
     */


    getDuration() {
      if (this.end === null) {
        return 0;
      }

      return this.end - this.start;
    }
    /**
     * Returns the note's name and octave, e.g. 'C#3'
     *
     * @returns {string} note name as string
     */


    getName() {
      return this.name;
    }
    /**
     * Returns the note's name WITHOUT the octave, e.g. 'C#'
     *
     * @returns {string} note name as string
     */


    getLetter() {
      return getMidiNoteByNr(this.pitch).name;
    }
    /**
     * Returns the note's octave
     *
     * @returns {number} the note's octave
     */


    getOctave() {
      return getMidiNoteByNr(this.pitch).octave;
    }
    /**
     * Returns a new Note where start and end are multiplied by factor
     *
     * @param {number} addedSeconds seconds to be added to start and end
     * @returns {Note} new note
     */


    shiftTime(addedSeconds) {
      const n = this.clone();
      n.start += addedSeconds;
      n.end = n.end === null ? null : n.end + addedSeconds;
      return n;
    }
    /**
     * Returns a new Note where start and end are multiplied by factor
     *
     * @param {number} factor factor to scale start and end with
     * @returns {Note} new note
     */


    scaleTime(factor) {
      const n = this.clone();
      n.start *= factor;
      n.end = n.end === null ? null : n.end * factor;
      return n;
    }
    /**
     * Returns true, if this Note and otherNote overlap in time.
     *
     * @param {Note} otherNote another Note
     * @returns {boolean} true if they overlap
     */


    overlapsInTime(otherNote) {
      return this.start >= otherNote.start && this.start <= otherNote.end || this.end >= otherNote.start && this.end <= otherNote.end;
    }
    /**
     * Returns the amount of seconds this Note and otherNote overlap in time.
     *
     * @param {Note} otherNote another Note
     * @returns {number} seconds of overlap
     */


    overlapInSeconds(otherNote) {
      if (!this.overlapsInTime(otherNote)) {
        return 0;
      }

      const laterStart = Math.max(this.start, otherNote.start);
      const earlierEnd = Math.min(this.end, otherNote.end);
      return earlierEnd - laterStart;
    }
    /**
     * Returns true if this note and otherNote have equal attributes.
     *
     * @param {Note} otherNote another Note
     * @returns {boolean} true if equal
     */


    equals(otherNote) {
      if (!(otherNote instanceof Note$2)) {
        return false;
      }

      return this.pitch === otherNote.pitch && this.start === otherNote.start && this.velocity === otherNote.velocity && this.channel === otherNote.channel && this.end === otherNote.end;
    }
    /**
     * Human-readable string representation of this Note
     *
     * @param {boolean} short if true, attribute names will be shortened
     * @returns {string} string representation
     */


    toString(short = false) {
      if (short) {
        return `Note(n: ${this.name}, p: ${this.pitch}, s: ${this.start}, e: ${this.end}, v: ${this.velocity}, c: ${this.channel})`;
      }

      return `Note(name: ${this.name}, pitch: ${this.pitch}, start: ${this.start}, end: ${this.end}, velocity: ${this.velocity}, channel: ${this.channel})`;
    }

  }

  /**
   * Guitar note class that reflects MIDI properties but has
   * absolute start and end times in seconds and
   * information on how to play it.
   *
   * @augments Note
   */

  class GuitarNote extends Note$2 {
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
    constructor(pitch = 0, start = 0, velocity = 127, channel = 0, end = null, // This is different to the base Note class
    string = null, fret = null) {
      super(pitch, start, velocity, channel, end);
      this.string = string;
      this.fret = fret;
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


    static from(object) {
      let {
        pitch = 0,
        start = 0,
        velocity = 127,
        channel = 0,
        end = null,
        // This is different to the base Note class
        string = null,
        fret = null
      } = object;

      if (typeof pitch === 'string' && Number.isNaN(+pitch)) {
        const note = getMidiNoteByLabel(pitch);

        if (note === null || note === undefined) {
          throw new Error('Invalid pitch for GuitarNote.from()');
        }

        pitch = note.pitch;
      }

      return new GuitarNote(pitch, start, velocity, channel, end, string, fret);
    }
    /**
     * Converts a Note to a GuitarNote
     *
     * @param {Note} note note
     * @param {number} string string
     * @param {number} fret fret
     * @returns {GuitarNote} guitar note
     */


    static fromNote(note, string, fret) {
      return new GuitarNote(note.pitch, note.start, note.velocity, note.channel, note.end, string, fret);
    }
    /**
     * Simplifies the GuitarNote to a Note
     *
     * @returns {Note} note
     */


    toNote() {
      return new Note$2(this.pitch, this.start, this.velocity, this.channel, this.end);
    }
    /**
     * Returns a copy of the Note object
     *
     * @returns {GuitarNote} new note
     */


    clone() {
      return new GuitarNote(this.pitch, this.start, this.velocity, this.channel, this.end, // This is different to the base Note class
      this.string, this.fret);
    }
    /**
     * Returns true if this note and otherNote have equal attributes.
     *
     * @param {GuitarNote} otherNote another GuitarNote
     * @returns {boolean} true if equal
     */


    equals(otherNote) {
      if (!(otherNote instanceof GuitarNote)) {
        return false;
      }

      return this.pitch === otherNote.pitch && this.start === otherNote.start && this.velocity === otherNote.velocity && this.channel === otherNote.channel && this.end === otherNote.end && // This is different to the base Note class
      this.string === otherNote.string && this.fret === otherNote.fret;
    }
    /**
     * Human-readable string representation of this GuitarNote
     *
     * @param {boolean} short if true, attribute names will be shortened
     * @returns {string} string representation
     */


    toString(short = false) {
      if (short) {
        return `GuitarNote(n: ${this.name}, p: ${this.pitch}, s: ${this.start}, e: ${this.end}, v: ${this.velocity}, c: ${this.channel}, s: ${this.string}, f: ${this.fret})`;
      }

      return `GuitarNote(name: ${this.name}, pitch: ${this.pitch}, start: ${this.start}, end: ${this.end}, velocity: ${this.velocity}, channel: ${this.channel}, string: ${this.string}, fret: ${this.fret})`;
    }

  }

  function ascending (a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector (f) {
    let delta = f;
    let compare = f;

    if (f.length === 1) {
      delta = (d, x) => f(d) - x;

      compare = ascendingComparator(f);
    }

    function left(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        const mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
      }

      return lo;
    }

    function right(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        const mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
      }

      return lo;
    }

    function center(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      const i = left(a, x, lo, hi - 1);
      return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
    }

    return {
      left,
      center,
      right
    };
  }

  function ascendingComparator(f) {
    return (d, x) => ascending(f(d), x);
  }

  function number$1 (x) {
    return x === null ? NaN : +x;
  }
  function* numbers(values, valueof) {
    if (valueof === undefined) {
      for (let value of values) {
        if (value != null && (value = +value) >= value) {
          yield value;
        }
      }
    } else {
      let index = -1;

      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
          yield value;
        }
      }
    }
  }

  const ascendingBisect = bisector(ascending);
  const bisectRight = ascendingBisect.right;
  bisector(number$1).center;

  function variance(values, valueof) {
    let count = 0;
    let delta;
    let mean = 0;
    let sum = 0;

    if (valueof === undefined) {
      for (let value of values) {
        if (value != null && (value = +value) >= value) {
          delta = value - mean;
          mean += delta / ++count;
          sum += delta * (value - mean);
        }
      }
    } else {
      let index = -1;

      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
          delta = value - mean;
          mean += delta / ++count;
          sum += delta * (value - mean);
        }
      }
    }

    if (count > 1) return sum / (count - 1);
  }

  function deviation(values, valueof) {
    const v = variance(values, valueof);
    return v ? Math.sqrt(v) : v;
  }

  function extent (values, valueof) {
    let min;
    let max;

    if (valueof === undefined) {
      for (const value of values) {
        if (value != null) {
          if (min === undefined) {
            if (value >= value) min = max = value;
          } else {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    } else {
      let index = -1;

      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null) {
          if (min === undefined) {
            if (value >= value) min = max = value;
          } else {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }

    return [min, max];
  }

  class InternMap extends Map {
    constructor(entries, key = keyof) {
      super();
      Object.defineProperties(this, {
        _intern: {
          value: new Map()
        },
        _key: {
          value: key
        }
      });
      if (entries != null) for (const [key, value] of entries) this.set(key, value);
    }

    get(key) {
      return super.get(intern_get(this, key));
    }

    has(key) {
      return super.has(intern_get(this, key));
    }

    set(key, value) {
      return super.set(intern_set(this, key), value);
    }

    delete(key) {
      return super.delete(intern_delete(this, key));
    }

  }

  function intern_get({
    _intern,
    _key
  }, value) {
    const key = _key(value);

    return _intern.has(key) ? _intern.get(key) : value;
  }

  function intern_set({
    _intern,
    _key
  }, value) {
    const key = _key(value);

    if (_intern.has(key)) return _intern.get(key);

    _intern.set(key, value);

    return value;
  }

  function intern_delete({
    _intern,
    _key
  }, value) {
    const key = _key(value);

    if (_intern.has(key)) {
      value = _intern.get(value);

      _intern.delete(key);
    }

    return value;
  }

  function keyof(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
  }

  function identity$2 (x) {
    return x;
  }

  function group(values, ...keys) {
    return nest(values, identity$2, identity$2, keys);
  }

  function nest(values, map, reduce, keys) {
    return function regroup(values, i) {
      if (i >= keys.length) return reduce(values);
      const groups = new InternMap();
      const keyof = keys[i++];
      let index = -1;

      for (const value of values) {
        const key = keyof(value, ++index, values);
        const group = groups.get(key);
        if (group) group.push(value);else groups.set(key, [value]);
      }

      for (const [key, values] of groups) {
        groups.set(key, regroup(values, i));
      }

      return map(groups);
    }(values, 0);
  }

  var e10 = Math.sqrt(50),
      e5 = Math.sqrt(10),
      e2 = Math.sqrt(2);
  function ticks (start, stop, count) {
    var reverse,
        i = -1,
        n,
        ticks,
        step;
    stop = +stop, start = +start, count = +count;
    if (start === stop && count > 0) return [start];
    if (reverse = stop < start) n = start, start = stop, stop = n;
    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

    if (step > 0) {
      let r0 = Math.round(start / step),
          r1 = Math.round(stop / step);
      if (r0 * step < start) ++r0;
      if (r1 * step > stop) --r1;
      ticks = new Array(n = r1 - r0 + 1);

      while (++i < n) ticks[i] = (r0 + i) * step;
    } else {
      step = -step;
      let r0 = Math.round(start * step),
          r1 = Math.round(stop * step);
      if (r0 / step < start) ++r0;
      if (r1 / step > stop) --r1;
      ticks = new Array(n = r1 - r0 + 1);

      while (++i < n) ticks[i] = (r0 + i) / step;
    }

    if (reverse) ticks.reverse();
    return ticks;
  }
  function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count),
        power = Math.floor(Math.log(step) / Math.LN10),
        error = step / Math.pow(10, power);
    return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }
  function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count),
        step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
        error = step0 / step1;
    if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
    return stop < start ? -step1 : step1;
  }

  function max(values, valueof) {
    let max;

    if (valueof === undefined) {
      for (const value of values) {
        if (value != null && (max < value || max === undefined && value >= value)) {
          max = value;
        }
      }
    } else {
      let index = -1;

      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null && (max < value || max === undefined && value >= value)) {
          max = value;
        }
      }
    }

    return max;
  }

  function min(values, valueof) {
    let min;

    if (valueof === undefined) {
      for (const value of values) {
        if (value != null && (min > value || min === undefined && value >= value)) {
          min = value;
        }
      }
    } else {
      let index = -1;

      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null && (min > value || min === undefined && value >= value)) {
          min = value;
        }
      }
    }

    return min;
  }

  // ISC license, Copyright 2018 Vladimir Agafonkin.

  function quickselect(array, k, left = 0, right = array.length - 1, compare = ascending) {
    while (right > left) {
      if (right - left > 600) {
        const n = right - left + 1;
        const m = k - left + 1;
        const z = Math.log(n);
        const s = 0.5 * Math.exp(2 * z / 3);
        const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
        const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
        const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
        quickselect(array, k, newLeft, newRight, compare);
      }

      const t = array[k];
      let i = left;
      let j = right;
      swap(array, left, k);
      if (compare(array[right], t) > 0) swap(array, left, right);

      while (i < j) {
        swap(array, i, j), ++i, --j;

        while (compare(array[i], t) < 0) ++i;

        while (compare(array[j], t) > 0) --j;
      }

      if (compare(array[left], t) === 0) swap(array, left, j);else ++j, swap(array, j, right);
      if (j <= k) left = j + 1;
      if (k <= j) right = j - 1;
    }

    return array;
  }

  function swap(array, i, j) {
    const t = array[i];
    array[i] = array[j];
    array[j] = t;
  }

  function quantile(values, p, valueof) {
    values = Float64Array.from(numbers(values, valueof));
    if (!(n = values.length)) return;
    if ((p = +p) <= 0 || n < 2) return min(values);
    if (p >= 1) return max(values);
    var n,
        i = (n - 1) * p,
        i0 = Math.floor(i),
        value0 = max(quickselect(values, i0).subarray(0, i0 + 1)),
        value1 = min(values.subarray(i0 + 1));
    return value0 + (value1 - value0) * (i - i0);
  }

  function mean(values, valueof) {
    let count = 0;
    let sum = 0;

    if (valueof === undefined) {
      for (let value of values) {
        if (value != null && (value = +value) >= value) {
          ++count, sum += value;
        }
      }
    } else {
      let index = -1;

      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
          ++count, sum += value;
        }
      }
    }

    if (count) return sum / count;
  }

  function median (values, valueof) {
    return quantile(values, 0.5, valueof);
  }

  function minIndex(values, valueof) {
    let min;
    let minIndex = -1;
    let index = -1;

    if (valueof === undefined) {
      for (const value of values) {
        ++index;

        if (value != null && (min > value || min === undefined && value >= value)) {
          min = value, minIndex = index;
        }
      }
    } else {
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null && (min > value || min === undefined && value >= value)) {
          min = value, minIndex = index;
        }
      }
    }

    return minIndex;
  }

  function difference(values, ...others) {
    values = new Set(values);

    for (const other of others) {
      for (const value of other) {
        values.delete(value);
      }
    }

    return values;
  }

  function set$1(values) {
    return values instanceof Set ? values : new Set(values);
  }

  function intersection(values, ...others) {
    values = new Set(values);
    others = others.map(set$1);

    out: for (const value of values) {
      for (const other of others) {
        if (!other.has(value)) {
          values.delete(value);
          continue out;
        }
      }
    }

    return values;
  }

  function union(...others) {
    const set = new Set();

    for (const other of others) {
      for (const o of other) {
        set.add(o);
      }
    }

    return set;
  }

  var noop = {
    value: () => {}
  };

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }

    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function (t) {
      var name = "",
          i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {
        type: t,
        name: name
      };
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function (typename, callback) {
      var _ = this._,
          T = parseTypenames(typename + "", _),
          t,
          i = -1,
          n = T.length; // If no callback was specified, return the callback of the given type and name.

      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get$4(_[t], typename.name))) return t;

        return;
      } // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.


      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);

      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
      }

      return this;
    },
    copy: function () {
      var copy = {},
          _ = this._;

      for (var t in _) copy[t] = _[t].slice();

      return new Dispatch(copy);
    },
    call: function (type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);

      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function (type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);

      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get$4(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }

    if (callback != null) type.push({
      name: name,
      value: callback
    });
    return type;
  }

  function define (constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);

    for (var key in definition) prototype[key] = definition[key];

    return prototype;
  }

  function Color() {}
  var darker = 0.7;
  var brighter = 1 / darker;
  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
      reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
      reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
      reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
      reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
      reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };
  define(Color, color, {
    copy: function (channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable: function () {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
    : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
    : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
    : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
    : null // invalid hex
    ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
    : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
    : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
    : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
    : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
    : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
    : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
    : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define(Rgb, rgb, extend(Color, {
    brighter: function (k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function (k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function () {
      return this;
    },
    displayable: function () {
      return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }

  function rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
  }

  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl();
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;

    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }

    return new Hsl(h, s, l, o.opacity);
  }
  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter: function (k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function (k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function () {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    displayable: function () {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl: function () {
      var a = this.opacity;
      a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
    }
  }));
  /* From FvD 13.37, CSS Color Module Level 3 */

  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  var constant = (x => () => x);

  function linear$1(a, d) {
    return function (t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
      return Math.pow(a + t * b, y);
    };
  }
  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function (a, b) {
      return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
    };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear$1(a, d) : constant(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function (t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;
    return rgb$1;
  })(1);

  function numberArray (a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0,
        c = b.slice(),
        i;
    return function (t) {
      for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;

      return c;
    };
  }
  function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
  }

  function genericArray(a, b) {
    var nb = b ? b.length : 0,
        na = a ? Math.min(nb, a.length) : 0,
        x = new Array(na),
        c = new Array(nb),
        i;

    for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);

    for (; i < nb; ++i) c[i] = b[i];

    return function (t) {
      for (i = 0; i < na; ++i) c[i] = x[i](t);

      return c;
    };
  }

  function date (a, b) {
    var d = new Date();
    return a = +a, b = +b, function (t) {
      return d.setTime(a * (1 - t) + b * t), d;
    };
  }

  function interpolateNumber (a, b) {
    return a = +a, b = +b, function (t) {
      return a * (1 - t) + b * t;
    };
  }

  function object (a, b) {
    var i = {},
        c = {},
        k;
    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in b) {
      if (k in a) {
        i[k] = interpolate(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function (t) {
      for (k in i) c[k] = i[k](t);

      return c;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function () {
      return b;
    };
  }

  function one(b) {
    return function (t) {
      return b(t) + "";
    };
  }

  function interpolateString (a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0,
        // scan index for next number in b
    am,
        // current match in a
    bm,
        // current match in b
    bs,
        // string preceding current number in b, if any
    i = -1,
        // index in s
    s = [],
        // string constants and placeholders
    q = []; // number interpolators
    // Coerce inputs to strings.

    a = a + "", b = b + ""; // Interpolate pairs of numbers in a & b.

    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      if ((am = am[0]) === (bm = bm[0])) {
        // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else {
        // interpolate non-matching numbers
        s[++i] = null;
        q.push({
          i: i,
          x: interpolateNumber(am, bm)
        });
      }

      bi = reB.lastIndex;
    } // Add remains of b.


    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    } // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.


    return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
      for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);

      return s.join("");
    });
  }

  function interpolate (a, b) {
    var t = typeof b,
        c;
    return b == null || t === "boolean" ? constant(b) : (t === "number" ? interpolateNumber : t === "string" ? (c = color(b)) ? (b = c, interpolateRgb) : interpolateString : b instanceof color ? interpolateRgb : b instanceof Date ? date : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a, b);
  }

  function interpolateRound (a, b) {
    return a = +a, b = +b, function (t) {
      return Math.round(a * (1 - t) + b * t);
    };
  }

  dispatch("start", "end", "cancel", "interrupt");

  function formatDecimal (x) {
    return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
  } // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimalParts(1.23) returns ["123", 0].

  function formatDecimalParts(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity

    var i,
        coefficient = x.slice(0, i); // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).

    return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
  }

  function exponent (x) {
    return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup (grouping, thousands) {
    return function (value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals (numerals) {
    return function (value) {
      return value.replace(/[0-9]/g, function (i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }
  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
  }

  FormatSpecifier.prototype.toString = function () {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim (s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".":
          i0 = i1 = i;
          break;

        case "0":
          if (i0 === 0) i0 = i;
          i1 = i;
          break;

        default:
          if (!+s[i]) break out;
          if (i0 > 0) i0 = 0;
          break;
      }
    }

    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent;
  function formatPrefixAuto (x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded (x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "%": (x, p) => (x * 100).toFixed(p),
    "b": x => Math.round(x).toString(2),
    "c": x => x + "",
    "d": formatDecimal,
    "e": (x, p) => x.toExponential(p),
    "f": (x, p) => x.toFixed(p),
    "g": (x, p) => x.toPrecision(p),
    "o": x => Math.round(x).toString(8),
    "p": (x, p) => formatRounded(x * 100, p),
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": x => Math.round(x).toString(16).toUpperCase(),
    "x": x => Math.round(x).toString(16)
  };

  function identity$1 (x) {
    return x;
  }

  var map = Array.prototype.map,
      prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  function formatLocale (locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? identity$1 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
        currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
        currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
        decimal = locale.decimal === undefined ? "." : locale.decimal + "",
        numerals = locale.numerals === undefined ? identity$1 : formatNumerals(map.call(locale.numerals, String)),
        percent = locale.percent === undefined ? "%" : locale.percent + "",
        minus = locale.minus === undefined ? "−" : locale.minus + "",
        nan = locale.nan === undefined ? "NaN" : locale.nan + "";

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);
      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          trim = specifier.trim,
          type = specifier.type; // The "n" type is an alias for ",g".

      if (type === "n") comma = true, type = "g"; // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g"; // If zero fill is specified, padding goes after sign and before digits.

      if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "="; // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.

      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : ""; // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?

      var formatType = formatTypes[type],
          maybeSuffix = /[defgprs%]/.test(type); // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].

      precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i,
            n,
            c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value; // Determine the sign. -0 is not less than 0, but 1 / -0 is!

          var valueNegative = value < 0 || 1 / value < 0; // Perform the initial formatting.

          value = isNaN(value) ? nan : formatType(Math.abs(value), precision); // Trim insignificant zeros.

          if (trim) value = formatTrim(value); // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.

          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false; // Compute the prefix and suffix.

          valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : ""); // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.

          if (maybeSuffix) {
            i = -1, n = value.length;

            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        } // If the fill character is not "0", grouping is applied before padding.


        if (comma && !zero) value = group(value, Infinity); // Compute the padding.

        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : ""; // If the fill character is "0", grouping is applied after padding.

        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; // Reconstruct the final output based on the desired alignment.

        switch (align) {
          case "<":
            value = valuePrefix + value + valueSuffix + padding;
            break;

          case "=":
            value = valuePrefix + padding + value + valueSuffix;
            break;

          case "^":
            value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
            break;

          default:
            value = padding + valuePrefix + value + valueSuffix;
            break;
        }

        return numerals(value);
      }

      format.toString = function () {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function (value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  var locale;
  var format;
  var formatPrefix;
  defaultLocale({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });
  function defaultLocale(definition) {
    locale = formatLocale(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
  }

  function precisionFixed (step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  function precisionPrefix (step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionRound (step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  }

  var defaultSource = Math.random;

  var randomUniform = (function sourceRandomUniform(source) {
    function randomUniform(min, max) {
      min = min == null ? 0 : +min;
      max = max == null ? 1 : +max;
      if (arguments.length === 1) max = min, min = 0;else max -= min;
      return function () {
        return source() * max + min;
      };
    }

    randomUniform.source = sourceRandomUniform;
    return randomUniform;
  })(defaultSource);

  var randomInt = (function sourceRandomInt(source) {
    function randomInt(min, max) {
      if (arguments.length < 2) max = min, min = 0;
      min = Math.floor(min);
      max = Math.floor(max) - min;
      return function () {
        return Math.floor(source() * max + min);
      };
    }

    randomInt.source = sourceRandomInt;
    return randomInt;
  })(defaultSource);

  var randomNormal = (function sourceRandomNormal(source) {
    function randomNormal(mu, sigma) {
      var x, r;
      mu = mu == null ? 0 : +mu;
      sigma = sigma == null ? 1 : +sigma;
      return function () {
        var y; // If available, use the second previously-generated uniform random.

        if (x != null) y = x, x = null; // Otherwise, generate a new x and y.
        else do {
            x = source() * 2 - 1;
            y = source() * 2 - 1;
            r = x * x + y * y;
          } while (!r || r > 1);
        return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
      };
    }

    randomNormal.source = sourceRandomNormal;
    return randomNormal;
  })(defaultSource);

  // https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
  const mul = 0x19660D;
  const inc = 0x3C6EF35F;
  const eps = 1 / 0x100000000;
  function lcg(seed = Math.random()) {
    let state = (0 <= seed && seed < 1 ? seed / eps : Math.abs(seed)) | 0;
    return () => (state = mul * state + inc | 0, eps * (state >>> 0));
  }

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0:
        break;

      case 1:
        this.range(domain);
        break;

      default:
        this.range(range).domain(domain);
        break;
    }

    return this;
  }

  function constants(x) {
    return function () {
      return x;
    };
  }

  function number(x) {
    return +x;
  }

  var unit = [0, 1];
  function identity(x) {
    return x;
  }

  function normalize(a, b) {
    return (b -= a = +a) ? function (x) {
      return (x - a) / b;
    } : constants(isNaN(b) ? NaN : 0.5);
  }

  function clamper(a, b) {
    var t;
    if (a > b) t = a, a = b, b = t;
    return function (x) {
      return Math.max(a, Math.min(b, x));
    };
  } // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
  // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].


  function bimap(domain, range, interpolate) {
    var d0 = domain[0],
        d1 = domain[1],
        r0 = range[0],
        r1 = range[1];
    if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function (x) {
      return r0(d0(x));
    };
  }

  function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1,
        d = new Array(j),
        r = new Array(j),
        i = -1; // Reverse descending domains.

    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range[i], range[i + 1]);
    }

    return function (x) {
      var i = bisectRight(domain, x, 1, j) - 1;
      return r[i](d[i](x));
    };
  }

  function copy(source, target) {
    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
  }
  function transformer() {
    var domain = unit,
        range = unit,
        interpolate$1 = interpolate,
        transform,
        untransform,
        unknown,
        clamp = identity,
        piecewise,
        output,
        input;

    function rescale() {
      var n = Math.min(domain.length, range.length);
      if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
      piecewise = n > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }

    function scale(x) {
      return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
    }

    scale.invert = function (y) {
      return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
    };

    scale.domain = function (_) {
      return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
    };

    scale.range = function (_) {
      return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };

    scale.rangeRound = function (_) {
      return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
    };

    scale.clamp = function (_) {
      return arguments.length ? (clamp = _ ? true : identity, rescale()) : clamp !== identity;
    };

    scale.interpolate = function (_) {
      return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    return function (t, u) {
      transform = t, untransform = u;
      return rescale();
    };
  }
  function continuous() {
    return transformer()(identity, identity);
  }

  function tickFormat(start, stop, count, specifier) {
    var step = tickStep(start, stop, count),
        precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);

    switch (specifier.type) {
      case "s":
        {
          var value = Math.max(Math.abs(start), Math.abs(stop));
          if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
          return formatPrefix(specifier, value);
        }

      case "":
      case "e":
      case "g":
      case "p":
      case "r":
        {
          if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
          break;
        }

      case "f":
      case "%":
        {
          if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
          break;
        }
    }

    return format(specifier);
  }

  function linearish(scale) {
    var domain = scale.domain;

    scale.ticks = function (count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };

    scale.tickFormat = function (count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };

    scale.nice = function (count) {
      if (count == null) count = 10;
      var d = domain();
      var i0 = 0;
      var i1 = d.length - 1;
      var start = d[i0];
      var stop = d[i1];
      var prestep;
      var step;
      var maxIter = 10;

      if (stop < start) {
        step = start, start = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }

      while (maxIter-- > 0) {
        step = tickIncrement(start, stop, count);

        if (step === prestep) {
          d[i0] = start;
          d[i1] = stop;
          return domain(d);
        } else if (step > 0) {
          start = Math.floor(start / step) * step;
          stop = Math.ceil(stop / step) * step;
        } else if (step < 0) {
          start = Math.ceil(start * step) / step;
          stop = Math.floor(stop * step) / step;
        } else {
          break;
        }

        prestep = step;
      }

      return scale;
    };

    return scale;
  }
  function linear() {
    var scale = continuous();

    scale.copy = function () {
      return copy(scale, linear());
    };

    initRange.apply(scale, arguments);
    return linearish(scale);
  }

  /**
   * @module utils/MathUtils
   */

  /**
   * Generates a random float in [min, max)
   *
   * @param {number} min minimum
   * @param {number} max maximum
   * @returns {number} random float
   */

  function randFloat(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
  }
  /**
   * Returns a random element from the given array.
   *
   * @param {Array} array an array
   * @returns {any} random element from the array
   */

  function choose(array) {
    const index = randomInt(0, array.length)();
    return array[index];
  }
  /**
   * Shortcut for Math.max(minValue, Math.min(maxValue, value))
   *
   * @param {number} value value
   * @param {number} minValue lower limit
   * @param {number} maxValue upper limit
   * @returns {number} clipped number
   */

  function clipValue(value, minValue, maxValue) {
    return Math.max(minValue, Math.min(maxValue, value));
  }
  /**
   * Rounds a number to a given number of decimals
   *
   * @param {number} number a number
   * @param {number} n number of digits
   * @returns {number} rounded number
   */

  function roundToNDecimals(number, n) {
    return +number.toFixed(n);
  }
  /**
   * Swaps two numbers if the first is larger than the second
   *
   * @param {number} x a number
   * @param {number} y a number
   * @returns {number[]} array with the smaller number first
   */

  function swapSoSmallerFirst(x, y) {
    if (x <= y) {
      return [x, y];
    }

    return [y, x];
  }
  /**
   * Counts the number of 1s in a binary number, e.g 100101 has 3 1s
   *
   * @see https://prismoskills.appspot.com/lessons/Bitwise_Operators/Count_ones_in_an_integer.jsp
   * @param {number} integer an integer number
   * @returns {number} number of 1s
   */

  function countOnesOfBinary(integer) {
    let count = 0;

    while (integer !== 0) {
      // eslint-disable-next-line no-bitwise
      integer = integer & integer - 1;
      count++;
    }

    return count;
  }
  /**
   * Local maxima are found by looking at entries that are higher than their left
   * and right neighbor, or higher than their only neighbor if they are at the
   * boundary.
   * IMPORTANT: does not find plateaus
   *
   * @param {number[]} array array
   * @returns {number[]} array with indices of maxima
   */

  function findLocalMaxima(array) {
    if (array.length <= 1) {
      return [];
    }

    if (array.length === 2) {
      if (array[0] > array[1]) {
        return [0];
      }

      if (array[1] > array[0]) {
        return [1];
      }

      return [];
    } // General case with 3 or more


    const maximaIndices = [];

    if (array[0] > array[1]) {
      maximaIndices.push(0);
    }

    let last = array[0];
    let current = array[1];

    for (let index = 1; index < array.length - 1; index++) {
      const next = array[index + 1];

      if (current > last && current > next) {
        maximaIndices.push(index);
      }

      last = current;
      current = next;
    }

    const lastIndex = array.length - 1;

    if (array[lastIndex] > array[lastIndex - 1]) {
      maximaIndices.push(array.length - 1);
    }

    return maximaIndices;
  }

  let _Symbol$iterator;
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

  _Symbol$iterator = Symbol.iterator;

  class NoteArray {
    /**
     * Creates a new NoteArray,
     * will make a copy of the passed array and cast all notes
     *
     * @param {Note[]} [notes=[]] notes
     * @param {boolean} [reUseNotes=false] if true, will directly use the passed notes.
     *      This can be dangerous if you do not want them to change.
     */
    constructor(notes = [], reUseNotes = false) {
      this._notes = void 0;

      if (reUseNotes) {
        this._notes = notes;
      } else {
        // Parse notes
        this._notes = notes.map(d => {
          if (d.string !== undefined && d.fret !== undefined) {
            return GuitarNote.from(d);
          }

          return Note$2.from(d);
        });
      }
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
     * Overwrite the NoteArray's notes with another Array of Notes
     *
     * @param {Note[]} notes notes
     * @returns {NoteArray} itself
     */


    setNotes(notes) {
      this._notes = notes;
      return this;
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


    *[_Symbol$iterator]() {
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
        copy.shiftTime(duration); // Result is a NoteArray so use .concat
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
        filterFunc = n => n.start >= start && n.start <= end || n.end !== null && n.end >= start && n.end <= end;
      } else if (mode === 'touched-included') {
        filterFunc = n => // like touched
        n.start >= start && n.start <= end || n.end !== null && n.end >= start && n.end <= end || // filter range inside note range
        n.end !== null && n.start <= start && n.end >= end;
      } else {
        throw new Error('Invalid slicing mode');
      } // eslint-disable-next-line unicorn/no-array-callback-reference


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
     * @param {boolean} [reUseNotes=false] if true, will not clone notes.
     *      This can be dangerous if you do not want them to change.
     * @example
     *      // Slice into 1 second slices
     *      const slices = noteArray.sliceAtTimes([1, 2, 3], 'start)
     */


    sliceAtTimes(times, mode, reUseNotes = false) {
      if (times.length === 0) {
        return [this._notes];
      } // Make sure notes at the end are also in a slice


      const duration = this.getDuration();

      if (Math.max(...times) <= duration) {
        times.push(duration + 1);
      }

      const slices = [];
      let lastTime = 0;

      for (const time of times) {
        slices.push( // this.clone()
        new NoteArray(this._notes, reUseNotes).sliceTime(lastTime, time, mode).getNotes());
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
        const occupiedTimes = []; // TODO: can probably be made faster in the future

        for (const note of this._notes) {
          const {
            start,
            end
          } = note; // Check for collision

          const collisions = [];

          for (let index = 0; index < occupiedTimes.length; index++) {
            // eslint-disable-next-line unicorn/prevent-abbreviations
            const [s, e] = occupiedTimes[index];

            if (s >= start && s <= end || e >= start && e <= end) {
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
        } // Gaps are just between two following blocks of occupied time


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
     * Segments the NoteArray into Arrays of Notes at given indices
     *
     * @param {number[]} indices indices
     * @returns {Note[][]} segments
     * @example <caption>Get notes in partions of 4</caption>
     *      const noteGroups = myNoteArray.segmentAtIndices([4, 8, 12, 16, 20]);
     *      // noteGroups = [
     *      //     Array(4),
     *      //     Array(4),
     *      //     Array(4),
     *      // ]
     */


    segmentAtIndices(indices) {
      const segments = [];
      let lastIndex = 0;

      for (const index of indices) {
        segments.push(this._notes.slice(lastIndex, index));
        lastIndex = index;
      }

      return segments;
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
      this._notes = this._notes.map(n => Note$2.from({ ...n,
        pitch: clipValue(n.pitch + steps, 0, 127)
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
      this._notes = this._notes.map(note => Note$2.from({ ...note,
        pitch: note.pitch % 12
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
      }); // Sort by time

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

  /**
   * @module utils/ArrayUtils
   */
  /**
   * Shallow compares two arrays
   *
   * @param {Array} a an array
   * @param {Array} b another array
   * @returns {boolean} true iff equal
   */

  function arrayShallowEquals(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    for (const [index, element] of a.entries()) {
      if (element !== b[index]) {
        return false;
      }
    }

    return true;
  } // TODO: use https://github.com/d3/d3-array/blob/master/README.md#intersection etc

  /**
   * Checks if two arrays contain the same elements,
   * ignoring their ordering in each array.
   *
   * @param {Array} a an array
   * @param {Array} b another array
   * @param {boolean} checkLength also checks if arrays have the same length
   * @returns {boolean} true iff arrays contain same elements
   */

  function arrayHasSameElements(a, b, checkLength = true) {
    if (checkLength && a.length !== b.length) {
      return false;
    }

    const setA = new Set(a);
    const setB = new Set(b);

    for (const element of setA) {
      if (!setB.has(element)) {
        return false;
      }
    }

    for (const element of setB) {
      if (!setA.has(element)) {
        return false;
      }
    }

    return true;
  }
  /**
   * Jaccard index calulates the similarity of the sets as the size of the set
   * interaction divided by the size of the set union:
   * jackard_index = |intersection| / |union|
   *
   * @see https://en.wikipedia.org/wiki/Jaccard_index
   * @param {number[]} set1 set 1
   * @param {number[]} set2 set 2
   * @returns {number} similarity in [0, 1]
   */

  function jaccardIndex(set1, set2) {
    if (set1.length === 0 && set2.length === 0) {
      return 1;
    }

    return intersection(set1, set2).size / union(set1, set2).size;
  }
  /**
   * Removes duplicates from an Array by converting to a Set and back
   *
   * @param {Array} array an array
   * @returns {Array} array without duplicates
   */

  function removeDuplicates(array) {
    return [...new Set(array)];
  }
  /**
   * Checks whether the array a contains the array b, i.e. whether the first
   * b.length elements are the same.
   *
   * @todo rename to arrayStartsWithArray
   * @param {Array} a an array
   * @param {Array} b a shorter array
   * @returns {boolean} true iff a contains b
   */

  function arrayContainsArray(a, b) {
    if (a.length < b.length) {
      return false;
    }

    for (const [index, element] of b.entries()) {
      if (a[index] !== element) {
        return false;
      }
    }

    return true;
  }
  /**
   * Returns the maximum numerical value from an array of arrays
   *
   * @param {number[][]} matrix matrix
   * @returns {number} maximum value
   */

  function getMatrixMax(matrix) {
    let maximum = Number.NEGATIVE_INFINITY;

    for (const row of matrix) {
      for (const value of row) {
        if (Number.isNaN(+value)) {
          continue;
        }

        if (value > maximum) {
          maximum = value;
        }
      }
    }

    return maximum;
  }
  /**
   * Stringifies a 2D array / matrix for logging onto the console.
   *
   * @param {any[][]} matrix the matrix
   * @param {string} colSeparator column separator
   * @param {string} rowSeparator row separator
   * @param {Function} formatter formatting for each element
   * @returns {string} stringified matrix
   */

  function formatMatrix(matrix, colSeparator = ', ', rowSeparator = '\n', formatter) {
    if (!matrix || matrix.length === 0) {
      return '';
    }

    if (formatter) {
      matrix = matrix.map(row => row.map(value => formatter(value)));
    }

    return matrix.map(row => row.join(colSeparator)).join(rowSeparator);
  }
  /**
   * Returns the value in array that is closest to value.
   * Array MUST be sorted ascending.
   *
   * @param {Array} array array
   * @param {*} value value
   * @param {Function} accessor accessor
   * @returns {*} value in array closest to value
   */

  function binarySearch(array, value, accessor = d => d) {
    // console.log('search', array, 'for', value);
    // Handle short arrays
    if (array.length <= 3) {
      let closest = null;
      let diff = Number.POSITIVE_INFINITY;

      for (const element of array) {
        const value_ = accessor(element);
        const diff2 = Math.abs(value - value_);

        if (diff2 < diff) {
          closest = element;
          diff = diff2;
        }
      }

      return closest;
    } // Split longer array in two for binary search


    const pivotPosition = Math.floor(array.length / 2);
    const pivotElement = array[pivotPosition];
    const pivotValue = accessor(pivotElement);

    if (value === pivotValue) {
      return pivotElement;
    }

    if (value < pivotValue) {
      return binarySearch(array.slice(0, pivotPosition + 1), value, accessor);
    }

    if (value > pivotValue) {
      return binarySearch(array.slice(pivotPosition - 1), value, accessor);
    }
  }

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
      this.date = date; // Save formatted date for faster access

      this.dateString = date.toISOString().slice(0, 19).replace('T', ' ');
      this.speed = +speed;
      this.selectedTrack = +selectedTrack;
      this.timeSelection = timeSelection;
      this.comment = comment;
      this.sortByTime();
    }
    /**
     * Returns a copy of the Note object
     *
     * @returns {Recording} new recording
     */


    clone() {
      return new Recording(this.name, this.date, this.getNotes().map(d => d.clone()), this.speed, this.selectedTrack, this.timeSelection === null ? null : [...this.timeSelection], this.comment);
    }
    /**
     * Returns true if this Recording and otherRecording have equal attributes.
     *
     * @param {Recording} otherRecording another Recording
     * @returns {boolean} true if equal
     */


    equals(otherRecording) {
      if (!(otherRecording instanceof Recording)) {
        return false;
      }

      if (this.name !== otherRecording.name) {
        return false;
      }

      if (this.date.getTime() !== otherRecording.date.getTime()) {
        return false;
      }

      if (this.speed !== otherRecording.speed) {
        return false;
      }

      if (this.selectedTrack !== otherRecording.selectedTrack) {
        return false;
      }

      if (this.timeSelection !== otherRecording.timeSelection) {
        if (this.timeSelection === null || otherRecording.timeSelection === null) {
          return false;
        }

        if (!arrayShallowEquals(this.timeSelection, otherRecording.timeSelection)) {
          return false;
        }
      } // Below is the same as NoteArray


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

      if (this.comment !== otherRecording.comment) {
        return false;
      }

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
        comment: this.comment
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
      let {
        name,
        date,
        notes
      } = object; // Check for undefined

      const values = [name, date, notes];
      const names = ['name', 'date', 'notes'];

      for (const [index, value] of values.entries()) {
        if (value === undefined || value === null) {
          throw new Error(`Cannot create Recording with undefined ${names[index]}`);
        }
      } // Parse date if it is a string


      if (typeof date === 'string') {
        date = new Date(Date.parse(date));
      }

      const {
        speed,
        selectedTrack,
        timeSelection,
        comment
      } = object;
      return new Recording(name, date, notes, speed, selectedTrack, timeSelection, comment);
    }

  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var main = {exports: {}};

  /*
      Project Name : midi-parser-js
      Project Url  : https://github.com/colxi/midi-parser-js/
      Author       : colxi
      Author URL   : http://www.colxi.info/
      Description  : MidiParser library reads .MID binary files, Base64 encoded MIDI Data,
      or UInt8 Arrays, and outputs as a readable and structured JS object.
  */

  (function (module) {
    (function () {
      /**
       * CROSSBROWSER & NODEjs POLYFILL for ATOB() -
       * By: https://github.com/MaxArt2501 (modified)
       * @param  {string} string [description]
       * @return {[type]}        [description]
       */

      const _atob = function (string) {
        // base64 character set, plus padding character (=)
        let b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='; // Regular expression to check formal correctness of base64 encoded strings

        let b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/; // remove data type signatures at the begining of the string
        // eg :  "data:audio/mid;base64,"

        string = string.replace(/^.*?base64,/, ''); // atob can work with strings with whitespaces, even inside the encoded part,
        // but only \t, \n, \f, \r and ' ', which can be stripped.

        string = String(string).replace(/[\t\n\f\r ]+/g, '');
        if (!b64re.test(string)) throw new TypeError('Failed to execute _atob() : The string to be decoded is not correctly encoded.'); // Adding the padding if missing, for semplicity

        string += '=='.slice(2 - (string.length & 3));
        let bitmap,
            result = '';
        let r1,
            r2,
            i = 0;

        for (; i < string.length;) {
          bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 | (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));
          result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
        }

        return result;
      };
      /**
       * [MidiParser description]
       * @type {Object}
       */


      const MidiParser = {
        // debug (bool), when enabled will log in console unimplemented events
        // warnings and internal handled errors.
        debug: false,

        /**
         * [parse description]
         * @param  {[type]} input     [description]
         * @param  {[type]} _callback [description]
         * @return {[type]}           [description]
         */
        parse: function (input, _callback) {
          if (input instanceof Uint8Array) return MidiParser.Uint8(input);else if (typeof input === 'string') return MidiParser.Base64(input);else if (input instanceof HTMLElement && input.type === 'file') return MidiParser.addListener(input, _callback);else throw new Error('MidiParser.parse() : Invalid input provided');
        },

        /**
         * addListener() should be called in order attach a listener to the INPUT HTML element
         * that will provide the binary data automating the conversion, and returning
         * the structured data to the provided callback function.
         */
        addListener: function (_fileElement, _callback) {
          if (!File || !FileReader) throw new Error('The File|FileReader APIs are not supported in this browser. Use instead MidiParser.Base64() or MidiParser.Uint8()'); // validate provided element

          if (_fileElement === undefined || !(_fileElement instanceof HTMLElement) || _fileElement.tagName !== 'INPUT' || _fileElement.type.toLowerCase() !== 'file') {
            console.warn('MidiParser.addListener() : Provided element is not a valid FILE INPUT element');
            return false;
          }

          _callback = _callback || function () {};

          _fileElement.addEventListener('change', function (InputEvt) {
            // set the 'file selected' event handler
            if (!InputEvt.target.files.length) return false; // return false if no elements where selected

            console.log('MidiParser.addListener() : File detected in INPUT ELEMENT processing data..');
            let reader = new FileReader(); // prepare the file Reader

            reader.readAsArrayBuffer(InputEvt.target.files[0]); // read the binary data

            reader.onload = function (e) {
              _callback(MidiParser.Uint8(new Uint8Array(e.target.result))); // encode data with Uint8Array and call the parser

            };
          });
        },

        /**
         * Base64() : convert baset4 string into uint8 array buffer, before performing the
         * parsing subroutine.
         */
        Base64: function (b64String) {
          b64String = String(b64String);

          let raw = _atob(b64String);

          let rawLength = raw.length;
          let t_array = new Uint8Array(new ArrayBuffer(rawLength));

          for (let i = 0; i < rawLength; i++) t_array[i] = raw.charCodeAt(i);

          return MidiParser.Uint8(t_array);
        },

        /**
         * parse() : function reads the binary data, interpreting and spliting each chuck
         * and parsing it to a structured Object. When job is finised returns the object
         * or 'false' if any error was generated.
         */
        Uint8: function (FileAsUint8Array) {
          let file = {
            data: null,
            pointer: 0,
            movePointer: function (_bytes) {
              // move the pointer negative and positive direction
              this.pointer += _bytes;
              return this.pointer;
            },
            readInt: function (_bytes) {
              // get integer from next _bytes group (big-endian)
              _bytes = Math.min(_bytes, this.data.byteLength - this.pointer);
              if (_bytes < 1) return -1; // EOF

              let value = 0;

              if (_bytes > 1) {
                for (let i = 1; i <= _bytes - 1; i++) {
                  value += this.data.getUint8(this.pointer) * Math.pow(256, _bytes - i);
                  this.pointer++;
                }
              }

              value += this.data.getUint8(this.pointer);
              this.pointer++;
              return value;
            },
            readStr: function (_bytes) {
              // read as ASCII chars, the followoing _bytes
              let text = '';

              for (let char = 1; char <= _bytes; char++) text += String.fromCharCode(this.readInt(1));

              return text;
            },
            readIntVLV: function () {
              // read a variable length value
              let value = 0;

              if (this.pointer >= this.data.byteLength) {
                return -1; // EOF
              } else if (this.data.getUint8(this.pointer) < 128) {
                // ...value in a single byte
                value = this.readInt(1);
              } else {
                // ...value in multiple bytes
                let FirstBytes = [];

                while (this.data.getUint8(this.pointer) >= 128) {
                  FirstBytes.push(this.readInt(1) - 128);
                }

                let lastByte = this.readInt(1);

                for (let dt = 1; dt <= FirstBytes.length; dt++) {
                  value += FirstBytes[FirstBytes.length - dt] * Math.pow(128, dt);
                }

                value += lastByte;
              }

              return value;
            }
          };
          file.data = new DataView(FileAsUint8Array.buffer, FileAsUint8Array.byteOffset, FileAsUint8Array.byteLength); // 8 bits bytes file data array
          //  ** read FILE HEADER

          if (file.readInt(4) !== 0x4D546864) {
            console.warn('Header validation failed (not MIDI standard or file corrupt.)');
            return false; // Header validation failed (not MIDI standard or file corrupt.)
          }

          file.readInt(4); // header size (unused var), getted just for read pointer movement

          let MIDI = {}; // create new midi object

          MIDI.formatType = file.readInt(2); // get MIDI Format Type

          MIDI.tracks = file.readInt(2); // get ammount of track chunks

          MIDI.track = []; // create array key for track data storing

          let timeDivisionByte1 = file.readInt(1); // get Time Division first byte

          let timeDivisionByte2 = file.readInt(1); // get Time Division second byte

          if (timeDivisionByte1 >= 128) {
            // discover Time Division mode (fps or tpf)
            MIDI.timeDivision = [];
            MIDI.timeDivision[0] = timeDivisionByte1 - 128; // frames per second MODE  (1st byte)

            MIDI.timeDivision[1] = timeDivisionByte2; // ticks in each frame     (2nd byte)
          } else MIDI.timeDivision = timeDivisionByte1 * 256 + timeDivisionByte2; // else... ticks per beat MODE  (2 bytes value)
          //  ** read TRACK CHUNK


          for (let t = 1; t <= MIDI.tracks; t++) {
            MIDI.track[t - 1] = {
              event: []
            }; // create new Track entry in Array

            let headerValidation = file.readInt(4);
            if (headerValidation === -1) break; // EOF

            if (headerValidation !== 0x4D54726B) return false; // Track chunk header validation failed.

            file.readInt(4); // move pointer. get chunk size (bytes length)

            let e = 0; // init event counter

            let endOfTrack = false; // FLAG for track reading secuence breaking
            // ** read EVENT CHUNK

            let statusByte;
            let laststatusByte;

            while (!endOfTrack) {
              e++; // increase by 1 event counter

              MIDI.track[t - 1].event[e - 1] = {}; // create new event object, in events array

              MIDI.track[t - 1].event[e - 1].deltaTime = file.readIntVLV(); // get DELTA TIME OF MIDI event (Variable Length Value)

              statusByte = file.readInt(1); // read EVENT TYPE (STATUS BYTE)

              if (statusByte === -1) break; // EOF
              else if (statusByte >= 128) laststatusByte = statusByte; // NEW STATUS BYTE DETECTED
                else {
                    // 'RUNNING STATUS' situation detected
                    statusByte = laststatusByte; // apply last loop, Status Byte

                    file.movePointer(-1); // move back the pointer (cause readed byte is not status byte)
                  } //
              // ** IS META EVENT
              //

              if (statusByte === 0xFF) {
                // Meta Event type
                MIDI.track[t - 1].event[e - 1].type = 0xFF; // assign metaEvent code to array

                MIDI.track[t - 1].event[e - 1].metaType = file.readInt(1); // assign metaEvent subtype

                let metaEventLength = file.readIntVLV(); // get the metaEvent length

                switch (MIDI.track[t - 1].event[e - 1].metaType) {
                  case 0x2F: // end of track, has no data byte

                  case -1:
                    // EOF
                    endOfTrack = true; // change FLAG to force track reading loop breaking

                    break;

                  case 0x01: // Text Event

                  case 0x02: // Copyright Notice

                  case 0x03:
                  case 0x04: // Instrument Name

                  case 0x05: // Lyrics)

                  case 0x07: // Cue point                                         // Sequence/Track Name (documentation: http://www.ta7.de/txt/musik/musi0006.htm)

                  case 0x06:
                    // Marker
                    MIDI.track[t - 1].event[e - 1].data = file.readStr(metaEventLength);
                    break;

                  case 0x21: // MIDI PORT

                  case 0x59: // Key Signature

                  case 0x51:
                    // Set Tempo
                    MIDI.track[t - 1].event[e - 1].data = file.readInt(metaEventLength);
                    break;

                  case 0x54:
                    // SMPTE Offset
                    MIDI.track[t - 1].event[e - 1].data = [];
                    MIDI.track[t - 1].event[e - 1].data[0] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[1] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[2] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[3] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[4] = file.readInt(1);
                    break;

                  case 0x58:
                    // Time Signature
                    MIDI.track[t - 1].event[e - 1].data = [];
                    MIDI.track[t - 1].event[e - 1].data[0] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[1] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[2] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[3] = file.readInt(1);
                    break;

                  default:
                    // if user provided a custom interpreter, call it
                    // and assign to event the returned data
                    if (this.customInterpreter !== null) {
                      MIDI.track[t - 1].event[e - 1].data = this.customInterpreter(MIDI.track[t - 1].event[e - 1].metaType, file, metaEventLength);
                    } // if no customInterpretr is provided, or returned
                    // false (=apply default), perform default action


                    if (this.customInterpreter === null || MIDI.track[t - 1].event[e - 1].data === false) {
                      file.readInt(metaEventLength);
                      MIDI.track[t - 1].event[e - 1].data = file.readInt(metaEventLength);
                      if (this.debug) console.info('Unimplemented 0xFF meta event! data block readed as Integer');
                    }

                }
              } //
              // IS REGULAR EVENT
              //
              else {
                  // MIDI Control Events OR System Exclusive Events
                  statusByte = statusByte.toString(16).split(''); // split the status byte HEX representation, to obtain 4 bits values

                  if (!statusByte[1]) statusByte.unshift('0'); // force 2 digits

                  MIDI.track[t - 1].event[e - 1].type = parseInt(statusByte[0], 16); // first byte is EVENT TYPE ID

                  MIDI.track[t - 1].event[e - 1].channel = parseInt(statusByte[1], 16); // second byte is channel

                  switch (MIDI.track[t - 1].event[e - 1].type) {
                    case 0xF:
                      {
                        // System Exclusive Events
                        // if user provided a custom interpreter, call it
                        // and assign to event the returned data
                        if (this.customInterpreter !== null) {
                          MIDI.track[t - 1].event[e - 1].data = this.customInterpreter(MIDI.track[t - 1].event[e - 1].type, file, false);
                        } // if no customInterpretr is provided, or returned
                        // false (=apply default), perform default action


                        if (this.customInterpreter === null || MIDI.track[t - 1].event[e - 1].data === false) {
                          let event_length = file.readIntVLV();
                          MIDI.track[t - 1].event[e - 1].data = file.readInt(event_length);
                          if (this.debug) console.info('Unimplemented 0xF exclusive events! data block readed as Integer');
                        }

                        break;
                      }

                    case 0xA: // Note Aftertouch

                    case 0xB: // Controller

                    case 0xE: // Pitch Bend Event

                    case 0x8: // Note off

                    case 0x9:
                      // Note On
                      MIDI.track[t - 1].event[e - 1].data = [];
                      MIDI.track[t - 1].event[e - 1].data[0] = file.readInt(1);
                      MIDI.track[t - 1].event[e - 1].data[1] = file.readInt(1);
                      break;

                    case 0xC: // Program Change

                    case 0xD:
                      // Channel Aftertouch
                      MIDI.track[t - 1].event[e - 1].data = file.readInt(1);
                      break;

                    case -1:
                      // EOF
                      endOfTrack = true; // change FLAG to force track reading loop breaking

                      break;

                    default:
                      // if user provided a custom interpreter, call it
                      // and assign to event the returned data
                      if (this.customInterpreter !== null) {
                        MIDI.track[t - 1].event[e - 1].data = this.customInterpreter(MIDI.track[t - 1].event[e - 1].metaType, file, false);
                      } // if no customInterpretr is provided, or returned
                      // false (=apply default), perform default action


                      if (this.customInterpreter === null || MIDI.track[t - 1].event[e - 1].data === false) {
                        console.log('Unknown EVENT detected... reading cancelled!');
                        return false;
                      }

                  }
                }
            }
          }

          return MIDI;
        },

        /**
         * custom function to handle unimplemented, or custom midi messages.
         * If message is a meta-event, the value of metaEventLength will be >0.
         * Function must return the value to store, and pointer of dataView needs
         * to be manually increased
         * If you want default action to be performed, return false
         */
        customInterpreter: null // function( e_type , arrayByffer, metaEventLength){ return e_data_int }

      }; // if running in NODE export module

      module.exports = MidiParser;
    })();
  })(main);

  var Midi$1 = {};

  var midiFile = {};

  function parseMidi(data) {
    var p = new Parser(data);
    var headerChunk = p.readChunk();
    if (headerChunk.id != 'MThd') throw "Bad MIDI file.  Expected 'MHdr', got: '" + headerChunk.id + "'";
    var header = parseHeader(headerChunk.data);
    var tracks = [];

    for (var i = 0; !p.eof() && i < header.numTracks; i++) {
      var trackChunk = p.readChunk();
      if (trackChunk.id != 'MTrk') throw "Bad MIDI file.  Expected 'MTrk', got: '" + trackChunk.id + "'";
      var track = parseTrack(trackChunk.data);
      tracks.push(track);
    }

    return {
      header: header,
      tracks: tracks
    };
  }

  function parseHeader(data) {
    var p = new Parser(data);
    var format = p.readUInt16();
    var numTracks = p.readUInt16();
    var result = {
      format: format,
      numTracks: numTracks
    };
    var timeDivision = p.readUInt16();

    if (timeDivision & 0x8000) {
      result.framesPerSecond = 0x100 - (timeDivision >> 8);
      result.ticksPerFrame = timeDivision & 0xFF;
    } else {
      result.ticksPerBeat = timeDivision;
    }

    return result;
  }

  function parseTrack(data) {
    var p = new Parser(data);
    var events = [];

    while (!p.eof()) {
      var event = readEvent();
      events.push(event);
    }

    return events;
    var lastEventTypeByte = null;

    function readEvent() {
      var event = {};
      event.deltaTime = p.readVarInt();
      var eventTypeByte = p.readUInt8();

      if ((eventTypeByte & 0xf0) === 0xf0) {
        // system / meta event
        if (eventTypeByte === 0xff) {
          // meta event
          event.meta = true;
          var metatypeByte = p.readUInt8();
          var length = p.readVarInt();

          switch (metatypeByte) {
            case 0x00:
              event.type = 'sequenceNumber';
              if (length !== 2) throw "Expected length for sequenceNumber event is 2, got " + length;
              event.number = p.readUInt16();
              return event;

            case 0x01:
              event.type = 'text';
              event.text = p.readString(length);
              return event;

            case 0x02:
              event.type = 'copyrightNotice';
              event.text = p.readString(length);
              return event;

            case 0x03:
              event.type = 'trackName';
              event.text = p.readString(length);
              return event;

            case 0x04:
              event.type = 'instrumentName';
              event.text = p.readString(length);
              return event;

            case 0x05:
              event.type = 'lyrics';
              event.text = p.readString(length);
              return event;

            case 0x06:
              event.type = 'marker';
              event.text = p.readString(length);
              return event;

            case 0x07:
              event.type = 'cuePoint';
              event.text = p.readString(length);
              return event;

            case 0x20:
              event.type = 'channelPrefix';
              if (length != 1) throw "Expected length for channelPrefix event is 1, got " + length;
              event.channel = p.readUInt8();
              return event;

            case 0x21:
              event.type = 'portPrefix';
              if (length != 1) throw "Expected length for portPrefix event is 1, got " + length;
              event.port = p.readUInt8();
              return event;

            case 0x2f:
              event.type = 'endOfTrack';
              if (length != 0) throw "Expected length for endOfTrack event is 0, got " + length;
              return event;

            case 0x51:
              event.type = 'setTempo';
              if (length != 3) throw "Expected length for setTempo event is 3, got " + length;
              event.microsecondsPerBeat = p.readUInt24();
              return event;

            case 0x54:
              event.type = 'smpteOffset';
              if (length != 5) throw "Expected length for smpteOffset event is 5, got " + length;
              var hourByte = p.readUInt8();
              var FRAME_RATES = {
                0x00: 24,
                0x20: 25,
                0x40: 29,
                0x60: 30
              };
              event.frameRate = FRAME_RATES[hourByte & 0x60];
              event.hour = hourByte & 0x1f;
              event.min = p.readUInt8();
              event.sec = p.readUInt8();
              event.frame = p.readUInt8();
              event.subFrame = p.readUInt8();
              return event;

            case 0x58:
              event.type = 'timeSignature';
              if (length != 4) throw "Expected length for timeSignature event is 4, got " + length;
              event.numerator = p.readUInt8();
              event.denominator = 1 << p.readUInt8();
              event.metronome = p.readUInt8();
              event.thirtyseconds = p.readUInt8();
              return event;

            case 0x59:
              event.type = 'keySignature';
              if (length != 2) throw "Expected length for keySignature event is 2, got " + length;
              event.key = p.readInt8();
              event.scale = p.readUInt8();
              return event;

            case 0x7f:
              event.type = 'sequencerSpecific';
              event.data = p.readBytes(length);
              return event;

            default:
              event.type = 'unknownMeta';
              event.data = p.readBytes(length);
              event.metatypeByte = metatypeByte;
              return event;
          }
        } else if (eventTypeByte == 0xf0) {
          event.type = 'sysEx';
          var length = p.readVarInt();
          event.data = p.readBytes(length);
          return event;
        } else if (eventTypeByte == 0xf7) {
          event.type = 'endSysEx';
          var length = p.readVarInt();
          event.data = p.readBytes(length);
          return event;
        } else {
          throw "Unrecognised MIDI event type byte: " + eventTypeByte;
        }
      } else {
        // channel event
        var param1;

        if ((eventTypeByte & 0x80) === 0) {
          // running status - reuse lastEventTypeByte as the event type.
          // eventTypeByte is actually the first parameter
          if (lastEventTypeByte === null) throw "Running status byte encountered before status byte";
          param1 = eventTypeByte;
          eventTypeByte = lastEventTypeByte;
          event.running = true;
        } else {
          param1 = p.readUInt8();
          lastEventTypeByte = eventTypeByte;
        }

        var eventType = eventTypeByte >> 4;
        event.channel = eventTypeByte & 0x0f;

        switch (eventType) {
          case 0x08:
            event.type = 'noteOff';
            event.noteNumber = param1;
            event.velocity = p.readUInt8();
            return event;

          case 0x09:
            var velocity = p.readUInt8();
            event.type = velocity === 0 ? 'noteOff' : 'noteOn';
            event.noteNumber = param1;
            event.velocity = velocity;
            if (velocity === 0) event.byte9 = true;
            return event;

          case 0x0a:
            event.type = 'noteAftertouch';
            event.noteNumber = param1;
            event.amount = p.readUInt8();
            return event;

          case 0x0b:
            event.type = 'controller';
            event.controllerType = param1;
            event.value = p.readUInt8();
            return event;

          case 0x0c:
            event.type = 'programChange';
            event.programNumber = param1;
            return event;

          case 0x0d:
            event.type = 'channelAftertouch';
            event.amount = param1;
            return event;

          case 0x0e:
            event.type = 'pitchBend';
            event.value = param1 + (p.readUInt8() << 7) - 0x2000;
            return event;

          default:
            throw "Unrecognised MIDI event type: " + eventType;
        }
      }
    }
  }

  function Parser(data) {
    this.buffer = data;
    this.bufferLen = this.buffer.length;
    this.pos = 0;
  }

  Parser.prototype.eof = function () {
    return this.pos >= this.bufferLen;
  };

  Parser.prototype.readUInt8 = function () {
    var result = this.buffer[this.pos];
    this.pos += 1;
    return result;
  };

  Parser.prototype.readInt8 = function () {
    var u = this.readUInt8();
    if (u & 0x80) return u - 0x100;else return u;
  };

  Parser.prototype.readUInt16 = function () {
    var b0 = this.readUInt8(),
        b1 = this.readUInt8();
    return (b0 << 8) + b1;
  };

  Parser.prototype.readInt16 = function () {
    var u = this.readUInt16();
    if (u & 0x8000) return u - 0x10000;else return u;
  };

  Parser.prototype.readUInt24 = function () {
    var b0 = this.readUInt8(),
        b1 = this.readUInt8(),
        b2 = this.readUInt8();
    return (b0 << 16) + (b1 << 8) + b2;
  };

  Parser.prototype.readInt24 = function () {
    var u = this.readUInt24();
    if (u & 0x800000) return u - 0x1000000;else return u;
  };

  Parser.prototype.readUInt32 = function () {
    var b0 = this.readUInt8(),
        b1 = this.readUInt8(),
        b2 = this.readUInt8(),
        b3 = this.readUInt8();
    return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
  };

  Parser.prototype.readBytes = function (len) {
    var bytes = this.buffer.slice(this.pos, this.pos + len);
    this.pos += len;
    return bytes;
  };

  Parser.prototype.readString = function (len) {
    var bytes = this.readBytes(len);
    return String.fromCharCode.apply(null, bytes);
  };

  Parser.prototype.readVarInt = function () {
    var result = 0;

    while (!this.eof()) {
      var b = this.readUInt8();

      if (b & 0x80) {
        result += b & 0x7f;
        result <<= 7;
      } else {
        // b is last byte
        return result + b;
      }
    } // premature eof


    return result;
  };

  Parser.prototype.readChunk = function () {
    var id = this.readString(4);
    var length = this.readUInt32();
    var data = this.readBytes(length);
    return {
      id: id,
      length: length,
      data: data
    };
  };

  var midiParser = parseMidi;

  // for maximum compatibililty, returns an array of byte values, suitable for conversion to Buffer, Uint8Array, etc.
  // opts:
  // - running              reuse previous eventTypeByte when possible, to compress file
  // - useByte9ForNoteOff   use 0x09 for noteOff when velocity is zero

  function writeMidi(data, opts) {
    if (typeof data !== 'object') throw 'Invalid MIDI data';
    opts = opts || {};
    var header = data.header || {};
    var tracks = data.tracks || [];
    var i,
        len = tracks.length;
    var w = new Writer();
    writeHeader(w, header, len);

    for (i = 0; i < len; i++) {
      writeTrack(w, tracks[i], opts);
    }

    return w.buffer;
  }

  function writeHeader(w, header, numTracks) {
    var format = header.format == null ? 1 : header.format;
    var timeDivision = 128;

    if (header.timeDivision) {
      timeDivision = header.timeDivision;
    } else if (header.ticksPerFrame && header.framesPerSecond) {
      timeDivision = -(header.framesPerSecond & 0xFF) << 8 | header.ticksPerFrame & 0xFF;
    } else if (header.ticksPerBeat) {
      timeDivision = header.ticksPerBeat & 0x7FFF;
    }

    var h = new Writer();
    h.writeUInt16(format);
    h.writeUInt16(numTracks);
    h.writeUInt16(timeDivision);
    w.writeChunk('MThd', h.buffer);
  }

  function writeTrack(w, track, opts) {
    var t = new Writer();
    var i,
        len = track.length;
    var eventTypeByte = null;

    for (i = 0; i < len; i++) {
      // Reuse last eventTypeByte when opts.running is set, or event.running is explicitly set on it.
      // parseMidi will set event.running for each event, so that we can get an exact copy by default.
      // Explicitly set opts.running to false, to override event.running and never reuse last eventTypeByte.
      if (opts.running === false || !opts.running && !track[i].running) eventTypeByte = null;
      eventTypeByte = writeEvent(t, track[i], eventTypeByte, opts.useByte9ForNoteOff);
    }

    w.writeChunk('MTrk', t.buffer);
  }

  function writeEvent(w, event, lastEventTypeByte, useByte9ForNoteOff) {
    var type = event.type;
    var deltaTime = event.deltaTime;
    var text = event.text || '';
    var data = event.data || [];
    var eventTypeByte = null;
    w.writeVarInt(deltaTime);

    switch (type) {
      // meta events
      case 'sequenceNumber':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x00);
        w.writeVarInt(2);
        w.writeUInt16(event.number);
        break;

      case 'text':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x01);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;

      case 'copyrightNotice':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x02);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;

      case 'trackName':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x03);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;

      case 'instrumentName':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x04);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;

      case 'lyrics':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x05);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;

      case 'marker':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x06);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;

      case 'cuePoint':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x07);
        w.writeVarInt(text.length);
        w.writeString(text);
        break;

      case 'channelPrefix':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x20);
        w.writeVarInt(1);
        w.writeUInt8(event.channel);
        break;

      case 'portPrefix':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x21);
        w.writeVarInt(1);
        w.writeUInt8(event.port);
        break;

      case 'endOfTrack':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x2F);
        w.writeVarInt(0);
        break;

      case 'setTempo':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x51);
        w.writeVarInt(3);
        w.writeUInt24(event.microsecondsPerBeat);
        break;

      case 'smpteOffset':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x54);
        w.writeVarInt(5);
        var FRAME_RATES = {
          24: 0x00,
          25: 0x20,
          29: 0x40,
          30: 0x60
        };
        var hourByte = event.hour & 0x1F | FRAME_RATES[event.frameRate];
        w.writeUInt8(hourByte);
        w.writeUInt8(event.min);
        w.writeUInt8(event.sec);
        w.writeUInt8(event.frame);
        w.writeUInt8(event.subFrame);
        break;

      case 'timeSignature':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x58);
        w.writeVarInt(4);
        w.writeUInt8(event.numerator);
        var denominator = Math.floor(Math.log(event.denominator) / Math.LN2) & 0xFF;
        w.writeUInt8(denominator);
        w.writeUInt8(event.metronome);
        w.writeUInt8(event.thirtyseconds || 8);
        break;

      case 'keySignature':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x59);
        w.writeVarInt(2);
        w.writeInt8(event.key);
        w.writeUInt8(event.scale);
        break;

      case 'sequencerSpecific':
        w.writeUInt8(0xFF);
        w.writeUInt8(0x7F);
        w.writeVarInt(data.length);
        w.writeBytes(data);
        break;

      case 'unknownMeta':
        if (event.metatypeByte != null) {
          w.writeUInt8(0xFF);
          w.writeUInt8(event.metatypeByte);
          w.writeVarInt(data.length);
          w.writeBytes(data);
        }

        break;
      // system-exclusive

      case 'sysEx':
        w.writeUInt8(0xF0);
        w.writeVarInt(data.length);
        w.writeBytes(data);
        break;

      case 'endSysEx':
        w.writeUInt8(0xF7);
        w.writeVarInt(data.length);
        w.writeBytes(data);
        break;
      // channel events

      case 'noteOff':
        // Use 0x90 when opts.useByte9ForNoteOff is set and velocity is zero, or when event.byte9 is explicitly set on it.
        // parseMidi will set event.byte9 for each event, so that we can get an exact copy by default.
        // Explicitly set opts.useByte9ForNoteOff to false, to override event.byte9 and always use 0x80 for noteOff events.
        var noteByte = useByte9ForNoteOff !== false && event.byte9 || useByte9ForNoteOff && event.velocity == 0 ? 0x90 : 0x80;
        eventTypeByte = noteByte | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.noteNumber);
        w.writeUInt8(event.velocity);
        break;

      case 'noteOn':
        eventTypeByte = 0x90 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.noteNumber);
        w.writeUInt8(event.velocity);
        break;

      case 'noteAftertouch':
        eventTypeByte = 0xA0 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.noteNumber);
        w.writeUInt8(event.amount);
        break;

      case 'controller':
        eventTypeByte = 0xB0 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.controllerType);
        w.writeUInt8(event.value);
        break;

      case 'programChange':
        eventTypeByte = 0xC0 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.programNumber);
        break;

      case 'channelAftertouch':
        eventTypeByte = 0xD0 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        w.writeUInt8(event.amount);
        break;

      case 'pitchBend':
        eventTypeByte = 0xE0 | event.channel;
        if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte);
        var value14 = 0x2000 + event.value;
        var lsb14 = value14 & 0x7F;
        var msb14 = value14 >> 7 & 0x7F;
        w.writeUInt8(lsb14);
        w.writeUInt8(msb14);
        break;

      default:
        throw 'Unrecognized event type: ' + type;
    }

    return eventTypeByte;
  }

  function Writer() {
    this.buffer = [];
  }

  Writer.prototype.writeUInt8 = function (v) {
    this.buffer.push(v & 0xFF);
  };

  Writer.prototype.writeInt8 = Writer.prototype.writeUInt8;

  Writer.prototype.writeUInt16 = function (v) {
    var b0 = v >> 8 & 0xFF,
        b1 = v & 0xFF;
    this.writeUInt8(b0);
    this.writeUInt8(b1);
  };

  Writer.prototype.writeInt16 = Writer.prototype.writeUInt16;

  Writer.prototype.writeUInt24 = function (v) {
    var b0 = v >> 16 & 0xFF,
        b1 = v >> 8 & 0xFF,
        b2 = v & 0xFF;
    this.writeUInt8(b0);
    this.writeUInt8(b1);
    this.writeUInt8(b2);
  };

  Writer.prototype.writeInt24 = Writer.prototype.writeUInt24;

  Writer.prototype.writeUInt32 = function (v) {
    var b0 = v >> 24 & 0xFF,
        b1 = v >> 16 & 0xFF,
        b2 = v >> 8 & 0xFF,
        b3 = v & 0xFF;
    this.writeUInt8(b0);
    this.writeUInt8(b1);
    this.writeUInt8(b2);
    this.writeUInt8(b3);
  };

  Writer.prototype.writeInt32 = Writer.prototype.writeUInt32;

  Writer.prototype.writeBytes = function (arr) {
    this.buffer = this.buffer.concat(Array.prototype.slice.call(arr, 0));
  };

  Writer.prototype.writeString = function (str) {
    var i,
        len = str.length,
        arr = [];

    for (i = 0; i < len; i++) {
      arr.push(str.codePointAt(i));
    }

    this.writeBytes(arr);
  };

  Writer.prototype.writeVarInt = function (v) {
    if (v < 0) throw "Cannot write negative variable-length integer";

    if (v <= 0x7F) {
      this.writeUInt8(v);
    } else {
      var i = v;
      var bytes = [];
      bytes.push(i & 0x7F);
      i >>= 7;

      while (i) {
        var b = i & 0x7F | 0x80;
        bytes.push(b);
        i >>= 7;
      }

      this.writeBytes(bytes.reverse());
    }
  };

  Writer.prototype.writeChunk = function (id, data) {
    this.writeString(id);
    this.writeUInt32(data.length);
    this.writeBytes(data);
  };

  var midiWriter = writeMidi;

  midiFile.parseMidi = midiParser;
  midiFile.writeMidi = midiWriter;

  var Encode = {};

  var Header = {};

  var BinarySearch = {};

  Object.defineProperty(BinarySearch, "__esModule", {
    value: true
  });
  /**
   * Return the index of the element at or before the given property
   * @hidden
   */

  function search(array, value, prop) {
    if (prop === void 0) {
      prop = "ticks";
    }

    var beginning = 0;
    var len = array.length;
    var end = len;

    if (len > 0 && array[len - 1][prop] <= value) {
      return len - 1;
    }

    while (beginning < end) {
      // calculate the midpoint for roughly equal partition
      var midPoint = Math.floor(beginning + (end - beginning) / 2);
      var event_1 = array[midPoint];
      var nextEvent = array[midPoint + 1];

      if (event_1[prop] === value) {
        // choose the last one that has the same value
        for (var i = midPoint; i < array.length; i++) {
          var testEvent = array[i];

          if (testEvent[prop] === value) {
            midPoint = i;
          }
        }

        return midPoint;
      } else if (event_1[prop] < value && nextEvent[prop] > value) {
        return midPoint;
      } else if (event_1[prop] > value) {
        // search lower
        end = midPoint;
      } else if (event_1[prop] < value) {
        // search upper
        beginning = midPoint + 1;
      }
    }

    return -1;
  }

  BinarySearch.search = search;
  /**
   * Does a binary search to insert the note
   * in the correct spot in the array
   * @hidden
   */

  function insert(array, event, prop) {
    if (prop === void 0) {
      prop = "ticks";
    }

    if (array.length) {
      var index = search(array, event[prop], prop);
      array.splice(index + 1, 0, event);
    } else {
      array.push(event);
    }
  }

  BinarySearch.insert = insert;

  (function (exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BinarySearch_1 = BinarySearch;
    var privatePPQMap = new WeakMap();
    /**
     * @hidden
     */

    exports.keySignatureKeys = ["Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#"];
    /** The parsed midi file header */

    var Header =
    /** @class */
    function () {
      function Header(midiData) {
        // look through all the tracks for tempo changes
        var _this = this;
        /**
         * The array of all the tempo events
         */


        this.tempos = [];
        /**
         * The time signatures
         */

        this.timeSignatures = [];
        /**
         * The time signatures
         */

        this.keySignatures = [];
        /**
         * Additional meta events
         */

        this.meta = [];
        /**
         * The name of the midi file
         */

        this.name = "";
        privatePPQMap.set(this, 480);

        if (midiData) {
          privatePPQMap.set(this, midiData.header.ticksPerBeat); // check time signature and tempo events from all of the tracks

          midiData.tracks.forEach(function (track) {
            return track.forEach(function (event) {
              if (event.meta) {
                if (event.type === "timeSignature") {
                  _this.timeSignatures.push({
                    ticks: event.absoluteTime,
                    timeSignature: [event.numerator, event.denominator]
                  });
                } else if (event.type === "setTempo") {
                  _this.tempos.push({
                    bpm: 60000000 / event.microsecondsPerBeat,
                    ticks: event.absoluteTime
                  });
                } else if (event.type === "keySignature") {
                  _this.keySignatures.push({
                    key: exports.keySignatureKeys[event.key + 7],
                    scale: event.scale === 0 ? "major" : "minor",
                    ticks: event.absoluteTime
                  });
                }
              }
            });
          }); // check the first track for other relevant data

          midiData.tracks[0].forEach(function (event) {
            if (event.meta) {
              if (event.type === "trackName") {
                _this.name = event.text;
              } else if (event.type === "text" || event.type === "cuePoint" || event.type === "marker" || event.type === "lyrics") {
                _this.meta.push({
                  text: event.text,
                  ticks: event.absoluteTime,
                  type: event.type
                });
              }
            }
          });
          this.update();
        }
      }
      /**
       * This must be invoked after any changes are made to the tempo array
       * or the timeSignature array for the updated values to be reflected.
       */


      Header.prototype.update = function () {
        var _this = this;

        var currentTime = 0;
        var lastEventBeats = 0; // make sure it's sorted

        this.tempos.sort(function (a, b) {
          return a.ticks - b.ticks;
        });
        this.tempos.forEach(function (event, index) {
          var lastBPM = index > 0 ? _this.tempos[index - 1].bpm : _this.tempos[0].bpm;
          var beats = event.ticks / _this.ppq - lastEventBeats;
          var elapsedSeconds = 60 / lastBPM * beats;
          event.time = elapsedSeconds + currentTime;
          currentTime = event.time;
          lastEventBeats += beats;
        });
        this.timeSignatures.sort(function (a, b) {
          return a.ticks - b.ticks;
        });
        this.timeSignatures.forEach(function (event, index) {
          var lastEvent = index > 0 ? _this.timeSignatures[index - 1] : _this.timeSignatures[0];
          var elapsedBeats = (event.ticks - lastEvent.ticks) / _this.ppq;
          var elapsedMeasures = elapsedBeats / lastEvent.timeSignature[0] / (lastEvent.timeSignature[1] / 4);
          lastEvent.measures = lastEvent.measures || 0;
          event.measures = elapsedMeasures + lastEvent.measures;
        });
      };
      /**
       * Convert ticks into seconds based on the tempo changes
       */


      Header.prototype.ticksToSeconds = function (ticks) {
        // find the relevant position
        var index = BinarySearch_1.search(this.tempos, ticks);

        if (index !== -1) {
          var tempo = this.tempos[index];
          var tempoTime = tempo.time;
          var elapsedBeats = (ticks - tempo.ticks) / this.ppq;
          return tempoTime + 60 / tempo.bpm * elapsedBeats;
        } else {
          // assume 120
          var beats = ticks / this.ppq;
          return 60 / 120 * beats;
        }
      };
      /**
       * Convert ticks into measures based off of the time signatures
       */


      Header.prototype.ticksToMeasures = function (ticks) {
        var index = BinarySearch_1.search(this.timeSignatures, ticks);

        if (index !== -1) {
          var timeSigEvent = this.timeSignatures[index];
          var elapsedBeats = (ticks - timeSigEvent.ticks) / this.ppq;
          return timeSigEvent.measures + elapsedBeats / (timeSigEvent.timeSignature[0] / timeSigEvent.timeSignature[1]) / 4;
        } else {
          return ticks / this.ppq / 4;
        }
      };

      Object.defineProperty(Header.prototype, "ppq", {
        /**
         * The number of ticks per quarter note
         */
        get: function () {
          return privatePPQMap.get(this);
        },
        enumerable: true,
        configurable: true
      });
      /**
       * Convert seconds to ticks based on the tempo events
       */

      Header.prototype.secondsToTicks = function (seconds) {
        // find the relevant position
        var index = BinarySearch_1.search(this.tempos, seconds, "time");

        if (index !== -1) {
          var tempo = this.tempos[index];
          var tempoTime = tempo.time;
          var elapsedTime = seconds - tempoTime;
          var elapsedBeats = elapsedTime / (60 / tempo.bpm);
          return Math.round(tempo.ticks + elapsedBeats * this.ppq);
        } else {
          // assume 120
          var beats = seconds / (60 / 120);
          return Math.round(beats * this.ppq);
        }
      };
      /**
       * Convert the header into an object.
       */


      Header.prototype.toJSON = function () {
        return {
          keySignatures: this.keySignatures,
          meta: this.meta,
          name: this.name,
          ppq: this.ppq,
          tempos: this.tempos.map(function (t) {
            return {
              bpm: t.bpm,
              ticks: t.ticks
            };
          }),
          timeSignatures: this.timeSignatures
        };
      };
      /**
       * parse a header json object.
       */


      Header.prototype.fromJSON = function (json) {
        this.name = json.name; // clone all the attributes

        this.tempos = json.tempos.map(function (t) {
          return Object.assign({}, t);
        });
        this.timeSignatures = json.timeSignatures.map(function (t) {
          return Object.assign({}, t);
        });
        this.keySignatures = json.keySignatures.map(function (t) {
          return Object.assign({}, t);
        });
        this.meta = json.meta.map(function (t) {
          return Object.assign({}, t);
        });
        privatePPQMap.set(this, json.ppq);
        this.update();
      };
      /**
       * Update the tempo of the midi to a single tempo. Will remove and replace
       * any other tempos currently set and update all of the event timing.
       * @param bpm The tempo in beats per second
       */


      Header.prototype.setTempo = function (bpm) {
        this.tempos = [{
          bpm: bpm,
          ticks: 0
        }];
        this.update();
      };

      return Header;
    }();

    exports.Header = Header;
  })(Header);

  var arrayFlatten = {exports: {}};

  /**
   * Expose `arrayFlatten`.
   */


  arrayFlatten.exports = flatten;
  arrayFlatten.exports.from = flattenFrom;
  arrayFlatten.exports.depth = flattenDepth;
  arrayFlatten.exports.fromDepth = flattenFromDepth;
  /**
   * Flatten an array.
   *
   * @param  {Array} array
   * @return {Array}
   */

  function flatten(array) {
    if (!Array.isArray(array)) {
      throw new TypeError('Expected value to be an array');
    }

    return flattenFrom(array);
  }
  /**
   * Flatten an array-like structure.
   *
   * @param  {Array} array
   * @return {Array}
   */


  function flattenFrom(array) {
    return flattenDown(array, []);
  }
  /**
   * Flatten an array-like structure with depth.
   *
   * @param  {Array}  array
   * @param  {number} depth
   * @return {Array}
   */


  function flattenDepth(array, depth) {
    if (!Array.isArray(array)) {
      throw new TypeError('Expected value to be an array');
    }

    return flattenFromDepth(array, depth);
  }
  /**
   * Flatten an array-like structure with depth.
   *
   * @param  {Array}  array
   * @param  {number} depth
   * @return {Array}
   */


  function flattenFromDepth(array, depth) {
    if (typeof depth !== 'number') {
      throw new TypeError('Expected the depth to be a number');
    }

    return flattenDownDepth(array, [], depth);
  }
  /**
   * Flatten an array indefinitely.
   *
   * @param  {Array} array
   * @param  {Array} result
   * @return {Array}
   */


  function flattenDown(array, result) {
    for (var i = 0; i < array.length; i++) {
      var value = array[i];

      if (Array.isArray(value)) {
        flattenDown(value, result);
      } else {
        result.push(value);
      }
    }

    return result;
  }
  /**
   * Flatten an array with depth.
   *
   * @param  {Array}  array
   * @param  {Array}  result
   * @param  {number} depth
   * @return {Array}
   */


  function flattenDownDepth(array, result, depth) {
    depth--;

    for (var i = 0; i < array.length; i++) {
      var value = array[i];

      if (depth > -1 && Array.isArray(value)) {
        flattenDownDepth(value, result, depth);
      } else {
        result.push(value);
      }
    }

    return result;
  }

  var __spreadArrays = commonjsGlobal && commonjsGlobal.__spreadArrays || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

    for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

    return r;
  };

  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(Encode, "__esModule", {
    value: true
  });
  var midi_file_1$1 = midiFile;
  var Header_1$1 = Header;

  var array_flatten_1 = __importDefault(arrayFlatten.exports);

  function encodeNote(note, channel) {
    return [{
      absoluteTime: note.ticks,
      channel: channel,
      deltaTime: 0,
      noteNumber: note.midi,
      type: "noteOn",
      velocity: Math.floor(note.velocity * 127)
    }, {
      absoluteTime: note.ticks + note.durationTicks,
      channel: channel,
      deltaTime: 0,
      noteNumber: note.midi,
      type: "noteOff",
      velocity: Math.floor(note.noteOffVelocity * 127)
    }];
  }

  function encodeNotes(track) {
    return array_flatten_1.default(track.notes.map(function (note) {
      return encodeNote(note, track.channel);
    }));
  }

  function encodeControlChange(cc, channel) {
    return {
      absoluteTime: cc.ticks,
      channel: channel,
      controllerType: cc.number,
      deltaTime: 0,
      type: "controller",
      value: Math.floor(cc.value * 127)
    };
  }

  function encodeControlChanges(track) {
    var controlChanges = [];

    for (var i = 0; i < 127; i++) {
      if (track.controlChanges.hasOwnProperty(i)) {
        track.controlChanges[i].forEach(function (cc) {
          controlChanges.push(encodeControlChange(cc, track.channel));
        });
      }
    }

    return controlChanges;
  }

  function encodePitchBend(pb, channel) {
    return {
      absoluteTime: pb.ticks,
      channel: channel,
      deltaTime: 0,
      type: "pitchBend",
      value: pb.value
    };
  }

  function encodePitchBends(track) {
    var pitchBends = [];
    track.pitchBends.forEach(function (pb) {
      pitchBends.push(encodePitchBend(pb, track.channel));
    });
    return pitchBends;
  }

  function encodeInstrument(track) {
    return {
      absoluteTime: 0,
      channel: track.channel,
      deltaTime: 0,
      programNumber: track.instrument.number,
      type: "programChange"
    };
  }

  function encodeTrackName(name) {
    return {
      absoluteTime: 0,
      deltaTime: 0,
      meta: true,
      text: name,
      type: "trackName"
    };
  }

  function encodeTempo(tempo) {
    return {
      absoluteTime: tempo.ticks,
      deltaTime: 0,
      meta: true,
      microsecondsPerBeat: Math.floor(60000000 / tempo.bpm),
      type: "setTempo"
    };
  }

  function encodeTimeSignature(timeSig) {
    return {
      absoluteTime: timeSig.ticks,
      deltaTime: 0,
      denominator: timeSig.timeSignature[1],
      meta: true,
      metronome: 24,
      numerator: timeSig.timeSignature[0],
      thirtyseconds: 8,
      type: "timeSignature"
    };
  } // function encodeMeta(event: )


  function encodeKeySignature(keySig) {
    var keyIndex = Header_1$1.keySignatureKeys.indexOf(keySig.key);
    return {
      absoluteTime: keySig.ticks,
      deltaTime: 0,
      key: keyIndex + 7,
      meta: true,
      scale: keySig.scale === "major" ? 0 : 1,
      type: "keySignature"
    };
  }

  function encodeText(textEvent) {
    return {
      absoluteTime: textEvent.ticks,
      deltaTime: 0,
      meta: true,
      text: textEvent.text,
      type: textEvent.type
    };
  }
  /**
   * Convert the midi object to an array
   */


  function encode$1(midi) {
    var midiData = {
      header: {
        format: 1,
        numTracks: midi.tracks.length + 1,
        ticksPerBeat: midi.header.ppq
      },
      tracks: __spreadArrays([__spreadArrays([// the name data
      {
        absoluteTime: 0,
        deltaTime: 0,
        meta: true,
        text: midi.header.name,
        type: "trackName"
      }], midi.header.keySignatures.map(function (keySig) {
        return encodeKeySignature(keySig);
      }), midi.header.meta.map(function (e) {
        return encodeText(e);
      }), midi.header.tempos.map(function (tempo) {
        return encodeTempo(tempo);
      }), midi.header.timeSignatures.map(function (timeSig) {
        return encodeTimeSignature(timeSig);
      }))], midi.tracks.map(function (track) {
        return __spreadArrays([// add the name
        encodeTrackName(track.name), // the instrument
        encodeInstrument(track)], encodeNotes(track), encodeControlChanges(track), encodePitchBends(track));
      }))
    }; // sort and set deltaTime of all of the tracks

    midiData.tracks = midiData.tracks.map(function (track) {
      track = track.sort(function (a, b) {
        return a.absoluteTime - b.absoluteTime;
      });
      var lastTime = 0;
      track.forEach(function (note) {
        note.deltaTime = note.absoluteTime - lastTime;
        lastTime = note.absoluteTime;
        delete note.absoluteTime;
      }); // end of track

      track.push({
        deltaTime: 0,
        meta: true,
        type: "endOfTrack"
      });
      return track;
    }); // return midiData

    return new Uint8Array(midi_file_1$1.writeMidi(midiData));
  }

  Encode.encode = encode$1;

  var Track$2 = {};

  var ControlChange = {};

  (function (exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /**
     * A map of values to control change names
     * @hidden
     */

    exports.controlChangeNames = {
      1: "modulationWheel",
      2: "breath",
      4: "footController",
      5: "portamentoTime",
      7: "volume",
      8: "balance",
      10: "pan",
      64: "sustain",
      65: "portamentoTime",
      66: "sostenuto",
      67: "softPedal",
      68: "legatoFootswitch",
      84: "portamentoControl"
    };
    /**
     * swap the keys and values
     * @hidden
     */

    exports.controlChangeIds = Object.keys(exports.controlChangeNames).reduce(function (obj, key) {
      obj[exports.controlChangeNames[key]] = key;
      return obj;
    }, {});
    var privateHeaderMap = new WeakMap();
    var privateCCNumberMap = new WeakMap();
    /**
     * Represents a control change event
     */

    var ControlChange =
    /** @class */
    function () {
      /**
       * @param event
       * @param header
       */
      function ControlChange(event, header) {
        privateHeaderMap.set(this, header);
        privateCCNumberMap.set(this, event.controllerType);
        this.ticks = event.absoluteTime;
        this.value = event.value;
      }

      Object.defineProperty(ControlChange.prototype, "number", {
        /**
         * The controller number
         */
        get: function () {
          return privateCCNumberMap.get(this);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ControlChange.prototype, "name", {
        /**
         * return the common name of the control number if it exists
         */
        get: function () {
          if (exports.controlChangeNames[this.number]) {
            return exports.controlChangeNames[this.number];
          } else {
            return null;
          }
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ControlChange.prototype, "time", {
        /**
         * The time of the event in seconds
         */
        get: function () {
          var header = privateHeaderMap.get(this);
          return header.ticksToSeconds(this.ticks);
        },
        set: function (t) {
          var header = privateHeaderMap.get(this);
          this.ticks = header.secondsToTicks(t);
        },
        enumerable: true,
        configurable: true
      });

      ControlChange.prototype.toJSON = function () {
        return {
          number: this.number,
          ticks: this.ticks,
          time: this.time,
          value: this.value
        };
      };

      return ControlChange;
    }();

    exports.ControlChange = ControlChange;
  })(ControlChange);

  var ControlChanges = {};

  Object.defineProperty(ControlChanges, "__esModule", {
    value: true
  });
  var ControlChange_1$1 = ControlChange;
  /**
   * Automatically creates an alias for named control values using Proxies
   * @hidden
   */

  function createControlChanges() {
    return new Proxy({}, {
      // tslint:disable-next-line: typedef
      get: function (target, handler) {
        if (target[handler]) {
          return target[handler];
        } else if (ControlChange_1$1.controlChangeIds.hasOwnProperty(handler)) {
          return target[ControlChange_1$1.controlChangeIds[handler]];
        }
      },
      // tslint:disable-next-line: typedef
      set: function (target, handler, value) {
        if (ControlChange_1$1.controlChangeIds.hasOwnProperty(handler)) {
          target[ControlChange_1$1.controlChangeIds[handler]] = value;
        } else {
          target[handler] = value;
        }

        return true;
      }
    });
  }

  ControlChanges.createControlChanges = createControlChanges;

  var PitchBend$1 = {};

  Object.defineProperty(PitchBend$1, "__esModule", {
    value: true
  });
  var privateHeaderMap$2 = new WeakMap();
  /**
   * Represents a pitch bend event
   */

  var PitchBend =
  /** @class */
  function () {
    /**
     * @param event
     * @param header
     */
    function PitchBend(event, header) {
      privateHeaderMap$2.set(this, header);
      this.ticks = event.absoluteTime;
      this.value = event.value;
    }

    Object.defineProperty(PitchBend.prototype, "time", {
      /**
       * The time of the event in seconds
       */
      get: function () {
        var header = privateHeaderMap$2.get(this);
        return header.ticksToSeconds(this.ticks);
      },
      set: function (t) {
        var header = privateHeaderMap$2.get(this);
        this.ticks = header.secondsToTicks(t);
      },
      enumerable: true,
      configurable: true
    });

    PitchBend.prototype.toJSON = function () {
      return {
        ticks: this.ticks,
        time: this.time,
        value: this.value
      };
    };

    return PitchBend;
  }();

  PitchBend$1.PitchBend = PitchBend;

  var Instrument$1 = {};

  var InstrumentMaps = {};

  Object.defineProperty(InstrumentMaps, "__esModule", {
    value: true
  });
  InstrumentMaps.instrumentByPatchID = ["acoustic grand piano", "bright acoustic piano", "electric grand piano", "honky-tonk piano", "electric piano 1", "electric piano 2", "harpsichord", "clavi", "celesta", "glockenspiel", "music box", "vibraphone", "marimba", "xylophone", "tubular bells", "dulcimer", "drawbar organ", "percussive organ", "rock organ", "church organ", "reed organ", "accordion", "harmonica", "tango accordion", "acoustic guitar (nylon)", "acoustic guitar (steel)", "electric guitar (jazz)", "electric guitar (clean)", "electric guitar (muted)", "overdriven guitar", "distortion guitar", "guitar harmonics", "acoustic bass", "electric bass (finger)", "electric bass (pick)", "fretless bass", "slap bass 1", "slap bass 2", "synth bass 1", "synth bass 2", "violin", "viola", "cello", "contrabass", "tremolo strings", "pizzicato strings", "orchestral harp", "timpani", "string ensemble 1", "string ensemble 2", "synthstrings 1", "synthstrings 2", "choir aahs", "voice oohs", "synth voice", "orchestra hit", "trumpet", "trombone", "tuba", "muted trumpet", "french horn", "brass section", "synthbrass 1", "synthbrass 2", "soprano sax", "alto sax", "tenor sax", "baritone sax", "oboe", "english horn", "bassoon", "clarinet", "piccolo", "flute", "recorder", "pan flute", "blown bottle", "shakuhachi", "whistle", "ocarina", "lead 1 (square)", "lead 2 (sawtooth)", "lead 3 (calliope)", "lead 4 (chiff)", "lead 5 (charang)", "lead 6 (voice)", "lead 7 (fifths)", "lead 8 (bass + lead)", "pad 1 (new age)", "pad 2 (warm)", "pad 3 (polysynth)", "pad 4 (choir)", "pad 5 (bowed)", "pad 6 (metallic)", "pad 7 (halo)", "pad 8 (sweep)", "fx 1 (rain)", "fx 2 (soundtrack)", "fx 3 (crystal)", "fx 4 (atmosphere)", "fx 5 (brightness)", "fx 6 (goblins)", "fx 7 (echoes)", "fx 8 (sci-fi)", "sitar", "banjo", "shamisen", "koto", "kalimba", "bag pipe", "fiddle", "shanai", "tinkle bell", "agogo", "steel drums", "woodblock", "taiko drum", "melodic tom", "synth drum", "reverse cymbal", "guitar fret noise", "breath noise", "seashore", "bird tweet", "telephone ring", "helicopter", "applause", "gunshot"];
  InstrumentMaps.InstrumentFamilyByID = ["piano", "chromatic percussion", "organ", "guitar", "bass", "strings", "ensemble", "brass", "reed", "pipe", "synth lead", "synth pad", "synth effects", "world", "percussive", "sound effects"];
  InstrumentMaps.DrumKitByPatchID = {
    0: "standard kit",
    8: "room kit",
    16: "power kit",
    24: "electronic kit",
    25: "tr-808 kit",
    32: "jazz kit",
    40: "brush kit",
    48: "orchestra kit",
    56: "sound fx kit"
  };

  Object.defineProperty(Instrument$1, "__esModule", {
    value: true
  });
  var InstrumentMaps_1 = InstrumentMaps;
  /**
   * @hidden
   */

  var privateTrackMap = new WeakMap();
  /**
   * Describes the midi instrument of a track
   */

  var Instrument =
  /** @class */
  function () {
    /**
     * @param trackData
     * @param track
     */
    function Instrument(trackData, track) {
      /**
       * The instrument number
       */
      this.number = 0;
      privateTrackMap.set(this, track);
      this.number = 0;

      if (trackData) {
        var programChange = trackData.find(function (e) {
          return e.type === "programChange";
        });

        if (programChange) {
          this.number = programChange.programNumber;
        }
      }
    }

    Object.defineProperty(Instrument.prototype, "name", {
      /**
       * The common name of the instrument
       */
      get: function () {
        if (this.percussion) {
          return InstrumentMaps_1.DrumKitByPatchID[this.number];
        } else {
          return InstrumentMaps_1.instrumentByPatchID[this.number];
        }
      },
      set: function (n) {
        var patchNumber = InstrumentMaps_1.instrumentByPatchID.indexOf(n);

        if (patchNumber !== -1) {
          this.number = patchNumber;
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Instrument.prototype, "family", {
      /**
       * The instrument family, e.g. "piano".
       */
      get: function () {
        if (this.percussion) {
          return "drums";
        } else {
          return InstrumentMaps_1.InstrumentFamilyByID[Math.floor(this.number / 8)];
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Instrument.prototype, "percussion", {
      /**
       * If the instrument is a percussion instrument
       */
      get: function () {
        var track = privateTrackMap.get(this);
        return track.channel === 9;
      },
      enumerable: true,
      configurable: true
    });
    /**
     * Convert it to JSON form
     */

    Instrument.prototype.toJSON = function () {
      return {
        family: this.family,
        name: this.name,
        number: this.number
      };
    };
    /**
     * Convert from JSON form
     */


    Instrument.prototype.fromJSON = function (json) {
      this.number = json.number;
    };

    return Instrument;
  }();

  Instrument$1.Instrument = Instrument;

  var Note$1 = {};

  Object.defineProperty(Note$1, "__esModule", {
    value: true
  });
  /**
   * Convert a midi note into a pitch
   */

  function midiToPitch(midi) {
    var octave = Math.floor(midi / 12) - 1;
    return midiToPitchClass(midi) + octave.toString();
  }
  /**
   * Convert a midi note to a pitch class (just the pitch no octave)
   */


  function midiToPitchClass(midi) {
    var scaleIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var note = midi % 12;
    return scaleIndexToNote[note];
  }
  /**
   * Convert a pitch class to a MIDI note
   */


  function pitchClassToMidi(pitch) {
    var scaleIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    return scaleIndexToNote.indexOf(pitch);
  }
  /**
   * Convert a pitch to a midi number
   */
  // tslint:disable-next-line: only-arrow-functions typedef


  var pitchToMidi = function () {
    var regexp = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i;
    var noteToScaleIndex = {
      // tslint:disable-next-line: object-literal-sort-keys
      cbb: -2,
      cb: -1,
      c: 0,
      "c#": 1,
      cx: 2,
      dbb: 0,
      db: 1,
      d: 2,
      "d#": 3,
      dx: 4,
      ebb: 2,
      eb: 3,
      e: 4,
      "e#": 5,
      ex: 6,
      fbb: 3,
      fb: 4,
      f: 5,
      "f#": 6,
      fx: 7,
      gbb: 5,
      gb: 6,
      g: 7,
      "g#": 8,
      gx: 9,
      abb: 7,
      ab: 8,
      a: 9,
      "a#": 10,
      ax: 11,
      bbb: 9,
      bb: 10,
      b: 11,
      "b#": 12,
      bx: 13
    };
    return function (note) {
      var split = regexp.exec(note);
      var pitch = split[1];
      var octave = split[2];
      var index = noteToScaleIndex[pitch.toLowerCase()];
      return index + (parseInt(octave, 10) + 1) * 12;
    };
  }();

  var privateHeaderMap$1 = new WeakMap();
  /**
   * A Note consists of a noteOn and noteOff event
   */

  var Note =
  /** @class */
  function () {
    function Note(noteOn, noteOff, header) {
      privateHeaderMap$1.set(this, header);
      this.midi = noteOn.midi;
      this.velocity = noteOn.velocity;
      this.noteOffVelocity = noteOff.velocity;
      this.ticks = noteOn.ticks;
      this.durationTicks = noteOff.ticks - noteOn.ticks;
    }

    Object.defineProperty(Note.prototype, "name", {
      /**
       * The note name and octave in scientific pitch notation, e.g. "C4"
       */
      get: function () {
        return midiToPitch(this.midi);
      },
      set: function (n) {
        this.midi = pitchToMidi(n);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Note.prototype, "octave", {
      /**
       * The notes octave number
       */
      get: function () {
        return Math.floor(this.midi / 12) - 1;
      },
      set: function (o) {
        var diff = o - this.octave;
        this.midi += diff * 12;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Note.prototype, "pitch", {
      /**
       * The pitch class name. e.g. "A"
       */
      get: function () {
        return midiToPitchClass(this.midi);
      },
      set: function (p) {
        this.midi = 12 * (this.octave + 1) + pitchClassToMidi(p);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Note.prototype, "duration", {
      /**
       * The duration of the segment in seconds
       */
      get: function () {
        var header = privateHeaderMap$1.get(this);
        return header.ticksToSeconds(this.ticks + this.durationTicks) - header.ticksToSeconds(this.ticks);
      },
      set: function (d) {
        var header = privateHeaderMap$1.get(this);
        var noteEndTicks = header.secondsToTicks(this.time + d);
        this.durationTicks = noteEndTicks - this.ticks;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Note.prototype, "time", {
      /**
       * The time of the event in seconds
       */
      get: function () {
        var header = privateHeaderMap$1.get(this);
        return header.ticksToSeconds(this.ticks);
      },
      set: function (t) {
        var header = privateHeaderMap$1.get(this);
        this.ticks = header.secondsToTicks(t);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Note.prototype, "bars", {
      /**
       * The number of measures (and partial measures) to this beat.
       * Takes into account time signature changes
       * @readonly
       */
      get: function () {
        var header = privateHeaderMap$1.get(this);
        return header.ticksToMeasures(this.ticks);
      },
      enumerable: true,
      configurable: true
    });

    Note.prototype.toJSON = function () {
      return {
        duration: this.duration,
        durationTicks: this.durationTicks,
        midi: this.midi,
        name: this.name,
        ticks: this.ticks,
        time: this.time,
        velocity: this.velocity
      };
    };

    return Note;
  }();

  Note$1.Note = Note;

  Object.defineProperty(Track$2, "__esModule", {
    value: true
  });
  var BinarySearch_1 = BinarySearch;
  var ControlChange_1 = ControlChange;
  var ControlChanges_1 = ControlChanges;
  var PitchBend_1 = PitchBend$1;
  var Instrument_1 = Instrument$1;
  var Note_1 = Note$1;
  var privateHeaderMap = new WeakMap();
  /**
   * A Track is a collection of notes and controlChanges
   */

  var Track$1 =
  /** @class */
  function () {
    function Track(trackData, header) {
      var _this = this;
      /**
       * The name of the track
       */


      this.name = "";
      /**
       * The track's note events
       */

      this.notes = [];
      /**
       * The control change events
       */

      this.controlChanges = ControlChanges_1.createControlChanges();
      /**
       * The pitch bend events
       */

      this.pitchBends = [];
      privateHeaderMap.set(this, header);

      if (trackData) {
        var nameEvent = trackData.find(function (e) {
          return e.type === "trackName";
        });
        this.name = nameEvent ? nameEvent.text : "";
      }

      this.instrument = new Instrument_1.Instrument(trackData, this); // defaults to 0

      this.channel = 0;

      if (trackData) {
        var noteOns = trackData.filter(function (event) {
          return event.type === "noteOn";
        });
        var noteOffs = trackData.filter(function (event) {
          return event.type === "noteOff";
        });

        var _loop_1 = function () {
          var currentNote = noteOns.shift(); // set the channel based on the note

          this_1.channel = currentNote.channel; // find the corresponding note off

          var offIndex = noteOffs.findIndex(function (note) {
            return note.noteNumber === currentNote.noteNumber && note.absoluteTime >= currentNote.absoluteTime;
          });

          if (offIndex !== -1) {
            // once it's got the note off, add it
            var noteOff = noteOffs.splice(offIndex, 1)[0];
            this_1.addNote({
              durationTicks: noteOff.absoluteTime - currentNote.absoluteTime,
              midi: currentNote.noteNumber,
              noteOffVelocity: noteOff.velocity / 127,
              ticks: currentNote.absoluteTime,
              velocity: currentNote.velocity / 127
            });
          }
        };

        var this_1 = this;

        while (noteOns.length) {
          _loop_1();
        }

        var controlChanges = trackData.filter(function (event) {
          return event.type === "controller";
        });
        controlChanges.forEach(function (event) {
          _this.addCC({
            number: event.controllerType,
            ticks: event.absoluteTime,
            value: event.value / 127
          });
        });
        var pitchBends = trackData.filter(function (event) {
          return event.type === "pitchBend";
        });
        pitchBends.forEach(function (event) {
          _this.addPitchBend({
            ticks: event.absoluteTime,
            // scale the value between -2^13 to 2^13 to -2 to 2
            value: event.value / Math.pow(2, 13)
          });
        });
        var endOfTrackEvent = trackData.find(function (event) {
          return event.type === "endOfTrack";
        });
        this.endOfTrackTicks = endOfTrackEvent !== undefined ? endOfTrackEvent.absoluteTime : undefined;
      }
    }
    /**
     * Add a note to the notes array
     * @param props The note properties to add
     */


    Track.prototype.addNote = function (props) {
      var header = privateHeaderMap.get(this);
      var note = new Note_1.Note({
        midi: 0,
        ticks: 0,
        velocity: 1
      }, {
        ticks: 0,
        velocity: 0
      }, header);
      Object.assign(note, props);
      BinarySearch_1.insert(this.notes, note, "ticks");
      return this;
    };
    /**
     * Add a control change to the track
     * @param props
     */


    Track.prototype.addCC = function (props) {
      var header = privateHeaderMap.get(this);
      var cc = new ControlChange_1.ControlChange({
        controllerType: props.number
      }, header);
      delete props.number;
      Object.assign(cc, props);

      if (!Array.isArray(this.controlChanges[cc.number])) {
        this.controlChanges[cc.number] = [];
      }

      BinarySearch_1.insert(this.controlChanges[cc.number], cc, "ticks");
      return this;
    };
    /**
     * Add a control change to the track
     */


    Track.prototype.addPitchBend = function (props) {
      var header = privateHeaderMap.get(this);
      var pb = new PitchBend_1.PitchBend({}, header);
      Object.assign(pb, props);
      BinarySearch_1.insert(this.pitchBends, pb, "ticks");
      return this;
    };

    Object.defineProperty(Track.prototype, "duration", {
      /**
       * The end time of the last event in the track
       */
      get: function () {
        if (!this.notes.length) {
          return 0;
        }

        var maxDuration = this.notes[this.notes.length - 1].time + this.notes[this.notes.length - 1].duration;

        for (var i = 0; i < this.notes.length - 1; i++) {
          var duration = this.notes[i].time + this.notes[i].duration;

          if (maxDuration < duration) {
            maxDuration = duration;
          }
        }

        return maxDuration;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Track.prototype, "durationTicks", {
      /**
       * The end time of the last event in the track in ticks
       */
      get: function () {
        if (!this.notes.length) {
          return 0;
        }

        var maxDuration = this.notes[this.notes.length - 1].ticks + this.notes[this.notes.length - 1].durationTicks;

        for (var i = 0; i < this.notes.length - 1; i++) {
          var duration = this.notes[i].ticks + this.notes[i].durationTicks;

          if (maxDuration < duration) {
            maxDuration = duration;
          }
        }

        return maxDuration;
      },
      enumerable: true,
      configurable: true
    });
    /**
     * Assign the json values to this track
     */

    Track.prototype.fromJSON = function (json) {
      var _this = this;

      this.name = json.name;
      this.channel = json.channel;
      this.instrument = new Instrument_1.Instrument(undefined, this);
      this.instrument.fromJSON(json.instrument);

      if (json.endOfTrackTicks !== undefined) {
        this.endOfTrackTicks = json.endOfTrackTicks;
      }

      for (var number in json.controlChanges) {
        if (json.controlChanges[number]) {
          json.controlChanges[number].forEach(function (cc) {
            _this.addCC({
              number: cc.number,
              ticks: cc.ticks,
              value: cc.value
            });
          });
        }
      }

      json.notes.forEach(function (n) {
        _this.addNote({
          durationTicks: n.durationTicks,
          midi: n.midi,
          ticks: n.ticks,
          velocity: n.velocity
        });
      });
    };
    /**
     * Convert the track into a JSON format
     */


    Track.prototype.toJSON = function () {
      // convert all the CCs to JSON
      var controlChanges = {};

      for (var i = 0; i < 127; i++) {
        if (this.controlChanges.hasOwnProperty(i)) {
          controlChanges[i] = this.controlChanges[i].map(function (c) {
            return c.toJSON();
          });
        }
      }

      var json = {
        channel: this.channel,
        controlChanges: controlChanges,
        pitchBends: this.pitchBends.map(function (pb) {
          return pb.toJSON();
        }),
        instrument: this.instrument.toJSON(),
        name: this.name,
        notes: this.notes.map(function (n) {
          return n.toJSON();
        })
      };

      if (this.endOfTrackTicks !== undefined) {
        json.endOfTrackTicks = this.endOfTrackTicks;
      }

      return json;
    };

    return Track;
  }();

  Track$2.Track = Track$1;

  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
    var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
        f,
        y,
        t,
        g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }), g;

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");

      while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  };

  Object.defineProperty(Midi$1, "__esModule", {
    value: true
  });
  var midi_file_1 = midiFile;
  var Encode_1 = Encode;
  var Header_1 = Header;
  var Track_1 = Track$2;
  /**
   * The main midi parsing class
   */

  var Midi =
  /** @class */
  function () {
    /**
     * Parse the midi data
     */
    function Midi(midiArray) {
      var _this = this; // parse the midi data if there is any


      var midiData = null;

      if (midiArray) {
        if (midiArray instanceof ArrayBuffer) {
          midiArray = new Uint8Array(midiArray);
        }

        midiData = midi_file_1.parseMidi(midiArray); // add the absolute times to each of the tracks

        midiData.tracks.forEach(function (track) {
          var currentTicks = 0;
          track.forEach(function (event) {
            currentTicks += event.deltaTime;
            event.absoluteTime = currentTicks;
          });
        }); // ensure at most one instrument per track

        midiData.tracks = splitTracks(midiData.tracks);
      }

      this.header = new Header_1.Header(midiData);
      this.tracks = []; // parse the midi data

      if (midiArray) {
        // format 0, everything is on the same track
        this.tracks = midiData.tracks.map(function (trackData) {
          return new Track_1.Track(trackData, _this.header);
        }); // if it's format 1 and there are no notes on the first track, remove it

        if (midiData.header.format === 1 && this.tracks[0].duration === 0) {
          this.tracks.shift();
        }
      }
    }
    /**
     * Download and parse the MIDI file. Returns a promise
     * which resolves to the generated midi file
     * @param url The url to fetch
     */


    Midi.fromUrl = function (url) {
      return __awaiter(this, void 0, void 0, function () {
        var response, arrayBuffer;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , fetch(url)];

            case 1:
              response = _a.sent();
              if (!response.ok) return [3
              /*break*/
              , 3];
              return [4
              /*yield*/
              , response.arrayBuffer()];

            case 2:
              arrayBuffer = _a.sent();
              return [2
              /*return*/
              , new Midi(arrayBuffer)];

            case 3:
              throw new Error("could not load " + url);
          }
        });
      });
    };

    Object.defineProperty(Midi.prototype, "name", {
      /**
       * The name of the midi file, taken from the first track
       */
      get: function () {
        return this.header.name;
      },
      set: function (n) {
        this.header.name = n;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Midi.prototype, "duration", {
      /**
       * The total length of the file in seconds
       */
      get: function () {
        // get the max of the last note of all the tracks
        var durations = this.tracks.map(function (t) {
          return t.duration;
        });
        return Math.max.apply(Math, durations);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Midi.prototype, "durationTicks", {
      /**
       * The total length of the file in ticks
       */
      get: function () {
        // get the max of the last note of all the tracks
        var durationTicks = this.tracks.map(function (t) {
          return t.durationTicks;
        });
        return Math.max.apply(Math, durationTicks);
      },
      enumerable: true,
      configurable: true
    });
    /**
     * Add a track to the midi file
     */

    Midi.prototype.addTrack = function () {
      var track = new Track_1.Track(undefined, this.header);
      this.tracks.push(track);
      return track;
    };
    /**
     * Encode the midi as a Uint8Array.
     */


    Midi.prototype.toArray = function () {
      return Encode_1.encode(this);
    };
    /**
     * Convert the midi object to JSON.
     */


    Midi.prototype.toJSON = function () {
      return {
        header: this.header.toJSON(),
        tracks: this.tracks.map(function (track) {
          return track.toJSON();
        })
      };
    };
    /**
     * Parse a JSON representation of the object. Will overwrite the current
     * tracks and header.
     */


    Midi.prototype.fromJSON = function (json) {
      var _this = this;

      this.header = new Header_1.Header();
      this.header.fromJSON(json.header);
      this.tracks = json.tracks.map(function (trackJSON) {
        var track = new Track_1.Track(undefined, _this.header);
        track.fromJSON(trackJSON);
        return track;
      });
    };
    /**
     * Clone the entire object midi object
     */


    Midi.prototype.clone = function () {
      var midi = new Midi();
      midi.fromJSON(this.toJSON());
      return midi;
    };

    return Midi;
  }();

  var Midi_2 = Midi$1.Midi = Midi;
  var Track_2 = Track$2;
  Midi$1.Track = Track_2.Track;
  var Header_2 = Header;
  Midi$1.Header = Header_2.Header;
  /**
   * Given a list of MIDI tracks, make sure that each channel corresponds to at
   * most one channel and at most one instrument. This means splitting up tracks
   * that contain more than one channel or instrument.
   */

  function splitTracks(tracks) {
    var newTracks = [];

    for (var i = 0; i < tracks.length; i++) {
      var defaultTrack = newTracks.length; // a map from [program, channel] tuples to new track numbers

      var trackMap = new Map(); // a map from channel numbers to current program numbers

      var currentProgram = Array(16).fill(0);

      for (var _i = 0, _a = tracks[i]; _i < _a.length; _i++) {
        var event_1 = _a[_i];
        var targetTrack = defaultTrack; // If the event has a channel, we need to find that channel's current
        // program number and the appropriate track for this [program, channel]
        // pair.

        var channel = event_1.channel;

        if (channel !== undefined) {
          if (event_1.type === "programChange") {
            currentProgram[channel] = event_1.programNumber;
          }

          var program = currentProgram[channel];
          var trackKey = program + " " + channel;

          if (trackMap.has(trackKey)) {
            targetTrack = trackMap.get(trackKey);
          } else {
            targetTrack = defaultTrack + trackMap.size;
            trackMap.set(trackKey, targetTrack);
          }
        }

        if (!newTracks[targetTrack]) {
          newTracks.push([]);
        }

        newTracks[targetTrack].push(event_1);
      }
    }

    return newTracks;
  }

  /**
   * @module fileFormats/MusicXmlParser
   */
  // Precision in number of digits when rounding seconds

  const ROUNDING_PRECISION$1 = 5;
  /**
   * Converts a collection of MusicXML measures to JavaScript Objects with timing information in seconds.
   * Also calculates the position of measure lines and the total time in seconds.
   *
   * @param {XMLDocument} xml MusicXML document
   * @param {boolean} log set to true to log results etc. to the console
   * @returns {object} parsed document
   */

  function preprocessMusicXmlData(xml, log = false) {
    if (log) {
      console.groupCollapsed('[MusicXmlParser] Parsing MusicXML');
      console.log(xml);
    } // Get part and instrument names


    const partNameElements = xml.querySelectorAll('part-name');
    const instruments = xml.querySelectorAll('score-instrument');
    const partNames = [];
    const instrumentNames = [];

    for (const p of partNameElements) {
      partNames.push(p.innerHTML);
    }

    for (const index of instruments) {
      instrumentNames.push(index.children[0].innerHTML);
    } // Get instrument definitions


    const drumInstrumentMap = getDrumInstrumentMap(xml); // Preprocess notes

    const parts = xml.querySelectorAll('part');
    const parsedParts = [];

    for (const part of parts) {
      parsedParts.push(preprocessMusicXmlPart(part, drumInstrumentMap));
    }

    const result = {
      parts: parsedParts,
      partNames,
      instruments: instrumentNames,
      totalTime: max(parsedParts, d => d.totalTime)
    };

    if (log) {
      console.log(result);
      console.groupEnd();
    }

    return result;
  }
  /**
   * Converts a collection of MusicXML measures to JavaScript Objects with timing information in seconds.
   * Also calculates the position of measure lines and the total time in seconds.
   *
   * @private
   * @param {HTMLElement} part MusicXML part
   * @param {Map} drumInstrumentMap midiPitch = map.get(partId).get(instrId)
   * @returns {object} parsed measures
   */

  function preprocessMusicXmlPart(part, drumInstrumentMap) {
    // Handle Guitar sheets with stave and tab (so dublicate notes)
    part = handleStaveAndTab(part); // Handle repetitions by duplicating measures

    let measures = part.children;
    measures = duplicateRepeatedMeasures(measures);
    let currentTime = 0;
    let divisions;
    let tempo = 120;
    let beats = 4;
    let beatType = 4; // Default velocity is 90 https://www.musicxml.com/tutorial/the-midi-compatible-part/sound-suggestions/

    const defaultVelocity = 90;
    const velocityFactor = 64 / 71;
    let velocity = Math.round(defaultVelocity * velocityFactor); // Handle changing tempo and beat type

    const tempoChanges = [];
    const beatTypeChanges = [];
    const keySignatureChanges = [];
    const noteObjs = []; // Time in seconds of the start of new measures

    const measureLinePositions = []; // Indices of notes where a new measure starts

    const measureIndices = [];

    for (const measure of measures) {
      const currentTimeRounded = roundToNDecimals(currentTime, ROUNDING_PRECISION$1); // Try to update metrics (if they are not set, keep the old ones)

      try {
        const soundElements = measure.querySelectorAll('sound');

        for (const element of soundElements) {
          const tempoValue = element.getAttribute('tempo');

          if (tempoValue !== null) {
            tempo = roundToNDecimals(+tempoValue, 3);
            tempoChanges.push({
              time: currentTimeRounded,
              tempo
            });
          } // TODO: this only support one tempo change per measure!
          // TODO: tempo changes that are not at the measure start will be false
          // TODO: solution: go trough all children of measure: notes and other children
          // notes will update the time


          break;
        }
      } catch {}

      try {
        divisions = +measure.querySelectorAll('divisions')[0].innerHTML;
      } catch {}

      try {
        beats = +measure.querySelectorAll('beats')[0].innerHTML;
        beatType = +measure.querySelectorAll('beat-type')[0].innerHTML;
        beatTypeChanges.push({
          time: currentTimeRounded,
          beats,
          beatType
        });
      } catch {}

      const secondsPerBeat = 1 / (tempo / 60);

      try {
        const fifths = +measure.querySelectorAll('fifths')[0].innerHTML;
        const {
          key,
          scale
        } = keySignatureMap.get(fifths);
        keySignatureChanges.push({
          time: currentTimeRounded,
          key,
          scale
        });
      } catch {} // Read notes


      let lastNoteDuration = 0;

      for (const child of measure.children) {
        if (child.nodeName === 'backup') {
          // Handle backup, which reduces the current time to handle multiple staves
          const duration = +child.querySelectorAll('duration')[0].innerHTML;
          const durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat);
          currentTime -= durationInSeconds;
        } else if (child.nodeName === 'forward') {
          // Forward is inverse of backward
          const duration = +child.querySelectorAll('duration')[0].innerHTML;
          const durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat);
          currentTime += durationInSeconds;
        } else if (child.nodeName === 'direction') {
          // Handle directions such as dynamics
          for (const direction of child.children) {
            if (direction.nodeName === 'sound' && direction.getAttribute('dynamics')) {
              // Convert number... https://www.musicxml.com/tutorial/the-midi-compatible-part/sound-suggestions/
              velocity = Math.round(velocityFactor * +direction.getAttribute('dynamics'));
            } // TODO: handle others, e.g. tempo
            // if (direction.nodeName === 'sound' && direction.getAttribute('tempo')) {
            //     const tempoValue = Math.round(+direction.getAttribute('tempo'));
            //     tempo = roundToNDecimals(tempoValue, 3);
            //     tempoChanges.push({
            //         time: roundToNDecimals(currentTime, ROUNDING_PRECISION),
            //         tempo,
            //     });
            // }

          }
        } else if (child.nodeName === 'note') {
          const note = child;

          try {
            var _note$querySelectorAl3;

            // Get note duration in seconds
            const duration = +note.querySelectorAll('duration')[0].innerHTML;
            const durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat); // Do not create note object for rests, only increase time

            const isRest = note.querySelectorAll('rest').length > 0;

            if (isRest) {
              currentTime += durationInSeconds;
              continue;
            }

            let pitch;

            if (note.querySelectorAll('unpitched').length > 0) {
              // Handle drum notes
              const instrumentId = note.querySelectorAll('instrument')[0].id;
              pitch = drumInstrumentMap.get(part.id).get(instrumentId);
            } else {
              var _note$querySelectorAl, _note$querySelectorAl2;

              // Get MIDI pitch
              // Handle <alter> tag for accidentals
              const alter = +((_note$querySelectorAl = (_note$querySelectorAl2 = note.querySelectorAll('alter')[0]) === null || _note$querySelectorAl2 === void 0 ? void 0 : _note$querySelectorAl2.innerHTML) !== null && _note$querySelectorAl !== void 0 ? _note$querySelectorAl : 0);
              const step = note.querySelectorAll('step')[0].innerHTML;
              const octave = +note.querySelectorAll('octave')[0].innerHTML;
              pitch = getMidiNoteByNameAndOctave(step, octave).pitch + alter;
            } // TODO: Handle dynamics defined as tag inside a note


            const dynamicsTag = (_note$querySelectorAl3 = note.querySelectorAll('dynamics')[0]) === null || _note$querySelectorAl3 === void 0 ? void 0 : _note$querySelectorAl3.children[0];

            if (dynamicsTag) {
              velocity = dynamicsMap.get(dynamicsTag.nodeName);
            } // Is this a chord? (https://www.musicxml.com/tutorial/the-midi-compatible-part/chords/)


            const isChord = note.querySelectorAll('chord').length > 0;

            if (isChord) {
              currentTime -= lastNoteDuration;
            } // Is this note tied?


            const tieElement = note.querySelectorAll('tie')[0];

            if (tieElement && tieElement.getAttribute('type') === 'stop') {
              const noteEnd = currentTime + durationInSeconds; // Find last note with this pitch and update end

              for (let index = noteObjs.length - 1; index > 0; index--) {
                const n = noteObjs[index];

                if (n.pitch === pitch) {
                  n.end = noteEnd;
                  break;
                }
              }
            } else {
              var _note$querySelectorAl4, _note$querySelectorAl5;

              // Staff is used as note's channel for non-guitar notes
              const staff = +((_note$querySelectorAl4 = (_note$querySelectorAl5 = note.querySelectorAll('staff')[0]) === null || _note$querySelectorAl5 === void 0 ? void 0 : _note$querySelectorAl5.innerHTML) !== null && _note$querySelectorAl4 !== void 0 ? _note$querySelectorAl4 : 1); // TODO: use xml note type?
              // const type = note.getElementsByTagName('type')[0].innerHTML;

              const startTime = roundToNDecimals(currentTime, ROUNDING_PRECISION$1);
              const endTime = roundToNDecimals(currentTime + durationInSeconds, ROUNDING_PRECISION$1); // Try to get guitar specific data

              let string = null;
              let fret = null;

              try {
                fret = +note.querySelectorAll('fret')[0].innerHTML;
                string = +note.querySelectorAll('string')[0].innerHTML;
              } catch {}

              if (string !== null && fret !== null) {
                noteObjs.push(new GuitarNote(pitch, startTime, velocity, string, endTime, string, fret));
              } else {
                noteObjs.push(new Note$2(pitch, startTime, velocity, // MusicXML starts with 1 but MIDI with 0
                staff - 1, endTime));
              }
            }

            lastNoteDuration = durationInSeconds;
            currentTime += durationInSeconds;
          } catch (error) {
            console.warn('[MusicXmlParser] Cannot parse MusicXML note', error, note);
          }
        }
      } // Add measure line position


      measureLinePositions.push(roundToNDecimals(currentTime, ROUNDING_PRECISION$1));
      measureIndices.push(noteObjs.length);
    } // Defaults


    if (tempoChanges.length === 0 || tempoChanges[0].time > 0) {
      tempoChanges.unshift({
        tempo: 120,
        time: 0
      });
    }

    if (beatTypeChanges.length === 0 || beatTypeChanges[0].time > 0) {
      beatTypeChanges.unshift({
        beats: 4,
        beatType: 4,
        time: 0
      });
    }

    if (keySignatureChanges.length === 0 || keySignatureChanges[0].time > 0) {
      keySignatureChanges.unshift({
        key: 'C',
        scale: 'major',
        time: 0
      });
    }

    const result = {
      noteObjs: noteObjs,
      totalTime: currentTime,
      measureLinePositions,
      measureIndices,
      tempoChanges,
      beatTypeChanges,
      keySignatureChanges,
      tuning: getTuningPitches(measures)
    }; // console.log('[MusicXmlParser] Parsed part: ', result);

    return result;
  }
  /**
   * Calculates the duration in seconds of a note, rest or backup
   *
   * @private
   * @param {number} duration duration of the event in divisions
   * @param {number} divisions MusicXML time divisions value
   * @param {number} secondsPerBeat seconds per beat
   * @returns {number} duration in seconds
   */


  function getDurationInSeconds(duration, divisions, secondsPerBeat) {
    const durationInBeats = duration / divisions;
    const durationInSeconds = durationInBeats * secondsPerBeat;
    return durationInSeconds;
  }
  /**
   * Resolves repetitions by simply duplicating repeated measures.
   * Handles volta lines (ending one, ending two).
   *
   * @todo handle 3x etc
   * @todo write tests
   * @see https://www.musicxml.com/tutorial/the-midi-compatible-part/repeats/
   * @private
   * @param {HTMLCollection} measures measures
   * @returns {HTMLAllCollection[]} processed measures
   */


  function duplicateRepeatedMeasures(measures) {
    let resultMeasures = [];
    let currentRepeatedSection = [];
    let isAlternativeEndingOne = false;

    for (const measure of measures) {
      var _endingMarks$, _endingMarks$2;

      // Check if this is the first measure of an volta ending 1
      const endingMarks = measure.querySelectorAll('ending');

      if (+((_endingMarks$ = endingMarks[0]) === null || _endingMarks$ === void 0 ? void 0 : _endingMarks$.getAttribute('number')) === 1 && ((_endingMarks$2 = endingMarks[0]) === null || _endingMarks$2 === void 0 ? void 0 : _endingMarks$2.getAttribute('type')) === 'start') {
        isAlternativeEndingOne = true;
      } // Handle repetition marks


      const repetitionMarks = measure.querySelectorAll('repeat');

      if (repetitionMarks.length === 2) {
        // Only this measure is repeated
        // TODO: volta endings don't make sense here so no need to handle?
        const times = repetitionMarks[1].getAttribute('times') || 2;
        const repetition = Array.from({
          length: +times
        }).fill(measure);

        if (currentRepeatedSection.length === 0) {
          resultMeasures = [...resultMeasures, ...repetition];
        } else {
          currentRepeatedSection = [...currentRepeatedSection, ...repetition];
        }
      } else if (repetitionMarks.length === 1) {
        // Repetition either starts or ends here
        const direction = repetitionMarks[0].getAttribute('direction');

        if (direction === 'forward') {
          // Start new repetition
          currentRepeatedSection.push(measure);
        } else if (direction === 'backward') {
          const times = repetitionMarks[0].getAttribute('times') || 2;

          if (currentRepeatedSection.length > 0) {
            // Finish current repetition
            if (!isAlternativeEndingOne) {
              currentRepeatedSection.push(measure);

              for (let index = 0; index < times; index++) {
                resultMeasures = [...resultMeasures, ...currentRepeatedSection];
              }
            } else {
              // Only include ending 1 in first repetition
              const firstRepetition = [...currentRepeatedSection, measure];
              resultMeasures = [...resultMeasures, ...firstRepetition];

              for (let index = 1; index < times; index++) {
                resultMeasures = [...resultMeasures, ...currentRepeatedSection];
              }
            }

            currentRepeatedSection = [];
          } else {
            // Repetition started at the start of the piece, repeat all
            // we have until here
            const allMeasuresUntilHere = [...resultMeasures];

            for (let index = 1; index < times; index++) {
              resultMeasures = [...resultMeasures, ...allMeasuresUntilHere];
            } // resultMeasures = [...resultMeasures, ...resultMeasures];

          }
        }
      } else {
        if (!isAlternativeEndingOne) {
          // Measure without repetition marks, but might still be inside a
          // repetition
          if (currentRepeatedSection.length === 0) {
            resultMeasures.push(measure);
          } else {
            currentRepeatedSection.push(measure);
          }
        }
      } // Check if this is the last measure of a volta ending 1


      if (isAlternativeEndingOne) {
        for (const endingMark of endingMarks) {
          if (+endingMark.getAttribute('number') === 1 && endingMark.getAttribute('type') === 'stop') {
            isAlternativeEndingOne = false;
          }
        }
      }
    }

    return resultMeasures;
  }
  /**
   * Handles MusicXML measures that contain both a stave and a tab. Since every
   * note is described twice, we just need to remove those without string, fret
   * information
   * This function also removes <backup> tags which should not be necessary after
   * removing dublicate notes (only if string, fret notes were found).
   *
   * @private
   * @param {HTMLElement} track a MusicXML track, i.e. its measures
   * @returns {HTMLCollection} cleaned-up MusicXML measure
   */


  function handleStaveAndTab(track) {
    const notes = track.querySelectorAll('note'); // Check whether this file has notes with string, fret information

    let hasStringFretNotes = false;

    for (const note of notes) {
      if (note.querySelectorAll('string').length > 0 && note.querySelectorAll('fret').length > 0) {
        hasStringFretNotes = true;
        break;
      }
    } // If some notes have string and fret information, remove all the others
    // Do *not* remove all rests, keep the one in the first voice!


    if (hasStringFretNotes) {
      for (const note of notes) {
        var _note$querySelectorAl6;

        const voice = +((_note$querySelectorAl6 = note.querySelectorAll('voice')[0].innerHTML) !== null && _note$querySelectorAl6 !== void 0 ? _note$querySelectorAl6 : 1);
        const isFirstVoiceRest = note.querySelectorAll('rest').length > 0 && voice === 1;

        if (!isFirstVoiceRest && note.querySelectorAll('fret').length === 0) {
          note.remove();
        }
      } // Also remove <backup> tags which were only there due to having two
      // staves


      const backups = track.querySelectorAll('backup');

      for (const backup of backups) {
        backup.remove();
      }
    }

    return track;
  }
  /**
   * Gets the tuning for a MusicXML part
   *
   * @private
   * @param {HTMLCollection} measures the measures of the parts
   * @returns {number[]} pitches of the tuning or [] if none is found
   */


  function getTuningPitches(measures) {
    for (const measure of measures) {
      try {
        const tuningPitches = [];
        const staffTunings = measure.querySelectorAll('staff-tuning');

        for (const st of staffTunings) {
          const tuningNote = st.querySelectorAll('tuning-step')[0].innerHTML;
          const tuningOctave = +st.querySelectorAll('tuning-octave')[0].innerHTML; // let line = +st.getAttribute('line');
          // console.log(`String ${line} is tuned to ${tuningNote}${tuningOctave}`);

          tuningPitches.push(getMidiNoteByNameAndOctave(tuningNote, tuningOctave).pitch);
        }

        return tuningPitches;
      } catch {}
    }

    return [];
  }
  /**
   * Returns a map containing maps, such that result.get(partId).get(instrId)
   * gives you the instrument with the ID instrId as defined in the part partId.
   *
   * This is needed to map drum notes to MIDI pitches.
   *
   * @param {XMLDocument} xml MusicXML
   * @returns {Map} map with structure result.get(partId).get(instrId)
   */


  function getDrumInstrumentMap(xml) {
    var _xml$querySelectorAll;

    const partMap = new Map();
    const scoreParts = (_xml$querySelectorAll = xml.querySelectorAll('part-list')[0]) === null || _xml$querySelectorAll === void 0 ? void 0 : _xml$querySelectorAll.querySelectorAll('score-part');

    if (!scoreParts) {
      return partMap;
    }

    for (const scorePart of scoreParts) {
      const partId = scorePart.id;
      const instruMap = new Map();
      const midiInstrs = scorePart.querySelectorAll('midi-instrument');

      for (const midiInstr of midiInstrs) {
        var _midiInstr$querySelec;

        const instrId = midiInstr.id;
        const pitch = (_midiInstr$querySelec = midiInstr.querySelectorAll('midi-unpitched')[0]) === null || _midiInstr$querySelec === void 0 ? void 0 : _midiInstr$querySelec.innerHTML;

        if (pitch) {
          instruMap.set(instrId, +pitch);
        }
      }

      partMap.set(partId, instruMap);
    }

    return partMap;
  }
  /**
   * Map from fiths to key signature
   *
   * @type {Map<number,object>}
   */


  const keySignatureMap = new Map([[-7, {
    key: 'Cb',
    scale: 'major'
  }], [-6, {
    key: 'Gb',
    scale: 'major'
  }], [-5, {
    key: 'Db',
    scale: 'major'
  }], [-4, {
    key: 'Ab',
    scale: 'major'
  }], [-3, {
    key: 'Eb',
    scale: 'major'
  }], [-2, {
    key: 'Bb',
    scale: 'major'
  }], [-1, {
    key: 'F',
    scale: 'major'
  }], [0, {
    key: 'C',
    scale: 'major'
  }], [1, {
    key: 'G',
    scale: 'major'
  }], [2, {
    key: 'D',
    scale: 'major'
  }], [3, {
    key: 'A',
    scale: 'major'
  }], [4, {
    key: 'E',
    scale: 'major'
  }], [5, {
    key: 'B',
    scale: 'major'
  }], [6, {
    key: 'F#',
    scale: 'major'
  }], [7, {
    key: 'C#',
    scale: 'major'
  }]]);
  /**
   * Maps dynamics to MIDI velocity numbers, i.e. 'ff' to 102
   *
   * @type {Map<string,number>}
   */

  const dynamicsMap = new Map([['ppp', 25], ['pp', 38], ['p', 51], ['mp', 64], ['mf', 76], ['f', 89], ['ff', 102], ['fff', 114]]);

  /**
   * @module utils/MusicUtils
   */

  /**
   * Converts beats per minute to seconds per beat
   *
   * @param {number} bpm tempo in beats per minute
   * @returns {number} seconds per beat
   */

  function bpmToSecondsPerBeat$1(bpm) {
    return 1 / (bpm / 60);
  }
  /**
   * Maps any frequency (in Hz) to an approximate MIDI note number. Result can be
   * rounded to get to the closest MIDI note or used as is for a sound in between
   * two notes.
   *
   * @param {number} frequency a frequency in Hz
   * @returns {number} MIDI note number (not rounded)
   */

  function freqToApproxMidiNr(frequency) {
    return 12 * Math.log2(frequency / 440) + 69;
  }
  /**
   * Turns a chord into an integer that uniquely describes the occuring chroma.
   * If the same chroma occurs twice this will not make a difference
   * (e.g. [C4, E4, G4, C5] will equal [C4, E4, G4])
   *
   * How it works:
   * Chord has C, E, and G
   * x = 000010010001
   *         G  E   C
   *
   * @param {Note[]} notes notes
   * @returns {number} an integer that uniquely identifies this chord's chroma
   */

  function chordToInteger(notes) {
    let value = 0x0;

    for (const note of notes) {
      const chroma = note.pitch % 12; // eslint-disable-next-line no-bitwise

      const noteInteger = 1 << chroma; // eslint-disable-next-line no-bitwise

      value = value | noteInteger;
    }

    return value;
  }
  /**
   * Takes two chord integer representations from chordToInteger() and computes
   * the Jaccard index
   *
   * @param {number} chord1 chord as integer representation
   * @param {number} chord2 chord as integer representation
   * @returns {number} Jackard index, from 0 for different to 1 for identical
   */

  function chordIntegerJaccardIndex(chord1, chord2) {
    if (chord1 === chord2) {
      return 1;
    } // eslint-disable-next-line no-bitwise


    const intersection = chord1 & chord2; // eslint-disable-next-line no-bitwise

    const union = chord1 | chord2;
    const intersectionSize = countOnesOfBinary(intersection);
    const unionSize = countOnesOfBinary(union);
    return intersectionSize / unionSize;
  }
  /*
   * noteTypeDurationRatios
   * 1 = whole note, 1/2 = half note, ...
   *
   * With added dots:
   * o. has duration of 1.5, o.. 1.75, ...
   */

  const noteTypeDurationRatios = [];
  const baseDurations = [2, 1, 1 / 2, 1 / 4, 1 / 8, 1 / 16, 1 / 32, 1 / 64];

  for (const d of baseDurations) {
    for (let dots = 0; dots < 4; dots++) {
      let duration = d;
      let toAdd = d;

      for (let dot = 0; dot < dots; dot++) {
        // Each dot after the note adds half of the one before
        toAdd /= 2;
        duration += toAdd;
      }

      noteTypeDurationRatios.push({
        type: d,
        dots,
        duration
      });
    }
  }

  noteTypeDurationRatios.sort((a, b) => a.duration - b.duration);
  /**
   * Estimates the note type (whole, quarter, ...) and number of dots for dotted
   * notes
   *
   * @todo test if corrrectly 'calibrated'
   * @param {number} duration duration of a note
   * @param {number} bpm tempo of the piece in bpm
   * @returns {object} note type and number of dots
   *      e.g. { "dots": 0, "duration": 1, "type": 1 } for a whole note
   *      e.g. { "dots": 1, "duration": 1.5, "type": 1 } for a dotted whole note
   */

  function noteDurationToNoteType(duration, bpm) {
    const quarterDuration = bpmToSecondsPerBeat$1(bpm);
    const ratio = duration / quarterDuration / 4; // TODO: round to finest representable step?
    // Binary search

    return binarySearch(noteTypeDurationRatios, ratio, d => d.duration);
  }
  /**
   * Estimates a difficulty score for playing a set of notes.
   * Can be used for an entire piece or measure-by-measure.
   *
   * @todo different modi, e.g. for piano or guitar (fingering is different)
   * @param {Note[]} notes notes
   * @param {string} mode mode
   * @param {number[]} fingering finger as number for each note, same order
   * @returns {number} difficulty, can range within [0, infinity)
   * @throws {'Invalid mode parameter'} when mode is invalid
   */
  // export function estimateDifficulty(notes, mode, fingering) {
  //     if (mode === 'noteDensity') {
  //         // Naive mode, only look at density of notes
  //         const startTimeExtent = extent(notes, d => d.start);
  //         return notes.length / startTimeExtent;
  //     } else if (mode === 'fingering') {
  //         // TODO: check complexity of fingering
  //     }
  //     throw new Error('Invalid mode parameter');
  // }

  /**
   * Creates a track of metronome ticks for a given tempo and meter.
   *
   * @param {number} tempo tempo in bpm, e.g. 120
   * @param {number[]} meter e.g. [4, 4]
   * @param {number} duration duration of the resulting track in seconds
   * @returns {object[]} metronome track with {time: number, accent: boolean}
   */

  function metronomeTrackFromTempoAndMeter(tempo = 120, meter = [4, 4], duration = 60) {
    const track = [];
    const secondsPerBeat = bpmToSecondsPerBeat$1(tempo) / (meter[1] / 4);
    let currentTime = 0;

    while (currentTime <= duration) {
      for (let beat = 0; beat < meter[0]; beat++) {
        track.push({
          time: roundToNDecimals(currentTime, 4),
          accent: beat % meter[0] === 0
        });
        currentTime += secondsPerBeat;

        if (currentTime > duration) {
          return track;
        }
      }
    }
  }
  /**
   * Creates a track of metronome ticks for a given music piece.
   *
   * @param {MusicPiece} musicPiece music piece
   * @param {number} [tempoFactor=1] rescale the tempo of the metronome, e.g. 2
   *      for twice the speed
   * @returns {object[]} metronome track with {time: number, accent: boolean}
   */

  function metronomeTrackFromMusicPiece(musicPiece, tempoFactor = 1) {
    var _timeSignatures$0$sig, _tempos$0$bpm;

    const {
      duration,
      tempos,
      timeSignatures
    } = musicPiece;
    const track = [];
    let currentTime = 0; // Time signatures

    let initialTimeSig = (_timeSignatures$0$sig = timeSignatures[0].signature) !== null && _timeSignatures$0$sig !== void 0 ? _timeSignatures$0$sig : [4, 4];
    let [beatCount, beatType] = initialTimeSig;
    const timeSigsTodo = timeSignatures.slice(1); // Tempi

    let initialTempo = (_tempos$0$bpm = tempos[0].bpm) !== null && _tempos$0$bpm !== void 0 ? _tempos$0$bpm : 120;
    let secondsPerBeat = bpmToSecondsPerBeat$1(initialTempo) / (beatType / 4);
    const temposTodo = tempos.slice(1);

    while (currentTime <= duration) {
      // Always use the most recent tempo and meter
      const lookahead = currentTime + secondsPerBeat;

      if (timeSigsTodo.length > 0 && timeSigsTodo[0].time <= lookahead) {
        // console.log(
        //     'timesig change to', timeSigsTodo[0].signature,
        //     'after', track.length,
        //     'beeps, at', currentTime);
        [beatCount, beatType] = timeSigsTodo[0].signature;
        timeSigsTodo.shift();
      }

      if (temposTodo.length > 0 && temposTodo[0].time <= lookahead) {
        // console.log(
        //     'tempo change to', temposTodo[0].bpm,
        //     'after', track.length,
        //     'beeps, at', currentTime);
        secondsPerBeat = bpmToSecondsPerBeat$1(temposTodo[0].bpm) / (beatType / 4);
        temposTodo.shift();
      }

      for (let beat = 0; beat < beatCount; beat++) {
        track.push({
          time: roundToNDecimals(currentTime / tempoFactor, 3),
          accent: beat === 0
        });
        currentTime += secondsPerBeat;

        if (currentTime > duration) {
          return track;
        }
      }
    }

    return track;
  }

  /**
   * @module fileFormats/MidiParser
   * @todo parse pitch bends
   */
  // Precision in number of digits when rounding seconds

  const ROUNDING_PRECISION = 5;
  /**
   * Parses a MIDI JSON file to get Note objects with absolute time in seconds.
   *
   * @see https://github.com/colxi/midi-parser-js/wiki/MIDI-File-Format-Specifications
   * @param {object} data MIDI data in JSON format
   * @param {boolean} splitFormat0IntoTracks split MIDI format 0 data into tracks
   *      instead of using channels?
   * @param {boolean} log set to true to log results etc. to the console
   * @returns {object} including an array of note objects and meta information
   */

  function preprocessMidiFileData(data, splitFormat0IntoTracks = true, log = false) {
    if (data === null || data === undefined) {
      // console.warn('[MidiParser] MIDI data is null');
      return;
    }

    if (!data.track) {
      console.warn('[MidiParser] MIDI data has no track');
      return;
    }

    if (log) {
      console.groupCollapsed('[MidiParser] Preprocessing MIDI file data');
    } // Parse notes


    let parsedTracks = [];
    const {
      tempoChanges,
      beatTypeChanges,
      keySignatureChanges
    } = getSignatureChanges(data.track); // for (let index = 0; index < data.track.length; index++) {
    //     const track = data.track[index];

    for (const track of data.track) {
      const t = parseMidiTrack(track, data.timeDivision, tempoChanges, beatTypeChanges, keySignatureChanges, log);

      if (t !== null) {
        parsedTracks.push(t);
      }
    } // Split MIDI format 0 data into tracks instead of having channels


    if (data.formatType === 0 && splitFormat0IntoTracks && parsedTracks.length === 1) {
      parsedTracks = splitFormat0(parsedTracks);
    } // Generate measure lines from tempo and beat type changes


    const totalTime = max(parsedTracks, d => {
      var _d$totalTime;

      return (_d$totalTime = d === null || d === void 0 ? void 0 : d.totalTime) !== null && _d$totalTime !== void 0 ? _d$totalTime : 0;
    });
    const measureLinePositions = getMeasureLines(tempoChanges, beatTypeChanges, totalTime);
    const result = {
      tracks: parsedTracks,
      totalTime,
      tempoChanges,
      beatTypeChanges,
      keySignatureChanges,
      measureLinePositions
    };

    if (log) {
      console.log(`Got ${parsedTracks.length} MIDI tracks`, result);
      console.groupEnd();
    }

    return result;
  }
  /**
   * Parses a single MIDI track and pushes it to parsedTracks if it contains notes
   *
   * @private
   * @param {object} track a MIDI track
   * @param {number} timeDivision MIDI time division
   * @param {object[]} tempoChanges array with tempo change events
   * @param {object[]} beatTypeChanges array with beat type change events
   * @param {object[]} keySignatureChanges array with key signature change events
   * @param {boolean} log if true, debug info will be logged to the console
   * @returns {object} parsed track
   */

  function parseMidiTrack(track, timeDivision, tempoChanges, beatTypeChanges, keySignatureChanges, log) {
    var _tempoChanges$0$tempo, _tempoChanges$;

    const notes = [];
    let tempo = (_tempoChanges$0$tempo = (_tempoChanges$ = tempoChanges[0]) === null || _tempoChanges$ === void 0 ? void 0 : _tempoChanges$.tempo) !== null && _tempoChanges$0$tempo !== void 0 ? _tempoChanges$0$tempo : 120;
    let currentTick = 0;
    let currentTime;
    let milliSecondsPerTick = getMillisecondsPerTick(tempo, timeDivision);
    let tickOfLastTempoChange = 0;
    let timeOfLastTempoChange = 0; // This map stores note-on note that have not yet been finished by a note-off

    const unfinishedNotes = new Map();

    for (const event of track.event) {
      const type = event.type; // Ignore delta time if it is a meta event (fixes some parsing issues)

      if (type === EVENT_TYPES.meta) {
        continue;
      }

      currentTick += event.deltaTime; // Update beat type change times

      for (const btc of beatTypeChanges) {
        if (btc.time === undefined && btc.tick <= currentTick) {
          const t = (btc.tick - tickOfLastTempoChange) * milliSecondsPerTick / 1000 + timeOfLastTempoChange;
          btc.time = roundToNDecimals(t, ROUNDING_PRECISION);
        }
      } // Update key signature change times


      for (const ksc of keySignatureChanges) {
        if (ksc.time === undefined && ksc.tick <= currentTick) {
          const t = (ksc.tick - tickOfLastTempoChange) * milliSecondsPerTick / 1000 + timeOfLastTempoChange;
          ksc.time = roundToNDecimals(t, ROUNDING_PRECISION);
        }
      } // Handle last tempo change in track differently


      let mostRecentTempoChange;

      if (tempoChanges.length > 0 && currentTick > tempoChanges[tempoChanges.length - 1].tick) {
        mostRecentTempoChange = tempoChanges[tempoChanges.length - 1];
      } // Get current tempo, as soon as we are too far, 1 step back


      for (let index = 1; index < tempoChanges.length; index++) {
        const tick = tempoChanges[index].tick;

        if (tick > currentTick) {
          const change = tempoChanges[index - 1];
          mostRecentTempoChange = change;
          break;
        }
      } // React to tempo changes


      if (mostRecentTempoChange && mostRecentTempoChange.tempo !== tempo) {
        const tick = mostRecentTempoChange.tick;
        timeOfLastTempoChange = (tick - tickOfLastTempoChange) * milliSecondsPerTick / 1000 + timeOfLastTempoChange;
        tickOfLastTempoChange = tick;
        mostRecentTempoChange.time = roundToNDecimals(timeOfLastTempoChange, ROUNDING_PRECISION);
        tempo = mostRecentTempoChange.tempo;
        milliSecondsPerTick = getMillisecondsPerTick(tempo, timeDivision);
      } // Update current time in seconds


      currentTime = (currentTick - tickOfLastTempoChange) * milliSecondsPerTick / 1000 + timeOfLastTempoChange; // Skip events that are neither note-on nor note-off

      if (type !== EVENT_TYPES.noteOn && type !== EVENT_TYPES.noteOff) {
        continue;
      }

      const [pitch, velocity] = event.data;
      const channel = event.channel;
      const key = `${pitch} ${channel}`;

      if (type === EVENT_TYPES.noteOff || type === EVENT_TYPES.noteOn && velocity === 0) {
        // Handle note-off
        if (unfinishedNotes.has(key)) {
          unfinishedNotes.get(key).end = currentTime;
          unfinishedNotes.delete(key);
        } else {
          if (log) {
            console.warn('Did not find an unfinished note for note-off event!');
            console.log(event);
          }
        }
      } else if (type === EVENT_TYPES.noteOn) {
        // Handle note-on
        const newNote = new Note$2(pitch, roundToNDecimals(currentTime, ROUNDING_PRECISION), velocity, channel);
        notes.push(newNote);
        unfinishedNotes.set(key, newNote);
      } else {
        continue;
      }
    } // Fix missing note ends


    const neededToFix = [];

    for (const note of notes) {
      if (note.end === -1) {
        note.end = roundToNDecimals(currentTime, ROUNDING_PRECISION);
        neededToFix.push(note);
      }
    }

    if (neededToFix.length > 0) {
      console.warn(`had to fix ${neededToFix.length} notes`);
      console.log(neededToFix);
    } // Save parsed track with meta information


    const {
      trackName,
      instrument,
      instrumentName
    } = getInstrumentAndTrackName(track);

    if (notes.length > 0) {
      const parsedTrack = {
        noteObjs: notes,
        totalTime: currentTime,
        trackName: trackName !== null && trackName !== void 0 ? trackName : 'Track',
        instrument,
        instrumentName: instrumentName !== null && instrumentName !== void 0 ? instrumentName : 'Unknown instrument'
      }; // console.log(`Got part with ${notes.length} notes,\n`, parsedTrack);

      return parsedTrack;
    } else {
      // console.log('Empty track');
      return null;
    }
  }
  /**
   * Finds out the name of the track and the instrument, if this data is available
   *
   * @private
   * @param {object} track MIDI track
   * @returns {{trackName, instrument, instrumentName}} meta data with either
   *      values or null when no information found
   */


  function getInstrumentAndTrackName(track) {
    let trackName = null;
    let instrument = null;
    let instrumentName = null;

    for (const event of track.event) {
      if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.trackName) {
        trackName = event.data;
      }

      if (event.type === EVENT_TYPES.programChange) {
        instrument = event.data;
      }

      if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.instrumentName) {
        instrumentName = event.data;
      }
    }

    return {
      trackName,
      instrument,
      instrumentName
    };
  }
  /**
   * Caclulates the time positions of measure lines by looking at tempo and beat
   * type change events
   *
   * @private
   * @param {object[]} tempoChanges tempo change events
   * @param {object[]} beatTypeChanges beat type change events
   * @param {number} totalTime total time
   * @returns {number[]} measure line times in seconds
   */


  function getMeasureLines(tempoChanges, beatTypeChanges, totalTime) {
    const measureLines = []; // Generate measure lines from tempo and beat type changes

    let tempo = 120;
    let beats = 4;
    let beatType = 4;
    let currentTime = 0;
    let currentBeatsInMeasure = 0;
    let timeOfLastTempoChange = 0;
    let timeSinceLastTempoChange = 0;

    while (currentTime < totalTime) {
      // Get current tempo and beat type
      let mostRecentTempoChange;

      for (const t of tempoChanges) {
        if (t.time <= currentTime) {
          mostRecentTempoChange = t.tempo;
        }
      }

      if (mostRecentTempoChange && mostRecentTempoChange !== tempo) {
        timeOfLastTempoChange = currentTime;
        timeSinceLastTempoChange = 0;
        tempo = mostRecentTempoChange;
      }

      for (const b of beatTypeChanges) {
        if (b.time <= currentTime) {
          beats = b.beats;
          beatType = b.beatType;
        }
      } // Update time and beats


      currentBeatsInMeasure++;
      const secondsPerBeat = bpmToSecondsPerBeat$1(tempo) / (beatType / 4);
      timeSinceLastTempoChange += secondsPerBeat;
      currentTime = timeOfLastTempoChange + timeSinceLastTempoChange;

      if (currentBeatsInMeasure >= beats) {
        // Measure is full
        currentBeatsInMeasure = 0;
        measureLines.push(roundToNDecimals(currentTime, ROUNDING_PRECISION));
      }
    }

    return measureLines;
  }
  /**
   * @todo NYI
   */
  // function getMeasureIndices() {
  // }

  /**
   * Split MIDI format 0 data into tracks instead of having channels,
   * creates one track for each channel
   *
   * @private
   * @param {Note[][]} tracks parsed MIDI tracks
   * @returns {Note[][]} splitted tracks
   */


  function splitFormat0(tracks) {
    if (tracks.length > 1) {
      console.warn('Splitting a format 0 file with more than 1 track will result in all but the first beeing lost!');
    } // console.log('Splitting format 0 file into tracks based on channel');


    const grouped = group(tracks[0].noteObjs, d => d.channel); // All tracks will share the meta infomation of the 0th track
    // Assign the splitted-by-channel notes to their new tracks

    const splittedTracks = [];

    for (const notes of grouped.values()) {
      splittedTracks.push({ ...tracks[0],
        noteObjs: notes
      });
    }

    return splittedTracks;
  }
  /**
   * Given the tempo and time division, returns the number of milliseconds
   * each MIDI time tick corresponds to
   *
   * @private
   * @param {number} tempo tempo
   * @param {number} timeDivision time division
   * @returns {number} milli seconds per tick
   */


  function getMillisecondsPerTick(tempo, timeDivision) {
    const milliSecondsPerBeat = 1 / tempo * 60_000;
    const milliSecondsPerTick = milliSecondsPerBeat / timeDivision;
    return milliSecondsPerTick;
  }
  /**
   * Retrieves all tempo and beat type changes from a MIDI file's tracks.
   *
   * @see https://github.com/colxi/midi-parser-js/wiki/MIDI-File-Format-Specifications
   * @private
   * @param {Array} tracks MIDI JSON file tracks
   * @returns {object} {tempoChanges, beatTypeChanges} as arrays of objects, which
   *      contain the MIDI tick and the new information
   */


  function getSignatureChanges(tracks) {
    const tempoChanges = [];
    const beatTypeChanges = [];
    const keySignatureChanges = [];
    let currentTick = 0;
    let lastTempo = null;

    for (const track of tracks) {
      for (const event of track.event) {
        // Get timing of events
        currentTick += event.deltaTime; // Tempo change

        if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.setTempo) {
          const milliSecondsPerQuarter = event.data / 1000;
          const tempo = Math.round(1 / (milliSecondsPerQuarter / 60_000)); // Ignore tempo changes that don't change the tempo

          if (tempo !== lastTempo) {
            tempoChanges.push({
              tick: currentTick,
              tempo,
              time: currentTick === 0 ? 0 : undefined
            });
            lastTempo = tempo;
          }
        } // Beat type change


        if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.timeSignature) {
          const d = event.data;
          const beats = d[0];
          const beatType = 2 ** d[1];
          const newEntry = {
            tick: currentTick,
            beats,
            beatType
          };

          if (beatTypeChanges.length === 0) {
            beatTypeChanges.push(newEntry);
          } else {
            // If it id not change, do not add
            const last = beatTypeChanges[beatTypeChanges.length - 1];

            if (last.beats !== beats || last.beatType !== beatType) {
              beatTypeChanges.push(newEntry);
            }
          } // console.log(`Metro: ${d[2]}`);
          // console.log(`32nds: ${d[3]}`);

        } // Key change


        if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.keySignature) {
          // console.log('keychange', event);
          const d = event.data;

          if (!KEY_SIG_MAP.has(d)) {
            console.warn('[MidiParser] Invalid key signature', d);
          } else {
            const {
              key,
              scale
            } = KEY_SIG_MAP.get(d);
            const newEntry = {
              tick: currentTick,
              key,
              scale
            };

            if (keySignatureChanges.length === 0) {
              keySignatureChanges.push(newEntry);
            } else {
              // If it id not change, do not add
              const last = keySignatureChanges[keySignatureChanges.length - 1];

              if (last.key !== key || last.scale !== scale) {
                keySignatureChanges.push(newEntry);
              }
            }
          }
        }
      }
    } // Default values


    if (tempoChanges.length === 0 || tempoChanges[0].time > 0) {
      tempoChanges.unshift({
        tempo: 120,
        time: 0
      });
    }

    if (beatTypeChanges.length === 0 || beatTypeChanges[0].time > 0) {
      beatTypeChanges.unshift({
        beats: 4,
        beatType: 4,
        time: 0
      });
    }

    if (keySignatureChanges.length === 0 || keySignatureChanges[0].time > 0) {
      keySignatureChanges.unshift({
        key: 'C',
        scale: 'major',
        time: 0
      });
    }

    return {
      tempoChanges,
      beatTypeChanges,
      keySignatureChanges
    };
  }
  /**
   * MIDI event types and meta types and their codes
   *
   * @see https://github.com/colxi/midi-parser-js/wiki/MIDI-File-Format-Specifications
   * Event Type         Value   Value decimal    Parameter 1         Parameter 2
   * Note Off           0x8       8              note number         velocity
   * Note On            0x9       9              note number         velocity
   * Note Aftertouch    0xA      10              note number         aftertouch value
   * Controller         0xB      11              controller number   controller value
   * Program Change     0xC      12              program number      not used
   * Channel Aftertouch 0xD      13              aftertouch value    not used
   * Pitch Bend         0xE      14              pitch value (LSB)   pitch value (MSB)
   * Meta               0xFF    255                 parameters depend on meta type
   * @type {object}
   */


  const EVENT_TYPES = {
    noteOff: 0x8,
    noteOn: 0x9,
    noteAftertouch: 0xA,
    controller: 0xB,
    programChange: 0xC,
    channelAftertouch: 0xD,
    pitchBend: 0xE,
    meta: 0xFF
  };
  /**
   * @type {object}
   */

  const META_TYPES = {
    sequenceNumber: 0x0,
    textEvent: 0x1,
    copyright: 0x2,
    trackName: 0x3,
    instrumentName: 0x4,
    lyrics: 0x5,
    marker: 0x6,
    cuePoint: 0x7,
    channelPrefix: 0x20,
    endOfTrack: 0x2F,
    setTempo: 0x51,
    smpteOffset: 0x54,
    timeSignature: 0x58,
    keySignature: 0x59,
    sequencerSpecific: 0x7F
  };
  /**
   * Maps needed for key signature detection from number of sharps / flats
   *
   * @type {Map<number,object>}
   * @see https://www.recordingblogs.com/wiki/midi-key-signature-meta-message
   */

  const KEY_SIG_MAP = new Map([// major
  [0xF9_00, {
    key: 'Cb',
    scale: 'major'
  }], [0xFA_00, {
    key: 'Gb',
    scale: 'major'
  }], [0xFB_00, {
    key: 'Db',
    scale: 'major'
  }], [0xFC_00, {
    key: 'Ab',
    scale: 'major'
  }], [0xFD_00, {
    key: 'Eb',
    scale: 'major'
  }], [0xFE_00, {
    key: 'Bb',
    scale: 'major'
  }], [0xFF_00, {
    key: 'F',
    scale: 'major'
  }], [0x00_00, {
    key: 'C',
    scale: 'major'
  }], [0x01_00, {
    key: 'G',
    scale: 'major'
  }], [0x02_00, {
    key: 'D',
    scale: 'major'
  }], [0x03_00, {
    key: 'A',
    scale: 'major'
  }], [0x04_00, {
    key: 'E',
    scale: 'major'
  }], [0x05_00, {
    key: 'B',
    scale: 'major'
  }], [0x06_00, {
    key: 'F#',
    scale: 'major'
  }], [0x07_00, {
    key: 'C#',
    scale: 'major'
  }], // minor
  [0xF9_01, {
    key: 'Ab',
    scale: 'minor'
  }], [0xFA_01, {
    key: 'Eb',
    scale: 'minor'
  }], [0xFB_01, {
    key: 'Bb',
    scale: 'minor'
  }], [0xFC_01, {
    key: 'F',
    scale: 'minor'
  }], [0xFD_01, {
    key: 'C',
    scale: 'minor'
  }], [0xFE_01, {
    key: 'G',
    scale: 'minor'
  }], [0xFF_01, {
    key: 'D',
    scale: 'minor'
  }], [0x00_01, {
    key: 'A',
    scale: 'minor'
  }], [0x01_01, {
    key: 'E',
    scale: 'minor'
  }], [0x02_01, {
    key: 'B',
    scale: 'minor'
  }], [0x03_01, {
    key: 'F#',
    scale: 'minor'
  }], [0x04_01, {
    key: 'C#',
    scale: 'minor'
  }], [0x05_01, {
    key: 'G#',
    scale: 'minor'
  }], [0x06_01, {
    key: 'D#',
    scale: 'minor'
  }], [0x07_01, {
    key: 'A#',
    scale: 'minor'
  }]]);

  /**
   * Represents a parsed MIDI or MusicXML file in a uniform format.
   */

  class MusicPiece {
    /**
     * Do not use this constructor, but the static methods MusicPiece.fromMidi
     * and MusicPiece.fromMusicXml instead.
     *
     * @param {string} name name (e.g. file name or piece name)
     * @param {TempoDefinition[]} tempos tempos
     * @param {TimeSignature[]} timeSignatures time signatures
     * @param {KeySignature[]} keySignatures key signatures
     * @param {number[]} measureTimes time in seconds for each measure line
     * @param {Track[]} tracks tracks
     * @throws {'No or invalid tracks given!'} when invalid tracks are given
     */
    constructor(name, tempos, timeSignatures, keySignatures, measureTimes, tracks) {
      if (!tracks || tracks.length === 0) {
        throw new Error('No or invalid tracks given');
      }

      this.name = name;
      this.measureTimes = measureTimes;
      this.tracks = tracks;
      this.duration = Math.max(...this.tracks.map(d => d.duration)); // Filter multiple identical consecutive infos

      this.tempos = tempos.slice(0, 1);
      let currentTempo = tempos[0];

      for (const tempo of tempos) {
        if (tempo.string !== currentTempo.string) {
          currentTempo = tempo;
          this.tempos.push(tempo);
        }
      }

      this.timeSignatures = timeSignatures.slice(0, 1);
      let currentTimeSig = timeSignatures[0];

      for (const timeSignature of timeSignatures) {
        if (timeSignature.string !== currentTimeSig.string) {
          currentTimeSig = timeSignature;
          this.timeSignatures.push(timeSignature);
        }
      }

      this.keySignatures = keySignatures.slice(0, 1);
      let currentKeySig = keySignatures[0];

      for (const keySignature of keySignatures) {
        if (keySignature.string !== currentKeySig.string) {
          currentKeySig = keySignature;
          this.keySignatures.push(keySignature);
        }
      }
    }
    /**
     * Creates a MusicPiece object from a MIDI file binary
     *
     * @param {string} name name
     * @param {ArrayBuffer} midiFile MIDI file
     * @returns {MusicPiece} new MusicPiece
     * @throws {'No MIDI file content given'} when MIDI file is undefined or null
     * @example <caption>In Node.js</caption>
     *      const file = path.join(directory, fileName);
     *      const data = fs.readFileSync(file, 'base64');
     *      const mp = MusicPiece.fromMidi(fileName, data);
     * @example <caption>In the browser</caption>
     *      const uintArray = new Uint8Array(midiBinary);
     *      const MP = MusicPiece.fromMidi(filename, uintArray);
     */


    static fromMidi(name, midiFile) {
      if (!midiFile) {
        throw new Error('No MIDI file content given');
      }

      const midi = main.exports.parse(midiFile);
      const parsed = preprocessMidiFileData(midi);
      let tempos = [];
      let timeSignatures = [];
      let keySignatures = [];
      let measureTimes = [];

      if (parsed.tracks.length > 0) {
        // Tempos
        tempos = parsed.tempoChanges.map(d => new TempoDefinition(d.time, d.tempo)); // Time signatures

        timeSignatures = parsed.beatTypeChanges.map(d => new TimeSignature(d.time, [d.beats, d.beatType])); // Key signatures

        keySignatures = parsed.keySignatureChanges.map(d => new KeySignature(d.time, d.key, d.scale)); // Measure times

        measureTimes = parsed.measureLinePositions;
      } // Tracks


      const tracks = parsed.tracks.map((t, index) => Track.fromMidi(t.trackName, t.instrumentName, t.noteObjs, index));
      return new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks);
    }
    /**
     * Creates a MusicPiece object from a MIDI file binary
     *
     * @todo on hold until @tonejs/midi adds time in seconds for meta events
     * @deprecated This is not fully implemented yet
     * @todo use @tonejs/midi for parsing, but the same information as with
     * MusicPiece.fromMidi()
     * @see https://github.com/Tonejs/Midi
     * @param {string} name name
     * @param {ArrayBuffer} midiFile MIDI file
     * @returns {MusicPiece} new MusicPiece
     * @throws {'No MIDI file content given'} when MIDI file is undefined or null
     * @example <caption>In Node.js</caption>
     *      const file = path.join(directory, fileName);
     *      const data = fs.readFileSync(file);
     *      const mp = MusicPiece.fromMidi(fileName, data);
     * @example <caption>In the browser</caption>
     *      const uintArray = new Uint8Array(midiBinary);
     *      const MP = MusicPiece.fromMidi(filename, uintArray);
     */


    static fromMidi2(name, midiFile) {
      if (!midiFile) {
        throw new Error('No MIDI file content given');
      }

      const parsed = new Midi_2(midiFile); // const uintArray = new Uint8Array(midiFile);
      // const parsed = new Midi(uintArray);
      // Tracks

      const tracks = [];

      for (const track of parsed.tracks) {
        if (track.notes.length === 0) {
          continue;
        }

        const notes = track.notes.map(note => Note$2.from({
          pitch: note.midi,
          start: note.time,
          end: note.time + note.duration,
          velocity: Math.round(note.velocity * 127),
          channel: track.channel
        }));
        tracks.push(Track.fromMidi(track.trackName, track.instrumentName, notes));
      } // TODO: convert ticks to seconds


      let tempos = [];
      let timeSignatures = [];
      let keySignatures = [];
      let measureTimes = [];

      if (parsed.tracks.length > 0) {
        // tempos
        tempos = parsed.header.tempos.map(d => new TempoDefinition(d.time, d.tempo)); // time signatures

        timeSignatures = parsed.header.timeSignatures.map(d => new TimeSignature(d.time, [d.beats, d.beatType])); // key signatures

        keySignatures = parsed.header.keySignatures.map(d => new KeySignature(d.time, d.key, d.scale)); // measure times

        measureTimes = parsed.measureLinePositions;
      }

      return new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks);
    }
    /**
     * Creates a MusicPiece object from a MusicXML string
     *
     * @param {string} name name
     * @param {string|object} xmlFile MusicXML file content as string or object
     *      If it is an object, it must behave like a DOM, e.g. provide methods
     *      such as .querySelectorAll()
     * @returns {MusicPiece} new MusicPiece
     * @throws {'No MusicXML file content given'} when MusicXML file is
     *  undefined or null
     * @example Parsing a MusicPiece in Node.js
     *    const jsdom = require('jsdom');
     *    const xmlFile = fs.readFileSync('My Song.musicxml');
     *    const dom = new jsdom.JSDOM(xmlFile);
     *    const xmlDocument = dom.window.document;
     *    const mp = musicvislib.MusicPiece.fromMusicXml('My Song', xmlDocument);
     */


    static fromMusicXml(name, xmlFile) {
      if (!xmlFile) {
        throw new Error('No MusicXML file content given');
      }

      let xmlDocument = xmlFile;

      if (typeof xmlDocument === 'string') {
        const parser = new DOMParser();
        xmlDocument = parser.parseFromString(xmlFile, 'text/xml');
      }

      const parsed = preprocessMusicXmlData(xmlDocument);
      let tempos = [];
      let timeSignatures = [];
      let keySignatures = [];

      if (parsed.parts.length > 0) {
        // Tempos
        tempos = parsed.parts[0].tempoChanges.map(d => new TempoDefinition(d.time, d.tempo)); // Time signatures

        timeSignatures = parsed.parts[0].beatTypeChanges.map(d => new TimeSignature(d.time, [d.beats, d.beatType])); // Key signatures

        keySignatures = parsed.parts[0].keySignatureChanges.map(d => new KeySignature(d.time, d.key, d.scale));
      } // Measure times


      let measureTimes = [];

      if (parsed.parts.length > 0) {
        measureTimes = parsed.parts[0].measureLinePositions;
      } // Tracks


      const tracks = parsed.parts.map((t, index) => Track.fromMusicXml(parsed.partNames[index], parsed.instruments[index], t.noteObjs, index, t.tuning));
      return new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks);
    }
    /**
     * Allows to get a MusicPiece from JSON after doing JSON.stringify()
     *
     * @param {string|JSON} json JSON
     * @returns {MusicPiece} new MusicPiece
     * @example
     *      const jsonString = mp.toJson();
     *      const recovered = MusicPiece.fromJson(jsonString);
     */


    static fromJson(json) {
      json = typeof json === 'string' ? JSON.parse(json) : json;
      const name = json.name;
      const tempos = json.tempos.map(d => new TempoDefinition(d.time, d.bpm));
      const timeSignatures = json.timeSignatures.map(d => new TimeSignature(d.time, d.signature));
      const keySignatures = json.keySignatures.map(d => new KeySignature(d.time, d.key, d.scale));
      const measureTimes = json.measureTimes;
      const tracks = json.tracks.map(track => {
        const notes = track.notes.map(note => {
          return note.string !== undefined && note.fret !== undefined ? GuitarNote.from(note) : Note$2.from(note);
        });
        return new Track(track.name, track.instrument, notes, track.tuningPitches);
      });
      return new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks);
    }
    /**
     * Returns a JSON-serialized representation
     *
     * @param {boolean} pretty true for readable (prettified) JSON
     * @returns {string} JSON as string
     * @example
     *      const jsonString = mp.toJson();
     *      const recovered = MusicPiece.fromJson(jsonString);
     */


    toJson(pretty = false) {
      return JSON.stringify(this, undefined, pretty ? 2 : 0);
    }
    /**
     * Returns an array with all notes from all tracks.
     *
     * @deprecated use getNotesFromTracks('all') instead.
     * @param {boolean} sortByTime true: sort notes by time
     * @returns {Note[]} all notes of this piece
     */


    getAllNotes(sortByTime = false) {
      const notes = this.tracks.flatMap(t => t.notes);

      if (sortByTime) {
        notes.sort((a, b) => a.start - b.start);
      }

      return notes;
    }
    /**
     * Returns an array with notes from the specified tracks.
     *
     * @param {'all'|number|number[]} indices either 'all', a number, or an
     *      Array with numbers
     * @param {boolean} sortByTime true: sort notes by time (not needed for a
     *      single track)
     * @returns {Note[]} Array with all notes from the specified tracks
     */


    getNotesFromTracks(indices = 'all', sortByTime = false) {
      let notes = [];

      if (indices === 'all') {
        // Return all notes from all tracks
        notes = this.tracks.flatMap(t => t.notes);
      } else if (Array.isArray(indices)) {
        // Return notes from some tracks
        notes = this.tracks.filter((d, i) => indices.includes(i)).flatMap(t => t.notes);
      } else {
        // Return notes from a single track
        notes = this.tracks[indices].notes; // Notes in each tracks are already sorted

        sortByTime = false;
      }

      if (sortByTime) {
        notes.sort((a, b) => a.start - b.start);
      }

      return notes;
    }
    /**
     * Transposes all or only the specified tracks by the specified number of
     * (semitone) steps.
     * Will return a new MusicPiece instance.
     * Note pitches will be clipped to [0, 127].
     *
     * @param {number} steps number of semitones to transpose (can be negative)
     * @param {'all'|number|number[]} tracks tracks to transpose
     * @returns {MusicPiece} a new, transposed MusicPiece
     */


    transpose(steps = 0, tracks = 'all') {
      const newTracks = this.tracks.map((track, index) => {
        const change = tracks === 'all' || Array.isArray(tracks) && tracks.includes(index) || tracks === index;
        const na = new NoteArray(track.notes);
        let tuning = track.tuningPitches;

        if (change) {
          // Transpose notes and tuning pitches
          na.transpose(steps);
          tuning = track.tuningPitches.map(d => d + steps);
        }

        return new Track(track.name, track.instrument, na.getNotes(), tuning);
      });
      return new MusicPiece(this.name, [...this.tempos], [...this.timeSignatures], [...this.keySignatures], [...this.measureTimes], newTracks);
    }

  }
  /**
   * Used by MusicPiece, should not be used directly
   */


  class Track {
    /**
     * Do not use this constructor, but the static methods Track.fromMidi
     * and Track.fromMusicXml instead.
     *
     * Notes will be sorted by start time.
     *
     * @param {string} name name
     * @param {string} instrument instrument name
     * @param {Note[]} notes notes
     * @param {number[]} tuningPitches MIDI note numbers of the track's tuning
     * @throws {'Notes are undefined or not an array'} for invalid notes
     */
    constructor(name, instrument, notes, tuningPitches = null) {
      var _name;

      name = !((_name = name) !== null && _name !== void 0 && _name.length) ? 'unnamed' : name.replace('\u0000', '');
      this.name = name;
      this.instrument = instrument;

      if (!notes || notes.length === undefined) {
        throw new Error('Notes are undefined or not an array');
      }

      this.notes = notes.sort((a, b) => a.start - b.start);
      this.tuningPitches = tuningPitches; // Computed properties

      this.duration = new NoteArray(notes).getDuration();
      this.hasStringFret = false;

      for (const note of notes) {
        if (note.string !== undefined && note.fret !== undefined) {
          this.hasStringFret = true;
          break;
        }
      }
    }
    /**
     * Creates a new Track from a MusicXML track
     *
     * @param {string} name name
     * @param {string} instrument instrument name
     * @param {Note[]} notes parsed MusicXML track's notes
     * @returns {Track} new Track
     */


    static fromMidi(name, instrument, notes) {
      return new Track(name, instrument, notes);
    }
    /**
     * Creates a new Track from a MusicXML track
     *
     * @param {string} name name
     * @param {string} instrument instrument name
     * @param {Note[]} notes parsed MusicXML track's notes
     * @param {number} channel channel
     * @param {number[]} tuningPitches MIDI note numbers of the track's tuning
     * @returns {Track} new Track
     */


    static fromMusicXml(name, instrument, notes, channel, tuningPitches = null) {
      for (const n of notes) {
        n.channel = channel;
      }

      return new Track(name, instrument, notes, tuningPitches);
    }

  }
  /**
   * Tempo definition
   */

  class TempoDefinition {
    /**
     * @param {number} time in seconds
     * @param {number} bpm tempo in seconds per beat
     */
    constructor(time, bpm) {
      this.time = time;
      this.bpm = bpm;
      this.string = `${bpm} bpm`;
    }

  }
  /**
   * Time signature definition
   */

  class TimeSignature {
    /**
     * @param {number} time in seconds
     * @param {number[]} signature time signature as [beats, beatType]
     */
    constructor(time, signature) {
      this.time = time;
      this.signature = signature;
      this.string = signature.join('/');
    }

  }
  /**
   * Key signature definition
   */

  class KeySignature {
    /**
     * @param {number} time in seconds
     * @param {string} key key e.g. 'C'
     * @param {string} scale scale e.g. 'major'
     */
    constructor(time, key, scale) {
      this.time = time;
      this.key = key;
      this.scale = scale;
      this.string = `${key} ${scale}`;
    }

  }

  var id = 0;

  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }

  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }

    return receiver;
  }

  /**
   * Stores a sequence of pitches and provides some methods to simplify and
   * manipulate it.
   *
   * @todo implement keepOnlyHighestConcurrentNotes
   */

  var _pitches = /*#__PURE__*/_classPrivateFieldLooseKey("pitches");

  class PitchSequence {
    /**
     * @param {number[]} pitches pitches
     */
    constructor(pitches = []) {
      Object.defineProperty(this, _pitches, {
        writable: true,
        value: []
      });
      _classPrivateFieldLooseBase(this, _pitches)[_pitches] = pitches;
    }
    /**
     * Creates a pitch sequence from an array of Notes
     *
     * @param {Note[]} notes notes
     * @returns {PitchSequence} pitch sequence
     */


    static fromNotes(notes = []) {
      const pitches = [...notes].sort((a, b) => {
        if (a.start === b.start) {
          return a.pitch - b.pitch;
        }

        return a.start - b.start;
      }).map(d => d.pitch);
      return new PitchSequence(pitches);
    }
    /**
     * @param {string} string a string of Unicode characters
     * @returns {PitchSequence} pitch sequence
     */


    static fromCharString(string) {
      if (!string || string.length === 0) {
        return new PitchSequence();
      }

      const pitches = string.split('').map((d, index) => string.charCodeAt(index));
      return new PitchSequence(pitches);
    }
    /**
     * @returns {number[]} pitches
     */


    getPitches() {
      return _classPrivateFieldLooseBase(this, _pitches)[_pitches];
    }
    /**
     * @returns {number} number of pitches
     */


    length() {
      return _classPrivateFieldLooseBase(this, _pitches)[_pitches].length;
    }
    /**
     * Turns pitch sequence into a string by turning each  pitch into a character
     * (based on Unicode index)
     *
     * @returns {string} string representation of note pitches
     */


    toCharString() {
      if (!_classPrivateFieldLooseBase(this, _pitches)[_pitches] || _classPrivateFieldLooseBase(this, _pitches)[_pitches].length === 0) {
        return '';
      }

      return String.fromCharCode(..._classPrivateFieldLooseBase(this, _pitches)[_pitches]);
    }
    /**
     * @returns {string} a string with the notes' names
     */


    toNoteNameString() {
      return _classPrivateFieldLooseBase(this, _pitches)[_pitches].map(p => getMidiNoteByNr(p).label).join(' ');
    }
    /**
     * Reverses the order of pitches in this PitchSequence
     *
     * @returns {PitchSequence} this
     */


    reverse() {
      _classPrivateFieldLooseBase(this, _pitches)[_pitches] = _classPrivateFieldLooseBase(this, _pitches)[_pitches].reverse();
      return this;
    }
    /**
     * Takes a sequence of MIDI pitches and nomralizes them to be in [0, 11]
     *
     * @returns {PitchSequence} this
     */


    removeOctaves() {
      _classPrivateFieldLooseBase(this, _pitches)[_pitches] = _classPrivateFieldLooseBase(this, _pitches)[_pitches].map(d => d % 12);
      return this;
    }
    /**
     * Transforms note pitches to intervals, i.e. diffrences between to subsequent
     * notes: C, C#, C, D => 1, -1, 2
     *
     * @returns {number[]} intervals
     */


    toIntervals() {
      const p = _classPrivateFieldLooseBase(this, _pitches)[_pitches];

      if (!p || p.length === 0 || p.length < 2) {
        return [];
      }

      const result = Array.from({
        length: p.length - 1
      });

      for (let index = 1; index < p.length; index++) {
        result[index - 1] = p[index] - p[index - 1];
      }

      return result;
    }
    /**
     * @returns {PitchSequence} clone
     */


    clone() {
      return new PitchSequence(_classPrivateFieldLooseBase(this, _pitches)[_pitches]);
    }
    /**
     * Returns true if this NoteArray and otherNoteArray have equal attributes.
     *
     * @param {NoteArray} otherPitchSequence another NoteArray
     * @returns {boolean} true if equal
     */


    equals(otherPitchSequence) {
      if (!(otherPitchSequence instanceof PitchSequence)) {
        return false;
      }

      const p = otherPitchSequence.getPitches();

      if (_classPrivateFieldLooseBase(this, _pitches)[_pitches].length !== p.length) {
        return false;
      }

      for (const [index, element] of p.entries()) {
        if (_classPrivateFieldLooseBase(this, _pitches)[_pitches][index] !== element) {
          return false;
        }
      }

      return true;
    }

  }

  /**
   * @module graphics/Canvas
   * @todo save canvas as file https://www.digitalocean.com/community/tutorials/js-canvas-toblob
   */

  /**
   * Sets up a canvas rescaled to device pixel ratio
   *
   * @param {HTMLCanvasElement} canvas canvas element
   * @returns {CanvasRenderingContext2D} canvas rendering context
   */
  function setupCanvas(canvas) {
    // Fix issues when importing musicvis-lib in Node.js
    if (!window) {
      return;
    } // Get the device pixel ratio, falling back to 1.


    const dpr = window.devicePixelRatio || 1; // Get the size of the canvas in CSS pixels.

    const rect = canvas.getBoundingClientRect(); // Give the canvas pixel dimensions of their CSS
    // sizes times the device pixel ratio.

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const context = canvas.getContext('2d'); // Scale all drawing operations by the dpr

    context.scale(dpr, dpr);
    return context;
  }
  /**
   * Draws a stroked straight line.
   *
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x1 x coordinate of the start
   * @param {number} y1 y coordinate of the start
   * @param {number} x2 x coordinate of end
   * @param {number} y2 y coordinate of end
   * @returns {void}
   * @example
   *      // Set the strokeStyle first
   *      context.strokeStyle = 'black';
   *      // Let's draw an X
   *      Canvas.drawLine(context, 0, 0, 50, 50);
   *      Canvas.drawLine(context, 0, 50, 50, 0);
   */

  function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }
  /**
   * Draws a stroked straight horizontal line.
   *
   * @deprecated Use context.fillRect(x1, y, x2-x1, strokeWidth)
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x1 x coordinate of the start
   * @param {number} y y coordinate of the start
   * @param {number} x2 x coordinate of end
   * @returns {void}
   */

  function drawHLine(context, x1, y, x2) {
    context.beginPath();
    context.moveTo(x1, y);
    context.lineTo(x2, y);
    context.stroke();
  }
  /**
   * Draws a stroked straight vertical line.
   *
   * @deprecated Use context.fillRect(x1, y1, strokeWidth, y2-y1)
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x x coordinate of the start
   * @param {number} y1 y coordinate of the start
   * @param {number} y2 y coordinate of end
   * @returns {void}
   */

  function drawVLine(context, x, y1, y2) {
    context.beginPath();
    context.moveTo(x, y1);
    context.lineTo(x, y2);
    context.stroke();
  }
  /**
   * Draws a stroked circle.
   *
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x x coordinate of center
   * @param {number} y y coordinate of center
   * @param {number} radius radius
   * @returns {void}
   */

  function drawCircle(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
  }
  /**
   * Draws a filled circle.
   *
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x x coordinate of center
   * @param {number} y y coordinate of center
   * @param {number} radius radius
   * @returns {void}
   */

  function drawFilledCircle(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
  }
  /**
   * Draws a filled triangle like this: /\
   *
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x x coordinate of center
   * @param {number} y y coordinate of center
   * @param {number} halfSize half of the size
   * @returns {void}
   */

  function drawTriangle(context, x, y, halfSize) {
    context.beginPath();
    context.moveTo(x - halfSize, y + halfSize);
    context.lineTo(x + halfSize, y + halfSize);
    context.lineTo(x, y - halfSize);
    context.closePath();
    context.fill();
  }
  /**
   * Draws a diamond like this: <>
   *
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x x coordinate of center
   * @param {number} y y coordinate of center
   * @param {number} halfSize half of the size
   * @returns {void}
   */

  function drawDiamond(context, x, y, halfSize) {
    context.beginPath();
    context.moveTo(x - halfSize, y);
    context.lineTo(x, y - halfSize);
    context.lineTo(x + halfSize, y);
    context.lineTo(x, y + halfSize);
    context.closePath();
    context.fill();
  }
  /**
   * Draws an X
   *
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x x coordinate of center
   * @param {number} y y coordinate of center
   * @param {number} halfSize half of the size
   * @returns {void}
   */

  function drawX(context, x, y, halfSize) {
    context.save();
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x - halfSize, y - halfSize);
    context.lineTo(x + halfSize, y + halfSize);
    context.moveTo(x - halfSize, y + halfSize);
    context.lineTo(x + halfSize, y - halfSize);
    context.stroke();
    context.restore();
  }
  /**
   * Draws a trapezoid that looks like a rectangle but gets narrower at the right
   * end, so better show where one ends and the next begins.
   *
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x x coordinate of top left
   * @param {number} y y coordinate of top left
   * @param {number} width width
   * @param {number} height height (of left side)
   * @param {number} height2 height (of right side)
   * @returns {void}
   */

  function drawNoteTrapezoid(context, x, y, width, height, height2) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + height);
    context.lineTo(x + width, y + (height / 2 + height2 / 2));
    context.lineTo(x + width, y + (height / 2 - height2 / 2));
    context.closePath();
    context.fill();
  }
  /**
   * Draws a trapezoid that looks like a rectangle but gets narrower at the top
   * end, so better show where one ends and the next begins.
   *
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x x coordinate of bounding rect's top left
   * @param {number} y y coordinate of bounding rect's top left
   * @param {number} width width (of bounding rect / bottom side)
   * @param {number} height height
   * @param {number} width2 width (of top side)
   * @returns {void}
   */

  function drawNoteTrapezoidUpwards(context, x, y, width, height, width2) {
    context.beginPath();
    context.lineTo(x, y + height);
    context.lineTo(x + width, y + height);
    context.lineTo(x + (width / 2 + width2 / 2), y);
    context.lineTo(x + (width / 2 - width2 / 2), y);
    context.closePath();
    context.fill();
  }
  /**
   * Draws a rectangle with rounded corners, does not fill or stroke by itself
   *
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x x coordinate of bounding rect's top left
   * @param {number} y y coordinate of bounding rect's top left
   * @param {number} width width
   * @param {number} height height
   * @param {number} radius rounding radius
   * @returns {void}
   */

  function drawRoundedRect(context, x, y, width, height, radius) {
    if (width < 0) {
      return;
    }

    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
  }
  /**
   * Draws a horizontal, then vertical line to connect two points (or the other
   * way round when xFirst == false)
   *
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x1 x coordinate of start
   * @param {number} y1 y coordinate of start
   * @param {number} x2 x coordinate of end
   * @param {number} y2 y coordinate of end
   * @param {boolean} [xFirst=true] controls whether to go first in x or y direction
   */

  function drawCornerLine(context, x1, y1, x2, y2, xFirst = true) {
    context.beginPath();
    context.moveTo(x1, y1);
    xFirst ? context.lineTo(x2, y1) : context.lineTo(x1, y2);
    context.lineTo(x2, y2);
    context.stroke();
  }
  /**
   * Draws a rounded version of drawCornerLine()
   *
   * @todo only works for dendrograms drawn from top-dowm
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} x1 x coordinate of start
   * @param {number} y1 y coordinate of start
   * @param {number} x2 x coordinate of end
   * @param {number} y2 y coordinate of end
   * @param {number} [maxRadius=25] maximum radius, fixes possible overlaps
   */

  function drawRoundedCornerLine(context, x1, y1, x2, y2, maxRadius = 25) {
    const xDist = Math.abs(x2 - x1);
    const yDist = Math.abs(y2 - y1);
    const radius = Math.min(xDist, yDist, maxRadius);
    const cx = x1 < x2 ? x2 - radius : x2 + radius;
    const cy = y1 < y2 ? y1 + radius : y1 - radius;
    context.beginPath();
    context.moveTo(x1, y1);

    if (x1 < x2) {
      context.arc(cx, cy, radius, 1.5 * Math.PI, 2 * Math.PI);
    } else {
      context.arc(cx, cy, radius, 1.5 * Math.PI, Math.PI, true);
    }

    context.lineTo(x2, y2);
    context.stroke();
  }
  /**
   * Draws a hexagon
   *
   * @param {CanvasRenderingContext2D} context canvas rendering context
   * @param {number} cx center x
   * @param {number} cy center y
   * @param {number} radius radius of the circle on which the points are placed
   */

  function drawHexagon(context, cx, cy, radius) {
    context.beginPath();

    for (let index = 0; index < 6; index++) {
      // Start at 30° TODO: allow to specify
      const angle = (60 * index + 30) / 180 * Math.PI;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }

    context.closePath();
  }

  var Canvas = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setupCanvas: setupCanvas,
    drawLine: drawLine,
    drawHLine: drawHLine,
    drawVLine: drawVLine,
    drawCircle: drawCircle,
    drawFilledCircle: drawFilledCircle,
    drawTriangle: drawTriangle,
    drawDiamond: drawDiamond,
    drawX: drawX,
    drawNoteTrapezoid: drawNoteTrapezoid,
    drawNoteTrapezoidUpwards: drawNoteTrapezoidUpwards,
    drawRoundedRect: drawRoundedRect,
    drawCornerLine: drawCornerLine,
    drawRoundedCornerLine: drawRoundedCornerLine,
    drawHexagon: drawHexagon
  });

  /**
   * Allows to record audio blobs.
   *
   * @module input/AudioRecorder
   * @example <caption>Usage (only in async functions)</caption>
   *     const recorder = await recordAudio();
   *     recorder.start();
   *     // ...
   *     const audio = await recorder.stop();
   * stop() returns a Blob with audio data
   * @see https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
   * @returns {Promise} audio recorder
   */
  const recordAudio = () => {
    return new Promise(async resolve => {
      let stream;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        });
      } catch (error) {
        console.warn('[AudioInput] Cannot access audio', error);
        return;
      }

      const options = {
        audioBitsPerSecond: 128_000
      };
      const mediaRecorder = new MediaRecorder(stream, options);
      let audioChunks = []; // Add new data when it arrives

      mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
      }); // Starts recording

      const start = () => {
        if (!mediaRecorder) {
          console.warn('[AudioInput] Cannot record audio, no microphone?');
          return;
        }

        if (mediaRecorder.state === 'recording') {
          return;
        }

        console.log(`[AudioInput] Recording @ ${mediaRecorder.audioBitsPerSecond} b/s`);
        audioChunks = [];
        mediaRecorder.start();
      }; // Stops recording


      const stop = () => new Promise(resolve => {
        if (!mediaRecorder) {
          return;
        }

        console.log('[AudioInput] Stopping audio recording');
        mediaRecorder.addEventListener('stop', () => {
          // Audio blob contains the data to store on the server
          const blobOptions = {
            type: mediaRecorder.mimeType
          };
          const audioBlob = new Blob(audioChunks, blobOptions); // console.log(audioBlob);

          resolve(audioBlob);
        });
        mediaRecorder.stop();
      });

      resolve({
        start,
        stop
      });
    });
  };

  /**
   * Records incoming MIDI messages from a MIDI device.
   *
   * @param {Function} [onMessage] a callback function to get notfied of incoming
   *      messages
   * @module input/MidiRecorder
   * @example <caption>Usage (only in async functions)</caption>
   *     const recorder = await recordMidi();
   *     recorder.start();
   *     const notes = recorder.stop();
   * @returns {Promise} MIDI recorder
   */

  const recordMidi = onMessage => {
    return new Promise(async resolve => {
      let midiAccess;

      try {
        midiAccess = await navigator.requestMIDIAccess();
      } catch (error) {
        console.warn('[MidiInput] Cannot access MIDI', error);
        return;
      }

      let messages = []; // Add new data when it arrives

      const addMessage = message => {
        if (onMessage) {
          onMessage(message);
        }

        messages.push(message);
      }; // Starts recording


      const start = () => {
        if (!midiAccess) {
          console.warn('[MidiInput] Cannot record MIDI');
          return;
        } // Do this here, in case devices changed


        for (const input of midiAccess.inputs.values()) {
          input.onmidimessage = addMessage;
        }

        console.log('[MidiInput] Starting recording');
        messages = [];
      }; // Stops recording


      const stop = () => {
        if (!midiAccess) {
          return;
        }

        console.log('[MidiInput] Stopping recording'); // Process messages

        const notes = processMidiMessagesToNotes(messages);
        return notes;
      };

      resolve({
        start,
        stop
      });
    });
  };
  /**
   * Parses MIDI messages to Notes
   *
   * @private
   * @param {Oject[]} messages MIDI messages as they come from the WebMidi API
   * @returns {Note[]} notes
   */

  function processMidiMessagesToNotes(messages) {
    // Keep track of currently sounding notes
    const currentNotes = new Map();
    const notes = [];

    for (const message of messages) {
      const device = message.target.name;
      const time = message.timeStamp;
      const commandAndChannel = message.data[0];
      const channel = commandAndChannel % 16;
      const command = commandAndChannel - channel;
      const pitch = message.data[1]; // A velocity value might not be included with a noteOff command

      const velocity = message.data.length > 2 ? message.data[2] : 0;

      switch (command) {
        case 128:
          noteOff(notes, currentNotes, device, time, pitch, channel);
          break;

        case 144:
          if (velocity > 0) {
            noteOn(currentNotes, device, time, pitch, channel, velocity);
          } else {
            noteOff(notes, currentNotes, device, time, pitch, channel);
          }

          break;

      }
    } // Look for unfinished notes


    if (currentNotes.size > 0) {
      console.warn(`[MidiInput] Got ${currentNotes.size} unfinished notes`);
    }

    notes.sort((a, b) => a.start - b.start);
    return notes;
  }
  /**
   * Handles note-on messages
   *
   * @private
   * @param {Map} currentNotes Map with started but not yet ended notes
   * @param {string} device device name
   * @param {number} time time stamp of the message
   * @param {number} pitch MIDI pitch in [0, 127]
   * @param {number} channel MIDI channel
   * @param {number} velocity MIDI velocity
   */


  function noteOn(currentNotes, device, time, pitch, channel, velocity) {
    const note = new Note$2(pitch, time / 1000, velocity, channel);
    const key = `${device}-${channel}-${pitch}`;
    currentNotes.set(key, note);
  }
  /**
   * Handles note-off messages
   *
   * @private
   * @param {Note[]} notes finished notes
   * @param {Map} currentNotes Map with started but not yet ended notes
   * @param {string} device device name
   * @param {number} time time stamp of the message
   * @param {number} pitch MIDI pitch in [0, 127]
   * @param {number} channel MIDI channel
   */


  function noteOff(notes, currentNotes, device, time, pitch, channel) {
    // Look for note start
    const key = `${device}-${channel}-${pitch}`;

    if (!currentNotes.has(key)) {
      console.warn(`[MidiInput] Missing note-on for note-off with key ${key}`);
      return;
    }

    const note = currentNotes.get(key);
    note.end = time / 1000;
    notes.push(note);
    currentNotes.delete(key);
  }

  /**
   * Handles incoming MIDI messages from a MIDI device.
   *
   * @module input/MidiInputManager
   */

  var _getMidiLiveData = /*#__PURE__*/_classPrivateFieldLooseKey("getMidiLiveData");

  var _setMidiLiveData = /*#__PURE__*/_classPrivateFieldLooseKey("setMidiLiveData");

  var _addCurrentNote = /*#__PURE__*/_classPrivateFieldLooseKey("addCurrentNote");

  var _removeCurrentNote = /*#__PURE__*/_classPrivateFieldLooseKey("removeCurrentNote");

  class MidiInputManager {
    /**
     * Constructor with callback functions
     *
     * @param {Function} getMidiLiveData a function called by this object to get
     *      the currently recorded MIDI notes from App.js, where the
     *      MidiInputManager instance should be created
     *      Example for how to defined getMidiLiveData as method in App.js:
     *          getMidiLiveData = () => this.state.midiLiveData;
     * @param {Function} setMidiLiveData a function called by this object to
     *      update the currently MIDI notes in App.js
     *      Example:
     *          setMidiLiveData = (data) => {
     *              // Work-around so note_off event handling can
     *              // immediately find the note_on event
     *              this.state.midiLiveData = data;
     *              this.setState({ midiLiveData: data });
     *          };
     * @param {Function} addCurrentNote a function called by this object to add
     *      a currently played note (e.g. currently pressed piano key)
     *      Example:
     *          addCurrentNote = (note) => {
     *              const newMap = new Map(this.state.currentNotes).set(note.pitch, note);
     *              this.setState({ currentNotes: newMap });
     *          }
     * @param {Function} removeCurrentNote a function called by this object to
     *      remove a currently played note
     *      Example:
     *          removeCurrentNote = (pitch) => {
     *              const newMap = new Map(this.state.currentNotes).delete(pitch);
     *              this.setState({ currentNotes: newMap });
     *          }
     */
    constructor(getMidiLiveData, setMidiLiveData, addCurrentNote = () => {}, removeCurrentNote = () => {}) {
      Object.defineProperty(this, _getMidiLiveData, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _setMidiLiveData, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _addCurrentNote, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _removeCurrentNote, {
        writable: true,
        value: void 0
      });

      this._onMIDISuccess = midiAccess => {
        // console.log(midiAccess);
        console.groupCollapsed(`[MidiInput] ${midiAccess.inputs.size} input devices`);

        for (const input of midiAccess.inputs.values()) {
          console.log(` - ${input.name}`);
          input.onmidimessage = this._handleMIDIMessage;
        }

        console.groupEnd(); // console.groupCollapsed(`[MidiInput] ${midiAccess.inputs.size} output devices`);
        // for (let output of midiAccess.outputs.values()) {
        //     console.log(` - ${output.name}`);
        // }
        // console.groupEnd();
      };

      this._handleMIDIMessage = message => {
        // console.log(message);
        const device = message.target.name;
        const commandAndChannel = message.data[0];
        const channel = commandAndChannel % 16;
        const command = commandAndChannel - channel;
        const time = message.timeStamp;
        const pitch = message.data[1]; // A velocity value might not be included with a noteOff command

        const velocity = message.data.length > 2 ? message.data[2] : 0;

        switch (command) {
          case 128:
            this._noteOff(device, time, pitch, channel);

            break;

          case 144:
            if (velocity > 0) {
              this._noteOn(device, time, pitch, channel, velocity);
            } else {
              this._noteOff(device, time, pitch, channel);
            }

            break;

        }
      };

      _classPrivateFieldLooseBase(this, _getMidiLiveData)[_getMidiLiveData] = getMidiLiveData;
      _classPrivateFieldLooseBase(this, _setMidiLiveData)[_setMidiLiveData] = setMidiLiveData;
      _classPrivateFieldLooseBase(this, _addCurrentNote)[_addCurrentNote] = addCurrentNote;
      _classPrivateFieldLooseBase(this, _removeCurrentNote)[_removeCurrentNote] = removeCurrentNote; // Request MIDI access

      if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(this._onMIDISuccess, this._onMIDIFailure);
      } else {
        console.error('[MidiInput] WebMIDI is not supported in this browser.');
        alert('You browser does not support WebMIDI');
      }
    }
    /**
     * Handles a successful MIDI access request
     *
     * @private
     * @param {*} midiAccess MIDI access
     */


    /**
     * Handles MIDI access errors
     *
     * @private
     * @param {*} error error
     */
    _onMIDIFailure(error) {
      console.error('[MidiInput] Cannot access MIDI devices.', error);
    }
    /**
     * Handles incoming MIDI messages
     *
     * @private
     * @param {*} message MIDI message
     */


    /**
     * Handles note-on messages
     *
     * @private
     * @param {string} device device name
     * @param {number} time time stamp of the message
     * @param {number} pitch MIDI pitch in [0, 127]
     * @param {number} channel MIDI channel
     * @param {number} velocity MIDI velocity
     */
    _noteOn(device, time, pitch, channel, velocity) {
      const note = new Note$2(pitch, time / 1000, velocity, channel); // Add current note

      _classPrivateFieldLooseBase(this, _addCurrentNote)[_addCurrentNote](note); // Update recorded MIDI data
      // TODO: probably better to only update on note-off,
      // Then we need internal cache
      // But this might be good, since only 'unfinished' notes need to be checked on note-off,
      // so we can remove finished notes from the cache


      let midiData = _classPrivateFieldLooseBase(this, _getMidiLiveData)[_getMidiLiveData]();

      midiData = [...midiData, note];

      _classPrivateFieldLooseBase(this, _setMidiLiveData)[_setMidiLiveData](midiData);
    }
    /**
     * Handles note-off messages by updating the end time of the corresponding
     * note
     *
     * @private
     * @param {string} device device name
     * @param {number} time time stamp of the message
     * @param {number} pitch MIDI pitch in [0, 127]
     * @param {number} channel MIDI channel
     */


    _noteOff(device, time, pitch, channel) {
      const midiData = _classPrivateFieldLooseBase(this, _getMidiLiveData)[_getMidiLiveData]();

      if (midiData.length === 0) {
        // If we have to wait for the setState to process, try again
        setTimeout(() => this._noteOff(time, pitch), 10);
      } // Go back to latest note with the same pitch and channel and add the end time


      let index = midiData.length - 1; // TODO: if there are multiple instruments or channels, check also for those

      while (midiData[index].pitch !== pitch || midiData[index].channel !== channel) {
        index--;

        if (index < 0) {
          console.warn('[MidiInput] Did not find note-on event for note-off event!');
          break;
        }
      }

      if (index >= 0) {
        // Note successfully found, update data
        midiData[index].end = time / 1000;

        _classPrivateFieldLooseBase(this, _setMidiLiveData)[_setMidiLiveData](midiData);

        _classPrivateFieldLooseBase(this, _removeCurrentNote)[_removeCurrentNote](pitch);
      }
    }

  }

  /**
   * @module instruments/Drums
   */

  /**
   * Pitches that are mapped onto themselves are included for other information.
   * Millenium MPS-850 https://www.thomann.de/de/millenium_mps_850_e_drum_set.htm
   *
   * Notation info (line and shape of symbol) so drum notation can generate a lookup from this
   * https://en.wikipedia.org/wiki/Percussion_notation#/media/File:Sibelius_drum_legend.png
   * Lines start with 0 at the top above the top most horizontal notation line,
   * using incremental integers for every possible position, i.e. for on and between lines
   *
   * Legend:
   *  Map key: The orignal pitch from the input data
   *  repPitch: Replacement pitch, used to simplify multiple zones into one
   *  zone: Zone of the instrument this pitch comes from
   *  order: visual order ranking of this intrumentin the UI (top-bottom or left-right)
   *  line: y position in the drum notation (using integers for every possible position)
   *  shape: Note shape in notation: triangle, <>, x, o, ostroke, xstroke
   *  label: Short label for this intrument
   *  name: Full name of this instrument
   *
   * @type {Map<number,object>}
   */

  const drumPitchReplacementMapMPS850 = new Map([// Crash 1
  [49, {
    repPitch: 49,
    zone: 1,
    order: 10,
    line: -1,
    shape: 'o',
    label: 'CC1',
    name: 'Crash Cymbal 1'
  }], [55, {
    repPitch: 49,
    zone: 2,
    order: 11,
    line: -1,
    shape: 'o',
    label: 'CC1',
    name: 'Crash Cymbal 1'
  }], // Crash 2
  [52, {
    repPitch: 57,
    zone: 1,
    order: 20,
    line: 0,
    shape: 'o',
    label: 'CC2',
    name: 'Crash Cymbal 2'
  }], [57, {
    repPitch: 57,
    zone: 2,
    order: 21,
    line: 0,
    shape: 'o',
    label: 'CC2',
    name: 'Crash Cymbal 2'
  }], // Hi-hat stick
  [22, {
    repPitch: 46,
    zone: 1,
    order: 30,
    line: 0,
    shape: '<>',
    label: 'HHS',
    name: 'Hi-Hat'
  }], [26, {
    repPitch: 46,
    zone: 2,
    order: 31,
    line: 0,
    shape: '<>',
    label: 'HHS',
    name: 'Hi-Hat'
  }], [42, {
    repPitch: 46,
    zone: 3,
    order: 32,
    line: 0,
    shape: '<>',
    label: 'HHS',
    name: 'Hi-Hat'
  }], [46, {
    repPitch: 46,
    zone: 4,
    order: 33,
    line: 0,
    shape: '<>',
    label: 'HHS',
    name: 'Hi-Hat'
  }], // Hi-hat pedal
  [44, {
    repPitch: 44,
    zone: 1,
    order: 40,
    line: 9,
    shape: 'o',
    label: 'HHP',
    name: 'Hi-Hat Pedal'
  }], // Ride
  [51, {
    repPitch: 51,
    zone: 1,
    order: 50,
    line: 1,
    shape: 'x',
    label: 'Rd',
    name: 'Ride Cymbal'
  }], [53, {
    repPitch: 51,
    zone: 2,
    order: 51,
    line: 1,
    shape: 'x',
    label: 'Rd',
    name: 'Ride Cymbal'
  }], [59, {
    repPitch: 51,
    zone: 3,
    order: 52,
    line: 1,
    shape: 'x',
    label: 'Rd',
    name: 'Ride Cymbal'
  }], // Snare
  [38, {
    repPitch: 38,
    zone: 1,
    order: 60,
    line: 4,
    shape: 'o',
    label: 'SN',
    name: 'Snare'
  }], [40, {
    repPitch: 38,
    zone: 2,
    order: 61,
    line: 4,
    shape: 'o',
    label: 'SN',
    name: 'Snare'
  }], // Tom 1
  [48, {
    repPitch: 48,
    zone: 1,
    order: 90,
    line: 2,
    shape: 'o',
    label: 'T1',
    name: 'Tom 1'
  }], [50, {
    repPitch: 48,
    zone: 2,
    order: 91,
    line: 2,
    shape: 'o',
    label: 'T1',
    name: 'Tom 1'
  }], // Tom 2
  [45, {
    repPitch: 45,
    zone: 1,
    order: 100,
    line: 3,
    shape: 'o',
    label: 'T2',
    name: 'Tom 2'
  }], [47, {
    repPitch: 45,
    zone: 2,
    order: 101,
    line: 3,
    shape: 'o',
    label: 'T2',
    name: 'Tom 2'
  }], // Stand tom 1
  [43, {
    repPitch: 43,
    zone: 1,
    order: 70,
    line: 5,
    shape: 'o',
    label: 'ST1',
    name: 'Stand Tom 1'
  }], [58, {
    repPitch: 43,
    zone: 2,
    order: 71,
    line: 5,
    shape: 'o',
    label: 'ST1',
    name: 'Stand Tom 1'
  }], // Stand tom 2
  [39, {
    repPitch: 41,
    zone: 1,
    order: 80,
    line: 6,
    shape: 'o',
    label: 'ST2',
    name: 'Stand Tom 2'
  }], [41, {
    repPitch: 41,
    zone: 2,
    order: 81,
    line: 6,
    shape: 'o',
    label: 'ST2',
    name: 'Stand Tom 2'
  }], // Bass drum
  [35, {
    repPitch: 36,
    zone: 1,
    order: 110,
    line: 8,
    shape: 'o',
    label: 'BD',
    name: 'Bass Drum'
  }], [36, {
    repPitch: 36,
    zone: 2,
    order: 111,
    line: 8,
    shape: 'o',
    label: 'BD',
    name: 'Bass Drum'
  }]]);
  /**
   * Generates a variation of an array of notes by adding, removing or changing notes
   *
   * @param {Note[]} data array of notes
   * @param {number} deviation width of the Gauss kernel
   * @param {number} pAdd probability of adding a note after each note
   * @param {number} pRemove probability of removing each note
   * @returns {Note[]} variated Note array
   */

  function generateDrumVariation(data, deviation = 1, pAdd = 0.1, pRemove = 0.1) {
    // Only use pitches that occur in the GT data
    const usedPitches = new Set();

    for (const note of data) {
      usedPitches.add(note.pitch);
    }

    const pitches = [...usedPitches]; // Create variation by adding, removing, and shifting notes

    const randVelocity = randomInt(15, 128);
    const randTime = randomNormal(0, deviation);
    const variation = [];

    for (const note of data) {
      // Add and remove notes at random
      if (randFloat(0, 1) < pAdd) {
        // Add another note
        const start = note.start + randFloat(0, 1);
        const end = start + randFloat(0, 1);
        const velocity = randVelocity();
        const pitch = choose(pitches);
        variation.push(new Note$2(pitch, start, velocity, 0, end));
      }

      if (randFloat(0, 1) < pRemove) ; else {
        // Shift timings at random
        const start = note.start + randTime();
        const end = note.end + randTime(); // Get new note

        const newNote = Note$2.from(note);
        newNote.start = Math.min(start, end);
        newNote.end = Math.max(start, end);
        variation.push(newNote);
      }
    } // Sort notes by start just in case


    variation.sort((a, b) => a.start - b.start);
    return variation;
  }
  /**
   * Replaces pitches based on replacementMap
   *
   * @param {Note[]} notes notes
   * @param {Map} replacementMap a map pitch->replacementPitch
   * @returns {Notes[]} notes with replaced pitches
   * @throws {Error} when replacementMap is missing
   */

  function simplifyDrumPitches(notes, replacementMap) {
    if (!replacementMap || !(replacementMap instanceof Map)) {
      throw 'No replacement map given!';
    }

    const errors = new Set();
    const simplified = notes.map(note => {
      const oldPitch = note.pitch;
      let newPitch = oldPitch;

      if (!replacementMap.has(oldPitch)) {
        errors.add(oldPitch);
      } else {
        newPitch = replacementMap.get(oldPitch).repPitch;
      }

      const newNote = Note$2.from({ ...note,
        pitch: newPitch
      });
      return newNote;
    }); // TODO: return errors, do not log! also easier to test
    // if (errors.size > 0) {
    //     console.warn(`Cannot replace all pitches, replacementMap misses entry for these pitches:`);
    //     console.log(Array.from(errors));
    // }

    return simplified; // return { simplified, errors };
  }
  /**
   * Returns a Map:pitch->yPosIndex for views to lookup which row
   * a pitch has to be drawn in
   *
   * @param {Map} replacementMap a pitch replacement map
   * @returns {Map} Map:pitch->yPosIndex
   */

  function getPitch2PositionMap(replacementMap) {
    const result = new Map();
    const uniqeRows = [...group([...replacementMap], d => d[1].repPitch)];
    uniqeRows.sort((a, b) => a[1][0][1].order - b[1][0][1].order);

    for (const [index, d] of uniqeRows.entries()) {
      result.set(d[0], index);
    }

    return result;
  }

  var Drums = /*#__PURE__*/Object.freeze({
    __proto__: null,
    drumPitchReplacementMapMPS850: drumPitchReplacementMapMPS850,
    generateDrumVariation: generateDrumVariation,
    simplifyDrumPitches: simplifyDrumPitches,
    getPitch2PositionMap: getPitch2PositionMap
  });

  /**
   * @module instruments/Guitar
   */

  /**
   * Represents a tuning of a fretted string instrument.
   */

  class StringedTuning {
    /**
     * Represents a tuning of a fretted string instrument.
     *
     * @param {string} name name
     * @param {string[]} notes array of notes, e.g. ['E2', 'A2', 'D3', ...]
     */
    constructor(name, notes) {
      this.name = name;
      this.notes = notes;
      this.short = notes.join(' ');
      this.pitches = notes.map(note => getMidiNoteByLabel(note).pitch);
      this.stringCount = notes.length;
    }

  }
  /**
   * Maps from instrument to string number to list of tunings.
   * Defaults are at the top.
   *
   * @todo add more? https://en.wikipedia.org/wiki/List_of_guitar_tunings
   * @todo replace arrays by maps? tuning name - tuning
   * @type {Map<string,Map<number,StringedTuning>>}
   * @example
   *      stringedTunings.get('Guitar').get(6) for 6-string guitar tunings
   */

  const stringedTunings = new Map([['Guitar', new Map([[6, [new StringedTuning('E stand.', ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']), new StringedTuning('Drop D', ['D2', 'A2', 'D3', 'G3', 'B3', 'E4']), new StringedTuning('Drop C', ['C2', 'G2', 'C3', 'F3', 'A3', 'D4']), new StringedTuning('1/2 down', ['D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4']), new StringedTuning('1 down', ['D2', 'G2', 'C3', 'F3', 'A3', 'D4']), new StringedTuning('1 1/2 down', ['C#2', 'F#2', 'B2', 'E3', 'G#3', 'C#4']), new StringedTuning('2 down', ['C2', 'F2', 'A#2', 'D#3', 'G3', 'C4']), new StringedTuning('DADGAG', ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'])]], [7, [new StringedTuning('B stand.', ['B1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4']), new StringedTuning('Drop A', ['A1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4']), new StringedTuning('1/2 down', ['A#1', 'D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4']), new StringedTuning('1 down', ['A1', 'D2', 'G2', 'C3', 'F3', 'A3', 'D4']), new StringedTuning('1 1/2 down', ['G#1', 'C#2', 'F#2', 'B2', 'E3', 'G#3', 'C#4']), new StringedTuning('2 down', ['G1', 'C2', 'F2', 'A#2', 'D#3', 'G3', 'C4'])]], [8, [new StringedTuning('F# stand.', ['F#1', 'B1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4']), new StringedTuning('Drop E', ['E1', 'B1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4']), new StringedTuning('1/2 down', ['F1', 'A#1', 'D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4']), new StringedTuning('1 down', ['E1', 'A1', 'D2', 'G2', 'C3', 'F3', 'A3', 'D4']), new StringedTuning('1 1/2 down', ['D#1', 'G#1', 'C#2', 'F#2', 'B2', 'E3', 'G#3', 'C#4']), new StringedTuning('2 down', ['D1', 'G1', 'C2', 'F2', 'A#2', 'D#3', 'G3', 'C4'])]]])], ['Bass', new Map([[4, [new StringedTuning('E stand.', ['E1', 'A1', 'D2', 'G2']), new StringedTuning('Drop D', ['D1', 'A1', 'D2', 'G2']), new StringedTuning('1/2 down', ['D#1', 'G#1', 'C#2', 'F#2']), new StringedTuning('1 down', ['D1', 'G1', 'C2', 'F2']), new StringedTuning('1 1/2 down', ['C#1', 'F#1', 'B1', 'E2']), new StringedTuning('2 down', ['C1', 'F1', 'A#1', 'D#2'])]], [5, [new StringedTuning('B stand.', ['B0', 'E1', 'A1', 'D2', 'G2']), new StringedTuning('Drop A', ['A0', 'D1', 'A1', 'D2', 'G2']), new StringedTuning('1/2 down', ['A#0', 'D#1', 'G#1', 'C#2', 'F#2']), new StringedTuning('1 down', ['A0', 'D1', 'G1', 'C2', 'F2']), new StringedTuning('1 1/2 down', ['G#0', 'C#1', 'F#1', 'B1', 'E2']), new StringedTuning('2 down', ['G0', 'C1', 'F1', 'A#1', 'D#2'])]], [6, [new StringedTuning('F# stand.', ['F#0', 'B0', 'E1', 'A1', 'D2', 'G2']), new StringedTuning('Drop E', ['E0', 'A0', 'D1', 'A1', 'D2', 'G2']), new StringedTuning('1/2 down', ['F0', 'A#0', 'D#1', 'G#1', 'C#2', 'F#2']), new StringedTuning('1 down', ['E1', 'A0', 'D1', 'G1', 'C2', 'F2']), new StringedTuning('1 1/2 down', ['D#0', 'G#0', 'C#1', 'F#1', 'B1', 'E2']), new StringedTuning('2 down', ['D0', 'G0', 'C1', 'F1', 'A#1', 'D#2'])]]])], ['Ukulele', new Map([[4, [new StringedTuning('Hawaii', ['G4', 'C4', 'E4', 'A4']), new StringedTuning('Low G', ['G3', 'C4', 'E4', 'A4']), new StringedTuning('D-tuning', ['A4', 'D4', 'F#4', 'B4']), new StringedTuning('Canadian', ['A3', 'D4', 'F#4', 'B4']), new StringedTuning('Bariton', ['D3', 'G3', 'B3', 'E4'])]]])]]);
  /**
   * For Notes that have a guitar string encoded in their channel, this function
   * allows to convert them to a GuitarNote.
   *
   * @param {Note} note a Note that has the guitar string stored in its channel
   *      e.g. 0 to 5 for a six string
   * @param {StringedTuning} tuning tuning
   * @returns {GuitarNote} a GuitarNote
   */

  function guitarNoteFromNote(note, tuning) {
    const string = note.channel;
    const reversedString = tuning.stringCount - string - 1;
    const fret = note.pitch - tuning.pitches[reversedString];
    return GuitarNote.fromNote(note, string, fret);
  }
  /**
   * Returns a tuning with the specified pitches or null if none found.
   *
   * @param {number[]} pitches pitches of the tuning, same order as in
   *      Guitar.js' stringedTunings, i.e. low to high notes
   * @returns {StringedTuning|null} the found tuning or null
   */

  function getTuningFromPitches(pitches) {
    const stringCount = pitches.length;

    for (const stringCountMap of stringedTunings.values()) {
      if (stringCountMap.has(stringCount)) {
        const tunings = stringCountMap.get(stringCount);

        for (const t of tunings) {
          if (arrayShallowEquals(t.pitches, pitches)) {
            return t;
          }
        }
      }
    }

    return null;
  }
  /**
   * Returns the pitch range of a tuning, given the number of frets.
   *
   * @param {StringedTuning} tuning tuning
   * @param {number} fretCount number of frets the instrument has (default: 24)
   * @returns {number[]} [minPitch, maxPitch]
   */

  function getTuningPitchRange(tuning, fretCount = 24) {
    // const openExtent = extent(tuning.pitches);
    const openMax = tuning.pitches[tuning.stringCount - 1];
    const openMin = tuning.pitches[0];
    return [openMin, openMax + fretCount];
  }
  /**
   * Colors for guitar strings, acces via stringColor[string]
   * where string in [1, 8].
   *
   * @type {string[]}
   */

  const stringColors = ['#888', '#d122e9', '#31eb1c', '#f37c14', '#10edfc', '#ffeb09', '#ff210d', 'silver', 'gold'];
  /**
   * Returns the pitch of a note at a given fretboard position.
   *
   * @param {number} string string
   * @param {number} fret fret
   * @param {StringedTuning} tuning tuning
   * @returns {number} pitch
   */

  function getPitchFromFretboardPos(string, fret, tuning) {
    // Order is reversed, since tunings are named from bass to treble
    // but strings are numbered the other direction...
    const reversedString = tuning.stringCount - string + 1;
    const openPitch = tuning.pitches[reversedString - 1];
    return openPitch + fret;
  }
  /**
   * Returns MIDI attributes of a note at a given fretboard position, e.g. C#
   *
   * @param {number} string string
   * @param {number} fret fret
   * @param {StringedTuning} tuning tuning
   * @returns {object} note info, e.g. { pitch: 69, name: 'A', octave: 4, label: 'A4', frequency: 440.000 }
   */

  function getNoteInfoFromFretboardPos(string, fret, tuning) {
    const pitch = getPitchFromFretboardPos(string, fret, tuning);
    return getMidiNoteByNr(pitch);
  }
  /**
   * Finds all fretboard positions with this exact pitch.
   *
   * @param {number} pitch MIDI pitch
   * @param {StringedTuning} tuning tuning
   * @param {number} fretCount number of frets the instrument has
   * @returns {object[]} positions
   */

  function getFretboardPositionsFromPitch(pitch, tuning, fretCount) {
    const positions = [];
    const stringCount = tuning.stringCount;

    for (let string = 0; string < stringCount; string++) {
      const openPitch = tuning.pitches[string]; // Rule out strings where pitch is lower than open string

      if (pitch < openPitch) {
        continue;
      } // Rule out strings where pitch is higher than highest fret


      if (pitch > openPitch + fretCount) {
        continue;
      }

      positions.push({
        // Convert so string 1 is treble
        string: stringCount - string,
        fret: pitch - openPitch
      });
    }

    return positions;
  }
  /**
   * Finds all fretboard positions with this note in all octaves.
   *
   * @param {string} name note name, e.g. 'C#'
   * @param {StringedTuning} tuning tuning
   * @param {number} fretCount number of frets the instrument has
   * @returns {object[]} positions
   */

  function getFretboardPositionsFromNoteName(name, tuning, fretCount = 24) {
    const n = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    if (!n.includes(name)) {
      return null;
    }

    const positions = [];
    const lowestPitch = n.indexOf(name);
    const stringCount = tuning.stringCount;

    for (let string = 0; string < stringCount; string++) {
      // First fret where this note appears
      const openPitch = tuning.pitches[string];
      let fret = lowestPitch - openPitch % 12;

      if (fret < 0) {
        fret += 12;
      }

      while (fret <= fretCount) {
        positions.push({
          // Convert so string 1 is treble
          string: stringCount - string,
          fret
        }); // Go to next octave

        fret += 12;
      }
    }

    return positions;
  }
  /**
   * Generates example MIDI-like data (preprocessed MIDI).
   *
   * @param {number} startTime start tick
   * @param {number} count number of notes to generate
   * @param {StringedTuning} tuning tuning
   * @returns {GuitarNote[]} notes
   */

  function generateExampleData(startTime = 0, count = 50, tuning) {
    let currentTime = startTime;
    return Array.from({
      length: count
    }).map(() => {
      const start = currentTime + randFloat(0, 1);
      currentTime = start + randFloat(0, 1);
      const string = randomInt(1, 7)();
      const fret = randomInt(0, 25)();
      const pitch = getPitchFromFretboardPos(string, fret, tuning);
      const velocity = randomInt(15, 127)();
      return new GuitarNote(pitch, start, velocity, string, currentTime, string, fret);
    });
  }
  /**
   * Estimates the fretboard position from MIDI notes
   *
   * @todo does not work well yet
   * @param {Note[]} notes notes with only MIDI information
   * @param {StringedTuning} tuning tuning
   * @param {number} fretCount number of frets the instrument has
   * @returns {GuitarNote[]} GuitarNotes with fretboard positions
   */

  function fretboardPositionsFromMidi(notes, tuning, fretCount = 24) {
    if (!notes || notes.length === 0) {
      return [];
    }

    if (!tuning || !tuning.pitches) {
      console.warn('Invalid tuning parameter!');
      return [];
    } // Sort notes that cannot be played out in advance for better performance


    const [minPitch, maxPitch] = getTuningPitchRange(tuning, fretCount);
    const possibleNotes = [];
    const errorPitches = [];

    for (const note of notes) {
      if (note.pitch < minPitch || note.pitch > maxPitch) {
        errorPitches.push(note.pitch);
      } else {
        possibleNotes.push(note);
      }
    }

    const result = [];

    for (const note of possibleNotes) {
      const positions = getFretboardPositionsFromPitch(note.pitch, tuning, 24); // Choose best position
      // TODO: improve this to make it easier to play, take closest postion to prior one

      let bestPos = positions[0];

      for (const pos of positions) {
        if (pos.fret < bestPos.fret) {
          bestPos = pos;
        }
      }

      const {
        string,
        fret
      } = bestPos;
      result.push(GuitarNote.fromNote(note, string, fret));
    } // Give advice on transposing for better results


    if (errorPitches.length > 0) {
      const [minDataPitch, maxDataPitch] = extent(notes, d => d.pitch);
      let advice = '';

      if (minDataPitch < minPitch) {
        advice += `Transpose by ${minPitch - minDataPitch} semitones`;
      }

      if (maxPitch < maxDataPitch) {
        advice += `Transpose by ${maxPitch - maxDataPitch} semitones`;
      }

      console.warn(`Cannot find a fretboard position for ${errorPitches.length} pitches, try another tuning instead:\n`, errorPitches, `\nCurrent tuning's pitch range is ${minPitch} - ${maxPitch}`, `\ndata pitch range is ${minDataPitch} - ${maxDataPitch}\n`, advice);
    }

    return result;
  } // /**
  //  * @todo chords always? use 4-fret-blocks
  //  * @param {GuitarNote[]} notes notes with fretboard positions
  //  * @returns {?} fingering information
  //  */
  // export function fingeringFromFretboardPositions(notes) {
  //     // TODO: detect chords first?
  //     // TODO: then lookup chords' fingerings from a lookup table
  //     // TODO: alternatively (as fallback) use heuristics
  //     // TODO: or try to do it like humans do when playing
  //     // TODO: consider prior and following notes/chords!
  // }

  var Guitar = /*#__PURE__*/Object.freeze({
    __proto__: null,
    StringedTuning: StringedTuning,
    stringedTunings: stringedTunings,
    guitarNoteFromNote: guitarNoteFromNote,
    getTuningFromPitches: getTuningFromPitches,
    getTuningPitchRange: getTuningPitchRange,
    stringColors: stringColors,
    getPitchFromFretboardPos: getPitchFromFretboardPos,
    getNoteInfoFromFretboardPos: getNoteInfoFromFretboardPos,
    getFretboardPositionsFromPitch: getFretboardPositionsFromPitch,
    getFretboardPositionsFromNoteName: getFretboardPositionsFromNoteName,
    generateExampleData: generateExampleData,
    fretboardPositionsFromMidi: fretboardPositionsFromMidi
  });

  /**
   * Fill a string with a repeated character
   *
   * @param character
   * @param repetition
   */
  const fillStr = (s, n) => Array(Math.abs(n) + 1).join(s);

  function deprecate(original, alternative, fn) {
    return function (...args) {
      // tslint:disable-next-line
      console.warn(`${original} is deprecated. Use ${alternative}.`);
      return fn.apply(this, args);
    };
  }

  function isNamed(src) {
    return src !== null && typeof src === "object" && typeof src.name === "string" ? true : false;
  }

  function isPitch(pitch) {
    return pitch !== null && typeof pitch === "object" && typeof pitch.step === "number" && typeof pitch.alt === "number" ? true : false;
  } // The number of fifths of [C, D, E, F, G, A, B]


  const FIFTHS = [0, 2, 4, -1, 1, 3, 5]; // The number of octaves it span each step

  const STEPS_TO_OCTS = FIFTHS.map(fifths => Math.floor(fifths * 7 / 12));

  function encode(pitch) {
    const {
      step,
      alt,
      oct,
      dir = 1
    } = pitch;
    const f = FIFTHS[step] + 7 * alt;

    if (oct === undefined) {
      return [dir * f];
    }

    const o = oct - STEPS_TO_OCTS[step] - 4 * alt;
    return [dir * f, dir * o];
  } // We need to get the steps from fifths
  // Fifths for CDEFGAB are [ 0, 2, 4, -1, 1, 3, 5 ]
  // We add 1 to fifths to avoid negative numbers, so:
  // for ["F", "C", "G", "D", "A", "E", "B"] we have:


  const FIFTHS_TO_STEPS = [3, 0, 4, 1, 5, 2, 6];

  function decode(coord) {
    const [f, o, dir] = coord;
    const step = FIFTHS_TO_STEPS[unaltered(f)];
    const alt = Math.floor((f + 1) / 7);

    if (o === undefined) {
      return {
        step,
        alt,
        dir
      };
    }

    const oct = o + 4 * alt + STEPS_TO_OCTS[step];
    return {
      step,
      alt,
      oct,
      dir
    };
  } // Return the number of fifths as if it were unaltered


  function unaltered(f) {
    const i = (f + 1) % 7;
    return i < 0 ? 7 + i : i;
  }

  const NoNote = {
    empty: true,
    name: "",
    pc: "",
    acc: ""
  };
  const cache$1 = new Map();

  const stepToLetter = step => "CDEFGAB".charAt(step);

  const altToAcc = alt => alt < 0 ? fillStr("b", -alt) : fillStr("#", alt);

  const accToAlt = acc => acc[0] === "b" ? -acc.length : acc.length;
  /**
   * Given a note literal (a note name or a note object), returns the Note object
   * @example
   * note('Bb4') // => { name: "Bb4", midi: 70, chroma: 10, ... }
   */


  function note(src) {
    const cached = cache$1.get(src);

    if (cached) {
      return cached;
    }

    const value = typeof src === "string" ? parse(src) : isPitch(src) ? note(pitchName(src)) : isNamed(src) ? note(src.name) : NoNote;
    cache$1.set(src, value);
    return value;
  }

  const REGEX$1 = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
  /**
   * @private
   */

  function tokenizeNote(str) {
    const m = REGEX$1.exec(str);
    return [m[1].toUpperCase(), m[2].replace(/x/g, "##"), m[3], m[4]];
  }
  /**
   * @private
   */


  function coordToNote(noteCoord) {
    return note(decode(noteCoord));
  }

  const mod = (n, m) => (n % m + m) % m;

  const SEMI = [0, 2, 4, 5, 7, 9, 11];

  function parse(noteName) {
    const tokens = tokenizeNote(noteName);

    if (tokens[0] === "" || tokens[3] !== "") {
      return NoNote;
    }

    const letter = tokens[0];
    const acc = tokens[1];
    const octStr = tokens[2];
    const step = (letter.charCodeAt(0) + 3) % 7;
    const alt = accToAlt(acc);
    const oct = octStr.length ? +octStr : undefined;
    const coord = encode({
      step,
      alt,
      oct
    });
    const name = letter + acc + octStr;
    const pc = letter + acc;
    const chroma = (SEMI[step] + alt + 120) % 12;
    const height = oct === undefined ? mod(SEMI[step] + alt, 12) - 12 * 99 : SEMI[step] + alt + 12 * (oct + 1);
    const midi = height >= 0 && height <= 127 ? height : null;
    const freq = oct === undefined ? null : Math.pow(2, (height - 69) / 12) * 440;
    return {
      empty: false,
      acc,
      alt,
      chroma,
      coord,
      freq,
      height,
      letter,
      midi,
      name,
      oct,
      pc,
      step
    };
  }

  function pitchName(props) {
    const {
      step,
      alt,
      oct
    } = props;
    const letter = stepToLetter(step);

    if (!letter) {
      return "";
    }

    const pc = letter + altToAcc(alt);
    return oct || oct === 0 ? pc + oct : pc;
  }

  const NoInterval = {
    empty: true,
    name: "",
    acc: ""
  }; // shorthand tonal notation (with quality after number)

  const INTERVAL_TONAL_REGEX = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})"; // standard shorthand notation (with quality before number)

  const INTERVAL_SHORTHAND_REGEX = "(AA|A|P|M|m|d|dd)([-+]?\\d+)";
  const REGEX$1$1 = new RegExp("^" + INTERVAL_TONAL_REGEX + "|" + INTERVAL_SHORTHAND_REGEX + "$");
  /**
   * @private
   */

  function tokenizeInterval(str) {
    const m = REGEX$1$1.exec(`${str}`);

    if (m === null) {
      return ["", ""];
    }

    return m[1] ? [m[1], m[2]] : [m[4], m[3]];
  }

  const cache$1$1 = {};
  /**
   * Get interval properties. It returns an object with:
   *
   * - name: the interval name
   * - num: the interval number
   * - type: 'perfectable' or 'majorable'
   * - q: the interval quality (d, m, M, A)
   * - dir: interval direction (1 ascending, -1 descending)
   * - simple: the simplified number
   * - semitones: the size in semitones
   * - chroma: the interval chroma
   *
   * @param {string} interval - the interval name
   * @return {Object} the interval properties
   *
   * @example
   * import { interval } from '@tonaljs/core'
   * interval('P5').semitones // => 7
   * interval('m3').type // => 'majorable'
   */

  function interval(src) {
    return typeof src === "string" ? cache$1$1[src] || (cache$1$1[src] = parse$1(src)) : isPitch(src) ? interval(pitchName$1(src)) : isNamed(src) ? interval(src.name) : NoInterval;
  }

  const SIZES = [0, 2, 4, 5, 7, 9, 11];
  const TYPES = "PMMPPMM";

  function parse$1(str) {
    const tokens = tokenizeInterval(str);

    if (tokens[0] === "") {
      return NoInterval;
    }

    const num = +tokens[0];
    const q = tokens[1];
    const step = (Math.abs(num) - 1) % 7;
    const t = TYPES[step];

    if (t === "M" && q === "P") {
      return NoInterval;
    }

    const type = t === "M" ? "majorable" : "perfectable";
    const name = "" + num + q;
    const dir = num < 0 ? -1 : 1;
    const simple = num === 8 || num === -8 ? num : dir * (step + 1);
    const alt = qToAlt(type, q);
    const oct = Math.floor((Math.abs(num) - 1) / 7);
    const semitones = dir * (SIZES[step] + alt + 12 * oct);
    const chroma = (dir * (SIZES[step] + alt) % 12 + 12) % 12;
    const coord = encode({
      step,
      alt,
      oct,
      dir
    });
    return {
      empty: false,
      name,
      num,
      q,
      step,
      alt,
      dir,
      type,
      simple,
      semitones,
      chroma,
      coord,
      oct
    };
  }
  /**
   * @private
   */


  function coordToInterval(coord) {
    const [f, o = 0] = coord;
    const isDescending = f * 7 + o * 12 < 0;
    const ivl = isDescending ? [-f, -o, -1] : [f, o, 1];
    return interval(decode(ivl));
  }

  function qToAlt(type, q) {
    return q === "M" && type === "majorable" || q === "P" && type === "perfectable" ? 0 : q === "m" && type === "majorable" ? -1 : /^A+$/.test(q) ? q.length : /^d+$/.test(q) ? -1 * (type === "perfectable" ? q.length : q.length + 1) : 0;
  } // return the interval name of a pitch


  function pitchName$1(props) {
    const {
      step,
      alt,
      oct = 0,
      dir
    } = props;

    if (!dir) {
      return "";
    }

    const num = step + 1 + 7 * oct;
    const d = dir < 0 ? "-" : "";
    const type = TYPES[step] === "M" ? "majorable" : "perfectable";
    const name = d + num + altToQ(type, alt);
    return name;
  }

  function altToQ(type, alt) {
    if (alt === 0) {
      return type === "majorable" ? "M" : "P";
    } else if (alt === -1 && type === "majorable") {
      return "m";
    } else if (alt > 0) {
      return fillStr("A", alt);
    } else {
      return fillStr("d", type === "perfectable" ? alt : alt + 1);
    }
  }
  /**
   * Transpose a note by an interval.
   *
   * @param {string} note - the note or note name
   * @param {string} interval - the interval or interval name
   * @return {string} the transposed note name or empty string if not valid notes
   * @example
   * import { tranpose } from "@tonaljs/core"
   * transpose("d3", "3M") // => "F#3"
   * transpose("D", "3M") // => "F#"
   * ["C", "D", "E", "F", "G"].map(pc => transpose(pc, "M3)) // => ["E", "F#", "G#", "A", "B"]
   */


  function transpose$1(noteName, intervalName) {
    const note$1 = note(noteName);
    const interval$1 = interval(intervalName);

    if (note$1.empty || interval$1.empty) {
      return "";
    }

    const noteCoord = note$1.coord;
    const intervalCoord = interval$1.coord;
    const tr = noteCoord.length === 1 ? [noteCoord[0] + intervalCoord[0]] : [noteCoord[0] + intervalCoord[0], noteCoord[1] + intervalCoord[1]];
    return coordToNote(tr).name;
  }
  /**
   * Find the interval distance between two notes or coord classes.
   *
   * To find distance between coord classes, both notes must be coord classes and
   * the interval is always ascending
   *
   * @param {Note|string} from - the note or note name to calculate distance from
   * @param {Note|string} to - the note or note name to calculate distance to
   * @return {string} the interval name or empty string if not valid notes
   *
   */


  function distance(fromNote, toNote) {
    const from = note(fromNote);
    const to = note(toNote);

    if (from.empty || to.empty) {
      return "";
    }

    const fcoord = from.coord;
    const tcoord = to.coord;
    const fifths = tcoord[0] - fcoord[0];
    const octs = fcoord.length === 2 && tcoord.length === 2 ? tcoord[1] - fcoord[1] : -Math.floor(fifths * 7 / 12);
    return coordToInterval([fifths, octs]).name;
  }

  // ascending range
  /**
   * Rotates a list a number of times. It"s completly agnostic about the
   * contents of the list.
   *
   * @param {Integer} times - the number of rotations
   * @param {Array} collection
   * @return {Array} the rotated collection
   *
   * @example
   * rotate(1, [1, 2, 3]) // => [2, 3, 1]
   */


  function rotate(times, arr) {
    const len = arr.length;
    const n = (times % len + len) % len;
    return arr.slice(n, len).concat(arr.slice(0, n));
  }
  /**
   * Return a copy of the collection with the null values removed
   * @function
   * @param {Array} collection
   * @return {Array}
   *
   * @example
   * compact(["a", "b", null, "c"]) // => ["a", "b", "c"]
   */


  function compact(arr) {
    return arr.filter(n => n === 0 || n);
  }

  const EmptyPcset = {
    empty: true,
    name: "",
    setNum: 0,
    chroma: "000000000000",
    normalized: "000000000000",
    intervals: []
  }; // UTILITIES

  const setNumToChroma = num => Number(num).toString(2);

  const chromaToNumber = chroma => parseInt(chroma, 2);

  const REGEX = /^[01]{12}$/;

  function isChroma(set) {
    return REGEX.test(set);
  }

  const isPcsetNum = set => typeof set === "number" && set >= 0 && set <= 4095;

  const isPcset = set => set && isChroma(set.chroma);

  const cache = {
    [EmptyPcset.chroma]: EmptyPcset
  };
  /**
   * Get the pitch class set of a collection of notes or set number or chroma
   */

  function get$3(src) {
    const chroma = isChroma(src) ? src : isPcsetNum(src) ? setNumToChroma(src) : Array.isArray(src) ? listToChroma(src) : isPcset(src) ? src.chroma : EmptyPcset.chroma;
    return cache[chroma] = cache[chroma] || chromaToPcset(chroma);
  }

  const IVLS = ["1P", "2m", "2M", "3m", "3M", "4P", "5d", "5P", "6m", "6M", "7m", "7M"];
  /**
   * @private
   * Get the intervals of a pcset *starting from C*
   * @param {Set} set - the pitch class set
   * @return {IntervalName[]} an array of interval names or an empty array
   * if not a valid pitch class set
   */

  function chromaToIntervals(chroma) {
    const intervals = [];

    for (let i = 0; i < 12; i++) {
      // tslint:disable-next-line:curly
      if (chroma.charAt(i) === "1") intervals.push(IVLS[i]);
    }

    return intervals;
  }
  /**
   * Given a a list of notes or a pcset chroma, produce the rotations
   * of the chroma discarding the ones that starts with "0"
   *
   * This is used, for example, to get all the modes of a scale.
   *
   * @param {Array|string} set - the list of notes or pitchChr of the set
   * @param {boolean} normalize - (Optional, true by default) remove all
   * the rotations that starts with "0"
   * @return {Array<string>} an array with all the modes of the chroma
   *
   * @example
   * Pcset.modes(["C", "D", "E"]).map(Pcset.intervals)
   */


  function modes$1(set, normalize = true) {
    const pcs = get$3(set);
    const binary = pcs.chroma.split("");
    return compact(binary.map((_, i) => {
      const r = rotate(i, binary);
      return normalize && r[0] === "0" ? null : r.join("");
    }));
  }
  /**
   * Create a function that test if a collection of notes is a
   * subset of a given set
   *
   * The function is curryfied.
   *
   * @param {PcsetChroma|NoteName[]} set - the superset to test against (chroma or
   * list of notes)
   * @return{function(PcsetChroma|NoteNames[]): boolean} a function accepting a set
   * to test against (chroma or list of notes)
   * @example
   * const inCMajor = Pcset.isSubsetOf(["C", "E", "G"])
   * inCMajor(["e6", "c4"]) // => true
   * inCMajor(["e6", "c4", "d3"]) // => false
   */


  function isSubsetOf(set) {
    const s = get$3(set).setNum;
    return notes => {
      const o = get$3(notes).setNum; // tslint:disable-next-line: no-bitwise

      return s && s !== o && (o & s) === o;
    };
  }
  /**
   * Create a function that test if a collection of notes is a
   * superset of a given set (it contains all notes and at least one more)
   *
   * @param {Set} set - an array of notes or a chroma set string to test against
   * @return {(subset: Set): boolean} a function that given a set
   * returns true if is a subset of the first one
   * @example
   * const extendsCMajor = Pcset.isSupersetOf(["C", "E", "G"])
   * extendsCMajor(["e6", "a", "c4", "g2"]) // => true
   * extendsCMajor(["c6", "e4", "g3"]) // => false
   */


  function isSupersetOf(set) {
    const s = get$3(set).setNum;
    return notes => {
      const o = get$3(notes).setNum; // tslint:disable-next-line: no-bitwise

      return s && s !== o && (o | s) === o;
    };
  }

  function chromaRotations(chroma) {
    const binary = chroma.split("");
    return binary.map((_, i) => rotate(i, binary).join(""));
  }

  function chromaToPcset(chroma) {
    const setNum = chromaToNumber(chroma);
    const normalizedNum = chromaRotations(chroma).map(chromaToNumber).filter(n => n >= 2048).sort()[0];
    const normalized = setNumToChroma(normalizedNum);
    const intervals = chromaToIntervals(chroma);
    return {
      empty: false,
      name: "",
      setNum,
      chroma,
      normalized,
      intervals
    };
  }

  function listToChroma(set) {
    if (set.length === 0) {
      return EmptyPcset.chroma;
    }

    let pitch;
    const binary = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // tslint:disable-next-line:prefer-for-of

    for (let i = 0; i < set.length; i++) {
      pitch = note(set[i]); // tslint:disable-next-line: curly

      if (pitch.empty) pitch = interval(set[i]); // tslint:disable-next-line: curly

      if (!pitch.empty) binary[pitch.chroma] = 1;
    }

    return binary.join("");
  }

  /**
   * @private
   * Chord List
   * Source: https://en.wikibooks.org/wiki/Music_Theory/Complete_List_of_Chord_Patterns
   * Format: ["intervals", "full name", "abrv1 abrv2"]
   */

  const CHORDS = [// ==Major==
  ["1P 3M 5P", "major", "M ^ "], ["1P 3M 5P 7M", "major seventh", "maj7 Δ ma7 M7 Maj7 ^7"], ["1P 3M 5P 7M 9M", "major ninth", "maj9 Δ9 ^9"], ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"], ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"], ["1P 3M 5P 6M 9M", "sixth/ninth", "6/9 69 M69"], ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"], ["1P 3M 5P 7M 11A", "major seventh sharp eleventh", "maj#4 Δ#4 Δ#11 M7#11 ^7#11 maj7#11"], // ==Minor==
  // '''Normal'''
  ["1P 3m 5P", "minor", "m min -"], ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"], ["1P 3m 5P 7M", "minor/major seventh", "m/ma7 m/maj7 mM7 mMaj7 m/M7 -Δ7 mΔ -^7"], ["1P 3m 5P 6M", "minor sixth", "m6 -6"], ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"], ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"], ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"], ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"], // '''Diminished'''
  ["1P 3m 5d", "diminished", "dim ° o"], ["1P 3m 5d 7d", "diminished seventh", "dim7 °7 o7"], ["1P 3m 5d 7m", "half-diminished", "m7b5 ø -7b5 h7 h"], // ==Dominant/Seventh==
  // '''Normal'''
  ["1P 3M 5P 7m", "dominant seventh", "7 dom"], ["1P 3M 5P 7m 9M", "dominant ninth", "9"], ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"], ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"], // '''Altered'''
  ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"], ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"], ["1P 3M 7m 9m", "altered", "alt7"], // '''Suspended'''
  ["1P 4P 5P", "suspended fourth", "sus4 sus"], ["1P 2M 5P", "suspended second", "sus2"], ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"], ["1P 5P 7m 9M 11P", "eleventh", "11"], ["1P 4P 5P 7m 9m", "suspended fourth flat ninth", "b9sus phryg 7b9sus 7b9sus4"], // ==Other==
  ["1P 5P", "fifth", "5"], ["1P 3M 5A", "augmented", "aug + +5 ^#5"], ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"], ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"], ["1P 3M 5P 7M 9M 11A", "major sharp eleventh (lydian)", "maj9#11 Δ9#11 ^9#11"], // ==Legacy==
  ["1P 2M 4P 5P", "", "sus24 sus4add9"], ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"], ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"], ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"], ["1P 3M 5A 7m 9M", "", "9#5 9+"], ["1P 3M 5A 7m 9M 11A", "", "9#5#11"], ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"], ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"], ["1P 3M 5A 9A", "", "+add#9"], ["1P 3M 5A 9M", "", "M#5add9 +add9"], ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"], ["1P 3M 5P 6M 7M 9M", "", "M7add13"], ["1P 3M 5P 6M 9M 11A", "", "69#11"], ["1P 3m 5P 6M 9M", "", "m69 -69"], ["1P 3M 5P 6m 7m", "", "7b6"], ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"], ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"], ["1P 3M 5P 7M 9m", "", "M7b9"], ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"], ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"], ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"], ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"], ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"], ["1P 3M 5P 7m 9A 13M", "", "13#9"], ["1P 3M 5P 7m 9A 13m", "", "7#9b13"], ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"], ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"], ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"], ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"], ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"], ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"], ["1P 3M 5P 7m 9m 13M", "", "13b9"], ["1P 3M 5P 7m 9m 13m", "", "7b9b13"], ["1P 3M 5P 7m 9m 9A", "", "7b9#9"], ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"], ["1P 3M 5P 9m", "", "Maddb9"], ["1P 3M 5d", "", "Mb5"], ["1P 3M 5d 6M 7m 9M", "", "13b5"], ["1P 3M 5d 7M", "", "M7b5"], ["1P 3M 5d 7M 9M", "", "M9b5"], ["1P 3M 5d 7m", "", "7b5"], ["1P 3M 5d 7m 9M", "", "9b5"], ["1P 3M 7m", "", "7no5"], ["1P 3M 7m 13m", "", "7b13"], ["1P 3M 7m 9M", "", "9no5"], ["1P 3M 7m 9M 13M", "", "13no5"], ["1P 3M 7m 9M 13m", "", "9b13"], ["1P 3m 4P 5P", "", "madd4"], ["1P 3m 5P 6m 7M", "", "mMaj7b6"], ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"], ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"], ["1P 3m 5P 9M", "", "madd9"], ["1P 3m 5d 6M 7M", "", "o7M7"], ["1P 3m 5d 7M", "", "oM7"], ["1P 3m 6m 7M", "", "mb6M7"], ["1P 3m 6m 7m", "", "m7#5"], ["1P 3m 6m 7m 9M", "", "m9#5"], ["1P 3m 5A 7m 9M 11P", "", "m11A"], ["1P 3m 6m 9m", "", "mb6b9"], ["1P 2M 3m 5d 7m", "", "m9b5"], ["1P 4P 5A 7M", "", "M7#5sus4"], ["1P 4P 5A 7M 9M", "", "M9#5sus4"], ["1P 4P 5A 7m", "", "7#5sus4"], ["1P 4P 5P 7M", "", "M7sus4"], ["1P 4P 5P 7M 9M", "", "M9sus4"], ["1P 4P 5P 7m 9M", "", "9sus4 9sus"], ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"], ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"], ["1P 4P 7m 10m", "", "4 quartal"], ["1P 5P 7m 9m 11P", "", "11b9"]];
  const NoChordType = { ...EmptyPcset,
    name: "",
    quality: "Unknown",
    intervals: [],
    aliases: []
  };
  let dictionary$1 = [];
  let index$5 = {};
  /**
   * Given a chord name or chroma, return the chord properties
   * @param {string} source - chord name or pitch class set chroma
   * @example
   * import { get } from 'tonaljs/chord-type'
   * get('major') // => { name: 'major', ... }
   */

  function get$2(type) {
    return index$5[type] || NoChordType;
  }
  /**
   * Return a list of all chord types
   */


  function all$1() {
    return dictionary$1.slice();
  }
  /**
   * Add a chord to the dictionary.
   * @param intervals
   * @param aliases
   * @param [fullName]
   */


  function add$1(intervals, aliases, fullName) {
    const quality = getQuality(intervals);
    const chord = { ...get$3(intervals),
      name: fullName || "",
      quality,
      intervals,
      aliases
    };
    dictionary$1.push(chord);

    if (chord.name) {
      index$5[chord.name] = chord;
    }

    index$5[chord.setNum] = chord;
    index$5[chord.chroma] = chord;
    chord.aliases.forEach(alias => addAlias$1(chord, alias));
  }

  function addAlias$1(chord, alias) {
    index$5[alias] = chord;
  }

  function getQuality(intervals) {
    const has = interval => intervals.indexOf(interval) !== -1;

    return has("5A") ? "Augmented" : has("3M") ? "Major" : has("5d") ? "Diminished" : has("3m") ? "Minor" : "Unknown";
  }

  CHORDS.forEach(([ivls, fullName, names]) => add$1(ivls.split(" "), names.split(" "), fullName));
  dictionary$1.sort((a, b) => a.setNum - b.setNum);

  const namedSet = notes => {
    const pcToName = notes.reduce((record, n) => {
      const chroma = note(n).chroma;

      if (chroma !== undefined) {
        record[chroma] = record[chroma] || note(n).name;
      }

      return record;
    }, {});
    return chroma => pcToName[chroma];
  };

  function detect(source) {
    const notes = source.map(n => note(n).pc).filter(x => x);

    if (note.length === 0) {
      return [];
    }

    const found = findExactMatches(notes, 1);
    return found.filter(chord => chord.weight).sort((a, b) => b.weight - a.weight).map(chord => chord.name);
  }

  function findExactMatches(notes, weight) {
    const tonic = notes[0];
    const tonicChroma = note(tonic).chroma;
    const noteName = namedSet(notes); // we need to test all chormas to get the correct baseNote

    const allModes = modes$1(notes, false);
    const found = [];
    allModes.forEach((mode, index) => {
      // some chords could have the same chroma but different interval spelling
      const chordTypes = all$1().filter(chordType => chordType.chroma === mode);
      chordTypes.forEach(chordType => {
        const chordName = chordType.aliases[0];
        const baseNote = noteName(index);
        const isInversion = index !== tonicChroma;

        if (isInversion) {
          found.push({
            weight: 0.5 * weight,
            name: `${baseNote}${chordName}/${tonic}`
          });
        } else {
          found.push({
            weight: 1 * weight,
            name: `${baseNote}${chordName}`
          });
        }
      });
    });
    return found;
  }

  // Format: ["intervals", "name", "alias1", "alias2", ...]

  const SCALES = [// 5-note scales
  ["1P 2M 3M 5P 6M", "major pentatonic", "pentatonic"], ["1P 3M 4P 5P 7M", "ionian pentatonic"], ["1P 3M 4P 5P 7m", "mixolydian pentatonic", "indian"], ["1P 2M 4P 5P 6M", "ritusen"], ["1P 2M 4P 5P 7m", "egyptian"], ["1P 3M 4P 5d 7m", "neopolitan major pentatonic"], ["1P 3m 4P 5P 6m", "vietnamese 1"], ["1P 2m 3m 5P 6m", "pelog"], ["1P 2m 4P 5P 6m", "kumoijoshi"], ["1P 2M 3m 5P 6m", "hirajoshi"], ["1P 2m 4P 5d 7m", "iwato"], ["1P 2m 4P 5P 7m", "in-sen"], ["1P 3M 4A 5P 7M", "lydian pentatonic", "chinese"], ["1P 3m 4P 6m 7m", "malkos raga"], ["1P 3m 4P 5d 7m", "locrian pentatonic", "minor seven flat five pentatonic"], ["1P 3m 4P 5P 7m", "minor pentatonic", "vietnamese 2"], ["1P 3m 4P 5P 6M", "minor six pentatonic"], ["1P 2M 3m 5P 6M", "flat three pentatonic", "kumoi"], ["1P 2M 3M 5P 6m", "flat six pentatonic"], ["1P 2m 3M 5P 6M", "scriabin"], ["1P 3M 5d 6m 7m", "whole tone pentatonic"], ["1P 3M 4A 5A 7M", "lydian #5P pentatonic"], ["1P 3M 4A 5P 7m", "lydian dominant pentatonic"], ["1P 3m 4P 5P 7M", "minor #7M pentatonic"], ["1P 3m 4d 5d 7m", "super locrian pentatonic"], // 6-note scales
  ["1P 2M 3m 4P 5P 7M", "minor hexatonic"], ["1P 2A 3M 5P 5A 7M", "augmented"], ["1P 2M 3m 3M 5P 6M", "major blues"], ["1P 2M 4P 5P 6M 7m", "piongio"], ["1P 2m 3M 4A 6M 7m", "prometheus neopolitan"], ["1P 2M 3M 4A 6M 7m", "prometheus"], ["1P 2m 3M 5d 6m 7m", "mystery #1"], ["1P 2m 3M 4P 5A 6M", "six tone symmetric"], ["1P 2M 3M 4A 5A 7m", "whole tone", "messiaen's mode #1"], ["1P 2m 4P 4A 5P 7M", "messiaen's mode #5"], ["1P 3m 4P 5d 5P 7m", "minor blues", "blues"], // 7-note scales
  ["1P 2M 3M 4P 5d 6m 7m", "locrian major", "arabian"], ["1P 2m 3M 4A 5P 6m 7M", "double harmonic lydian"], ["1P 2M 3m 4P 5P 6m 7M", "harmonic minor"], ["1P 2m 3m 4d 5d 6m 7m", "altered", "super locrian", "diminished whole tone", "pomeroy"], ["1P 2M 3m 4P 5d 6m 7m", "locrian #2", "half-diminished", "aeolian b5"], ["1P 2M 3M 4P 5P 6m 7m", "mixolydian b6", "melodic minor fifth mode", "hindu"], ["1P 2M 3M 4A 5P 6M 7m", "lydian dominant", "lydian b7", "overtone"], ["1P 2M 3M 4A 5P 6M 7M", "lydian"], ["1P 2M 3M 4A 5A 6M 7M", "lydian augmented"], ["1P 2m 3m 4P 5P 6M 7m", "dorian b2", "phrygian #6", "melodic minor second mode"], ["1P 2M 3m 4P 5P 6M 7M", "melodic minor"], ["1P 2m 3m 4P 5d 6m 7m", "locrian"], ["1P 2m 3m 4d 5d 6m 7d", "ultralocrian", "superlocrian bb7", "·superlocrian diminished"], ["1P 2m 3m 4P 5d 6M 7m", "locrian 6", "locrian natural 6", "locrian sharp 6"], ["1P 2A 3M 4P 5P 5A 7M", "augmented heptatonic"], ["1P 2M 3m 5d 5P 6M 7m", "romanian minor"], ["1P 2M 3m 4A 5P 6M 7m", "dorian #4"], ["1P 2M 3m 4A 5P 6M 7M", "lydian diminished"], ["1P 2m 3m 4P 5P 6m 7m", "phrygian"], ["1P 2M 3M 4A 5A 7m 7M", "leading whole tone"], ["1P 2M 3M 4A 5P 6m 7m", "lydian minor"], ["1P 2m 3M 4P 5P 6m 7m", "phrygian dominant", "spanish", "phrygian major"], ["1P 2m 3m 4P 5P 6m 7M", "balinese"], ["1P 2m 3m 4P 5P 6M 7M", "neopolitan major"], ["1P 2M 3m 4P 5P 6m 7m", "aeolian", "minor"], ["1P 2M 3M 4P 5P 6m 7M", "harmonic major"], ["1P 2m 3M 4P 5P 6m 7M", "double harmonic major", "gypsy"], ["1P 2M 3m 4P 5P 6M 7m", "dorian"], ["1P 2M 3m 4A 5P 6m 7M", "hungarian minor"], ["1P 2A 3M 4A 5P 6M 7m", "hungarian major"], ["1P 2m 3M 4P 5d 6M 7m", "oriental"], ["1P 2m 3m 3M 4A 5P 7m", "flamenco"], ["1P 2m 3m 4A 5P 6m 7M", "todi raga"], ["1P 2M 3M 4P 5P 6M 7m", "mixolydian", "dominant"], ["1P 2m 3M 4P 5d 6m 7M", "persian"], ["1P 2M 3M 4P 5P 6M 7M", "major", "ionian"], ["1P 2m 3M 5d 6m 7m 7M", "enigmatic"], ["1P 2M 3M 4P 5A 6M 7M", "major augmented", "major #5", "ionian augmented", "ionian #5"], ["1P 2A 3M 4A 5P 6M 7M", "lydian #9"], // 8-note scales
  ["1P 2m 2M 4P 4A 5P 6m 7M", "messiaen's mode #4"], ["1P 2m 3M 4P 4A 5P 6m 7M", "purvi raga"], ["1P 2m 3m 3M 4P 5P 6m 7m", "spanish heptatonic"], ["1P 2M 3M 4P 5P 6M 7m 7M", "bebop"], ["1P 2M 3m 3M 4P 5P 6M 7m", "bebop minor"], ["1P 2M 3M 4P 5P 5A 6M 7M", "bebop major"], ["1P 2m 3m 4P 5d 5P 6m 7m", "bebop locrian"], ["1P 2M 3m 4P 5P 6m 7m 7M", "minor bebop"], ["1P 2M 3m 4P 5d 6m 6M 7M", "diminished", "whole-half diminished"], ["1P 2M 3M 4P 5d 5P 6M 7M", "ichikosucho"], ["1P 2M 3m 4P 5P 6m 6M 7M", "minor six diminished"], ["1P 2m 3m 3M 4A 5P 6M 7m", "half-whole diminished", "dominant diminished", "messiaen's mode #2"], ["1P 3m 3M 4P 5P 6M 7m 7M", "kafi raga"], ["1P 2M 3M 4P 4A 5A 6A 7M", "messiaen's mode #6"], // 9-note scales
  ["1P 2M 3m 3M 4P 5d 5P 6M 7m", "composite blues"], ["1P 2M 3m 3M 4A 5P 6m 7m 7M", "messiaen's mode #3"], // 10-note scales
  ["1P 2m 2M 3m 4P 4A 5P 6m 6M 7M", "messiaen's mode #7"], // 12-note scales
  ["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M", "chromatic"]];
  ({ ...EmptyPcset,
    intervals: [],
    aliases: []
  });
  let dictionary = [];
  let index$4 = {};
  /**
   * Return a list of all scale types
   */

  function all() {
    return dictionary.slice();
  }
  /**
   * Add a scale into dictionary
   * @param intervals
   * @param name
   * @param aliases
   */


  function add(intervals, name, aliases = []) {
    const scale = { ...get$3(intervals),
      name,
      intervals,
      aliases
    };
    dictionary.push(scale);
    index$4[scale.name] = scale;
    index$4[scale.setNum] = scale;
    index$4[scale.chroma] = scale;
    scale.aliases.forEach(alias => addAlias(scale, alias));
    return scale;
  }

  function addAlias(scale, alias) {
    index$4[alias] = scale;
  }

  SCALES.forEach(([ivls, name, ...aliases]) => add(ivls.split(" "), name, aliases));

  const NoChord = {
    empty: true,
    name: "",
    symbol: "",
    root: "",
    rootDegree: 0,
    type: "",
    tonic: null,
    setNum: NaN,
    quality: "Unknown",
    chroma: "",
    normalized: "",
    aliases: [],
    notes: [],
    intervals: []
  }; // 6, 64, 7, 9, 11 and 13 are consider part of the chord
  // (see https://github.com/danigb/tonal/issues/55)

  const NUM_TYPES = /^(6|64|7|9|11|13)$/;
  /**
   * Tokenize a chord name. It returns an array with the tonic and chord type
   * If not tonic is found, all the name is considered the chord name.
   *
   * This function does NOT check if the chord type exists or not. It only tries
   * to split the tonic and chord type.
   *
   * @function
   * @param {string} name - the chord name
   * @return {Array} an array with [tonic, type]
   * @example
   * tokenize("Cmaj7") // => [ "C", "maj7" ]
   * tokenize("C7") // => [ "C", "7" ]
   * tokenize("mMaj7") // => [ null, "mMaj7" ]
   * tokenize("Cnonsense") // => [ null, "nonsense" ]
   */

  function tokenize(name) {
    const [letter, acc, oct, type] = tokenizeNote(name);

    if (letter === "") {
      return ["", name];
    } // aug is augmented (see https://github.com/danigb/tonal/issues/55)


    if (letter === "A" && type === "ug") {
      return ["", "aug"];
    } // see: https://github.com/tonaljs/tonal/issues/70


    if (!type && (oct === "4" || oct === "5")) {
      return [letter + acc, oct];
    }

    if (NUM_TYPES.test(oct)) {
      return [letter + acc, oct + type];
    } else {
      return [letter + acc + oct, type];
    }
  }
  /**
   * Get a Chord from a chord name.
   */


  function get$1(src) {
    if (src === "") {
      return NoChord;
    }

    if (Array.isArray(src) && src.length === 2) {
      return getChord(src[1], src[0]);
    } else {
      const [tonic, type] = tokenize(src);
      const chord = getChord(type, tonic);
      return chord.empty ? getChord(src) : chord;
    }
  }
  /**
   * Get chord properties
   *
   * @param typeName - the chord type name
   * @param [tonic] - Optional tonic
   * @param [root]  - Optional root (requires a tonic)
   */


  function getChord(typeName, optionalTonic, optionalRoot) {
    const type = get$2(typeName);
    const tonic = note(optionalTonic || "");
    const root = note(optionalRoot || "");

    if (type.empty || optionalTonic && tonic.empty || optionalRoot && root.empty) {
      return NoChord;
    }

    const rootInterval = distance(tonic.pc, root.pc);
    const rootDegree = type.intervals.indexOf(rootInterval) + 1;

    if (!root.empty && !rootDegree) {
      return NoChord;
    }

    const intervals = Array.from(type.intervals);

    for (let i = 1; i < rootDegree; i++) {
      const num = intervals[0][0];
      const quality = intervals[0][1];
      const newNum = parseInt(num, 10) + 7;
      intervals.push(`${newNum}${quality}`);
      intervals.shift();
    }

    const notes = tonic.empty ? [] : intervals.map(i => transpose$1(tonic, i));
    typeName = type.aliases.indexOf(typeName) !== -1 ? typeName : type.aliases[0];
    const symbol = `${tonic.empty ? "" : tonic.pc}${typeName}${root.empty || rootDegree <= 1 ? "" : "/" + root.pc}`;
    const name = `${optionalTonic ? tonic.pc + " " : ""}${type.name}${rootDegree > 1 && optionalRoot ? " over " + root.pc : ""}`;
    return { ...type,
      name,
      symbol,
      type: type.name,
      root: root.name,
      intervals,
      rootDegree,
      tonic: tonic.name,
      notes
    };
  }

  const chord = deprecate("Chord.chord", "Chord.get", get$1);
  /**
   * Transpose a chord name
   *
   * @param {string} chordName - the chord name
   * @return {string} the transposed chord
   *
   * @example
   * transpose('Dm7', 'P4') // => 'Gm7
   */

  function transpose(chordName, interval) {
    const [tonic, type] = tokenize(chordName);

    if (!tonic) {
      return chordName;
    }

    return transpose$1(tonic, interval) + type;
  }
  /**
   * Get all scales where the given chord fits
   *
   * @example
   * chordScales('C7b9')
   * // => ["phrygian dominant", "flamenco", "spanish heptatonic", "half-whole diminished", "chromatic"]
   */


  function chordScales(name) {
    const s = get$1(name);
    const isChordIncluded = isSupersetOf(s.chroma);
    return all().filter(scale => isChordIncluded(scale.chroma)).map(scale => scale.name);
  }
  /**
   * Get all chords names that are a superset of the given one
   * (has the same notes and at least one more)
   *
   * @function
   * @example
   * extended("CMaj7")
   * // => [ 'Cmaj#4', 'Cmaj7#9#11', 'Cmaj9', 'CM7add13', 'Cmaj13', 'Cmaj9#11', 'CM13#11', 'CM7b9' ]
   */


  function extended(chordName) {
    const s = get$1(chordName);
    const isSuperset = isSupersetOf(s.chroma);
    return all$1().filter(chord => isSuperset(chord.chroma)).map(chord => s.tonic + chord.aliases[0]);
  }
  /**
   * Find all chords names that are a subset of the given one
   * (has less notes but all from the given chord)
   *
   * @example
   */


  function reduced(chordName) {
    const s = get$1(chordName);
    const isSubset = isSubsetOf(s.chroma);
    return all$1().filter(chord => isSubset(chord.chroma)).map(chord => s.tonic + chord.aliases[0]);
  }

  var index$3 = {
    getChord,
    get: get$1,
    detect,
    chordScales,
    extended,
    reduced,
    tokenize,
    transpose,
    // deprecate
    chord
  };

  Object.freeze([]);

  const MODES = [[0, 2773, 0, "ionian", "", "Maj7", "major"], [1, 2902, 2, "dorian", "m", "m7"], [2, 3418, 4, "phrygian", "m", "m7"], [3, 2741, -1, "lydian", "", "Maj7"], [4, 2774, 1, "mixolydian", "", "7"], [5, 2906, 3, "aeolian", "m", "m7", "minor"], [6, 3434, 5, "locrian", "dim", "m7b5"]];
  const NoMode = { ...EmptyPcset,
    name: "",
    alt: 0,
    modeNum: NaN,
    triad: "",
    seventh: "",
    aliases: []
  };
  const modes = MODES.map(toMode);
  const index$2 = {};
  modes.forEach(mode => {
    index$2[mode.name] = mode;
    mode.aliases.forEach(alias => {
      index$2[alias] = mode;
    });
  });
  /**
   * Get a Mode by it's name
   *
   * @example
   * get('dorian')
   * // =>
   * // {
   * //   intervals: [ '1P', '2M', '3m', '4P', '5P', '6M', '7m' ],
   * //   modeNum: 1,
   * //   chroma: '101101010110',
   * //   normalized: '101101010110',
   * //   name: 'dorian',
   * //   setNum: 2902,
   * //   alt: 2,
   * //   triad: 'm',
   * //   seventh: 'm7',
   * //   aliases: []
   * // }
   */

  function get(name) {
    return typeof name === "string" ? index$2[name.toLowerCase()] || NoMode : name && name.name ? get(name.name) : NoMode;
  }

  function toMode(mode) {
    const [modeNum, setNum, alt, name, triad, seventh, alias] = mode;
    const aliases = alias ? [alias] : [];
    const chroma = Number(setNum).toString(2);
    const intervals = chromaToIntervals(chroma);
    return {
      empty: false,
      intervals,
      modeNum,
      chroma,
      normalized: chroma,
      name,
      setNum,
      alt,
      triad,
      seventh,
      aliases
    };
  }

  function chords(chords) {
    return (modeName, tonic) => {
      const mode = get(modeName);
      if (mode.empty) return [];
      const triads = rotate(mode.modeNum, chords);
      const tonics = mode.intervals.map(i => transpose$1(tonic, i));
      return triads.map((triad, i) => tonics[i] + triad);
    };
  }

  chords(MODES.map(x => x[4]));
  chords(MODES.map(x => x[5]));

  /* eslint-disable-line no-unused-vars */

  /**
   * @module Chords
   */

  /**
   * Detects chords as those notes that have the exact same start time, only works
   * for ground truth (since recordings are not exact)
   * Does only work if groundtruth is aligned! TuxGuitar produces unaligned MIDI.
   *
   * @param {Note[]} notes notes
   * @returns {Note[][]} array of chord arrays
   */

  function detectChordsByExactStart(notes) {
    const grouped = group(notes, d => d.start);
    const chords = [...grouped].map(d => d[1]) // Sort chords by time
    .sort((a, b) => a[0].start - b[0].start) // Sort notes in each chord by pitch
    .map(chord => chord.sort((a, b) => a.pitch - b.pitch));
    return chords;
  }
  /**
   * Detects chords, by simply looking for notes that overlap each other in time.
   * Example:
   *    =======
   *       =========
   *         ========
   * Important: Notes must be sorted by start time for this to work correctly.
   *
   * @todo not used yet
   * @todo optional minimum overlap ratio
   * @todo new definition of chord? i.e. notes have to start 'together'
   * @param {Note[]} notes array of Note objects
   * @param {boolean} sortByPitch sort chords by pitch? (otherwise sorted
   *      by note start time)
   * @returns {Note[][]} array of chord arrays
   */

  function detectChordsByOverlap(notes, sortByPitch = true) {
    if (!notes || notes.length === 0) {
      return [];
    }

    if (notes.length === 1) {
      return [[notes[0]]];
    }

    const sorted = [...notes].sort((a, b) => {
      a.start !== b.start ? a.start - b.start : a.pitch - b.pitch;
    });
    const notesTodo = new Set(sorted);
    const chords = []; // Find all overlaps with brute force

    while (notesTodo.size > 0) {
      // Take a new note and make a new chord
      const note1 = notesTodo.values().next().value;
      notesTodo.delete(note1);
      let chord = [note1]; // Add all notes that overap note1

      for (const note2 of notesTodo.values()) {
        if (note1.overlapInSeconds(note2) >= 0.5 * note1.getDuration()) {
          chord.push(note2);
          notesTodo.delete(note2);
        }
      }

      if (sortByPitch) {
        chord = chord.sort((a, b) => a.pitch - b.pitch);
      }

      chords.push(chord);
    }

    return chords;
  } // export function detectChordsByOverlap(notes, sortByPitch = true) {
  //     if (!notes || !notes.length) { return []; }
  //     if (notes.length === 1) { return [[notes[0]]]; }
  //     const chords = [];
  //     let currentChord = [notes[0]];
  //     for (let i = 1; i < notes.length; i++) {
  //         const note = notes[i];
  //         console.log(i);
  //         console.log(currentChord);
  //         console.log(note);
  //         // Check for overlap with current chord
  //         let overlaps = false;
  //         for (let note2 of currentChord) {
  //             if (note.overlapsInTime(note2)) {
  //                 overlaps = true;
  //                 break;
  //             }
  //         }
  //         console.log(overlaps);
  //         if (overlaps) {
  //             currentChord.push(note);
  //             // TODO: also check the distance from the first note of the chord!
  //             // TODO:jump ahead to not count the cord multiple times (partially)
  //         } else {
  //             // If not, the previous chord is finished
  //             // Sort chord by pitch?
  //             if (sortByPitch) {
  //                 currentChord = currentChord.sort((a, b) => a.pitch - b.pitch);
  //             }
  //             chords.push(currentChord);
  //             // Start new chord
  //             if (i < notes.length - 1) {
  //                 currentChord = [notes[i + 1]];
  //                 i++;
  //             }
  //         }
  //     }
  //     // finish last chord
  //     chords.push(currentChord);
  //     return chords;
  // }

  /*
   * Maps number of steps (number of notes -1) to possible chord types
   */

  const chordTypes = new Map([[1, [// TODO: how to handle inversions?
  {
    steps: [5],
    name: 'Inverted power chord',
    suffix: '?'
  }, {
    steps: [7],
    name: 'Power chord',
    suffix: '5'
  }]], [2, [{
    steps: [2, 7],
    name: 'Suspended second',
    suffix: 'sus2'
  }, {
    steps: [3, 6],
    name: 'Diminished',
    suffix: 'dim'
  }, {
    steps: [3, 7],
    name: 'Minor',
    suffix: 'min'
  }, {
    steps: [4, 10],
    name: 'Seventh',
    suffix: '7'
  }, {
    steps: [4, 7],
    name: 'Major',
    suffix: ''
  }, {
    steps: [4, 8],
    name: 'Augmented',
    suffix: 'aug'
  }, {
    steps: [4, 9],
    name: 'Sixth',
    suffix: '6'
  }, {
    steps: [5, 7],
    name: 'Suspended fourth',
    suffix: 'sus4'
  }]], [3, [{
    steps: [2, 3, 7],
    name: 'Minor, added ninth',
    suffix: 'm(add9)'
  }, {
    steps: [2, 4, 7],
    name: 'Added ninth',
    suffix: 'add9'
  }, {
    steps: [3, 6, 10],
    name: 'Minor seventh, flat fifth',
    suffix: 'm7b5'
  }, {
    steps: [3, 7, 10],
    name: 'Minor seventh',
    suffix: 'm7'
  }, {
    steps: [3, 7, 11],
    name: 'Minor, major seventh',
    suffix: 'm(Maj7)'
  }, {
    steps: [3, 7, 8],
    name: 'Minor, flat sixth',
    suffix: 'mb6'
  }, {
    steps: [3, 7, 9],
    name: 'Minor sixth',
    suffix: 'm6'
  }, {
    steps: [4, 5, 11],
    name: 'Major eleventh (no fifth, no ninth)',
    suffix: 'Maj11'
  }, {
    steps: [4, 5, 7],
    name: 'Added fourth',
    suffix: 'add4'
  }, {
    steps: [4, 7, 10],
    name: 'Dominant seventh',
    suffix: '7'
  }, {
    steps: [4, 7, 11],
    name: 'Major seventh',
    suffix: 'Maj7'
  }, {
    steps: [4, 7, 9],
    name: 'Major Sixth',
    suffix: 'Maj6'
  }]], [4, [{
    steps: [2, 3, 6, 10],
    name: 'Minor ninth flat fifth',
    suffix: 'm9b5'
  }, {
    steps: [2, 3, 7, 10],
    name: 'Minor ninth',
    suffix: 'm9'
  }, {
    steps: [2, 3, 7, 11],
    name: 'Minor ninth, major seventh',
    suffix: 'm9(Maj7)'
  }, {
    steps: [2, 3, 7, 9],
    name: 'Minor sixth, added ninth',
    suffix: 'm6/9'
  }, {
    steps: [2, 4, 7, 11],
    name: 'Major ninth',
    suffix: 'Maj9'
  }, {
    steps: [2, 4, 7, 9],
    name: 'Sixth, added ninth',
    suffix: '6/9'
  }, {
    steps: [4, 5, 7, 11],
    name: 'Major eleventh (no ninth)',
    suffix: 'Maj11'
  }, {
    steps: [4, 6, 7, 10],
    name: 'Seventh, sharp eleventh',
    suffix: '7#11'
  }, {
    steps: [4, 6, 7, 11],
    name: 'Major seventh, sharp eleventh',
    suffix: 'Maj7#11'
  }]], [5, [{
    steps: [2, 4, 5, 7, 11],
    name: 'Major eleventh',
    suffix: 'Maj11'
  }, {
    steps: [2, 4, 7, 9, 11],
    name: 'Major thirteen',
    suffix: 'Maj13'
  }]], [6, [{
    steps: [2, 3, 4, 6, 7, 10],
    name: 'Minor thirteen',
    suffix: 'm13'
  }]]]);
  /**
   * Returns chord type, e.g. 'Major', 'Diminished', ...
   * Important: Notes must be sorted by pitch ascending
   *
   * @todo some chords might be multiple types
   * @param {Note[]} notes notes (sorted by pitch asc.)
   * @returns {string} chord type
   */

  function getChordType(notes) {
    if (!notes || notes.length === 0) {
      return {
        name: 'No note'
      };
    }

    if (notes.length === 1) {
      return {
        name: 'Single note'
      };
    } // Get distances in semitones


    let steps = [];
    const lowest = notes[0].pitch;

    for (let index = 1; index < notes.length; index++) {
      steps.push(notes[index].pitch - lowest);
    } // Normalize higher than octave


    steps = steps.map(d => d % 12); // Filter doubles

    steps = [...new Set(steps)]; // Filter octaves

    steps = steps.filter(d => d !== 0);

    if (steps.length === 0) {
      return {
        name: 'Octave'
      };
    }

    steps.sort((a, b) => a - b); // Now get the chord type

    const candidates = chordTypes.get(steps.length);

    if (candidates) {
      for (const cand of candidates) {
        if (arrayShallowEquals(steps, cand.steps)) {
          return cand;
        }
      }
    }

    return {
      name: 'Unknown chord type'
    };
  }
  /**
   * https://github.com/tonaljs/tonal/tree/master/packages/chord
   * Detected chords can be used with https://github.com/tonaljs/tonal/tree/master/packages/chord-type
   *
   * @param {Note[]} notes notes
   * @returns {string[]} possible chord types
   */

  function getChordName(notes) {
    const noteLetters = notes.sort((a, b) => a.pitch - b.pitch).map(d => d.getLetter());
    const chords = index$3.detect(noteLetters);
    return chords;
  } // /**
  //  * Estimates the name of a given chord of notes
  //  *
  //  * @param {string} chord name
  //  * @return {Note[]} notes array of Note objects
  //  * @todo use tonaljs
  //  * @todo use this https://github.com/greird/chordictionaryjs
  //  */
  // export function getNotesFromChordName(name, length = 1, start = 0) {
  //     console.error('NIY');
  // }

  var Chords = /*#__PURE__*/Object.freeze({
    __proto__: null,
    detectChordsByExactStart: detectChordsByExactStart,
    detectChordsByOverlap: detectChordsByOverlap,
    getChordType: getChordType,
    getChordName: getChordName
  });

  /**
   * @module utils/MiscUtils
   */

  /**
   * Converts beats per minute to seconds per beat
   *
   * @deprecated use MusicUtils.bpmToSecondsPerBeat instead
   * @param {number} bpm tempo in beats per minute
   * @returns {number} seconds per beat
   */

  function bpmToSecondsPerBeat(bpm) {
    return 1 / (bpm / 60);
  }
  /**
   * Clones a map where the values are flat objects,
   * i.e. values do not contain objects themselfes.
   *
   * @param {Map} map a map with object values
   * @returns {Map} a copy of the map with copies of the value objects
   */

  function deepCloneFlatObjectMap(map) {
    const result = new Map();

    for (const [key, value] of map.entries()) {
      result.set(key, { ...value
      });
    }

    return result;
  }
  /**
   * Groups the Notes from multiple tracks
   *
   * @param {Note[][]} tracks array of arrays of Note objects
   * @returns {Map} grouping
   */

  function groupNotesByPitch(tracks) {
    const allNotes = tracks.flat();

    if (allNotes.length === 0) {
      return new Map();
    }

    return group(allNotes, d => d.pitch);
  }
  /**
   * Reverses a given string.
   *
   * @param {string} s string
   * @returns {string} reversed string
   */

  function reverseString(s) {
    return s.split('').reverse().join('');
  }
  /**
   * Given some notes and a target note, finds
   * the note that has its start time closest to
   * the one of targetNote
   *
   * @todo replace by d3 argmin or sth?
   * @param {Note[]} notes notes
   * @param {Note} targetNote target note
   * @returns {Note} closest note to targetNote
   */

  function findNearest(notes, targetNote) {
    if (!notes || notes.length === 0 || !targetNote) {
      return null;
    }

    let nearest = null;
    let dist = Number.POSITIVE_INFINITY;
    const targetStart = targetNote.start;

    for (const n of notes) {
      const newDist = Math.abs(n.start - targetStart);

      if (newDist < dist) {
        dist = newDist;
        nearest = n;
      }
    }

    return nearest;
  }
  /**
   * Allows to wait for a number of seconds with async/await
   * IMPORTANT: This it not exact, it will at *least* wait for X seconds
   *
   * @param {number} seconds number of seconds to wait
   * @returns {Promise} empty Promise that will resolve after the specified amount
   *      of seconds
   */

  function delay(seconds) {
    return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
    });
  }

  /**
   * @module instruments/Lamellophone
   */

  /**
   * Represents Lamellophone tunings
   */

  class LamellophoneTuning {
    /**
     * Represents a tuning of lamellophone.
     *
     * @param {string} name name
     * @param {string[]} notes array of notes, same order as on instrument
     *      e.g. [..., 'D4','C4', 'F#4', ...]
     */
    constructor(name, notes) {
      this.name = name;
      this.notes = notes;
      this.short = notes.join(' ');
      this.pitches = notes.map(note => getMidiNoteByLabel(note).pitch);
      this.pitchesSorted = [...this.pitches].sort((a, b) => a - b);
      this.keyCount = notes.length;
    }
    /**
     * Returns an array of the tuning's notes as number representation:
     * Tuning notes:  C4, D4, ... C5, D5, ... C6,  D6
     * Number format: 1,  2,  ... 1°, 2°, ... 1°°, 2°°
     *
     * @returns {string[]} array with tuning notes in number representation
     */


    getNumbers() {
      const pitches = this.pitchesSorted;
      const numbers = new Map();

      for (const [index, pitch] of pitches.entries()) {
        let number = index + 1;
        let ending = '';
        let lowerOctave = pitch - 12;

        while (lowerOctave > 0 && numbers.has(lowerOctave)) {
          number = numbers.get(lowerOctave).number;
          ending += '°';
          lowerOctave -= 12;
        }

        numbers.set(pitch, {
          number,
          numberString: `${number}${ending}`
        });
      }

      return [...numbers.values()].map(d => d.numberString);
    }
    /**
     * Returns an array of the tuning's notes as letter representation:
     * Tuning notes:  C4, D4, ... C5, D5, ... C6,  D6
     * Number format: C,  D,  ... C°, D°, ... C°°, D°°
     *
     * @returns {string[]} array with tuning notes in letter representation
     */


    getLetters() {
      const pitches = this.pitchesSorted;
      const numbers = new Map();

      for (const [index, pitch] of pitches.entries()) {
        let number = index + 1;
        let ending = '';
        let lowerOctave = pitch - 12;

        while (lowerOctave > 0 && numbers.has(lowerOctave)) {
          number = numbers.get(lowerOctave).number;
          ending += '°';
          lowerOctave -= 12;
        }

        const letter = getMidiNoteByNr(pitch).name;
        numbers.set(pitch, {
          number,
          letterString: `${letter}${ending}`
        });
      }

      return [...numbers.values()].map(d => d.letterString);
    }

  }
  /**
   * Tunings.
   * Notes are in the same order as on the instrument
   *
   * @type {Map<string,Map<string,LamellophoneTuning>>}
   */

  const lamellophoneTunings = new Map([['Kalimba', new Map([['9 A Major', new LamellophoneTuning('9 A Major', ['A5', 'C#6', 'C#5', 'A5', 'A4', 'F#5', 'E5', 'E6', 'B5'])], ['9 A Minor', new LamellophoneTuning('9 A Minor', ['A5', 'C6', 'C5', 'A5', 'A4', 'F5', 'E5', 'E6', 'B5'])], ['9 A Minor 7', new LamellophoneTuning('9 A Minor 7', ['A5', 'C6', 'C5', 'A5', 'A4', 'F#5', 'E5', 'E6', 'B5'])], ['9 A Ake Bono', new LamellophoneTuning('9 A Ake Bono', ['A5', 'D6', 'D5', 'A5', 'A4', 'F5', 'E5', 'E6', 'A#5'])], ['9 A Hijaz', new LamellophoneTuning('9 A Hijaz', ['G5', 'D6', 'D5', 'A5', 'A4', 'F#5', 'D#5', 'D#6', 'A#5'])], ['9 A Pygmy', new LamellophoneTuning('9 A Pygmy', ['G5', 'C6', 'C5', 'G5', 'G4', 'D#5', 'D5', 'D#6', 'A#5'])], ['17 C Major', new LamellophoneTuning('17 C Major', ['D6', 'B5', 'G5', 'E5', 'C5', 'A4', 'F4', 'D4', 'C4', 'E4', 'G4', 'B4', 'D5', 'F5', 'A5', 'C6', 'E6'])], ['21 C Major', new LamellophoneTuning('21 C Major', ['D6', 'B5', 'G5', 'E5', 'C5', 'A4', 'F4', 'D4', 'B3', 'G3', 'F3', 'A3', 'C4', 'E4', 'G4', 'B4', 'D5', 'F5', 'A5', 'C6', 'E6'])]])]]);
  /**
   * Parses a tab into notes
   *
   * @param {string} tab in letter format
   * @param {LamellophoneTuning} tuning tuning
   * @param {number} tempo tempo in bpm
   * @returns {Note[]} notes
   */

  function convertTabToNotes(tab, tuning, tempo = 120) {
    if (!tab || tab.length === 0) {
      return [];
    } // Create a mapping symbol->pitch


    const symbolToPitchMap = new Map();
    const symbols = tuning.getLetters();

    for (let index = 0; index < tuning.keyCount; index++) {
      symbolToPitchMap.set(symbols[index], tuning.pitchesSorted[index]);
    } // Parse tab to notes


    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const noteNamesSet = new Set(noteNames);
    const lowestNote = tuning.pitchesSorted[0];
    const startOct = getMidiNoteByNr(lowestNote).octave;
    const secondsPerBeat = bpmToSecondsPerBeat(tempo);
    let insideChord = false;
    let insideNote = false;
    let currentTime = 0;
    let currentPitch = 0;
    let currentOctOffset = 0;
    const notes = [];
    tab = `${tab.toUpperCase().replaceAll('\n', ' \n')} `; // This is needed more often

    const finishNote = () => {
      try {
        notes.push(Note$2.from({
          pitch: currentPitch + 12 * (startOct + 1 + currentOctOffset),
          start: currentTime,
          end: currentTime + secondsPerBeat
        }));
        currentOctOffset = 0;

        if (!insideChord) {
          currentTime += secondsPerBeat;
        }
      } catch {
        console.log(currentPitch);
      }

      insideNote = false;
    };

    for (const char of tab) {
      if (char === '(') {
        // Start chord (but finish current if any)
        if (insideChord) {
          insideChord = false;
        }

        if (insideNote) {
          finishNote();
        }

        insideChord = true;
      } else if (noteNamesSet.has(char)) {
        // Start note (but finish current if any)
        if (insideNote) {
          finishNote();
        }

        insideNote = true;
        currentPitch = noteNames.indexOf(char);
      } else if (char === '#') {
        // Sharpen note
        currentPitch++;
      } else if (char === '°') {
        // Increase ocatve
        currentOctOffset++;
      } else if (char === ' ' || char === '\n' || char === ')') {
        // End chord and note if inside
        if (char === ')') {
          insideChord = false;
        }

        if (char === '\n') {
          insideChord = false;
          currentTime += secondsPerBeat;
        }

        if (insideNote) {
          finishNote();
        }
      }
    }

    return notes;
  }
  /**
   * Converts an array of notes into a text tab
   *
   * @param {Note[]} notes notes
   * @param {LamellophoneTuning} tuning tuning
   * @param {'letter'|'number'} mode mode
   * @param {number} restSize number of seconds for a gap between chords to insert
   *     a line break
   * @returns {string} text tab
   */

  function convertNotesToTab(notes, tuning, mode = 'letter', restSize = 0.1) {
    if (!notes || notes.length === 0) {
      return [];
    } // Create a mapping pitch->symbol


    const pitchToSymbolMap = new Map();
    const symbols = mode === 'letter' ? tuning.getLetters() : tuning.getNumbers();

    for (let index = 0; index < tuning.keyCount; index++) {
      pitchToSymbolMap.set(tuning.pitchesSorted[index], symbols[index]);
    } // Get chords


    const chords = detectChordsByExactStart(notes); // Create tab

    let tab = '';
    let previousEnd = 0;

    for (const chord of chords) {
      // Format chord's notes
      let chordString = chord.map(note => {
        if (pitchToSymbolMap.has(note.pitch)) {
          return pitchToSymbolMap.get(note.pitch) || `[${note.pitch}]`;
        } else {
          var _getMidiNoteByNr$name, _getMidiNoteByNr;

          return mode === 'letter' ? (_getMidiNoteByNr$name = (_getMidiNoteByNr = getMidiNoteByNr(note.pitch)) === null || _getMidiNoteByNr === void 0 ? void 0 : _getMidiNoteByNr.name) !== null && _getMidiNoteByNr$name !== void 0 ? _getMidiNoteByNr$name : note.pitch : note.pitch;
        }
      }).join(' ');

      if (chord.length > 1) {
        // Mark chords with backets (for multiple notes)
        chordString = `(${chordString})`;
      }

      tab = chord[0].start - previousEnd > restSize ? `${tab}\n${chordString}` : `${tab} ${chordString}`; // Update last end time of chord

      previousEnd = max(chord, n => n.end);
    } // Remove leading space


    return tab.slice(1);
  }
  /**
   * Converts an array of notes into an HTML tab with colored notes
   *
   * @param {Note[]} notes notes
   * @param {LamellophoneTuning} tuning tuning
   * @param {'letter'|'number'} mode mode
   * @param {number} restSize number of seconds for a gap between chords to insert
   *     a line break
   * @param {Function} colormap color map function: pitch to color
   * @returns {string} HTML tab
   */

  function convertNotesToHtmlTab(notes, tuning, mode = 'letter', restSize = 0.1, colormap = () => 'black') {
    if (!notes || notes.length === 0) {
      return [];
    } // Create a mapping pitch->symbol


    const pitchToSymbolMap = new Map();
    const symbols = mode === 'letter' ? tuning.getLetters() : tuning.getNumbers();

    for (let index = 0; index < tuning.keyCount; index++) {
      pitchToSymbolMap.set(tuning.pitches[index], symbols[index]);
    } // Get chords


    const chords = detectChordsByExactStart(notes); // Create tab

    let tab = '';
    let previousEnd = 0;

    for (const chord of chords) {
      // Format chord's notes
      let chordString = chord.map(note => {
        let string;

        if (pitchToSymbolMap.has(note.pitch)) {
          string = pitchToSymbolMap.get(note.pitch) || `[${note.pitch}]`;
        } else {
          var _getMidiNoteByNr$name2, _getMidiNoteByNr2;

          string = mode === 'letter' ? (_getMidiNoteByNr$name2 = (_getMidiNoteByNr2 = getMidiNoteByNr(note.pitch)) === null || _getMidiNoteByNr2 === void 0 ? void 0 : _getMidiNoteByNr2.name) !== null && _getMidiNoteByNr$name2 !== void 0 ? _getMidiNoteByNr$name2 : note.pitch : note.pitch;
        }

        const color = colormap(note.pitch);
        return `<span class='note' style='background-color: ${color}'>${string}</span>`;
      }).join('\n');

      if (chord.length > 1) {
        // Mark chords with backets (for multiple notes)
        chordString = `<span class='chord'>${chordString}</span>`;
      }

      tab = chord[0].start - previousEnd > restSize ? `${tab}<br/>${chordString}` : `${tab}${chordString}`; // Update last end time of chord

      previousEnd = max(chord, n => n.end);
    }

    return tab;
  }
  /**
   * Converts a number-based tab to note letter format
   *
   * @param {string} numberTab tab text with number format
   * @param {Map<number, string>} numberLetterMap maps numbers to letters
   * @returns {string} tab in letter format
   */

  function convertNumbersToLetters(numberTab, numberLetterMap) {
    if (!numberTab || numberTab.length === 0) {
      return '';
    } // Normalize to °


    numberTab = numberTab.replaceAll('\'', '°');
    numberTab = numberTab.replaceAll('’', '°');
    numberTab = numberTab.replaceAll('*', '°');
    numberTab = numberTab.replaceAll('º', '°');
    numberTab = numberTab.replaceAll('^', '°');

    for (const [key, value] of numberLetterMap.entries()) {
      numberTab = numberTab.replaceAll(key, value);
    }

    return numberTab;
  }
  /**
   * Tries to find a transposition s.t. the tuning is able to play all notes.
   * If not not possible, return the transposition that requires the least keys to
   * be retuned.
   *
   * @todo tests fail
   * @param {Note[]} notes notes
   * @param {LamellophoneTuning} tuning tuning
   * @returns {object} {transpose: number, retune: Map}
   */

  function bestTransposition(notes, tuning) {
    if (!notes || notes.length === 0) {
      return {
        transpose: 0,
        retune: new Map()
      };
    }

    const occuringPitches = new Set(notes.map(n => n.pitch));

    if (occuringPitches.size > tuning.keyCount) ;

    const notePitches = [...occuringPitches]; // Already perfect? return now

    if (difference(notePitches, tuning.pitches).size === 0) {
      return {
        transpose: 0,
        retune: new Map()
      };
    }

    const [minPitch, maxPitch] = extent(notePitches); // eslint-disable-next-line unicorn/consistent-function-scoping

    const transpose = (array, steps) => array.map(d => d + steps); // Just brute force through all transpositions


    let bestSteps = 0;
    let bestTransposed;

    for (let steps = -minPitch; steps <= 127 - maxPitch; steps++) {
      const transposed = transpose(notePitches, steps);
      intersection(transposed, tuning.pitches);

      {
        bestSteps = steps;
        bestTransposed = transposed;
      }
    }

    bestTransposed = new Set(bestTransposed); // Get pitches in tuning but not in notes and other way round

    const uncommon = difference(bestTransposed, tuning.pitches);
    console.log(uncommon);
    const freePitches = new Set();
    const neededPitches = [];

    for (const p of uncommon) {
      if (bestTransposed.has(p)) {
        neededPitches.push(p);
      } else {
        freePitches.add(p);
      }
    }

    console.log(neededPitches);
    console.log(freePitches);

    if (neededPitches.length === 0) {
      // Everything is fine!
      return {
        transpose: bestSteps,
        retune: new Map()
      };
    }

    if (freePitches.size === 0) {
      // Cannot solve this!
      return {
        transpose: bestSteps,
        retune: new Map()
      };
    } // Get closest free pitch for each needed one


    const retune = new Map();

    for (const neededPitch of neededPitches) {
      let bestMatch = null;
      const bestDiff = Number.POSITIVE_INFINITY;
      let freePitch;

      for (freePitch of freePitches) {
        const diff = Math.abs(neededPitch - freePitch);

        if (diff < bestDiff) {
          bestMatch = freePitch;
        }
      }

      freePitches.delete(bestMatch);
      retune.set(freePitch, neededPitch);
    }

    return {
      transpose: bestSteps,
      retune
    };
  }

  var Lamellophone = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LamellophoneTuning: LamellophoneTuning,
    lamellophoneTunings: lamellophoneTunings,
    convertTabToNotes: convertTabToNotes,
    convertNotesToTab: convertNotesToTab,
    convertNotesToHtmlTab: convertNotesToHtmlTab,
    convertNumbersToLetters: convertNumbersToLetters,
    bestTransposition: bestTransposition
  });

  /**
   * @module instruments/Piano
   */

  /**
   * Map:keyCount->pitchRange
   * pitchRange is {minPitch:number, maxPitch:number}
   *
   * @type {Map<number,object>}
   */
  const pianoPitchRange = new Map([[72, {
    minPitch: 24,
    maxPitch: 95
  }], [88, {
    minPitch: 21,
    maxPitch: 108
  }], [128, {
    minPitch: 0,
    maxPitch: 127
  }]]);
  /**
   *
   * @param {Note[]} notes notes with only MIDI information
   * @returns {?} notes with fingering information
   */
  // export function fingeringFromMidi(notes) {
  // TODO: detect chords first?
  // TODO: then lookup chords' fingerings from a lookup table
  // TODO: alternatively (as fallback) use heuristics
  // TODO: or try to do it like humans do when playing
  // }

  var Piano = /*#__PURE__*/Object.freeze({
    __proto__: null,
    pianoPitchRange: pianoPitchRange
  });

  /**
   * @module utils/BlobUtils
   */

  /**
   * Converts a Blob to a base64 string
   *
   * @param {Blob} blob Blob
   * @returns {Promise<string,undefined>} base64 string
   */
  function blobToBase64(blob) {
    return new Promise(resolve => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result);

      reader.readAsDataURL(blob);
    });
  }
  /**
   * Extracts the file extension from a Blob, so it can be saved as a file with
   * an appropriate extension.
   *
   * @param {Blob} blob Blob
   * @returns {string} file extension
   */

  function blobToFileExtension(blob) {
    return blob.type.split('/')[1].split(';')[0];
  }

  /**
   * @module utils/FormattingUtils
   */

  /**
   * Formats a time in seconds to <minutes>:<seconds>.<milliseconds>
   *
   * @param {number|null} seconds in seconds
   * @param {boolean} includeMillis include milli seconds in string?
   * @returns {string} 0-padded time string <minutes>:<seconds>.<milliseconds>
   */
  function formatTime(seconds, includeMillis = true) {
    if (seconds === undefined || seconds === null) {
      return includeMillis ? '--:--.---' : '--:--';
    }

    const s = Math.floor(seconds);
    let min = Math.floor(s / 60).toString();
    let sec = (s % 60).toString();
    min = min.length < 2 ? `0${min}` : min;
    sec = sec.length < 2 ? `0${sec}` : sec;

    if (!includeMillis) {
      return `${min}:${sec}`;
    }

    let ms = Math.round((seconds - s) * 1000).toString();

    if (ms.length < 2) {
      ms = `00${ms}`;
    } else if (ms.length < 3) {
      ms = `0${ms}`;
    }

    return `${min}:${sec}.${ms}`;
  }
  /**
   * Formats a Date to a string with format
   *      YYYY-mm-DDTHH:MM:SS
   * or when replaceT == true
   *      YYYY-mm-DD HH:MM:SS
   *
   * @param {Date} date date
   * @param {boolean} replaceT replace the 'T'?
   * @param {boolean} keepMillis keep milliseconds?
   * @returns {string} formatted date
   */

  function formatDate(date, replaceT = false, keepMillis = true) {
    let string = date.toISOString().split(':').join('-');

    if (!keepMillis) {
      string = string.slice(0, string.indexOf('.'));
    }

    if (replaceT) {
      string = string.replace('T', ' ');
    }

    return string;
  }
  /**
   * Formats the song title (e.g. remove file extension and shorten)
   *
   * @param {string} title song title
   * @param {number} maxLength shorten to this length
   * @returns {string} formatted song title
   */

  function formatSongTitle(title, maxLength = 30) {
    if (!title) {
      return '[No Song]';
    } // Remove file extension


    if (title.lastIndexOf('.') !== -1) {
      title = title.slice(0, title.lastIndexOf('.'));
    } // Shorten


    if (title.length > maxLength) {
      title = `${title.slice(0, maxLength - 3)}...`;
    }

    return title;
  }

  /**
   * @module utils/LocalStorageUtils
   */

  /**
   * Stringifies an object and stores it in the localStorage
   *
   * @param {string} key key
   * @param {object} object JSON compatible object
   */
  function storeObjectInLocalStorage(key, object) {
    const string = JSON.stringify(object);
    localStorage.setItem(key, string);
  }
  /**
   * Retrieves a stringified object from the localStorage and parses it.
   *
   * @param {string} key key
   * @returns {object|null} object or null of not possible
   */

  function getObjectFromLocalStorage(key) {
    const string = localStorage.getItem(key);

    if (string === null) {
      // console.warn(`LocalStorage has no key ${key}`);
      return null;
    }

    try {
      return JSON.parse(string);
    } catch {
      return null;
    }
  }

  /**
   * @module utils/NoteColorUtils
   */
  // TODO: move to colors/ folder?

  /**
   * Maps each note to a color
   * Colors from https://www.svpwiki.com/music+note+or+sound+colors
   * Order is C, C#, ... B
   *
   * @type {string[]}
   */

  const noteColormap = ['#ff0000', '#ff4e00', '#db7b00', '#ffcc00', '#e4ed00', '#81d700', '#00ffb4', '#00ffea', '#00baff', '#3c00ff', '#a800ff', '#ff00fd'].map(d => {
    // Make colors less saturated
    const c = hsl(d);
    c.s = 0.5;
    return c.toString();
  });
  /**
   * Colorblind save colors from
   * Malandrino et al. - Visualization and Music Harmony: Design, Implementation,
   * and Evaluation https://ieeexplore.ieee.org/abstract/document/8564210
   * Order is C, C#, ... B
   *
   * @type {string[]}
   */
  // export const noteColormapAccessible = new Map([
  //     ['C', '#9aebff'],
  //     ['C#', '#add5ff'],
  //     ['D', '#d6d6ff'],
  //     ['D#', '#ebd5ff'],
  //     ['E', '#ffc2eb'],
  //     ['F', '#ffcbcc'],
  //     ['F#', '#ffd5c2'],
  //     ['G', '#ffebc2'],
  //     ['G#', '#ebffc2'],
  //     ['A', '#c2d599'],
  //     ['A#', '#99ebbe'],
  //     ['B', '#adebeb'],
  // ]);

  const noteColormapAccessible = ['#6699ff', '#66ffff', '#000000', '#647878', '#993366', '#ff0000', '#ffcc99', '#ffff01', '#ff9900', '#009900', '#66ff99', '#0000cc'];
  const colorInterpolator = interpolateRgb('black', 'steelblue');
  /**
   * Gradient color map from black to steelblue
   *
   * @type {string[]}
   */

  const noteColormapGradientArray = Array.from({
    length: 12
  }).map((d, index) => colorInterpolator(index / 11));
  /**
   * Returns the note color depending on the given pitch.
   * (Simplifies note color lookup by looking up the color for pitch%12.)
   *
   * @param {number} pitch MIDI pitch in [0, 127]
   * @param {string} colormap one of 'default', 'accessible', 'gradient'
   * @returns {string} color code
   */

  function noteColorFromPitch(pitch, colormap = 'default') {
    switch (colormap) {
      case 'accessible':
        return noteColormapAccessible[pitch % 12];

      case 'gradient':
        return noteColormapGradientArray[pitch % 12];

      default:
        return noteColormap[pitch % 12];
    }
  }

  /**
   * @module utils/StatisticsUtils
   */

  /**
   * Calculates a 95% confidence interval
   *
   * @see https://www.alchemer.com/resources/blog/how-to-calculate-confidence-intervals/
   * @param {numnber[]} values values
   * @returns {object} {mean, low, high}
   */

  function confidenceInterval(values) {
    const n = values.length;
    const m = mean(values);
    const s = deviation(values);
    const z = 1.96; // 95% CI
    // const z = 2.576; // 99% CI

    const part = z * (s / Math.sqrt(n));
    const low = m - part;
    const high = m + part;
    return {
      mean: m,
      low,
      high
    };
  }
  /**
   * Given an array of Note objects, returns the numbers
   * that are drawn in a box plot (of the Note.start property)
   *
   * @param {number[]} values values
   * @returns {object} { q1, q2, q3, r0, r1 }
   */

  function getBoxplotCharacteristics(values) {
    values.sort((a, b) => a - b);
    const minValue = values[0];
    const maxValue = values[values.length - 1];
    const q1 = quantile(values, 0.25);
    const q2 = quantile(values, 0.5);
    const q3 = quantile(values, 0.75);
    const iqr = q3 - q1;
    const r0 = Math.max(minValue, q1 - iqr * 1.5);
    const r1 = Math.min(maxValue, q3 + iqr * 1.5);
    return {
      q1,
      q2,
      q3,
      r0,
      r1
    };
  }
  /**
   * Returns a kernel desity estimator function.
   *
   * @see https://www.d3-graph-gallery.com/graph/violin_basicDens.html
   * @example
   * // With x being a d3.scaleLinear() scale
   * const kde = kernelDensityEstimator(kernelEpanechnikov(0.2), x.ticks(50));
   * const estimate = kde(data);
   * @param {Function} kernel kernel function
   * @param {number[]} X domain
   * @returns {Function} kernel density estimator
   */

  function kernelDensityEstimator(kernel, X) {
    /**
     * Kernel desity estimator
     * For each value of X it computes the estimated density of the data values
     * in V. The result has the form [ [x1, est1], [x2, est2], ... ]
     *
     * @param {number[]} V values
     * @returns {number[][]} estimates for points of X
     */
    const estimator = V => {
      return X.map(x => [x, mean(V, v => kernel(x - v))]);
    };

    return estimator;
  }
  /**
   * Epanechnikov kernel
   *
   * @param {number} k kernel size
   * @returns {Function} kernel function with curried k
   */

  function kernelEpanechnikov(k) {
    /**
     * Epanechnokov kernel function
     *
     * @param {number} v value
     * @returns {number} result
     */
    const epKernel = v => Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;

    return epKernel;
  }
  /**
   * Gauss kernel
   *
   * @param {number} k kernel size
   * @returns {Function} kernel function with curried k
   */

  function kernelGauss(k) {
    /**
     * Gaussian kernel function
     *
     * @param {number} v value
     * @returns {number} result
     */
    const gaKernel = v => Math.abs(v / k) <= 1 ? 1 / Math.sqrt(2 * Math.PI) * Math.E ** (-1 / 2 * v * v) : 0;

    return gaKernel;
  }

  /* eslint-disable-line no-unused-vars */

  /**
   * @module utils/RecordingsUtils
   */

  /**
   * Filters notes of a recording to remove noise from the MIDI device or pickup
   *
   * @todo detect gaps and fill them
   * @param {Recording} recording a recording
   * @param {number} velocityThreshold notes with velocity < velocityThreshold
   *      are removed
   * @param {number} durationThreshold notes with duration < velocityThreshold
   *      are removed (value in seconds)
   * @returns {Recording} clone of the recording with filtered notes
   */

  function filterRecordingNoise(recording, velocityThreshold = 0, durationThreshold = 0) {
    const result = recording.clone().filter(note => {
      if (note.velocity < velocityThreshold) {
        return false;
      }

      if (note.getDuration() < durationThreshold) {
        return false;
      }

      return true;
    }); // console.log(`Filtered recording, ${result.length()} of ${recording.length()} notes left`);

    return result;
  }
  /**
   * Removes notes from a recordings which are outside the range of the ground
   * truth and therefore likely noise.
   * Looks up the pitch range from the track of the GT that the recording was made
   * for.
   *
   * @param {Recording[]} recordings recordings
   * @param {Note[][]} groundTruth ground truth
   * @returns {Recording[]} filtered recordings
   */

  function clipRecordingsPitchesToGtRange(recordings, groundTruth) {
    // Speed up by getting range only once for all tracks
    const pitchRanges = new Map();

    for (const [index, part] of groundTruth.entries()) {
      const pitchExtent = extent(part, d => d.pitch);
      pitchRanges.set(index, pitchExtent);
    }

    return recordings.map(recording => {
      const track = recording.selectedTrack;
      const [minPitch, maxPitch] = pitchRanges.get(track);
      return recording.clone().filter(note => note.pitch >= minPitch && note.pitch <= maxPitch);
    });
  }
  /**
   * Removes notes from a recordings which are outside the fretboard range of the
   * ground truth and therefore likely noise.
   * Looks up the fretboard position range from the track of the GT that the
   * recording was made for.
   *
   * @param {Recording[]} recordings recordings
   * @param {Note[][]} groundTruth ground truth
   * @param {'exact'|'area'} [mode=exact] mode for which fretboard positions to
   *      include: exact will only keep notes that have positions that occur in
   *      the GT, area will get a rectangular area of the fretboard that contains
   *      all GT positions and fill filter on that.
   * @returns {Recording[]} filtered recordings
   */

  function clipRecordingsPitchesToGtFretboardRange(recordings, groundTruth, mode = 'exact') {
    if (mode === 'exact') {
      // Speed up by getting range only once for all tracks
      const occuringPositions = new Map();

      for (const [index, part] of groundTruth.entries()) {
        const positions = new Set(part.map(note => `${note.string} ${note.fret}`));
        occuringPositions.set(index, positions);
      }

      return recordings.map(recording => {
        const track = recording.selectedTrack;
        const validPositions = occuringPositions.get(track);
        return recording.clone().filter(note => validPositions.has(`${note.string} ${note.fret}`));
      });
    } else {
      // Speed up by getting range only once for all tracks
      const positionRanges = new Map();

      for (const [index, part] of groundTruth.entries()) {
        const stringExtent = extent(part, d => d.string);
        const fretExtent = extent(part, d => d.fret);
        positionRanges.set(index, {
          stringExtent,
          fretExtent
        });
      }

      return recordings.map(recording => {
        const track = recording.selectedTrack;
        const {
          stringExtent,
          fretExtent
        } = positionRanges.get(track);
        const [minString, maxString] = stringExtent;
        const [minFret, maxFret] = fretExtent;
        return recording.clone().filter(note => {
          return note.string >= minString && note.string <= maxString && note.fret >= minFret && note.fret <= maxFret;
        });
      });
    }
  }
  /**
   * Aligns notes to a rhythmic pattern
   *
   * @todo not used
   * @param {Note[]} notes notes
   * @param {number} bpm e.g. 120 for tempo 120
   * @param {number} timeDivision e.g. 16 for 16th note steps
   * @returns {Note[]} aligned notes
   */

  function alignNotesToBpm(notes, bpm, timeDivision = 16) {
    const secondsPerBeat = bpmToSecondsPerBeat$1(bpm);
    const secondsPerDivision = secondsPerBeat / timeDivision;
    return notes.map(note => {
      const n = note.clone();
      n.start = Math.round(n.start / secondsPerDivision) * secondsPerDivision;
      n.end = Math.round(n.end / secondsPerDivision) * secondsPerDivision;
      return n;
    });
  }
  /**
   * Calculates a heatmap either pitch- or channel-wise.
   * Pitch-time heatmap:
   * Calculates a heatmap of multiple recordings, to see the note density in the
   * pitch-time-space.
   * Channel-time heatmap:
   * Calculates a heatmap of multiple recordings, to see the note density in the
   * channel-time-space. Channel could be a guitar string or left and right hand
   * for example.
   *
   * @param {Note[]} recNotes recordings
   * @param {number} nRecs number of recordings
   * @param {number} binSize time bin size in milliseconds
   * @param {string} attribute 'pitch' | 'channel'
   * @returns {Map} pitch->heatmap; heatmap is number[] for all time slices
   */

  function recordingsHeatmap(recNotes, nRecs, binSize = 10, attribute = 'pitch') {
    let groupedByAttribute;

    if (attribute === 'pitch') {
      groupedByAttribute = group(recNotes, d => d.pitch);
    } else if (attribute === 'channel') {
      groupedByAttribute = group(recNotes, d => d.channel);
    } else {
      console.warn(`Invalid attribute parameter '${attribute}'`);
    }

    const heatmapByAttribute = new Map();

    for (const [attribute_, notes] of groupedByAttribute.entries()) {
      // Calculate heatmap
      const maxTime = max(notes, d => d.end);
      const nBins = Math.ceil(maxTime * 1000 / binSize) + 1;
      const heatmap = Array.from({
        length: nBins
      }).fill(0);

      for (const note of notes) {
        const start = Math.round(note.start * 1000 / binSize);
        const end = Math.round(note.end * 1000 / binSize);

        for (let bin = start; bin <= end; bin++) {
          heatmap[bin] += 1;
        }
      } // Normalize


      for (let bin = 0; bin < heatmap.length; bin++) {
        heatmap[bin] /= nRecs;
      }

      heatmapByAttribute.set(attribute_, heatmap);
    }

    return heatmapByAttribute;
  }
  /**
   * 'Averages' multiple recordings of the same piece to get an approximation of
   * the ground truth.
   *
   * @todo use velocity?
   * @param {Map} heatmapByPitch haetmap from recordingsHeatmap()
   * @param {number} binSize size of time bins in milliseconds
   * @param {number} threshold note is regarded as true when this ratio of
   *      recordings has a note there
   * @returns {Note[]} approximated ground truth notes
   */

  function averageRecordings(heatmapByPitch, binSize, threshold = 0.8) {
    const newNotes = [];

    for (const [pitch, heatmap] of heatmapByPitch.entries()) {
      // Threshold to get note timespans -> array with booleans (is note here?)
      // TODO: use Canny Edge Detector? Fill Gaps?
      for (let bin = 0; bin < heatmap.length; bin++) {
        heatmap[bin] = heatmap[bin] > threshold;
      } // Extract notes


      let currentNote = null;

      for (let bin = 0; bin < heatmap.length; bin++) {
        // Detect note start
        if (!currentNote && heatmap[bin]) {
          const time = bin * binSize / 1000;
          currentNote = new Note$2(pitch, time, 127, 0);
        } // Detect note end or end of array


        if (currentNote && (!heatmap[bin] || bin === heatmap.length - 1)) {
          const time = bin * binSize / 1000;
          currentNote.end = time;
          newNotes.push(currentNote);
          currentNote = null;
        }
      }
    } // Sort new notes


    newNotes.sort((a, b) => a.start - b.start);
    return newNotes;
  }
  /**
   * Extracts a probable ground truth from multiple recordings. Uses one KDE for
   * each note starts and ends, detects maxima in the KDE and thresholds them.
   * Then uses alternating start end end candidates to create notes.
   *
   * @param {Note[]} recNotes recordings notes
   * @param {number} bandwidth kernel bandwidth
   * @param {number} ticksPerSecond number of ticks per second
   * @param {number} threshold threshold
   * @returns {Note[]} new notes
   */

  function averageRecordings2(recNotes, bandwidth = 0.01, ticksPerSecond, threshold) {
    const groupedByPitch = group(recNotes, d => d.pitch);
    const newNotes = [];

    for (const [pitch, notes] of groupedByPitch.entries()) {
      const starts = notes.map(d => d.start);
      const ends = notes.map(d => d.end); // Create KDE

      const duration = max(ends);
      const ticks = Math.ceil(ticksPerSecond * duration);
      const x = linear().domain([0, duration]).range([0, duration]);
      const kde = kernelDensityEstimator(kernelEpanechnikov(bandwidth), x.ticks(ticks));
      const estimateStarts = kde(starts);
      const estimateEnds = kde(ends); // Search for density maxima

      const maximaStarts = findLocalMaxima(estimateStarts.map(d => d[1]));
      const maximaEnds = findLocalMaxima(estimateEnds.map(d => d[1])); // If density value > threshold, update note state

      const chosenStarts = maximaStarts.filter(d => estimateStarts[d][1] > threshold).map(d => estimateStarts[d][0]);
      const chosenEnds = maximaEnds.filter(d => estimateEnds[d][1] > threshold).map(d => estimateEnds[d][0]); // Create notes

      while (chosenStarts.length > 0) {
        const nextStart = chosenStarts.shift(); // Remove ends before nextStart

        while (chosenEnds.length > 0 && chosenEnds[0] < nextStart) {
          chosenEnds.shift();
        }

        const nextEnd = chosenEnds.shift(); // Remove starts before nextEnd

        while (chosenStarts.length > 0 && chosenStarts[0] < nextEnd) {
          chosenStarts.shift();
        }

        newNotes.push(new Note$2(pitch, nextStart, 127, 0, nextEnd));
      }
    } // Sort new notes


    newNotes.sort((a, b) => a.start - b.start);
    return newNotes;
  }
  /**
   * Returns a Map: pitch->differenceMap, differenceMap is an Array with time bins
   * and each bin is either
   *      0 (none, neither GT nor rec have a note here)
   *      1 (missing, only GT has a note here)
   *      2 (additional, only rec has a note here)
   *      3 (both, both have a note here)
   *
   * @todo move to comparison
   * @param {Note[]} gtNotes ground truth notes
   * @param {Note[]} recNotes recrodings notes
   * @param {number} binSize size of a time bin in milliseconds
   * @returns {Map} pitch->differenceMap; differenceMap is number[] for all time slices
   * @example
   *      const diffMap = differenceMap(gtNotes, recNotes, 10);
   */

  function differenceMap(gtNotes, recNotes, binSize) {
    const recHeatmap = recordingsHeatmap(recNotes, 1, binSize);
    const gtHeatmap = recordingsHeatmap(gtNotes, 1, binSize);
    const allPitches = [...new Set([...recHeatmap.keys(), ...gtHeatmap.keys()])];
    const resultMap = new Map();

    for (const pitch of allPitches) {
      let result; // Handle pitches that occur only in one of both

      if (!recHeatmap.has(pitch)) {
        // All notes are missing
        result = gtHeatmap.get(pitch).map(d => d !== 0 ? 1 : 0);
      } else if (!gtHeatmap.has(pitch)) {
        // All notes are additional
        result = recHeatmap.get(pitch).map(d => d !== 0 ? 2 : 0);
      } else {
        // Compare both bins for each time slice
        const recH = recHeatmap.get(pitch);
        const gtH = gtHeatmap.get(pitch);
        const nBins = Math.max(recH.length, gtH.length);
        result = Array.from({
          length: nBins
        }).fill(0);

        for (let index = 0; index < result.length; index++) {
          const gtValue = gtH[index] || 0;
          const recValue = recH[index] || 0;

          if (gtValue === 0 && recValue === 0) {
            // None
            result[index] = 0;
          }

          if (gtValue !== 0 && recValue === 0) {
            // Missing
            result[index] = 1;
          }

          if (gtValue === 0 && recValue !== 0) {
            // Additional
            result[index] = 2;
          }

          if (gtValue !== 0 && recValue !== 0) {
            // Both
            result[index] = 3;
          }
        }
      }

      resultMap.set(pitch, result);
    }

    return resultMap;
  }
  /**
   * Computes the 'area' of error from a differenceMap normalized by total area.
   * The area is simply the number of bins with each value, total area is max.
   * number of bins in all pitches * the number of pitches.
   *
   * @todo move to comparison
   * @todo not used or tested yet
   * @todo add threshold for small errors (i.e. ignore area left and right of notes' start and end (masking?)))
   * @param {Map} differenceMap differenceMap from differenceMap()
   * @returns {object} {missing, additional, correct} area ratios
   * @example
   *      const diffMap = differenceMap(gtNotes, recNotes, 10);
   *      const diffMapErrors = differenceMapErrorAreas(diffMap);
   *      const {missing, additional, correct} = diffMapErrors;
   */

  function differenceMapErrorAreas(differenceMap) {
    // Count bins for each error type
    let missingBins = 0;
    let additionalBins = 0;
    let correctBins = 0;

    for (const diffMap of differenceMap.values()) {
      for (const bin of diffMap) {
        if (bin === 1) {
          missingBins++;
        } else if (bin === 2) {
          additionalBins++;
        } else if (bin === 3) {
          correctBins++;
        }
      }
    } // Normalize


    const maxLength = max([...differenceMap], d => d[1].length);
    const totalArea = differenceMap.size * maxLength;
    return {
      missing: missingBins / totalArea,
      additional: additionalBins / totalArea,
      correct: correctBins / totalArea
    };
  }

  /**
   * @module utils/WebMidiUtils
   */

  /**
   * Allows to ping a MIDI device that loops back to measure latency.
   * The tool loopMIDI does exactly this:
   *
   * @see https://www.tobias-erichsen.de/software/loopmidi.html.
   * @example pingMidiDevice('loopMIDI Port', 10);
   * @param {string} deviceName name of the MIDI device
   * @param {number} howOften how many times to ping the device
   */
  function pingMidiDevice(deviceName, howOften = 1) {
    if (!navigator.requestMIDIAccess) {
      console.error('MIDI: WebMIDI is not supported in this browser.');
    } else {
      let sentCount = 0;
      let sentTime;
      let totalTime = 0; // Start listening for incoming data

      const receiveFunction = () => {
        const ping = Date.now() - sentTime;
        totalTime += ping;
        const avg = totalTime / sentCount;
        console.log(`Received MIDI from ${deviceName} after ${ping} ms (avg: ${avg})`);
      };

      navigator.requestMIDIAccess().then(midiAccess => {
        for (const input of midiAccess.inputs.values()) {
          if (deviceName === input.name) {
            input.onmidimessage = receiveFunction;
          }
        } // Get output device


        let outputDevice = null;

        for (const output of midiAccess.outputs.values()) {
          if (deviceName === output.name) {
            outputDevice = output;
          }
        }

        if (!outputDevice) {
          console.error(`Cannot ping output device ${deviceName} because it is not there`);
        } // Send data once a second


        const pingFunction = () => {
          if (sentCount < howOften) {
            sentCount++;
            console.log(`Ping ${sentCount}/${howOften} Sending MIDI ping to ${deviceName}`);
            sentTime = new Date();
            outputDevice.send([0x90, 0x45, 0x7F]);
            setTimeout(pingFunction, 1000);
          }
        };

        setTimeout(pingFunction, 1000);
      }, () => console.error('Cannot get MIDI access'));
    }
  }

  /**
   * @module utils
   */

  var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    arrayShallowEquals: arrayShallowEquals,
    jaccardIndex: jaccardIndex,
    removeDuplicates: removeDuplicates,
    arrayContainsArray: arrayContainsArray,
    arrayHasSameElements: arrayHasSameElements,
    getMatrixMax: getMatrixMax,
    formatMatrix: formatMatrix,
    binarySearch: binarySearch,
    blobToBase64: blobToBase64,
    blobToFileExtension: blobToFileExtension,
    formatDate: formatDate,
    formatTime: formatTime,
    formatSongTitle: formatSongTitle,
    storeObjectInLocalStorage: storeObjectInLocalStorage,
    getObjectFromLocalStorage: getObjectFromLocalStorage,
    randFloat: randFloat,
    choose: choose,
    clipValue: clipValue,
    swapSoSmallerFirst: swapSoSmallerFirst,
    findLocalMaxima: findLocalMaxima,
    deepCloneFlatObjectMap: deepCloneFlatObjectMap,
    groupNotesByPitch: groupNotesByPitch,
    reverseString: reverseString,
    findNearest: findNearest,
    delay: delay,
    bpmToSecondsPerBeat: bpmToSecondsPerBeat$1,
    freqToApproxMidiNr: freqToApproxMidiNr,
    chordToInteger: chordToInteger,
    chordIntegerJaccardIndex: chordIntegerJaccardIndex,
    noteDurationToNoteType: noteDurationToNoteType,
    metronomeTrackFromTempoAndMeter: metronomeTrackFromTempoAndMeter,
    metronomeTrackFromMusicPiece: metronomeTrackFromMusicPiece,
    noteColorFromPitch: noteColorFromPitch,
    filterRecordingNoise: filterRecordingNoise,
    clipRecordingsPitchesToGtRange: clipRecordingsPitchesToGtRange,
    clipRecordingsPitchesToGtFretboardRange: clipRecordingsPitchesToGtFretboardRange,
    recordingsHeatmap: recordingsHeatmap,
    averageRecordings: averageRecordings,
    averageRecordings2: averageRecordings2,
    differenceMap: differenceMap,
    differenceMapErrorAreas: differenceMapErrorAreas,
    alignNotesToBpm: alignNotesToBpm,
    confidenceInterval: confidenceInterval,
    getBoxplotCharacteristics: getBoxplotCharacteristics,
    kernelDensityEstimator: kernelDensityEstimator,
    kernelEpanechnikov: kernelEpanechnikov,
    kernelGauss: kernelGauss,
    pingMidiDevice: pingMidiDevice
  });

  /* eslint-disable-line no-unused-vars */

  /**
   * @module comparison/Matching
   */

  /**
   * For one recording, separately for each pitch,
   * matches each recorded note to its closest ground truth note.
   * If there are multiple matches, the best (smallest time difference)
   * will be kept and others will be regarded as additional notes.
   * Ground truth notes without match will be regarded as missing notes.
   *
   * Result format (separated by pitch in a Map):
   * Map:pitch->{
   *    gtRecMap           matched rec. note for each GT note Map:gtNoteStart->recNote,
   *    additionalNotes:   rec. notes without matched GT note
   *    missingNotes:      GT notes without matched rec. note
   *    gtNotes:           all GT notes
   * }
   *
   * @todo add max distance?
   * @param {Note[]} recNotes recorded notes of a single recording
   * @param {Note[]} gtNotes ground truth notes
   * @returns {Map} result
   */

  function matchGtAndRecordingNotes(recNotes, gtNotes) {
    const groupedByPitch = group(gtNotes, d => d.pitch);
    const groupedByPitchRec = group(recNotes, d => d.pitch);
    const result = new Map(); // For each pitch, map recorded notes to GT notes

    for (const [pitch, gtNotes] of groupedByPitch.entries()) {
      const gtRecMap = new Map();
      const additionalNotes = [];
      const missingNotes = [];

      for (const n of gtNotes) {
        gtRecMap.set(n.start, null);
      } // Recording might be missing this pitch, then all notes are missing


      if (!groupedByPitchRec.has(pitch)) {
        result.set(pitch, {
          gtRecMap: new Map(),
          additionalNotes: [],
          missingNotes: gtNotes,
          gtNotes: gtNotes
        });
        continue;
      }

      const recNotes = groupedByPitchRec.get(pitch);

      for (const r of recNotes) {
        // Match each recorded note to the closest ground truth note
        const nearest = findNearest(gtNotes, r);
        const currentEntry = gtRecMap.get(nearest.start);

        if (currentEntry === null) {
          // If empty, take
          gtRecMap.set(nearest.start, r);
        } else {
          // If it is taken, overtake it if the new match is closer
          if (Math.abs(nearest.start - r.start) < Math.abs(currentEntry.start - r.start)) {
            // If it can overtake, add the old note to 'wrong additional notes' list
            gtRecMap.set(nearest.start, r);
            additionalNotes.push(currentEntry);
          } else {
            // If it cannot overtake, add note to 'wrong additional notes' list
            additionalNotes.push(r);
          }
        }
      } // Go trough all GT notes, those that have no recording assigned to it are missing notes


      for (const n of gtNotes) {
        if (gtRecMap.get(n.start) === null) {
          missingNotes.push(n);
        }
      } // Store result in map pitch->groupings


      result.set(pitch, {
        gtRecMap,
        additionalNotes,
        missingNotes,
        gtNotes: gtNotes
      });
    } // If a recording has a pitch that GT has not, all those notes are additional notes


    for (const [pitch, recNotes] of groupedByPitchRec.entries()) {
      if (!groupedByPitch.has(pitch)) {
        result.set(pitch, {
          gtRecMap: new Map(),
          additionalNotes: recNotes,
          missingNotes: [],
          gtNotes: []
        });
      }
    } // console.log(result);


    return result;
  }
  /**
   * Matches all recorded notes from multiple recordings to the nearest
   * ground truth (GT) note.
   * Contrary to the matching created by matchGtAndRecordingNotes()
   * missing and additional notes are not considered, so multiple notes
   * from a single recording can be matched to the same GT note.
   *
   * Result format:
   * Map:pitch->Map:gtStart->arrayOfMatchedRecNotes
   *
   * @param {Recording[]} recordings recordings
   * @param {Note[]} gtNotes ground truth notes
   * @returns {Map} matching
   */

  function matchGtAndMultipleRecordings(recordings, gtNotes) {
    const allRecNotes = recordings.flatMap(d => d.notes);
    const groupedByPitch = group(gtNotes, d => d.pitch);
    const groupedByPitchRec = group(allRecNotes, d => d.pitch);
    const result = new Map(); // For each pitch, map recorded notes to GT notes and keep track of misses

    for (const [pitch, gtNotes] of groupedByPitch.entries()) {
      const gtRecMap = new Map();

      for (const n of gtNotes) {
        gtRecMap.set(n.start, []);
      } // Recording might be missing this pitch, then match is empty


      if (!groupedByPitchRec.has(pitch)) {
        result.set(pitch, new Map());
        continue;
      }

      const recNotes = groupedByPitchRec.get(pitch);

      for (const r of recNotes) {
        // Match each recorded note to the closest ground truth note
        const nearest = findNearest(gtNotes, r);
        const currentEntry = gtRecMap.get(nearest.start);
        currentEntry.push(r);
        gtRecMap.set(nearest.start, currentEntry);
      } // Store result in map pitch->groupings


      result.set(pitch, gtRecMap);
    } // console.log(result);


    return result;
  }
  /**
   * Calculates (for each pitch) the average error for each GT note (averaged
   * over all matched notes in the recordings),
   * as well as the maximum of all those average errors.
   * GT notes that have no matched recorded notes will have an error of 0.
   *
   * @param {Map} multiMatching matching with a GT and multiple recordings
   * @param {number} errorThreshold number seconds of deviation above which
   *      to exclude an error
   * @returns {Map} error summary Map:pitch->{gtErrorMap, maxError},
   *      gtErrorMap is Map:gtStart->error (error is average over all time
   *      differences between the GT note and matched recNotes)
   */

  function getMultiMatchingErrorPerNote(multiMatching, errorThreshold = 3) {
    const result = new Map();

    for (const [pitch, gtRecMap] of multiMatching.entries()) {
      const gtErrorMap = new Map();
      let maxError = 0; // Go through all gtStart and matched notes

      for (const [gtStart, matchedRecNotes] of gtRecMap.entries()) {
        let error = 0;

        if (matchedRecNotes.length > 0) {
          for (const note of matchedRecNotes) {
            const error_ = Math.abs(note.start - gtStart);

            if (error_ <= errorThreshold) {
              error += error_;
            }
          }

          error /= matchedRecNotes.length;

          if (error > maxError) {
            maxError = error;
          }
        }

        gtErrorMap.set(gtStart, error);
      }

      result.set(pitch, {
        gtErrorMap,
        maxError
      });
    }

    return result;
  }
  /**
   * Calculates the error of a matching by applying penalties and summing up
   *
   * @param {Map} matching a matching created by matchGtAndRecordingNotes
   * @param {number} addPenalty penalty for each additonal note
   * @param {number} missPenalty penalty for each missing note
   * @param {number} timingPenalty penalty for note timing differences in seconds
   * @param {number} timeThreshold timing errors below it (absolute) are ignored
   * @returns {object} errors by category
   */

  function getMatchingError(matching, addPenalty, missPenalty, timingPenalty, timeThreshold = 0) {
    const result = {
      total: 0,
      totalAdd: 0,
      totalMiss: 0,
      totalCorrect: 0,
      totalTime: 0,
      totalNumberOfGtNotes: 0,
      perPitch: new Map()
    };

    for (const [pitch, m] of matching.entries()) {
      const {
        gtRecMap,
        additionalNotes,
        missingNotes,
        gtNotes
      } = m;
      const addError = additionalNotes.length * addPenalty;
      const missError = missingNotes.length * missPenalty;
      let correct = 0;
      let timeError = 0;

      for (const [gtStart, matchedRecNote] of gtRecMap.entries()) {
        // If it is null, this is handled in missingNotes
        if (matchedRecNote !== null) {
          correct++;
          const error = Math.abs(matchedRecNote.start - gtStart);

          if (error > timeThreshold) {
            timeError += error;
          }
        }
      }

      const total = addError + missError + timeError * timingPenalty;
      result.perPitch.set(pitch, {
        total,
        addError,
        missError,
        correct,
        timeError,
        numberOfGtNotes: gtNotes.length
      }); // Update total

      result.totalAdd += addError;
      result.totalMiss += missError;
      result.totalCorrect += correct;
      result.totalTime += timeError;
      result.total += total;
      result.totalNumberOfGtNotes += gtNotes.length;
    }

    return result;
  }
  /**
   * Cuts a section from a matching by filtering on the start times
   * of ground truth, missing, and additonal notes
   *
   * @param {Map} matching matching
   * @param {number} start start time (inclusive)
   * @param {number} end end time (exclusive)
   * @returns {Map} section of matching
   */

  function getMatchingSection(matching, start, end) {
    const result = new Map();

    for (const [pitch, m] of matching.entries()) {
      const {
        gtRecMap,
        additionalNotes,
        missingNotes,
        gtNotes
      } = m;
      const newGtRecMap = new Map();

      for (const [gtStart, matchedRecNote] of gtRecMap.entries()) {
        // If it is null, this is handled in missingNotes
        if (matchedRecNote !== null && gtStart >= start && gtStart < end) {
          newGtRecMap.set(gtStart, matchedRecNote);
        }
      }

      result.set(pitch, {
        gtRecMap: newGtRecMap,
        additionalNotes: additionalNotes.filter(d => d.start >= start && d.start < end),
        missingNotes: missingNotes.filter(d => d.start >= start && d.start < end),
        gtNotes: gtNotes
      });
    }

    return result;
  }
  /**
   * Shortcut for getMatchingSection and getMatchingError,
   * see them for parameter details.
   *
   * @param {Map} matching matching
   * @param {number} start start time (inclusive)
   * @param {number} end end time (exclusive)
   * @param {number} addPenalty penalty for each additonal note
   * @param {number} missPenalty penalty for each missing note
   * @param {number} timingPenalty penalty for note timing differences in seconds
   * @returns {object} error by category
   */

  function getMatchingSliceError(matching, start, end, addPenalty, missPenalty, timingPenalty) {
    const section = getMatchingSection(matching, start, end);
    const error = getMatchingError(section, addPenalty, missPenalty, timingPenalty);
    return error;
  }

  var Matching = /*#__PURE__*/Object.freeze({
    __proto__: null,
    matchGtAndRecordingNotes: matchGtAndRecordingNotes,
    matchGtAndMultipleRecordings: matchGtAndMultipleRecordings,
    getMultiMatchingErrorPerNote: getMultiMatchingErrorPerNote,
    getMatchingError: getMatchingError,
    getMatchingSection: getMatchingSection,
    getMatchingSliceError: getMatchingSliceError
  });

  /**
   * @module Alignment
   */

  /**
   * Given two NoteArrays, shift the second one in time such that they are aligned
   *
   * @todo use https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm
   *      to find note alignment, then only use those for force calculation
   * @param {NoteArray} gt a NoteArray, e.g. the ground truth
   * @param {NoteArray} rec a NoteArray to align to a
   * @returns {NoteArray} an aligned copy of b
   */

  function alignNoteArrays(gt, rec) {
    rec = rec.clone();
    const f = alignmentForce(gt.getNotes(), rec.getNotes());
    rec = rec.shiftTime(f); // console.log(`Aligned recording via shifting by ${f.toFixed(3)} seconds`);

    return {
      aligned: rec,
      timeDifference: f
    };
  }
  /**
   * Given two NoteArrays, shift the second one in time such that they are aligned
   *
   * @param {NoteArray} gt a NoteArray, e.g. the ground truth
   * @param {NoteArray} rec a NoteArray to align to a
   * @returns {NoteArray} an aligned copy of b
   */

  function alignNoteArrays2(gt, rec) {
    let timeDifference = 0;
    let tries = 0;
    rec = rec.clone();

    while (tries < 25) {
      // Get a 1-to-1 matching between gt and rec notes so noise has less impact
      const matching = matchGtAndRecordingNotes(rec.getNotes(), gt.getNotes()); // Get average time difference between matched notes

      let timeDiff = 0;
      let count = 0;

      for (const m of matching.values()) {
        const {
          gtRecMap
        } = m;

        for (const [gtStart, matchedRecNote] of gtRecMap.entries()) {
          if (matchedRecNote !== null) {
            count++;
            timeDiff += gtStart - matchedRecNote.start;
          }
        }
      }

      timeDiff /= count; // Shift recording

      rec.shiftTime(timeDiff);
      timeDifference += timeDiff; // console.log(`${tries} shifting by ${timeDiff.toFixed(3)} seconds`);
      // Stop while loop when finished

      if (Math.abs(timeDiff) < 0.0005) {
        break;
      }

      tries++;
    }

    return {
      aligned: rec,
      timeDifference
    };
  }
  /**
   * Given two NoteArrays, shift the second one in time such that they are aligned
   *
   * @todo use median instead of average?
   * @param {NoteArray} gt a NoteArray, e.g. the ground truth
   * @param {NoteArray} rec a NoteArray to align to a
   * @returns {NoteArray} an aligned copy of b
   */

  function alignNoteArrays3(gt, rec) {
    let timeDifference = 0;
    let tries = 0;
    rec = rec.clone();

    while (tries < 25) {
      // Get a 1-to-1 matching between gt and rec notes so noise has less impact
      const matching = matchGtAndRecordingNotes(rec.getNotes(), gt.getNotes()); // Get time differences

      const timeDiffs = [];

      for (const m of matching.values()) {
        for (const [gtStart, matchedRecNote] of m.gtRecMap.entries()) {
          if (matchedRecNote !== null) {
            timeDiffs.push(gtStart - matchedRecNote.start);
          }
        }
      }

      const shift = median(timeDiffs); // Shift recording

      rec.shiftTime(shift);
      timeDifference += shift; // console.log(`${tries} shifting by ${shift.toFixed(3)} seconds`);
      // Stop while loop when finished

      if (Math.abs(shift) < 0.0001) {
        break;
      }

      tries++;
    }

    return {
      aligned: rec,
      timeDifference
    };
  }
  /**
   * Calculates the mean difference between all notes in a and the nearest same-
   * pitched notes in b
   *
   * @param {Note[]} a array with notes
   * @param {Note[]} b array with notes
   * @returns {number} mean time difference
   */

  function alignmentForce(a, b) {
    let difference = 0;
    let count = 0; // For each note in a, search the closest note in b with the same pitch and calculate the distance

    for (const noteA of a) {
      let distance = Number.POSITIVE_INFINITY;
      let diff = Number.POSITIVE_INFINITY;

      for (const noteB of b) {
        if (noteA.pitch === noteB.pitch) {
          const dist = Math.abs(noteA.start - noteB.start);

          if (dist < distance) {
            distance = dist;
            diff = noteA.start - noteB.start; // TODO: Larger distances might be errors
            // if (diff > 1) {
            //     diff = Math.sqrt(diff);
            // }
          }
        }
      } // (If not found, this does not change alignment)


      if (distance < Number.POSITIVE_INFINITY) {
        difference += diff;
        count++;
      }
    }

    return difference / count;
  }
  /**
   * Test function
   *
   * @todo move to test
   */


  function testAlignment() {
    const test = (a, b, title) => {
      console.log(title);
      console.log(b.getNotes().map(n => n.start));
      const aligned = alignNoteArrays(a, b);
      console.log(aligned.getNotes().map(n => n.start));
    };

    const a = new NoteArray([new Note$2(69, 0, 127, 0, 1), new Note$2(70, 1, 127, 0, 2), new Note$2(71, 2, 127, 0, 3)]);
    console.log(a.getNotes().map(n => n.start));
    let b;
    b = a.clone().shiftTime(2);
    test(a, b, 'shifted by 2');
    b = a.clone().shiftTime(-2);
    test(a, b, 'shifted by -2');
    b = a.clone().shiftTime(3).addNotes([new Note$2(72, 2, 127, 0, 3)]);
    test(a, b, 'shifted by 3, added note');
    b = a.clone().repeat(2);
    test(a, b, 'repeated');
    b = a.clone().repeat(2).shiftTime(3);
    test(a, b, 'repeated, shifted by 3');
  }
  /**
   * @todo Benchmark different aligment functions on a randomly generated test set
   * This allows to check the calculated alignment against a known ground truth
   */

  function alignmentBenchmark() {
    // Use random seed for reproducability
    const seed = 0.448_715_738_882_824_23; // any number in [0, 1)

    const rand127 = randomInt.source(lcg(seed))(0, 127);
    const maxTime = 500;
    const randTime = randomUniform.source(lcg(seed))(0, maxTime);
    const randDuration = randomUniform.source(lcg(seed))(1 / 64, 2); // Create random notes

    const randomNotes = Array.from({
      length: 200
    }).fill(0).map(() => {
      const start = randTime();
      return new Note$2(rand127(), start, 127, 0, start + randDuration());
    });
    const notes = new NoteArray(randomNotes).sortByTime();
    console.log('true notes', notes.getNotes()); // Shift notes by some amount of seconds (this is what alignment should calculate!)

    const shift = 3;
    const shifted = notes.clone().shiftTime(shift);
    console.log('shifted', shifted); // Introduce errors, as a human would

    const deviation = 0.1;
    const pAdd = 0.1;
    const pRemove = 0.1;
    let variation = generateDrumVariation(shifted.getNotes(), deviation, pAdd, pRemove);
    variation = new NoteArray(variation);
    console.log('variation', variation); // Run all functions

    const funcs = [alignNoteArrays, alignNoteArrays2, alignNoteArrays3];
    console.log(`True time shift: ${shift} seconds`);
    console.log('Only shifted');

    for (const f of funcs) {
      const {
        timeDifference
      } = f(notes, shifted);
      const error = Math.abs(timeDifference - -shift);
      console.log(`${f.name}\nshift: ${timeDifference.toFixed(3)} \nError ${error.toFixed(3)}`);
    }

    console.log('Shifted & variation');

    for (const f of funcs) {
      const {
        timeDifference
      } = f(notes, variation);
      const error = Math.abs(timeDifference - -shift);
      console.log(`${f.name}\nshift: ${timeDifference.toFixed(3)} \nError ${error.toFixed(3)}`);
    }
  }

  var Alignment = /*#__PURE__*/Object.freeze({
    __proto__: null,
    alignNoteArrays: alignNoteArrays,
    alignNoteArrays2: alignNoteArrays2,
    alignNoteArrays3: alignNoteArrays3,
    testAlignment: testAlignment,
    alignmentBenchmark: alignmentBenchmark
  });

  /**
   * @module DiffAlignment
   */

  /**
   * Aligns the recording to the best fitting position of the ground truth
   *
   * @param {Note[]} gtNotes ground truth notes
   * @param {Recording} recording a Recording object
   * @param {number} binSize time bin size in milliseconds
   * @returns {Recording} aligned recording
   */

  function alignRecordingToBestFit(gtNotes, recording, binSize = 100) {
    const recNotes = recording.getNotes();
    const bestFit = alignGtAndRecToMinimizeDiffError(gtNotes, recNotes, binSize)[0];
    const newRec = recording.clone().shiftToStartAt(bestFit.offsetMilliseconds / 1000);
    return newRec;
  }
  /**
   * Splits the recording at gaps > gapDuration and then aligns each section to
   * the best fitting position of the ground truth.
   *
   * @param {Note[]} gtNotes ground truth notes
   * @param {Recording} recording a Recording object
   * @param {number} binSize time bin size in milliseconds
   * @param {number} gapDuration duration of seconds for a gap to be used as
   *      segmenting time
   * @param {'start-start'|'end-start'} gapMode gaps can either be considered as
   *      the maximum time between two note's starts or the end of the first
   *      and the start of the second note
   * @returns {Recording} aligned recording
   */

  function alignRecordingSectionsToBestFit(gtNotes, recording, binSize, gapDuration = 3, gapMode = 'start-start') {
    // Cut into sections when there are gaps
    const sections = Recording.segmentAtGaps(gapDuration, gapMode);
    const alignedSections = sections.map(section => {
      // TODO: avoid overlaps?
      const bestFit = alignGtAndRecToMinimizeDiffError(gtNotes, section, binSize)[0];
      return bestFit;
    });
    const newRec = recording.clone();
    newRec.setNotes(alignedSections.flat());
    return newRec;
  }
  /**
   * Global alignment.
   *
   * Returns an array with matches sorted by magnitude of agreement.
   * The offsetMilliseconds value describes at what time the first note of the
   * recording should start.
   *
   * Goal: Know which part of ground truth (GT) was played in recording (rec)
   * Assumptions:
   * - Rec has same tempo as GT
   * - Rec does not start before GT
   * - Rec does not repeat something that is not repeated in the GT
   * - Rec does not have gaps
   * Ideas:
   * - Brute-force
   * - Sliding window
   * - Using diff between time-pitch matrix of GT and rec
   * - Only compute agreement (correct diff part) for the current overlap
   * - For each time position save the agreement magnitude
   * - Optionally: repeat around local maxima with finer binSize
   *
   * @param {Note[]} gtNotes ground truth notes
   * @param {Note[]} recNotes recorded notes
   * @param {number} binSize time bin size in milliseconds
   * @returns {object[]} best offsets with agreements
   */

  function alignGtAndRecToMinimizeDiffError(gtNotes, recNotes, binSize) {
    gtNotes = new NoteArray(gtNotes);
    recNotes = new NoteArray(recNotes).shiftToStartAt(0);
    const gtDuration = gtNotes.getDuration();
    const recDuration = recNotes.getDuration();
    const nBins = Math.ceil(gtDuration * 1000 / binSize) + 1;
    const nRecBins = Math.ceil(recDuration * 1000 / binSize) + 1; // TODO: just switch them around?

    if (nRecBins > nBins) {
      console.warn('Cannot compare GT and rec if rec is longer');
    } // Get activation maps


    const gtActivation = activationMap(gtNotes.getNotes(), binSize);
    const recActivation = activationMap(recNotes.getNotes(), binSize); // Compare with sliding window

    const agreementsPerOffset = [];

    for (let offset = 0; offset < nBins - nRecBins + 1; offset++) {
      const currentAgreement = agreement(gtActivation, recActivation, offset); // console.log(`Comparing gt bins ${offset}...${offset + nRecBins} to rec\nGot agreement ${currentAgreement}`);

      agreementsPerOffset.push({
        offsetBins: offset,
        offsetMilliseconds: offset * binSize,
        agreement: currentAgreement
      });
    } // Sort by best match


    const sorted = agreementsPerOffset.sort((a, b) => b.agreement - a.agreement);
    return sorted;
  }
  /**
   * Returns an activation map, that maps pitch to an array of time bins.
   * Each bin contains a 0 when there is no note or a 1 when there is one.
   *
   * @param {Note[]} allNotes notes
   * @param {number} binSize time bin size in milliseconds
   * @returns {Map} activation map
   */

  function activationMap(allNotes, binSize = 100) {
    const activationMap = new Map();

    for (const [pitch, notes] of group(allNotes, d => d.pitch).entries()) {
      const maxTime = max(notes, d => d.end);
      const nBins = Math.ceil(maxTime * 1000 / binSize) + 1;
      const pitchActivationMap = Array.from({
        length: nBins
      }).fill(0); // Calculate heatmap by writing 1 where a note is active

      for (const note of notes) {
        const start = Math.round(note.start * 1000 / binSize);
        const end = Math.round(note.end * 1000 / binSize);

        for (let bin = start; bin <= end; bin++) {
          pitchActivationMap[bin] = 1;
        }
      }

      activationMap.set(pitch, pitchActivationMap);
    }

    return activationMap;
  }
  /**
   * Given two activation maps, simply counts the number of bins [pitch, time]
   * where both have a 1, so an acitve note
   * Gtmust be longer than rec
   *
   * @todo also count common 0s?
   * @param {Map} gtActivations see activationMap()
   * @param {Map} recActivations see activationMap()
   * @param {number} offset offset for activation2 when comparing
   * @returns {number} agreement
   */

  function agreement(gtActivations, recActivations, offset) {
    const allPitches = [...new Set([...gtActivations.keys(), ...recActivations.keys()])];
    let agreement = 0;

    for (const pitch of allPitches) {
      // Handle pitches that occur only in one of both
      if (!gtActivations.has(pitch)) ; else if (!recActivations.has(pitch)) ; else {
        // Compare both bins for each time slice
        const gtA = gtActivations.get(pitch);
        const recA = recActivations.get(pitch); // Go through full rec, and compare to current section of GT
        // eslint-disable-next-line unicorn/no-for-loop

        for (let index = 0; index < recA.length; index++) {
          const gtValue = gtA[index + offset] || 0;
          const recValue = recA[index] || 0;

          if (gtValue === 1 && recValue === 1) {
            agreement++;
          }
        }
      }
    }

    return agreement;
  }

  var DiffAlignment = /*#__PURE__*/Object.freeze({
    __proto__: null,
    alignRecordingToBestFit: alignRecordingToBestFit,
    alignRecordingSectionsToBestFit: alignRecordingSectionsToBestFit,
    alignGtAndRecToMinimizeDiffError: alignGtAndRecToMinimizeDiffError,
    activationMap: activationMap,
    agreement: agreement
  });

  /**
   * Idea: Like in hierarchical clustering, take the most similar pair out of the
   * set of all possible pairs repeatedly, until one array of items is empty.
   *
   * @template T1
   * @template T2
   * @param {T1[]} itemsA an array with items
   * @param {T2[]} itemsB an array with items
   * @param {function(T1, T2): number} distanceFunction distance function for two
   *      items, must be 0 for equal items and symmetric
   * @returns {Map<number,number>} with the indices of the matched items
   */

  function priorityMatching(itemsA, itemsB, distanceFunction) {
    // Build distance matrix
    const matrix = Array.from({
      length: itemsA.length
    }).map(() => Array.from({
      length: itemsB.length
    }));

    for (const [indexA, gtNote] of itemsA.entries()) {
      for (let indexB = indexA; indexB < itemsB.length; indexB++) {
        const dist = distanceFunction(gtNote, itemsB[indexB]);
        matrix[indexA][indexB] = dist;

        if (matrix[indexB] !== undefined) {
          matrix[indexB][indexA] = dist;
        }
      }
    } // Compute matching pair by pair


    const matching = new Map();
    let numberOfMatches = Math.min(itemsA.length, itemsB.length);

    for (let match = 0; match < numberOfMatches; match++) {
      // Find most similar pair, i.e. matrix entry with smallest value
      const [a, b] = getMatrixMinPosition(matrix);
      matching.set(a, b); // Remove from matrix (just set to null)

      if (match >= numberOfMatches - 1) {
        break;
      }

      for (let index = 0; index < itemsA.length; index++) {
        matrix[index][b] = null;
      }

      for (let index = 0; index < itemsB.length; index++) {
        matrix[a][index] = null;
      }
    }

    return matching;
  }
  /**
   * First matches GT to rec notes via priorityMatching, then computes the error
   * for each GT note that has been matched using the same distance function.
   * The Map will be undefined for GT notes that have not been matched, they can
   * be considered missing in the recording.
   *
   * @param {Note[]} gtNotes ground truth notes
   * @param {Note[]} recNotes recorded notes
   * @param {function(Note,Note): number} distanceFunction distance function,
   *      taking two notes and returning the 'distance', i.e. how different they
   *      are. See balancedNoteDistance as example.
   * @returns {Map<Note,number>} a Map from GT note to its error
   */

  function errorFromPriorityMatching(gtNotes, recNotes, distanceFunction) {
    const matching = priorityMatching(gtNotes, recNotes, distanceFunction); // Map GT notes to errors

    const errors = new Map();

    for (const [gt, rec] of matching.entries()) {
      const gtNote = gtNotes[gt];
      const recNote = recNotes[rec];
      const error = distanceFunction(gtNote, recNote);
      errors.set(gtNote, error);
    }

    return errors;
  }
  /**
   * Computes a distance (inverse similarity) of two notes, considering pitch,
   * chroma, start, duration, and channel.
   *
   * @param {Note} a a Note
   * @param {Note} b a Note
   * @returns {number} distance
   */

  function balancedNoteDistance(a, b) {
    let dist = 0; // Pitch

    dist += Math.abs(a.pitch - b.pitch); // Chroma

    dist += Math.abs(a.pitch % 12 - b.pitch % 12); // Start time

    dist += Math.abs(a.start - b.start); // Duration

    dist += 0.5 * Math.abs(a.getDuration() - b.getDuration()); // Channel

    dist += Math.abs(a.channel - b.channel);
    return dist;
  }
  /**
   * Returns the row and colum indices of the minimum value of the given matrix
   *
   * @param {number[][]} matrix matrix
   * @returns {number[]} [rowIndex, columIndex] of the minimum value
   */

  function getMatrixMinPosition(matrix) {
    // Find most similar pair, i.e. matrix entry with smallest value
    const minPerRow = matrix.map(row => {
      const minInd = minIndex(row);
      return [minInd, row[minInd]];
    });
    const minRowIndex = minIndex(minPerRow, d => d[1]);
    const minColIndex = minPerRow[minRowIndex][0];
    return [minRowIndex, minColIndex];
  }

  var PriorityMatching = /*#__PURE__*/Object.freeze({
    __proto__: null,
    priorityMatching: priorityMatching,
    errorFromPriorityMatching: errorFromPriorityMatching,
    balancedNoteDistance: balancedNoteDistance,
    getMatrixMinPosition: getMatrixMinPosition
  });

  /**
   * @module comparison/Similarity
   */

  /**
   * Given a track, a selected time interval and a threshold,
   * this function searches for parts in the track that are
   * similar to the selection.
   * It uses a sliding window with the size of the selection
   * and a stride given as argument.
   *
   * @param {Note[]} track array of Note objects
   * @param {number[]} selectedInterval [startTime, endTime] in seconds
   * @param {number} stride stride for the sliding window in number of bins
   * @param {number} threshold distance threshold below which parts are considered similar
   * @param {number} secondsPerBin time bin size in seconds
   * @param {string} distance one of: 'dtw', 'euclidean', 'nearest'
   * @returns {object} similar parts
   */

  function getSimilarParts(track, selectedInterval, stride, threshold, secondsPerBin = 1 / 16, distance = 'euclidean') {
    console.log(`Searching for similar parts based on selection, using ${distance}`);

    if (track === undefined || track.length === 0) {
      console.warn('No or empty track given');
      return;
    } // Discretize track (instead of doing this for every part)


    const minTime = min(track, d => d.start);
    const maxTime = max(track, d => d.end);
    const binCount = Math.ceil((maxTime - minTime) / secondsPerBin);
    const discrTrack = discretizeTime(track, secondsPerBin); // Selection

    const startBin = Math.floor((selectedInterval[0] - minTime) / secondsPerBin);
    const endBin = Math.ceil((selectedInterval[1] - minTime) / secondsPerBin);
    const selection = sliceDiscretizedTrack(discrTrack, startBin, endBin);
    const selectionSize = endBin - startBin; // Sliding window through the track

    const similarParts = [];

    for (let pos = 0; pos < binCount - selectionSize; pos += stride) {
      const pos2 = pos + selectionSize; // Ignore intersections with selection

      if (!(pos >= startBin && pos <= endBin) && !(pos2 >= startBin && pos2 <= endBin)) {
        const part = sliceDiscretizedTrack(discrTrack, pos, pos2);
        const dist = getTrackSimilarity(selection, part, distance);

        if (dist <= threshold) {
          similarParts.push({
            startBin: pos,
            endBin: pos2,
            startTime: minTime + pos * secondsPerBin,
            endTime: minTime + pos2 * secondsPerBin,
            dist
          });
        }
      }
    }

    return {
      selection: {
        startBin,
        endBin,
        startTime: minTime + startBin * secondsPerBin,
        endTime: minTime + endBin * secondsPerBin
      },
      similarParts
    };
  }
  /**
   * Uses calculates the distance between
   * two discretized tracks, for each pitch separately.
   * Pitch-wise distances are averaged and a penalty is added to the distance
   * for pitches that are not occuring in both tracks
   *
   * @see https://github.com/GordonLesti/dynamic-time-warping
   * @param {Map} discrA discretized track
   * @param {Map} discrB discretized track
   * @param {string} distance one of: 'euclidean', 'nearest'
   * @returns {number} distance
   */

  function getTrackSimilarity(discrA, discrB, distance) {
    // Get common pitches
    const common = [];

    for (const key of discrA.keys()) {
      if (discrB.has(key)) {
        common.push(key);
      }
    } // Get distance for each pitch and add to weighted average


    let totalDist = 0; // Get DTW distance for each common pitch

    for (const pitch of common) {
      const binsA = discrA.get(pitch);
      const binsB = discrB.get(pitch);
      let dist;

      if (distance === 'dtw') ; else if (distance === 'euclidean') {
        dist = euclideanDistanceSquared(binsA, binsB);
      } else if (distance === 'nearest') {
        dist = neirestNeighborDistance(binsA, binsB);
      } // Get weighted average
      // TODO: How to weight the average?


      const weight = 1; // const weight = countActiveNoteBins(binsA) + countActiveNoteBins(binsB);
      // const weight = 1 / (countActiveNoteBins(binsA) + countActiveNoteBins(binsB));

      totalDist += weight * dist;
    } // TODO: add penalty for uncommon pitches
    // Depending on number of 1s?


    let penaltyWeight = 0;

    for (const discr of [discrA, discrB]) {
      for (const key of discr.keys()) {
        if (!common.includes(key)) {
          penaltyWeight += countActiveNoteBins(discr.get(key));
        }
      }
    }

    return totalDist + penaltyWeight;
  }
  /**
   * - Normalizes Note times to be between 0 and (maxTime - minTime),
   * - discretizes the start and end time by using Math.round to get
   * the closest time bin (beat) and
   * - Creates one array for each pitch, where each entry contains
   * either a 0 (no note at that time bin) or a 1 (note at that time bin)
   *
   * @param {Note[]} track an array of Note objects
   * @param {number} secondsPerBin time bin size in seconds
   * @returns {Map} pitch to binArray
   */

  function discretizeTime(track, secondsPerBin) {
    const minTime = min(track, d => d.start);
    const maxTime = max(track, d => d.end);
    const binCount = Math.ceil((maxTime - minTime) / secondsPerBin); // Map pitch->timeBinArray

    const result = new Map();

    for (const note of track) {
      const startBin = Math.round((note.start - minTime) / secondsPerBin);
      const endBin = Math.round((note.end - minTime) / secondsPerBin);
      const pitch = note.pitch;
      let binArray;
      binArray = result.has(pitch) ? result.get(pitch) : Array.from({
        length: binCount
      }).fill(0);

      for (let bin = startBin; bin <= endBin; bin++) {
        binArray[bin] = 1;
      }

      result.set(pitch, binArray);
    }

    return result;
  }
  /**
   * Counts the occurence of 1 in an array
   *
   * @param {number[]} binArray array
   * @returns {number} occurence of 1
   */

  function countActiveNoteBins(binArray) {
    let count = 0;

    for (const bin of binArray) {
      if (bin === 1) {
        count++;
      }
    }

    return count;
  }
  /**
   * Slices bins out of a discretices track.
   * This is done for each pitch separately
   *
   * @param {Map} trackMap Map pitch->binArray
   * @param {number} startBin index of first bin
   * @param {number} endBin index of last bin
   * @returns {Map} map with sliced arrays
   */


  function sliceDiscretizedTrack(trackMap, startBin, endBin) {
    const slice = new Map();

    for (const [key, value] of trackMap.entries()) {
      slice.set(key, value.slice(startBin, endBin));
    }

    return slice;
  }
  /**
   * Returns sum_{i=0}^{N-1}{(a_i-b_i)^2},
   * i.e. Euclidean distance but without square root
   *
   * @param {number[]} A an array
   * @param {number[]} B  another array
   * @returns {number} Euclidean distance
   */


  function euclideanDistanceSquared(A, B) {
    const maxBins = Math.max(A.length, B.length);
    let sum = 0;

    for (let index = 0; index < maxBins; index++) {
      // If undefined (because one array is shorter)
      // use 0 as padding value
      const a = A[index] || 0;
      const b = B[index] || 0;
      const diff = a - b;
      sum += diff * diff;
    }

    return sum;
  }
  /**
   * Given two arrays containing 1s and 0s, this algorithm
   * goes through all bins and for each bin where one array
   * has a 1 and the other a 0, it searches for the closest 1
   * next to the 0.
   * The distance is then added to the global distance.
   *
   * @param {number[]} A an array
   * @param {number[]} B  another array
   * @returns {number} nearest neighbor distance
   */


  function neirestNeighborDistance(A, B) {
    const maxBins = Math.max(A.length, B.length);
    const maxOffset = Math.round(maxBins / 4);
    let sum = 0;

    for (let index = 0; index < maxBins; index++) {
      let offset = 0; // If undefined (because one array is shorter)
      // use 0 as padding value

      const a = A[index] || 0;
      const b = B[index] || 0;

      if (a === b) ; else if (a === 0 && b === 1) {
        // If b == 1, look for the nearest 1 in a
        // Out of bounds does not matter since undefined !== 1
        // while (i - offset > 0 && i + offset < (maxBins-1) && offset <= maxOffset) {
        while (offset <= maxOffset) {
          offset++;

          if (a[index - offset] === 1 || a[index + offset === 1]) {
            break;
          }
        }
      } else if (a === 1 && b === 0) {
        // If a == 1, look for the nearest 1 in b
        while (offset <= maxOffset) {
          offset++;

          if (b[index - offset] === 1 || b[index + offset === 1]) {
            break;
          }
        }
      }

      sum += offset;
    }

    return sum;
  }

  var Similarity = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getSimilarParts: getSimilarParts,
    getTrackSimilarity: getTrackSimilarity,
    discretizeTime: discretizeTime
  });

  /**
   * @module stringBased/Levenshtein
   */

  /**
   * Computes the Levenshtein distance of two strings or arrays.
   *
   * @see https://gist.github.com/andrei-m/982927#gistcomment-1931258
   * @author https://github.com/kigiri, license: MIT
   * @param {string|Array} a a string
   * @param {string|Array} b another string
   * @param {boolean} normalize when set to true, the distance will be normalized
   *      to [0, 1], by dividing by the longer string's length
   * @returns {number} Levenshtein distance
   */
  function levenshtein(a, b, normalize = false) {
    if (a.length === 0 && b.length === 0) {
      return 0;
    }

    if (a.length === 0) {
      return normalize ? 1 : b.length;
    }

    if (b.length === 0) {
      return normalize ? 1 : a.length;
    }

    let i, j, previous, value; // swap to save some memory O(min(a,b)) instead of O(a)

    if (a.length > b.length) {
      const temporary = a;
      a = b;
      b = temporary;
    } // init the row


    const row = Array.from({
      length: a.length + 1
    });

    for (i = 0; i <= a.length; i++) {
      row[i] = i;
    } // fill in the rest


    for (i = 1; i <= b.length; i++) {
      previous = i;

      for (j = 1; j <= a.length; j++) {
        value = b[i - 1] === a[j - 1] ? row[j - 1] : Math.min(row[j - 1] + 1, // substitution
        Math.min(previous + 1, // insertion
        row[j] + 1 // deletion
        ));
        row[j - 1] = previous;
        previous = value;
      }

      row[a.length] = previous;
    }

    const result = row[a.length]; // Normalize?

    return normalize ? result / Math.max(a.length, b.length) : result;
  }
  /**
   * Computes the Damerau-Levenshtein distance of two strings or arrays.
   *
   * @see https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
   * @param {string|Array} a a string
   * @param {string|Array} b another string
   * @param {boolean} normalize when set to true, the distance will be normalized
   *      to [0, 1], by dividing by the longer string's length
   * @returns {number} Levenshtein distance
   */

  function damerauLevenshtein(a, b, normalize = false) {
    if (a.length === 0 && b.length === 0) {
      return 0;
    }

    if (a.length === 0) {
      return normalize ? 1 : b.length;
    }

    if (b.length === 0) {
      return normalize ? 1 : a.length;
    }

    const d = Array.from({
      length: a.length + 1
    }).map(() => Array.from({
      length: b.length
    }));

    for (let i = 0; i <= a.length; i++) {
      d[i][0] = i;
    }

    for (let i = 0; i <= b.length; i++) {
      d[0][i] = i;
    }

    let cost;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost // substitution
        );

        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          // transposition
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }

    const result = d[a.length][b.length]; // Normalize?

    return normalize ? result / Math.max(a.length, b.length) : result;
  }

  var Levenshtein = /*#__PURE__*/Object.freeze({
    __proto__: null,
    levenshtein: levenshtein,
    damerauLevenshtein: damerauLevenshtein
  });

  /**
   * @module comparison/SimilarSections
   */

  /**
   * Turns an array of notes into a string to perform pattern matching search for similar
   * patterns.
   *
   * @param {Note[]} notes notes, must be sorted by Note.start
   * @param {number} startTime start time of the section to search
   * @param {number} endTime end time for the section to search
   * @param {number} threshold threshold for normalized Levenshtein distance in [0, 1]
   * @returns {object[]} {index, distance, startTime, endTime}
   */

  function findSimilarNoteSections(notes, startTime, endTime, threshold = 0.5) {
    const selectedNotes = notes.filter(d => d.start >= startTime && d.end <= endTime); // Convert to string

    const dataString = PitchSequence.fromNotes(notes).getPitches();
    const searchString = PitchSequence.fromNotes(selectedNotes).getPitches();
    const length = searchString.length;

    if (length < 3) {
      return [];
    } // Find matches


    const matches = findSimilarStringSections(dataString, searchString, threshold); // Get time spans

    return matches.map(m => {
      const {
        index
      } = m;
      const note1 = notes[index];
      const note2 = notes[index + length];
      return { ...m,
        startTime: note1.start,
        endTime: note2.end
      };
    });
  }
  /**
   * Finds similar sections in a string via Levenshtein distance
   *
   * @param {stringArray} dataString they string to search in
   * @param {stringArray} searchString the string to search for
   * @param {number} threshold threshold for normalized Levenshtein distance in [0, 1]
   * @returns {object[]} {index, distance}
   */

  function findSimilarStringSections(dataString, searchString, threshold = 0.5) {
    const length = searchString.length;
    const matches = [];

    for (let index = 0; index < dataString.length - length; index++) {
      const slice = dataString.slice(index, index + length);
      const distance = levenshtein(searchString, slice) / length;

      if (distance < threshold) {
        matches.push({
          index: index,
          distance
        });
      }
    } // Filter overlapping matches by removing the ones with larger distances


    const filtered = []; // Therefore, sort by distance ascending and add them one by one

    matches.sort((a, b) => a.distance - b.distance); // Speed up hit detection by keeping track of indices that are already occupied

    const occupied = Array.from({
      length: dataString.length
    }).fill(false);

    for (const m of matches) {
      const {
        index
      } = m; // Check if occupied

      let occ = false;

      for (let i = index; i < index + length; i++) {
        if (occupied[i]) {
          occ = true;
          break;
        }
      } // If not occupied, add and occupy


      if (!occ) {
        filtered.push(m);

        for (let i = index; i < index + length; i++) {
          occupied[i] = true;
        }
      }
    }

    return filtered;
  }

  var SimilarSections = /*#__PURE__*/Object.freeze({
    __proto__: null,
    findSimilarNoteSections: findSimilarNoteSections,
    findSimilarStringSections: findSimilarStringSections
  });

  /**
   * @module stringBased/LongestCommonSubsequence
   */

  /**
   * Calculates the longest common subsequence.
   *
   * @see https://rosettacode.org/wiki/Longest_common_subsequence#JavaScript
   * @example
   * const lcs = StringBased.LongestCommonSubsequence.lcs('hello world!', 'world');
   * // world
   * @param {string|Array} a a string
   * @param {string|Array} b another string
   * @returns {string|Array} the longest common subsequence
   */
  function lcs(a, b) {
    // Make sure shorter string is the column string
    const m = a.length;
    const n = b.length; // Return now if one (or both) empty

    if (a.length === 0) {
      return a;
    }

    if (b.length === 0) {
      return b;
    }

    let i,
        j,
        row = [],
        left,
        diagonal,
        latch;
    const lcs = [];
    const c = []; // Build the c-table

    for (j = 0; j < n; row[j++] = 0);

    for (i = 0; i < m; i++) {
      c[i] = row = [...row];

      for (diagonal = 0, j = 0; j < n; j++, diagonal = latch) {
        latch = row[j];

        if (a[i] === b[j]) {
          row[j] = diagonal + 1;
        } else {
          left = row[j - 1] || 0;

          if (left > row[j]) {
            row[j] = left;
          }
        }
      }
    }

    i--;
    j--; // row[j] now contains the length of the lcs
    // Recover the lcs from the table

    while (i > -1 && j > -1) {
      switch (c[i][j]) {
        default:
          j--;
          lcs.unshift(a[i]);

        case i && c[i - 1][j]:
          // eslint-disable-line no-fallthrough
          i--;
          continue;

        case j && c[i][j - 1]:
          j--;
      }
    } // Only join when x and y are strings


    return Array.isArray(a) || Array.isArray(b) ? lcs : lcs.join('');
  }
  /**
   * Calculates the *length* of the longest common subsequence.
   * Also works with arrays.
   *
   * @see https://rosettacode.org/wiki/Longest_common_subsequence#JavaScript
   * @example
   * const lcsLength = StringBased.LongestCommonSubsequence.lcs('hello world!', 'world');
   * // 5
   * @param {string|Array} a a string
   * @param {string|Array} b another string
   * @returns {number} the length of longest common subsequence
   */

  function lcsLength(a, b) {
    // Make sure shorter string is the column string
    const m = a.length;
    const n = b.length; // Return now if one (or both) empty

    if (a.length === 0) {
      return 0;
    }

    if (b.length === 0) {
      return 0;
    }

    let i,
        j,
        row = [],
        left,
        diagonal,
        latch;
    const c = []; // Build the c-table

    for (j = 0; j < n; row[j++] = 0);

    for (i = 0; i < m; i++) {
      c[i] = row = [...row];

      for (diagonal = 0, j = 0; j < n; j++, diagonal = latch) {
        latch = row[j];

        if (a[i] === b[j]) {
          row[j] = diagonal + 1;
        } else {
          left = row[j - 1] || 0;

          if (left > row[j]) {
            row[j] = left;
          }
        }
      }
    }

    i--;
    j--; // row[j] now contains the length of the lcs

    return row[j];
  }
  /**
   * Normalizes the result of lcsLength() by dividing by the longer string's
   * length.
   *
   * @param {string|Array} a a string
   * @param {string|Array} b another string
   * @returns {number} normalized length of longest common subsequence
   */

  function normalizedLcsLength(a, b) {
    const longerLength = Math.max(a.length, b.length);

    if (longerLength === 0) {
      return 0;
    }

    return lcsLength(a, b) / longerLength;
  }

  var LongestCommonSubsequence = /*#__PURE__*/Object.freeze({
    __proto__: null,
    lcs: lcs,
    lcsLength: lcsLength,
    normalizedLcsLength: normalizedLcsLength
  });

  /**
   * @module stringBased/Gotoh
   */

  /**
   * Calculates the SIMILARITY for two strings or arrays.
   * Similar to NeedlemanWunsch but O(n^2) instead of O(n^3)
   * IMPORTANT: This metric is not symmetric!
   *
   * @todo normalize to [0, 1], but how?
   * @todo somehow the the matched sequences and gaps...
   * @see https://de.wikipedia.org/wiki/Gotoh-Algorithmus
   * @param {string|Array} seqA a sequence
   * @param {string|Array} seqB a sequence
   * @param {Function} similarityFunction a function that takes two elements and
   *      returns their similarity score (higher => more similar)
   *      (a:any, b:any):number
   * @param {number} gapPenaltyStart cost for starting a new gap (negative)
   * @param {number} gapPenaltyExtend cost for continuing a gap (negative)
   * @returns {number} similarity score
   */
  function gotoh(seqA, seqB, similarityFunction = matchMissmatchSimilarity, gapPenaltyStart = -1, gapPenaltyExtend = -0.1) {
    // check if strings are empty
    if (seqA.length === 0 && seqB.length === 0) {
      return 0;
    } // gap penalty function


    const gap = index => gapPenaltyStart + (index - 1) * gapPenaltyExtend;

    const lengthA = seqA.length;
    const lengthB = seqB.length; // initialize matrices

    const a = Array.from({
      length: lengthA + 1
    }).map(() => Array.from({
      length: lengthB + 1
    }));
    const b = Array.from({
      length: lengthA + 1
    }).map(() => Array.from({
      length: lengthB + 1
    }));
    const c = Array.from({
      length: lengthA + 1
    }).map(() => Array.from({
      length: lengthB + 1
    }));
    a[0][0] = 0;
    b[0][0] = 0;
    c[0][0] = 0;

    for (let i = 1; i <= lengthA; i++) {
      a[i][0] = c[i][0] = Number.NEGATIVE_INFINITY;
      b[i][0] = gap(i);
    }

    for (let i = 1; i <= lengthB; i++) {
      a[0][i] = b[0][i] = Number.NEGATIVE_INFINITY;
      c[0][i] = gap(i);
    } // compute matrices


    for (let i = 1; i <= lengthA; i++) {
      for (let j = 1; j <= lengthB; j++) {
        const sim = similarityFunction(seqA[i - 1], seqB[j - 1]);
        a[i][j] = Math.max(a[i - 1][j - 1], b[i - 1][j - 1], c[i - 1][j - 1]) + sim;
        b[i][j] = Math.max(a[i - 1][j] + gapPenaltyStart, b[i - 1][j] + gapPenaltyExtend, c[i - 1][j] + gapPenaltyStart);
        c[i][j] = Math.max(a[i][j - 1] + gapPenaltyStart, b[i][j - 1] + gapPenaltyStart, c[i][j - 1] + gapPenaltyExtend);
      }
    }

    return Math.max(a[lengthA][lengthB], b[lengthA][lengthB], c[lengthA][lengthB]);
  }
  /**
   * Idea: what would the max. similarity value be? the string with itself!
   * So just compare the longer string to itself and use that similarity to
   * normalize
   *
   * @todo does this work with negative costs and/or results?
   * @todo can this be optimized since only the similarityFunction is needed?
   * @todo only compute 'a' matrix for maxSimilarity
   * @param {string|Array} seqA a sequence
   * @param {string|Array} seqB a sequence
   * @param {Function} similarityFunction a function that takes two elements and
   *      returns their similarity score (higher => more similar)
   *      (a:any, b:any):number
   * @param {number} gapPenaltyStart cost for starting a new gap (negative)
   * @param {number} gapPenaltyExtend cost for continuing a gap (negative)
   * @returns {number} normalized similarity score
   */

  function normalizedGotoh(seqA, seqB, similarityFunction = matchMissmatchSimilarity, gapPenaltyStart = -1, gapPenaltyExtend = -0.1) {
    const similarity = gotoh(seqA, seqB, similarityFunction, gapPenaltyStart, gapPenaltyExtend);
    const longer = seqA.length >= seqB.length ? seqA : seqB;
    const maxSimilarity = gotoh(longer, longer, similarityFunction, gapPenaltyStart, gapPenaltyExtend);

    if (maxSimilarity === 0) {
      // TODO: can this happen? what would be reasonable here?
      return similarity;
    }

    return similarity / maxSimilarity;
  }
  /**
   * Cost function that simply checks whether two values are equal or not with ===
   *
   * @param {any} a some value
   * @param {any} b some value
   * @returns {number} 1 if equal, -1 otherwise
   */

  function matchMissmatchSimilarity(a, b) {
    return a === b ? 1 : -1;
  }
  /**
   * Cost function that takes the negative absolute value of the value's
   * difference, assuming that close values are more similar
   *
   * @param {number} a some value
   * @param {number} b some value
   * @returns {number} -Math.abs(a - b)
   */

  function differenceSimilarity(a, b) {
    return -Math.abs(a - b);
  }

  var Gotoh = /*#__PURE__*/Object.freeze({
    __proto__: null,
    gotoh: gotoh,
    normalizedGotoh: normalizedGotoh,
    matchMissmatchSimilarity: matchMissmatchSimilarity,
    differenceSimilarity: differenceSimilarity
  });

  /* eslint-disable unicorn/prefer-spread */
  /**
   * @module stringBased/SuffixTree
   */

  /**
   * Suffix tree, a tree that shows which subsequences are repeated
   *
   * @see https://github.com/eikes/suffixtree/blob/master/js/suffixtree.js
   */

  class SuffixTree {
    /**
     * SuffixTree for strings or Arrays
     *
     * @param {string|Array} array string or Array to process
     */
    constructor(array) {
      // Split string to array
      if (typeof array === 'string') {
        array = array.split('');
      }

      this.node = new TreeNode();

      if (array && array.length > 0) {
        for (let index = 0; index < array.length; index++) {
          this.node.addSuffix(array.slice(index));
        }
      }
    }
    /**
     * Returns the longest repeated substring
     *
     * @returns {Array} longest repeated substring
     */


    getLongestRepeatedSubString() {
      return this.node.getLongestRepeatedSubString();
    }
    /**
     * Returns a readable string format of this tree
     *
     * @returns {string} string
     */


    toString() {
      return this.node.toString();
    }
    /**
     * Returns a JSON representation of this tree
     *
     * @returns {string} JSON
     */


    toJson() {
      return JSON.stringify(this.node);
    }

  }
  /**
   * TreeNode
   */


  class TreeNode {
    /**
     *
     */
    constructor() {
      this.value = [];
      this.leaves = [];
      this.nodes = [];
    }
    /**
     * @param {string|Array} suf suffix
     * @returns {boolean} true if first entry of suf equals the value of a child
     */


    checkNodes(suf) {
      let node;

      for (let index = 0; index < this.nodes.length; index++) {
        node = this.nodes[index];

        if (arrayShallowEquals(node.value, [suf[0]])) {
          node.addSuffix(suf.slice(1));
          return true;
        }
      }

      return false;
    }
    /**
     * @param {string|Array} suf suffix
     */


    checkLeaves(suf) {
      let node, leaf;

      for (let index = 0; index < this.leaves.length; index++) {
        leaf = this.leaves[index];

        if (leaf[0] === suf[0]) {
          node = new TreeNode();
          node.value = [leaf[0]];
          node.addSuffix(suf.slice(1));
          node.addSuffix(leaf.slice(1));
          this.nodes.push(node);
          this.leaves.splice(index, 1);
          return;
        }
      }

      this.leaves.push(suf);
    }
    /**
     * @param {string|Array} suf suffix
     */


    addSuffix(suf) {
      if (suf.length === 0) {
        return;
      }

      if (!this.checkNodes(suf)) {
        this.checkLeaves(suf);
      }
    }
    /**
     * Returns the longest repeated substring
     *
     * @returns {Array} longest substring
     */


    getLongestRepeatedSubString() {
      let array = [];
      let temporary = [];

      for (let index = 0; index < this.nodes.length; index++) {
        temporary = this.nodes[index].getLongestRepeatedSubString();

        if (temporary.length > array.length) {
          array = temporary;
        }
      }

      return this.value.concat(array);
    }
    /**
     * Readable string representation of this node and its children
     *
     * @param {number} indent indentation
     * @returns {string} string representation
     */


    toString(indent = 1) {
      const ind = ' |'.repeat(indent);
      let string = '';
      string += this.value.length > 0 ? `-N '${this.value}'` : 'root';

      if (this.nodes.length > 0) {
        for (let index = 0; index < this.nodes.length; index++) {
          string += `\n${ind}${this.nodes[index].toString(indent + 1)}`;
        }
      }

      if (this.leaves.length > 0) {
        for (let index = 0; index < this.leaves.length; index++) {
          string += `\n${ind}-L ${this.leaves[index]}`;
        }
      }

      return string;
    }

  }

  var SuffixTree$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': SuffixTree
  });

  /**
   * Calculates all n-grams with a specified length
   *
   * @param {string} string a string
   * @param {number} length length (n) of n-grams
   * @returns {Map<string,number>} maps n-gram to its number of occurences
   */
  function getNGrams(string, length) {
    if (length <= 0) {
      return new Map();
    }

    length = Math.min(length, string.length);
    const nGrams = new Map();

    for (let index = 0; index < string.length - length + 1; index++) {
      const subString = string.slice(index, index + length);

      if (nGrams.has(subString)) {
        nGrams.set(subString, nGrams.get(subString) + 1);
      } else {
        nGrams.set(subString, 1);
      }
    }

    return nGrams;
  }
  /**
   * Calculates all n-grams with a specified length
   *
   * @param {Array} array an array of primitive data types
   * @param {number} length length (n) of n-grams
   * @returns {Map<string,object>} maps n-gram, joined with ' ', to its number of
   * occurences and value
   */

  function getNGramsForArray(array, length) {
    if (length <= 0) {
      return new Map();
    }

    length = Math.min(length, array.length);
    const nGrams = new Map();

    for (let index = 0; index < array.length - length + 1; index++) {
      const subArray = array.slice(index, index + length);
      const key = subArray.join(' ');
      let count = 1;

      if (nGrams.has(key)) {
        count = nGrams.get(key).count + 1;
      }

      nGrams.set(key, {
        value: subArray,
        count
      });
    }

    return nGrams;
  }

  var NGrams = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getNGrams: getNGrams,
    getNGramsForArray: getNGramsForArray
  });

  /* eslint-disable unicorn/prefer-spread */

  /**
   * @module stringBased/NeedlemanWunsch
   */

  /**
   * Needleman-Wunsch algorithm
   *
   * @see https://github.com/blievrouw/needleman-wunsch/blob/master/src/needleman_wunsch.js
   * @todo does not support cost matrix
   * @todo extend by matchMismathFunction
   */
  class NeedlemanWunsch {
    /**
     * @param {string|Array} seq1 a string
     * @param {string|Array} seq2 another string
     * @param {number} match_score score for matching characters
     * @param {number} mismatch_penalty penalty for mismatching characters
     * @param {number} gap_penalty penalty for a gap
     */
    constructor(seq1, seq2, match_score = 1, mismatch_penalty = -1, gap_penalty = -1) {
      // Compared sequences
      this.seq1 = seq1;
      this.seq2 = seq2; // Scoring parameters

      this.match_score = match_score;
      this.mismatch_penalty = mismatch_penalty;
      this.gap_penalty = gap_penalty; // Intermediate scores matrix (scores for [`insert`, `match`, `delete`] positions)

      this.I = []; // Score matrix (best score out of intermediate scores)

      this.S = []; // Traceback matrix (boolean values for [`insert`, `match`, `delete`] positions)

      this.T = []; // Alignments

      this.finalAlignments = []; // Calculate scores and tracebacks

      this.calcScoresAndTracebacks();
    }
    /**
     * Calculates (intermediate) scores and tracebacks using provided parameters
     */


    calcScoresAndTracebacks() {
      this.S.push([0]);
      this.I.push([[null, null, null]]);
      this.T.push([[false, false, false]]); // Calculate scores and traceback on first row

      for (let i = 1; i < this.seq2.length + 1; i++) {
        this.S[0].push(this.S[0][this.S[0].length - 1] + this.gap_penalty);
        this.I[0].push([null, null, null]);
        this.T[0].push([true, false, false]);
      } // Generate other rows


      for (let i = 1; i < this.seq1.length + 1; i++) {
        this.S.push([this.S[i - 1][0] + this.gap_penalty]);
        this.I.push([[null, null, null]]);
        this.T.push([[false, false, true]]);

        for (let j = 1; j < this.seq2.length + 1; j++) {
          const insert = this.S[i][j - 1] + this.gap_penalty;
          const del = this.S[i - 1][j] + this.gap_penalty; // similarity
          // TODO: support function here

          let sim_score;
          sim_score = this.seq1[i - 1] === this.seq2[j - 1] ? this.match_score : this.mismatch_penalty;
          const match = this.S[i - 1][j - 1] + sim_score;
          const intermediate_scores = [insert, match, del];
          const score = Math.max(...intermediate_scores);
          const tracebackTypeStatus = intermediate_scores.map(entry => entry === score);
          this.S[i].push(score);
          this.I[i].push(intermediate_scores);
          this.T[i].push(tracebackTypeStatus);
        }
      } // set best match score


      const lastRow = this.S[this.S.length - 1];
      this.score = lastRow[lastRow.length - 1];
    }
    /**
     * Finds next alignment locations (children) from a position in scoring matrix
     *
     * @param {number[]} pos m- Position in scoring matrix
     * @returns {object[]} children - Children positions and alignment types
     */


    alignmentChildren(pos) {
      const [i, j] = pos;
      const children = [];
      const traceback_type_status = this.T[i][j];

      if (traceback_type_status[0]) {
        // insert
        children.push({
          pos: [i, j - 1],
          tracebackType: 0
        });
      }

      if (traceback_type_status[1]) {
        // match
        children.push({
          pos: [i - 1, j - 1],
          tracebackType: 1
        });
      }

      if (traceback_type_status[2]) {
        // delete
        children.push({
          pos: [i - 1, j],
          tracebackType: 2
        });
      }

      return children;
    }
    /**
     * Runs through scoring matrix from bottom-right to top-left using traceback values to create all optimal alignments
     *
     * @returns {object[]} e.g. [{ seq1: '-4321', seq2: '54321' }]
     */


    alignmentTraceback() {
      const finalAlignments = [];
      const root = {
        next: null,
        pos: [this.seq1.length, this.seq2.length],
        alignment: {
          seq1: '',
          seq2: '' // score: this.score,

        }
      };
      let current, child, children, length, alignment, pos, t;
      current = root;

      while (current) {
        pos = current.pos;
        alignment = current.alignment; // Get children alignments

        children = this.alignmentChildren(current.pos); // Store completed alignments

        if (children.length === 0) {
          finalAlignments.push(alignment);
        }

        current = current.next;

        for (t = 0, length = children.length; t < length; t++) {
          child = children[t];
          child.alignment = {
            // -1 refers to offset between  scoring matrix and the sequence
            seq1: alignment.seq1.concat(child.tracebackType === 0 ? '-' : this.seq1[pos[0] - 1]),
            seq2: alignment.seq2.concat(child.tracebackType === 2 ? '-' : this.seq2[pos[1] - 1]) // TODO: add score for this alignment
            // score: alignment.score - this.S[pos[0]][pos[1]]

          }; // Move down a layer

          child.next = current;
          current = child;
        }
      }

      return finalAlignments;
    }

  }

  /**
   * @module stringBased
   */

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Levenshtein: Levenshtein,
    LongestCommonSubsequence: LongestCommonSubsequence,
    Gotoh: Gotoh,
    SuffixTree: SuffixTree$1,
    NGrams: NGrams,
    NeedlemanWunsch: NeedlemanWunsch
  });

  /**
   * Returns the current version of the library
   *
   * @returns {string} version string
   */

  function getVersion() {
    return version;
  } // Types

  exports.Alignment = Alignment;
  exports.Canvas = Canvas;
  exports.Chords = Chords;
  exports.DiffAlignment = DiffAlignment;
  exports.Drums = Drums;
  exports.Guitar = Guitar;
  exports.GuitarNote = GuitarNote;
  exports.Lamellophone = Lamellophone;
  exports.Matching = Matching;
  exports.Midi = Midi$2;
  exports.MidiInputManager = MidiInputManager;
  exports.MusicPiece = MusicPiece;
  exports.Note = Note$2;
  exports.NoteArray = NoteArray;
  exports.Piano = Piano;
  exports.PitchSequence = PitchSequence;
  exports.PriorityMatching = PriorityMatching;
  exports.Recording = Recording;
  exports.SimilarSections = SimilarSections;
  exports.Similarity = Similarity;
  exports.StringBased = index;
  exports.Utils = index$1;
  exports.getVersion = getVersion;
  exports.recordAudio = recordAudio;
  exports.recordMidi = recordMidi;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
