import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchServers, deleteServer } from '../actions/serverAction';
import { Container } from 'react-bootstrap';

class ServersPage extends Component {
    

    componentDidMount() {
        this.props.fetchServers();
    }

    handleServerDelete(id) {
        this.props.deleteServer(id);
    }

    render() {
        return (
            <Container>
                <br />
                <h2>Servers</h2> <br />
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
    deleteServer,
};

export default connect(mapStateToProps, actionCreators)(ServersPage)