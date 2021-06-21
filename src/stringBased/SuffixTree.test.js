import SuffixTree from './SuffixTree.js';

describe('SuffixTree', () => {

    test('undefined', () => {
        expect(new SuffixTree().toJson()).toEqual(
            JSON.stringify({ "value": [], "leaves": [], "nodes": [] })
        );
    });

    test('empty', () => {
        expect(new SuffixTree([]).toJson()).toEqual(
            JSON.stringify({ "value": [], "leaves": [], "nodes": [] })
        );
    });

    describe('works with strings', () => {
        test('empty strings', () => {
            expect(
                new SuffixTree([]).toJson()
            ).toBe(
                new SuffixTree('').toJson()
            );
        });

        const str = 'Mississippi';
        const arr = str.split('');

        test('Mississippi', () => {
            expect(
                new SuffixTree(arr).toString()
            ).toBe(
                new SuffixTree(str).toString()
            );
        });
    });

    describe('more complex: Mississippi', () => {
        // http://www.allisons.org/ll/AlgDS/Tree/Suffix/
        const str = 'Mississippi';
        const arr = str.split('');

        describe('string and array give the same tree', () => {
            test('Mississippi', () => {
                expect(
                    new SuffixTree(arr).toString()
                ).toBe(
                    new SuffixTree(str).toString()
                );
            });

            test('Mississippi', () => {
                expect(
                    new SuffixTree(arr).toJson()
                ).toBe(
                    new SuffixTree(str).toJson()
                );
            });
        });

        test('to string', () => {
            expect(new SuffixTree('Mississippi').toString()).toBe(
                `root
 |-N 's'
 | |-N 's'
 | | |-N 'i'
 | | | |-L s,s,i,p,p,i
 | | | |-L p,p,i
 | |-N 'i'
 | | |-L p,p,i
 | | |-L s,s,i,p,p,i
 |-N 'i'
 | |-N 's'
 | | |-N 's'
 | | | |-N 'i'
 | | | | |-L s,s,i,p,p,i
 | | | | |-L p,p,i
 | |-L p,p,i
 |-N 'p'
 | |-L i
 | |-L p,i
 |-L M,i,s,s,i,s,s,i,p,p,i`
            );
        });

        test('Mississippi', () => {
            expect(new SuffixTree('Mississippi').toJson()).toBe(
                "{\"value\":[],\"leaves\":[[\"M\",\"i\",\"s\",\"s\",\"i\",\"s\",\"s\",\"i\",\"p\",\"p\",\"i\"]],\"nodes\":[{\"value\":[\"s\"],\"leaves\":[],\"nodes\":[{\"value\":[\"s\"],\"leaves\":[],\"nodes\":[{\"value\":[\"i\"],\"leaves\":[[\"s\",\"s\",\"i\",\"p\",\"p\",\"i\"],[\"p\",\"p\",\"i\"]],\"nodes\":[]}]},{\"value\":[\"i\"],\"leaves\":[[\"p\",\"p\",\"i\"],[\"s\",\"s\",\"i\",\"p\",\"p\",\"i\"]],\"nodes\":[]}]},{\"value\":[\"i\"],\"leaves\":[[\"p\",\"p\",\"i\"]],\"nodes\":[{\"value\":[\"s\"],\"leaves\":[],\"nodes\":[{\"value\":[\"s\"],\"leaves\":[],\"nodes\":[{\"value\":[\"i\"],\"leaves\":[[\"s\",\"s\",\"i\",\"p\",\"p\",\"i\"],[\"p\",\"p\",\"i\"]],\"nodes\":[]}]}]}]},{\"value\":[\"p\"],\"leaves\":[[\"i\"],[\"p\",\"i\"]],\"nodes\":[]}]}"
            );
        });
    });

    describe('getLongestRepeatedSubString', () => {
        test('empty strings', () => {
            expect(
                new SuffixTree([]).getLongestRepeatedSubString()
            ).toStrictEqual(
                []
            );
            expect(
                new SuffixTree([]).getLongestRepeatedSubString()
            ).toStrictEqual(
                new SuffixTree('').getLongestRepeatedSubString()
            );
        });

        const str = 'Mississippi';
        const arr = str.split('');

        test('equal for string and array', () => {
            expect(
                new SuffixTree(arr).getLongestRepeatedSubString()
            ).toStrictEqual(
                new SuffixTree(str).getLongestRepeatedSubString()
            );
        });

        test('is correct', () => {
            expect(
                new SuffixTree(arr).getLongestRepeatedSubString()
            ).toStrictEqual(
                ["i", "s", "s", "i"]
            );
        });
    });
});
