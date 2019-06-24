import React, { Component } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';

import Navbar from '../../../../components/Navbar/';
import AddNewEvent from '../../components/AddNewEvent/AddNewEvent';
import EventList from '../EventList/EventList';
import Notification from '../../../../components/NotificationAlert';

import { modalAction } from '../../../../actions/modalActions';
import { profile } from '../../../../actions/profileActions';
import { getEventsFromDb } from '../../actions/currentEventListAction';
import { showNotificationAction } from '../../../../actions/notificationActions';
import { getRooms } from '../../../../actions/roomsActions';
import {API_PATH} from '../../../../api/paths';

import './Calendar.css';
import mainStyles from './MainContent.css';

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            eventList: this.data,
            
        };
    }

    componentDidMount() {
        this.props.getProfile();
        let token = localStorage.getItem('token');
        if (token) {
            this.props.getRoomList();
            const socket = openSocket('http://localhost:3001');
            socket.emit('join', { token: token });
            socket.on('sendNotification', (req) => {
                this.props.notificationAction(req);
            });
        }
    }

    activateWindow = () => {
        this.props.setModalState(true);
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
        // console.log(moment().format('M/DD/YYYY'));
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
    fetchEvents = (date) => {
        let selectedDate = moment(date.toString()).format(('YYYY-MM-DD'));
        if (!this.props.eventList[selectedDate]) {
            this.props.getEventsByDate(date);
        }
    }
    render() {
        const addNewEventCreateButton = () => this.props.profile.isLoggedIn ?
            (<button className={mainStyles.addNewEventCreateButton+' button'} onClick={this.activateWindow}>Create</button>) :
            (null);
        return (
            <div className='main-content'>
                <Navbar history={this.props.history} />
                <div className="container">
                    <div className={mainStyles.mainContent}>
                        <div className="calendar-container">
                            <Calendar onClickDay={(value) => { this.setState({ selectedDate: value }); this.fetchEvents(value); }} />
                            {addNewEventCreateButton()}
                        </div>
                        <EventList handleSearch={this.handleSearch} chosenEventOnCaledar={this.state.selectedDate} />
                    </div>
                </div>
                {this.props.modalState ? (<AddNewEvent />) : (null)}
                {this.props.notification.active ? (<Notification />) : (null)}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setModalState: state => {
        dispatch(modalAction(state));
    },
    getEventsByDate: (state) => {
        dispatch(getEventsFromDb(state));
    },
    getProfile: () => {
        dispatch(profile());
    },
    getRoomList: () => {
        dispatch(getRooms());
    },

    notificationAction: (state) => {
        dispatch(showNotificationAction(state));
    },
});

const mapStateToProps = (state) => ({
    modalState: state.modalView.modalState,
    eventList: state.eventList.events,
    profile: state.profile,
    notification: state.notification,
    roomList: state.roomList,

});

MainContent.propTypes = {
    setModalState: PropTypes.func,
    eventList: PropTypes.array,
    profile: PropTypes.bool,
    getRoomList: PropTypes.func,
    getProfile: PropTypes.func,
    notificationAction: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
