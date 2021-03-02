/* eslint-disable no-bitwise */
const fs = require('fs');
const PNG = require('pngjs').PNG;

/**
 * Similar to HTML canvas API
 */
class Image {
    /**
     * Creates a new empty image
     *
     * @param {number} width width in pixels
     * @param {number} height height in pixels
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.fillStyle = [0, 0, 0, 255];
        this.strokeStyle = [0, 0, 0, 255];
        this.data = Uint8Array.from({ length: width * height * 4 });
        // Initialize to fully transparent
        this.fillRect(0, 0, width, height, [0, 0, 0, 0]);
    }

    // setFillColor(rgbaArray) {
    //     this.fillStyle = rgbaArray;
    // }

    /**
     * Fills a rectangle
     *
     * @param {number} xPos x
     * @param {number} yPos y
     * @param {number} width width
     * @param {number} height height
     * @param {number[]} fillStyle color as [r, g, b, a], values are 0-255
     */
    fillRect(xPos, yPos, width, height, fillStyle = this.fillStyle) {
        xPos = Math.round(xPos);
        yPos = Math.round(yPos);
        width = Math.round(width);
        height = Math.round(height);
        const [r, g, b, a] = fillStyle;
        // console.log(`Fill rect ${xPos} ${yPos} with ${fillStyle.join(' ')}`);
        for (let y = yPos; y < yPos + height; y++) {
            for (let x = xPos; x < xPos + width; x++) {
                const index = (this.width * y + x) << 2;
                this.data[index + 0] = r;
                this.data[index + 1] = g;
                this.data[index + 2] = b;
                this.data[index + 3] = a;
            }
        }
    }

    /**
     * Draws a straight line between (x1, y1) and (x2, y2)
     *
     * @param {number} x1 x coordinate of the first point
     * @param {number} y1 y coordinate of the first point
     * @param {number} x2 x coordinate of the second point
     * @param {number} y2 y coordinate of the second point
     * @param {number[]} fillStyle fill color
     */
    drawLine(x1, y1, x2, y2, fillStyle = this.fillStyle) {
        const [r, g, b, a] = fillStyle;
        x1 = Math.round(x1);
        x2 = Math.round(x2);
        if (x1 === x2) {
            // Avoid division through 0
            return;
        }
        if (x1 > x2) {
            const temporary = x1;
            x1 = x2;
            x2 = temporary;
            const temporary2 = y1;
            y1 = y2;
            y2 = temporary2;
        }
        const yStep = (y2 - y1) / (x2 - x1);
        let currentY = y1;
        for (let currentX = Math.round(x1); currentX < Math.round(x2); currentX++) {
            const xPos = Math.round(currentX);
            const yPos = Math.round(currentY);
            currentY += yStep;
            const index = (this.width * yPos + xPos) << 2;
            this.data[index + 0] = r;
            this.data[index + 1] = g;
            this.data[index + 2] = b;
            this.data[index + 3] = a;
        }
    }

    /**
     * Saves the image to a PNG file
     *
     * @param {string} fileName  file name
     */
    writeToPngFile(fileName) {
        const png = new PNG({
            width: this.width,
            height: this.height,
            colorType: 4,
        });
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const index = (this.width * y + x) << 2;
                png.data[index + 0] = this.data[index + 0];
                png.data[index + 1] = this.data[index + 1];
                png.data[index + 2] = this.data[index + 2];
                png.data[index + 3] = this.data[index + 2];
            }
        }
        // console.log(`Writing to ${fileName}`);
        const buffer = PNG.sync.write(png, {});
        fs.writeFileSync(fileName, buffer);
    }
}

module.exports = {
    Image,
};
