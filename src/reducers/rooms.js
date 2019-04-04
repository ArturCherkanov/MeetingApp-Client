const initialState = {
    rooms: false,
};

export default function roomList(state = initialState, action) {
    switch (action.type) {
    case 'SET_ROOM_LIST':
        return { rooms: action.payload };
    default:
        return state;
    }
}
