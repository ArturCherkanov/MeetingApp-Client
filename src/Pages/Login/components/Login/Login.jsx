import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../../../../components/LoginForm/LoginForm';
import { addUserToDB } from '../../../../api/'

import mainStyles from './Login.css'

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
        
    }

    /*-----------END СUSTOM METHODS-----------*/
}

export default connect()(Registation);
