import { combineReducers } from 'redux';

import modalView from './modalAppearance';
import eventList from './eventsList';
// import refresh from './needRefresh';
import isToken from './isToken';
import notification from './notidicationAppearance';
import roomList from './roomsList';
import Common from './Common';




const rootReducer = combineReducers({
    Common,
    modalView,
    eventList,
    isToken,
    notification,
    roomList,
});

export default rootReducer;
