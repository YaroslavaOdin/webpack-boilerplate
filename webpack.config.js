const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),//где лежат все исходники приложения
    mode: 'development', //собираем все в режиме разработки
    entry: {
        main: './index.js',
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
        ]
    },
}