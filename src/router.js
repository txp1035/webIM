import React from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Main from './component/Main.jsx';
import Login from './component/Login.jsx';


const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/Main">Page1</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/Main" component={Main} />
            </Switch>
        </div>
    </Router>
);

export default getRouter;