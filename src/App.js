import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainContent from './Pages/Home/components/MainContent/MainContent';
import Registation from './Pages/Registration/components/Registration/Registration';
import Login from './Pages/Login/components/Login/Login'

import { Switch, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={MainContent} />
        <Route path='/registration' component={Registation} />
        <Route path='/login' component={Login} />
      </Switch>
    );
  }
}

export default connect()(App);
