import SuffixTree from '../../src/stringBased/SuffixTree';

describe('SuffixTree', () => {
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

    describe.skip('more complex', () => {
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
