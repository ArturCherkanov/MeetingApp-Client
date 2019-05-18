import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

class User extends Component {

    render() {

        return (
            <option>
                {this.props.name+'/'+ this.props.email}
            </option>
        );
    }
}

User.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
};

export default User;
