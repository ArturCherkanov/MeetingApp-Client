import { getEvents } from '../../../api/index';

export const getDataFromDb = () => dispatch => {
    getEvents()
        .then(res => res.data.data)
        .then(currentEventList => dispatch({
            type: "SET_EVENTLIST",
            payload: currentEventList
        }))
}