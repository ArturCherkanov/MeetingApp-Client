import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegistrationContainer from './components/Registration/Registration';
import { isToken } from '../../actions/isTokenAction';

class RegistrationPage extends Component {

    UNSAFE_componentWillMount() {
        this.props.checkTokenFunction()
    }

    render() {
        if (this.props.Auth) {
            return <Redirect to='/' />;
        }
        return < RegistrationContainer history={this.props.history} />
    }

}

const mapStateToProps = (state) => ({
    Auth: state.Auth,
});

const mapDispatchToProps = (dispatch) => ({
    checkTokenFunction: () => {
        dispatch(isToken());
    },
});

RegistrationPage.propTypes = {
    history: PropTypes.object,
    Auth: PropTypes.bool,
    checkTokenFunction: PropTypes.func,

};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
