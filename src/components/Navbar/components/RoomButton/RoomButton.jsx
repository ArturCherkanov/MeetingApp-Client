import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { profile } from '../../../../actions/profileActions';
import mainStyles from '../../Navbar.css';


class RoomButton extends Component {

    render() {
        if (this.props.profile.token) {
            if (this.props.history.location.pathname === '/rooms') {
                return <button className={'button '+mainStyles.roomsButton} onClick={() => this.props.history.push('/')}><FontAwesomeIcon icon="home" /></button>;
            }
            return <button className={'button '+mainStyles.roomsButton} onClick={() => this.props.history.push('/rooms')}><FontAwesomeIcon icon="calendar-minus" /></button>;
        }
        return null;

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
