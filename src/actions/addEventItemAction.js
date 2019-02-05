import { getEvents, putEvent } from '../api/index'


export const addDataToDb = (message, time) => dispatch => {

    dispatch({ type: 'ADD_EVENTITEM_REQUEST' });
    
    putEvent(message, time).then(() => getEvents()
        .then(res => res.data.data)
        .then(res => {
            dispatch({
                type: "ADD_EVENTITEM_SUCCESS",
                payload: res
            })
        })
        .catch(err => dispatch({
            type:"ADD_EVENTITEM_ERROR",
            payload: err
    })))
}