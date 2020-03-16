const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js"
    },
    // devServer: {
    //     // contentBase: path.join(__dirname, "/dist"),
    //     // compress: true,
    //     port: 9000,
    //     // watchContentBase: true,
    //     // progress: true
    // },
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new WebpackMd5Hash()
    ]
}