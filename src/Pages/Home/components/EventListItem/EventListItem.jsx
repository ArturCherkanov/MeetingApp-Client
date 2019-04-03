import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mainStyles from './EventListItem.css';

class EventListItem extends Component {
    render() {
        return (
            <li className={mainStyles.eventItem} data-value={this.props.event}>
                <span>Start at:{this.props.event.timeFrom + ' / ' + this.props.event.name}</span>
                <FontAwesomeIcon icon="edit"  onClick={()=>{console.log(this.props.event)}}/>
            </li>
        );
    }
}

EventListItem.propTypes = {
    timeFrom: PropTypes.string,
    message: PropTypes.string,
    event: PropTypes.object,
};

export default EventListItem;
