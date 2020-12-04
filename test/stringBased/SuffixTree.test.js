import SuffixTree from '../../src/stringBased/SuffixTree';

describe.skip('SuffixTree', () => {
    test('undefined', () => {
        expect(new SuffixTree().toJson()).toEqual(
            JSON.stringify({ "value": "", "leaves": [], "nodes": [] })
        );
    });
    test('empty', () => {
        expect(new SuffixTree('').toJson()).toEqual(
            JSON.stringify({ "value": "", "leaves": [], "nodes": [] })
        );
    });
    test('Mississippi', () => {
        expect(new SuffixTree('Mississippi').toString()).toBe();
    });
    test('Mississippi', () => {
        expect(new SuffixTree('Mississippi').toJson()).toBe(

        );
    });
    test('Mississippi', () => {
        expect(new SuffixTree('Mississippi').toJson()).toBe(

        );
    });
});

// /**
//  * Test function
//  */
// export function testSuffixTree() {
//     // http://www.allisons.org/ll/AlgDS/Tree/Suffix/
//     const str = 'Mississippi';
//     const tree = new SuffixTree(str);
//     console.log(tree);
//     console.log(tree.toString());
// }


// /**
//  * Test function
//  */
// export function testSuffixTreeForArray() {
//     // http://www.allisons.org/ll/AlgDS/Tree/Suffix/
//     // const str = [1, 2, 3, 4, 1, 2, 3, 5, 2, 3, 4];
//     // This test allows to compare to SuffixTree for strings
//     const str = 'Mississippi'.split('');
//     const tree = new SuffixTreeForArray(str);
//     console.log(tree);
//     console.log(tree.toString());
// }
