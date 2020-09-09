import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Select from 'react-select';

export default class Step1 extends Component {
    constructor(props) {
        super(props)

        this.state = { 'Name': '', 'Description': '', 'Function': '', 'Algorithm': '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(field, e) {
        this.setState(Object.assign({}, this.state, { [field]: e.target.value }));
        this.props.populate({ [field]: e.target.value });
    }

    handleFunctionSelectionChange(option) {
        this.setState(Object.assign({}, this.state, { 'Function': option.value }));
        this.props.populate({ 'Function': option.value });
    }

    render() {
        let functions = [
            { "label": "classification", "value": "classification" },
            { "label": "prediction", "value": "prediction" },
            { "label": "data analysis", "value": "data analysis" },
        ];
        return (
            <Container >
                <div className="form-group">
                    <label className="label-control">Name</label>
                    <input className="form-control" onChange={this.handleChange.bind(this, 'Name')} />
                </div>
                <div className="form-group">
                    <label className="label-control">Description</label>
                    <input className="form-control" onChange={this.handleChange.bind(this, 'Description')} />
                </div>
                <div className="form-group">
                    <label className="label-control">Function</label>
                    <Select options={functions} onChange={this.handleFunctionSelectionChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label className="label-control">Algorithm</label>
                    <input className="form-control" onChange={this.handleChange.bind(this, 'Algorithm')} />
                </div>
                <p style={{float: 'right'}}><button onClick={this.props.previousStep}>Previous Step</button>
                <button onClick={this.props.nextStep}>Next Step</button></p>
            </Container>
        );
    }
}
