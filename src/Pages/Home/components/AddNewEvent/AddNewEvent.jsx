import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment, { calendarFormat } from 'moment';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import DateTimePicker from 'react-datetime-picker';

import Users from './components/Users/';
import Rooms from './components/Rooms/';
import { modalAction } from '../../../../actions/modalActions';
import { addDataToDb } from '../../../../actions/eventsActions';
import { error, required, approveSending } from '../../../../utils/validation';
import { IP_PATH } from '../../../../api/paths';
import { getFreeRooms } from '../../../../api/';

// Need to split by components
import './AddNewEvent.css';

class AddNewEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: undefined,
            minDate: new Date(),
            maxDate: moment(new Date()).add(15, 'minutes')._d,
            name: undefined,
            room: undefined,
            users: undefined,
            roomList: '',
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
            roomList: '',
            room: room,
            name: name,
            users: users,
            message: message,
        };

        this.props.addEvent(event, isAsyncLoadEvent);

    }

    // cleanForm = (formData) => {
    //     formData.map((i, e) => {
    //         !(minDate || maxDate)?
    //         this.makeInputHandler(e, ''):
    //     })
    // }
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
            this.props.setModalState(false);
            const socket = openSocket(IP_PATH);
            socket.emit('sendUsers', {
                users: this.state.users,
                date: this.state.minDate,
                name: this.state.name,
            });
        };
        console.log(this.state.maxDate);
        console.log(new Date());

        return (
            <div className={'addNewEvent active'}>
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

                        <div className='date-picker-container'>
                            <DateTimePicker
                                onChange={(date) => { this.makeInputHandler('minDate', date); console.log(this); }}
                                value={this.state.minDate}
                                minDate={this.state.minDate}
                            />
                            <DateTimePicker
                                onChange={(date) => { this.makeInputHandler('maxDate', date); }}
                                value={this.state.maxDate}
                                minDate={this.state.maxDate}
                            />
                        </div>
                        <button className={'default-button check-event-button'} onClick={(e) => {
                            e.preventDefault()
                            getFreeRooms({
                                userFrom: this.state.minDate,
                                userTo: this.state.maxDate,
                            })
                                .then(res => { this.setState({ roomList: res.data }); console.log(res.data) });
                        }}>Check Rooms</button>
                        {
                            // this.state.maxDate && this.state.minDate &&
                            <label className="addNEwEvent-Label">
                                <Rooms roomList={this.state.roomList} room={this.state.room} setRoom={this.makeInputHandler} />
                            </label>
                        }
                        <div className="addNEwEvent-button-container">
                            <button disabled={!isApprovedSending} className={'button ' + !isApprovedSending ? 'button disable-button' : 'button addNewEvent-create-button'} onClick={(e) => { handleRequest(e); }}>CREATE</button>
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
        this.props.setModalState(false);
    }

    /*-----------END CUSTOM METHODS-----------*/

}

AddNewEvent.propTypes = {
    setModalState: PropTypes.func,
    active: PropTypes.bool,
    addEvent: PropTypes.func,
    eventList: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
    setModalState: state => {
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
