import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showNotificationAction } from '../../actions/notificationActions';
import NotificationStyles from './NotificationAlert.css';

class NotificationAlert extends Component {

    render() {
        let audio = new Audio('https://z1.fm/download/9513221');
        audio.play();
        audio.autoplay =false;

        setTimeout(() => { this.props.showNotificationAction(false); }, 90000);
        return (
            <>
            <div className={NotificationStyles.alert}>{this.props.notification.msg}</div>
<a href={this.props.notofication.href}>Add To Foofle Calendar</a>
</>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    showNotificationAction: (state) => {
        dispatch(showNotificationAction(state));
    },

});

const mapStateToProps = (state) => ({
    notification: state.notification,
});

NotificationAlert.propTypes = {
    showNotificationAction: PropTypes.func,
    notification: PropTypes.object,
};


export default connect(mapStateToProps, mapDispatchToProps)(NotificationAlert);
