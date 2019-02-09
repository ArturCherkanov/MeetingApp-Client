import React, { Component } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../../../../components/Navbar/Navbar';
import AddNewEvent from '../../../../components/AddNewEvent/AddNewEvent';
import EventList from '../EventList/EventList';
import { modalAction } from '../../../../actions/modalAction';

import './Calendar.css';
import mainStyles from './MainContent.css';

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            eventList: this.data,
            selectedDate: '',
        };
    }

    activateWindow = () => {
        this.props.setModalStateFunction(true);
    }

    closeWindow = (test) => {
        this.setState({ active: test });
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    sortEventsBySelectedDate = (date) => {
        let newArrayWithEvents = [],
            selectedDate = date.toLocaleString().replace(/,.*$/, '');
        this.props.eventList.forEach(event => {
            let dataParse = moment(event.time).format('M/DD/YYYY');
            if (event.time && dataParse == selectedDate) {
                newArrayWithEvents.push(event);
            }
        });

        this.setState({
            eventList: newArrayWithEvents,
        });
    }

    render() {
        return (
            <div className='main-content'>
                <Navbar />
                <div className="container">
                    <div className={mainStyles.mainContent}>
                        <div className="calendar-container">
                            <Calendar onClickDay={(value) => { this.sortEventsBySelectedDate(value); }} />
                            <button className={mainStyles.addNewEventCreateButton + ' shadow'} onClick={this.activateWindow}>Create</button>
                        </div>
                        <EventList handleSearch={this.handleSearch} chosenEventOnCaledar={this.state.eventList} />
                    </div>
                </div>
                <AddNewEvent />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setModalStateFunction: state => {
        dispatch(modalAction(state));
    },
});

const mapStateToProps = (state) => ({
    modalState: state.modalView.modalState,
    eventList: state.eventList.events,
    isToken: state.isToken,
});

MainContent.propTypes = {
    setModalStateFunction: PropTypes.func,
    eventList: PropTypes.object,
    isToken: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
