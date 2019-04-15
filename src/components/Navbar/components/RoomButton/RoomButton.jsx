import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isToken } from '../../../../actions/profileActions';
import mainStyles from '../../Navbar.css';


class RoomButton extends Component {

    render() {
        if (this.props.profile.token) {
            if (this.props.history.location.pathname === '/rooms') {
                return <button className={mainStyles.roomsButton} onClick={() => this.props.history.push('/')}>H</button>;
            }
            return <button className={mainStyles.roomsButton} onClick={() => this.props.history.push('/rooms')}>R</button>;
        }
        return null;

    }
}

const mapDispatchToProps = (dispatch) => ({
    checkTokenFunction: () => {
        dispatch(isToken());
    },
});
const mapStateToProps = (state) => ({
    profile: state.profile,
});
RoomButton.propTypes = {
    history: PropTypes.function,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomButton);
