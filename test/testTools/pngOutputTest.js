import { Image } from './pngOutput';

/**
 * Test: Draw simple shapes to a PNG file
 */
function test() {
    const width = 600;
    const height = 300;
    const image = new Image(width, height);
    // Background
    image.fillStyle = [255, 255, 255, 255];
    image.fillRect(0, 0, width, height);
    // rectangle
    image.fillStyle = [0, 128, 255, 255];
    image.fillRect(200, 100, 200, 50);
    // line
    image.fillStyle = [255, 0, 0, 255];
    image.drawLine(200, 100, 300, 150);
    image.drawLine(400, 150, 300, 100);
    image.writeToPngFile('test.png');
}

test();
