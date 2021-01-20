import { matchGtAndRecordingNotes } from './Matching';
import { randomInt, randomLcg, randomUniform, median } from 'd3';
import * as Drums from '../instruments/Drums';
import Note from '../types/Note';
import NoteArray from '../types/NoteArray';

/**
 * @module comparison/Alignment
 */

/**
 * Given two NoteArrays, shift the second one in time such that they are aligned
 *
 * @todo use https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm
 *      to find note alignment, then only use those for force calculation
 * @param {NoteArray} gt a NoteArray, e.g. the ground truth
 * @param {NoteArray} rec a NoteArray to align to a
 * @returns {NoteArray} an aligned copy of b
 */
export function alignNoteArrays(gt, rec) {
    rec = rec.clone();
    const f = alignmentForce(gt.getNotes(), rec.getNotes());
    rec = rec.shiftTime(f);
    // console.log(`Aligned recording via shifting by ${f.toFixed(3)} seconds`);
    return {
        aligned: rec,
        timeDifference: f,
    };
}

/**
 * Given two NoteArrays, shift the second one in time such that they are aligned
 *
 * @param {NoteArray} gt a NoteArray, e.g. the ground truth
 * @param {NoteArray} rec a NoteArray to align to a
 * @returns {NoteArray} an aligned copy of b
 */
export function alignNoteArrays2(gt, rec) {
    let timeDifference = 0;
    let tries = 0;
    rec = rec.clone();
    while (tries < 25) {
        // Get a 1-to-1 matching between gt and rec notes so noise has less impact
        const matching = matchGtAndRecordingNotes(rec.getNotes(), gt.getNotes());
        // Get average time difference between matched notes
        let timeDiff = 0;
        let count = 0;
        for (const m of matching.values()) {
            const { gtRecMap } = m;
            for (const [gtStart, matchedRecNote] of gtRecMap.entries()) {
                if (matchedRecNote !== null) {
                    count++;
                    timeDiff += gtStart - matchedRecNote.start;
                }
            }
        }
        timeDiff /= count;
        // Shift recording
        rec.shiftTime(timeDiff);
        timeDifference += timeDiff;
        // console.log(`${tries} shifting by ${timeDiff.toFixed(3)} seconds`);
        // Stop while loop when finished
        if (Math.abs(timeDiff) < 0.0005) {
            break;
        }
        tries++;
    }
    return {
        aligned: rec,
        timeDifference,
    };
}

/**
 * Given two NoteArrays, shift the second one in time such that they are aligned
 *
 * @todo use median instead of average?
 * @param {NoteArray} gt a NoteArray, e.g. the ground truth
 * @param {NoteArray} rec a NoteArray to align to a
 * @returns {NoteArray} an aligned copy of b
 */
export function alignNoteArrays3(gt, rec) {
    let timeDifference = 0;
    let tries = 0;
    rec = rec.clone();
    while (tries < 25) {
        // Get a 1-to-1 matching between gt and rec notes so noise has less impact
        const matching = matchGtAndRecordingNotes(rec.getNotes(), gt.getNotes());
        // Get time differences
        const timeDiffs = [];
        for (const m of matching.values()) {
            for (const [gtStart, matchedRecNote] of m.gtRecMap.entries()) {
                if (matchedRecNote !== null) {
                    timeDiffs.push(gtStart - matchedRecNote.start);
                }
            }
        }
        const shift = median(timeDiffs);
        // Shift recording
        rec.shiftTime(shift);
        timeDifference += shift;
        // console.log(`${tries} shifting by ${shift.toFixed(3)} seconds`);
        // Stop while loop when finished
        if (Math.abs(shift) < 0.0001) {
            break;
        }
        tries++;
    }
    return {
        aligned: rec,
        timeDifference,
    };
}



/**
 * Calculates the mean difference between all notes in a and the nearest same-
 * pitched notes in b
 *
 * @param {Note[]} a array with notes
 * @param {Note[]} b array with notes
 * @returns {number} mean time difference
 */
function alignmentForce(a, b) {
    let difference = 0;
    let count = 0;
    // For each note in a, search the closest note in b with the same pitch and calculate the distance
    for (const noteA of a) {
        let distance = Number.POSITIVE_INFINITY;
        let diff = Number.POSITIVE_INFINITY;
        for (const noteB of b) {
            if (noteA.pitch === noteB.pitch) {
                const dist = Math.abs(noteA.start - noteB.start);
                if (dist < distance) {
                    distance = dist;
                    diff = noteA.start - noteB.start;
                    // TODO: Larger distances might be errors
                    // if (diff > 1) {
                    //     diff = Math.sqrt(diff);
                    // }
                }
            }
        }
        // (If not found, this does not change alignment)
        if (distance < Number.POSITIVE_INFINITY) {
            difference += diff;
            count++;
        }
    }
    return difference / count;
}

/**
 * Test function
 *
 * @todo move to test
 */
export function testAlignment() {
    const test = (a, b, title) => {
        console.log(title);
        console.log(b.getNotes().map(n => n.start));
        const aligned = alignNoteArrays(a, b);
        console.log(aligned.getNotes().map(n => n.start));
    };
    const a = new NoteArray([
        new Note(69, 0, 127, 0, 1),
        new Note(70, 1, 127, 0, 2),
        new Note(71, 2, 127, 0, 3),
    ]);
    console.log(a.getNotes().map(n => n.start));

    let b;

    b = a.clone().shiftTime(2);
    test(a, b, 'shifted by 2');

    b = a.clone().shiftTime(-2);
    test(a, b, 'shifted by -2');

    b = a.clone()
        .shiftTime(3)
        .addNotes([new Note(72, 2, 127, 0, 3)]);
    test(a, b, 'shifted by 3, added note');

    b = a.clone().repeat(2);
    test(a, b, 'repeated');

    b = a.clone()
        .repeat(2)
        .shiftTime(3);
    test(a, b, 'repeated, shifted by 3');
}



/**
 * @todo Benchmark different aligment functions on a randomly generated test set
 * This allows to check the calculated alignment against a known ground truth
 */
export function alignmentBenchmark() {
    // Use random seed for reproducability
    const seed = 0.44871573888282423; // any number in [0, 1)
    const rand127 = randomInt.source(randomLcg(seed))(0, 127);
    const maxTime = 500;
    const randTime = randomUniform.source(randomLcg(seed))(0, maxTime);
    const randDuration = randomUniform.source(randomLcg(seed))(1 / 64, 2);

    // Create random notes
    const randomNotes = Array.from({length: 200}).fill(0).map(() => {
        const start = randTime();
        return new Note(
            rand127(),
            start,
            127,
            0,
            start + randDuration(),
        );
    });
    const notes = new NoteArray(randomNotes).sortByTime();
    console.log('true notes', notes.getNotes());

    // Shift notes by some amount of seconds (this is what alignment should calculate!)
    const shift = 3;
    const shifted = notes.clone().shiftTime(shift);
    console.log('shifted', shifted);


    // Introduce errors, as a human would
    const deviation = 0.1;
    const pAdd = 0.1;
    const pRemove = 0.1;
    let variation = Drums.generateDrumVariation(shifted.getNotes(), deviation, pAdd, pRemove);
    variation = new NoteArray(variation);
    console.log('variation', variation);


    // Run all functions
    const funcs = [alignNoteArrays, alignNoteArrays2, alignNoteArrays3];
    console.log(`True time shift: ${shift} seconds`);

    console.log('Only shifted');
    for (const f of funcs) {
        const { timeDifference } = f(notes, shifted);
        const error = Math.abs(timeDifference - -shift);
        console.log(`${f.name}\nshift: ${timeDifference.toFixed(3)} \nError ${error.toFixed(3)}`);
    }

    console.log('Shifted & variation');
    for (const f of funcs) {
        const { timeDifference } = f(notes, variation);
        const error = Math.abs(timeDifference - -shift);
        console.log(`${f.name}\nshift: ${timeDifference.toFixed(3)} \nError ${error.toFixed(3)}`);
    }
}
