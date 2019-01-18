import axios from 'axios';

export const addUserToDB = (username, password) => {
    axios.post('/api/create', {
        username: username,
        password: password
    });
}

export const putEvent = (message, time) => {
    axios.post('/api/putData', {
        message: message,
        time: time
    })
}

export const getEvents = () =>
    axios.get("/api/getData");

export const findUserInDB = (username, password) => {
    axios.get('/api/login', {
        params: {
            username: username,
            password: password
        }
    })
}

