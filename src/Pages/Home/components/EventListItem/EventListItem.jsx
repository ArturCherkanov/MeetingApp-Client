import React, { Component } from 'react';
import PropTypes from 'prop-types';

import mainStyles from './EventListItem.css';

class EventListItem extends Component {
    render() {
        return (
            <li className={mainStyles.eventItem} data-value={this.props.event}>
                <span>{this.props.event.time + ' / ' + this.props.event.message}</span>
            </li>
        );
    }
}

EventListItem.propTypes = {
    time: PropTypes.string,
    message: PropTypes.string,
    event: PropTypes.object,
};

export default EventListItem;
