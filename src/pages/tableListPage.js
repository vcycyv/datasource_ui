import React, { Component } from 'react'
import { connect } from 'react-redux';

import { fetchTableList, createDatasource } from '../actions/dataAction'
import { TableEntry } from '../components/table'

class TableListPage extends Component {
    constructor(props) {
        super(props)
        let connectionId = props.match.params.connectionId
        this.state = {
                connectionId,
            }
    }

    componentDidMount() {
        if (this.state.connectionId) {
            this.props.fetchTableList(this.state.connectionId)
        }
    }

    renderTableList() {
        return Object.entries(this.props.tableList).map((data, i) => 
            <TableEntry key={i} data={data} connectionId={this.state.connectionId} func={() => this.createDatasource(this.state.connectionId, data[0])}/>)
    }

    createDatasource(connectionId, table) {
        this.props.createDatasource(connectionId, table)
    }

    render() {
        if (this.props.loading) return <p>Loading data...</p>
        if (this.props.hasErrors) return <p>Unable to display data list.</p>
        return (
            <section>
                <h1>data list</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Table Name</td><td>Status</td><td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableList()}
                    </tbody>
                </table>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.tableList.loading,
    tableList: state.tableList.tableList,
    hasErrors: state.tableList.hasErrors,
})

const actionCreators = {
    fetchTableList,
    createDatasource,
};

export default connect(mapStateToProps, actionCreators)(TableListPage)