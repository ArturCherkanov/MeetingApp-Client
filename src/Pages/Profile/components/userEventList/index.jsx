import React, { Component } from 'react';
import mainStyles from './userEventList.css';

export default class EventList extends Component {
    render() {
        return (
            <div className={mainStyles.eventListContainer}>No events yet</div>
        )
    }
}