import Note from './Note';
import Recording from './Recording';

const notes = [
    new Note(69, 0.0, 127, 0, 1.0),
    new Note(69, 1.0, 127, 0, 2.0),
    new Note(71, 1.0, 127, 0, 2.0),
    new Note(67, 2.0, 127, 0, 3.0),
];
const date = new Date();
const rec = new Recording('test', date, notes, 1, 0, null, 'test comment');
const obj = {
    name: 'test',
    date: date,
    notes: notes,
    speed: 1,
    selectedTrack: 0,
    timeSelection: null,
    comment: 'test comment',
};

describe('Recording', () => {


    test('Recording does clone', () => {
        expect(rec.clone() instanceof Recording).toBe(true);
    });

    describe('equals', () => {

        test('is equal to itself', () => {
            expect(rec.equals(rec)).toBe(true);
        });

        test('is equal to clone', () => {
            expect(rec.equals(rec.clone())).toBe(true);
            const rec1 = new Recording('test', date, notes, 1, 0, [10, 20]);
            expect(rec1.equals(rec1.clone())).toBe(true);
        });

        test('is not equal, notes length', () => {
            const notes = [
                new Note(69, 0.0, 127, 0, 1.0),
                new Note(69, 1.0, 127, 0, 2.0),
                new Note(67, 2.0, 127, 0, 3.0),
            ];
            const rec2 = new Recording('test', date, notes);
            expect(rec.equals(rec2)).toBe(false);
        });

        test('is not equal, notes different', () => {
            const notes = [
                new Note(0, 0.0, 127, 0, 1.0),
                new Note(69, 1.0, 127, 0, 2.0),
                new Note(71, 1.0, 127, 0, 2.0),
                new Note(67, 2.0, 127, 0, 3.0),
            ];
            const rec2 = new Recording('test', date, notes);
            expect(rec.equals(rec2)).toBe(false);
        });

        test('is not equal, type different', () => {
            expect(rec.equals(obj)).toBe(false);
        });

        test('is not equal, date different', () => {
            const rec2 = new Recording('test', new Date(), notes);
            expect(rec.equals(rec2)).toBe(false);
        });

        test('is not equal, name different', () => {
            const rec2 = new Recording('test2', date, notes);
            expect(rec.equals(rec2)).toBe(false);
        });

        test('is not equal, speed different', () => {
            const rec1 = new Recording('test', date, notes, 1, 0, [10, 20]);
            const rec2 = new Recording('test', date, notes, 0.5, 0, [10, 20]);
            expect(rec1.equals(rec2)).toBe(false);
        });

        test('is not equal, selected track different', () => {
            const rec1 = new Recording('test', date, notes, 1, 0, [10, 20]);
            const rec2 = new Recording('test', date, notes, 1, 2, [10, 20]);
            expect(rec1.equals(rec2)).toBe(false);
        });

        test('is not equal, timeselection different', () => {
            const rec1 = new Recording('test', date, notes, 1, 0, [10, 20]);
            const rec2 = new Recording('test', date, notes, 1, 0, [10, 30]);
            const rec3 = new Recording('test', date, notes, 1, 0);
            expect(rec1.equals(rec2)).toBe(false);
            expect(rec1.equals(rec3)).toBe(false);
        });

        test('equal, timeselection', () => {
            const rec1 = new Recording('test', date, notes, 1, 0, [10, 20]);
            const rec2 = new Recording('test', date, notes, 1, 0, [10, 20]);
            expect(rec1.equals(rec2)).toBe(true);
        });
    });

    describe('to and from object', () => {
        test('toSimpleObject', () => {
            expect(rec.toSimpleObject()).toStrictEqual(obj);
        });

        test('fromSimpleObject', () => {
            expect(Recording.from(obj).toSimpleObject()).toStrictEqual(obj);
        });

        test('fromSimpleObject fails', () => {
            const noName = { ...obj, name: undefined };
            expect(() => Recording.from(noName)).toThrowError('Cannot create Recording with undefined name');
            const noDate = { ...obj, date: undefined };
            expect(() => Recording.from(noDate)).toThrowError('Cannot create Recording with undefined date');
            const noNotes = { ...obj, notes: undefined };
            expect(() => Recording.from(noNotes)).toThrowError('Cannot create Recording with undefined notes');
        });

        test('fromSimpleObject equals', () => {
            expect(
                Recording.from(rec.toSimpleObject()).equals(rec)
            ).toBe(true);
        });

        test('fromSimpleObject date as string', () => {
            // const str = '2020-01-01T12:34:56.123Z';
            const str = date.toISOString();
            const objWithDateString = { ...obj, date: str };
            const dateObj = new Date(Date.parse(str));
            // console.log(dateObj);

            expect(
                Recording.from(objWithDateString).equals(rec)
            ).toBe(true);
        });
    });
});
