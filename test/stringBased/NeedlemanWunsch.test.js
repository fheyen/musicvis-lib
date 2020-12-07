import NeedlemanWunsch from '../../src/stringBased/NeedlemanWunsch';

describe('NeedlemanWunsch', () => {
    test('both empty: 0', () => {
        const nw = new NeedlemanWunsch('', '');
        const tb = nw.alignmentTraceback();
        expect(tb).toStrictEqual([{ seq1: '', seq2: '' }]);
        expect(nw.score).toBe(0);
    });

    test('left empty: right.lengh', () => {
        const nw = new NeedlemanWunsch('', '123');
        const tb = nw.alignmentTraceback();
        expect(tb).toStrictEqual([{ seq1: '---', seq2: '321' }]);
        expect(nw.score).toBe(-3);
    });

    test('right empty: left.lengh', () => {
        const nw = new NeedlemanWunsch('1234', '');
        const tb = nw.alignmentTraceback();
        expect(tb).toStrictEqual([{ seq1: '4321', seq2: '----' }]);
        expect(nw.score).toBe(-4);
    });

    test('same', () => {
        const nw = new NeedlemanWunsch('12345', '12345');
        const tb = nw.alignmentTraceback();
        expect(tb).toStrictEqual([{ seq1: '54321', seq2: '54321' }]);
        expect(nw.score).toBe(5);
    });

    // TODO: more tests

    test.skip('insert end', () => {
        const nw = new NeedlemanWunsch('1234', '12345');
        const tb = nw.alignmentTraceback();
        expect(tb).toStrictEqual([{ seq1: '-4321', seq2: '54321' }]);
        expect(nw.score).toBe(3);
    });

    // test('insert begin', () => {
    //     expect(levenshtein('1234', '01234')).toBe(1);
    // });

    // test('insert middle', () => {
    //     expect(levenshtein('1234', '12304')).toBe(1);
    // });

    // test('delete end', () => {
    //     expect(levenshtein('12345', '1234')).toBe(1);
    // });

    // test('delete begin', () => {
    //     expect(levenshtein('01234', '1234')).toBe(1);
    // });

    // test('delete middle', () => {
    //     expect(levenshtein('12304', '1234')).toBe(1);
    // });

    // test('add one, delete one', () => {
    //     expect(levenshtein('1234', '2345')).toBe(2);
    // });

    // test('numbers', () => {
    //     const a = [1, 2, 3, 4];
    //     const b = [1, 2, 3, 3, 4, 5];
    //     expect(levenshtein(a, b)).toBe(2);
    // });
});















// export function testNeedlemanWunsch() {

//     console.log('NeedlemanWunsch Test');


//     const substFnEqual = (p1, p2) => p1 === p2 ? 0 : 1;
//     const substFnDistance = (p1, p2) => Math.abs(p1 - p2);

//     let a = [1, 2, 3, 4, 5, 6];
//     const same = NeedlemanWunsch(a, a, false, 1, substFnEqual);
//     console.log(same);

//     const same2 = NeedlemanWunsch(a, a, false, 1, substFnDistance);
//     console.log(same2);


//     a = [1, 2, 3, 4, 2];
//     let b = [1, 3, 4, 2];
//     // should be 3
//     const wiki = NeedlemanWunsch(a, b, false, 1, (p1, p2) => p1 === p2 ? 1 : -1);
//     console.log(wiki);

// }
