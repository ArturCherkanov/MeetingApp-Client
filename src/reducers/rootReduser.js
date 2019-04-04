import { combineReducers } from 'redux';

import modalView from '../Pages/Home/reducers/modalAppearance';
import eventList from './eventsList';
import notification from './notidicationAppearance';
import roomList from './roomsList';
import Common from './Common';
import profile from './Profile';





const rootReducer = combineReducers({
    Common,
    modalView,
    eventList,
    profile,
    notification,
    roomList,
});

export default rootReducer;
