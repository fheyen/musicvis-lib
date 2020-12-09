/**
 * Sets up a canvas rescaled to device pixel ratio
 * From https://www.html5rocks.com/en/tutorials/canvas/hidpi/
 * @param {HTMLCanvasElement} canvas canvas element
 * @returns {CanvasRenderingContext2D} canvas rendering context
 */
export function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // Size times the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}


/**
 * Draws a stroked circle.
 * @param {CanvasRenderingContext2D} ctx canvas rendering context
 * @param {number} x x coordinate of center
 * @param {number} y y coordinate of center
 * @param {number} radius radius
 */
export function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

/**
 * Draws a filled circle.
 * @param {CanvasRenderingContext2D} ctx canvas rendering context
 * @param {number} x x coordinate of center
 * @param {number} y y coordinate of center
 * @param {number} radius radius
 */
export function drawFilledCircle(ctx, x, y, radius) {
    if (radius < 0) {
        console.error(`Cannot draw circle with negative radius of ${radius}`);
    }
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

/**
 * Draws a filled triangle like this: /\
 * @param {CanvasRenderingContext2D} ctx canvas rendering context
 * @param {number} x x coordinate of center
 * @param {number} y y coordinate of center
 * @param {number} halfSize half of the size
 */
export function drawTriangle(ctx, x, y, halfSize) {
    ctx.beginPath();
    ctx.moveTo(x - halfSize, y + halfSize);
    ctx.lineTo(x + halfSize, y + halfSize);
    ctx.lineTo(x, y - halfSize);
    ctx.closePath();
    ctx.fill();
}

/**
 * Draws a diamond like this: <>
 * @param {CanvasRenderingContext2D} ctx canvas rendering context
 * @param {number} x x coordinate of center
 * @param {number} y y coordinate of center
 * @param {number} halfSize half of the size
 */
export function drawDiamond(ctx, x, y, halfSize) {
    ctx.beginPath();
    ctx.moveTo(x - halfSize, y);
    ctx.lineTo(x, y - halfSize);
    ctx.lineTo(x + halfSize, y);
    ctx.lineTo(x, y + halfSize);
    ctx.closePath();
    ctx.fill();
}

/**
 * Draws an X
 * @param {CanvasRenderingContext2D} ctx canvas rendering context
 * @param {number} x x coordinate of center
 * @param {number} y y coordinate of center
 * @param {number} halfSize half of the size
 */
export function drawX(ctx, x, y, halfSize) {
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - halfSize, y - halfSize);
    ctx.lineTo(x + halfSize, y + halfSize);
    ctx.moveTo(x - halfSize, y + halfSize);
    ctx.lineTo(x + halfSize, y - halfSize);
    ctx.stroke();
    ctx.lineWidth = 1;
}

/**
 * Draws a trapezoid that looks like a rectangle but gets narrower at the right
 * end, so better show where one ends and the next begins.
 * @param {CanvasRenderingContext2D} ctx canvas rendering context
 * @param {number} x x coordinate of top left
 * @param {number} y y coordinate of top left
 * @param {number} width width
 * @param {number} height height (of left side)
 * @param {number} height2 height (of right side)
 */
export function drawNoteTrapezoid(ctx, x, y, width, height, height2) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + width, y + (height / 2 + height2 / 2));
    ctx.lineTo(x + width, y + (height / 2 - height2 / 2));
    ctx.closePath();
    ctx.fill();
}

/**
 * Draws a trapezoid that looks like a rectangle but gets narrower at the top
 * end, so better show where one ends and the next begins.
 * @param {CanvasRenderingContext2D} ctx canvas rendering context
 * @param {number} x x coordinate of bounding rect's top left
 * @param {number} y y coordinate of bounding rect's top left
 * @param {number} width width (of bounding rect / bottom side)
 * @param {number} height height
 * @param {number} width2 width (of top side)
 */
export function drawNoteTrapezoidUpwards(ctx, x, y, width, height, width2) {
    ctx.beginPath();
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + (width / 2 + width2 / 2), y);
    ctx.lineTo(x + (width / 2 - width2 / 2), y);
    ctx.closePath();
    ctx.fill();
}

/**
 * Draws a rectangle with rounded corners
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} radius
 * @param {string | CanvasGradient | CanvasPattern} fill
 */
export function drawRoundedRect(ctx, x, y, width, height, radius, fill = null) {
    if (width < 0) { return; }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    ctx.stroke();
}