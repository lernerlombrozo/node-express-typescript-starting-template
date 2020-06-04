const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main:'./src/public/ts/main.ts',
        analytics:'./src/public/ts/analytics.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/public/js'),
        publicPath: 'dist/public/js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}