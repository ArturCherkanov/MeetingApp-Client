import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../../../../components/LoginForm/loginForm';
import {addUserToDB} from '../../../../api/index'

import mainStyles from './Registration.css';

class RegistrationContainer extends Component {

    render() {
        return (
            <div className="main-content">
                <div className="container">
                    <div className={mainStyles.formContainer}>
                        <h1 className="d-block">Registration</h1>
                        <LoginForm buttonName={'Registration'} submitFunction={this.createUser}  />
                    </div>
                </div>
            </div>
        );
    }
 
    /*-----------СUSTOM METHODS-----------*/

    createUser = (e, username, password) => {
        e.preventDefault();
        addUserToDB(username, password)
    }

    /*-----------END СUSTOM METHODS-----------*/
    
}

export default connect()(RegistrationContainer);
