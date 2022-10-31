import * as d3 from 'd3'

/**
 * @module graphics/Canvas
 * @todo combine multiple canvases into one, by drawing over common background
 * @todo save canvas as file https://www.digitalocean.com/community/tutorials/js-canvas-toblob
 */

/**
 * Sets up a canvas rescaled to device pixel ratio
 *
 * @param {HTMLCanvasElement} canvas canvas element
 * @returns {CanvasRenderingContext2D} canvas rendering context
 */
export function setupCanvas (canvas) {
  // Fix issues when importing musicvis-lib in Node.js
  if (!window) { return }
  // Get the device pixel ratio, falling back to 1.
  const dpr = window.devicePixelRatio || 1
  // Get the size of the canvas in CSS pixels.
  const rect = canvas.getBoundingClientRect()
  // Give the canvas pixel dimensions of their CSS
  // sizes times the device pixel ratio.
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  const context = canvas.getContext('2d')
  // Scale all drawing operations by the dpr
  context.scale(dpr, dpr)
  return context
}

/**
 * Draws a stroked straight line.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x1 x coordinate of the start
 * @param {number} y1 y coordinate of the start
 * @param {number} x2 x coordinate of end
 * @param {number} y2 y coordinate of end
 * @returns {void}
 * @example
 *      // Set the strokeStyle first
 *      context.strokeStyle = 'black';
 *      // Let's draw an X
 *      Canvas.drawLine(context, 0, 0, 50, 50);
 *      Canvas.drawLine(context, 0, 50, 50, 0);
 */
export function drawLine (context, x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
}

/**
 * Draws a stroked straight horizontal line.
 *
 * @deprecated Use context.fillRect(x1, y, x2-x1, strokeWidth)
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x1 x coordinate of the start
 * @param {number} y y coordinate of the start
 * @param {number} x2 x coordinate of end
 * @returns {void}
 */
export function drawHLine (context, x1, y, x2) {
  context.beginPath()
  context.moveTo(x1, y)
  context.lineTo(x2, y)
  context.stroke()
}

/**
 * Draws a stroked straight vertical line.
 *
 * @deprecated Use context.fillRect(x1, y1, strokeWidth, y2-y1)
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x x coordinate of the start
 * @param {number} y1 y coordinate of the start
 * @param {number} y2 y coordinate of end
 * @returns {void}
 */
export function drawVLine (context, x, y1, y2) {
  context.beginPath()
  context.moveTo(x, y1)
  context.lineTo(x, y2)
  context.stroke()
}

/**
 * Draws a line that bows to the right in the direction of travel (looks like a
 * left turn), thereby encoding direction. Useful for node-link graphs.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x1 x coordinate of the start
 * @param {number} y1 y coordinate of the start
 * @param {number} x2 x coordinate of end
 * @param {number} y2 y coordinate of end
 * @param {number} [strength=0.5] how much the bow deviates from a straight line
 *      towards the right, negative values will make bows to the left
 */
export function drawBowRight (context, x1, y1, x2, y2, strength = 0.5) {
  const middleX = (x1 + x2) / 2
  const middleY = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const normalX = -dy
  const normalY = dx
  const cx = middleX + strength * normalX
  const cy = middleY + strength * normalY
  context.beginPath()
  context.moveTo(x1, y1)
  context.bezierCurveTo(cx, cy, cx, cy, x2, y2)
  context.stroke()
}

/**
 * Draws a stroked circle.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x x coordinate of center
 * @param {number} y y coordinate of center
 * @param {number} radius radius
 * @returns {void}
 */
export function drawCircle (context, x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.stroke()
}

/**
 * Draws a filled circle.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x x coordinate of center
 * @param {number} y y coordinate of center
 * @param {number} radius radius
 * @returns {void}
 */
export function drawFilledCircle (context, x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.fill()
}

/**
 * Draws a filled triangle like this: /\
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x x coordinate of center
 * @param {number} y y coordinate of center
 * @param {number} halfSize half of the size
 * @returns {void}
 */
export function drawTriangle (context, x, y, halfSize) {
  context.beginPath()
  context.moveTo(x - halfSize, y + halfSize)
  context.lineTo(x + halfSize, y + halfSize)
  context.lineTo(x, y - halfSize)
  context.closePath()
  context.fill()
}

/**
 * Draws a diamond like this: <>
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x x coordinate of center
 * @param {number} y y coordinate of center
 * @param {number} halfSize half of the size
 * @returns {void}
 */
export function drawDiamond (context, x, y, halfSize) {
  context.beginPath()
  context.moveTo(x - halfSize, y)
  context.lineTo(x, y - halfSize)
  context.lineTo(x + halfSize, y)
  context.lineTo(x, y + halfSize)
  context.closePath()
  context.fill()
}

/**
 * Draws an X
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x x coordinate of center
 * @param {number} y y coordinate of center
 * @param {number} halfSize half of the size
 * @returns {void}
 */
export function drawX (context, x, y, halfSize) {
  context.save()
  context.lineWidth = 2
  context.beginPath()
  context.moveTo(x - halfSize, y - halfSize)
  context.lineTo(x + halfSize, y + halfSize)
  context.moveTo(x - halfSize, y + halfSize)
  context.lineTo(x + halfSize, y - halfSize)
  context.stroke()
  context.restore()
}

/**
 * Draws a trapezoid that looks like a rectangle but gets narrower at the right
 * end, so better show where one ends and the next begins.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x x coordinate of top left
 * @param {number} y y coordinate of top left
 * @param {number} width width
 * @param {number} height height (of left side)
 * @param {number} height2 height (of right side)
 * @returns {void}
 */
export function drawNoteTrapezoid (context, x, y, width, height, height2) {
  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x, y + height)
  context.lineTo(x + width, y + (height / 2 + height2 / 2))
  context.lineTo(x + width, y + (height / 2 - height2 / 2))
  context.closePath()
  context.fill()
}

/**
 * Draws a trapezoid that looks like a rectangle but gets narrower at the top
 * end, so better show where one ends and the next begins.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x x coordinate of bounding rect's top left
 * @param {number} y y coordinate of bounding rect's top left
 * @param {number} width width (of bounding rect / bottom side)
 * @param {number} height height
 * @param {number} width2 width (of top side)
 * @returns {void}
 */
export function drawNoteTrapezoidUpwards (context, x, y, width, height, width2) {
  context.beginPath()
  context.lineTo(x, y + height)
  context.lineTo(x + width, y + height)
  context.lineTo(x + (width / 2 + width2 / 2), y)
  context.lineTo(x + (width / 2 - width2 / 2), y)
  context.closePath()
  context.fill()
}

/**
 * Draws a rectangle with rounded corners, does not fill or stroke by itself
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x x coordinate of bounding rect's top left
 * @param {number} y y coordinate of bounding rect's top left
 * @param {number} width width
 * @param {number} height height
 * @param {number} radius rounding radius
 * @returns {void}
 */
export function drawRoundedRect (context, x, y, width, height, radius) {
  if (width < 0) { return }
  context.beginPath()
  context.moveTo(x + radius, y)
  context.lineTo(x + width - radius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + radius)
  context.lineTo(x + width, y + height - radius)
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  context.lineTo(x + radius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - radius)
  context.lineTo(x, y + radius)
  context.quadraticCurveTo(x, y, x + radius, y)
  context.closePath()
}

/**
 * Draws a horizontal, then vertical line to connect two points (or the other
 * way round when xFirst == false)
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x1 x coordinate of start
 * @param {number} y1 y coordinate of start
 * @param {number} x2 x coordinate of end
 * @param {number} y2 y coordinate of end
 * @param {boolean} [xFirst=true] controls whether to go first in x or y direction
 */
export function drawCornerLine (context, x1, y1, x2, y2, xFirst = true) {
  context.beginPath()
  context.moveTo(x1, y1)
  xFirst
    ? context.lineTo(x2, y1)
    : context.lineTo(x1, y2)
  context.lineTo(x2, y2)
  context.stroke()
}

/**
 * Draws a rounded version of drawCornerLine().
 * Only works for dendrograms drawn from top-dowm, use
 * drawRoundedCornerLineRightLeft for right-to-left dendrograms.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x1 x coordinate of start
 * @param {number} y1 y coordinate of start
 * @param {number} x2 x coordinate of end
 * @param {number} y2 y coordinate of end
 * @param {number} [maxRadius=25] maximum radius, fixes possible overlaps
 */
export function drawRoundedCornerLine (context, x1, y1, x2, y2, maxRadius = 25) {
  const xDist = Math.abs(x2 - x1)
  const yDist = Math.abs(y2 - y1)
  const radius = Math.min(xDist, yDist, maxRadius)
  const cx = x1 < x2 ? x2 - radius : x2 + radius
  const cy = y1 < y2 ? y1 + radius : y1 - radius
  context.beginPath()
  context.moveTo(x1, y1)
  if (x1 < x2) {
    context.arc(cx, cy, radius, 1.5 * Math.PI, 2 * Math.PI)
  } else {
    context.arc(cx, cy, radius, 1.5 * Math.PI, Math.PI, true)
  }
  context.lineTo(x2, y2)
  context.stroke()
}

/**
 * Draws a rounded version of drawRoundedCornerLine for right-to-left
 * dendrograms.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x1 x coordinate of start
 * @param {number} y1 y coordinate of start
 * @param {number} x2 x coordinate of end
 * @param {number} y2 y coordinate of end
 * @param {number} [maxRadius=25] maximum radius, fixes possible overlaps
 */
export function drawRoundedCornerLineRightLeft (
  context,
  x1,
  y1,
  x2,
  y2,
  maxRadius = 25
) {
  const xDist = Math.abs(x2 - x1)
  const yDist = Math.abs(y2 - y1)
  const radius = Math.min(xDist, yDist, maxRadius)
  const cx = x1 < x2 ? x1 + radius : x1 - radius
  const cy = y1 < y2 ? y2 - radius : y2 + radius
  context.beginPath()
  context.moveTo(x1, y1)
  if (y1 < y2) {
    context.arc(cx, cy, radius, 0, 0.5 * Math.PI)
  } else {
    context.arc(cx, cy, radius, 0, 1.5 * Math.PI, true)
  }
  context.lineTo(x2, y2)
  context.stroke()
}

/**
 * Draws a hexagon, call context.fill() or context.stroke() afterwards.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} cx center x
 * @param {number} cy center y
 * @param {number} radius radius of the circle on which the points are placed
 */
export function drawHexagon (context, cx, cy, radius) {
  context.beginPath()
  for (let index = 0; index < 6; index++) {
    // Start at 30° TODO: allow to specify
    const angle = (60 * index + 30) / 180 * Math.PI
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    if (index === 0) {
      context.moveTo(x, y)
    } else {
      context.lineTo(x, y)
    }
  }
  context.closePath()
}

/**
 * Draws a Bezier curve to connect to points in X direction.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x1 x coordinate of the first point
 * @param {number} y1 y coordinate of the first point
 * @param {number} x2 x coordinate of the second point
 * @param {number} y2 y coordinate of the second point
 */
export function drawBezierConnectorX (context, x1, y1, x2, y2) {
  const deltaX = (x2 - x1) / 2
  context.beginPath()
  context.moveTo(x1, y1)
  context.bezierCurveTo(x1 + deltaX, y1, x1 + deltaX, y2, x2, y2)
  context.stroke()
}

/**
 * Draws a Bezier curve to connect to points in Y direction.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x1 x coordinate of the first point
 * @param {number} y1 y coordinate of the first point
 * @param {number} x2 x coordinate of the second point
 * @param {number} y2 y coordinate of the second point
 */
export function drawBezierConnectorY (context, x1, y1, x2, y2) {
  const deltaY = (y2 - y1) / 2
  context.beginPath()
  context.moveTo(x1, y1)
  context.bezierCurveTo(x1, y1 + deltaY, x2, y1 + deltaY, x2, y2)
  context.stroke()
}

/**
 * Draws a funnel to indicate that horizontal span relates to another one below
 * Will fill() the shape, call context.stroke() afterwards to also stroke.
 *
 * @todo add X version
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} y1 top y position
 * @param {number} y2 bottom y position
 * @param {number} x1left top left x position
 * @param {number} x1right top right x position
 * @param {number} x2left bottom left x position
 * @param {number} x2right bottom right x position
 */
export function drawBezierFunnelY (
  context,
  y1,
  y2,
  x1left,
  x1right,
  x2left,
  x2right
) {
  const deltaY = (y2 - y1) / 2
  context.beginPath()
  context.moveTo(x1left, y1)
  context.bezierCurveTo(x1left, y1 + deltaY, x2left, y1 + deltaY, x2left, y2)
  context.lineTo(x2right, y2)
  context.bezierCurveTo(
    x2right,
    y1 + deltaY,
    x1right,
    y1 + deltaY,
    x1right,
    y1
  )
  context.closePath()
  context.fill()
}

/**
 * Draws a rounded corner, requires x and y distances between points to be
 * equal.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x1 x coordinate of the first point
 * @param {number} y1 y coordinate of the first point
 * @param {number} x2 x coordinate of the second point
 * @param {number} y2 y coordinate of the second point
 * @param {boolean} turnLeft true for left turn, false for right turn
 * @param {number} roundness corner roundness between 0 (sharp) and 1 (round)
 */
export function drawRoundedCorner (context, x1, y1, x2, y2, turnLeft = true, roundness = 1) {
  context.beginPath()
  context.moveTo(x1, y1)
  if (x1 === x2 || y1 === y2) {
    context.lineTo(x2, y2)
    context.stroke()
    return
  }
  const radius = Math.abs(x2 - x1) * roundness
  let cx
  let cy
  if (turnLeft) {
    if (x1 < x2 && y1 < y2) {
      cx = x1 + radius
      cy = y2 - radius
      context.arc(cx, cy, radius, 1 * Math.PI, 0.5 * Math.PI, true)
    } else if (x1 > x2 && y1 < y2) {
      cx = x2 + radius
      cy = y1 + radius
      context.arc(cx, cy, radius, 1.5 * Math.PI, 1 * Math.PI, true)
    } else if (x1 > x2 && y1 > y2) {
      cx = x1 - radius
      cy = y2 + radius
      context.arc(cx, cy, radius, 0, 1.5 * Math.PI, true)
    } else {
      cx = x2 - radius
      cy = y1 - radius
      context.arc(cx, cy, radius, 0.5 * Math.PI, 0, true)
    }
  } else {
    if (x1 < x2 && y1 < y2) {
      cx = x2 - radius
      cy = y1 + radius
      context.arc(cx, cy, radius, 1.5 * Math.PI, 0)
    } else if (x1 > x2 && y1 < y2) {
      cx = x1 - radius
      cy = y2 - radius
      context.arc(cx, cy, radius, 0, 0.5 * Math.PI)
    } else if (x1 > x2 && y1 > y2) {
      cx = x2 + radius
      cy = y1 - radius
      context.arc(cx, cy, radius, 0.5 * Math.PI, 1 * Math.PI, false)
    } else {
      cx = x1 + radius
      cy = y2 + radius
      context.arc(cx, cy, radius, Math.PI, 1.5 * Math.PI, false)
    }
  }
  context.lineTo(x2, y2)
  context.stroke()
}

/**
 * Draws an arc that connects similar parts.
 * Both parts must have the same width in pixels.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} startX1 x coordinate of the start of the first part
 * @param {number} startX2 x coordinate of the start of the second part
 * @param {number} length length in pixels of the parts
 * @param {number} yBottom bottom baseline y coordinate
 */
export function drawArc (context, startX1, startX2, length, yBottom) {
  // Get center and radius
  const radius = (startX2 - startX1) / 2
  const cx = startX1 + radius + length / 2
  context.lineWidth = length
  context.beginPath()
  context.arc(cx, yBottom, radius, Math.PI, 2 * Math.PI)
  context.stroke()
}

/**
 * Draws a more complex path and fills it.
 * Two arcs: One from startX1 to endX2 on the top, one from endX1 to startX2
 * below it.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} startX1 x coordinate of the start of the first part
 * @param {number} endX1 x coordinate of the end of the first part
 * @param {number} startX2 x coordinate of the start of the second part
 * @param {number} endX2 x coordinate of the end of the second part
 * @param {number} yBottom bottom baseline y coordinate
 */
export function drawAssymetricArc (context, startX1, endX1, startX2, endX2, yBottom) {
  // Get center and radius
  const radiusTop = (endX2 - startX1) / 2
  if (radiusTop < 0) {
    return
  }
  let radiusBottom = (startX2 - endX1) / 2
  if (radiusBottom < 0) {
    radiusBottom = 0
  }
  const cxTop = startX1 + radiusTop
  const cxBottom = endX1 + radiusBottom
  context.beginPath()
  context.moveTo(startX1, yBottom)
  context.arc(cxTop, yBottom, radiusTop, Math.PI, 2 * Math.PI)
  context.lineTo(startX2, yBottom)
  context.arc(cxBottom, yBottom, radiusBottom, 2 * Math.PI, Math.PI, true)
  context.closePath()
  context.fill()
}

/**
 * Draws a horizontal bracket like this |_____| (bottom)
 * or this |""""""| (top).
 * Use a positive h for bottom and a negative one for top.
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x x position of the bracket's horizontal lines
 * @param {number} y y position of the bracket's horizontal lines
 * @param {number} w width of the bracket's horizontal lines
 * @param {number} h height of the bracket's vertical ticks
 */
export function drawBracketH (context, x, y, w, h) {
  context.beginPath()
  context.moveTo(x, y + h)
  context.lineTo(x, y)
  context.lineTo(x + w, y)
  context.lineTo(x + w, y + h)
  context.stroke()
}

/**
 * Draws a quadratic matrix onto a canvas
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number[][]} matrix matrix
 * @param {number} [x=0] x position of the top left corner
 * @param {number} [y=0] y position of the top left corner
 * @param {number} [size=400] width and height in pixel
 * @param {Function} colorMap colormap from [min, max] to a color
 */
export function drawMatrix (
  context,
  matrix,
  x = 0,
  y = 0,
  size = 400,
  colorScale,
  colorMap = d3.interpolateViridis
) {
  const cellSize = size / matrix.length
  const paddedSize = cellSize * 1.01
  colorScale = colorScale || d3
    .scaleLinear()
    .domain(d3.extent(matrix.flat()))
    .range([1, 0])
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      context.fillStyle = colorMap(colorScale(matrix[row][col]))
      context.fillRect(x, y, paddedSize, paddedSize)
      x += cellSize
    }
    y += cellSize
  }
}

/**
 * Draws a color ramp
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {Function} colorMap colormap from [min, max] to a color
 */
export function drawColorRamp (context, w = 100, h = 10, colorMap = d3.interpolateRainbow) {
  const scaleColor = d3.scaleLinear().domain([0, w])
  for (let x = 0; x < w; ++x) {
    context.fillStyle = colorMap(scaleColor(x))
    context.fillRect(x, 0, 1.1, h)
  }
}

/**
 * Draws text horizontally rotated 90 degrees clock-wise
 * @todo use the one from mvlib
 * @param {*} context
 * @param {number} x x position
 * @param {number} y y position
 * @param {string} text text
 * @param {string} [color='black'] HTML color string
 * @param {string} [font='12px sans-serif'] font string, e.g, '12px sans-serif'
 * @param {boolean} [centered=false] center text?
 */
export function drawVerticalText (
  context,
  x,
  y,
  text,
  color = 'black',
  font = '12px sans-serif',
  centered = false
) {
  context.save()
  context.rotate((90 * Math.PI) / 180)
  if (centered) {
    context.textAlign = 'center'
  }
  context.fillStyle = color
  context.font = font
  context.fillText(text, y, -x)
  context.restore()
}
