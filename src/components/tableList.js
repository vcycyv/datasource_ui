import React, { Component } from 'react'
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'
import { fetchTableData, fetchLibraries } from '../actions/dataAction'
import Select from 'react-select';

class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'modalIsOpen': false,
            'libModalIsOpen': false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openLibModal = this.openLibModal.bind(this);
        this.closeLibModal = this.closeLibModal.bind(this);
        this.handleDrawerSelectChange = this.handleDrawerSelectChange.bind(this);

        this.connectionId = "";
        this.table = "";
        this.drawer = "";
    }

    openModal(connectionId, table) {
        this.props.fetchTableData(connectionId, table);
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': true }));
    }

    closeModal() {
        this.setState(Object.assign({}, this.state, { 'modalIsOpen': false }))
    }

    openLibModal(connectionId, table) {
        this.props.fetchLibraries();
        //this.props.collectTable(connectionId, table);
        this.connectionId = connectionId;
        this.table = table;
        this.setState(Object.assign({}, this.state, { 'libModalIsOpen': true }));
    }

    closeLibModal() {
        this.setState(Object.assign({}, this.state, { 'libModalIsOpen': false }))
    }

    handleDrawerSelectChange(selectedOption) {
        this.drawer = selectedOption.value;
    }

    render() {
        let tableBody = Object.entries(this.props.tableList).map((data, i) =>
            <tr key={i}>
                {/*<td><Link to={"/connections/" + this.props.connectionId + "/tableList/" + data[0] + "/data"}>{data[0]}</Link></td>*/}
                <td><button onClick={() => this.openModal(this.props.connectionId, data[0])} className="link-button">{data[0]}</button></td>
                <td>{data[1] ? "collected" : "not collected"}</td>
                <td>
                    <button
                        type="button"
                        className="link-button"
                        onClick={() => this.openLibModal(this.props.connectionId, data[0])}>
                        Collect
                    </button>
                </td>
            </tr>
        );

        console.debug('drawers length: ' + this.props.libraries.length);
        let drawerSelectOptions = [];
        for(let i = 0; i < this.props.libraries.length; i++) {
            console.debug('option: ' + this.props.libraries[i].Name);
            var option = {};
            option.value = this.props.libraries[i].id;
            option.label = this.props.libraries[i].Name;
            drawerSelectOptions.push(option);
        }
        console.debug('drawerSelectOptions: ' + drawerSelectOptions);
        let drawerSelect = <Select
                                onChange={this.handleDrawerSelectChange}
                                options={drawerSelectOptions}
                            />

        function getData(str) {
            if (str === "")
                return ""
            let data = JSON.parse(str)
            return data.map((row, i) => <tr key={i}>{getColumns(row)}</tr>)
        }
        
        function getColumns(row) {
            return (row.map((column, i) => <td key={i}>{column}</td>))
        }
        
        function processData(str) {
            if ("[]" === str)
                return ""
            
            return str;
        }

        let s = processData(JSON.stringify(this.props.data))
        let data = getData(s)
        if (data === "")
            data = <></>
        else
            data = <div>
                        <table>
                            <tbody>
                                {data}
                            </tbody>
                        </table>
                    </div>
        return (
            <>
                <Modal show={this.state.libModalIsOpen} onHide={this.closeLibModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Convert to Dataset</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {drawerSelect}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeLibModal}>Close</Button>
                        <Button variant="primary" onClick={() => { this.props.collectTable(this.connectionId, this.table, this.drawer);this.closeLibModal(); }}>
                            Convert
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.modalIsOpen} onHide={this.closeModal} scrollable={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>View Table Content</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {data}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Table Name</td><td>Status</td><td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            </>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.tableList.loading,
    data: state.tableList.data,
    libraries: state.tableList.libraries,
})

const actionCreators = {
    fetchTableData,
    fetchLibraries,
};

export default connect(mapStateToProps, actionCreators)(TableList)