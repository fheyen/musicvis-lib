import { minIndex } from 'd3';

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
const noteErrorTypes = {
    missing: 'note missing',
    extra: 'note extra',
    swapped: 'note swapped',
    early: 'start too early',
    late: 'start too late',
    short: 'duration too short',
    long: 'duration too long',
    wrongPitch: 'pitch wrong, chroma correct',
    wrongChroma: 'pitch wrong, chroma wrong',
};

const chordErrorTypes = [
    'chord missing',
    'chord extra',
    'chord swapped',
    'note(s) missing, chord similar',
    'note(s) missing, chord different',
    'note(s) extra, chord similar',
    'note(s) extra, chord different',
    'notes inversed',
];
