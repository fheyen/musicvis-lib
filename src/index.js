// Types
import Note from './types/Note';
import GuitarNote from './types/GuitarNote';
import NoteArray from './types/NoteArray';
import Recording from './types/Recording';
import MusicPiece from './types/MusicPiece';
import PitchSequence from './types/PitchSequence';
import Fingers from './types/Fingers';
// File formats
import { preprocessMidiFileData } from './fileFormats/MidiParser';
import { preprocessMusicXmlData } from './fileFormats/MusicXmlParser';
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
import * as StringedFingering from './instruments/StringedFingering';
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
    // Types
    Note,
    GuitarNote,
    NoteArray,
    Recording,
    MusicPiece,
    PitchSequence,
    Fingers,
    // File formats
    Midi,
    preprocessMidiFileData,
    preprocessMusicXmlData,
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
    StringedFingering,
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
