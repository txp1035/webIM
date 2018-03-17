# webIM-easemob
这是基于环信的一个web即时通讯（react版）

## 依赖包说明
### babel
babel-core：用于调用Babel的API进行转码。
babel-loader：使用babel必须的包。
babel-preset-es2015：用于ES2015（ES6）转码。
babel-preset-react：用于react转码。
### webpack
webpack：打包工具。
webpack-dev-server：服务器工具。
css-loader：用于使用类似@import和url（...）的方法实现require的功能
style-loader：通过注入`<style>`标签将CSS添加到DOM
less：解析less
less-loader：将less转换
url-loader：用于css中图片引用（file-loader）和图片转码。
html-webpack-plugin：用于打包HTML
### 优化
cache-loader：加快打包时间。
### react
react：react核心。
react-dom：react文档渲染。
react-router-dom：react路由使用。
