module.exports = {
    mode: 'production',
    watch: true,
    entry: './src/js/temp.js',
    output: {
        filename: 'test.js',
        //path: path.resolve(__dirname, './'),
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};