import Note from '../../src/types/Note';

const note1 = new Note(0, 0.0, 127, 0, 3.0);

test('note is equal to itself', () => {
    expect(note1.equals(note1)).toBe(true);
});

test('note\'s clone is equal', () => {
    const note2 = note1.clone();
    expect(note1.equals(note2)).toBe(true);
});

test('note is unequal if other object is not of type Note', () => {
    expect(note1.equals({})).toBe(false);
});

test('note overlaps itself', () => {
    expect(note1.overlapsInTime(note1)).toBe(true);
});

test('notes do overlap', () => {
    const note1 = new Note(0, 1.0, 127, 0, 4.0);
    const note2 = new Note(0, 3.0, 127, 0, 5.0);
    const note3 = new Note(0, 0.0, 127, 0, 1.0);
    expect(note1.overlapsInTime(note2)).toBe(true);
    expect(note1.overlapsInTime(note3)).toBe(true);
});

test('notes do not overlap', () => {
    const note1 = new Note(0, 0.0, 127, 0, 3.0);
    const note2 = new Note(0, 4.0, 127, 0, 5.0);
    expect(note1.overlapsInTime(note2)).toBe(false);
});

test('note duration is end - start', () => {
    expect(note1.getDuration()).toBe(3.0);
});

test('note duration is 0 when end is undefined/null', () => {
    const note = new Note(0, 0.0, 127, 0);
    expect(note.getDuration()).toBe(0);
});

test('note duration does not change when shifting in time', () => {
    const note = new Note(0, 0.0, 127, 0, 3.0).shiftTime(12);
    expect(note.getDuration()).toBe(3.0);
});

test('note duration does not change when shifting in time (end:null)', () => {
    const note = new Note(0, 0.0, 127, 0).shiftTime(12);
    expect(note.getDuration()).toBe(0);
});

test('note duration is factor*oldDuration after scaling', () => {
    const note = new Note(0, 1.0, 127, 0, 3.0);
    const oldDuration = note.getDuration();
    const factor = 2.5;
    const note2 = note.scaleTime(factor);
    expect(note2.getDuration()).toBe(oldDuration * factor);
});

test('note duration is still 0 after scaling (end:null)', () => {
    const note = new Note(0, 1.0, 127, 0).scaleTime(2);
    expect(note.getDuration()).toBe(0);
});

test('note letter', () => {
    const note = new Note(0, 1.0, 127, 0, 3.0);
    expect(note.getLetter()).toBe('C');
});

test('note name', () => {
    const note = new Note(0, 1.0, 127, 0, 3.0);
    expect(note.getName()).toBe('C-1');
});

test('note octave', () => {
    const note = new Note(0, 1.0, 127, 0, 3.0);
    expect(note.getOctave()).toBe(-1);
});

test('Note.from with pitch', () => {
    const note1 = new Note(0, 1.0, 127, 0, 3.0);
    const note2 = Note.from({
        pitch: 0,
        start: 1.0,
        velocity: 127,
        channel: 0,
        end: 3.0
    });
    expect(note1.equals(note2)).toBe(true);
});

test('Note() shold be equal to Note.from with empty object', () => {
    const note1 = new Note();
    const note2 = Note.from({});
    expect(note1.equals(note2)).toBe(true);
});
