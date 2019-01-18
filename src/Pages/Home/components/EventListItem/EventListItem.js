import React, { Component } from 'react';
import './EventListItem.css'
class EventListItem extends Component {
    render() {
        return (
            <li className="event-item" data-value={this.props.event}>
            <span>{this.props.event.time+" / "+this.props.event.message}</span></li>
        )
    }

}
export default EventListItem;
