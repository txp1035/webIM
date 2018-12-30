import React from 'react';
import ReactDOM from 'react-dom';
import Router from '@/Router';
import * as serviceWorker from './serviceWorker';
import '@/assets/style/index.less';
import '@/assets/icon/iconfont/iconfont.css';

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
