import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { modalAction } from '../../actions/modalAction';
import { refresh } from '../../actions/isRefreshAction';
import { addDataToDb } from '../../actions/addEventItemAction';


// Need to split by components
import './AddNewEvent.css';

class AddNewEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            time: '',
        };
    }

    render() {
        const handleRequest = e => { e.preventDefault(); this.props.setModalStateFunction(false); this.props.addEvent(this.state.message, this.state.time); };

        return (
            <div className={'addNewEvent ' + (this.props.active ? ' active' : ' disabled')}>
                <form className="addNewEvent-form">
                    <div className="addNewEvent-form-container">
                        <label className="addNEwEvent-Label">
                            <span>Name</span>
                            <input type="text" id="Name" className="default-input" />
                        </label>
                        <label className="addNEwEvent-Label">
                            <span>Users</span>
                            <select className="default-input">
                                <option>Test User 1</option>
                                <option>Test User 2</option>
                                <option>Test User 3</option>
                            </select>
                        </label>
                        <label className="addNEwEvent-Label">
                            <span>Time:</span>
                            <input type="datetime-local" step="0.001" className="default-input" onChange={e => this.setState({ time: e.target.value })} />
                        </label>
                        <label className="addNEwEvent-Label">
                            <span>Notes:</span>
                            <textarea className="default-input" onChange={e => this.setState({ message: e.target.value })}></textarea>
                        </label>
                        <label className="addNEwEvent-Label">
                            <span>Room</span>
                            <select className="default-input">
                                <option>Test Room 1</option>
                                <option>Test Room 2</option>
                                <option>Test Room 3</option>
                            </select>
                        </label>
                        <div className="addNEwEvent-button-container">
                            <button className="addNewEvent-create-button" onClick={(e) => { handleRequest(e); }}>CREATE</button>
                            <button className="addNewEvent-cancel-button" onClick={this.modalClose}>Cancel</button>
                        </div>
                    </div>
                </form>

            </div>
        );
    }

    /*-----------CUSTOM METHODS-----------*/

    modalClose = (e) => {
        e.preventDefault();
        this.props.setModalStateFunction(false);
    }

    /*-----------END CUSTOM METHODS-----------*/

}

AddNewEvent.propTypes = {
    setModalStateFunction: PropTypes.func,
    active: PropTypes.string,
    addEvent: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    setModalStateFunction: state => {
        dispatch(modalAction(state));
    },
    update: state => {
        dispatch(refresh(state));
    },
    addEvent: (message, time) => {
        dispatch(addDataToDb(message, time));
    },
});

const mapStateToProps = (state) => ({
    active: state.modalView.modalState,
    refresh: state.refresh,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewEvent);