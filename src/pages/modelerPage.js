import React, { Component } from 'react';
import { connect } from 'react-redux'
import StepWizard from 'react-step-wizard';
import { Container } from 'react-bootstrap';
import Step1 from '../components/modelerWizard/step1'
import Step2 from '../components/modelerWizard/step2'
import { fetchDrawers } from '../actions/dataAction'

class ModelerPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'model': this.getEmptyModel(),
        };
        this.getEmptyModel = this.getEmptyModel.bind(this);
        this.handleNewModelChange = this.handleNewModelChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchDrawers(true);
    }

    getEmptyModel() {
        return { 'Name': '', 'Description': '', 'Function': '', 'TrainTable': ''}
    }

    handleNewModelChange(change) {
        console.debug(change);
        let model = Object.assign({}, this.state.model, change);
        console.debug('model: ' + JSON.stringify(model))
        this.setState(Object.assign({}, this.state, { 'model': model }))
    }

    render() {
        return (
            <Container>
                <br/>
                <div style={{ backgroundColor: '#f8f9fa' }}>
                <StepWizard>
                    <Step1 populate={this.handleNewModelChange} />
                    <Step2 drawers={this.props.drawers} model={this.state.model}/>
                </StepWizard>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    drawers: state.tableList.drawers,
})

const actionCreators = {
    fetchDrawers,
};

export default connect(mapStateToProps, actionCreators)(ModelerPage)