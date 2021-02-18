import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegistrationForm from '../RegistrationForm/registrationForm';
import { addUserToDB } from '../../../../api/';

import mainStyles from './Registration.css';

class RegistrationContainer extends Component {

    render() {
        return (
            <div className="main-content">
                <div className="container">
                    <div className={mainStyles.formContainer}>
                        <h1 className="d-block">Registration</h1>
                        <RegistrationForm buttonName={'Registration'} submitFunction={this.createUser} />
                    </div>
                </div>
            </div>
        );
    }

    /*-----------СUSTOM METHODS-----------*/

    createUser = (e, username, password) => {
        e.preventDefault();
        addUserToDB(username, password)
            .then(res => { localStorage.setItem('token', res.data.token); })
            .then(() => this.props.history.push('/'));
    }

    /*-----------END СUSTOM METHODS-----------*/
}

RegistrationContainer.propTypes = {
    history: PropTypes.object,
};

export default connect()(RegistrationContainer);
