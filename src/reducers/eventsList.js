export default function eventList(state = "null", action) {
    switch (action.type) {
        case "ADD_EVENTITEM":
            return { state: action.payload };
        case "SET_EVENTLIST":
            return { state: action.payload }
        default:
            return state;
    }
}