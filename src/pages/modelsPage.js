import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchModels, updateModel, deleteModel } from '../actions/modelAction'
import { Container, Modal, Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

class ModelsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'modalIsOpen': false,
            'model': {},
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(model) {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': true, 'model': model }));
    }

    closeModal() {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': false }))
    }

    componentDidMount() {
        this.props.fetchModels();
    }

    handleChange(field, e) {
        console.debug(e.target.value);
        var model = Object.assign({}, this.state.model, {[field]: e.target.value});
        console.debug(JSON.stringify(model));
        this.setState(Object.assign({}, this.state, {'model':model}))
    }

    handleModelDeleteSubmit(model) {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure to delete this model?',
            buttons: [
                {
                    label: 'OK',
                    onClick: () => this.props.deleteModel(model.id)
                },
                {
                    label: 'Cancel'
                }
            ]
        })
    }

    render() {
        console.debug(JSON.stringify(this.props.models))
        if(typeof this.props.models == 'undefined')
            return <Container></Container>
        return (
            <Container>
                <hr />
                <br />
                <h3>Models:</h3> <br />
                <Modal show={this.state.modalIsOpen} onHide={this.closeModal} scrollable={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Model</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="label-control">name</label>
                        <input
                            className="form-control"
                            value={this.state.model.Name}
                            onChange={this.handleChange.bind(this, 'Name')} />
                        <label className="label-control">description</label>
                        <input
                            className="form-control"
                            value={this.state.model.Description}
                            onChange={this.handleChange.bind(this, 'Description')} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                        <Button variant="primary" onClick={() => { this.props.updateModel(this.state.model); this.closeModal(); }}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Model Name</td><td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.models.map((data, i) =>
                            <tr key={i}>
                                <td>{data.Name}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => { this.openModal(data) }}
                                    >
                                        Edit
                                </button>{' '}
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => { this.handleModelDeleteSubmit(data) }}
                                    >
                                        Delete
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
    models: state.models.models,
})

const actionCreators = {
    fetchModels,
    updateModel,
    deleteModel,
};

export default connect(mapStateToProps, actionCreators)(ModelsPage)