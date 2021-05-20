import { version } from '../package.json';
/**
 * Returns the current version of the library
 *
 * @returns {string} version string
 */
export function getVersion() {
    return version;
}

// Types
export { default as Note } from './types/Note';
export { default as GuitarNote } from './types/GuitarNote';

export { default as NoteArray } from './types/NoteArray';
export { default as Recording } from './types/Recording';
export { default as MusicPiece } from './types/MusicPiece';
export { default as PitchSequence } from './types/PitchSequence';
// File formats
export * as Midi from './fileFormats/Midi';
// Graphics
export * as Canvas from './graphics/Canvas';
// Input
export { recordAudio } from './input/AudioRecorder';
export { recordMidi } from './input/MidiRecorder';
export { default as MidiInputManager } from './input/MidiInputManager';
// Instruments
export * as Drums from './instruments/Drums';
export * as Guitar from './instruments/Guitar';
export * as Lamellophone from './instruments/Lamellophone';
export * as Piano from './instruments/Piano';
// Alignment
export * as Alignment from './alignment/Alignment';
export * as DiffAlignment from './alignment/DiffAlignment';
// Comparison
export * as Matching from './comparison/Matching';
export * as PriorityMatching from './comparison/PriorityMatching';
export * as Similarity from './comparison/Similarity';
export * as SimilarSections from './comparison/SimilarSections';
// Libraries
export * as Utils from './utils';
export * as Chords from './chords/Chords';
export * as StringBased from './stringBased';
