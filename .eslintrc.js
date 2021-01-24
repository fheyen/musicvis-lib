/* eslint-disable linebreak-style */
module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:jsdoc/recommended',
        'plugin:unicorn/recommended',
    ],
    plugins: [
        'jsdoc',
        'unicorn',
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    ignorePatterns: ['**/docs/*.js', '**/dist/*.js', '**/*.test.js', '**/node_modules/**'],
    reportUnusedDisableDirectives: true,
    rules: {
        // The Error level should be `error`, `warn`, or `off` (or 2, 1, or 0)
        'eqeqeq': 1,
        'indent': ['error', 4],
        'comma-dangle': ['warn', 'always-multiline'],
        'comma-style': ['warn', 'last'],
        'eol-last': ['warn', 'always'],
        'jsdoc/check-syntax': 1,
        'jsdoc/check-tag-names': 1,
        'jsdoc/no-undefined-types': 0,
        'jsdoc/require-hyphen-before-param-description': ['warn', 'never'],
        'jsdoc/require-jsdoc': [
            'error', {
                require: {
                    MethodDefinition: true,
                    ArrowFunctionExpression: false,
                    ClassDeclaration: true,
                    ClassExpression: true,
                    FunctionExpression: true,
                },
            },
        ],
        'jsdoc/require-throws': 'error',
        // 'linebreak-style': ['warn', 'unix'],
        'multiline-comment-style': ['off', 'starred-block'],
        'newline-per-chained-call': ['warn', { 'ignoreChainWithDepth': 3 }],
        'new-parens': 'error',
        'new-cap': 'error',
        'no-async-promise-executor': 'off', // TODO:
        'no-bitwise': 'warn',
        'no-duplicate-imports': 'error',
        'no-empty': 0, // TODO:
        'no-floating-decimal': 'warn',
        'no-implicit-coercion': 'off', // TODO:
        'no-trailing-spaces': 'warn',
        'no-new-object': 'error',
        'no-unused-vars': 1,
        'no-use-before-define': ['off', { 'functions': true, 'classes': true }],
        'no-useless-constructor': 'error',
        'no-useless-return': 'warn',
        'no-var': 'error',
        'no-void': 'error',
        'prefer-const': 'off', // TODO:
        'prefer-exponentiation-operator': 'error',
        'prefer-object-spread': 'error',
        'prefer-rest-params': 'error',
        'prefer-template': 'error',
        'quotes': ['error', 'single'],
        'semi': 'error',
        'spaced-comment': ['warn', 'always'],
        'unicorn/filename-case': 'off',
        'unicorn/no-null': 'off', // TODO:
        'unicorn/no-new-array': 'warn',
        'unicorn/no-array-for-each': 'off',
        'unicorn/prefer-ternary': ['warn', 'only-single-line'],
        'unicorn/prevent-abbreviations': [
            'warn',
            {
                'replacements': {
                    'i': {
                        'index': false,
                    },
                    'j': {
                        'index': false,
                    },
                    'func': {
                        'function': false,
                        'function_': false,
                    },
                },
            },
        ],
        'yoda': 'warn',
    },
};
