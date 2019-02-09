import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from '../../../../components/LoginForm/LoginForm';
import { findUserInDB } from '../../../../api/';

import mainStyles from './Login.css';
import LoginPage from '../..';

class Registation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    render() {
        return (
            <div className="main-content">
                <div className="container">
                    <div className={mainStyles.formContainer}>
                        <h1 className="d-block">Login</h1>
                        <LoginForm buttonName={'Login'} submitFunction={this.findUser} />
                    </div>
                </div>
            </div>
        );
    }
    /*-----------СUSTOM METHODS-----------*/

    findUser = (e, username, password) => {
        e.preventDefault();
        findUserInDB(username, password)
            .then(res => localStorage.setItem('token', res.data.token))
            .then(this.props.history.push('/'));
    }

    /*-----------END СUSTOM METHODS-----------*/
}

Registation.propTypes = {
    history: PropTypes.object,
};


export default connect()(Registation);
