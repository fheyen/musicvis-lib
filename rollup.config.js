import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import jsdoc from 'rollup-plugin-jsdoc';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import meta from './package.json';
import commonjs from '@rollup/plugin-commonjs';



const version = `// ${meta.homepage} v${meta.version}`;
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
            jsdoc({
                args: ['-r', '-d', 'docs'],
                config: 'jsdoc.conf.json',
            }),
        ],
    },
    {
        input,
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
        output: {
            extend: true,
            file: 'dist/musicvislib.min.js',
            format: 'umd',
            indent: false,
            name: 'musicvislib',
        },
    },
    {
        input,
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
        output: {
            extend: true,
            file: 'dist/musicvislib.esm.js',
            format: 'es',
            indent: false,
            name: 'musicvislib',
        },
    },
    {
        input,
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
            babel({ babelHelpers: 'bundled', plugins: [['@babel/plugin-proposal-class-properties', { 'loose': true }]] }),
        ],
        output: {
            extend: true,
            file: 'dist/musicvislib.es6.js',
            format: 'umd',
            indent: false,
            name: 'musicvislib',
        },
    },
];
