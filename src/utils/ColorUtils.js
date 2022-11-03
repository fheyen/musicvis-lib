import * as d3 from 'd3'

/**
 * Determines the perceptual lightness of an HTML color
 *
 * @see https://stackoverflow.com/a/596241 (but normalizing to 0, 100)
 * @param {string} color HTML color specifier
 * @returns {number} lightness in [0, 100]
 */
export function getColorLightness(color) {
  const { r, g, b } = d3.color(color).rgb()
  // eslint-disable-next-line no-bitwise
  const Y = (r + r + r + b + g + g + g + g) >> 3
  return Y / 2.55
}

/**
 * Determines the average of mutliple given colors
 *
 * @param {string[]} colors HTML color specifiers
 * @returns {string} average as RGB string
 */
export function averageColor(colors) {
  let mR = 0
  let mG = 0
  let mB = 0
  for (const c of colors) {
    const { r, g, b } = d3.color(c).rgb()
    mR += r
    mG += g
    mB += b
  }
  mR = Math.round(mR / colors.length)
  mG = Math.round(mG / colors.length)
  mB = Math.round(mB / colors.length)
  return `rgb(${mR}, ${mG}, ${mB})`
}

/**
 * Sets a color's opacity.
 * Does not support colors in rgba format.
 *
 * @param {string} color valid HTML color identifier
 * @param {number} [opacity=1] opacity from 0 to 1
 * @returns {string} color as RGBA string
 */
export function setOpacity(color, opacity = 1) {
  const { r, g, b } = d3.color(color).rgb()
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * Sets a color's saturation.
 * Does not support colors in rgba format.
 *
 * @param {string} color valid HTML color identifier
 * @param {number} [saturation=1] saturation from 0 to 1
 * @returns {string} color as RGBA string
 */
export function setSaturation(color, saturation = 1) {
  const c = d3.hsl(color)
  c.s = saturation
  return c.toString()
}
