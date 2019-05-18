import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

class Room extends Component {
    render() {
        return (
            <option>
                {this.props.name}
            </option>
        );
    }
}

Room.propTypes = {
    name: PropTypes.string,
};

export default Room;
