import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomePage from './Pages/Home/index';
import RegistationPage from './Pages/Registration/index';
import Login from './Pages/Login/index';

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
