import validator from 'validator';
import React from 'react';

export const required = (value) => {
    if (!value.toString().trim().length) {
        // We can return string or jsx as the 'error' prop for the validated Component
        return <div className="error-message">require</div>;
    }
};

export const email = (value) => {
    if (!validator.isEmail(value)) {
        return <div className="error-message">{value} is not a valid email.</div>
    }
};