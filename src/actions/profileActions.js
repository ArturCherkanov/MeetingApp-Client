import { getUser } from '../api';

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



