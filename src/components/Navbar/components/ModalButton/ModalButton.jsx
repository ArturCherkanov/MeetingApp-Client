import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { profile } from '../../../../actions/profileActions';
import mainStyles from '../../Navbar.css';


class ModalButton extends Component {

    render() {
        if (this.props.profile.token) {
            return <div className={mainStyles.addEvent} onClick={(e) => { e.preventDefault(); this.props.setModalStateFunction(true); }}>+</div>;
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
ModalButton.propTypes = {
    profile: PropTypes.bool,
    setModalStateFunction: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalButton);
