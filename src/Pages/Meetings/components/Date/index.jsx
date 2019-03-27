import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';
class CurrentDate extends Component {

    render() {
        let addDay = moment(this.props.time, "YYYY-MM-DD").add(1, 'day').format('YYYY-MM-DD');
        let revertDay = moment(this.props.time, "YYYY-MM-DD").subtract(1, 'day').format('YYYY-MM-DD');
        return (
            <div className="datePicker">
                <div className="dateswitcher">
                    <button onClick={() => { this.props.setTime(revertDay) }}>{'<'}</button>
                    {this.props.time}
                    <button onClick={() => { this.props.setTime(addDay) }}>{'>'}</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDate);
