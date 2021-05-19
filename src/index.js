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




// // Types
// import Note from './types/Note';
// import GuitarNote from './types/GuitarNote';
// import NoteArray from './types/NoteArray';
// import Recording from './types/Recording';
// import MusicPiece from './types/MusicPiece';
// import PitchSequence from './types/PitchSequence';
// // File formats
// import * as Midi from './fileFormats/Midi';
// // Graphics
// import * as Canvas from './graphics/Canvas';
// // Input
// import { recordAudio } from './input/AudioRecorder';
// import { recordMidi } from './input/MidiRecorder';
// import MidiInputManager from './input/MidiInputManager';
// // Instruments
// import * as Drums from './instruments/Drums';
// import * as Guitar from './instruments/Guitar';
// import * as Lamellophone from './instruments/Lamellophone';
// import * as Piano from './instruments/Piano';
// // Alignment
// import * as Alignment from './alignment/Alignment';
// import * as DiffAlignment from './alignment/DiffAlignment';
// // Comparison
// import * as Matching from './comparison/Matching';
// import * as PriorityMatching from './comparison/PriorityMatching';
// import * as Similarity from './comparison/Similarity';
// import * as SimilarSections from './comparison/SimilarSections';
// // Libraries
// import * as Utils from './utils';
// import * as Chords from './chords/Chords';
// import * as StringBased from './stringBased';

// export {
//     getVersion,
//     // Types
//     Note,
//     GuitarNote,
//     NoteArray,
//     Recording,
//     MusicPiece,
//     PitchSequence,
//     // File formats
//     Midi,
//     // graphics
//     Canvas,
//     // Input
//     recordAudio,
//     recordMidi,
//     MidiInputManager,
//     // Instruments
//     Drums,
//     Guitar,
//     Lamellophone,
//     Piano,
//     // Alignment
//     Alignment,
//     DiffAlignment,
//     // Comparison
//     Matching,
//     PriorityMatching,
//     Similarity,
//     SimilarSections,
//     // Libraries
//     Utils,
//     Chords,
//     StringBased,
// };
