import React, { Component } from 'react';
import ReactDom from 'react-dom';
import "./style/style.less"
import "./style/iconfont/iconfont.css"
import Router from "./Router.jsx"
import Main from "./component/Main.jsx"
import { HashRouter, Route, NavLink } from 'react-router-dom';


ReactDom.render(
    <Router />, 
    document.getElementById('app'));