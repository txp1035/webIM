import React from 'react';
import ReactDom from 'react-dom';
import getRouter from './router';
import "./style/style.less"
import Login from "./component/Login"
import Register from "./component/Register"
import Main from "./component/Main"

ReactDom.render(
    <Main />, document.getElementById('app'));