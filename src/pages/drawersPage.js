import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchLibraries, createLibrary, updateLibrary, deleteLibrary } from '../actions/dataAction'
import { Container, Modal, Button  } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; 

class DrawersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'modalIsOpen': false,
            'drawer': {},
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.props.fetchLibraries();
    }

    openModal(drawer) {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': true, 'drawer': drawer }));
    }

    closeModal() {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': false }))
    }

    handleChange(id, e) {
        let drawer = this.props.libraries.find(d => { return d.id === id });
        this.setState(Object.assign({}, this.state, {'drawer': Object.assign({}, drawer, { 'Name': e.target.value })}));
    }

    handleDrawerDeleteSubmit(drawer) {
        confirmAlert({
            title: 'Delete',                        
            message: 'Are you sure to delete this drawer?',      
            buttons:[
                {
                    label: 'OK',
                    onClick: () => this.props.deleteLibrary(drawer.id)
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
                <h3>Drawers</h3> <br />
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
                        <Button variant="primary" onClick={() => { this.props.updateLibrary(this.state.drawer);this.closeModal(); }}>
                            Rename
                        </Button>
                    </Modal.Footer>
                </Modal>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Drawer Name</td><td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.libraries.map((data, i) =>
                            <tr key={i}>
                                <td>{data.Name}</td>
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
    libraries: state.tableList.libraries,
})

const actionCreators = {
    fetchLibraries,
    createLibrary,
    updateLibrary,
    deleteLibrary,
};

export default connect(mapStateToProps, actionCreators)(DrawersPage)