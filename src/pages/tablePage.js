import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchData } from '../actions/dataAction'

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
        console.log("componentDidMount:" + this.state.connectionId)
        this.props.fetchData(this.state.connectionId, this.state.table)
    }

    render() {
        return (
            <div>
                {this.props.data}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.dataList.loading,
    data: state.dataList.data,
    hasErrors: state.dataList.hasErrors,
})

const actionCreators = {
    fetchData,
};

export default connect(mapStateToProps, actionCreators)(TableData)