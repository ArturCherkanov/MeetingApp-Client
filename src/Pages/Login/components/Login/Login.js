import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../../../components/LoginForm/loginForm';
import { addUserToDB } from '../../../../api/api'


class Registation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        return (
            <div className="main-page">
                <div className="container">
                    <div className="registration-container">
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
        addUserToDB.then((resolve) => {
        }).catch(function (error) {
        });
    }

    /*-----------END СUSTOM METHODS-----------*/
}

export default connect()(Registation);
