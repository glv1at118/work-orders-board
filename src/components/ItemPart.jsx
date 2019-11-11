import React from 'react';
import '../styles/item-part.css';
import { connect } from 'react-redux';

class ItemPart extends React.Component {
    timeSort = () => {
        let sortedOrders = [];
        let deadlineArr = [];
        for (let x = 0; x < this.props.orders.length; x++) {
            deadlineArr.push(this.props.orders[x].deadline);
        }
        if (this.props.timeQuery) {
            // sort latest first. Deadline number biggest first.
            deadlineArr.sort(function (a, b) {
                return b - a;
            });

        } else {
            deadlineArr.sort(function (a, b) {
                return a - b;
            });
        }
        for (let x = 0; x < deadlineArr.length; x++) {
            for (let y = 0; y < this.props.orders.length; y++) {
                if (this.props.orders[y].deadline === deadlineArr[x]) {
                    sortedOrders.push(this.props.orders[y]);
                    // do not break in case there are 2 or more orders which have same deadline
                }
            }
        }
        return sortedOrders;
    }
    nameSort = (orderArr) => {
        let filteredWorkerIdArr = [];
        let filteredOrderArr = [];
        for (let x in this.props.workers) {
            if (this.props.workers[x].name.toUpperCase().includes(this.props.nameQuery.toUpperCase())) {
                if (!filteredWorkerIdArr.includes(this.props.workers[x].id)) {
                    filteredWorkerIdArr.push(this.props.workers[x].id);
                }
            }
        }
        for (let y = 0; y < orderArr.length; y++) {
            if (filteredWorkerIdArr.includes(orderArr[y].workerId)) {
                filteredOrderArr.push(orderArr[y]);
            }
        }
        return filteredOrderArr;
    }
    convertTime = (ms) => {
        let timeFlag = "";
        let d = new Date(ms);
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let year = d.getFullYear();
        let hour = d.getHours(); // 0 - 23
        if (hour >= 0 && hour <= 11) {
            timeFlag = "AM";
        } else {
            timeFlag = "PM";
            if (hour !== 12) {
                hour = hour - 12;
            }
        }
        let minute = d.getMinutes();
        let second = d.getSeconds();

        let timeStr = `${month}/${day}/${year}, ${hour}:${minute}:${second} ${timeFlag}`;
        return timeStr;
    }
    render() {
        return (
            <ul>
                {
                    this.nameSort(this.timeSort()).map((order) => (
                        <li className="orderItem" key={order.id}>
                            <h2>{order.name}</h2>
                            <p>{order.description}</p>
                            <div className="workerInfo">
                                <div className="leftBox">
                                    <img src={this.props.workers[`worker${order.workerId}`].image} alt="img not accessible" />
                                </div>
                                <div className="rightBox">
                                    <h2>{this.props.workers[`worker${order.workerId}`].name}</h2>
                                    <p>{this.props.workers[`worker${order.workerId}`].companyName}</p>
                                    <p>{this.props.workers[`worker${order.workerId}`].email}</p>
                                    <p>{this.convertTime(order.deadline)}</p>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default connect((state) => ({
    orders: state.orders,
    workers: state.workers,
    nameQuery: state.nameQuery,
    timeQuery: state.timeQuery
}
), null)(ItemPart);