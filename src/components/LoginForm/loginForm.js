import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
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
            <Form className="registrate-form" onSubmit={e=>this.props.submitFunction(e, this.state.username, this.state.password)}>
                <label htmlFor="email">Name</label>
                <Input id="email" className="default-input" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} validations={[required, email]} name="username" />
                <label htmlFor="password">Password</label>
                <Input id="password" name='password' type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} className="default-input" validations={[required]} />
                <Button className="registrate-button">{this.props.buttonName}</Button>
            </Form>
        );
    }
}

/*-----------VALIDATION-----------*/

const required = (value) => {
    if (!value.toString().trim().length) {
        // We can return string or jsx as the 'error' prop for the validated Component
        return <div className="error-message">require</div>;
    }
};

const email = (value) => {
    if (!validator.isEmail(value)) {
        return <div className="error-message">{value} is not a valid email.</div>
    }
};

/*-----------END VALIDATION-----------*/

export default connect()(LoginForm);