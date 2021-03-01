/* eslint-disable no-bitwise */
const fs = require('fs');
const PNG = require('pngjs').PNG;

/**
 * Similar to HTML canvas API
 */
export class Image {
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

/**
 * Test
 */
function test() {
    const width = 600;
    const height = 300;
    const image = new Image(width, height);
    // image.fillStyle = [0, 0, 0, 255];
    image.fillStyle = [255, 255, 255, 255];
    image.fillRect(200, 100, 100, 50);
    image.writeToPngFile('test.png');
}

test();
