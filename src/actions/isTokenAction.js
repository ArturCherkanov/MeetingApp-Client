import { getToken } from '../api/';

export const isToken = () => dispatch => {
    getToken()
        .then(res => {
            dispatch({
                type: 'RIGHT_TOKEN',
                payload: res.data.token,
            });
        });

};
