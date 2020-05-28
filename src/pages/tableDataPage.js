import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchTableData } from '../actions/dataAction'
import { Data } from '../components/data'

class TableData extends Component {
    constructor(props) {
        super(props)
        let connectionId = props.match.params.connectionId
        let table = props.match.params.table
        this.state = {
            connectionId,
            table,
        }
    }

    componentDidMount() {
        this.props.fetchTableData(this.state.connectionId, this.state.table)
    }

    render() {
       return <Data content={this.props.data} />
    }
}

const mapStateToProps = state => ({
    loading: state.tableList.loading,
    data: state.tableList.data,
    hasErrors: state.tableList.hasErrors,
})

const actionCreators = {
    fetchTableData,
};

export default connect(mapStateToProps, actionCreators)(TableData)