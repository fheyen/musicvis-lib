import { minIndex, difference } from 'd3';

/**
 * Takes the ground truth and a single recording.
 * Both gtNotes and recNotes must be sorted by note start time ascending.
 *
 * @param {Note[]} gtNotes ground truth notes
 * @param {Note[]} recNotes recorded notes
 * @returns {number[]} for each note the difference in start time to the closest
 *      recorded note
 */
export function getStartTimeErrorPerGtNote(gtNotes, recNotes) {
    // TODO: Mapping of gt to rec notes is not optimal! not 1:1!
    return gtNotes.map(gtNote => {
        const bestRecMatch = minIndex(recNotes, rec => Math.abs(gtNote.start - rec.start));
        const matchedRecNote = recNotes[bestRecMatch];
        return Math.abs(gtNote.start - matchedRecNote.start);
    });
}

// /**
//  * Takes the ground truth and a single recording.
//  * Both gtNotes and recNotes must be sorted by note start time ascending.
//  *
//  * @param {Note[]} gtNotes ground truth notes
//  * @param {Note[]} recNotes recorded notes
//  * @returns {object[]} an Array with error types for each note
//  */
// export function getErrorTypesPerGtNote(gtNotes, recNotes) {
//     // TODO: Mapping of gt to rec notes is not optimal! not 1:1!
//     return gtNotes.map(gtNote => {
//         const bestRecMatch = minIndex(recNotes, rec => Math.abs(gtNote.start - rec.start));
//         const matchedRecNote = recNotes[bestRecMatch];
//         // return Math.abs(gtNote.start - matchedRecNote.start);
//         const startDiff = matchedRecNote.start - gtNote.start;
//         return {
//             missing: Math.abs(startDiff) > 3,
//             early: startDiff<0,
//             startDiff,
//             short: ,
//         };
//     });
// }




// TODO: much harder probably
// export function getErrorPerGtChord() {

// }



// export function errorTypePerNote() {

// }

// TODO: not used yet
/**
 * @type {object}
 */
export const noteErrorTypes = {
    missing: 'note missing',
    extra: 'note extra',
    swapped: 'note swapped',
    early: 'start too early',
    late: 'start too late',
    short: 'duration too short',
    long: 'duration too long',
    wrongPitch: 'pitch wrong',
    wrongChroma: 'chroma wrong',
};

/**
 * @todo untested, unused
 * @param {Note} expectedNote a note
 * @param {Note} actualNote a note
 * @returns {string[]} errors
 */
export function getNoteErrors(expectedNote, actualNote) {
    const errors = [];
    if (expectedNote.start > actualNote.start) {
        errors.push(noteErrorTypes.early);
    }
    if (expectedNote.start < actualNote.start) {
        errors.push(noteErrorTypes.late);
    }
    if (expectedNote.getDuration() < actualNote.getDuration()) {
        errors.push(noteErrorTypes.short);
    }
    if (expectedNote.getDuration() > actualNote.getDuration()) {
        errors.push(noteErrorTypes.long);
    }
    if (expectedNote.pitch !== actualNote.pitch) {
        errors.push(noteErrorTypes.wrongPitch);
    }
    if (expectedNote.pitch % 12 !== actualNote.pitch % 12) {
        errors.push(noteErrorTypes.wrongChroma);
    }
    return errors;
}

/**
 * @type {object}
 */
export const chordErrorTypes = {
    missing: 'chord missing',
    extra: 'chord extra',
    swapped: 'chord swapped',
    notesMissingChordSimilar: 'note(s) missing, chord similar',
    notesMissingChordDifferent: 'note(s) missing, chord different',
    notesExtraChordSimilar: 'note(s) extra, chord similar',
    notesExtraChordDifferent: 'note(s) extra, chord different',
    notesInversed: 'notes inversed',
    notesOctaved: 'notes octaved',
};

/**
 * @todo NYI
 * @param {Note[]} expectedChord a chord
 * @param {Note[]} actualChord a chord
 * @returns {string[]} errors
 */
export function getChordErrors(expectedChord, actualChord) {
    const expectedPitches = expectedChord.map(d => d.pitch);
    const actualPitches = actualChord.map(d => d.pitch);
    const expectedChroma = expectedPitches.map(d => d % 12);
    const actualChroma = actualPitches.map(d => d % 12);

    const errors = [];

    // Missing and extra notes
    const missing = difference(expectedPitches, actualPitches);
    if (missing.size > 0) {
        // TODO: is chord still similar?
        errors.push(chordErrorTypes.notesMissingChordDifferent);
    }
    const extra = difference(actualPitches, expectedPitches);
    if (extra.size > 0) {
        // TODO: is chord still similar?
        errors.push(chordErrorTypes.notesExtraChordDifferent);
    }

    // TODO: use kendall tau to computed if notes are inversed?


    return errors;
}
