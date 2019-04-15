import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// remove waste logout functions
import { logout } from '../../../../api/';
import { isToken } from '../../../../actions/profileActions';

class RegButton extends Component {
    logout = () => {
        localStorage.removeItem('token');
    };

    render() {
        if (!this.props.profile) {
            return <button className='create-button' onClick={() => this.props.history.push('/registration')}>R</button>;
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
RegButton.propTypes = {
    profile: PropTypes.bool,
    history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegButton);
