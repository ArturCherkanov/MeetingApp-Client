export default function (state = false, action) {
    switch (action.type) {
    case 'RIGHT_TOKEN':
        return action.payload;
    case 'WRONG_TOKEN':
        return false;
    default:
        return state;
    }
}
