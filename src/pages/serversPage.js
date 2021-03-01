import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchServers, createServer, deleteServer } from '../actions/serverAction';
import { Modal, Container, Row, Col, Nav, Button } from 'react-bootstrap';
import ServerForm from '../components/serverForm'

class ServersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'server': this.getEmptyServer(),
            'newServer': this.getEmptyServer(),
            'modalIsOpen': false,
        };
        this.getEmptyServer = this.getEmptyServer.bind(this);
        this.handleNewServerChange = this.handleNewServerChange.bind(this);
        this.handleNewServerSubmit = this.handleNewServerSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    getEmptyServer() {
        return { 'id': '', 'Name': '', 'Url': '' }
    }

    componentDidMount() {
        this.props.fetchServers();
    }

    handleNewServerChange(change) {
        let server = Object.assign({}, this.state.newServer, change);
        this.setState(Object.assign({}, this.state, { 'newServer': server }))
    }

    handleNewServerSubmit() {
        console.log('new server: ' + this.state.newServer.Name);
        this.props.createServer(this.state.newServer);
        this.setState(Object.assign({}, this.state, { 'newServer': this.getEmptyServer() }))
    }

    openModal() {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': true }))
    }

    closeModal() {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': false }))
    }

    render() {
        return (
            <Container>
                <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a Server</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ServerForm data={this.getEmptyServer()}
                                function={this.handleNewServerChange}
                                action='create'
                                submit={() => {}} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => { this.handleNewServerSubmit();this.closeModal(); }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <br />
                <Row>
                    <Col>
                        <h2>Servers</h2> 
                    </Col>
                    <Col>
                        <Nav className="navbar navbar-light " style={{ width: '300px', padding: 0 }}>
                            <Nav.Link onClick={this.openModal} className="navbar-brand ml-auto" style={{ padding: 0, margin: 0 }}>
                                <svg id="add_svg" height="25" width="25" enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m108.913.1-63.536 63.535h63.536z" /><path d="m280.191 325.469c23.957-23.957 55.81-37.151 89.69-37.151 2.103 0 4.199.051 6.285.152v-288.47h-237.253v93.635h-93.635v343.163h199.592c-1.21-7.079-1.83-14.311-1.83-21.639 0-33.88 13.194-65.733 37.151-89.69zm-173.125-193.1h207.313v30h-207.313zm0 63.735h207.313v30h-207.313zm0 63.734h207.313v30h-207.313z" /><path d="m438.358 346.682c-37.819-37.819-99.135-37.819-136.954 0s-37.819 99.135 0 136.954 99.135 37.819 136.954 0 37.819-99.135 0-136.954zm-25.958 83.477h-27.519v27.518h-30v-27.518h-27.518v-30h27.518v-27.519h30v27.519h27.519z" /></g></svg>
                            </Nav.Link>
                        </Nav>
                    </Col>
                </Row>
                <br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Server Name</td><td>URL</td><td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.servers.map((server, i) =>
                            <tr key={i}>
                                <td>{server.Name}</td>
                                <td>{server.Url}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="link-button"
                                        >
                                        edit
                                    </button>{' '}
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => { this.handleServerDelete(server.id) }}>
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
    servers: state.servers.servers,
})

const actionCreators = {
    fetchServers,
    createServer,
    deleteServer,
};

export default connect(mapStateToProps, actionCreators)(ServersPage)