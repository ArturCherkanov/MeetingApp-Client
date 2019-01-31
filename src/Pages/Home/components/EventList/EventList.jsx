import React, { Component } from 'react';
import EventListItem from '../EventListItem/EventListItem'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDataFromDb } from '../../actions/currentEventListAction';
import { refresh } from '../../../../actions/isRefreshAction';

import mainStyles from './EventList.css'


class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
        };
    }

    componentWillReceiveProps(next) {

        // Reset selected date 

        if (next.chosenEventOnCaledar !== this.props.chosenEventOnCaledar && next.chosenEventOnCaledar != null) {
            this.props.update(false);
        }

        if (next.refresh !== this.props.refresh && next.refresh) {
            this.refresh()
        }
    }

    componentWillMount() {
        this.props.asyncGetEvents();
    }

    render() {
        const getVisibleItems = this.getVisibleItems(this.props.eventList || [], this.state.searchQuery, this.selectedEventToggle(), this.props.refresh);

        return (
            <div className={mainStyles.eventListContainer}>
                <h2 className={mainStyles.eventListHeader}>Event List</h2>
                <input className={"default-input " + mainStyles.eventListSearch + " shadow"} type="search" placeholder="Search" onChange={this.handleSearchInputChange} />
                <ul className={mainStyles.eventList + " shadow"}>
                    {getVisibleItems.map(elem => (
                        <EventListItem event={elem} key={elem._id} />
                    ))}
                </ul>
                <span className={mainStyles.viewAll} onClick={this.refresh}>Refresh</span>
            </div>
        );
    }

    /*-----------CUSTOM METHODS-----------*/

    selectedEventToggle = () => {

        // selected date will refreshed straight after refresh

        if (!this.props.refresh) {
            return this.props.chosenEventOnCaledar
        } else {
            return null
        }
    }

    refresh = () => {

        // setting flag and getting data after refresh

        this.props.update(true);
        this.props.asyncGetEvents();
    }

    // function for computing current events by different queries

    getVisibleItems = (list, search = null, selectedDate = null, refreshed = false) => {

        let searchQuery = search.toLowerCase();

        if ((!searchQuery && !selectedDate) || (!searchQuery && !selectedDate && refreshed)) {
            return list;
        } else if (!search && selectedDate) {
            return selectedDate;
        } else if (search && selectedDate) {
            return selectedDate.filter(eventName => (eventName.message.toLowerCase().includes(searchQuery)));
        }
        return list.filter(eventName => (eventName.message.toLowerCase().includes(searchQuery)));
    }

    handleSearchInputChange = (e) => {
        e.preventDefault();
        this.setState({
            searchQuery: e.target.value.trim(),
        });
    }

    /*-----------END CUSTOM METHODS-----------*/
}



const mapDispatchToProps = dispatch => {
    return {
        asyncGetEvents: () => {
            dispatch(getDataFromDb())
        },
        update: state => {
            dispatch(refresh(state))
        }
    }
}

const mapStateToProps = state => {
    return {
        eventList: state.eventList.state,
        refresh: state.refresh
    }
}

EventList.propTypes = {
    EventList: PropTypes.func,
    refresh: PropTypes.bool,
    update: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);

