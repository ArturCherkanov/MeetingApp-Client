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

