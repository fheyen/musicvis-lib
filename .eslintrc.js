module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
        jest: true
    },
    extends: [
        'eslint:recommended',
        'plugin:jsdoc/recommended'
    ],
    plugins: [
        'jsdoc'
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        // The Error level should be `error`, `warn`, or `off` (or 2, 1, or 0)
        'no-unused-vars': 1,
        'no-empty': 0, // TODO:
        'eqeqeq': 1,
        'indent': ['error', 4],
        // 'no-use-before-define': ['error', { 'functions': true, 'classes': true }],
        'new-parens': 'error',
        'no-async-promise-executor': 'off', // TODO:
        'prefer-exponentiation-operator': 'error',
        'prefer-object-spread': 'error',
        'semi': 'error',
        'quotes': ['error', 'single'],
        'linebreak-style': ['warn', 'unix'],
        'prefer-template': 'error',
        'prefer-rest-params': 'error',
        'no-var': 'error',
        'no-useless-constructor': 'error',
        'no-duplicate-imports': 'error',
        'no-new-object': 'error',
        'no-bitwise': 'warn',
        'prefer-const': 'off', // TODO:
        'jsdoc/no-undefined-types': 0,
        'jsdoc/check-tag-names': 1,
        'jsdoc/check-syntax': 1,
        'jsdoc/require-throws': 'error',
        'jsdoc/require-hyphen-before-param-description': ['warn', 'never'],
        'jsdoc/require-jsdoc': [
            'error', {
                require: {
                    MethodDefinition: true,
                    ArrowFunctionExpression: false,
                    ClassDeclaration: true,
                    ClassExpression: true,
                    FunctionExpression: true,
                }
            }
        ]
    }
};
