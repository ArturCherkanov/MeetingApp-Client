import { post, get } from './utils';

import {
    IP_PATH,
    API_PATH,
    EVENTS_PATH,
    USER_PATH,
    USER_LIST,
    UPDATE,
    ROOM_PATH,
    VALIDATE_PATH,
    AUTH_PATH,
    VK_PATH,
    IMAGE_PATH,
    VK_FETCH_ACCESS_TOKEN,
} from './paths';

// Users

export const addUserToDB = (userData) => (
    post(API_PATH + AUTH_PATH, false, userData)
);

export const vkAuth = (data) => (
    post(API_PATH + AUTH_PATH + VK_PATH, false, {
        code: data,
    })
);

export const findUserInDB = (username, password) => (
    get(API_PATH + AUTH_PATH, false, {
        params: {
            username: username,
            password: password,
        },
    })
);

// Events

export const putEvent = (event, isAsyncLoadEvents) => (
    post(API_PATH + EVENTS_PATH, true, {
        eventData: event,
        isAsyncLoadEvents: isAsyncLoadEvents,
    })
);

export const getEvents = (date) => (
    get(API_PATH + EVENTS_PATH, false, {
        params: {
            date: date,
        },
    })
);

export const getUser = () => (
    get(API_PATH + USER_PATH, true, null)
);

export const updateUser = (data) => (
    get(API_PATH + USER_PATH +UPDATE, true,{params: { data: data}})
);

export const getUserList = () => (
    get(API_PATH + USER_PATH + USER_LIST, true, null)
);

export const getRoomList = (dates) => (
    get(API_PATH + ROOM_PATH, true, { ...dates })
);


export const getFreeRooms = (dates) => (
    get(API_PATH + EVENTS_PATH + VALIDATE_PATH, true, { params: { ...dates } })
);


export const getVkAccessToken = (code) => {
    // CLIENT_ID ='6995323',
    // SCOPE = 'friend',
    // DISPLAY = 'page',
    // REDIRECT_URI = 'http://localhost/vk/',
    // RESPONSE_TYPE = 'code',
    // VERSIOJN = '5.95';    
    const params = {
        client_id: '6995323',
        client_secret: 'HotEz0wXby8a0sEqY8Yl',
        redirect_uri: 'http://localhost/vk/',
        code: code,
    }
    return (
        get('https://oauth.vk.com/access_token?client_id=6995323&client_secret=HotEz0wXby8a0sEqY8Yl&redirect_uri=http://localhost/vk&code='+code, false, null)
    );
};

export const imageUpload = (image) => {
    const formData = new FormData();
    formData.append('file', image);
    return post(API_PATH + IMAGE_PATH, false, formData,
    );
};

export const imageUpdate = (image) => {
    const formData = new FormData();
    formData.append('file', image);
    return post(API_PATH + IMAGE_PATH + UPDATE, true, formData,
    );
};