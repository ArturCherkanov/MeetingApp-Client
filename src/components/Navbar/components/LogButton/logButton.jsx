import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class LogButton extends Component {
    render() {
        if (this.props.profile.token) {
            return <button className='button cancel-button' onClick={this.props.logout}><FontAwesomeIcon icon="sign-out-alt" /></button>;
        }
        return <button className='button success-button' onClick={() => this.props.history.push('/login')}><FontAwesomeIcon icon="sign-in-alt" /></button>;
    }
}

LogButton.propTypes = {
    profile: PropTypes.string,
    logout: PropTypes.func,
    history: PropTypes.object,
};
