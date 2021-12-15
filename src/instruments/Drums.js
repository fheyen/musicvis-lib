import { randomNormal, randomInt, group } from 'd3'
import { choose, randFloat } from '../utils/MathUtils.js'
import Note from '../types/Note.js'

/**
 * @module instruments/Drums
 */

/**
 * Drum parts
 *
 * @type {object}
 */
export const DRUM_PARTS = {
  Agogo: 'DRUM_PARTS.Agogo',
  Cabasa: 'DRUM_PARTS.Cabasa',
  Castanets: 'DRUM_PARTS.Castanets',
  China: 'DRUM_PARTS.China',
  Claves: 'DRUM_PARTS.Claves',
  Conga: 'DRUM_PARTS.Conga',
  Cowbell: 'DRUM_PARTS.Cowbell',
  Crash: 'DRUM_PARTS.Crash',
  Cuica: 'DRUM_PARTS.Cuica',
  Cymbal: 'DRUM_PARTS.Cymbal',
  Golpe: 'DRUM_PARTS.Golpe',
  Grancassa: 'DRUM_PARTS.Grancassa',
  Guiro: 'DRUM_PARTS.Guiro',
  Hand_Clap: 'DRUM_PARTS.Hand Clap',
  Hand: 'DRUM_PARTS.Hand',
  Hi_Hat: 'DRUM_PARTS.Hi Hat',
  High_Floor_Tom: 'DRUM_PARTS.High Floor Tom',
  High_Tom: 'DRUM_PARTS.High Tom',
  Kick: 'DRUM_PARTS.Kick',
  Low_Floor_Tom: 'DRUM_PARTS.Low Floor Tom',
  Low_Tom: 'DRUM_PARTS.Low Tom',
  Mid_Tom: 'DRUM_PARTS.Mid Tom',
  Pedal_Hi_Hat: 'DRUM_PARTS.Pedal Hi Hat',
  Ride: 'DRUM_PARTS.Ride',
  Right_Maraca: 'DRUM_PARTS.Right Maraca',
  Shaker: 'DRUM_PARTS.Shaker',
  Snare: 'DRUM_PARTS.Snare',
  Splash: 'DRUM_PARTS.Splash',
  Surdo: 'DRUM_PARTS.Surdo',
  Timbale: 'DRUM_PARTS.Timbale',
  Tinkle_Bell: 'DRUM_PARTS.Tinkle Bell',
  Triangle: 'DRUM_PARTS.Triangle',
  Vibraslap: 'DRUM_PARTS.Vibraslap',
  Whistle_high: 'DRUM_PARTS.Whistle high',
  Whistle_low: 'DRUM_PARTS.Whistle low',
  Woodblock_high: 'DRUM_PARTS.Woodblock high',
  Woodblock_low: 'DRUM_PARTS.Woodblock low'
}

/**
 * Drum actions
 *
 * @type {object}
 */
export const DRUM_ACTIONS = {
  choke: 'DRUM_ACTIONS.choke',
  finger: 'DRUM_ACTIONS.finger',
  hit: 'DRUM_ACTIONS.hit',
  mute: 'DRUM_ACTIONS.mute',
  return: 'DRUM_ACTIONS.return',
  scrapReturn: 'DRUM_ACTIONS.scrapReturn',
  sideStick: 'DRUM_ACTIONS.sideStick',
  slap: 'DRUM_ACTIONS.slap'
}

/**
 * Drum parts and actions
 *
 * @todo still incomplete
 * @type {object}
 */
export const DRUM_PARTS_ACTIONS = {
  Agogo_high_hit: 'DRUM_PARTS_ACTIONS.Agogo high (hit)',
  Agogo_low_hit: 'DRUM_PARTS_ACTIONS.Agogo low (hit)',
  Cabasa_return: 'DRUM_PARTS_ACTIONS.Cabasa (return)',
  Castanets_hit: 'DRUM_PARTS_ACTIONS.Castanets (hit)',
  China_choke: 'DRUM_PARTS_ACTIONS.China (choke)',
  Claves_hit: 'DRUM_PARTS_ACTIONS.Claves (hit)',
  Conga_high_slap: 'DRUM_PARTS_ACTIONS.Conga high (slap)',
  Conga_low_mute: 'DRUM_PARTS_ACTIONS.Conga low (mute)',
  Cowbell_high_tip: 'DRUM_PARTS_ACTIONS.Cowbell high (tip)',
  Crash_medium_choke: 'DRUM_PARTS_ACTIONS.Crash medium (choke)',
  Cuica_mute: 'DRUM_PARTS_ACTIONS.Cuica (mute)',
  Cuica_open: 'DRUM_PARTS_ACTIONS.Cuica (open)',
  Cymbal_hit: 'DRUM_PARTS_ACTIONS.Cymbal (hit)',
  Golpe_finger: 'DRUM_PARTS_ACTIONS.Golpe (finger)',
  Grancassa_hit: 'DRUM_PARTS_ACTIONS.Grancassa (hit)',
  Guiro_hit: 'DRUM_PARTS_ACTIONS.Guiro (hit)',
  Guiro_scrap_return: 'DRUM_PARTS_ACTIONS.Guiro (scrap-return)',
  Hand_Clap_hit: 'DRUM_PARTS_ACTIONS.Hand Clap (hit)',
  Hand_slap: 'DRUM_PARTS_ACTIONS.Hand (slap)',
  Hi_Hat_closed: 'DRUM_PARTS_ACTIONS.Hi-Hat (closed)',
  Hi_Hat_open: 'DRUM_PARTS_ACTIONS.Hi-Hat (open)',
  High_Floor_Tom_hit: 'DRUM_PARTS_ACTIONS.High Floor Tom (hit)',
  High_Tom_hit: 'DRUM_PARTS_ACTIONS.High Tom (hit)',
  Kick_hit: 'DRUM_PARTS_ACTIONS.Kick (hit)',
  Low_Floor_Tom_hit: 'DRUM_PARTS_ACTIONS.Low Floor Tom (hit)',
  Low_Tom_hit: 'DRUM_PARTS_ACTIONS.Low Tom (hit)',
  Mid_Tom_hit: 'DRUM_PARTS_ACTIONS.Mid Tom (hit)',
  Pedal_Hi_Hat_hit: 'DRUM_PARTS_ACTIONS.Pedal Hi-Hat (hit)',
  Ride_choke: 'DRUM_PARTS_ACTIONS.Ride (choke)',
  Right_Maraca_return: 'DRUM_PARTS_ACTIONS.Right Maraca (return)',
  Shaker_return: 'DRUM_PARTS_ACTIONS.Shaker (return)',
  Snare_hit: 'DRUM_PARTS_ACTIONS.Snare (hit)',
  Snare_side_stick: 'DRUM_PARTS_ACTIONS.Snare (side stick)',
  Splash_choke: 'DRUM_PARTS_ACTIONS.Splash (choke)',
  Surdo_hit: 'DRUM_PARTS_ACTIONS.Surdo (hit)',
  Surdo_mute: 'DRUM_PARTS_ACTIONS.Surdo (mute)',
  Timbale_high_hit: 'DRUM_PARTS_ACTIONS.Timbale high (hit)',
  Timbale_low_hit: 'DRUM_PARTS_ACTIONS.Timbale low (hit)',
  Tinkle_Bell_hit: 'DRUM_PARTS_ACTIONS.Tinkle Bell (hit)',
  Triangle_hit: 'DRUM_PARTS_ACTIONS.Triangle (hit)',
  Triangle_mute: 'DRUM_PARTS_ACTIONS.Triangle (mute)',
  Vibraslap_hit: 'DRUM_PARTS_ACTIONS.Vibraslap (hit)',
  Whistle_high_hit: 'DRUM_PARTS_ACTIONS.Whistle high (hit)',
  Whistle_low_hit: 'DRUM_PARTS_ACTIONS.Whistle low (hit)',
  Woodblock_high_hit: 'DRUM_PARTS_ACTIONS.Woodblock high (hit)',
  Woodblock_low_hit: 'DRUM_PARTS_ACTIONS.Woodblock low (hit)'
}

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
export const drumPitchReplacementMapMPS850 = new Map([
  // Crash 1
  [49, { repPitch: 49, zone: 1, order: 10, line: -1, shape: 'o', label: 'CC1', name: 'Crash Cymbal 1' }],
  [55, { repPitch: 49, zone: 2, order: 11, line: -1, shape: 'o', label: 'CC1', name: 'Crash Cymbal 1' }],
  // Crash 2
  [52, { repPitch: 57, zone: 1, order: 20, line: 0, shape: 'o', label: 'CC2', name: 'Crash Cymbal 2' }],
  [57, { repPitch: 57, zone: 2, order: 21, line: 0, shape: 'o', label: 'CC2', name: 'Crash Cymbal 2' }],
  // Hi-hat stick
  [22, { repPitch: 46, zone: 1, order: 30, line: 0, shape: '<>', label: 'HHS', name: 'Hi-Hat' }],
  [26, { repPitch: 46, zone: 2, order: 31, line: 0, shape: '<>', label: 'HHS', name: 'Hi-Hat' }],
  [42, { repPitch: 46, zone: 3, order: 32, line: 0, shape: '<>', label: 'HHS', name: 'Hi-Hat' }],
  [46, { repPitch: 46, zone: 4, order: 33, line: 0, shape: '<>', label: 'HHS', name: 'Hi-Hat' }],
  // Hi-hat pedal
  [44, { repPitch: 44, zone: 1, order: 40, line: 9, shape: 'o', label: 'HHP', name: 'Hi-Hat Pedal' }],
  // Ride
  [51, { repPitch: 51, zone: 1, order: 50, line: 1, shape: 'x', label: 'Rd', name: 'Ride Cymbal' }],
  [53, { repPitch: 51, zone: 2, order: 51, line: 1, shape: 'x', label: 'Rd', name: 'Ride Cymbal' }],
  [59, { repPitch: 51, zone: 3, order: 52, line: 1, shape: 'x', label: 'Rd', name: 'Ride Cymbal' }],
  // Snare
  [38, { repPitch: 38, zone: 1, order: 60, line: 4, shape: 'o', label: 'SN', name: 'Snare' }],
  [40, { repPitch: 38, zone: 2, order: 61, line: 4, shape: 'o', label: 'SN', name: 'Snare' }],
  // Tom 1
  [48, { repPitch: 48, zone: 1, order: 90, line: 2, shape: 'o', label: 'T1', name: 'Tom 1' }],
  [50, { repPitch: 48, zone: 2, order: 91, line: 2, shape: 'o', label: 'T1', name: 'Tom 1' }],
  // Tom 2
  [45, { repPitch: 45, zone: 1, order: 100, line: 3, shape: 'o', label: 'T2', name: 'Tom 2' }],
  [47, { repPitch: 45, zone: 2, order: 101, line: 3, shape: 'o', label: 'T2', name: 'Tom 2' }],
  // Stand tom 1
  [43, { repPitch: 43, zone: 1, order: 70, line: 5, shape: 'o', label: 'ST1', name: 'Stand Tom 1' }],
  [58, { repPitch: 43, zone: 2, order: 71, line: 5, shape: 'o', label: 'ST1', name: 'Stand Tom 1' }],
  // Stand tom 2
  [39, { repPitch: 41, zone: 1, order: 80, line: 6, shape: 'o', label: 'ST2', name: 'Stand Tom 2' }],
  [41, { repPitch: 41, zone: 2, order: 81, line: 6, shape: 'o', label: 'ST2', name: 'Stand Tom 2' }],
  // Bass drum
  [35, { repPitch: 36, zone: 1, order: 110, line: 8, shape: 'o', label: 'BD', name: 'Bass Drum' }],
  [36, { repPitch: 36, zone: 2, order: 111, line: 8, shape: 'o', label: 'BD', name: 'Bass Drum' }]
])

/**
 * Generates a variation of an array of notes by adding, removing or changing notes
 *
 * @param {Note[]} data array of notes
 * @param {number} deviation width of the Gauss kernel
 * @param {number} pAdd probability of adding a note after each note
 * @param {number} pRemove probability of removing each note
 * @returns {Note[]} variated Note array
 */
export function generateDrumVariation (data, deviation = 1, pAdd = 0.1, pRemove = 0.1) {
  // Only use pitches that occur in the GT data
  const usedPitches = new Set()
  for (const note of data) {
    usedPitches.add(note.pitch)
  }
  const pitches = [...usedPitches]
  // Create variation by adding, removing, and shifting notes
  const randVelocity = randomInt(15, 128)
  const randTime = randomNormal(0, deviation)
  const variation = []
  for (const note of data) {
    // Add and remove notes at random
    if (randFloat(0, 1) < pAdd) {
      // Add another note
      const start = note.start + randFloat(0, 1)
      const end = start + randFloat(0, 1)
      const velocity = randVelocity()
      const pitch = choose(pitches)
      variation.push(new Note(
        pitch,
        start,
        velocity,
        0,
        end
      ))
    }
    if (randFloat(0, 1) < pRemove) {
      // Remove note (just add nothing to varation)
    } else {
      // Shift timings at random
      const start = note.start + randTime()
      const end = note.end + randTime()
      // Get new note
      const newNote = Note.from(note)
      newNote.start = Math.min(start, end)
      newNote.end = Math.max(start, end)
      variation.push(newNote)
    }
  }
  // Sort notes by start just in case
  variation.sort((a, b) => a.start - b.start)
  return variation
}

/**
 * Replaces pitches based on replacementMap
 *
 * @param {Note[]} notes notes
 * @param {Map} replacementMap a map pitch->replacementPitch
 * @returns {Notes[]} notes with replaced pitches
 * @throws {'No replacement map given!'} when replacementMap is missing
 */
export function simplifyDrumPitches (notes, replacementMap) {
  if (!replacementMap || !(replacementMap instanceof Map)) {
    throw new Error('No replacement map given!')
  }
  const errors = new Set()
  const simplified = notes.map(note => {
    const oldPitch = note.pitch
    let newPitch = oldPitch
    if (!replacementMap.has(oldPitch)) {
      errors.add(oldPitch)
    } else {
      newPitch = replacementMap.get(oldPitch).repPitch
    }
    const newNote = Note.from({ ...note, pitch: newPitch })
    return newNote
  })
  // TODO: return errors, do not log! also easier to test
  // if (errors.size > 0) {
  //     console.warn(`Cannot replace all pitches, replacementMap misses entry for these pitches:`);
  //     console.log(Array.from(errors));
  // }
  return simplified
  // return { simplified, errors };
}

/**
 * Returns a Map:pitch->yPosIndex for views to lookup which row
 * a pitch has to be drawn in
 *
 * @param {Map} replacementMap a pitch replacement map
 * @returns {Map} Map:pitch->yPosIndex
 */
export function getPitch2PositionMap (replacementMap) {
  const result = new Map()
  const uniqeRows = [...group([...replacementMap], d => d[1].repPitch)]
  uniqeRows.sort((a, b) => a[1][0][1].order - b[1][0][1].order)
  for (const [index, d] of uniqeRows.entries()) {
    result.set(d[0], index)
  }
  return result
}
