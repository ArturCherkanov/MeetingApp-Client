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
            error: false,
        };
    }


    render() {
        return (
            <div className="main-content">
                <div className="container">
                    <div className={mainStyles.formContainer}>
                        <h1 className="d-block">Login</h1>
                        {this.state.error && (<div className={mainStyles.errorContainer}>You creadentials are not valid!</div>)}
                        <LoginForm buttonName={'Login'} error={this.state.error} history={this.props.history} login={this.login} />
                    </div>
                </div>
            </div>
        );
    }
    /*-----------СUSTOM METHODS-----------*/

    login = (e, username, password) => {
        e.preventDefault();
        findUserInDB(username, password)
            .then(res =>
                localStorage.setItem('token', res.data.token))
            .then(() => this.props.checkToken())
            .then(() => this.props.history.push('/'))
            .catch((err) => { this.setState({ error: true }); })
    }

    /*-----------END СUSTOM METHODS-----------*/
}

const mapStateToProps = (state) => ({
    profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
    checkToken: () => {
        dispatch(profile());
    },
});
Login.propTypes = {
    checkToken: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
