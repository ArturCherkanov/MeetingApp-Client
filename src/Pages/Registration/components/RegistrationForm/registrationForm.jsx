import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { required, email, password } from '../../../../utils/validation';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import ImageUploader from 'react-images-upload';
import { imageUpload } from '../../../../api/';
import './RegistrationForm.css';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            confirm: '',
            imgData: null,
            pictures: [],
        };
    }

    onDrop = (picture) => {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        },
        () => {
            imageUpload(this.state.pictures[this.state.pictures.length - 1]).then((req) => {
                this.setState({imgData: req});
            });
        });
    }


    render() {
        return (
            <Form className="register-form" onSubmit={e =>
                this.props.submitFunction(e, {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    username: this.state.username,
                    password: this.state.password,
                    imgData: this.state.imgData,
                })}>
                <Input id="name" className="default-input" placeholder="First Name" value={this.state.firstname} onChange={e => this.setState({ firstname: e.target.value })} validations={[required]} name="firstname" />
                <Input id="email" className="default-input" placeholder="Last Name" value={this.state.lastname} onChange={e => this.setState({ lastname: e.target.value })} validations={[required]} name="lastname" />
                <Input id="email" className="default-input" placeholder="Email" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} validations={[required, email]} name="username" />
                <Input id="password" name='password' placeholder="Password" type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} validations={[password]} className="default-input" />
                <Input id="password" name='confirm' placeholder="Confirm Password" type="password" value={this.state.confirm} onChange={e => this.setState({ confirm: e.target.value })} validations={[required]} className="default-input" />
                <ImageUploader className={'image-uploader'} withPreview={true} withIcon={true} singleImage={true} buttonText='Choose images' onChange={this.onDrop} imgExtension={['.jpg', '.gif', '.png', '.gif']} maxFileSize={5242880} />

                <Button className="button register-button">{this.props.buttonName}</Button>
            </Form>
        );
    }
}

RegistrationForm.propTypes = {
    submitFunction: PropTypes.func,
    buttonName: PropTypes.string,
};

export default connect()(RegistrationForm);
