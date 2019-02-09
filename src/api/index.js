import axios from 'axios';
import { post, get } from './utils';

import { API_PATH, EVENTS_PATH, USERS_PATH } from './paths';

// Users

export const addUserToDB = (username, password) => (
    post(API_PATH + USERS_PATH, false, {
        username: username,
        password: password,
    })
);

export const findUserInDB = (username, password) => (
    get(API_PATH + USERS_PATH, false, {
        params: {
            username: username,
            password: password,
        },
    })
);

// Events

export const putEvent = (message, time) => (
    post(API_PATH + EVENTS_PATH, true, {
        message: message,
        time: time,
    })
);

export const getEvents = () => (
    get(API_PATH + EVENTS_PATH, false, null)
);

export const getToken = () => {

}
