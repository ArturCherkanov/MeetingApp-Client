const initialState = {
    modalState: false
}

export default function modalView(state = initialState, action) {
    switch (action.type) {
        case "SET_MODALSTATE":
            return { modalState: action.payload }
        default:
            return state;
    }
}