import React, { Component } from 'react';
import EventListItem from '../EventListItem/EventListItem'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDataFromDb } from '../../actions/currentEventListAction';
import { needRefresh } from '../../../../actions/isRefreshAction';

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
            this.props.needUpdate(false);
        }

        if (next.needRefresh !== this.props.needRefresh && next.needRefresh) {
            this.refresh()
        }
    }

    componentWillMount() {
        this.props.asyncGetEvents();
    }

    render() {
        const getVisibleItems = this.getVisibleItems(this.props.eventList || [], this.state.searchQuery, this.selectedEventToggle(), this.props.needRefresh);

        return (
            <div className={mainStyles.eventListContainer}>
                <h2 className={mainStyles.eventListHeader}>Event List</h2>
                <input className={"default-input " + mainStyles.eventListSearch + " shadow"} type="search" placeholder="Search" onChange={this.handleSearch} />
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

        if (!this.props.needRefresh) {
            return this.props.chosenEventOnCaledar
        } else {
            return null
        }
    }

    refresh = () => {

        // setting flag and getting data after refresh

        this.props.needUpdate(true);
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

    handleSearch = (e) => {
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
        needUpdate: state => {
            dispatch(needRefresh(state))
        }
    }
}

const mapStateToProps = state => {
    return {
        eventList: state.eventList.state,
        needRefresh: state.needRefresh
    }
}

EventList.propTypes = {
    EventList: PropTypes.func,
    needRefresh: PropTypes.bool,
    needUpdate: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);

