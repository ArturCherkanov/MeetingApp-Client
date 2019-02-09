import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginContainer from './components/Login/Login';

export default class LoginPage extends Component {

    render() {
        return (
            <LoginContainer history={this.props.history}/>
        )
    }

}

LoginPage.propTypes = {
    history: PropTypes.object,
};
