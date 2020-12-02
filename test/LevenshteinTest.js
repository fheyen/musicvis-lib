import levenshteinDistance from '../../musicvis-toolkit/frontend/src/lib/stringbased/Levenshtein';

export default [
    {
        fnName: 'Levenshtein.js - levenshteinDistance',
        fn: levenshteinDistance,
        tests: [
            {
                description: 'Two empty strings',
                params: [
                    '',
                    '',
                ],
                expected: 0
            },
            {
                description: 'One empty string',
                params: [
                    'abc',
                    ''
                ],
                expected: 3
            },
            {
                description: 'One empty string',
                params: [
                    '',
                    'abc',
                ],
                expected: 3
            },
            {
                description: 'Same string',
                params: [
                    'abcdabcd',
                    'abcdabcd',
                ],
                expected: 0
            },
            {
                description: 'Deletion',
                params: [
                    'abCde',
                    'abde',
                ],
                expected: 1
            },
            {
                description: 'Addition',
                params: [
                    'abde',
                    'abCde',
                ],
                expected: 1
            },
            {
                description: 'Substitution',
                params: [
                    'abCde',
                    'abXde',
                ],
                expected: 1
            }
        ],
    }
];
