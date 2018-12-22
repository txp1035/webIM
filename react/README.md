# webIM-react

## 日志一

### 依赖包说明

#### devDependencies

**webpack**
webpack：打包工具。
webpack-cli：此工具用于在命令行中运行 webpack。（4.0 版本后单独安装）
webpack-dev-server：服务器工具。
**loader**
babel-core：用于调用 Babel 的 API 进行转码。
babel-loader：使用 babel 必须的包。
babel-preset-es2015：用于 ES2015（ES6）转码。
babel-preset-react：用于 react 转码。
css-loader：用于使用类似@import 和 url（...）的方法实现 require 的功能。
style-loader：通过注入`<style>`标签将 CSS 添加到 DOM。
less：解析 less。
less-loader：将 less 转换。
url-loader：用于 css 中图片引用（file-loader）和图片转码。
cache-loader：加快打包时间。
**plugin**
html-webpack-plugin：用于自动生成 HTML。

#### dependencies

**react**
react：react 核心。
react-dom：react 文档渲染。
react-router-dom：react 路由使用。

### webpack 配置

webpack.config.js

```js
const path = require('path'); //引入node.js的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    index: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }, //设置出口，
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['cache-loader', 'babel-loader?cacheDirectory=true'],
        include: path.resolve(__dirname, './src')
      }, //缓存和解析
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        include: path.resolve(__dirname, './src')
      }, //css加载和less解析
      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
        loader: 'url-loader',
        include: path.resolve(__dirname, './src')
      } //文件解析
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
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
