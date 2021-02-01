const path = require('path');

module.exports = {
    entry: {
        'jsonapi-client': './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve( __dirname, 'build' ),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                resolve: {
                    fullySpecified: false,
                },
            }
        ]
    },
}