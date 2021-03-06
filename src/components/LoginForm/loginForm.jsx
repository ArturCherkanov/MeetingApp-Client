import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { required, email } from '../../utils/validation'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import './LoginForm.css'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        return (
            <Form className="registrate-form" onSubmit={e => this.props.submitFunction(e, this.state.username, this.state.password)}>
                <label htmlFor="email">Name</label>
                <Input id="email" className="default-input" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} validations={[required, email]} name="username" />
                <label htmlFor="password">Password</label>
                <Input id="password" name='password' type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} className="default-input" validations={[required]} />
                <Button className="registrate-button">{this.props.buttonName}</Button>
            </Form>
        );
    }
}

export default connect()(LoginForm);