import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Main from '@/views/Main';

class Router extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Login" component={Login} />
          <Route path="/Main" component={Main} />
          <Route path="/Register" component={Register} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Router;
