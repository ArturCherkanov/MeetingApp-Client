import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { required, email } from '../../../../utils/validation';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import loginFormStyles from './LoginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    render() {
        return (
            <>
                <Form className="register-form" onSubmit={e => this.props.login(e, this.state.username, this.state.password)}>
                    <Input id="email" className="default-input" value={this.state.username} placeholder="Email:" onChange={e => this.setState({ username: e.target.value })} validations={[required, email]} name="username" />
                    <Input id="password" name='password' type="password" value={this.state.password} placeholder="Password:" onChange={e => this.setState({ password: e.target.value })} className="default-input" validations={[required]} />
                    <Button className="button register-button">{this.props.buttonName}</Button>
                </Form>
                <a className={'button ' + loginFormStyles.vkButton} href="https://oauth.vk.com/authorize?client_id=6995323&display=page&redirect_uri=http://localhost/vk&scope=friends&response_type=code&v=5.95">VK</a>
            </>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func,
    buttonName: PropTypes.string,
};

export default connect()(LoginForm);
