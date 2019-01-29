import axios from 'axios';

import Paths from './paths'


export const addUserToDB = (username, password) => {
    axios.post('/api/create', {
        username: username,
        password: password
    });
}

export const putEvent = (message, time) => (
 axios.post('/api/events/putData', {
        message: message,
        time: time
    })
)

export const getEvents = () =>
    axios.get("/api/events/get");

export const findUserInDB = (username, password) => {
    axios.get('/api/login', {
        params: {
            username: username,
            password: password
        }
    })
}

