// eslint-disable-next-line unicorn/prevent-abbreviations
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'musicvislib.js',
        library: 'musicvislib',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: ['source-map-loader', 'babel-loader'],
            },
        ],
    },
    mode: 'development',
};
