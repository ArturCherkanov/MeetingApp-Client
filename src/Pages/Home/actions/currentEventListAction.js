import { getEvents } from '../../../api/api';

const eventListAction = (currentEventList) => ({
    type: "SET_EVENTLIST",
    payload: currentEventList
});


export const getDataFromDb = () => dispatch => {
    getEvents()
        .then(data => data.data.data)
        .then(res => dispatch(eventListAction(res)))
}