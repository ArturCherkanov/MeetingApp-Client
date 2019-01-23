import { combineReducers } from "redux";

import modalView from './modalAppearance';
import eventList from './eventsList';
import needRefresh from './needRefresh';


const rootReducer = combineReducers({
    modalView,
    eventList,
    needRefresh,
})

export default rootReducer;