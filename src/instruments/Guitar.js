import { randFloat } from '../utils/MathUtils';
import { getMidiNoteByNr, getMidiNoteByLabel } from '../fileFormats/Midi';
import GuitarNote from '../types/GuitarNote';
import { randomInt, extent } from 'd3';
import { arrayShallowEquals } from '../utils/ArrayUtils';

/**
 * @module instruments/Guitar
 */

/**
 * Represents a tuning of a fretted string instrument.
 */
export class StringedTuning {
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
export const stringedTunings = new Map([
    ['Guitar', new Map([
        [6, [
            new StringedTuning('E stand.', ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']),
            new StringedTuning('Drop D', ['D2', 'A2', 'D3', 'G3', 'B3', 'E4']),
            new StringedTuning('Drop C', ['C2', 'G2', 'C3', 'F3', 'A3', 'D4']),
            new StringedTuning('1/2 down', ['D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4']),
            new StringedTuning('1 down', ['D2', 'G2', 'C3', 'F3', 'A3', 'D4']),
            new StringedTuning('1 1/2 down', ['C#2', 'F#2', 'B2', 'E3', 'G#3', 'C#4']),
            new StringedTuning('2 down', ['C2', 'F2', 'A#2', 'D#3', 'G3', 'C4']),
            new StringedTuning('DADGAG', ['D2', 'A2', 'D3', 'G3', 'A3', 'D4']),
        ]],
        [7, [
            new StringedTuning('B stand.', ['B1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4']),
            new StringedTuning('Drop A', ['A1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4']),
            new StringedTuning('1/2 down', ['A#1', 'D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4']),
            new StringedTuning('1 down', ['A1', 'D2', 'G2', 'C3', 'F3', 'A3', 'D4']),
            new StringedTuning('1 1/2 down', ['G#1', 'C#2', 'F#2', 'B2', 'E3', 'G#3', 'C#4']),
            new StringedTuning('2 down', ['G1', 'C2', 'F2', 'A#2', 'D#3', 'G3', 'C4']),
        ]],
        [8, [
            new StringedTuning('F# stand.', ['F#1', 'B1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4']),
            new StringedTuning('Drop E', ['E1', 'B1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4']),
            new StringedTuning('1/2 down', ['F1', 'A#1', 'D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4']),
            new StringedTuning('1 down', ['E1', 'A1', 'D2', 'G2', 'C3', 'F3', 'A3', 'D4']),
            new StringedTuning('1 1/2 down', ['D#1', 'G#1', 'C#2', 'F#2', 'B2', 'E3', 'G#3', 'C#4']),
            new StringedTuning('2 down', ['D1', 'G1', 'C2', 'F2', 'A#2', 'D#3', 'G3', 'C4']),
        ]],
    ])],
    ['Bass', new Map([
        [4, [
            new StringedTuning('E stand.', ['E1', 'A1', 'D2', 'G2']),
            new StringedTuning('Drop D', ['D1', 'A1', 'D2', 'G2']),
            new StringedTuning('1/2 down', ['D#1', 'G#1', 'C#2', 'F#2']),
            new StringedTuning('1 down', ['D1', 'G1', 'C2', 'F2']),
            new StringedTuning('1 1/2 down', ['C#1', 'F#1', 'B1', 'E2']),
            new StringedTuning('2 down', ['C1', 'F1', 'A#1', 'D#2']),
        ]],
        [5, [
            new StringedTuning('B stand.', ['B0', 'E1', 'A1', 'D2', 'G2']),
            new StringedTuning('Drop A', ['A0', 'D1', 'A1', 'D2', 'G2']),
            new StringedTuning('1/2 down', ['A#0', 'D#1', 'G#1', 'C#2', 'F#2']),
            new StringedTuning('1 down', ['A0', 'D1', 'G1', 'C2', 'F2']),
            new StringedTuning('1 1/2 down', ['G#0', 'C#1', 'F#1', 'B1', 'E2']),
            new StringedTuning('2 down', ['G0', 'C1', 'F1', 'A#1', 'D#2']),
        ]],
        [6, [
            new StringedTuning('F# stand.', ['F#0', 'B0', 'E1', 'A1', 'D2', 'G2']),
            new StringedTuning('Drop E', ['E0', 'A0', 'D1', 'A1', 'D2', 'G2']),
            new StringedTuning('1/2 down', ['F0', 'A#0', 'D#1', 'G#1', 'C#2', 'F#2']),
            new StringedTuning('1 down', ['E1', 'A0', 'D1', 'G1', 'C2', 'F2']),
            new StringedTuning('1 1/2 down', ['D#0', 'G#0', 'C#1', 'F#1', 'B1', 'E2']),
            new StringedTuning('2 down', ['D0', 'G0', 'C1', 'F1', 'A#1', 'D#2']),
        ]],
    ])],
    ['Ukulele', new Map([
        [4, [
            new StringedTuning('Hawaii', ['G4', 'C4', 'E4', 'A4']),
            new StringedTuning('Low G', ['G3', 'C4', 'E4', 'A4']),
            new StringedTuning('D-tuning', ['A4', 'D4', 'F#4', 'B4']),
            new StringedTuning('Canadian', ['A3', 'D4', 'F#4', 'B4']),
            new StringedTuning('Bariton', ['D3', 'G3', 'B3', 'E4']),
        ]],
    ])],
]);

/**
 * For Notes that have a guitar string encoded in their channel, this function
 * allows to convert them to a GuitarNote.
 *
 * @param {Note} note a Note that has the guitar string stored in its channel
 *      e.g. 0 to 5 for a six string
 * @param {StringedTuning} tuning tuning
 * @returns {GuitarNote} a GuitarNote
 */
export function guitarNoteFromNote(note, tuning) {
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
export function getTuningFromPitches(pitches) {
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
export function getTuningPitchRange(tuning, fretCount = 24) {
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
export const stringColors = [
    '#888',
    '#d122e9',
    '#31eb1c',
    '#f37c14',
    '#10edfc',
    '#ffeb09',
    '#ff210d',
    'silver',
    'gold',
];

/**
 * Returns the pitch of a note at a given fretboard position.
 *
 * @param {number} string string
 * @param {number} fret fret
 * @param {StringedTuning} tuning tuning
 * @returns {number} pitch
 */
export function getPitchFromFretboardPos(string, fret, tuning) {
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
export function getNoteInfoFromFretboardPos(string, fret, tuning) {
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
export function getFretboardPositionsFromPitch(pitch, tuning, fretCount) {
    const positions = [];
    const stringCount = tuning.stringCount;
    for (let string = 0; string < stringCount; string++) {
        const openPitch = tuning.pitches[string];
        // Rule out strings where pitch is lower than open string
        if (pitch < openPitch) {
            continue;
        }
        // Rule out strings where pitch is higher than highest fret
        if (pitch > openPitch + fretCount) {
            continue;
        }
        positions.push({
            // Convert so string 1 is treble
            string: stringCount - string,
            fret: pitch - openPitch,
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
export function getFretboardPositionsFromNoteName(name, tuning, fretCount = 24) {
    const n = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    if (!n.includes(name)) { return null; }
    const positions = [];
    const lowestPitch = n.indexOf(name);
    const stringCount = tuning.stringCount;
    for (let string = 0; string < stringCount; string++) {
        // First fret where this note appears
        const openPitch = tuning.pitches[string];
        let fret = lowestPitch - (openPitch % 12);
        if (fret < 0) {
            fret += 12;
        }
        while (fret <= fretCount) {
            positions.push({
                // Convert so string 1 is treble
                string: stringCount - string,
                fret,
            });
            // Go to next octave
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
export function generateExampleData(startTime = 0, count = 50, tuning) {
    let currentTime = startTime;
    return Array.from({ length: count })
        .map(() => {
            const start = currentTime + randFloat(0, 1);
            currentTime = start + randFloat(0, 1);
            const string = randomInt(1, 7)();
            const fret = randomInt(0, 25)();
            const pitch = getPitchFromFretboardPos(string, fret, tuning);
            const velocity = randomInt(15, 127)();
            return new GuitarNote(
                pitch,
                start,
                velocity,
                string,
                currentTime,
                string,
                fret,
            );
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
export function fretboardPositionsFromMidi(notes, tuning, fretCount = 24) {
    if (!notes || notes.length === 0) { return []; }
    if (!tuning || !tuning.pitches) {
        console.warn('Invalid tuning parameter!');
        return [];
    }
    // Sort notes that cannot be played out in advance for better performance
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
        const positions = getFretboardPositionsFromPitch(note.pitch, tuning, 24);
        // Choose best position
        // TODO: improve this to make it easier to play, take closest postion to prior one
        let bestPos = positions[0];
        for (const pos of positions) {
            if (pos.fret < bestPos.fret) {
                bestPos = pos;
            }
        }
        const { string, fret } = bestPos;
        result.push(GuitarNote.fromNote(note, string, fret));
    }
    // Give advice on transposing for better results
    if (errorPitches.length > 0) {
        const [minDataPitch, maxDataPitch] = extent(notes, d => d.pitch);
        let advice = '';
        if (minDataPitch < minPitch) {
            advice += `Transpose by ${minPitch - minDataPitch} semitones`;
        }
        if (maxPitch < maxDataPitch) {
            advice += `Transpose by ${maxPitch - maxDataPitch} semitones`;
        }
        console.warn(
            `Cannot find a fretboard position for ${errorPitches.length} pitches, try another tuning instead:\n`,
            errorPitches,
            `\nCurrent tuning's pitch range is ${minPitch} - ${maxPitch}`,
            `\ndata pitch range is ${minDataPitch} - ${maxDataPitch}\n`,
            advice,
        );
    }
    return result;
}

// /**
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
