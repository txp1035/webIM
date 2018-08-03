const path = require('path');//引入node.js的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        index: path.resolve(__dirname, './src/index.js')
    },//设置入口，__dirname表示当前执行脚本所在的目录。
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },//设置出口，
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['cache-loader','babel-loader?cacheDirectory=true'],
                include: path.resolve(__dirname, './src')
            },//缓存和解析
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', "less-loader"],
                include: path.resolve(__dirname, './src')
            },//css加载和less解析
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                loader: 'url-loader',
                include: path.resolve(__dirname, './src')
            }//文件解析
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, './dist'),
        historyApiFallback: true,
        host: '127.0.0.1'
    }
};

module.exports = config;