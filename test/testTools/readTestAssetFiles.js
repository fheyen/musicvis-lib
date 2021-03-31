import fs from 'fs';
import path from 'path';
import MusicPiece from '../../src/types/MusicPiece';


/**
 * Reads a binary file
 *
 * @param {string} fileName filenamefileName
 * @param {string} directory directory
 * @returns {Buffer} binary
 */
export function readFile(fileName, directory) {
    const file = path.join(directory, fileName);
    return fs.readFileSync(file);
}

/**
 * Reads a MIDI file
 *
 * @param {string} fileName filenamefileName
 * @param {string} directory directory
 * @returns {Buffer} MIDI binary
 */
export function readMidiFile(fileName, directory) {
    const file = path.join(directory, fileName);
    return fs.readFileSync(file, 'base64');
}

/**
 * Reads a MusicXML file
 *
 * @param {string} fileName filenamefileName
 * @param {string} directory directory
 * @returns {string} XML text
 */
export function readXmlFile(fileName, directory) {
    const file = path.join(directory, fileName);
    return fs.readFileSync(file, 'utf8');
}

/**
 * Reads a list of file names that are in this directory (non-recursive)
 *
 * @param {string} fileName filenamefileName
 * @param {string} directory directory
 * @returns {string[]} file names
 */
export function listFiles(directory) {
    return fs.readdirSync(directory);
}

/**
 * Returns a list of all song files (without extension) that are available as
 * both .mid and .musicxml
 *
 * @param {string} directory directory
 * @returns {string[]} file names (without extension)
 */
export function getSongsWithMidiAndXml(directory) {
    const filesPrivate = listFiles(directory);
    const filesPrivateSet = new Set(filesPrivate);
    const filesMidiAndMusicXML = [];
    for (const file of filesPrivate) {
        if (file.endsWith('.mid')) {
            const baseName = file.replace('.mid', '');
            if (filesPrivateSet.has(`${baseName}.musicxml`)) {
                filesMidiAndMusicXML.push(baseName);
            }
        }
    }
    return filesMidiAndMusicXML;
}

/**
 * Reads and parses a MIDI file and returns the parsed notes
 *
 * @param {string} fileBaseName filename without extension
 * @param {string} directory directory
 * @returns {Note[]} notes
 */
export function getAllNotesFromMidi(fileBaseName, directory) {
    const midi = readMidiFile(`${fileBaseName}.mid`, directory);
    return MusicPiece.fromMidi(fileBaseName, midi).getAllNotes();
}

/**
 * Reads and parses a MusicXML file and returns the parsed notes
 *
 * @param {string} fileBaseName filename without extension
 * @param {string} directory directory
 * @returns {Note[]} notes
 */
export function getAllNotesFromXml(fileBaseName, directory) {
    const xml = readXmlFile(`${fileBaseName}.musicxml`, directory);
    return MusicPiece.fromMusicXml(fileBaseName, xml).getAllNotes();
}
