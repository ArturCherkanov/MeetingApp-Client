import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import HomePage from './Pages/Home';
import RegistationPage from './Pages/Registration';
import Login from './Pages/Login';
import Rooms from './Pages/Meetings';
import { isToken } from './actions/isTokenAction';
import { getEventsFromDb } from './actions/currentEventListAction';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/registration' component={RegistationPage} />
                    <Route path='/login' component={Login} />
                    <Route path='/rooms' component={Rooms} />
                </>
            </Router>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    getEventsFromDb: (date) => {
        dispatch(getEventsFromDb(date));
    },
});

const mapStateToProps = (state) => ({
    eventList: state.eventList,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
