const initialState = {
    events: [],
    currentEvent: {},
    isLoading: false,
};

export default function eventList(state = initialState, action) {
    switch (action.type) {
    case 'ADD_EVENTITEM_SUCCESS': {
        const key = action.payload.date;
        const updatedEvents = [...state.events[key], action.payload.event];

        return {
            ...state,
            events: {
                ...state.events,
                [key]: updatedEvents,
            },
        };
    }
    case 'SET_EVENTLIST':
        return {
            ...state,
            events: {
                ...state.events,
                ...action.payload,
            },
        };
    case 'SET_EDITING_ROOM':
        return {
            ...state,
            currentEvent: { ...action.payload },
        };
    default:
        return state;
    }
}
