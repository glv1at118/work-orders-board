import React from 'react';
import '../styles/list-part.css';
import ItemPart from './ItemPart.jsx';
import { makeRequest } from '../redux/actions.js';
import { connect } from 'react-redux';

class ListPart extends React.Component {
    componentDidMount() {
        this.props.makeRequest();
    }
    render() {
        return (
            <div id="displayZone">
                <ItemPart></ItemPart>
            </div>
        );
    }
}

export default connect(null, { makeRequest })(ListPart);