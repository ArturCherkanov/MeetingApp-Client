import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from '../LoginForm/loginForm';
import { findUserInDB } from '../../../../api/';
import { profile } from '../../../../actions/profileActions';

import mainStyles from './Login.css';

class Login extends Component {
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
                        <LoginForm buttonName={'Login'} submitFunction={this.authActions} />
                    </div>
                </div>
            </div>
        );
    }
    /*-----------СUSTOM METHODS-----------*/

    authActions = (e, username, password) => {
        e.preventDefault();
        findUserInDB(username, password)
            .then(res => localStorage.setItem('token', res.data.token))
            .then(() => this.props.checkTokenFunction())
            .then(() => this.props.history.push('/'));
    }

    /*-----------END СUSTOM METHODS-----------*/
}

const mapStateToProps = (state) => ({
    profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
    checkTokenFunction: () => {
        dispatch(profile());
    },
});
Login.propTypes = {
    checkTokenFunction: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
