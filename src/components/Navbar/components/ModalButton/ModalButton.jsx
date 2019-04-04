import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isToken } from '../../../../actions/isTokenAction';
import mainStyles from '../../Navbar.css';


class ModalButton extends Component {

    render() {
        if (this.props.profile) {
            return <div className={mainStyles.addEvent} onClick={(e) => { e.preventDefault(); this.props.setModalStateFunction(true); }}>+</div>
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
    profile: state.profile,
});
ModalButton.propTypes = {
    profile: PropTypes.bool,
    checkTokenFunction: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalButton);
