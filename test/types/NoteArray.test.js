import NoteArray from '../../src/types/NoteArray';
import Note from '../../src/types/Note';

const na = new NoteArray([
    new Note(69, 0.0, 127, 0, 1.0),
    new Note(69, 1.0, 127, 0, 2.0),
    new Note(71, 1.0, 127, 0, 2.0),
    new Note(67, 2.0, 127, 0, 3.0),
]);

test('NoteArray is equal to itself', () => {
    expect(na.equals(na)).toBe(true);
});

test('NoteArray\'s clone is equal', () => {
    const na2 = na.clone();
    expect(na.equals(na2)).toBe(true);
});

test('NoteArray is unequal if other object is not of type NoteArray', () => {
    expect(na.equals({})).toBe(false);
});

test('NoteArray is unequal if lengths differ', () => {
    const na2 = na.clone().slice(0, 2);
    expect(na.equals(na2)).toBe(false);
});

test('NoteArray is unequal if notes differ', () => {
    const na = new NoteArray([
        new Note(69, 0.0, 127, 0, 1.0),
        new Note(69, 1.0, 127, 0, 2.0),
        new Note(71, 1.0, 127, 0, 2.0),
        new Note(67, 2.0, 127, 0, 3.0),
    ]);
    const na2 = new NoteArray([
        new Note(12, 0.0, 127, 0, 1.0),
        new Note(69, 1.0, 127, 0, 2.0),
        new Note(71, 1.0, 127, 0, 2.0),
        new Note(67, 2.0, 127, 0, 3.0),
    ]);
    expect(na.equals(na2)).toBe(false);
});

test('NoteArray has correct duration', () => {
    expect(na.getDuration()).toBe(3.0);
});

test('NoteArray has correct duration when shifted', () => {
    expect(na.clone().shiftTime(2.0).getDuration()).toBe(5.0);
});

test('NoteArray has correct start time', () => {
    expect(na.getStartTime()).toBe(0.0);
});

test('NoteArray has correct start time when shifted', () => {
    expect(na.clone().shiftTime(2.0).getStartTime()).toBe(2.0);
    expect(na.clone().shiftTime(-2.0).getStartTime()).toBe(-2.0);
});

test('NoteArray has correct start time when shifted to startAt', () => {
    expect(na.clone().shiftToStartAt(2.0).getStartTime()).toBe(2.0);
    expect(na.clone().shiftToStartAt(3.0).getStartTime()).toBe(3.0);
    expect(na.clone().shiftToStartAt(-1.0).getStartTime()).toBe(-1.0);
    expect(na.clone().shiftToStartAt(0).getStartTime()).toBe(0);
});

test('NoteArray has correct duration when scaled', () => {
    expect(na.clone().scaleTime(2.0).getDuration()).toBe(6.0);
});


test('NoteArray can be transposed back and forth', () => {
    const transp = na.clone().transpose(12).transpose(-12);
    expect(na.equals(transp)).toBe(true);
});

test('NoteArray transposed transitively', () => {
    const transp1 = na.clone().transpose(6).transpose(6);
    const transp2 = na.clone().transpose(12);
    expect(transp1.equals(transp2)).toBe(true);
});
