import { combineReducers } from 'redux';

import modalView from './modalAppearance';
import eventList from './eventsList';
import refresh from './needRefresh';
import isToken from './isToken';


const rootReducer = combineReducers({
    modalView,
    eventList,
    refresh,
    isToken,
});

export default rootReducer;
