/**
 * @module instruments/Piano
 */

/**
 * Map:keyCount->pitchRange
 * pitchRange is {minPitch:number, maxPitch:number}
 */
export const pianoPitchRange = new Map([
    [72, { minPitch: 24, maxPitch: 95 }],
    [88, { minPitch: 21, maxPitch: 108 }],
    [128, { minPitch: 0, maxPitch: 127 }],
]);

/**
 *
 * @param {Note[]} notes notes with only MIDI information
 * @returns {?} notes with fingering information
 */
// export function fingeringFromMidi(notes) {
    // TODO: detect chords first?
    // TODO: then lookup chords' fingerings from a lookup table

    // TODO: alternatively (as fallback) use heuristics

    // TODO: or try to do it like humans do when playing



// }
