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
            token: action.payload.token,
        };
    case 'WRONG_TOKEN':
        return action.payload;
    default:
        return state;
    }
}
