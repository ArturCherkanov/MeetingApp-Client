import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isToken } from '../../../../actions/isTokenAction';

export default class LogButton extends Component {


    render() {
        if (this.props.isToken) {
            return <button className='cancel-button' onClick={this.props.logout}>-</button>;
        }
        return <button className='success-button' onClick={() => this.props.history.push('/login')}>L</button>;
    }
}

