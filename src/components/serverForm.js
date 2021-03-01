import React, { Component } from 'react'

export default class ServerForm extends Component {
    constructor(props) {
        super(props)
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {'Name': '', 'Url': ''};
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
        let button;
        if(this.props.action === 'update') {
            button = <button type="submit" disabled={(this.state.id === '')} style={{float: 'right'}}> Update Server </button>
        }
        return (
            <form onSubmit={this.handleSubmit} noValidate>
                <div className="form-group">
                    <label className="label-control">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.Name}
                        onChange={this.handleChange.bind(this, 'Name')} />
                </div>

                <div className="form-group">
                    <label className="label-control">URI</label>
                    <input
                        className="form-control"
                        value={this.state.Url}
                        onChange={this.handleChange.bind(this, 'Url')} />
                </div>
                {button}
            </form>
        )
    }
}