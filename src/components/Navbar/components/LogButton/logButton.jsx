import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default class LogButton extends Component {
    render() {
        if (this.props.profile) {
            return <button className='cancel-button' onClick={this.props.logout}>-</button>;
        }
        return <button className='success-button' onClick={() => this.props.history.push('/login')}>L</button>;
    }
}

LogButton.propTypes = {
    profile: PropTypes.string,
    logout: PropTypes.func,
    history: PropTypes.object,
};
