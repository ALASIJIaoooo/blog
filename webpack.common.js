const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: {
        index:'./src/js/index.js',
        test:'./src/js/test.js'
    },
    output:{
        filename: "js/[name].js",
        path: path.resolve(__dirname,'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: true,
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: "test.html",
            template: "./src/test.html",
            inject: true,
            chunks: ['test']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,// 抽取css到独立的文件中
                        options: {
                            // publicPath:'../'
                        }
                    },
                    "css-loader", // 将 CSS 转化成 CommonJS 模块
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    "sass-loader", // 将 Sass 编译成 CSS
                ],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath:'images',
                            name:'[name].[ext]'
                        },
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['images:src']
                    }
                }
            },
            {
                test: /\.js$/,
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
