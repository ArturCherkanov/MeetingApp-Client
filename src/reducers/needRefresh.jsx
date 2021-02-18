export default function eventList(state=false, action) {
    switch (action.type) {
    case 'NEED_REFRESH':
        return action.payload;
    default:
        return state;
    }
}
