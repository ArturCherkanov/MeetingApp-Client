import { getUser, updateUser, imageUpdate } from '../api';

export const profile = () => dispatch => {
    getUser()
        .then(res => {
            dispatch({
                type: 'RIGHT_TOKEN',
                payload: res.data,
            });
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
            dispatch({
                type: 'WRONG_TOKEN',
                payload: { token: false },
            });
        });
};

export const updateProfile = (params) => dispatch => {
    updateUser(params)
        .then((res) => {
            dispatch({
                type: 'PROFILE_UPDATE',
                payload: res.data

            })
        })
}

export const updateImage = (params) => dispatch => {
    imageUpdate(params)
        .then((res) => {
            dispatch({
                type: 'IMAGE_UPDATE',
                payload: res.data

            })
        })
}


