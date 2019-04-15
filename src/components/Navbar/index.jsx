import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { modalAction } from '../../actions/modalActions';
import { isToken } from '../../actions/profileActions';
import LogButton from './components/LogButton/logButton';
import RegButton from './components/RegButton/';
import ModalButton from './components/ModalButton/ModalButton';
import RoomButton from './components/RoomButton/RoomButton';
import mainStyles from './Navbar.css';


class Navbar extends Component {
    logout = () => {
        localStorage.removeItem('token');
        this.props.history.push('/login');
        // this.props.checkTokenFunction();

    };
    render() {
        return (
            <div className={mainStyles.navbar}>
                <RoomButton profile={this.props.profile} history={this.props.history} />
                <LogButton profile={this.props.profile} logout={this.logout} history={this.props.history} />
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
    profile: state.profile,
});

Navbar.propTypes = {
    history: PropTypes.object,
    profile: PropTypes.string,
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
