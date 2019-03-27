import React, { Component } from 'react';
import moment from 'moment';

import { getUserList } from '../../../../../../api';
import UserList from './components/UserList';
import ChoisenUsers from './components/СhosenUsers';
import UsersStyle from './Users.css';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectedUsers: [],
        };
    }
    getUsers = () => {
        getUserList()
            .then(res => { this.setState({ users: res.data }); });
    }

    setSelectedUserList = event => {
        let user = event.target.value;
        let users = [...this.state.selectedUsers];

        if (this.state.selectedUsers.indexOf(user) === -1 && user !== '') {
            this.setState({ selectedUsers: [...users, user] });
            console.log(this.state.selectedUsers);
            this.props.setUsers([...users, user]);
        }

        return false;
    }

    componentDidMount() {
        this.getUsers();
    }
    coco = () => {
        console.log(1)
    }
    render() {
        return (
            <div className={UsersStyle.userContainer}>

                <ChoisenUsers users={this.state.selectedUsers} />

                <UserList userList={this.state.users} setSelectedUserList={this.setSelectedUserList}
                />
            </div>
        );
    }
}



export default Users;
