import packageJson from '../package.json'

/**
 * Returns the current version of the library
 *
 * @returns {string} version string
 */
export function getVersion () {
  return packageJson.version
}

// Types
export { default as Note } from './types/Note.js'
export { default as GuitarNote } from './types/GuitarNote.js'
export { default as HarmonicaNote } from './types/HarmonicaNote.js'
export { default as NoteArray } from './types/NoteArray.js'
export { default as Recording } from './types/Recording.js'
export { default as MusicPiece } from './types/MusicPiece.js'
export { default as PitchSequence } from './types/PitchSequence.js'
// File formats
export * as Midi from './fileFormats/Midi.js'
// Graphics
export * as Canvas from './graphics/Canvas.js'
// Input
export { recordAudio } from './input/AudioRecorder.js'
export { recordMidi } from './input/MidiRecorder.js'
export { default as MidiInputManager } from './input/MidiInputManager.js'
// Instruments
export * as Drums from './instruments/Drums.js'
export * as Guitar from './instruments/Guitar.js'
export * as Lamellophone from './instruments/Lamellophone.js'
export * as Piano from './instruments/Piano.js'
// Alignment
export * as Alignment from './alignment/Alignment.js'
export * as DiffAlignment from './alignment/DiffAlignment.js'
// Comparison
export * as Matching from './comparison/Matching.js'
export * as PriorityMatching from './comparison/PriorityMatching.js'
export * as Similarity from './comparison/Similarity.js'
export * as SimilarSections from './comparison/SimilarSections.js'
// Libraries
export * as Chords from './chords/Chords.js'
export * as Utils from './utils/index.js'
export * as StringBased from './stringBased/index.js'
