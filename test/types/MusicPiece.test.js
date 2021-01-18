import MusicPiece from '../../src/types/MusicPiece';
import fs from 'fs';
import path from 'path';
import GuitarNote from '../../src/types/GuitarNote';
import Note from '../../src/types/Note';

const GT_DIR = path.join(__dirname, '..', '_test_assets');

// TODO: async to speed up testing
function readMidiFile2(fileName) {
    const file = path.join(GT_DIR, fileName);
    return fs.readFileSync(file, 'base64');
}

function readXmlFile(fileName) {
    const file = path.join(GT_DIR, fileName);
    return fs.readFileSync(file, 'utf8');
}

function listFiles() {
    return fs.readdirSync(GT_DIR);
}

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
    });

    describe('fromMusicXml', () => {
        test('empty', () => {
            expect(() => MusicPiece.fromMusicXml()).toThrow('No MusicXML file content given');
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
    });

    /**
     * Tests for all musicxml files wether the MIDI file leads to the same output
     */
    describe('equal result from MIDI and MusicXml', () => {
        const files = listFiles()
            .filter(f => f.endsWith('.musicxml'))
            .map(f => f.substr(0, f.length - 9));


        // test('only notes, only some files', () => {
        //     const files = ['[Test] 3-4 meter'];

        //     for (const file of files) {
        //         const midi = readMidiFile(`${file}.mid`);
        //         const midiNotes = MusicPiece.fromMidi(file, midi).getAllNotes();

        //         const xml = readXmlFile(`${file}.musicxml`);
        //         const xmlNotes = MusicPiece.fromMusicXml(file, xml).getAllNotes();

        //         expect(midiNotes).toStrictEqual(xmlNotes);
        //     }
        // });

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

        // TODO:
        test.skip.each(files)('key signature %s', (file) => {
            const midi = readMidiFile2(`${file}.mid`);
            const xml = readXmlFile(`${file}.musicxml`);
            const mpMidi = MusicPiece.fromMidi(file, midi);
            const mpXml = MusicPiece.fromMusicXml(file, xml);
            expect(mpMidi.keySignatures).toStrictEqual(mpXml.keySignatures);
        });

        // TODO:
        test.skip.each(files)('measure times %s', (file) => {
            const midi = readMidiFile2(`${file}.mid`);
            const xml = readXmlFile(`${file}.musicxml`);
            const mpMidi = MusicPiece.fromMidi(file, midi);
            const mpXml = MusicPiece.fromMusicXml(file, xml);
            expect(mpMidi.measureTimes).toStrictEqual(mpXml.measureTimes);
        });

        // TODO: tuxguitar uses different note lengths than musescore?
        // TODO: xml parser does not consider velocity
        test.skip.each(files)('all notes %s', (file) => {
            const midi = readMidiFile2(`${file}.mid`);
            const xml = readXmlFile(`${file}.musicxml`);
            const midiNotes = MusicPiece.fromMidi(file, midi).getAllNotes();
            const xmlNotes = MusicPiece.fromMusicXml(file, xml).getAllNotes();
            expect(midiNotes).toStrictEqual(xmlNotes);
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
});
