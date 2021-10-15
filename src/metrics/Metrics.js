import * as d3 from 'd3';
import { detectChordsBySimilarStart } from '../chords/Chords';

/*
 * Rhythm
 *    [x] Number of notes per second (absolute time)
 *    [x] Number of notes per measure (musical time)
 *    [x] Variation of note durations and starts
 * Melody
 *    [ ] Note distribution
 *      [ ] In scale (only chromatic or chroma x octave)
 *      [ ] On fretboard / instrument
 *      [ ] How many blue notes / disharmonics?
 *    [ ] Distribution of intervals between notes (only steps or also jumps?)
 * Chords
 *    [ ] Ratio of single to multi notes
 *    [ ] Distribution of chord sizes (how many notes at a time)
 *    [ ] How many chords with out-of-scale notes / blue notes / disharmonics?
 * Technique
 *    Bends, vibrato, slides, muted
 *    [x] Number of string changes (also jumps to the second next string etc.)
 * Dynamics
 *    [x] Distribution over values (velocity)
 *    [ ] Distribution over time?
 *
 */

// Note metrics

/**
 * Computes the number of notes
 *
 * @param {Note[]} notes notes
 * @returns {number} number of notes
 */
export function notesCount(notes) {
    return notes.length;
}

/**
 * Computes played duration
 *
 * @param {Note[]} notes notes
 * @returns {number} duration
 */
export function duration(notes) {
    return d3.max(notes, d => d.end);
}

/**
 * Computes the number of notes played per second
 *
 * @param {Note[]} notes notes
 * @returns {number} number of notes per second
 */
export function notesPerSecond(notes) {
    const duration = d3.max(notes, d => d.end);
    return notes.length / duration;
}

/**
 * Computes the number of notes played per relative time (beat)
 *
 * @param {Note[]} notes notes
 * @param {number} [bpm=120] tempo in bpm
 * @returns {number} number of notes per beat
 */
export function notesPerBeat(notes, bpm = 120) {
    const duration = d3.max(notes, d => d.end);
    const beatsPerSecond = bpm / 60;
    const beats = beatsPerSecond * duration;
    return notes.length / beats;
}

/**
 * Computes the number of different notes used in different modi.
 * - Pitch: note and octave are considered
 * - Chroma: only note without octave considered, e.g., C4 == C5
 * - Fretboard position: tuple (string, fret) will be compared
 *
 * @param {Note[]} notes notes
 * @param {'pitch'|'chroma'|'fretboardPos'} mode mode
 * @returns {object[]} note and usage count
 */
export function differentNotesUsed(notes, mode = 'pitch') {
    let groupAccessor;
    if (mode === 'pitch') {
        groupAccessor = (d) => d.pitch;
    } else if (mode === 'chroma') {
        groupAccessor = (d) => d.pitch % 12;
    } else if (mode === 'fretboardPos') {
        groupAccessor = (d) => `string ${d.channel} pitch ${d.pitch}`;
    }
    const groups = d3.group(notes, groupAccessor);
    return [...groups].map((d) => {
        return {
            note: d[0],
            count: d[1].length,
        };
    });
}

/**
 * Computes the ratio of notes that are in the given set.
 * Can be used for checking how many notes that were played are part of a
 * musical scale, by passing the notes of this scale as set.
 *
 * @param {Note[]} notes notes
 * @param {Set} set set of note names, e.g. C, D# (no flats)
 * @returns {number} ratio of notes inside set
 * @example
 * const cMaj = new Set(...'CDEFGAB');
 * const ratio = ratioNotesInSet(notes, cMaj);
 */
export function ratioNotesInSet(notes, set) {
    let count = 0;
    for (const note of notes) {
        const chroma = note.name.slice(0, -1);
        if (set.has(chroma)) {
            count++;
        }
    }
    return count / notes.length;
}

/**
 * Computes the mean and variance of played pitches
 *
 * @param {Note[]} notes notes
 * @returns {object} {mean, variance}
 */
export function pitchMeanAndVariance(notes) {
    return {
        mean: d3.mean(notes, d => d.pitch),
        variance: d3.variance(notes, d => d.pitch),
    };
}

/**
 * Computes the mean and variance of played intervals
 *
 * @param {Note[]} notes notes
 * @returns {object} {mean, variance}
 */
export function intervalMeanAndVariance(notes) {
    const intervals = notesToIntervals(notes);
    return {
        mean: d3.mean(intervals),
        variance: d3.variance(intervals),
    };
}

/**
 * Computes the mean and variance of played dynamics
 *
 * @param {Note[]} notes notes
 * @returns {object} {mean, variance}
 */
export function dynamicsMeanAndVariance(notes) {
    return {
        mean: d3.mean(notes, d => d.velocity),
        variance: d3.variance(notes, d => d.velocity),
    };
}

/**
 * Computes the mean and variance of played dynamics
 *
 * @param {Note[]} notes notes
 * @returns {object} {mean, variance}
 */
export function durationMeanAndVariance(notes) {
    const durations = notes.map(d => d.getDuration());
    return {
        mean: d3.mean(durations),
        variance: d3.variance(durations),
    };
}

/**
 * Computes the mean and variance of onset (start time) differences between
 * consecutive notes.
 *
 * @param {Note[]} notes notes
 * @returns {object} {mean, variance}
 */
export function onsetDiffMeanAndVariance(notes) {
    const differences = notesToOnsetDifferences(notes);
    return {
        mean: d3.mean(differences),
        variance: d3.variance(differences),
    };
}

/**
 * Steps: gioing up or down a single note in scale
 * Jumps: more than a single note in scale
 * @todo how to handle notes outside scale?
 *
 * @param {Note[]} notes notes
 * @param {number[]} scalePitches numbers in [0, 11] that specify the scale
 */
function stepsToJumpsRatio(notes, scalePitches) {
    // const notes2 = notes.map(d=>d.pitch%12)
}


// Guitar-specific

/**
 * Computs the ratio of notes for which one string (or more) where skipped
 * between the one before and the current note.
 * The `skipped` parameter set the minimum amount of strings between the two
 * notes, e.g., going from string 1 to 3 means that one (string 2) was skipped.
 *
 * @param {GuitarNote[]} notes notes
 * @param {number} [skipped=0] number of strings skipped between notes
 * @returns {number} ratio of notes where `skipped` string where skipped
 */
export function guitarStringSkips(notes, skipped = 0) {
    let count = 0;
    if (notes.length < 2) { return 0; }
    for (let index = 1; index < length; index++) {
        const dist = Math.abs(notes[index].string - notes[index - 1].string);
        if (dist > skipped) {
            count++;
        }
    }
    return count;
}

/**
 * Computs the ratio of notes for which one fret (or more) where skipped between
 * the one before and the current note.
 * The `skipped` parameter set the minimum amount of fret between the two
 * notes, e.g., going from fret 1 to 3 means that one (fret 2) was skipped.
 *
 * @param {GuitarNote[]} notes notes
 * @param {number} [skipped=0] number of fret skipped between notes
 * @returns {number} ratio of notes where `skipped` string where skipped
 */
export function guitarFretSkips(notes, skipped = 0) {
    let count = 0;
    if (notes.length < 2) { return 0; }
    for (let index = 1; index < length; index++) {
        const dist = Math.abs(notes[index].fret - notes[index - 1].fret);
        if (dist > skipped) {
            count++;
        }
    }
    return count;
}


// Harmonies

// /**
//  * @param {Note[]} notes notes
//  * @param {number} threshold threshold
//  * @param {number} size size of a harmony (number of notes)
//  * @returns {number} ratio of harmonies with this size compared to all harmonies
//  * @todo do all sizes at the same time? currently ineffiecient
//  */
// export function chordSizeRatio(notes, threshold, size = 1) {
//     const chords = detectChordsBySimilarStart(notes, threshold);
//     const chosenLengthChords = chords.filter((d) => d.length === size);
//     return chosenLengthChords.length / chords.length;
// }

/**
 * Counts how often harmonies of different sizes occur
 *
 * @param {Note[][]} harmonies groups of notes that belong to harmonies
 * @returns {object[]} {size, count}
 * @example
 *  // You can use different grouping functions as well, see chords/Chords.js
 *  const harmonies = Chords.detectChordsBySimilarStart(notes, theshold);
 *  const sizeDistr = harmonySizeDistribution(harmonies);
 */
export function harmonySizeDistribution(harmonies) {
    return d3.groups(harmonies, d => d.length)
        .map(([size, chords]) => { return { size, count: chords.length }; })
        .sort((a, b) => b.size - a.size);
}

/**
 * Determines the ratio of single notes to multi-note harmonies
 *
 * @param {Note[][]} harmonies groups of notes that belong to harmonies
 * @returns {number} ratio of single notes to multi-note harmonies
 */
export function harmonySingleToMultiRatio(harmonies) {
    let single = 0;
    for (const harmony of harmonies) {
        if (harmony.length === 1) { single++; }
    }
    return single / harmonies.length;
}



// Utils


/**
 * Computes the pitch intervals between consecutive notes
 *
 * @param {Note[]} notes notes
 * @returns {number[]} pitch intervals
 */
function notesToIntervals(notes) {
    const intervals = [];
    for (let i = 1; i < notes.length; i++) {
        intervals.push(notes[i].pitch - notes[i - 1].pitch);
    }
    return intervals;
}

/**
 * Computes the start time differences between consecutive notes
 *
 * @param {Note[]} notes notes
 * @returns {number[]} start time differences
 */
function notesToOnsetDifferences(notes) {
    const onsetDiffs = [];
    for (let i = 1; i < notes.length; i++) {
        onsetDiffs.push(notes[i].start - notes[i - 1].start);
    }
    return onsetDiffs;
}
