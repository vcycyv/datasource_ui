import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchDatasources } from '../actions/dataAction'

class DatasourcesPage extends Component {
    componentDidMount() {
        this.props.fetchDatasources()
    }

    render() {
        return (
            <div>
               {this.props.datasources.map((data, i) => <li key={i}><Link to={`/datasources/${data.id}/content`}>{data.Name}</Link></li>)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    datasources: state.tableList.datasources,
})

const actionCreators = {
    fetchDatasources,
};

export default connect(mapStateToProps, actionCreators)(DatasourcesPage)
