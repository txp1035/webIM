# webIM-react
 
## 日志一
### 依赖包说明
#### devDependencies
**webpack**  
webpack：打包工具。
webpack-cli：此工具用于在命令行中运行webpack。（4.0版本后单独安装）  
webpack-dev-server：服务器工具。
**loader**  
babel-core：用于调用Babel的API进行转码。  
babel-loader：使用babel必须的包。  
babel-preset-es2015：用于ES2015（ES6）转码。  
babel-preset-react：用于react转码。  
css-loader：用于使用类似@import和url（...）的方法实现require的功能。  
style-loader：通过注入`<style>`标签将CSS添加到DOM。  
less：解析less。  
less-loader：将less转换。  
url-loader：用于css中图片引用（file-loader）和图片转码。  
cache-loader：加快打包时间。
**plugin**  
html-webpack-plugin：用于自动生成HTML。
#### dependencies
**react**  
react：react核心。  
react-dom：react文档渲染。  
react-router-dom：react路由使用。
### webpack配置
webpack.config.js
```
const path = require('path');//引入node.js的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        index: path.resolve(__dirname, './src/index.js')
    },
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
        contentBase: path.resolve(__dirname, './dist'),
        host: '127.0.0.1',
        port: 8080,
        historyApiFallback: true
    }
};

module.exports = config;
```
