const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
    }]

    if (isDev) {
        loaders.push('eslint-loader');
    }

    return loaders;
}

module.exports = {
    context: path.resolve(__dirname, 'src'), //где лежат все исходники приложения
    mode: 'development', //собираем все в режиме разработки
    entry: {
        main: ['@babel/polyfill', './index.js'],
        analytics: './analytics.js'
    }, //входной файл приложения
    output: { //куда складывать результат работы вебпака
        filename: '[name].[contenthash].js', 
        path: path.resolve(__dirname, 'dist') //куда складывать
    },
    resolve: {
        extensions: ['.js', 'json'], //какие расширения понимать по умолчанию
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        port: 4200,
        overlay: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html' //путь к html, в котором мы работаем
        }),
        new CleanWebpackPlugin(),
    ],
    //возможность добавления в вебпаку доп функционала, позволяющего ему работать с другими файлами
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },

            {
                test:/\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },

            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }, 

            {
                test: /\.xml$/,
                use: ['xml-loader']
            },

            {
                test: /\.csv$/,
                use: ['csv-loader']
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
                
            },
        ]
    },
}