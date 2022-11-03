import * as d3 from 'd3'
import { setSaturation } from './ColorUtils'

/**
 * @module utils/NoteColorUtils
 */

// TODO: move to colors/ folder?

/**
 * Maps each note to a color
 * Colors from https://www.svpwiki.com/music+note+or+sound+colors
 * Order is C, C#, ... B
 *
 * @type {string[]}
 */
export const noteColormap = [
  '#ff0000', // C
  '#ff4e00', // C#
  '#db7b00', // D
  '#ffcc00', // D#
  '#e4ed00', // E
  '#81d700', // F
  '#00ffb4', // F#
  '#00ffea', // G
  '#00baff', // G#
  '#3c00ff', // A
  '#a800ff', // A#
  '#ff00fd' // B
].map(d => setSaturation(d, 0.5))

/**
 * Colorblind save colors from
 * Malandrino et al. - Visualization and Music Harmony: Design, Implementation,
 * and Evaluation https://ieeexplore.ieee.org/abstract/document/8564210
 * Order is C, C#, ... B
 *
 * @type {string[]}
 */
export const noteColormapAccessible = [
  '#6699ff', // C
  '#66ffff', // C#
  '#000000', // D
  '#647878', // D#
  '#993366', // E
  '#ff0000', // F
  '#ffcc99', // F#
  '#ffff01', // G
  '#ff9900', // G#
  '#009900', // A
  '#66ff99', // A#
  '#0000cc' // B
]

/**
 *
 * @type { string[] }
 */
export const noteColormapAccessible2 = [
  '#9aebff', // C
  '#add5ff', // C#
  '#d6d6ff', // D
  '#ebd5ff', // D#
  '#ffc2eb', // E
  '#ffcbcc', // F
  '#ffd5c2', // F#
  '#ffebc2', // G
  '#ebffc2', // G#
  '#c2d599', // A
  '#99ebbe', // A#
  '#adebeb' // B
]

/**
 * Note colors by Isaac Newton, 1704 (shaprs were not assiged a color)
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const newton = [
  '#FA0B0C', // C
  '#FA0B0C', // C#
  '#F88010', // D
  '#F88010', // D#
  '#F5F43C', // E
  '#149033', // F
  '#149033', // F#
  '#FA0B0C', // G
  '#FA0B0C', // G#
  '#7F087C', // A
  '#7F087C', // A#
  '#908791' // B
]

/**
 * Note colors by Louis Betrand Castel, 1734
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const castel = [
  '#1C0D82', // C
  '#F5F5F5', // C#
  '#149033', // D
  '#709226', // D#
  '#F5F43C', // E
  '#F5D23B', // F
  '#F88010', // F#
  '#FA0B0C', // G
  '#A00C09', // G#
  '#D71386', // A
  '#4B0E7D', // A#
  '#7F087C' // B
]

/**
 * Note colors by George Field, 1816 (shaprs were not assiged a color)
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const field = [
  '#1C0D82', // C
  '#1C0D82', // C#
  '#7F087C', // D
  '#7F087C', // D#
  '#FA0B0C', // E
  '#F88010', // F
  '#F88010', // F#
  '#F5F43C', // G
  '#F5F43C', // G#
  '#709226', // A
  '#709226', // A#
  '#149033' // B
]

/**
 * Note colors by D.D. Jameson, 1844
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const jameson = [
  '#FA0B0C', // C
  '#F44712', // C#
  '#F88010', // D
  '#F5D23B', // D#
  '#F5F43C', // E
  '#149033', // F
  '#1B9081', // F#
  '#1C0D82', // G
  '#4B0E7D', // G#
  '#7F087C', // A
  '#A61586', // A#
  '#D71386' // B
]

/**
 * Note colors by Theodor Seemann, 1881
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const seemann = [
  '#6A1C1C', // C
  '#FA0B0C', // C#
  '#F88010', // D
  '#F5D23B', // D#
  '#F5F43C', // E
  '#709226', // F
  '#1B9081', // F#
  '#1C0D82', // G
  '#7F087C', // G#
  '#D71386', // A
  '#6A1C1C', // A#
  '#070707' // B
]

/**
 * Note colors by A. Wallace Rimington, 1893
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const rimington = [
  '#FA0B0C', // C
  '#A00C09', // C#
  '#F44712', // D
  '#F88010', // D#
  '#F5F43C', // E
  '#709226', // F
  '#149033', // F#
  '#27A481', // G
  '#1B9081', // G#
  '#7F087C', // A
  '#1C0D82', // A#
  '#D71386' // B
]

/**
 * Note colors by Bainbridge Bishop, 1893
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const bishop = [
  '#FA0B0C', // C
  '#A00C09', // C#
  '#F88010', // D
  '#F6D111', // D#
  '#F5F43C', // E
  '#BCE039', // F
  '#149033', // F#
  '#27A481', // G
  '#7F087C', // G#
  '#D71386', // A
  '#D91951', // A#
  '#FA0B0C' // B
]

/**
 * Note colors by H. von Helmholtz, 1910
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const helmholtz = [
  '#F5F43C', // C
  '#149033', // C#
  '#1B9081', // D
  '#1C5BA0', // D#
  '#7F087C', // E
  '#D71386', // F
  '#9D0E55', // F#
  '#FA0B0C', // G
  '#D32C0A', // G#
  '#D32C0A', // A -- this is probably wrong but given in the source above
  '#F62E0D', // A#
  '#F17A0F' // B
]

/**
 * Note colors by Alexander Scriabin, 1911
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const scriabin = [
  '#FA0B0C', // C
  '#D71386', // C#
  '#F5F43C', // D
  '#5A5685', // D#
  '#1C5BA0', // E
  '#A00C09', // F
  '#1C0D82', // F#
  '#F88010', // G
  '#7F087C', // G#
  '#149033', // A
  '#5A5685', // A#
  '#1C5BA0' // B
]

/**
 * Note colors by Adrian Bernard Klein, 1930
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const klein = [
  '#C40A09', // C
  '#FA0B0C', // C#
  '#F44712', // D
  '#F88010', // D#
  '#F5F43C', // E
  '#BCE039', // F
  '#149033', // F#
  '#1B9081', // G
  '#1C0D82', // G#
  '#781887', // A
  '#D71386', // A#
  '#9D0E55' // B
]

/**
 * Note colors by August Aeppli, 1940 (C#, D#, F, G# were not assigned a color)
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const aeppli = [
  '#FA0B0C', // C
  '#FA0B0C', // C#
  '#F88010', // D
  '#F88010', // D#
  '#F5F43C', // E
  '#F5F43C', // F
  '#149033', // F#
  '#1B9081', // G
  '#1B9081', // G#
  '#1C5BA0', // A
  '#4B0E7D', // A#
  '#7F087C' // B
]

/**
 * Note colors by I.J. Belmont, 1944
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const belmont = [
  '#FA0B0C', // C
  '#F44712', // C#
  '#F88010', // D
  '#F6D111', // D#
  '#F5F43C', // E
  '#BCE039', // F
  '#149033', // F#
  '#1B9081', // G
  '#1C0D82', // G#
  '#A61586', // A
  '#D71386', // A#
  '#AD0E48' // B
]

/**
 * Note colors by Steve Zieverink, 2004
 * From Schmidt, Kathryn L. (2019): Meaningful Music Visualizations. Purdue University Graduate School. Thesis.https://doi.org/10.25394/PGS.7498700.v1 https://hammer.purdue.edu/articles/thesis/Meaningful_Music_Visualizations/7498700/1/files/13893941.pdf page 13
 * Original: Collopy, F. (2004, October 19). Color scales? Retrieved from http://rhythmiclight.com/archives/ideas/colorscales.html
 *
 * @type {string[]}
 */
export const zieverink = [
  '#BCE039', // C
  '#149033', // C#
  '#1B9081', // D
  '#1C0D82', // D#
  '#7F087C', // E
  '#D71386', // F
  '#6F0D45', // F#
  '#A00C09', // G
  '#FA0B0C', // G#
  '#F88010', // A
  '#EDF087', // A#
  '#F5F43C' // B
]

/**
 * @type {function}
 */
export const colorInterpolator = d3.interpolateRgb('black', 'steelblue')
/**
 * Gradient color map from black to steelblue
 *
 * @type {string[]}
 */
export const noteColormapGradientArray = Array.from({ length: 12 })
  .map((d, index) => colorInterpolator(index / 11))

/**
 * Returns the note color depending on the given pitch.
 * (Simplifies note color lookup by looking up the color for pitch%12.)
 *
 * @param {number} pitch MIDI pitch in [0, 127]
 * @param {string} colormap one of 'default', 'accessible', 'gradient'
 * @returns {string} color code
 */
export function noteColorFromPitch (pitch, colormap = 'default') {
  switch (colormap) {
    case 'accessible':
      return noteColormapAccessible[pitch % 12]
    case 'gradient':
      return noteColormapGradientArray[pitch % 12]
    default:
      return noteColormap[pitch % 12]
  }
}
