import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { modalAction } from '../../actions/modalActions';
import { profile } from '../../actions/profileActions';
import LogButton from './components/LogButton/logButton';
import RegButton from './components/RegButton/';
import ModalButton from './components/ModalButton/ModalButton';
import RoomButton from './components/RoomButton/RoomButton';
import HomeButton from './components/HomeButton/';
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
                <HomeButton profile={this.props.profile} logout={this.logout} history={this.props.history} />
                <RoomButton profile={this.props.profile} history={this.props.history} />
                { this.props.profile.isLoggedIn &&
                <div className={mainStyles.profile}>
                    <img className={mainStyles.profileImg+' button'} onClick={() => this.props.history.push('/profile')} src={this.props.profile.profilePhoto} />
                </div>
                }
                <LogButton profile={this.props.profile} logout={this.logout} history={this.props.history} />
                <RegButton history={this.props.history} />
                <ModalButton />
            </div>);
    }
}

const mapDispatchToProps = (dispatch) => ({
    setModalStateFunction: state => {
        dispatch(modalAction(state));
    },
    checkTokenFunction: () => {
        dispatch(profile());
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
