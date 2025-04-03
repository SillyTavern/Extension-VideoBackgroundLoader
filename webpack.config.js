import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const __dirname = import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url));

/** @type {import('webpack').Configuration} */
export default {
    entry: path.join(__dirname, 'src/index.ts'),
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: path.join(__dirname, 'node_modules/@ffmpeg/core/dist/umd'),
                to: path.join(__dirname, 'dist/'),
            }],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/,
                use: { loader: 'html-loader' },
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },
};
