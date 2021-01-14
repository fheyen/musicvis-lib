const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'musicvislib.min.js',
        library: 'musicvislib',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['source-map-loader', 'babel-loader'],
            },
        ],
    },
    mode: 'production',
};
