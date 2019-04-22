import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// remove waste logout functions
import { logout } from '../../../../api/';
import { profile } from '../../../../actions/profileActions';

class RegButton extends Component {
    logout = () => {
        localStorage.removeItem('token');
    };

    render() {
        if (!this.props.profile.token) {
            console.log(this.props.profile);
            return <button className='button create-button' onClick={() => this.props.history.push('/registration')}><FontAwesomeIcon icon="user-plus" /></button>;
        }
        console.log(this.props.profile);
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
RegButton.propTypes = {
    profile: PropTypes.bool,
    history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegButton);
