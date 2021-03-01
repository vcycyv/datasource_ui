import React, { Component } from 'react'

export default class ConnectionForm extends Component {
    constructor(props) {
        super(props)
        
        console.log('entering ConnectionForm constructor ' + props.action)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        if (typeof props.data == "undefined" ) {
            //console.debug('props data is undefined')
            this.state = {'id':'','Type':'', 'Name':'','Host':'','User':'','Password':'','DbName':''}
        }else{
            //console.debug('props data is defined:' + props.data.Name)
            this.state = props.data
        }
    }

    componentDidUpdate(prevProps, prevState){
        console.log('props: ' + this.props.data.id)
        console.log('prevProps: ' + prevProps.data.id)
        console.log('this.props.action: ' + this.props.action)
        if ( this.props.action === 'update' && prevProps.data.id !== this.props.data.id) {
                this.setState(this.props.data)
         }
    }

    handleChange(field, e) {
        //console.debug(e.target.value);
        this.setState(Object.assign({}, this.state, {[field]: e.target.value}));
        this.props.function({[field]: e.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        //console.debug('entering handleSubmit()' );
        this.props.submit();
    }

    render() {
        //console.debug('entering connection form page.');
        //console.debug(this.state.Type)
        let button;
        if(this.props.action === 'update') {
            button = <button type="submit" disabled={(this.state.id === '')} style={{float: 'right'}}> Update Connection </button>
        }
        return (
            <form onSubmit={this.handleSubmit} noValidate>
                <div className="form-group">
                    <label className="label-control">Type</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.Type}
                        onChange={this.handleChange.bind(this, 'Type')} />
                </div>

                <div className="form-group">
                    <label className="label-control">Name</label>
                    <input
                        className="form-control"
                        value={this.state.Name}
                        onChange={this.handleChange.bind(this, 'Name')} />
                </div>

                <div className="form-group">
                    <label className="label-control">Host</label>
                    <input
                        className="form-control"
                        value={this.state.Host}
                        onChange={this.handleChange.bind(this, 'Host')} />
                </div>

                <div className="form-group">
                    <label className="label-control">User</label>
                    <input
                        className="form-control"
                        value={this.state.User}
                        onChange={this.handleChange.bind(this, 'User')} />
                </div>

                <div className="form-group">
                    <label className="label-control">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={this.state.Password}
                        onChange={this.handleChange.bind(this, 'Password')} />
                </div>

                <div className="form-group">
                    <label className="label-control">Data Base</label>
                    <input
                        className="form-control"
                        value={this.state.DbName}
                        onChange={this.handleChange.bind(this, 'DbName')} />
                </div>
                {button}
            </form>
        )
    }
}