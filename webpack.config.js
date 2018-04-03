const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    /*入口*/
    entry: path.join(__dirname, 'src/index.js'),
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['cache-loader','babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', "less-loader"],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                loader: 'url-loader', // copy文件的loader
                include: path.join(__dirname, 'src'),
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
    ],
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '127.0.0.1'
    }
};

module.exports = config;