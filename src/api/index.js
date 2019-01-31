import axios from 'axios';

import { API_PATH, EVENTS_PATH, USERS_PATH } from './paths'

// Users

export const addUserToDB = (username, password) => (
    axios.post(API_PATH + USERS_PATH, {
        username: username,
        password: password
    })
)

export const findUserInDB = (username, password) => (
    axios.get(API_PATH + USERS_PATH, {
        params: {
            username: username,
            password: password
        }
    })
)

// Events

export const putEvent = (message, time) => (
    axios.post(API_PATH + EVENTS_PATH, {
        message: message,
        time: time
    })
)

export const getEvents = () => (
    axios.get(API_PATH + EVENTS_PATH)
)


