import MusicPiece from '../../src/types/MusicPiece';
import fs from 'fs';
import path from 'path';

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

    describe('fromMidi', () => {

        test('empty', () => {
            expect(() => MusicPiece.fromMidi()).toThrow('No MIDI file content given');
        });

        test('actual file', () => {
            const file = readMidiFile2('[Test] 3-4 meter.mid');
            expect(() => MusicPiece.fromMidi('test', file)).not.toThrow();
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

        test.skip.each(files)('key signature %s', (file) => {
            const midi = readMidiFile2(`${file}.mid`);
            const xml = readXmlFile(`${file}.musicxml`);
            const mpMidi = MusicPiece.fromMidi(file, midi);
            const mpXml = MusicPiece.fromMusicXml(file, xml);
            expect(mpMidi.keySignatures).toStrictEqual(mpXml.keySignatures);
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

        test.skip('complete MusicPiece', () => {
            for (const file of files) {
                const midi = readMidiFile2(`${file}.mid`);
                const midiPiece = MusicPiece.fromMidi(file, midi);

                const xml = readXmlFile(`${file}.musicxml`);
                const xmlPiece = MusicPiece.fromMusicXml(file, xml);

                expect(midiPiece).toStrictEqual(xmlPiece);
            }
        });

    });
});
