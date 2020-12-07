import SuffixTreeForArrays from '../../src/stringBased/SuffixTreeForArrays';
import SuffixTree from '../../src/stringBased/SuffixTree';

describe('SuffixTreeForArrays', () => {
    test('undefined', () => {
        expect(new SuffixTreeForArrays().toJson()).toEqual(
            JSON.stringify({ "value": [], "leaves": [], "nodes": [] })
        );
    });
    test('empty', () => {
        expect(new SuffixTreeForArrays([]).toJson()).toEqual(
            JSON.stringify({ "value": [], "leaves": [], "nodes": [] })
        );
    });

    describe.skip('more complex', () => {
        // Simply compare to SuffixTree
        // TODO: not as simple since values are arrays
        const str = 'Mississippi';
        const arr = str.split('');

        test('Mississippi', () => {
            expect(
                new SuffixTreeForArrays(arr).toString()
            ).toBe(
                new SuffixTree(str).toString()

            );
        });
        test('Mississippi', () => {
            expect(
                new SuffixTreeForArrays(arr).toJson()
            ).toBe(
                new SuffixTree(str).toJson()
            );
        });
        test('Mississippi', () => {
            expect(
                new SuffixTreeForArrays(arr).toJson()
            ).toBe(
                new SuffixTree(str).toJson()
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
