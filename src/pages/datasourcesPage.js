import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchDatasources, uploadDatasource, deleteDatasource } from '../actions/dataAction'
import { Form, FormGroup, Row, Col, Container } from 'react-bootstrap';

class DatasourcesPage extends Component {
    constructor(props) {
        super(props);

        this.state = { file: null }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchDatasources()
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", this.state.file);
        this.props.uploadDatasource(formData)
    }

    render() {
        return (
            <Container>
                <Form horizontal="true" name="form" className="form-horizontal" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Row>
                        <Form.Label column sm="2"> csv file: </Form.Label>
                        <div>
                        <Form.Control type="file" name="csv"  onChange={(e) => this.setState({...this.state, file: e.target.files[0]})}/>
                        </div>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <input type="submit" className="btn btn-primary" value="Upload"/>
                    </FormGroup>
                </Form>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Table Name</td><td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.datasources.map((data, i) => 
                            <tr key={i}>
                                <td><Link to={`/datasources/${data.id}/content`}>{data.Name}</Link></td>
                                <td>
                                <button 
                                    type="button" 
                                    className="link-button"
                                    onClick={() => {this.props.deleteDatasource(data.id)}}>
                                        delete
                                </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    datasources: state.tableList.datasources,
})

const actionCreators = {
    fetchDatasources,
    uploadDatasource,
    deleteDatasource,
};

export default connect(mapStateToProps, actionCreators)(DatasourcesPage)
