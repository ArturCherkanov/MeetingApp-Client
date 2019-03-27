import React, { Component } from 'react';
import moment from 'moment';

import UserStyle from './User.css';
class User extends Component {
    render() {
        return (
            <div className={UserStyle.userItem}>
                {this.props.value}
            </div>
        );
    }
}



export default User;
