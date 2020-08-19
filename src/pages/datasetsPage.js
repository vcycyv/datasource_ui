import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Container, Col, Button, Modal } from 'react-bootstrap';
import DrawerSelect from '../components/drawerSelect';
import { fetchLibraries, uploadDatasource, fetchDatasources, deleteDatasource, fetchDatasourceContent } from '../actions/dataAction';

class DatasetsPage extends Component {

    constructor(props) {
        super(props);

        this.state = { file: null, dataID: '' }
        this.drawerID = '';

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.props.fetchLibraries();
        this.props.fetchDatasources();
    }

    handleSelectChange(selectedOption) {
        this.drawerID = selectedOption.value;
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("libraryID", this.drawerID);
        this.props.uploadDatasource(formData);
    }

    openModal(dataID) {
        this.props.fetchDatasourceContent(dataID);
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': true, 'dataID': dataID }));
    }

    closeModal() {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': false }))
    }

    render() {
        return (
            <Container>
                <br />
                <h2>Datasource</h2> <br />
                <h3>Upload a Dataset:</h3> <br />
                <Modal show={this.state.modalIsOpen} onHide={this.closeModal} scrollable={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{ whiteSpace: 'pre' }}>
                            {this.props.datasourceContent}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Form horizontal="true" name="form" className="form-horizontal" onSubmit={this.handleSubmit} style={{ backgroundColor: '#f8f9fa' }}>
                    <Form.Row>
                        <Col lg={1}>
                            <Form.Label column sm="1"> drawer: </Form.Label>
                        </Col>
                        <Col>
                            <DrawerSelect handleSelectChange={this.handleSelectChange} />
                        </Col>
                        <Col lg={1}>
                            <div style={{ whiteSpace: 'nowrap' }}>
                                <Form.Label column sm="1"> csv file: </Form.Label>
                            </div>
                        </Col>
                        <Col>
                            <Form.Control type="file" name="csv" onChange={(e) => this.setState({ ...this.state, file: e.target.files[0] })} />
                        </Col>
                        <Col>
                            <input type="submit" value="Upload" />
                        </Col>
                    </Form.Row>
                </Form>
                <hr />
                <br />
                <h3>Datasets:</h3> <br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Table Name</td><td>Drawer</td><td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.datasources.map((data, i) =>
                            <tr key={i}>
                                <td>
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => this.openModal(data.id)}>
                                        {data.Name}
                                    </button>
                                </td>
                                <td>{this.props.libraries.find(d => d.id === data.LibraryID).Name}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => { this.props.deleteDatasource(data.id) }}>
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
    libraries: state.tableList.libraries,
    datasourceContent: state.tableList.datasourceContent,
})

const actionCreators = {
    fetchLibraries,
    uploadDatasource,
    fetchDatasources,
    deleteDatasource,
    fetchDatasourceContent,
};

export default connect(mapStateToProps, actionCreators)(DatasetsPage)