import MusicPiece from '../../src/types/MusicPiece';
import fs from 'fs';
import path from 'path';

const GT_DIR = path.join(__dirname, '..', '_test_assets');

function readMidiFile(fileName) {
    const file = path.join(GT_DIR, fileName);
    return fs.readFileSync(file);
}

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
    // describe('constructor', () => {
    //     test('default', () => {
    //         expect().toBe();
    //     });

    // });

    describe('fromMidi', () => {

        test('empty', () => {
            expect(() => MusicPiece.fromMidi()).toThrow('No MIDI file content given');
        });

        test('actual file', () => {
            const file = readMidiFile2('[Test] 3-4 meter.mid');
            expect(() => MusicPiece.fromMidi('test', file)).not.toThrow();
        });
    });

    // describe('fromMidi2', () => {

    //     test('empty', () => {
    //         expect(() => MusicPiece.fromMidi2()).toThrow('No MIDI file content given');
    //     });

    //     test('actual file', () => {
    //         const file = readMidiFile2('[Test] 3-4 meter.mid');
    //         expect(() => MusicPiece.fromMidi2('test', file)).not.toThrow();
    //     });
    // });

    describe('fromMusicXml', () => {
        test('empty', () => {
            expect(() => MusicPiece.fromMusicXML()).toThrow('No MusicXML file content given');
        });

        test('actual file', () => {
            const file = readXmlFile('[Test] 3-4 meter.musicxml');
            expect(() => MusicPiece.fromMusicXML('test', file)).not.toThrow();
        });

    });

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
        //         const xmlNotes = MusicPiece.fromMusicXML(file, xml).getAllNotes();

        //         expect(midiNotes).toStrictEqual(xmlNotes);
        //     }
        // });

        test.skip('only notes', () => {
            for (const file of files) {
                const midi = readMidiFile2(`${file}.mid`);
                const midiNotes = MusicPiece.fromMidi2(file, midi).getAllNotes();

                const xml = readXmlFile(`${file}.musicxml`);
                const xmlNotes = MusicPiece.fromMusicXML(file, xml).getAllNotes();

                expect(midiNotes).toStrictEqual(xmlNotes);
            }
        });

        test.skip('complete MusicPiece', () => {
            for (const file of files) {
                const midi = readMidiFile2(`${file}.mid`);
                const midiPiece = MusicPiece.fromMidi2(file, midi);

                const xml = readXmlFile(`${file}.musicxml`);
                const xmlPiece = MusicPiece.fromMusicXML(file, xml);

                expect(midiPiece).toStrictEqual(xmlPiece);
            }
        });

    });
});
