import * as Midi from "./Midi.js";

describe('Midi', () => {
    test('MIDI notes', () => {
        const note = Midi.getMidiNoteByNr(69);
        const exp = { pitch: 69, name: 'A', octave: 4, label: 'A4', frequency: 440.000 };
        expect(note).toStrictEqual(exp);
    });

    test('MIDI drum note names', () => {
        const note = Midi.getMidiDrumNoteByNr(36);
        expect(note).toBe('Bass Drum 1');
    });

    test('MIDI note by label', () => {
        const note = Midi.getMidiNoteByLabel('A4');
        const exp = { pitch: 69, name: 'A', octave: 4, label: 'A4', frequency: 440.000 };
        expect(note).toStrictEqual(exp);
    });

    test('MIDI note by name & octace', () => {
        const note = Midi.getMidiNoteByNameAndOctave('A', 4);
        const exp = { pitch: 69, name: 'A', octave: 4, label: 'A4', frequency: 440.000 };
        expect(note).toStrictEqual(exp);
    });

    test('MIDI isSharp', () => {
        expect(Midi.isSharp(69)).toBe(false);
        expect(Midi.isSharp(70)).toBe(true);
    });

    test('MIDI note name from number', () => {
        expect(Midi.getNoteNameFromNoteNr(0)).toBe('C');
        expect(Midi.getNoteNameFromNoteNr(12)).toBe('C');
        expect(Midi.getNoteNameFromNoteNr(13)).toBe('C#');
        expect(Midi.getNoteNameFromNoteNr(-1)).toBe(undefined);
    });

    test('MIDI instruments', () => {
        const instr = Midi.getMidiInstrumentByNr(0);
        const exp = { number: 0, group: 'Piano', label: 'Acoustic Grand Piano' };
        expect(instr).toStrictEqual(exp);
    });

    test('MIDI instruments L2', () => {
        const instr = Midi.getMidiInstrumentByNrL2(1, 0);
        const exp = { number: 1, subnumber: 0, group: 'Piano', label: 'Acoustic Grand Piano' };
        expect(instr).toStrictEqual(exp);
    });

    test('flatToSharp', () => {
        const cases = [
            ['Cb', 'B'],
            ['Db', 'C#'],
            ['Eb', 'D#'],
            ['Fb', 'E'],
            ['Gb', 'F#'],
            ['Ab', 'G#'],
            ['Bb', 'A#'],
        ];
        for (const c of cases) {
            expect(Midi.flatToSharp.get(c[0])).toBe(c[1]);
        }
    });
});
