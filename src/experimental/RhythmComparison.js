import { bpmToSecondsPerBeat } from '../utils/MusicUtils';

/**
 * @param notes
 * @param bpm
 * @param options
 */
export function compareToRhythm(notes, bpm, options) {
    const {
        beatType = 4,
        smallestStep = 8,
        allowTriplets,
    } = options;

    // TODO: handle triplets

    const secondsPerBeat = bpmToSecondsPerBeat(bpm);



}
