import { countOnesOfBinary, roundToNDecimals } from './MathUtils.js'
import { binarySearch } from './ArrayUtils.js'
import * as d3 from "d3"

/**
 * @module utils/MusicUtils
 */

/**
 * Converts beats per minute (BPM) to seconds per beat
 *
 * @param {number} bpm tempo in beats per minute (BPM)
 * @returns {number} seconds per beat
 */
export function bpmToSecondsPerBeat (bpm) {
  return 1 / (bpm / 60)
}

/**
 * Converts seconds per beat to beats per minute (BPM)
 *
 * @param {number} seconds seconds per beat
 * @returns {number} beat per minute (BPM)
 */
export function secondsPerBeatToBpm (seconds) {
  return 60 * 1 / seconds
}

/**
 * Estimates the tempo in beats per minute (BPM) from an array of note onsets
 * in seconds.
 * Returns NaN when noteOnsets.length == 0
 * @param {number[]} noteOnsets note onsets in seconds
 * @returns {number} estimated BPM
 */
export function estimateBpmByMedian (noteOnsets) {
  const deltas = noteOnsets.slice(1).map((d, i) => d - noteOnsets[i])
  const median = d3.median(deltas)
  return secondsPerBeatToBpm(median)
}

/**
 * Maps any frequency (in Hz) to an approximate MIDI note number. Result can be
 * rounded to get to the closest MIDI note or used as is for a sound in between
 * two notes
 *
 * @param {number} frequency a frequency in Hz
 * @returns {number} MIDI note number (not rounded)
 */
export function freqToApproxMidiNr (frequency) {
  return 12 * Math.log2(frequency / 440) + 69
}

/**
 * Maps any MIDI number (can be in-between, like 69.5 for A4 + 50 cents) to its
 * frequency
 *
 * @param {number} midi MIDI note number
 * @returns {number} frequency in Hz
 */
export function midiToFrequency (midi) {
  return 2 ** ((midi - 69) / 12) * 440
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
export function chordToInteger (notes) {
  let value = 0x0
  for (const note of notes) {
    const chroma = note.pitch % 12
    // eslint-disable-next-line no-bitwise
    const noteInteger = 1 << chroma
    // eslint-disable-next-line no-bitwise
    value = value | noteInteger
  }
  return value
}

/**
 * Takes two chord integer representations from chordToInteger() and computes
 * the Jaccard index
 *
 * @param {number} chord1 chord as integer representation
 * @param {number} chord2 chord as integer representation
 * @returns {number} Jackard index, from 0 for different to 1 for identical
 */
export function chordIntegerJaccardIndex (chord1, chord2) {
  if (chord1 === chord2) {
    return 1
  }
  // eslint-disable-next-line no-bitwise
  const intersection = chord1 & chord2
  // eslint-disable-next-line no-bitwise
  const union = chord1 | chord2
  const intersectionSize = countOnesOfBinary(intersection)
  const unionSize = countOnesOfBinary(union)
  return intersectionSize / unionSize
}

/*
 * noteTypeDurationRatios
 * 1 = whole note, 1/2 = half note, ...
 *
 * With added dots:
 * o. has duration of 1.5, o.. 1.75, ...
 */
const noteTypeDurationRatios = []
const baseDurations = [2, 1, 1 / 2, 1 / 4, 1 / 8, 1 / 16, 1 / 32, 1 / 64]
for (const d of baseDurations) {
  for (let dots = 0; dots < 4; dots++) {
    let duration = d
    let toAdd = d
    for (let dot = 0; dot < dots; dot++) {
      // Each dot after the note adds half of the one before
      toAdd /= 2
      duration += toAdd
    }
    noteTypeDurationRatios.push({
      type: d,
      dots,
      duration
    })
  }
}
noteTypeDurationRatios.sort((a, b) => a.duration - b.duration)

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
export function noteDurationToNoteType (duration, bpm) {
  const quarterDuration = bpmToSecondsPerBeat(bpm)
  const ratio = duration / quarterDuration / 4
  // TODO: round to finest representable step?

  // Binary search
  return binarySearch(noteTypeDurationRatios, ratio, d => d.duration)
}

/**
 * Circle of 5ths as
 * [midiNr, noteAsSharp, noteAsFlat, numberOfSharps, numberOfFlats]
 *
 * @see https://en.wikipedia.org/wiki/Circle_of_fifths
 * @type {any[][]}
 */
export const CIRCLE_OF_5THS = [
  [0, 'C', 'C', 0, 0],
  [7, 'G', 'G', 1, 0],
  [2, 'D', 'D', 2, 0],
  [9, 'A', 'A', 3, 0],
  [4, 'E', 'E', 4, 0],
  [11, 'B', 'B', 5, 7],
  [6, 'F#', 'Gb', 6, 6],
  [1, 'C#', 'Db', 7, 5],
  [8, 'G#', 'Ab', 0, 4],
  [3, 'D#', 'Eb', 0, 3],
  [10, 'A#', 'Bb', 0, 2],
  [5, 'F', 'F', 0, 1]
]

/**
 * Maps number of semitones to interval name
 * m - minor
 * M - major
 * P - perfect
 * aug - augmented
 *
 * @type {Map<number,string>}
 */
export const INTERVALS = new Map([
  [1, 'unison'],
  [1, 'm2'],
  [2, 'M2'],
  [3, 'm3'],
  [4, 'M3'],
  [5, 'P4'],
  [6, 'aug4'],
  [7, 'P5'],
  [8, 'm6'],
  [9, 'M6'],
  [10, 'm7'],
  [11, 'M7'],
  [12, 'P8']
])

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
export function metronomeTrackFromTempoAndMeter (tempo = 120, meter = [4, 4], duration = 60) {
  const track = []
  const secondsPerBeat = bpmToSecondsPerBeat(tempo) / (meter[1] / 4)
  let currentTime = 0
  while (currentTime <= duration) {
    for (let beat = 0; beat < meter[0]; beat++) {
      track.push({
        time: roundToNDecimals(currentTime, 4),
        accent: beat % meter[0] === 0
      })
      currentTime += secondsPerBeat
      if (currentTime > duration) {
        return track
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
export function metronomeTrackFromMusicPiece (musicPiece, tempoFactor = 1) {
  const { duration, tempos, timeSignatures } = musicPiece
  const track = []
  let currentTime = 0
  // Time signatures
  const initialTimeSig = timeSignatures[0].signature ?? [4, 4]
  let [beatCount, beatType] = initialTimeSig
  const timeSigsTodo = timeSignatures.slice(1)
  // Tempi
  const initialTempo = tempos[0].bpm ?? 120
  let secondsPerBeat = bpmToSecondsPerBeat(initialTempo) / (beatType / 4)
  const temposTodo = tempos.slice(1)
  while (currentTime <= duration) {
    // Always use the most recent tempo and meter
    const lookahead = currentTime + secondsPerBeat
    if (timeSigsTodo.length > 0 && timeSigsTodo[0].time <= lookahead) {
      // console.log(
      //     'timesig change to', timeSigsTodo[0].signature,
      //     'after', track.length,
      //     'beeps, at', currentTime);
      [beatCount, beatType] = timeSigsTodo[0].signature
      timeSigsTodo.shift()
    }
    if (temposTodo.length > 0 && temposTodo[0].time <= lookahead) {
      // console.log(
      //     'tempo change to', temposTodo[0].bpm,
      //     'after', track.length,
      //     'beeps, at', currentTime);
      secondsPerBeat = bpmToSecondsPerBeat(temposTodo[0].bpm) / (beatType / 4)
      temposTodo.shift()
    }
    for (let beat = 0; beat < beatCount; beat++) {
      track.push({
        time: roundToNDecimals(currentTime / tempoFactor, 3),
        accent: beat === 0
      })
      currentTime += secondsPerBeat
      if (currentTime > duration) {
        return track
      }
    }
  }
  return track
}
