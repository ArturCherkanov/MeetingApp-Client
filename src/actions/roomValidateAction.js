import { getFreeRooms } from '../api/';

export const getFreeRoomList = () => dispatch => {
    getFreeRooms()
        .then(res => {
            dispatch({
                type: 'GET_FREE_ROOMS',
                payload: res.data,
            });
        });

};
