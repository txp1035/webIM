# webIM-react
 
## 依赖包说明
### devDependencies
#### webpack
webpack：打包工具。
webpack-cli：此工具用于在命令行中运行webpack。（4.0版本后单独安装）  
webpack-dev-server：服务器工具。
#### loader
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
#### plugin
html-webpack-plugin：用于自动生成HTML。
### dependencies
#### react
react：react核心。  
react-dom：react文档渲染。  
react-router-dom：react路由使用。

## 搭建开发环境
1、安装node.js环境。[node](http://imtxp.cn/2018/node/)。  
2、建立一个项目文件夹（webIm）。  
3、打开webIm文件夹，按住Ctrl+鼠标右键打开命令模式。  
4、输入`npm init -y`创建package.json文件。  
5、安装webpack，输入`npm i webpack@3 webpack-dev-server`安装webpack第三版和webpack-dev-server。
6、配置webpack，建立webpack.config.js文件
## UI组件
## View交互
