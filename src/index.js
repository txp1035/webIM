import React from 'react';
import ReactDom from 'react-dom';
import getRouter from './router';
import "./style/style.less"
import Login from "./component/Login.jsx"
import Register from "./component/Register.jsx"
import Main from "./component/Main.jsx"

ReactDom.render(
    <Main />, document.getElementById('app'));