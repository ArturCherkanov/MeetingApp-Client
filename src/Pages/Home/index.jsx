import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';

import MainContent from './components/MainContent/MainContent';
import {IP_PATH} from '../../api/paths'
export default class HomePage extends Component {
    componentDidMount() {
        const socket = openSocket(IP_PATH);
        socket.on('event', (data) => {
        });
    }
    render() {
        return (
            <MainContent history={this.props.history} />
        );
    }
}
HomePage.propTypes = {
    history: PropTypes.object,
};
