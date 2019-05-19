import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { profile } from '../../../../actions/profileActions';
import mainStyles from '../../Navbar.css';


class RoomButton extends Component {
    render() {
        let { profile, history } = this.props;
        let pathname = history.location.pathname;
        let isLoggedIn = profile.isLoggedIn;
        let isActive = isLoggedIn && history.location.pathname === '/';
        return isActive && <button className={'button ' + mainStyles.roomsButton} onClick={() => this.props.history.push('/rooms')}><FontAwesomeIcon icon="calendar-minus" /></button>;

    }
}

const mapDispatchToProps = (dispatch) => ({
    checkTokenFunction: () => {
        dispatch(profile());
    },
});
const mapStateToProps = (state) => ({
    profile: state.profile,
});
RoomButton.propTypes = {
    history: PropTypes.function,
    profile: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomButton);
