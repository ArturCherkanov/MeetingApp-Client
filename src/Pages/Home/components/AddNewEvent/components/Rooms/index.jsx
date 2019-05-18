import React, { Component } from 'react';
import moment from 'moment';

import { getFreeRooms } from '../../../../../../api';
import RoomList from './components/RoomList/';

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
        };
    }
    getRooms = () => {
        getFreeRooms(this.props.validationDates)
            .then(res => { this.setState({ rooms: res.data }); });
    }

    componentDidMount() {
        this.getRooms();
    }
    render() {
        return (
            <>
                <RoomList room={this.props.room} setRoom={this.props.setRoom} rooms={this.state.rooms}/>
            </>
        );
    }
}



export default Rooms;
