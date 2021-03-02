import path from 'path';
import { Image } from '../testTools/pngOutput.js';
// import { alignGtAndRecToMinimizeDiffError } from '../../src/experimental/DiffAlignment.js';
import diffAlign from '../../src/experimental/DiffAlignment.js';
const { alignGtAndRecToMinimizeDiffError } = diffAlign;
// import { getAllNotesFromMidi } from '../testTools/readTestAssetFiles.js';
import readAssets from '../testTools/readTestAssetFiles.js';
const { getAllNotesFromMidi } = readAssets;
// const Image = require('../testTools/pngOutput').Image;
// const getAllNotesFromMidi = require('../testTools/readTestAssetFiles').getAllNotesFromMidi;
// const path = require('path');

/**
 * Main
 */
function main() {

    const GT_DIR_PRIVATE = path.join(__dirname, '..', '_test_assets_private');
    const gt = getAllNotesFromMidi('[Drums] A-ha - Take On Me1', GT_DIR_PRIVATE);
    const rec = gt.slice(0, 4);
    const result = alignGtAndRecToMinimizeDiffError(gt, rec, 100);

    const maxAgreement = result[0].agreement;
    result.sort((a, b) => a.offsetBins - b.offsetBins);

    const width = result.length;
    const height = maxAgreement;
    const image = new Image(width, height);
    image.fillRect(0, 0, width, height, Image.colors.BLACK);
    image.fillStyle = Image.colors.WHITE;
    for (const [index, match] of result.entries()) {
        image.fillPixel(index, height - match.agreement);
    }
    image.writeToPngFile(path.join(__dirname, 'take-on-me.png'));
}

main();
