import React, { Component } from 'react'
import { connect } from 'react-redux';

import { fetchDataList } from '../actions/dataAction'
import { Data } from '../components/Data'

class DataListPage extends Component {
    constructor(props) {
        super(props)
        const search = props.location.search; 
        const params = new URLSearchParams(search);
        let connectionId = params.get('connectionId');
        this.state = {
                connectionId,
            }
    }

    componentDidMount() {
        if (this.state.connectionId) {
            this.props.fetchDataList(this.state.connectionId)
        }
    }

    renderDataList() {
        if (this.props.loading) return <p>Loading data...</p>
        if (this.props.hasErrors) return <p>Unable to display data list.</p>
        return this.props.dataList.map(data => <Data key={data} data={data} />)
    }

    render() {
        return (
            <section>
                <h1>data list</h1>
                {this.renderDataList()}
            </section>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.dataList.loading,
    dataList: state.dataList.dataList,
    hasErrors: state.dataList.hasErrors,
})

const actionCreators = {
    fetchDataList,
};

export default connect(mapStateToProps, actionCreators)(DataListPage)