import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.less';
import './style/iconfont/iconfont.css';
import Router from './Router.js';
// import Main from './component/Main.js';
// import { HashRouter, Route, NavLink } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
