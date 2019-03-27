const initialState = {
    rooms: [],
    isLoading: false,
};

export default function dataValidation(state = initialState, action) {
    switch (action.type) {
    case 'ROOM_VALIDATED': {
        // const key = action.payload.date;
        // const updatedEvents = [...state.events[key], action.payload.event];
        return {
            ...state,
            events: {
                // ...state.events,
                // [key]: updatedEvents,
            },
        };
    }
    default:
        return state;
    }
}
