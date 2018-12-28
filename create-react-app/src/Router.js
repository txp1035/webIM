import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Login from './component/Login.js';
import Register from './component/Register.js';
import Main from './component/Main.js';

class Router extends Component {
  render() {
    return (
      <HashRouter>
        <div className="Router">
          <Route exact path="/" component={Login} />
          <Route path="/Login" component={Login} />
          <Route path="/Main" component={Main} />
          <Route path="/Register" component={Register} />
        </div>
      </HashRouter>
    );
  }
}

export default Router;
