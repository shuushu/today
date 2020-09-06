const path = require('path');

module.exports = {
    mode: 'production',
    watch: true,
    entry: './src/js/today-utf-8.js',
    output: {
        filename: 'test.js',
        path: path.resolve(__dirname, './'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/transform-runtime']
                    }
                }
            }
        ]
    }
};