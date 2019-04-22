import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

import Users from './components/Users/';
import Rooms from './components/Rooms/';
import { modalAction } from '../../../../actions/modalActions';
// import { refresh } from '../../../../actions/profileAction';
import { addDataToDb } from '../../../../actions/eventsActions';
import { error, required, approveSending, secondDateValidation } from '../../../../utils/validation';
// Need to split by components
import './AddNewEvent.css';

class AddNewEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: undefined,
            minDate: undefined,
            maxDate: undefined,
            name: undefined,
            room: undefined,
            users: undefined,
            isOpen: false,
            date: [new Date(), new Date()],
        };
    }

    addEvent = (message, minDate, maxDate, name, room, users) => {

        const date = moment(minDate).format('YYYY-MM-DD');
        const currentDate = moment().format('YYYY-MM-DD');
        const minISOdate = moment(minDate, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ssZ');
        const maxtISOdate = moment(maxDate, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ssZ');

        let isAsyncLoadEvent = this.props.eventList.events[date] || currentDate === date;
        let event = {
            date: {
                from: minISOdate,
                to: maxtISOdate,
            },
            room: room,
            name: name,
            users: users,
            message: message,
        };

        this.props.addEvent(event, isAsyncLoadEvent);

    }

    setUsers = (userList) => {
        if (userList.length !== 0) {
            this.makeInputHandler('users', userList);
        }
    }

    makeInputHandler = (propName, value) => {
        this.setState({
            [propName]: value,
        });
    }

    setFields = () => {
        if (this.props.data) {
            let eventData = this.props.data;
            this.makeInputHandler('name', eventData.name);
            this.makeInputHandler('message', eventData.message);
            this.makeInputHandler('minDate', eventData.minDate);
            this.makeInputHandler('maxDate', eventData.maxDate);
            this.makeInputHandler('room', eventData.room);
            this.makeInputHandler('user', eventData.user);
        }
    }

    componentDidMount() {
        if (this.props.eventList.currentEvent) {
            this.makeInputHandler('name', this.props.eventList.currentEvent.name);
        }
    }

    handleChange() {
        // this.setState({startDate: date});
        this.toggleCalendar();
    }

    toggleCalendar(e) {
        e && e.preventDefault();
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {

        let isApprovedSending = approveSending(this.state);
        const handleRequest = e => {
            e.preventDefault();
            this.addEvent(
                this.state.message,
                this.state.minDate,
                this.state.maxDate,
                this.state.name,
                this.state.room,
                this.state.users,
            );
            this.props.setModalStateFunction(false);
            const socket = openSocket('http://192.168.11.65:3001');
            socket.emit('sendUsers', {
                users: this.state.users,
                date: this.state.minDate,
                name: this.state.name,
            });
        };
        let dateValidation = secondDateValidation(this.state.minDate, this.state.maxDate, this.makeInputHandler);

        return (
            <div className={'addNewEvent ' + (this.props.active ? ' active' : ' disabled')}>
                <form className="addNewEvent-form">
                    <div className="addNewEvent-form-container">
                        <label className="addNEwEvent-Label">
                            <input type="text"
                                id="Name"
                                placeholder="Name"
                                className="default-input"
                                onChange={e => { this.makeInputHandler('name', e.target.value); }} />
                        </label>
                        <label className="addNEwEvent-Label">
                            <Users setUsers={this.setUsers} />
                        </label>
                        <label className="addNEwEvent-Label">
                            <textarea className="default-input" placeholder="Notes:" onChange={e => { this.makeInputHandler('message', e.target.value); }}></textarea>
                        </label>

                        <div>
                            <DateTimeRangePicker
                                className={'default-input datetimerange-picker'}
                                onChange={date => this.makeInputHandler('date', date)}
                                value={this.state.date}
                            />
                        </div>
                        <div className="addNEwEvent-button-container">
                            <button disabled={!isApprovedSending} className={'button ' + !isApprovedSending ? 'disable-button' : 'addNewEvent-create-button'} onClick={(e) => { handleRequest(e); }}>CREATE</button>
                            <button className="button addNewEvent-cancel-button" onClick={this.modalClose}>Cancel</button>
                        </div>
                    </div>
                </form>

            </div>
        );
    }

    /*-----------CUSTOM METHODS-----------*/

    modalClose = (e) => {
        e.preventDefault();
        this.props.setModalStateFunction(false);
    }

    /*-----------END CUSTOM METHODS-----------*/

}

AddNewEvent.propTypes = {
    setModalStateFunction: PropTypes.func,
    active: PropTypes.bool,
    addEvent: PropTypes.func,
    eventList: PropTypes.object,
    data: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
    setModalStateFunction: state => {
        dispatch(modalAction(state));
    },
    // update: state => {
    //     dispatch(refresh(state));
    // },
    addEvent: (event, isAsyncLoadEvent) => {
        dispatch(addDataToDb(event, isAsyncLoadEvent));
    },
});

const mapStateToProps = (state) => ({
    active: state.modalView.modalState,
    refresh: state.refresh,
    eventList: state.eventList,
    data: PropTypes.object,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewEvent);
