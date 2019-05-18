import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Room from './components/Room/';
// import { timingSafeEqual } from 'crypto';

class RoomList extends Component {

    render() {
        return (
            <>
                <select className="default-input" value={this.props.room} onChange={e => { this.props.setRoom('room', e.target.value); }}>
                    <option></option>
                    {this.props.rooms.length !== 0 && this.props.rooms.map((room, i) => (
                        <Room key={i} name={room} />
                    ))}
                </select>
            </>
        );
    }
}

RoomList.propTypes = {
    rooms: PropTypes.array,
    // setSelectedUserList: PropTypes.func,
};

export default RoomList;
