import React, { Component } from 'react';
import moment from 'moment';

import User from './components/User';
import ChosenUser from'./ChosenUser.css';

class ChosenUsers extends Component {
    render() {
        return (
            <div className={ChosenUser.ChosenUserList}>
                {this.props.users? this.props.users.map((user,i) => <User key={i} value={user}/>):console.log(this.props)}
            </div>
        );
    }
}



export default ChosenUsers;
