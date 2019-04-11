import axios from 'axios';

export const axiosInstance = (needAuth = false) => {
    const authToken = needAuth ? localStorage.getItem('token') : null;

    return axios.create({
        timeout: 15000,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
};

export const get = (path, needAuth = false, params = null) => {
    const instance = axiosInstance(needAuth);

    // return new Promise((resolve, reject) => {
    return instance.get(path, params);
    // .then((response) => {
    //     resolve(response);
    // })
    // .catch((error) => {
    //     reject(error);
    // });
    // });
};

export const post = (path, needAuth = false, data) => {
    const instance = axiosInstance(needAuth);

    return new Promise((resolve, reject) => {
        instance.post(path, data)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
