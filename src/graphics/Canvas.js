/**
 * @module graphics/Canvas
 * @todo save canvas as file https://www.digitalocean.com/community/tutorials/js-canvas-toblob
 */

/**
 * Sets up a canvas rescaled to device pixel ratio
 *
 * @param {HTMLCanvasElement} canvas canvas element
 * @returns {CanvasRenderingContext2D} canvas rendering context
 */
export function setupCanvas(canvas) {
    // Fix issues when importing musicvis-lib in Node.js
    if (!window) { return; }
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // sizes times the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const context = canvas.getContext('2d');
    // Scale all drawing operations by the dpr
    context.scale(dpr, dpr);
    return context;
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
export function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
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
export function drawHLine(context, x1, y, x2) {
    context.beginPath();
    context.moveTo(x1, y);
    context.lineTo(x2, y);
    context.stroke();
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
export function drawVLine(context, x, y1, y2) {
    context.beginPath();
    context.moveTo(x, y1);
    context.lineTo(x, y2);
    context.stroke();
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
export function drawCircle(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
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
export function drawFilledCircle(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
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
export function drawTriangle(context, x, y, halfSize) {
    context.beginPath();
    context.moveTo(x - halfSize, y + halfSize);
    context.lineTo(x + halfSize, y + halfSize);
    context.lineTo(x, y - halfSize);
    context.closePath();
    context.fill();
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
export function drawDiamond(context, x, y, halfSize) {
    context.beginPath();
    context.moveTo(x - halfSize, y);
    context.lineTo(x, y - halfSize);
    context.lineTo(x + halfSize, y);
    context.lineTo(x, y + halfSize);
    context.closePath();
    context.fill();
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
export function drawX(context, x, y, halfSize) {
    context.save();
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x - halfSize, y - halfSize);
    context.lineTo(x + halfSize, y + halfSize);
    context.moveTo(x - halfSize, y + halfSize);
    context.lineTo(x + halfSize, y - halfSize);
    context.stroke();
    context.restore();
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
export function drawNoteTrapezoid(context, x, y, width, height, height2) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + height);
    context.lineTo(x + width, y + (height / 2 + height2 / 2));
    context.lineTo(x + width, y + (height / 2 - height2 / 2));
    context.closePath();
    context.fill();
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
export function drawNoteTrapezoidUpwards(context, x, y, width, height, width2) {
    context.beginPath();
    context.lineTo(x, y + height);
    context.lineTo(x + width, y + height);
    context.lineTo(x + (width / 2 + width2 / 2), y);
    context.lineTo(x + (width / 2 - width2 / 2), y);
    context.closePath();
    context.fill();
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
export function drawRoundedRect(context, x, y, width, height, radius) {
    if (width < 0) { return; }
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
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
export function drawCornerLine(context, x1, y1, x2, y2, xFirst = true) {
    context.beginPath();
    context.moveTo(x1, y1);
    xFirst
        ? context.lineTo(x2, y1)
        : context.lineTo(x1, y2);
    context.lineTo(x2, y2);
    context.stroke();
}

/**
 * Draws a rounded version of drawCornerLine()
 *
 * @todo only works for dendrograms drawn from top-dowm
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} x1 x coordinate of start
 * @param {number} y1 y coordinate of start
 * @param {number} x2 x coordinate of end
 * @param {number} y2 y coordinate of end
 * @param {number} [maxRadius=25] maximum radius, fixes possible overlaps
 */
export function drawRoundedCornerLine(context, x1, y1, x2, y2, maxRadius = 25) {
    const xDist = Math.abs(x2 - x1);
    const yDist = Math.abs(y2 - y1);
    const radius = Math.min(xDist, yDist, maxRadius);
    const cx = x1 < x2 ? x2 - radius : x2 + radius;
    const cy = y1 < y2 ? y1 + radius : y1 - radius;
    context.beginPath();
    context.moveTo(x1, y1);
    if (x1 < x2) {
        context.arc(cx, cy, radius, 1.5 * Math.PI, 2 * Math.PI);
    } else {
        context.arc(cx, cy, radius, 1.5 * Math.PI, Math.PI, true);
    }
    context.lineTo(x2, y2);
    context.stroke();
}

/**
 * Draws a hexagon
 *
 * @param {CanvasRenderingContext2D} context canvas rendering context
 * @param {number} cx center x
 * @param {number} cy center y
 * @param {number} radius radius of the circle on which the points are placed
 */
export function drawHexagon(context, cx, cy, radius) {
    context.beginPath();
    for (let index = 0; index < 6; index++) {
        // Start at 30° TODO: allow to specify
        const angle = (60 * index + 30) / 180 * Math.PI;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (index === 0) {
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
        }
    }
    context.closePath();
}
