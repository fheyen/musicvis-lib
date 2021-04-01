import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import jsdoc from 'rollup-plugin-jsdoc';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import meta from './package.json';
import commonjs from '@rollup/plugin-commonjs';


const version = `// musicvis-lib v${meta.version} ${meta.homepage}`;
const input = 'src/index.js';

export default [
    {
        input,
        output: {
            extend: true,
            banner: version,
            file: 'dist/musicvislib.js',
            format: 'umd',
            indent: true,
            name: 'musicvislib',
        },
        plugins: [
            json({
                compact: true,
                exclude: 'node_modules/**',
            }),
            resolve(),
            commonjs(),
            babel({
                babelHelpers: 'bundled',
                plugins: [
                    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
                    ['@babel/plugin-proposal-nullish-coalescing-operator'],
                ],
            }),
            jsdoc({
                args: ['-r', '-d', 'docs'],
                config: 'jsdoc.conf.json',
            }),
        ],
    },
    {
        input,
        output: {
            extend: true,
            file: 'dist/musicvislib.min.js',
            format: 'umd',
            indent: false,
            name: 'musicvislib',
        },
        plugins: [
            json({
                compact: true,
            }),
            resolve(),
            commonjs(),
            terser({
                format: {
                    preamble: version,
                },
            }),
        ],
    },
    {
        input,
        output: {
            extend: true,
            file: 'dist/musicvislib.esm.js',
            format: 'es',
            indent: false,
            name: 'musicvislib',
        },
        plugins: [
            json({
                compact: true,
            }),
            resolve(),
            commonjs(),
            terser({
                format: {
                    preamble: version,
                },
            }),
        ],
    },
];
