import { getFreeRooms } from '../api';
import { getRoomList } from '../api';

export const getRooms = () => dispatch => {
    getRoomList()
        .then(res => {
            dispatch({
                type: 'SET_ROOM_LIST',
                payload: res.data,
            });
        });
}

export const getFreeRoomList = () => dispatch => {
    getFreeRooms()
        .then(res => {
            dispatch({
                type: 'GET_FREE_ROOMS',
                payload: res.data,
            });
        });

};
