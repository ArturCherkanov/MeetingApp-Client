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
        if (this.props.isToken) {
            return <Redirect to='/' />;
        }
        return < RegistrationContainer history={this.props.history} />
    }

}

const mapStateToProps = (state) => ({
    isToken: state.isToken,
});

const mapDispatchToProps = (dispatch) => ({
    checkTokenFunction: () => {
        dispatch(isToken());
    },
});

RegistrationPage.propTypes = {
    history: PropTypes.object,
    isToken: PropTypes.bool,
    checkTokenFunction: PropTypes.func,

};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
