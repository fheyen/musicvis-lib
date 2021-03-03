import MusicPiece, { Track, TempoDefinition, TimeSignature, KeySignature } from './MusicPiece';
import path from 'path';
import GuitarNote from './GuitarNote';
import Note from './Note';
import { readMidiFile, readXmlFile, listFiles, getAllNotesFromMidi, getAllNotesFromXml, getSongsWithMidiAndXml } from '../../test/testTools/readTestAssetFiles';

const GT_DIR = path.join(__dirname, '..', '..', 'test', '_test_assets');
const GT_DIR_PRIVATE = path.join(__dirname, '..', '..', 'test', '_test_assets_private');

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
            const file = readMidiFile('[Test] 3-4 meter.mid', GT_DIR);
            const mp = MusicPiece.fromMidi('test', file);
            expect(
                mp.getAllNotes()
            ).toStrictEqual(
                mp.tracks.flatMap(t => t.notes)
            );
        });
        // TODO: create an unsorted track manually
        test('sorted', () => {
            const file = readMidiFile('[Test] 3-4 meter.mid', GT_DIR);
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
            const file = readMidiFile('[Test] 3-4 meter.mid', GT_DIR);
            expect(() => MusicPiece.fromMidi('test', file)).not.toThrow();
        });

        test('produces Notes', () => {
            const midi = readMidiFile(`[Test] Guitar Techniques 2.mid`, GT_DIR);
            const midiNotes = MusicPiece.fromMidi('test', midi).getAllNotes();
            for (let note of midiNotes) {
                expect(note).toBeInstanceOf(Note);
            }
        });

        const allMidiFiles = listFiles(GT_DIR)
            .filter(f => f.endsWith('.mid') || f.endsWith('.midi'));

        test.each(allMidiFiles)('parses MIDI without error %s', (file) => {
            const midi = readMidiFile(file, GT_DIR);
            expect(() => MusicPiece.fromMidi(file, midi)).not.toThrow();
        });
    });

    describe('fromMusicXml', () => {
        test('empty arguments', () => {
            expect(() => MusicPiece.fromMusicXml()).toThrow('No MusicXML file content given');
        });

        test('empty file (no tracks)', () => {
            const file = readXmlFile('[Test] Empty.musicxml', GT_DIR);
            expect(() => MusicPiece.fromMusicXml('test', file)).toThrow('No or invalid tracks given');
        });

        test('actual file', () => {
            const file = readXmlFile('[Test] 3-4 meter.musicxml', GT_DIR);
            expect(() => MusicPiece.fromMusicXml('test', file)).not.toThrow();
        });

        test('produces GuitarNotes', () => {
            const xml = readXmlFile('[Test] Guitar Techniques 2.musicxml', GT_DIR);
            const xmlNotes = MusicPiece.fromMusicXml('test', xml).getAllNotes();
            for (let note of xmlNotes) {
                expect(note).toBeInstanceOf(GuitarNote);
            }
        });

        const allXmlFiles = listFiles(GT_DIR)
            .filter(f => f.endsWith('.xml') || f.endsWith('.musicxml'))
            .filter(f => f !== '[Test] Empty.musicxml');
        test.each(allXmlFiles)('parses MusicXML without error %s', (file) => {
            const xml = readXmlFile(file, GT_DIR);
            expect(() => MusicPiece.fromMusicXml(file, xml)).not.toThrow();
        });
    });

    /**
     * Tests for all musicxml files whether the MIDI file leads to the same output
     */
    describe('equal result from MIDI and MusicXml', () => {
        const files = getSongsWithMidiAndXml(GT_DIR);

        // TODO: need to fix tempo detection in musicxml see test there
        test.skip('tempos', () => {
            for (const file of files) {
                const midi = readMidiFile(`${file}.mid`, GT_DIR);
                const xml = readXmlFile(`${file}.musicxml`, GT_DIR);
                const mpMidi = MusicPiece.fromMidi(file, midi);
                const mpXml = MusicPiece.fromMusicXml(file, xml);
                expect(mpMidi.tempos).toStrictEqual(mpXml.tempos);
            }
        });

        test.each(files)('time signature %s', (file) => {
            const midi = readMidiFile(`${file}.mid`, GT_DIR);
            const xml = readXmlFile(`${file}.musicxml`, GT_DIR);
            const mpMidi = MusicPiece.fromMidi(file, midi);
            const mpXml = MusicPiece.fromMusicXml(file, xml);
            expect(mpMidi.timeSignatures).toStrictEqual(mpXml.timeSignatures);
        });

        test.each(files)('key signature %s', (file) => {
            const midi = readMidiFile(`${file}.mid`, GT_DIR);
            const xml = readXmlFile(`${file}.musicxml`, GT_DIR);
            const mpMidi = MusicPiece.fromMidi(file, midi);
            const mpXml = MusicPiece.fromMusicXml(file, xml);
            expect(mpMidi.keySignatures).toStrictEqual(mpXml.keySignatures);
        });

        // TODO: there are issues with tempo change
        // TODO: xml often has one more than midi (no huge problem)
        test.skip.each(files)('measure times %s', (file) => {
            const midi = readMidiFile(`${file}.mid`, GT_DIR);
            const xml = readXmlFile(`${file}.musicxml`, GT_DIR);
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
            const midiNotes = getAllNotesFromMidi(file, GT_DIR);
            const xmlNotes = getAllNotesFromXml(file, GT_DIR);
            const simplifiedMidi = simplify(midiNotes, ['pitch', 'start']);
            const simplifiedXml = simplify(xmlNotes, ['pitch', 'start']);
            expect(simplifiedMidi).toStrictEqual(simplifiedXml);
        });

        // TODO: tuxguitar uses different note lengths than musescore?
        // TODO: xml parser does not consider velocity
        test.skip.each(files)('all notes %s', (file) => {
            const midiNotes = getAllNotesFromMidi(file, GT_DIR);
            const xmlNotes = getAllNotesFromXml(file, GT_DIR);
            const simplifiedMidi = simplify(midiNotes, ['pitch', 'start']);
            const simplifiedXml = simplify(xmlNotes, ['pitch', 'start']);
            expect(simplifiedMidi).toStrictEqual(simplifiedXml);
        });
    });

    /**
     * Test with actual music
     */
    describe('Actual music, compare MIDI and MusicXML', () => {
        const filesMidiAndMusicXML = getSongsWithMidiAndXml(GT_DIR_PRIVATE);

        // TODO: some files do not work and this test runs forever
        describe.skip('compare MIDI and MusicXML (sliced)', () => {
            const sliceLength = 10;
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
