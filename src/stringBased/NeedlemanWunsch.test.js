import NeedlemanWunsch from './NeedlemanWunsch';

describe('NeedlemanWunsch', () => {
    test('both empty: 0', () => {
        const nw = new NeedlemanWunsch('', '');
        const tb = nw.alignmentTraceback();
        expect(tb).toStrictEqual([{ seq1: '', seq2: '' }]);
        expect(nw.score).toBe(0);
    });

    test('left empty', () => {
        const nw = new NeedlemanWunsch('', '123');
        const tb = nw.alignmentTraceback();
        expect(tb).toStrictEqual([{ seq1: '---', seq2: '321' }]);
        expect(nw.score).toBe(-3);
    });

    test('right empty', () => {
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

    test('numbers', () => {
        const a = [1, 2, 3, 4];
        const b = [1, 2, 3, 4, 5];
        const nw = new NeedlemanWunsch(a, b);
        const tb = nw.alignmentTraceback();
        expect(tb).toStrictEqual([{ seq1: '-4321', seq2: '54321' }]);
        expect(nw.score).toBe(3);
    });


    test('insert end', () => {
        const nw = new NeedlemanWunsch('1234', '12345');
        const tb = nw.alignmentTraceback();
        expect(tb).toStrictEqual([{ seq1: '-4321', seq2: '54321' }]);
        expect(nw.score).toBe(3);
    });

    // TODO: more tests
    // TODO: test with tuples
});
