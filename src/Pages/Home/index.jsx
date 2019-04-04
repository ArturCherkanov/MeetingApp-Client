import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';

import MainContent from './components/MainContent/MainContent';

export default class HomePage extends Component {
    componentDidMount() {
        const socket = openSocket('http://192.168.11.65:3001');
        socket.on('event', (data) => {
        });
    }
    // socket = io.connect('http://localhost:3001');
    // var socket = io();
    render() {
        return (
            <MainContent history={this.props.history} />
        );
    }
}
HomePage.propTypes = {
    history: PropTypes.object,
};
