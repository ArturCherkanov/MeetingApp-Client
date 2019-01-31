import React, { Component } from 'react';

import mainStyles from './EventListItem.css'

class EventListItem extends Component {
    render() {
        return (
            <li className={mainStyles.eventItem} data-value={this.props.event}>
                <span>{this.props.event.time + " / " + this.props.event.message}</span>
            </li>
        )
    }
}

export default EventListItem;
