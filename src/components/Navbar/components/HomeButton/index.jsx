import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mainStyles from '../../Navbar.css';
export default class HomeButton extends Component {
    render() {
        let {profile, history} = this.props;
        let pathName = history.location.pathname;
        let isActive = pathName === '/rooms' || pathName === '/profile'
        return profile.isLoggedIn && isActive && <button className={'button ' + mainStyles.roomsButton} onClick={() => this.props.history.push('/')}><FontAwesomeIcon icon="home" /></button>;
    }
}
HomeButton.propTypes = {
    profile: PropTypes.string,
    history: PropTypes.object,
};
