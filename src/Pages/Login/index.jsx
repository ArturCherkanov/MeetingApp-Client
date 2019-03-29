import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginContainer from './components/Login/Login';
import { isToken } from '../../actions/isTokenAction';

class LoginPage extends Component {

    componentDidMount() {
        this.props.checkTokenFunction();
    }

    render() {
        if (this.props.Auth) {
            return <Redirect to='/' />;
        }
        return <LoginContainer history={this.props.history} />;


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
LoginPage.propTypes = {
    checkTokenFunction: PropTypes.func,
    Auth: PropTypes.bool,
    history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
