import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { required, email, password } from '../../../../utils/validation';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import './RegistrationForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            confirm: '',

        };
    }
    render() {
        return (
            <Form className="registrate-form" onSubmit={e =>
                this.props.submitFunction(e, {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    username: this.state.username,
                    password: this.state.password,
                })}>
                <label htmlFor="email">First Name</label>
                <Input id="email" className="default-input" value={this.state.firstname} onChange={e => this.setState({ firstname: e.target.value })} validations={[required]} name="firstname" />
                <label htmlFor="email">Last Name</label>
                <Input id="email" className="default-input" value={this.state.lastname} onChange={e => this.setState({ lastname: e.target.value })} validations={[required]} name="lastname" />
                <label htmlFor="email">Email</label>
                <Input id="email" className="default-input" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} validations={[required, email]} name="username" />

                <label htmlFor="password">Password</label>
                <Input id="password" name='password' type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} validations={[password]} className="default-input" />
                <label htmlFor="password">Confirm Password</label>
                <Input id="password" name='confirm' type="password" value={this.state.confirm} onChange={e => this.setState({ confirm: e.target.value })} validations={[required]} className="default-input" />

                <Button className="registrate-button">{this.props.buttonName}</Button>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    submitFunction: PropTypes.func,
    buttonName: PropTypes.string,
};

export default connect()(LoginForm);
