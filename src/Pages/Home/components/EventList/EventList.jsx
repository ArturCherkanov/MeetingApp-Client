import React, { Component } from 'react';
import EventListItem from '../EventListItem/EventListItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getEventsFromDb, setEditableEvent } from '../../actions/currentEventListAction';
// import { refresh } from '../../../../actions/profileAction';
import { modalAction } from '../../../../actions/modalActions';


import mainStyles from './EventList.css';


class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
        };
    }

    componentDidMount() {
        this.props.getEventsFromDb(moment().format('YYYY-MM-DD'));
    }

    render() {
        const visibleItems = this.getVisibleItems(this.props.eventList.events, this.state.searchQuery, this.props.chosenEventOnCaledar);

        return (
            <div className={mainStyles.eventListContainer}>
                <h2 className={mainStyles.eventListHeader}>Event List</h2>
                <input className={'default-input ' + mainStyles.eventListSearch} type="search" placeholder="Search" onChange={this.handleSearchInputChange} />
                <ul className={mainStyles.eventList}>
                    {visibleItems && visibleItems.map(elem => (
                        <EventListItem event={elem} setModalState={this.props.setModalState} setEditableEvent={this.props.setEditableEvent} key={elem._id} />
                    ))}
                </ul>
                {/* <span className={mainStyles.viewAll} onClick={this.refresh}>Refresh</span> */}
            </div>
        );
    }

    /*-----------CUSTOM METHODS-----------*/

    selectedEventToggle = () => {

        // selected date will refreshed straight after refresh

    }

    refresh = () => {

        // setting flag and getting data after refresh

        this.props.update(true);
        // this.props.getDataFromDb();
    }

    // function for computing current events by different queries

    getVisibleItems = (list = null, search = null, selectedDate = null) => {

        let currentDate = moment().format('YYYY-MM-DD');
        let visibleItems = list[currentDate];
        let searchQuery = search.toLowerCase();

        if (selectedDate) {
            const test = selectedDate.toString();
            const date = moment(test).format('YYYY-MM-DD');
            visibleItems = list[date];
        }
        if (searchQuery) {
            visibleItems = visibleItems.filter(eventName => (eventName.message.toLowerCase().includes(searchQuery)));
        }
        // //THH:mm:ss.SSS
        // console.log(currentDate);
        // if ((!searchQuery && !selectedDate) || (!searchQuery && !selectedDate && refreshed)) {
        //     // return list.filter(event => event.time.indexOf(currentDate)!==-1);
        // } else if (!search && selectedDate) {
        //     return selectedDate;
        // } else if (search && selectedDate) {
        //     return selectedDate.filter(eventName => (eventName.message.toLowerCase().includes(searchQuery)));
        // }
        return visibleItems;
    }

    handleSearchInputChange = (e) => {
        e.preventDefault();
        this.setState({
            searchQuery: e.target.value.trim(),
        });
    }

    /*-----------END CUSTOM METHODS-----------*/
}



const mapDispatchToProps = dispatch => ({
    getEventsFromDb: (date) => {
        dispatch(getEventsFromDb(date));
    },
    // update: state => {
    //     dispatch(refresh(state));
    // },
    setModalState: state => {
        dispatch(modalAction(state));
    },
    setEditableEvent: state => {
        dispatch(setEditableEvent(state));
    },
});

const mapStateToProps = state => ({
    eventList: state.eventList,
    // refresh: state.refresh,
    modalState: state.modalView.modalState,
});


/*-----------VALIDATION-----------*/


EventList.propTypes = {
    chosenEventOnCaledar: PropTypes.array,
    eventList: PropTypes.object,
    // refresh: PropTypes.bool,
    update: PropTypes.func,
    getEventsFromDb: PropTypes.func,
    setModalState: PropTypes.func,
    setEditableEvent: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);

