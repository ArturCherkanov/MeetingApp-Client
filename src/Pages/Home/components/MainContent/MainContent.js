import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Navbar from '../../../../components/Navbar/Navbar.js';
import AddNewEvent from '../../../../components/AddNewEvent/AddNewEvent';
import EventList from '../EventList/EventList.js';
import moment from 'moment';
import { connect } from 'react-redux';
import './Calendar.css';
import './MainContent.css';
import { modalAction } from '../../../../actions/modalAction'

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      eventList: this.data,
      selectedDate: ""
    }
  }

  activateWindow = (e) => {
    this.props.setModalStateFunction("active")
  }

  closeWindow = (test) => {
    this.setState({ active: test })
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  sortEventsBySelectedDate = (date) => {
    let newArrayWithEvents = [],
      selectedDate = date.toLocaleString().replace(/,.*$/, "");
    this.props.eventList.filter(event => {
      let dataParse = moment(event.time.replace(/T.*$/, "").replace(/-/g, "/")).format("MM/DD/YYYY");
      if (event.time && dataParse == selectedDate) {
        newArrayWithEvents.push(event);
      }
    });

    this.setState({
      eventList: newArrayWithEvents
    })
  }

  render() {
    return (
      <div className="main-page">
        <Navbar />
        <div className="container">
          <div className="main-content">
            <div className="calendar-container">
              <Calendar onClickDay={(value) => {this.sortEventsBySelectedDate(value)}} />
              <button className="addNewEvent-create-button shadow" onClick={this.activateWindow}>Create</button>
            </div>
            <EventList handleSearch={this.handleSearch} chosenEventOnCaledar={this.state.eventList} />
          </div>
        </div>
        <AddNewEvent AddNewEventToDB={this.AddNewEventToDB} />
      </div>
    );
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
  return {
    modalState: state.modalView.modalState,
    eventList: state.eventList.state,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);