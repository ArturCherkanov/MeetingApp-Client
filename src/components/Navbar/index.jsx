import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { modalAction } from '../../actions/modalAction';
import { isToken } from '../../actions/isTokenAction';
import LogButton from './components/LogButton/logButton';
import RegButton from './components/RegButton/';
import ModalButton from './components/ModalButton/ModalButton';
import mainStyles from './Navbar.css';


class Navbar extends Component {
    logout = () => {
        localStorage.removeItem('token');
        this.props.checkTokenFunction();
    };
    render() {
        return (
            <div className={mainStyles.navbar}>
                <LogButton isToken={this.props.isToken} logout={this.logout} history={this.props.history} />
                <RegButton history={this.props.history} />
                <ModalButton />
                <div className={mainStyles.profile}>
                    <span className={mainStyles.profileImg}></span>
                </div>
            </div>);
    }
}

const mapDispatchToProps = (dispatch) => ({
    setModalStateFunction: state => {
        dispatch(modalAction(state));
    },
    checkTokenFunction: () => {
        dispatch(isToken());
    },
});

const mapStateToProps = (state) => ({
    active: state.modalView.modalState,
    isToken: state.isToken,
});

Navbar.propTypes = {
    setModalStateFunction: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
