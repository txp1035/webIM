import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Main from '@/views/Main';

class Router extends Component {
  render() {
    const a = 2;
    const logout = (
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="*" render={() => <Redirect to="/login" />} />
      </Switch>
    );
    const login = (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Main" component={Main} />
      </Switch>
    );
    return <HashRouter>{a === 1 ? login : logout}</HashRouter>;
  }
}

export default Router;
