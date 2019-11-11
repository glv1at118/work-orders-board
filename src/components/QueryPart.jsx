import React from 'react';
import '../styles/query-part.css';
import { connect } from 'react-redux';
import { updateNameQuery, updateTimeQuery } from '../redux/actions.js';

class QueryPart extends React.Component {
    handleNameQuery = (event) => {
        this.props.updateNameQuery(event.target.value);
    }
    handleTimeQuery = (event) => {
        console.log(event.target.checked) // right is true, left is false
        this.props.updateTimeQuery(event.target.checked);
    }
    render() {
        return (
            <div>
                <input type="text" placeholder="filter by worker name" id="name-input" onChange={this.handleNameQuery} />
                <div id="slider-box">
                    <span className="titlePart">Earliest First</span>
                    <label className="switch">
                        <input type="checkbox" id="deadline-input" onChange={this.handleTimeQuery} />
                        <span className="slider"></span>
                    </label>
                    <span className="titlePart">Latest First</span>
                </div>

            </div>
        );
    }
}

export default connect(null, { updateNameQuery, updateTimeQuery })(QueryPart);