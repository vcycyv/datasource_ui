import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getConnection, createConnection, updateConnection } from '../actions/connectionsAction'

class ConnectionPage extends Component {
    constructor(props) {
        super(props)
        let connectionId = props.match.params.id
        if (connectionId && 'new' === connectionId){
            connectionId = null
        }
        this.state = {
                connectionId,
                connection: {
                    ID: '', Type:'', Name:'', Host:'', User:'', Password:'', DbName:''
                },
            }
    }

    componentDidUpdate(props, state) {
        console.log("componentDidUpdate runs.... ")
        console.log("comparing props: " + (this.props.connection !== props.connection))
        console.log("isEmptyObject: " + isEmptyObject(state.connection))
        if (this.props.connection !== props.connection || isEmptyObject(this.state.connection)) {
            this.setState({...this.state, connection: props.connection})
        }
    }

    componentDidMount() {
        if (this.state.connectionId) {
            this.props.getConnection(this.state.connectionId)
        }
    }

    handleChange(field, e) {
        console.log("handleChange field: " + field)
        console.log("handleChange value: " + e.target.value)
        const connection = Object.assign({}, this.state.connection, {[field]: e.target.value});
        this.setState(Object.assign({}, this.state, {connection}));
        console.log("handleChange: " + connection.Name)
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.props.match.params.id) {
            this.props.updateConnection(this.state.connection)
        } else {
            this.props.createConnection(this.state.connection)
        }
    }

    render() {
        console.log("ConnectionPage render runs....")
        return (
            <form onSubmit={this.handleSubmit.bind(this)} noValidate>
                <div className="form-group">
                    <label className="label-control">Type</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={this.state.connection.Type}
                        onChange={this.handleChange.bind(this, 'Type')} />
                </div>

                <div className="form-group">
                    <label className="label-control">Name</label>
                    <input
                        className="form-control"
                        defaultValue={this.state.connection.Name}
                        onChange={this.handleChange.bind(this, 'Name')} />
                </div>

                <div className="form-group">
                    <label className="label-control">Host</label>
                    <input
                        className="form-control"
                        defaultValue={this.state.connection.Host}
                        onChange={this.handleChange.bind(this, 'Host')} />
                </div>

                <div className="form-group">
                    <label className="label-control">User</label>
                    <input
                        className="form-control"
                        defaultValue={this.state.connection.User}
                        onChange={this.handleChange.bind(this, 'User')} />
                </div>

                <div className="form-group">
                    <label className="label-control">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        defaultValue={this.state.connection.Password}
                        onChange={this.handleChange.bind(this, 'Password')} />
                </div>

                <div className="form-group">
                    <label className="label-control">Data Base</label>
                    <input
                        className="form-control"
                        defaultValue={this.state.connection.DbName}
                        onChange={this.handleChange.bind(this, 'DbName')} />
                </div>

                <button type="submit" >
                    {this.state.connectionId? 'Update' : 'Create'} Connection
                </button>
            </form>
        )
    }
}

function isEmptyObject(obj) {
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  }

function mapStateToProps(state) {
    return {connection: state.connections.connection};
}

const actionCreators = {
    getConnection,
    createConnection,
    updateConnection,
};

export default connect(mapStateToProps, actionCreators)(ConnectionPage)




