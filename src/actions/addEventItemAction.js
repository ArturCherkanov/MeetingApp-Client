import { getEvents, putEvent } from '../api/';


export const addDataToDb = (message, time, isAsyncLoadEvents) => dispatch => {

    dispatch({ type: 'ADD_EVENTITEM_REQUEST' });

    putEvent(message, time, isAsyncLoadEvents)
        .then(res => res.data)
        .then(res => {
            // let event = {};
            // event[res.date] = res.event;
            dispatch({
                type: 'ADD_EVENTITEM_SUCCESS',
                payload: res,
            });
        })
        .catch(err => dispatch({
            type: 'ADD_EVENTITEM_ERROR',
            payload: err,
        })
        );
};
