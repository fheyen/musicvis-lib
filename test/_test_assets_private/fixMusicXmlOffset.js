/**
 * Fixes the fact that TuxGuitar outputs MusicXML with all notes one octave too
 * high by decrementing all octaves in notes and tuning.
 *
 * The reverse flag will do the opposite to undo accidental changes.
 *
 * Usage:
 * node .\fixMusicXmlOffset.js [reverse] inputDirectory outputDirectory
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const jsdom = require("jsdom");

/**
 * Fixes a single XML file by decrementing all octaves in all notes and tuning
 * steps
 *
 * @param {string} inputDir input directory
 * @param {string} outputDir output directory
 * @param {string} file file name
 */
function fix(inputDir, outputDir, file, reverse = false) {
    const add = reverse ? 1 : -1;
    console.log(`Fixing ${file}`);
    // Read MusicXML file
    const xmlFile = fs.readFileSync(file, 'utf8');
    const dom = new jsdom.JSDOM(xmlFile);
    const xmlDocument = dom.window.document;
    // Replace all octaves by octave - 1
    const noteOctaves = xmlDocument.querySelectorAll('octave');
    for (const octave of noteOctaves) {
        octave.innerHTML = +octave.innerHTML + add;
    }
    // Also fix tuning
    const tuningOctaves = xmlDocument.querySelectorAll('tuning-octave');
    for (const octave of tuningOctaves) {
        octave.innerHTML = +octave.innerHTML + add;
    }
    // Serialize to string
    let resultString = dom.window.document.documentElement.outerHTML;
    // Fix HTMl tags added by jsdom
    resultString = resultString.replace('<html><head></head><body>', '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n');
    resultString = resultString.replace('</body></html>', '');
    // Write file
    const outFile = path.join(outputDir, file.replaceAll('\\', '/').replace(inputDir, ''));
    console.log(`    Writing to ${outFile}`);
    fs.writeFileSync(outFile, resultString);
}

/**
 * Uses glob to get all *.*xml files in input directory, then fixes them and
 * writes results to output directory
 */
function main() {
    // Get input and output directories from commandline arguments
    const arguments = process.argv;
    const outputDir = arguments.pop();
    const inputDir = arguments.pop();
    const reverse = arguments.pop() === 'reverse';
    console.log(`Reverse: ${reverse}`);
    console.log(`\nInput: ${inputDir}\nOutput: ${outputDir}\n`);
    // Get list of all MusicXML files using glob
    const options = {
        nodir: true,
        ignore: '*node_modules*',
    };
    const inputFiles = glob.sync(`${inputDir}/**/*.*xml`, options);
    console.log(`Found ${inputFiles.length} input files\n`);
    // Create outputDir if it doesn't exist
    fs.mkdirSync(outputDir, { recursive: true });
    // Fix all files
    for (const file of inputFiles) {
        try {
            fix(inputDir, outputDir, file, reverse);
        } catch (error) {
            console.error(`Cannot fix file ${file}`);
            console.error(error);
        }
    }
}

main();
