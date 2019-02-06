import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { modalAction } from '../../actions/modalAction';

import mainStyles from './Navbar.css';


class Navbar extends Component {
    render() {
        return <div className={mainStyles.navbar}>
            <div className={mainStyles.addEvent} onClick={(e) => { e.preventDefault(); this.props.setModalStateFunction(true); }}>+</div>
            <div className={mainStyles.profile}>
                <span className={mainStyles.profileImg}></span>
            </div>
        </div>;
    }
}

const mapDispatchToProps = (dispatch) => ({
    setModalStateFunction: state => {
        dispatch(modalAction(state));
    },
});

const mapStateToProps = (state) => ({ active: state.modalView.modalState });

Navbar.propTypes = {
    setModalStateFunction: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
