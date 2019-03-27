import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class Room extends Component {
    calcDifferencesBetweenDates = (date1, date2) => {
        let min = moment(date2).diff(date1, 'minutes');
        let width = min / 14.4;
        console.log(min);
        return width + '%';
    }

    calcMarginSize = (timeFrom) => {
        let startDay = moment(this.props.time).startOf('day');
        let min = moment(timeFrom).diff(startDay, 'minutes')
        let left = min / 14.4;
        return left + '%';

    }

    getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        return (
            <div className="meetingRoom">
                <div className="Room">{this.props.name}</div>
                <div className="meetingLine">
                    {this.props.events && this.props.events.map((e, i) => {
                        let width = this.calcDifferencesBetweenDates(e.timeFrom, e.timeTo);
                        let left = this.calcMarginSize(e.timeFrom);
                        let color = this.getRandomColor();
                        let syles = {
                            width: width,
                            left: left,
                            background: color,
                        };
                        return (<div key={i} className='meeting-item' style={syles}>{'name: ' + e.name + ' description: ' + e.message + ' from:' + e.timeFrom + 'to: ' + e.timeTo}</div>);
                    })}
                </div>
            </div>
        );
    }
}

export default connect()(Room);
