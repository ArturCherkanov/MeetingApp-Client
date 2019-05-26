import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { profile } from '../../actions/profileActions';
import Navbar from '../../components/Navbar';
import profileStyles from './index.css';
class Profile extends Component {
    componentDidMount() {
        this.props.checkToken();
    }

    render() {
        return (
            <div className="main-content">
                <Navbar history={this.props.history} />
                <div className="container">
                    <div className={profileStyles.profileUser}>
                        <div className={profileStyles.imgContainer}>
                            <img className={profileStyles.profileImg} src={this.props.profile.profilePhoto} alt="" />
                            <FontAwesomeIcon icon="edit" className={profileStyles.editImage} onClick={() => {}} />
                        </div>
                        <div className={profileStyles.userEmail}>{this.props.profile.email}</div>
                        <button className={'button ' + profileStyles.resetButton}>Reset Password</button>
                    </div>
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
