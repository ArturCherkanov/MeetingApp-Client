const initialState = {
    active: false,
    msg: null,
}

export default function notification(state = initialState, action) {
    switch (action.type) {
    case 'SET_NOTIFICATION_STATE':
        return action.payload
    default:
        return state;
    }
}
