/**
 * @module Svg
 * @todo test
 * @todo export
 */

/**
 * Draws an arrow tip with two straight lines.
 *
 * @param {number} toX x coordinate where the arrow is pointing
 * @param {number} toY y coordinate where the arrow is pointing
 * @param {string} pointTo top, right, bottom, left, top-right, top-left,
 *      bottom-right, bottom-left
 * @param {number} tipSize size of the arrow tip
 * @returns {string} arrow tip SVG path 'd' attribute
 */
export function getSvgArrowTipPath (toX, toY, pointTo = 'top', tipSize = 10) {
  switch (pointTo) {
    case 'top':
      return `
                  M ${toX - tipSize} ${toY + tipSize}
                  L ${toX} ${toY}
                  L ${toX + tipSize} ${toY + tipSize}`
    case 'right':
      return `
                  M ${toX - tipSize} ${toY - tipSize}
                  L ${toX} ${toY}
                  L ${toX - tipSize} ${toY + tipSize}`
    case 'bottom':
      return `
                  M ${toX - tipSize} ${toY - tipSize}
                  L ${toX} ${toY}
                  L ${toX + tipSize} ${toY - tipSize}`
    case 'left':
      return `
                  M ${toX + tipSize} ${toY - tipSize}
                  L ${toX} ${toY}
                  L ${toX + tipSize} ${toY + tipSize}`
    case 'top-right':
      return `
                  M ${toX - tipSize} ${toY}
                  L ${toX} ${toY}
                  L ${toX} ${toY + tipSize}`
    case 'bottom-right':
      return `
                  M ${toX - tipSize} ${toY}
                  L ${toX} ${toY}
                  L ${toX} ${toY - tipSize}`
    case 'bottom-left':
      return `
                  M ${toX + tipSize} ${toY}
                  L ${toX} ${toY}
                  L ${toX} ${toY - tipSize}`
    case 'top-left':
      return `
                  M ${toX + tipSize} ${toY}
                  L ${toX} ${toY}
                  L ${toX} ${toY + tipSize}`
    default:
      console.error(`Invalid arrow tip direction: ${pointTo}`)
  }
}

/**
* Creates a roughly C-shaped arrow (quarter ellipse).
*
* @param {number} fromX starting x
* @param {number} fromY starting y
* @param {number} toX target x
* @param {number} toY target y
* @param {string} pointTo top, right, bottom, left, top-right, top-left,
*      bottom-right, bottom-left
* @param {number} tipSize size of the tip
* @returns {string} SVG path 'd' attribute
*/
export function getSvgCArrowPath (fromX, fromY, toX, toY, pointTo = 'top', tipSize = 10) {
  const rx = fromX - toX
  const ry = fromY - toY
  const arrowTip = getSvgArrowTipPath(toX, toY, pointTo, tipSize)
  const mode = fromX < toX ? 0 : 1
  return `
          M ${fromX} ${fromY}
          A ${rx} ${ry} 0 0 ${mode} ${toX} ${toY}
          ${arrowTip}
      `
}

/**
* Creates a C-shaped arrow (half elipse).
*
* @param {number} fromX starting x
* @param {number} fromY starting y
* @param {number} toX target x
* @param {number} toY target y
* @param {number} width width
* @param {string} pointTo top, right, bottom, left, top-right, top-left,
*      bottom-right, bottom-left
* @param {number} tipSize size of the tip
* @returns {string} SVG path 'd' attribute
*/
export function getSvgCArrowPath2 (fromX, fromY, toX, toY, width, pointTo = 'top', tipSize = 10) {
  const xBow = fromX + width
  const arrowTip = getSvgArrowTipPath(toX, toY, pointTo, tipSize)
  return `M ${fromX},   ${fromY}
              C ${xBow}, ${fromY}
                ${xBow}, ${toY}
                ${toX},     ${toY}
              ${arrowTip}`
}

/**
* Creates a roughly S-shaped arrow (horizontal).
*
* @param {number} fromX starting x
* @param {number} fromY starting y
* @param {number} toX target x
* @param {number} toY target y
* @param {number} tipSize size of the tip
* @param {string} pointTo top, right, bottom, left, top-right, top-left,
*      bottom-right, bottom-left
* @returns {string} SVG path 'd' attribute
*/
export function getSvgHorizontalSArrowPath (fromX, fromY, toX, toY, tipSize, pointTo = 'auto') {
  if (pointTo === 'auto') {
    pointTo = fromX < toX ? 'right' : 'left'
  }
  const xCenter = (toX + fromX) / 2
  const arrowTip = getSvgArrowTipPath(toX, toY, pointTo, tipSize)
  return `M ${fromX},   ${fromY}
              C ${xCenter}, ${fromY}
                ${xCenter}, ${toY}
                ${toX},     ${toY}
              ${arrowTip}`
}

/**
* Creates a roughly S-shaped arrow (vertical).
*
* @param {number} fromX starting x
* @param {number} fromY starting y
* @param {number} toX target x
* @param {number} toY target y
* @param {number} tipSize size of the tip
* @param {string} pointTo top, right, bottom, left, top-right, top-left,
*      bottom-right, bottom-left
* @returns {string} SVG path 'd' attribute
*/
export function getSvgVerticalSArrowPath (fromX, fromY, toX, toY, tipSize, pointTo = 'auto') {
  if (pointTo === 'auto') {
    pointTo = fromY < toY ? 'bottom' : 'top'
  }
  const yCenter = (toY + fromY) / 2
  const arrowTip = getSvgArrowTipPath(toX, toY, pointTo, tipSize)
  return `M ${fromX}, ${fromY}
              C ${fromX}, ${yCenter}
                ${toX},   ${yCenter}
                ${toX},   ${toY}
              ${arrowTip}`
}
