import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col, Nav, Tabs, Tab, Modal, Button } from 'react-bootstrap'
import List from 'react-list-select' //console warning 'componentWillReceiveProps has been renamed, and is not recommended for use' is caused by List
import { fetchConnections, createConnection, updateConnection, deleteConnection } from '../actions/connectionsAction'
import { createDatasource } from '../actions/dataAction'
import { fetchTableList } from '../actions/dataAction'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConnectionForm from '../components/connectionForm'
import TableList from '../components/tableList';

class ConnectionPage extends Component {
    constructor(props) {
        super(props);
        console.debug('ConnectionPage constructor get called.')
        this.state = {
            'connection': this.getEmptyConnection(),
            'newConnection': this.getEmptyConnection(),
            'modalIsOpen': false,
        };
        this.getEmptyConnection = this.getEmptyConnection.bind(this);
        this.handleConnectionSelectionChange = this.handleConnectionSelectionChange.bind(this);
        this.handleConnectionChange = this.handleConnectionChange.bind(this);
        this.handleNewConnectionChange = this.handleNewConnectionChange.bind(this);
        this.handleConnectionCreationSubmit = this.handleConnectionCreationSubmit.bind(this);
        this.handleConnectionUpdateSubmit = this.handleConnectionUpdateSubmit.bind(this);
        this.handleConnectionDeleteSubmit = this.handleConnectionDeleteSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    getEmptyConnection() {
        return { 'id': '', 'Type': '', 'Name': '', 'Host': '', 'User': '', 'Password': '', 'DbName': '' }
    }

    componentDidMount() {
        this.props.fetchConnections();
    }

    componentDidUpdate(prevProps, prevState) {
        console.debug('entering componentDidUpdate')
        if(typeof this.props.connections !== 'undefined') {
            console.debug('connections is not undefined')
            if(JSON.stringify(prevProps.connections ) !== JSON.stringify(this.props.connections)){
                if(this.props.connections.length < prevProps.connections.length){
                    if(this.props.connections.length === 0){
                        this.setState(Object.assign({}, this.state, { 'connection': this.getEmptyConnection(), 'selectedConnection': 0 }));
                    }else{
                        this.setState(Object.assign({}, this.state, { 'connection': this.props.connections[0], 'selectedConnection': 0 }));
                    }
                }else /*if(this.props.connections.length > prevProps.connections.length)*/{
                    let sortedConnections = this.props.connections.sort((a,b) => new Date(a.UpdatedAt) - new Date(b.UpdatedAt));
                    console.debug('sorted connection: ' + sortedConnections[this.props.connections.length - 1].UpdatedAt);
                    for(let i = 0; i < this.props.connections.length; i++){
                        if(this.props.connections[i].id === sortedConnections[this.props.connections.length - 1].id){
                            this.setState(Object.assign({}, this.state, { 'connection': this.props.connections[i], 'selectedConnection': i }));
                        }
                    }
                }
            }
        }
     }

    handleConnectionSelectionChange(index) {
        this.props.fetchTableList(this.props.connections[index].id);
        this.setState(Object.assign({}, this.state, { 'connection': this.props.connections[index], 'selectedConnection': index }));
        //console.debug('ending...');
    }

    handleConnectionChange(change) {
        let connection = Object.assign({}, this.state.connection, change);
        this.setState(Object.assign({}, this.state, { 'connection': connection }))
    }

    handleNewConnectionChange(change) {
        let connection = Object.assign({}, this.state.newConnection, change);
        this.setState(Object.assign({}, this.state, { 'newConnection': connection }))
    }

    handleConnectionUpdateSubmit() {
        this.props.updateConnection(this.state.connection);
    }

    handleConnectionCreationSubmit() {
        this.props.createConnection(this.state.newConnection);
        this.setState(Object.assign({}, this.state, { 'newConnection': this.getEmptyConnection() }))
    }

    handleConnectionDeleteSubmit() {
        confirmAlert({
            title: 'Delete',                        
            message: 'Are you sure to delete this connection?',      
            buttons:[
                {
                    label: 'OK',
                    onClick: () => this.props.deleteConnection(this.state.connection.id)
                },
                {
                    label: 'Cancel'
                }
            ]        
          })
    }

    openModal() {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': true }))
    }

    closeModal() {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': false }))
    }

    render() {
        //console.debug('render() connection name: ' + this.state.connection.Name);
        console.debug('tableList state: ' + this.state.tableList);
        if (this.props.loading) return <p>Loading connections...</p>
        if (this.props.hasErrors) return <p>Unable to display connections list.</p>
        let connNames = this.props.connections.map(conn => conn.Name)
        let tableList = this.props.tableList;
        if(typeof tableList === 'undefined')
            tableList = [];
        return (
            <Container>
                <Row style={{ height: '60px' }}></Row>
                <Row>
                    <Col xs lg="4">
                        <Nav className="navbar navbar-light bg-light" style={{ width: '300px', padding: 0 }}>
                            <Nav.Link onClick={this.openModal} className="navbar-brand ml-auto" style={{ padding: 0, margin: 0 }}>
                                <svg id="add_svg" height="25" width="25" enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m108.913.1-63.536 63.535h63.536z" /><path d="m280.191 325.469c23.957-23.957 55.81-37.151 89.69-37.151 2.103 0 4.199.051 6.285.152v-288.47h-237.253v93.635h-93.635v343.163h199.592c-1.21-7.079-1.83-14.311-1.83-21.639 0-33.88 13.194-65.733 37.151-89.69zm-173.125-193.1h207.313v30h-207.313zm0 63.735h207.313v30h-207.313zm0 63.734h207.313v30h-207.313z" /><path d="m438.358 346.682c-37.819-37.819-99.135-37.819-136.954 0s-37.819 99.135 0 136.954 99.135 37.819 136.954 0 37.819-99.135 0-136.954zm-25.958 83.477h-27.519v27.518h-30v-27.518h-27.518v-30h27.518v-27.519h30v27.519h27.519z" /></g></svg>
                            </Nav.Link>
                            <Nav.Link onClick={this.handleConnectionDeleteSubmit} className="navbar-brand" style={{ padding: 0, margin: 0 }}>
                                <svg id="delete_svg" height="25" width="25" enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16h-88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zm-216-16c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96z" /><path d="m78.364 184c-2.855 0-5.13 2.386-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042c.136-2.852-2.139-5.238-4.994-5.238zm241.636 40c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z" /></g></svg>
                            </Nav.Link>
                        </Nav>
                        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create a Connection</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConnectionForm data={this.getEmptyConnection()}
                                        function={this.handleNewConnectionChange}
                                        action='create'
                                        submit={() => {}} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeModal}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => { this.handleConnectionCreationSubmit();this.closeModal(); }}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <List
                            items={connNames}
                            selected={[this.state.selectedConnection]}
                            onChange={(selected) => {
                                this.handleConnectionSelectionChange(selected)
                            }}
                            className="width300 react-list-select--item"
                        />
                    </Col>
                    <Col md="auto">
                        <Tabs defaultActiveKey="Properties" id="uncontrolled-tab-example" style={{ width: '700px', padding: 0 }}>
                            <Tab eventKey="Properties" title="Properties">
                                <ConnectionForm data={this.state.connection}
                                    function={this.handleConnectionChange}
                                    action='update'
                                    submit={this.handleConnectionUpdateSubmit} />
                            </Tab>
                            <Tab eventKey="Tables" title="Data">
                                <TableList connectionId={this.state.connection.id} tableList={tableList} collectTable={this.props.createDatasource} />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    loading: state.connections.loading,
    connections: state.connections.connections,
    tableList: state.tableList.tableList,
    hasErrors: state.connections.hasErrors,
})

const actionCreators = {
    fetchConnections,
    createConnection,
    updateConnection,
    deleteConnection,
    fetchTableList,
    createDatasource,
};

export default connect(mapStateToProps, actionCreators)(ConnectionPage)