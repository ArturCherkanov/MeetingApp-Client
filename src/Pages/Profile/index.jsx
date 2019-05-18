import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { profile } from '../../actions/profileActions';
import profileStyles from './index.css';
class Profile extends Component {
    componentDidMount() {
        this.props.checkToken();
        // let token = localStorage.getItem('token');
        // if (token) {
        // this.props.getRoomList();
        // const socket = openSocket('http://192.168.11.65:3001');
        // socket.emit('join', { token: token });
        // socket.on('sendNotification', (req) => {
        // this.props.notificationAction(req);
        // });
    }

    render() {
        return (
            <div className="main-content">
                <div className="container">
                    <img className={profileStyles.image} src={this.props.profile.profilePhoto} alt="" />
                    <div>{this.props.profile.email}</div>
                    <button className={'button'}>Reset Password</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    checkToken: () => {
        dispatch(profile());
    },
});

const mapStateToProps = (state) => ({
    profile: state.profile,
});

Profile.propTypes = {
    profile: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
