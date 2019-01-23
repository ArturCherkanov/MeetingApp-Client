import { getEvents,putEvent } from '../api/index'


export const addeventItem = (currentEventList) => ({
    type: "ADD_EVENTITEM",
    payload: currentEventList
});

export const addDataToDb = (message, time) => dispatch => {
    putEvent()
        .then(() => getEvents()
            .then(res => res.data.data)
            .then(res => { dispatch(addeventItem(res)) }))
}