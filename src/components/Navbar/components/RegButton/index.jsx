import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// remove waste logout functions
import { logout } from '../../../../api/';
import { isToken } from '../../../../actions/isTokenAction';

class RegButton extends Component {
    logout = () => {
        localStorage.removeItem('token');
        this.props.checkTokenFunction();
    };

    render() {
        if (!this.props.isToken) {
            return <button className='create-button' onClick={()=>this.props.history.push('/registration')}>R</button>
        }
        return null;
    }
}

const mapDispatchToProps = (dispatch) => ({
    checkTokenFunction: () => {
        dispatch(isToken());
    }
});
const mapStateToProps = (state) => ({
    isToken: state.isToken,
});
RegButton.propTypes = {
    isToken: PropTypes.bool,
    checkTokenFunction: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegButton);
