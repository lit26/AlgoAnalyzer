const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, './static/frontend'),
        filename: '[name].js',
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: { contentBase: path.join(__dirname, 'src') },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
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
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [new BundleTracker({ filename: './webpack-stats.json' })],
};
