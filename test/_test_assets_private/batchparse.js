/**
 * Parses MIDI with midi-parser-js into JSON files
 *
 * Usage:
 * node .\batchparse.js
 */
const midiParser = require('midi-parser-js');
const fs = require('fs');
const glob = require('glob');
const musicvislib = require('../../dist/musicvislib');

/**
 * Parses a .mid file and writes the parsed JSON to a .json file in the same
 * directory
 *
 * @param {string} file file name
 */
function parse(file) {
    console.log(`File ${file}`);
    // Parse with midi-parser-js
    const midiFile = fs.readFileSync(file, 'base64');
    const json = midiParser.parse(midiFile);
    const outFile = `${file}.json`;
    fs.writeFileSync(outFile, JSON.stringify(json, undefined, 4));
    // Parse with musicvislib.MusicPiece
    try {
        const mp = musicvislib.MusicPiece.fromMidi(file, midiFile);
        const outFile2 = `${file}.musicpiece.json`;
        fs.writeFileSync(outFile2, JSON.stringify(mp, undefined, 4));
    } catch (error) {
        console.error('Cannot parse as MusicPiece');
        console.error(error);
    }
}

/**
 * Uses glob to get all *.mid* files in input directory, then parses them and
 * writes results
 */
function main() {
    // Get list of all MusicXML files using glob
    const options = {
        nodir: true,
        ignore: '*node_modules*',
    };
    const inputFiles = glob.sync(`${__dirname}/*.mid`, options);
    console.log(`Found ${inputFiles.length} input files\n`);
    // Fix all files
    for (const file of inputFiles) {
        parse(file);
    }
}

main();
