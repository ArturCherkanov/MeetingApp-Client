import { imageUpdate, imageUpload } from "../api";

const initialState = {
    isLoggedIn: false,
    email: null,
    photoPath: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case 'RIGHT_TOKEN':
        return {
            ...action.payload,
        };
    case 'WRONG_TOKEN':
        return {
            isLoggedIn: false,
            email: null,
            photoPath: null,
        };
    case 'IMAGE_UPDATE':
        return {
            ...state,
            photoPath: {...action.payload}
        };
    case 'PROFILE_UPDATE':
        // const key = action.payload.param;
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}
