import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../../../components/LoginForm/loginForm';
import './Registration.css';
import {addUserToDB} from '../../../../api/api'

class Registation extends Component {

    render() {
        return (
            <div className="main-page">
                <div className="container">
                    <div className="registration-container">
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

export default connect()(Registation);
