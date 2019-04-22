import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import User from './components/User/';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <select className="default-input" placeholder="User" value={this.state.currentuser} onChange={(e) => { this.props.setSelectedUserList(e); }}>
                    <option value="">Users</option>
                    {this.props.userList.length !== 0 && this.props.userList.map((user, i) => (
                        <User key={i} name={user.name} email={user.email} />
                    ))}
                </select>
            </>
        );
    }
}

UserList.propTypes = {
    userList: PropTypes.array,
    // setSelectedUserList: PropTypes.func,
};

export default UserList;
