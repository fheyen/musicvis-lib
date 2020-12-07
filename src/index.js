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
// comparison
import * as Alignment from './comparison/Alignment';
import * as Similarity from './comparison/Similarity';
import * as Matching from './comparison/Matching';
// libraries
import * as Midi from './Midi';
import * as Utils from './utils';
import * as Chords from './Chords';
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
    // comparison
    Alignment,
    Similarity,
    Matching,
    // libraries
    Midi,
    Utils,
    Chords,
    StringBased,
};
