import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import meta from './package.json';
import commonjs from '@rollup/plugin-commonjs';


const version = `// musicvis-lib v${meta.version} ${meta.homepage}`;
const input = 'src/index.js';

const outputConfig = {
    extend: true,
    banner: version,
    name: 'musicvislib',
};

const babelConfig = {
    babelHelpers: 'bundled',
    plugins: [
        // ['@babel/plugin-proposal-class-properties', { 'loose': true }],
        ['@babel/plugin-proposal-class-properties'],
        ['@babel/plugin-proposal-nullish-coalescing-operator'],
    ],
};

export default [
    {
        input,
        output: {
            ...outputConfig,
            file: 'dist/musicvislib.js',
            format: 'umd',
            indent: true,
        },
        plugins: [
            json({ compact: true }),
            resolve(),
            commonjs(),
            babel(babelConfig),
        ],
    },
    {
        input,
        output: {
            ...outputConfig,
            file: 'dist/musicvislib.min.js',
            format: 'umd',
            indent: false,
        },
        plugins: [
            json({ compact: true }),
            resolve(),
            commonjs(),
            babel(babelConfig),
            terser({
                format: { preamble: version },
            }),
        ],
    },
    {
        input,
        output: {
            ...outputConfig,
            file: 'dist/musicvislib.esm.js',
            format: 'es',
            indent: false,
        },
        plugins: [
            json({ compact: true }),
            resolve(),
            commonjs(),
            babel(babelConfig),
            terser({
                format: { preamble: version },
            }),
        ],
    },
];
