import Note from '../../src/types/Note';
// import { newRecording } from '../../src/types/Recording';
import Recording from '../../src/types/Recording';

const notes = [
    new Note(69, 0.0, 127, 0, 1.0),
    new Note(69, 1.0, 127, 0, 2.0),
    new Note(71, 1.0, 127, 0, 2.0),
    new Note(67, 2.0, 127, 0, 3.0),
];
const rec = new Recording('test', new Date(), notes);

// const rec2 = new Recording('test', new Date(), []);
// console.log(rec2);

describe.skip('Recording', () => {

    test('Recording is equal to itself', () => {
        expect(rec.equals(rec)).toBe(true);
    });

    test('Recording is equal to clone', () => {
        expect(rec.equals(rec.clone())).toBe(true);
    });
});
