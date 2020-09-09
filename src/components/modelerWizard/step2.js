import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Treebeard } from 'react-treebeard'
import { getColumns } from '../../actions/dataAction';
import { buildModel } from '../../actions/modelAction';

class Step2 extends Component {
    constructor(props) {
        super(props)

        this.state = {}
        console.log('constructor: ' + JSON.stringify(this.props))
        this.onToggle = this.onToggle.bind(this);
        this.onInputVarCheckboxChange = this.onInputVarCheckboxChange.bind(this);
        this.onTargetVarCheckboxChange = this.onTargetVarCheckboxChange.bind(this);
        this.onModelBuild = this.onModelBuild.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { libraries, columns } = this.props
        if (prevProps.libraries !== libraries) {
            console.log('in componentDidUpdate libraries');
            this.setState(Object.assign({}, this.state, { 'libraries': this.getLibrariesWithData(libraries) }));
        }
        if (prevProps.columns !== columns) {
            console.log('in componentDidUpdate columns');
            console.log('prevProps.columns: ' + prevProps.columns);
            console.log('props.columns: ' + this.props.columns);
            let columns = this.props.columns.split(',');
            let columnsMap = new Map();
            for (let c of columns) {
                columnsMap.set(c, { 'input': true, 'target': false });
            }
            this.setState(Object.assign({}, this.state, { 'columns': columnsMap }));
        }
    }

    getLibrariesWithData() {
        let rtnVal = []
        console.log(this.props.libraries.length)
        for (let i = 0; i < this.props.libraries.length; i++) {
            let rtnLib = {}
            let libID = this.props.libraries[i].id;
            let libDatasets = [];
            if (typeof this.props.libraries[i].Dataset != "undefined") {
                for (let j = 0; j < this.props.libraries[i].Dataset.length; j++) {
                    if (this.props.libraries[i].Dataset[j].LibraryID === libID) {
                        let rtnData = {};
                        rtnData.id = this.props.libraries[i].Dataset[j].id;
                        rtnData.name = this.props.libraries[i].Dataset[j].Name;
                        rtnData.type = "dataset"
                        libDatasets.push(rtnData);
                    }
                }
            }
            rtnLib.id = libID
            rtnLib.name = this.props.libraries[i].Name
            rtnLib.type = "drawer"
            rtnLib.children = libDatasets;
            rtnVal.push(rtnLib);
        }
        return rtnVal;
    }

    onModelBuild() {
        let predictors = [];
        let target;
        //let columns = Array.from(this.state.columns);
        this.state.columns.forEach((value, key) => {
            if (value['input']) {
                predictors.push(key);
            }
            if (value['target']) {
                target = key;
            }
        });
        // console.debug('columns: ' + JSON.stringify(columns))
        let modelRequest = {
            'trainTable': this.state.cursor.id,
            'predictors': predictors,
            'target': target,
            'modelName': this.props.model.Name,
            'description': this.props.model.Description,
            'function': this.props.model.Function,
        }
        console.debug('modelRequest: ' + JSON.stringify(modelRequest))
        this.props.buildModel(modelRequest)
    }

    onToggle(node, toggled) {
        console.debug(JSON.stringify(node));
        const { cursor } = this.state;

        if (cursor) {
            cursor.active = false;
            //this.setState(Object.assign({}, this.state, cursor));
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState(Object.assign({}, this.state, { 'cursor': node }));

        if (node.type === 'dataset') {
            this.props.getColumns(node.id)
        }
    }

    onInputVarCheckboxChange(e) {
        const target = e.target;
        const varName = target.name.slice(0, 0 - "-input".length); //remove the ending "-input"
        var columnsMap = this.state.columns;
        //console.debug('state: ' + JSON.stringify(this.state));
        //console.debug('columnsMap: ' + JSON.stringify(columnsMap));
        //console.debug('varName: ' + varName);
        var varObj = columnsMap.get(varName);
        if (target.checked) {
            varObj["target"] = false;
        }
        varObj["input"] = !varObj["input"]
        this.setState(Object.assign({}, this.state, { 'columns': columnsMap }));

    }

    onTargetVarCheckboxChange(e) {
        const target = e.target;
        const varName = target.name.slice(0, 0 - "-target".length); //remove the ending "-target"
        var columnsMap = this.state.columns;
        var varObj = columnsMap.get(varName);
        if (target.checked) {
            varObj["input"] = false;
            for (let key of columnsMap.keys()) {
                columnsMap.get(key)["target"] = false;
                target.checked = true;
            }
        }
        varObj["target"] = !varObj["target"]
        this.setState(Object.assign({}, this.state, { 'columns': columnsMap }));

    }

    render() {
        if (typeof this.state.libraries == 'undefined') {
            return <Container></Container>
        }

        let columnsTable;
        if (typeof this.state.cursor !== 'undefined' &&
            this.state.cursor.type === 'dataset' &&
            typeof this.state.columns !== 'undefined' &&
            this.state.columns.size > 0) {
            console.debug('state in render 1: ' + JSON.stringify(Array.from(this.state.columns)));
            let columns = Array.from(this.state.columns.keys());

            let rows = "";
            for (let i = 0; i < columns.length; i++) {
                rows = columns.map((column, i) =>
                    <tr key={i}>
                        <td>
                            {column}
                        </td>
                        <td>
                            <input name={column + "-input"}
                                type="checkbox"
                                checked={this.state.columns.get(column).input}
                                onChange={this.onInputVarCheckboxChange} />
                        </td>
                        <td>
                            <input name={column + "-target"}
                                type="checkbox"
                                checked={this.state.columns.get(column).target}
                                onChange={this.onTargetVarCheckboxChange} />
                        </td>
                    </tr>)
            }
            columnsTable = <table height="100%" width="100%" style={{ backgroundColor: '#ffffff' }}>
                <thead>
                    <tr>
                        <td>column</td><td>input variable</td><td>target variable</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        }
        console.debug('state in render 2: ' + JSON.stringify(this.state.columns));
        return (
            <Container>
                <Row>
                    <Col>
                        Datasource: <br /><br />
                        <Treebeard data={this.state.libraries}
                            onToggle={this.onToggle}
                            style={{
                                tree: {
                                    base: { backgroundColor: "white", width: "300px", height: "400px", overflowY: "scroll" },
                                    node: {
                                        activeLink: { background: '#f8f9fa' }
                                    }
                                }
                            }} />
                    </Col>
                    <Col>
                        Variables: <br /><br />
                        <Container style={{ overflowY: "scroll", height: "400px", backgroundColor: "white" }}>
                            {columnsTable}
                        </Container>
                    </Col>
                </Row>
                <br />
                <p style={{ float: 'right' }}><button onClick={this.props.previousStep}>Previous Step</button>
                    <button onClick={this.onModelBuild}>Build Model</button></p>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    columns: state.tableList.columns,
})

const actionCreators = {
    getColumns,
    buildModel,
};

export default connect(mapStateToProps, actionCreators)(Step2)