import { getToken } from '../api';

export const isToken = () => dispatch => {
    getToken()
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



