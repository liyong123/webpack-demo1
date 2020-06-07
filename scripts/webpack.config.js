const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js',
        // index2: './src/index2.js'  //多入口配置
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    devServer: {
       port: 3000,
       open: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, 
                    },
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'postcss-loader',
                    'less-loader',

                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                   {
                       loader: 'url-loader',
                       options: {
                           name: 'assets/images/[name].[ext]',
                           publicPath: '../',
                           limit:8192
                       }
                   }

                ]
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
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['index']   
        }),
        // 多入口配置
        // new HtmlWebpackPlugin({
        //     title: 'My App-copy',
        //     filename: 'index2.html',
        //     template: 'src/index.html',
        //     chunks: ['index2']      
        // }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash].css',
        }),
        new CopyPlugin([
            { 
                from: path.resolve(process.cwd(), 'src/static/images'), 
                to: path.resolve(process.cwd(), 'dist/static/images') 
            },
        ]),
        new CleanWebpackPlugin({

        })


    ]
}