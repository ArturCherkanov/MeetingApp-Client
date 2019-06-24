import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddNewEvent from '../AddNewEvent/AddNewEvent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mainStyles from './EventListItem.css';

class EventListItem extends Component {
    render() {
        return (
            <li className={mainStyles.eventItem} data-value={this.props.event}>
                <span>Start at:{this.props.event.timeFrom + ' / ' + this.props.event.name}</span>
            </li>
        );
    }
}

EventListItem.propTypes = {
    timeFrom: PropTypes.string,
    // message: PropTypes.string,
    event: PropTypes.object,
    setModalState: PropTypes.func,
    setEditableEvent: PropTypes.func,
};

export default EventListItem;
