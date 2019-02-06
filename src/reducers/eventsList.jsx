const initialState = {
    events: [],
    isLoading: false,
};

export default function eventList(state=initialState, action) {
    switch (action.type) {
    case 'ADD_EVENTITEM_SUCCESS':
        return {
            ...state,
            events: [...state.events, action.payload],
        };
    case 'SET_EVENTLIST':
        return {
            ...state,
            events: [...state.events, action.payload],
        };
    default:
        return state;
    }
}