import React, { Component } from 'react';
import './Navbar.css';

import { connect } from 'react-redux';
import { modalAction } from '../../actions/modalAction'


class Navbar extends Component {
  render() {
    return <div className="navbar">
      <div className="add-event" onClick={(e) => { e.preventDefault(); this.props.setModalStateFunction('active') }}>+</div>
      <div className="profile">
        <span className="profile-img"></span>
      </div>
    </div>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setModalStateFunction: state => {
          dispatch(modalAction(state))
      }
  }
}

const mapStateToProps = (state) => {
  return { active: state.modalView.modalState };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
