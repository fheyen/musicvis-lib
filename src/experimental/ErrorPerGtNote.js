
/**
 * Takes the ground truth and a single recording
 *
 * @param {*} gtNotes
 * @param {*} recNotes
 */
export function getErrorPerGtNote(gtNotes, recNotes) {

    const matching = new Map();


}




// TODO: much harder probably
// export function getErrorPerGtChord() {

// }



// export function errorTypePerNote() {

// }

// TODO: not used yet
const noteErrorTypes = [
    'note missing',
    'note extra',
    'note swapped',
    'start too early',
    'start too late',
    'duration too short',
    'duration too long',
    'pitch wrong, chroma correct',
    'pitch wrong, chroma wrong',
];

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
