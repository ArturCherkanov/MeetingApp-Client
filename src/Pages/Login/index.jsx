import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginContainer from './components/Login/Login';
import { profile } from '../../actions/profileActions';

class LoginPage extends Component {

    componentDidMount() {
        this.props.checkTokenFunction();
    }

    render() {
        if (this.props.profile.isLoggedIn) {
            return <Redirect to='/' />;
        }
        return <LoginContainer history={this.props.history} />;


    }
}
const mapStateToProps = (state) => ({
    profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
    checkTokenFunction: () => {
        dispatch(profile());
    },
});
LoginPage.propTypes = {
    checkTokenFunction: PropTypes.func,
    profile: PropTypes.bool,
    history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
