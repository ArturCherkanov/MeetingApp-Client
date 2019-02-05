import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomePage from './Pages/Home/index';
import RegistationPage from './Pages/Registration/index';
import Login from './Pages/Login/index'

import { Switch, Route } from 'react-router-dom';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/registration' component={RegistationPage} />
        <Route path='/login' component={Login} />
      </Switch>
    );
  }
}