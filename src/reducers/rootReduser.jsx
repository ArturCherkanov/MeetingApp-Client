import { combineReducers } from 'redux';

import modalView from './modalAppearance';
import eventList from './eventsList';
import refresh from './needRefresh';


const rootReducer = combineReducers({
    modalView,
    eventList,
    refresh,
});

export default rootReducer;