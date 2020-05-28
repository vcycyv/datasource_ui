import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDatasourceContent } from '../actions/dataAction'

class DatasourceContentPage extends Component {
    constructor(props) {
        super(props)
        let datasourceId = props.match.params.datasourceId
        this.state = {
            datasourceId,
        }
    }

    componentDidMount() {
        this.props.fetchDatasourceContent(this.state.datasourceId)
    }

    render() {
        return (
            <p style={{whiteSpace: 'pre'}}>
                {this.props.datasourceContent}
            </p>
        )
    }
}

const mapStateToProps = state => ({
    datasourceContent: state.tableList.datasourceContent,
})

const actionCreators = {
    fetchDatasourceContent,
};

export default connect(mapStateToProps, actionCreators)(DatasourceContentPage)
