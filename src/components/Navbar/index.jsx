import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { modalAction } from '../../actions/modalAction';
import { isToken } from '../../actions/isTokenAction';
import ExitButton from './components/exitButton';
import mainStyles from './Navbar.css';


class Navbar extends Component {

    render() {
        return (
            <div className={mainStyles.navbar}>
                <ExitButton />
                <div className={mainStyles.addEvent} onClick={(e) => { e.preventDefault(); this.props.setModalStateFunction(true); }}>+</div>
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
