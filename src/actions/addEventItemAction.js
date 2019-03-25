import { getEvents, putEvent } from '../api/';


export const addDataToDb = (event, isAsyncLoadEvents) => dispatch => {

    dispatch({ type: 'ADD_EVENTITEM_REQUEST' });

    putEvent(event, isAsyncLoadEvents)
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
