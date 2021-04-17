import { version } from '../package.json';
/**
 * Returns the current version of the library
 *
 * @returns {string} version string
 */
function getVersion() {
    return version;
}

// Types
import Note from './types/Note';
import GuitarNote from './types/GuitarNote';
import NoteArray from './types/NoteArray';
import Recording from './types/Recording';
import MusicPiece from './types/MusicPiece';
import PitchSequence from './types/PitchSequence';
// File formats
import * as Midi from './fileFormats/Midi';
// Graphics
import * as Canvas from './graphics/Canvas';
// Input
import { recordAudio } from './input/AudioRecorder';
import { recordMidi } from './input/MidiRecorder';
import MidiInputManager from './input/MidiInputManager';
// Instruments
import * as Drums from './instruments/Drums';
import * as Guitar from './instruments/Guitar';
import * as Lamellophone from './instruments/Lamellophone';
import * as Piano from './instruments/Piano';
// Alignment
import * as Alignment from './alignment/Alignment';
import * as DiffAlignment from './alignment/DiffAlignment';
// Comparison
import * as Matching from './comparison/Matching';
import * as Similarity from './comparison/Similarity';
import * as SimilarSections from './comparison/SimilarSections';
// Libraries
import * as Utils from './utils';
import * as Chords from './chords/Chords';
import * as StringBased from './stringBased';

export {
    getVersion,
    // Types
    Note,
    GuitarNote,
    NoteArray,
    Recording,
    MusicPiece,
    PitchSequence,
    // File formats
    Midi,
    // graphics
    Canvas,
    // Input
    recordAudio,
    recordMidi,
    MidiInputManager,
    // Instruments
    Drums,
    Guitar,
    Lamellophone,
    Piano,
    // Alignment
    Alignment,
    DiffAlignment,
    // Comparison
    Matching,
    Similarity,
    SimilarSections,
    // Libraries
    Utils,
    Chords,
    StringBased,
};
