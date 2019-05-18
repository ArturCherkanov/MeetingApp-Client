import { combineReducers } from 'redux';

import modalView from '../Pages/Home/reducers/modalAppearance';
import eventList from './events';
import notification from './notidication';
import roomList from './rooms';
import Common from './common';
import profile from './profile';





const rootReducer = combineReducers({
    // Common,
    modalView,
    eventList,
    profile,
    notification,
    roomList,
});

export default rootReducer;
