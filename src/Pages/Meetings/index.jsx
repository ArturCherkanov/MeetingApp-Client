import React, { Component } from 'react';
import { connect } from 'react-redux';

import CurrentDate from './components/Date';
import Room from './components/Room';
import { getRooms } from '../../actions/getRoomListAction';
import Navbar from '../../components/Navbar';
import { isToken } from '../../actions/isTokenAction';
import { getEventsFromDb } from '../../actions/currentEventListAction';
import './index.css';
import moment from 'moment';
class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment().format('YYYY-MM-DD')
        }
    }

    setTime = (time) => {
        this.setState({
            time: time
        })
    };

    setEventsForRoom = (room) => {
        let eventList = this.props.eventList;
        let selectedDate = this.state.time;
        if (eventList[selectedDate]) {
            let events = eventList[selectedDate].map(element => room.name === element.room && element).filter(e => e);
            return events;
        }
        this.props.getEvents(this.state.time);
        // if (eventList[selectedDate]) {
        //     let events = eventList[selectedDate].map(element => room.name === element.room && element).filter(e => e);
        //     return events;
        // }
    };

    UNSAFE_componentWillMount() {
        this.props.getRoomList();
        this.props.checkToken();

    }
    render() {
        return (
            <>
                <Navbar />
                <div className="roomList">
                    <CurrentDate setTime={this.setTime} time={this.state.time} />
                    <div className="rommList-container">
                        <div className="roomListHead">
                            <div className="roomHead">rooms</div>
                            <div className="timeLine">{Array(24).fill(null).map((e, i) => (<div key={i} className="hour">{i}</div>))}</div>

                        </div>
                        {this.props.roomList.rooms && this.props.roomList.rooms.map((room, i) => {
                            let eventsForRoom = this.setEventsForRoom(room);
                            return <Room key={i} name={room.name} events={eventsForRoom} time={this.state.time} />
                        }
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    roomList: state.roomList,
    isToken: state.isToken,
    eventList: state.eventList.events,
});

const mapDispatchToProps = (dispatch) => ({
    checkToken: () => {
        dispatch(isToken());
    },
    getRoomList: () => {
        dispatch(getRooms());
    },
    getEvents: (state) => {
        dispatch(getEventsFromDb(state))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
