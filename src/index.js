// types
import Note from './types/Note';
import GuitarNote from './types/GuitarNote';
import NoteArray from './types/NoteArray';
import Recording from './types/Recording';
// audio output
import Metronome from './audioOutput/Metronome';
import Player from './audioOutput/Player';
// file formats
import { preprocessMidiFileData } from './fileFormats/MidiParser';
import { preprocessMusicXmlData } from './fileFormats/MusicXmlParser';
// input
import { recordAudio } from './input/AudioRecorder';
import { recordMidi } from './input/MidiRecorder';
import MidiInputManager from './input/MidiInputManager';
// instruments
import * as Drums from './instruments/Drums';
import * as Guitar from './instruments/Guitar';
import * as Piano from './instruments/Piano';
import * as StringedFingering from './instruments/StringedFingering';
// libraries
import * as Midi from './Midi';
import * as Utils from './utils';
import * as Chords from './Chords';
import * as Alignment from './Alignment';
import * as Similarity from './Similarity';
import * as Matching from './Matching';
import * as StringBased from './stringBased';

export {
    // types
    Note,
    GuitarNote,
    NoteArray,
    Recording,
    // audio output
    Metronome,
    Player,
    // file formats
    preprocessMidiFileData,
    preprocessMusicXmlData,
    // input
    recordAudio,
    recordMidi,
    MidiInputManager,
    // instruments
    Drums,
    Guitar,
    Piano,
    StringedFingering,
    // libraries
    Midi,
    Utils,
    Chords,
    Alignment,
    Similarity,
    Matching,
    StringBased,
};
