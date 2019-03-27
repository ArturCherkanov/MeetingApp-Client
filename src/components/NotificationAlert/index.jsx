import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notificationAction } from '../../actions/notificationAction';
import NotificationStyles from './NotificationAlert.css';

class NotificationAlert extends Component {

    render() {
        let audio = new Audio('https://z1.fm/download/9513221');
        audio.play();
        audio.autoplay =false;

        setTimeout(() => { this.props.notificationAction(false); }, 6000);
        return (
            <div className={NotificationStyles.alert}>{this.props.notification.msg}</div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    notificationAction: (state) => {
        dispatch(notificationAction(state));
    },

});

const mapStateToProps = (state) => ({
    notification: state.notification,
});

NotificationAlert.propTypes = {
};


export default connect(mapStateToProps, mapDispatchToProps)(NotificationAlert);
