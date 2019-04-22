import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Select from 'react-validation/build/select';
import Textarea from 'react-validation/build/textarea';

import Users from './components/Users/';
import Rooms from './components/Rooms/';
import { modalAction } from '../../actions/modalActions';
import { refresh } from '../../actions/profileActions';
import { addDataToDb } from '../../actions/eventsActions';
import { error, required, approveSending, secondDateValidation } from '../../utils/validation';
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

    setSelectedUserList = event => {
        let user = event.target.value;
        let users = [...this.state.selectedUsers];

        if (this.state.selectedUsers.indexOf(user) === -1 && user !== '') {
            this.setState({ selectedUsers: [...users, user] });
            this.setUsers([...users, user]);
        }

        return false;
    }

    makeInputHandler = (propName, value) => {
        this.setState({
            [propName]: value,
        });
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
                            <span>Name:</span>
                            <Users setSelectedUserList={this.setSelectedUserList} />
                        </label>
                        <label className="addNEwEvent-Label">
                            <span>From:</span>
                            <input type="datetime-local"
                                step="1"
                                className="default-input"
                                onChange={e => {
                                    this.makeInputHandler('minDate', e.target.value);
                                }}

                            />
                            <span>To:</span>
                            <input type="datetime-local"
                                step="1"
                                min={this.state.minDate}
                                className="default-input"
                                value={this.state.maxDate}
                                onChange={e => {
                                    this.makeInputHandler('maxDate', e.target.value);
                                    // secondDateValidation(this.state.minDate, this.state.maxDate, this.makeInputHandler);

                                }} />
                        </label>
                        <label className="addNEwEvent-Label">
                            <span>Notes:</span>
                            <textarea className="default-input" onChange={e => { this.makeInputHandler('message', e.target.value); }}></textarea>
                        </label>
                        {
                            this.state.maxDate &&
                            <label className="addNEwEvent-Label">
                                <span>Room</span>
                                <Rooms validationDates={{ userFrom: this.state.minDate,
                                    userTo: this.state.maxDate }} room={this.state.room} setRoom={this.makeInputHandler} />
                            </label>
                        }

                        <div className="addNEwEvent-button-container">
                            <button disabled={!isApprovedSending} className={'button '+!isApprovedSending ? 'disable-button' : 'addNewEvent-create-button'} onClick={(e) => { handleRequest(e); }}>CREATE</button>
                            <button className="addNewEvent-cancel-button" onClick={this.modalClose}>Cancel</button>
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
};

const mapDispatchToProps = (dispatch) => ({
    setModalStateFunction: state => {
        dispatch(modalAction(state));
    },
    update: state => {
        dispatch(refresh(state));
    },
    addEvent: (event, isAsyncLoadEvent) => {
        dispatch(addDataToDb(event, isAsyncLoadEvent));
    },
});

const mapStateToProps = (state) => ({
    active: state.modalView.modalState,
    refresh: state.refresh,
    eventList: state.eventList,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewEvent);
