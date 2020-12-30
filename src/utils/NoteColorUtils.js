import { hsl, interpolateRgb } from 'd3';

/**
 * @module utils/NoteColorUtils
 */

// TODO: move to colors/ folder?

/**
 * Maps each note to a color
 * Colors from https://www.svpwiki.com/music+note+or+sound+colors
 * Order is C, C#, ... B
 */
const noteColormap = [
    '#ff0000',
    '#ff4e00',
    '#db7b00',
    '#ffcc00',
    '#e4ed00',
    '#81d700',
    '#00ffb4',
    '#00ffea',
    '#00baff',
    '#3c00ff',
    '#a800ff',
    '#ff00fd',
].map(d => {
    // Make colors less saturated
    const c = hsl(d);
    c.s = 0.5;
    return c.toString();
});
/**
 * Colorblind save colors from
 * Malandrino et al. - Visualization and Music Harmony: Design, Implementation,
 * and Evaluation https://ieeexplore.ieee.org/abstract/document/8564210
 * Order is C, C#, ... B
 */
// export const noteColormapAccessible = new Map([
//     ['C', '#9aebff'],
//     ['C#', '#add5ff'],
//     ['D', '#d6d6ff'],
//     ['D#', '#ebd5ff'],
//     ['E', '#ffc2eb'],
//     ['F', '#ffcbcc'],
//     ['F#', '#ffd5c2'],
//     ['G', '#ffebc2'],
//     ['G#', '#ebffc2'],
//     ['A', '#c2d599'],
//     ['A#', '#99ebbe'],
//     ['B', '#adebeb'],
// ]);
const noteColormapAccessible = [
    '#6699ff',
    '#66ffff',
    '#000000',
    '#647878',
    '#993366',
    '#ff0000',
    '#ffcc99',
    '#ffff01',
    '#ff9900',
    '#009900',
    '#66ff99',
    '#0000cc',
];

/**
 * Gradient color map from black to steelblue
 */
const colorInterpolator = interpolateRgb('black', 'steelblue');
const noteColormapGradientArray = new Array(12).fill(0).map((d, i) => colorInterpolator(i / 11));

/**
 * Returns the note color depending on the given pitch.
 * (Simplifies note color lookup by looking up the color for pitch%12.)
 *
 * @param {number} pitch MIDI pitch in [0, 127]
 * @param {string} colormap one of 'default', 'accessible', 'gradient'
 * @returns {string} color code
 */
export function noteColorFromPitch(pitch, colormap = 'default') {
    switch (colormap) {
    case 'accessible':
        return noteColormapAccessible[pitch % 12];
    case 'gradient':
        return noteColormapGradientArray[pitch % 12];
    default:
        return noteColormap[pitch % 12];
    }
}
