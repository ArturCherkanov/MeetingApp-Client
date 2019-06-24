import validator from 'validator';
import React from 'react';
import moment from 'moment';

export const password = (value, props, components) => {
    if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
        return <div className="error-message">Passwords are not equal.</div>;
    }
};
export const required = (value) => {
    if (!value.toString().trim().length) {
        // We can return string or jsx as the 'error' prop for the validated Component
        return <div className="error-message">Required field</div>;
    }
};

export const email = (value) => {
    if (!validator.isEmail(value)) {
        return <div className="error-message">{value} is not a valid email.</div>;
    }
};

export const secondDateValidation = (previosDate, value, handleRequest) => {
    if (value && previosDate === value) {
        let date = moment(value).add(1, 'm').format('YYYY-MM-DDTHH:MM');
        handleRequest('maxDate', date);
    }

    else if (moment(value).isBefore(previosDate)) {
        handleRequest('maxDate', '');
        handleRequest('room', '');
    }

};
export const approveSending = (formValues) => {
    for (let key in formValues) {
        if (!formValues[key]) {
            return false;
        }
    }
    return true;
};

export const error = (val) => {
    if (!val) return true;
};
