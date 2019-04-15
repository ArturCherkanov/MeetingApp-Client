import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserList } from '../../../../../../api';
import UserList from './components/UserList';
import ChoisenUsers from './components/СhosenUsers';
import UsersStyle from './Users.css';
import {profile} from '../../../../../../actions/profileActions';


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

    setSelectedUserList = value => {
        let user = value;
        let users = [...this.state.selectedUsers];

        if (this.state.selectedUsers.indexOf(user) === -1 && user !== '') {
            this.setState({ selectedUsers: [...users, user] });
            this.props.setUsers([...users, user]);
        }

        return false;
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div className={UsersStyle.userContainer}>

                <ChoisenUsers users={this.state.selectedUsers} />

                <UserList userList={this.state.users} setSelectedUserList={(e) => this.setSelectedUserList(e.target.value)}
                />
                <button className="add-me-button" onClick={e => { e.preventDefault(); this.setSelectedUserList(this.props.profile.email); }}>Add Me</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state) => ({
    profile: state.profile,

});

Users.propTypes = {
    profile: PropTypes.object,
    setUsers: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
