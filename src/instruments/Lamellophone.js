import { difference, extent, intersection, max } from 'd3';
import { getMidiNoteByLabel, getMidiNoteByNr } from '../Midi';
import { detectChordsByExactStart } from '../Chords';
import Note from '../types/Note';
import { bpmToSecondsPerBeat } from '../utils/MiscUtils';

/**
 * @module instruments/Lamellophone
 */

/**
 * Represents Lamellophone tunings
 */
export class LamellophoneTuning {
    /**
     * Represents a tuning of lamellophone.
     *
     * @param {string} name name
     * @param {string[]} notes array of notes, same order as on instrument
     *      e.g. [..., 'D4','C4', 'F#4', ...]
     */
    constructor(name, notes) {
        this.name = name;
        this.notes = notes;
        this.short = notes.join(' ');
        this.pitches = notes.map(note => getMidiNoteByLabel(note).pitch);
        this.pitchesSorted = this.pitches
            .slice()
            .sort((a, b) => a - b);
        this.keyCount = notes.length;
    }

    /**
     * Returns an array of the tuning's notes as number representation:
     * Tuning notes:  C4, D4, ... C5, D5, ... C6,  D6
     * Number format: 1,  2,  ... 1°, 2°, ... 1°°, 2°°
     *
     * @returns {string[]} array with tuning notes in number representation
     */
    getNumbers() {
        const pitches = this.pitchesSorted;
        const numbers = new Map();
        for (let i = 0; i < pitches.length; i++) {
            const pitch = pitches[i];
            let number = i + 1;
            let ending = '';
            let lowerOctave = pitch - 12;
            while (lowerOctave > 0 && numbers.has(lowerOctave)) {
                number = numbers.get(lowerOctave).number;
                ending += '°';
                lowerOctave -= 12;
            }
            numbers.set(pitch, { number, numberString: `${number}${ending}` });
        }
        return Array.from(numbers.values())
            .map(d => d.numberString);
    }

    /**
     * Returns an array of the tuning's notes as letter representation:
     * Tuning notes:  C4, D4, ... C5, D5, ... C6,  D6
     * Number format: C,  D,  ... C°, D°, ... C°°, D°°
     *
     * @returns {string[]} array with tuning notes in letter representation
     */
    getLetters() {
        const pitches = this.pitchesSorted;
        const numbers = new Map();
        for (let i = 0; i < pitches.length; i++) {
            const pitch = pitches[i];
            let number = i + 1;
            let ending = '';
            let lowerOctave = pitch - 12;
            while (lowerOctave > 0 && numbers.has(lowerOctave)) {
                number = numbers.get(lowerOctave).number;
                ending += '°';
                lowerOctave -= 12;
            }
            const letter = getMidiNoteByNr(pitch).name;
            numbers.set(pitch, { number, letterString: `${letter}${ending}` });
        }
        return Array.from(numbers.values()).map(d => d.letterString);
    }

    /**
     * Returns note pitches or letters in the order that they appear on the
     * instrument
     *
     * @param {boolean} returnPitches true: returns pitches, false: returns
     *      note letters
     * @returns {number[]|string[]} notes in the instuments' order
     */
    // getNotesInInstrumentOrder(returnPitches = true) {
    //     const notes = returnPitches ? this.pitches : this.notes;
    //     const result = [];
    //     for (let i = 0; i < notes.length; i++) {
    //         const p = notes[i];
    //         if (i % 2 === 0) {
    //             result.push(p);
    //         } else {
    //             result.unshift(p);
    //         }
    //     }
    //     return result;
    // }
}

/**
 * Tunings.
 * Notes are in the same order as on the instrument
 */
export const lamellophoneTunings = new Map([
    ['Kalimba', new Map([
        [
            '9 A Minor',
            // a°  c°°  c°  a°  a  f°  e°  e°°  h°
            new LamellophoneTuning('9 A Minor', ['A5', 'C6', 'C5', 'A5', 'A4', 'F5', 'E5', 'E6', 'B5']),
        ],
        [
            '17 C Major',
            new LamellophoneTuning('17 C Major', ['D6', 'B5', 'G5', 'E5', 'C5', 'A4', 'F4', 'D4', 'C4', 'E4', 'G4', 'B4', 'D5', 'F5', 'A5', 'C6', 'E6']),
            // new LamellophoneTuning('17 C Major', ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6']),
        ],
        [
            '21 C Major',
            new LamellophoneTuning('21 C Major', ['D6', 'B5', 'G5', 'E5', 'C5', 'A4', 'F4', 'D4', 'B3', 'G3', 'F3', 'A3', 'C4', 'E4', 'G4', 'B4', 'D5', 'F5', 'A5', 'C6', 'E6']),
            // new LamellophoneTuning('21 C Major', ['F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6']),
        ],
    ])],
]);


/**
 * Parses a tab into notes
 *
 * @param {string} tab in letter format
 * @param {LamellophoneTuning} tuning tuning
 * @param {number} tempo tempo in bpm
 * @returns {Note[]} notes
 */
export function convertTabToNotes(tab, tuning, tempo = 120) {
    if (!tab || !tab.length) { return []; }
    // Create a mapping symbol->pitch
    const symbolToPitchMap = new Map();
    const symbols = tuning.getLetters();
    for (let i = 0; i < tuning.keyCount; i++) {
        symbolToPitchMap.set(symbols[i], tuning.pitchesSorted[i]);
    }
    // Parse tab to notes
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const noteNamesSet = new Set(noteNames);
    const lowestNote = tuning.pitchesSorted[0];
    const startOct = getMidiNoteByNr(lowestNote).octave;
    const secondsPerBeat = bpmToSecondsPerBeat(tempo);
    let insideChord = false;
    let insideNote = false;
    let currentTime = 0;
    let currentPitch = 0;
    let currentOctOffset = 0;
    const notes = [];
    tab = `${tab.toUpperCase().replaceAll('\n', ' \n')} `;
    // This is needed more often
    const finishNote = () => {
        try {
            notes.push(Note.from({
                pitch: currentPitch + 12 * (startOct + 1 + currentOctOffset),
                start: currentTime,
                end: currentTime + secondsPerBeat,
            }));
            currentOctOffset = 0;
            if (!insideChord) {
                currentTime += secondsPerBeat;
            }
        } catch (e) {
            console.log(currentPitch);
        }
        insideNote = false;
    };
    for (const char of tab) {
        if (char === '(') {
            // Start chord (but finish current if any)
            if (insideChord) {
                insideChord = false;
            }
            if (insideNote) {
                finishNote();
            }
            insideChord = true;
        } else if (noteNamesSet.has(char)) {
            // Start note (but finish current if any)
            if (insideNote) {
                finishNote();
            }
            insideNote = true;
            currentPitch = noteNames.indexOf(char);
        } else if (char === '#') {
            // Sharpen note
            currentPitch++;
        } else if (char === '°') {
            // Increase ocatve
            currentOctOffset++;
        } else if (char === ' ' || char === '\n' || char === ')') {
            // End chord and note if inside
            if (char === ')') {
                insideChord = false;
            }
            if (char === '\n') {
                insideChord = false;
                currentTime += secondsPerBeat;
            }
            if (insideNote) {
                finishNote();
            }
        }
    }
    return notes;
}

/**
 * Converts an array of notes into a text tab
 *
 * @param {Note[]} notes notes
 * @param {LamellophoneTuning} tuning tuning
 * @param {'letter'|'number'} mode mode
 * @param {number} restSize number of seconds for a gap between chords to insert
 *     a line break
 * @returns {string} text tab
 */
export function convertNotesToTab(notes, tuning, mode = 'letter', restSize = 0.1) {
    if (!notes || !notes.length) { return []; }
    // Create a mapping pitch->symbol
    const pitchToSymbolMap = new Map();
    const symbols = mode === 'letter' ? tuning.getLetters() : tuning.getNumbers();
    for (let i = 0; i < tuning.keyCount; i++) {
        pitchToSymbolMap.set(tuning.pitchesSorted[i], symbols[i]);
    }
    // Get chords
    const chords = detectChordsByExactStart(notes);
    // Create tab
    let tab = '';
    let prevEnd = 0;
    for (const chord of chords) {
        // Format chord's notes
        let chordString = chord
            .map(note => {
                if (pitchToSymbolMap.has(note.pitch)) {
                    return pitchToSymbolMap.get(note.pitch) || `[${note.pitch}]`;
                } else {
                    return mode === 'letter' ? getMidiNoteByNr(note.pitch)?.name ?? note.pitch : note.pitch;
                }
            })
            .join(' ');
        if (chord.length > 1) {
            // Mark chords with backets (for multiple notes)
            chordString = `(${chordString})`;
        }
        if (chord[0].start - prevEnd > restSize) {
            // Add new line
            tab = `${tab}\n${chordString}`;
        } else {
            tab = `${tab} ${chordString}`;
        }
        // Update last end time of chord
        prevEnd = max(chord, n => n.end);
    }
    // Remove leading space
    return tab.slice(1);
}

/**
 * Converts an array of notes into an HTML tab with colored notes
 *
 * @param {Note[]} notes notes
 * @param {LamellophoneTuning} tuning tuning
 * @param {'letter'|'number'} mode mode
 * @param {number} restSize number of seconds for a gap between chords to insert
 *     a line break
 * @param {Function} colormap color map function: pitch to color
 * @returns {string} HTML tab
 */
export function convertNotesToHtmlTab(
    notes,
    tuning,
    mode = 'letter',
    restSize = 0.1,
    colormap = () => 'black',
) {
    if (!notes || !notes.length) { return []; }
    // Create a mapping pitch->symbol
    const pitchToSymbolMap = new Map();
    const symbols = mode === 'letter' ? tuning.getLetters() : tuning.getNumbers();
    for (let i = 0; i < tuning.keyCount; i++) {
        pitchToSymbolMap.set(tuning.pitches[i], symbols[i]);
    }
    // Get chords
    const chords = detectChordsByExactStart(notes);
    // Create tab
    let tab = '';
    let prevEnd = 0;
    for (const chord of chords) {
        // Format chord's notes
        let chordString = chord
            .map(note => {
                let str;
                if (pitchToSymbolMap.has(note.pitch)) {
                    str = pitchToSymbolMap.get(note.pitch) || `[${note.pitch}]`;
                } else {
                    str = mode === 'letter' ? getMidiNoteByNr(note.pitch)?.name ?? note.pitch : note.pitch;
                }
                const color = colormap(note.pitch);
                return `<span class='note' style='background-color: ${color}'>${str}</span>`;
            })
            .join('\n');
        if (chord.length > 1) {
            // Mark chords with backets (for multiple notes)
            chordString = `<span class='chord'>${chordString}</span>`;
        }
        if (chord[0].start - prevEnd > restSize) {
            // Add new line
            tab = `${tab}<br/>${chordString}`;
        } else {
            tab = `${tab}${chordString}`;
        }
        // Update last end time of chord
        prevEnd = max(chord, n => n.end);
    }
    return tab;
}

/**
 * Converts a number-based tab to note letter format
 *
 * @param {string} numberTab tab text with number format
 * @param {Map<number, string>} numberLetterMap maps numbers to letters
 * @returns {string} tab in letter format
 */
export function convertNumbersToLetters(numberTab, numberLetterMap) {
    if (!numberTab || !numberTab.length) { return ''; }
    // Normalize to °
    numberTab = numberTab.replaceAll('\'', '°');
    numberTab = numberTab.replaceAll('’', '°');
    numberTab = numberTab.replaceAll('*', '°');
    numberTab = numberTab.replaceAll('º', '°');
    numberTab = numberTab.replaceAll('^', '°');
    for (const [key, value] of numberLetterMap.entries()) {
        numberTab = numberTab.replaceAll(key, value);
    }
    return numberTab;
}

/**
 * Tries to find a transposition s.t. the tuning is able to play all notes.
 * If not not possible, return the transposition that requires the least keys to
 * be retuned.
 *
 * @todo tests fail
 * @param {Note[]} notes notes
 * @param {LamellophoneTuning} tuning tuning
 * @returns {object} {transpose: number, retune: Map}
 */
export function bestTransposition(notes, tuning) {
    if (!notes || !notes.length) {
        return { transpose: 0, retune: new Map() };
    }

    const occuringPitches = new Set(notes.map(n => n.pitch));
    if (occuringPitches.size > tuning.keyCount) {
        // Cannot play all notes, no matter the transp. and tuning
        // TODO:
        // just choose best approx?

    }
    const notePitches = Array.from(occuringPitches);

    // Already perfect? return now
    if (difference(notePitches, tuning.pitches).size === 0) {
        return { transpose: 0, retune: new Map() };
    }

    const [minPitch, maxPitch] = extent(notePitches);
    const transpose = (arr, steps) => arr.map(d => d + steps);

    // Just brute force through all transpositions
    let bestSteps = 0;
    let bestTransposed;
    let commonPitches;
    for (let steps = -minPitch; steps <= 127 - maxPitch; steps++) {
        const transposed = transpose(notePitches, steps);
        const common = intersection(transposed, tuning.pitches);
        if (!commonPitches || common.size > commonPitches.size) {
            bestSteps = steps;
            bestTransposed = transposed;
        }
    }
    bestTransposed = new Set(bestTransposed);

    // Get pitches in tuning but not in notes and other way round
    const uncommon = difference(bestTransposed, tuning.pitches);
    console.log(uncommon);

    const freePitches = new Set();
    const neededPitches = [];
    for (const p of uncommon) {
        if (bestTransposed.has(p)) {
            neededPitches.push(p);
        } else {
            freePitches.add(p);
        }
    }
    console.log(neededPitches);
    console.log(freePitches);

    if (neededPitches.length === 0) {
        // Everything is fine!
        return {
            transpose: bestSteps,
            retune: new Map(),
        };
    }
    if (freePitches.size === 0) {
        // Cannot solve this!
        return {
            transpose: bestSteps,
            retune: new Map(),
        };
    }


    // Get closest free pitch for each needed one
    const retune = new Map();
    for (const neededPitch of neededPitches) {
        let bestMatch = null;
        const bestDiff = Infinity;
        let freePitch;
        for (freePitch of freePitches) {
            const diff = Math.abs(neededPitch - freePitch);
            if (diff < bestDiff) {
                bestMatch = freePitch;
            }
        }
        freePitches.delete(bestMatch);
        retune.set(freePitch, neededPitch);
    }

    return {
        transpose: bestSteps,
        retune,
    };
}
