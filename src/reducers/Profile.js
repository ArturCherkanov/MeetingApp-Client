const initialState = {
    isLoggedIn: false,
    email: null,
    profilePhoto: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case 'RIGHT_TOKEN':
        return {
            profilePhoto: action.payload.photoPath,
            email: action.payload.email,
            isLoggedIn: action.payload.isLoggedIn,
        };
    case 'WRONG_TOKEN':
        return {
            isLoggedIn: false,
            email: null,
            profilePhoto: null,
        };
    default:
        return state;
    }
}
