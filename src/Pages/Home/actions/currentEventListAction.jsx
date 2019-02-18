import { getEvents } from '../../../api';

export const getDataFromDb = (date) => dispatch => {
    getEvents(date)
        .then(res => res.data)
        .then(currentEventList => dispatch({
            type: 'SET_EVENTLIST',
            payload: currentEventList,
        }));
};
