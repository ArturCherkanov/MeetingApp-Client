import React, { Component } from 'react';
import EventListItem from '../EventListItem/EventListItem'
import { connect } from 'react-redux';
import { getDataFromDb } from '../../actions/currentEventListAction';
import { needRefresh } from '../../../../actions/isRefreshAction';
import './EventList.css'


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
        return (
            <div className="event-list-container">
                <h2 className="event-list-header">Event List</h2>
                <input className="default-input event-list-search shadow" type="search" placeholder="Search" onChange={this.handleSearch} />
                <ul className="event-list shadow">
                    {this.getVisibleItems(this.props.eventList || [], this.state.searchQuery, this.selectedEventToggle(), this.props.needRefresh).map(elem => (
                        <EventListItem event={elem} key={elem._id} />
                    ))}
                </ul>
                <span className="viewAll" onClick={this.refresh}>Refresh</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventList);

