import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchDrawers, createDrawer, updateDrawer, deleteDrawer } from '../actions/dataAction'
import { Container, Modal, Form, Col, Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

class DrawersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'modalIsOpen': false,
            'drawer': {},
            'drawerName': '',
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchDrawers();
    }

    openModal(drawer) {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': true, 'drawer': drawer }));
    }

    closeModal() {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': false }))
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createDrawer(this.state.drawerName);
    }

    handleChange(id, e) {
        let drawer = this.props.drawers.find(d => { return d.id === id });
        this.setState(Object.assign({}, this.state, { 'drawer': Object.assign({}, drawer, { 'Name': e.target.value }) }));
    }

    handleNewDrawerChange(e) {
        this.setState(Object.assign({}, this.state, { 'drawerName': e.target.value }));
    }

    handleDrawerDeleteSubmit(drawer) {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure to delete this drawer?',
            buttons: [
                {
                    label: 'OK',
                    onClick: () => this.props.deleteDrawer(drawer.id)
                },
                {
                    label: 'Cancel'
                }
            ]
        })
    }

    render() {
        return (
            <Container>
                <br />
                <h2>Datasource</h2> <br />
                <h3>Add a Drawer:</h3> <br />
                <Modal show={this.state.modalIsOpen} onHide={this.closeModal} scrollable={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rename Drawer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="label-control">drawer</label>
                        <input
                            className="form-control"
                            value={this.state.drawer.Name}
                            onChange={this.handleChange.bind(this, this.state.drawer.id)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                        <Button variant="primary" onClick={() => { this.props.updateDrawer(this.state.drawer); this.closeModal(); }}>
                            Rename
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Form horizontal="true" name="form" className="form-horizontal" onSubmit={this.handleSubmit} style={{ backgroundColor: '#f8f9fa' }}>
                    <Form.Row>
                        <Col lg={1}>
                            <Form.Label column sm="1"> drawer: </Form.Label>
                        </Col>
                        <Col>
                            <input
                                type="text"
                                className="form-control"
                                onChange={this.handleNewDrawerChange.bind(this)} />
                        </Col>
                        <Col>
                            <input type="submit" value="Add" />
                        </Col>
                    </Form.Row>
                </Form>
                <hr />
                <br />
                <h3>Drawers:</h3> <br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Drawer Name</td><td>Created By</td><td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.drawers.map((data, i) =>
                            <tr key={i}>
                                <td>{data.Name}</td>
                                <td>{data.User}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => { this.openModal(data) }}>
                                        rename
                                    </button>{' '}
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => { this.handleDrawerDeleteSubmit(data) }}>
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
    drawers: state.tableList.drawers,
})

const actionCreators = {
    fetchDrawers,
    createDrawer,
    updateDrawer,
    deleteDrawer,
};

export default connect(mapStateToProps, actionCreators)(DrawersPage)