import * as Chords from '../src/Chords';


describe('Chords', () => {
    describe('detectChordsByOverlap', () => {
        test('exact same start', () => {

        });

        test('slightly different start', () => {

        });

        test('confusing overlaps', () => {

        });
    });

    describe('detectChordsByExactStart', () => {
    });

    describe('getChordType', () => {
    });

    describe('getChordName', () => {
    });
});



/**
 * TODO:
 * Test for getChordType()
//  */
// export function testGetChordType() {
//     const cases = [
//         {
//             notes: [{ pitch: 0 }, { pitch: 7 }],
//             result: 'Power chord'
//         },
//         {
//             notes: [{ pitch: 10 }, { pitch: 17 }],
//             result: 'Power chord'
//         },
//         {
//             notes: [{ pitch: 0 }, { pitch: 2 }, { pitch: 3 }, { pitch: 7 }],
//             result: 'Minor, added ninth'
//         },
//         {
//             notes: [{ pitch: 0 }, { pitch: 7 }, { pitch: 12 }],
//             result: 'Power chord'
//         },

//     ];
//     for (const c of cases) {
//         const result = getChordType(c.notes);
//         if (result !== c.result) {
//             console.warn(`Invalid chord result, expected ${c.result}, got ${result}`);
//         }
//     }
// }
