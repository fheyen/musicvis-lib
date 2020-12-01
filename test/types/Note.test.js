import { TestScheduler } from 'jest';
import Note from '../../src/types/Note';

const note1 = new Note(0, 0.0, 127, 0, 3.0);

test('note is euqal to itself', () => {
    expect(note1.equals(note1)).toBe(true);
});

test('note\'s clone is equal', () => {
    const note2 = note1.clone();
    expect(note1.equals(note2)).toBe(true);
});

test('note overlaps itself', () => {
    expect(note1.overlapsInTime(note1)).toBe(true);
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

test('note duration is factor*oldDuration after scaling', () => {
    const note = new Note(0, 1.0, 127, 0, 3.0);
    const oldDuration = note.getDuration();
    const factor = 2.5;
    const note2 = note.scaleTime(factor);
    expect(note2.getDuration()).toBe(oldDuration * factor);
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
