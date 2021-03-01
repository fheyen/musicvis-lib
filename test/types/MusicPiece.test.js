import MusicPiece, { Track, TempoDefinition, TimeSignature, KeySignature } from '../../src/types/MusicPiece';
import fs from 'fs';
import path from 'path';
import GuitarNote from '../../src/types/GuitarNote';
import Note from '../../src/types/Note';

const GT_DIR = path.join(__dirname, '..', '_test_assets');
const GT_DIR_PRIVATE = path.join(__dirname, '..', '_test_assets_private');

// TODO: async to speed up testing
function readMidiFile2(fileName, dir = GT_DIR) {
    const file = path.join(dir, fileName);
    return fs.readFileSync(file, 'base64');
}

function readXmlFile(fileName, dir = GT_DIR) {
    const file = path.join(dir, fileName);
    return fs.readFileSync(file, 'utf8');
}

function listFiles(dir = GT_DIR) {
    return fs.readdirSync(dir);
}

/**
 * Reads and parses a MIDI file and returns the parsed notes
 *
 * @param {string} fileBaseName filename without extension
 * @returns {Note[]} notes
 */
function getAllNotesFromMidi(fileBaseName, dir = GT_DIR) {
    const midi = readMidiFile2(`${fileBaseName}.mid`, dir);
    return MusicPiece.fromMidi(fileBaseName, midi).getAllNotes();
}

/**
 * Reads and parses a MusicXML file and returns the parsed notes
 *
 * @param {string} fileBaseName filename without extension
 * @returns {Note[]} notes
 */
function getAllNotesFromXml(fileBaseName, dir = GT_DIR) {
    const xml = readXmlFile(`${fileBaseName}.musicxml`, dir);
    return MusicPiece.fromMusicXml(fileBaseName, xml).getAllNotes();
}

/**
 * Simplifies each object in an array by copying only some keys and their values
 *
 * @param {object[]} objectArray array with objects
 * @param {string[]} keys keys to copy
 */
function simplify(objectArray, keys) {
    return objectArray.map(obj => {
        const newObj = {};
        for (const key of keys) {
            newObj[key] = obj[key];
        }
        return newObj;
    });
}

test('simplify test helper', () => {
    const notes = [
        Note.from({ pitch: 42, start: 12 }),
        Note.from({ pitch: 43, start: 13 }),
    ];
    expect(simplify(notes, ['pitch'])).toStrictEqual([
        { pitch: 42 },
        { pitch: 43 },
    ]);
    expect(simplify(notes, ['pitch', 'start'])).toStrictEqual([
        { pitch: 42, start: 12 },
        { pitch: 43, start: 13 },
    ]);
});

describe('MusicPiece', () => {

    describe('constuctor', () => {
        test('invalid tracks', () => {
            expect(() => new MusicPiece()).toThrow('No or invalid tracks given');
        });
    });

    describe('getAllNotes', () => {
        test('unsorted', () => {
            const file = readMidiFile2('[Test] 3-4 meter.mid');
            const mp = MusicPiece.fromMidi('test', file);
            expect(
                mp.getAllNotes()
            ).toStrictEqual(
                mp.tracks.flatMap(t => t.notes)
            );
        });
        // TODO: create an unsorted track manually
        test('sorted', () => {
            const file = readMidiFile2('[Test] 3-4 meter.mid');
            const mp = MusicPiece.fromMidi('test', file);
            expect(
                mp.getAllNotes(true)
            ).toStrictEqual(
                mp.tracks.flatMap(t => t.notes).sort((a, b) => a.start - b.start)
            );
        });
    });

    describe('fromMidi', () => {
        test('empty', () => {
            expect(() => MusicPiece.fromMidi()).toThrow('No MIDI file content given');
        });

        test('actual file', () => {
            const file = readMidiFile2('[Test] 3-4 meter.mid');
            expect(() => MusicPiece.fromMidi('test', file)).not.toThrow();
        });

        test('produces Notes', () => {
            const midi = readMidiFile2(`[Test] Guitar Techniques 2.mid`);
            const midiNotes = MusicPiece.fromMidi('test', midi).getAllNotes();
            for (let note of midiNotes) {
                expect(note).toBeInstanceOf(Note);
            }
        });

        const allMidiFiles = listFiles()
            .filter(f => f.endsWith('.mid') || f.endsWith('.midi'));

        test.each(allMidiFiles)('parses MIDI without error %s', (file) => {
            const midi = readMidiFile2(file);
            expect(() => MusicPiece.fromMidi(file, midi)).not.toThrow();
        });
    });

    describe('fromMusicXml', () => {
        test('empty arguments', () => {
            expect(() => MusicPiece.fromMusicXml()).toThrow('No MusicXML file content given');
        });

        test('empty file (no tracks)', () => {
            const file = readXmlFile('[Test] Empty.musicxml');
            expect(() => MusicPiece.fromMusicXml('test', file)).toThrow('No or invalid tracks given');
        });

        test('actual file', () => {
            const file = readXmlFile('[Test] 3-4 meter.musicxml');
            expect(() => MusicPiece.fromMusicXml('test', file)).not.toThrow();
        });

        test('produces GuitarNotes', () => {
            const xml = readXmlFile('[Test] Guitar Techniques 2.musicxml');
            const xmlNotes = MusicPiece.fromMusicXml('test', xml).getAllNotes();
            for (let note of xmlNotes) {
                expect(note).toBeInstanceOf(GuitarNote);
            }
        });

        const allXmlFiles = listFiles()
            .filter(f => f.endsWith('.xml') || f.endsWith('.musicxml'))
            .filter(f => f !== '[Test] Empty.musicxml');
        test.each(allXmlFiles)('parses MusicXML without error %s', (file) => {
            const xml = readXmlFile(file);
            expect(() => MusicPiece.fromMusicXml(file, xml)).not.toThrow();
        });
    });

    /**
     * Tests for all musicxml files whether the MIDI file leads to the same output
     */
    describe('equal result from MIDI and MusicXml', () => {
        const excludeFiles = new Set([
            '[Test] Empty.musicxml',
            '[Test] Simple Drum Pattern 1 120 bpm.musicxml',
        ]);
        const files = listFiles()
            .filter(f => !excludeFiles.has(f) && f.endsWith('.musicxml'))
            .map(f => f.substr(0, f.length - 9));

        // TODO: need to fix tempo detection in musicxml see test there
        test.skip('tempos', () => {
            for (const file of files) {
                const midi = readMidiFile2(`${file}.mid`);
                const xml = readXmlFile(`${file}.musicxml`);
                const mpMidi = MusicPiece.fromMidi(file, midi);
                const mpXml = MusicPiece.fromMusicXml(file, xml);
                expect(mpMidi.tempos).toStrictEqual(mpXml.tempos);
            }
        });

        test.each(files)('time signature %s', (file) => {
            const midi = readMidiFile2(`${file}.mid`);
            const xml = readXmlFile(`${file}.musicxml`);
            const mpMidi = MusicPiece.fromMidi(file, midi);
            const mpXml = MusicPiece.fromMusicXml(file, xml);
            expect(mpMidi.timeSignatures).toStrictEqual(mpXml.timeSignatures);
        });

        test.each(files)('key signature %s', (file) => {
            const midi = readMidiFile2(`${file}.mid`);
            const xml = readXmlFile(`${file}.musicxml`);
            const mpMidi = MusicPiece.fromMidi(file, midi);
            const mpXml = MusicPiece.fromMusicXml(file, xml);
            expect(mpMidi.keySignatures).toStrictEqual(mpXml.keySignatures);
        });

        // TODO: there are issues with tempo change
        // TODO: xml often has one more than midi (no huge problem)
        test.skip.each(files)('measure times %s', (file) => {
            const midi = readMidiFile2(`${file}.mid`);
            const xml = readXmlFile(`${file}.musicxml`);
            const mpMidi = MusicPiece.fromMidi(file, midi);
            const mpXml = MusicPiece.fromMusicXml(file, xml);
            expect(mpMidi.measureTimes).toStrictEqual(mpXml.measureTimes);
        });

        // Files that should work
        test.each([
            // Simple scale
            '[Test] C4 to C5',
            // Notes with accidentals
            '[Test] Accidentals',
            '[Test] Accidentals E Major',
            '[Test] Guitar Chromatic Scale',
        ])('complete MusicPiece %s', (file) => {
            const midiNotes = getAllNotesFromMidi(file);
            const xmlNotes = getAllNotesFromXml(file);
            const simplifiedMidi = simplify(midiNotes, ['pitch', 'start']);
            const simplifiedXml = simplify(xmlNotes, ['pitch', 'start']);
            expect(simplifiedMidi).toStrictEqual(simplifiedXml);
        });

        // TODO: tuxguitar uses different note lengths than musescore?
        // TODO: xml parser does not consider velocity
        test.skip.each(files)('all notes %s', (file) => {
            const midiNotes = getAllNotesFromMidi(file);
            const xmlNotes = getAllNotesFromXml(file);
            const simplifiedMidi = simplify(midiNotes, ['pitch', 'start']);
            const simplifiedXml = simplify(xmlNotes, ['pitch', 'start']);
            expect(simplifiedMidi).toStrictEqual(simplifiedXml);
        });

        // TODO: will probably never work since some data is not available
        test.skip.each(files)('complete MusicPiece %s', (file) => {
            const midi = readMidiFile2(`${file}.mid`);
            const midiPiece = MusicPiece.fromMidi(file, midi);
            const xml = readXmlFile(`${file}.musicxml`);
            const xmlPiece = MusicPiece.fromMusicXml(file, xml);
            expect(midiPiece).toStrictEqual(xmlPiece);
        });

    });

    /**
     * Test with actual music
     */
    describe('Actual music', () => {
        const filesPrivate = listFiles(GT_DIR_PRIVATE);
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


        describe('compare MIDI and MusicXML (sliced)', () => {
            const sliceLength = 20;
            test.each(filesMidiAndMusicXML)('all notes %s', (file) => {
                const midiNotes = getAllNotesFromMidi(file, GT_DIR_PRIVATE);
                const xmlNotes = getAllNotesFromXml(file, GT_DIR_PRIVATE);
                const simplifiedMidi = simplify(midiNotes, ['pitch', 'start'])
                    .slice(0, sliceLength);
                const simplifiedXml = simplify(xmlNotes, ['pitch', 'start'])
                    .slice(0, sliceLength);
                expect(simplifiedMidi).toStrictEqual(simplifiedXml);
            });
        });

        // TODO: overflows console so hard to test
        describe.skip('compare MIDI and MusicXML (full)', () => {
            test.each(filesMidiAndMusicXML)('all notes %s', (file) => {
                const midiNotes = getAllNotesFromMidi(file, GT_DIR_PRIVATE);
                const xmlNotes = getAllNotesFromXml(file, GT_DIR_PRIVATE);
                const simplifiedMidi = simplify(midiNotes, ['pitch', 'start']);
                const simplifiedXml = simplify(xmlNotes, ['pitch', 'start']);
                expect(simplifiedMidi).toStrictEqual(simplifiedXml);
            });
        });
    });
});

describe('Track', () => {
    test('constructor', () => {
        expect(() => new Track()).not.toThrow();
    });
});

describe('TempoDefinition', () => {
    test('constructor', () => {
        expect(() => new TempoDefinition(10, 120)).not.toThrow();
    });
    test('string', () => {
        expect(new TempoDefinition(10, 127).string).toBe('127 bpm');
        expect(new TempoDefinition(20, 200.5).string).toBe('200.5 bpm');
    });
});

describe('TimeSignature', () => {
    test('constructor', () => {
        expect(() => new TimeSignature(10, [4, 4])).not.toThrow();
    });
    test('string', () => {
        expect(new TimeSignature(10, [4, 4]).string).toBe('4/4');
        expect(new TimeSignature(20, [6, 8]).string).toBe('6/8');
    });
});

describe('KeySignature', () => {
    test('constructor', () => {
        expect(() => new KeySignature(10, 'C', 'major')).not.toThrow();
    });
    test('string', () => {
        expect(new KeySignature(10, 'C', 'major').string).toBe('C major');
        expect(new KeySignature(10, 'D', 'minor').string).toBe('D minor');
    });
});
