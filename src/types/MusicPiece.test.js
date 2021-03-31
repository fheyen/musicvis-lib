import MusicPiece, { Track, TempoDefinition, TimeSignature, KeySignature } from './MusicPiece';
import path from 'path';
import GuitarNote from './GuitarNote';
import Note from './Note';
import { readFile, readMidiFile, readXmlFile, listFiles, getAllNotesFromMidi, getAllNotesFromXml, getSongsWithMidiAndXml } from '../../test/testTools/readTestAssetFiles';

const TEST_DIR = path.join(__dirname, '..', '..', 'test', '_test_assets');
const TEST_DIR_PRIVATE = path.join(__dirname, '..', '..', 'test', '_test_assets_private');

/**
 * Simplifies each object in an array by copying only some keys and their values
 *
 * @todo. move to testing lib
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


    describe('getNotesFromTracks', () => {
        test('unsorted', () => {
            const file = readMidiFile('[Test] 3-4 meter.mid', TEST_DIR);
            const mp = MusicPiece.fromMidi('test', file);
            expect(
                mp.getNotesFromTracks('all')
            ).toStrictEqual(
                mp.tracks.flatMap(t => t.notes)
            );
        });
        // TODO: create an unsorted track manually
        test('sorted', () => {
            const file = readMidiFile('[Test] 3-4 meter.mid', TEST_DIR);
            const mp = MusicPiece.fromMidi('test', file);
            expect(
                mp.getNotesFromTracks('all', true)
            ).toStrictEqual(
                mp.tracks.flatMap(t => t.notes).sort((a, b) => a.start - b.start)
            );
        });
    });

    describe('getNotesFromTracks', () => {
        const file = readMidiFile('[Test] Multiple Parts.mid', TEST_DIR);
        const mp = MusicPiece.fromMidi('test', file);
        test('all', () => {
            expect(
                mp.getNotesFromTracks('all')
            ).toStrictEqual(
                mp.tracks.flatMap(t => t.notes)
            );
        });
        test('track 1', () => {
            expect(
                mp.getNotesFromTracks(1)
            ).toStrictEqual(
                mp.tracks[1].notes
            );
        });
        test('multiple tracks', () => {
            expect(
                mp.getNotesFromTracks([1, 3])
            ).toStrictEqual(
                [...mp.tracks[1].notes, ...mp.tracks[3].notes]
            );
        });
        test('multiple tracks sorted', () => {
            expect(
                mp.getNotesFromTracks([1, 3], true)
            ).toStrictEqual(
                [...mp.tracks[1].notes, ...mp.tracks[3].notes]
                    .sort((a, b) => a.start - b.start)
            );
        });
    });


    describe('fromMidi', () => {
        test('empty', () => {
            expect(() => MusicPiece.fromMidi()).toThrow('No MIDI file content given');
        });

        test('actual file', () => {
            const file = readMidiFile('[Test] 3-4 meter.mid', TEST_DIR);
            expect(() => MusicPiece.fromMidi('test', file)).not.toThrow();
        });

        test('produces Notes', () => {
            const midi = readMidiFile(`[Test] Guitar Techniques 2.mid`, TEST_DIR);
            const midiNotes = MusicPiece.fromMidi('test', midi).getNotesFromTracks('all');
            for (let note of midiNotes) {
                expect(note).toBeInstanceOf(Note);
            }
        });

        const allMidiFiles = listFiles(TEST_DIR)
            .filter(f => f.endsWith('.mid') || f.endsWith('.midi'));

        test.each(allMidiFiles)('parses MIDI without error %s', (file) => {
            const midi = readMidiFile(file, TEST_DIR);
            expect(() => MusicPiece.fromMidi(file, midi)).not.toThrow();
        });
    });


    // TODO: waiting for upstream changes in @tonejs/midi
    describe('fromMidi2', () => {
        test('empty', () => {
            expect(() => MusicPiece.fromMidi2()).toThrow('No MIDI file content given');
        });

        test('actual file', () => {
            const file = readFile('[Test] 3-4 meter.mid', TEST_DIR);
            expect(() => MusicPiece.fromMidi2('test', file)).not.toThrow();
        });

        test('produces Notes', () => {
            const midi = readFile(`[Test] Guitar Techniques 2.mid`, TEST_DIR);
            const midiNotes = MusicPiece.fromMidi2('test', midi).getNotesFromTracks('all');
            for (let note of midiNotes) {
                expect(note).toBeInstanceOf(Note);
            }
        });

        const allMidiFiles = listFiles(TEST_DIR)
            .filter(f => f.endsWith('.mid') || f.endsWith('.midi'));

        test.each(allMidiFiles)('parses MIDI without error %s', (file) => {
            const midi = readFile(file, TEST_DIR);
            expect(() => MusicPiece.fromMidi2(file, midi)).not.toThrow();
        });

        test.todo('Test if data is equal to fromMidi and fromMusicXml');
    });


    describe('fromMusicXml', () => {
        test('empty arguments', () => {
            expect(() => MusicPiece.fromMusicXml()).toThrow('No MusicXML file content given');
        });

        test('empty file (no tracks)', () => {
            const file = readXmlFile('[Test] Empty.musicxml', TEST_DIR);
            expect(() => MusicPiece.fromMusicXml('test', file)).toThrow('No or invalid tracks given');
        });

        test('actual file', () => {
            const file = readXmlFile('[Test] 3-4 meter.musicxml', TEST_DIR);
            expect(() => MusicPiece.fromMusicXml('test', file)).not.toThrow();
        });

        test('produces GuitarNotes', () => {
            const xml = readXmlFile('[Test] Guitar Techniques 2.musicxml', TEST_DIR);
            const xmlNotes = MusicPiece.fromMusicXml('test', xml).getNotesFromTracks('all');
            for (let note of xmlNotes) {
                expect(note).toBeInstanceOf(GuitarNote);
            }
        });

        const allXmlFiles = listFiles(TEST_DIR)
            .filter(f => f.endsWith('.xml') || f.endsWith('.musicxml'))
            .filter(f => f !== '[Test] Empty.musicxml');
        test.each(allXmlFiles)('parses MusicXML without error %s', (file) => {
            const xml = readXmlFile(file, TEST_DIR);
            expect(() => MusicPiece.fromMusicXml(file, xml)).not.toThrow();
        });
    });

    /**
     * Tests for all musicxml files whether the MIDI file leads to the same output
     */
    describe('equal result from MIDI and MusicXml', () => {
        const files = getSongsWithMidiAndXml(TEST_DIR);

        // TODO: need to fix tempo detection in musicxml see test there
        test.skip('tempos', () => {
            for (const file of files) {
                const midi = readMidiFile(`${file}.mid`, TEST_DIR);
                const xml = readXmlFile(`${file}.musicxml`, TEST_DIR);
                const mpMidi = MusicPiece.fromMidi(file, midi);
                const mpXml = MusicPiece.fromMusicXml(file, xml);
                expect(mpMidi.tempos).toStrictEqual(mpXml.tempos);
            }
        });

        test.each(
            // TODO: pickup measure does not work yet
            files.filter(d => d !== '[Test] Pickup Measure')
        )('time signature %s', (file) => {
            const midi = readMidiFile(`${file}.mid`, TEST_DIR);
            const xml = readXmlFile(`${file}.musicxml`, TEST_DIR);
            const mpMidi = MusicPiece.fromMidi(file, midi);
            const mpXml = MusicPiece.fromMusicXml(file, xml);
            expect(mpMidi.timeSignatures).toStrictEqual(mpXml.timeSignatures);
        });

        test.each(files)('key signature %s', (file) => {
            const midi = readMidiFile(`${file}.mid`, TEST_DIR);
            const xml = readXmlFile(`${file}.musicxml`, TEST_DIR);
            const mpMidi = MusicPiece.fromMidi(file, midi);
            const mpXml = MusicPiece.fromMusicXml(file, xml);
            expect(mpMidi.keySignatures).toStrictEqual(mpXml.keySignatures);
        });

        // TODO: there are issues with tempo change
        // TODO: xml often has one more than midi (no huge problem)
        test.skip.each(files)('measure times %s', (file) => {
            const midi = readMidiFile(`${file}.mid`, TEST_DIR);
            const xml = readXmlFile(`${file}.musicxml`, TEST_DIR);
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
            const midiNotes = getAllNotesFromMidi(file, TEST_DIR);
            const xmlNotes = getAllNotesFromXml(file, TEST_DIR);
            const simplifiedMidi = simplify(midiNotes, ['pitch', 'start']);
            const simplifiedXml = simplify(xmlNotes, ['pitch', 'start']);
            expect(simplifiedMidi).toStrictEqual(simplifiedXml);
        });

        // TODO: tuxguitar uses different note lengths than musescore?
        // TODO: xml parser does not consider velocity
        test.skip.each(files)('all notes %s', (file) => {
            const midiNotes = getAllNotesFromMidi(file, TEST_DIR);
            const xmlNotes = getAllNotesFromXml(file, TEST_DIR);
            const simplifiedMidi = simplify(midiNotes, ['pitch', 'start']);
            const simplifiedXml = simplify(xmlNotes, ['pitch', 'start']);
            expect(simplifiedMidi).toStrictEqual(simplifiedXml);
        });
    });

    /**
     * Test with actual music
     */
    describe('Actual music, compare MIDI and MusicXML', () => {
        const filesMidiAndMusicXML = getSongsWithMidiAndXml(TEST_DIR_PRIVATE);

        // TODO: some files do not work and this test runs forever
        describe.skip('compare MIDI and MusicXML (sliced)', () => {
            const sliceLength = 10;
            test.each(filesMidiAndMusicXML)('all notes %s', (file) => {
                const midiNotes = getAllNotesFromMidi(file, TEST_DIR_PRIVATE);
                const xmlNotes = getAllNotesFromXml(file, TEST_DIR_PRIVATE);
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
                const midiNotes = getAllNotesFromMidi(file, TEST_DIR_PRIVATE);
                const xmlNotes = getAllNotesFromXml(file, TEST_DIR_PRIVATE);
                const simplifiedMidi = simplify(midiNotes, ['pitch', 'start']);
                const simplifiedXml = simplify(xmlNotes, ['pitch', 'start']);
                expect(simplifiedMidi).toStrictEqual(simplifiedXml);
            });
        });
    });

    describe('transpose', () => {
        const xml1 = readXmlFile('[Test] Transpose 1.musicxml', TEST_DIR);
        const mp1 = MusicPiece.fromMusicXml('test', xml1);

        test('Transpose will create new object', () => {
            expect(mp1.transpose()).not.toBe(mp1);
        });

        test('Transpose back and forth', () => {
            expect(
                mp1.transpose(-12)
                    .transpose(12)
                    .getNotesFromTracks('all')
            ).toStrictEqual(
                mp1.getNotesFromTracks('all')
            );
        });

        test('Compare two transposed files', () => {
            const xml2 = readXmlFile('[Test] Transpose 2.musicxml', TEST_DIR);
            expect(
                mp1.transpose(-12)
                    .getNotesFromTracks('all')
            ).toStrictEqual(
                MusicPiece.fromMusicXml('test', xml2)
                    .getNotesFromTracks('all')
            );
        });

        // TODO: test transposing of single tracks
    });

    test.todo('Track.tuning from MusicXml file');
    test.todo('Track.hasStringFret from MusicXml file');
});


describe('Track', () => {
    test('invalid constructor call', () => {
        expect(() => new Track()).toThrow('Notes are undefined or not an array');
    });
    const notes = [
        Note.from({ start: 1 }),
        Note.from({ start: 0 }),
        Note.from({ start: -1 }),
        Note.from({ start: 2 }),
    ];
    test('valid constructor call', () => {
        expect(() => new Track('testName', 'testInstrument', notes)).not.toThrow();
    });
    test('does sort notes by start time', () => {
        expect(
            new Track('testName', 'testInstrument', notes).notes.map(d => d.start)
        ).toStrictEqual([
            -1, 0, 1, 2
        ]);
    });
    test.todo('Track.tuning');
    test.todo('Track.hasStringFret');
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
