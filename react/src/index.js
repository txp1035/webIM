import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './style/style.less';
import './style/iconfont/iconfont.css';
import Router from './Router.js';
import Main from './component/Main.js';
import { HashRouter, Route, NavLink } from 'react-router-dom';

ReactDom.render(<Router />, document.getElementById('app'));
