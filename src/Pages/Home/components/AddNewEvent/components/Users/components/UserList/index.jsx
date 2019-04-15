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
    // consol1e = (event) => {
    // let user = event.target.value;
    // let users = [...this.state.userList];

    // if (this.state.userList.indexOf(user)===-1) {
    //     this.setState({ userList: [...users, user] });
    // }
    // return false;
    // }
    render() {
        return (
            <>
                <select className="default-input" value={this.state.currentuser} onChange={(e) => { this.props.setSelectedUserList(e); }}>
                    <option></option>
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
    setSelectedUserList: PropTypes.func,
};

export default UserList;
