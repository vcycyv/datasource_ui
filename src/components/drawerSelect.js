import React, { Component } from 'react';
import { connect } from 'react-redux'
import Select from 'react-select';
import { fetchLibraries } from '../actions/dataAction';

class DrawerSelect extends Component {
    componentDidMount() {
        this.props.fetchLibraries();
    }

    render() {
        let drawerSelectOptions = [];
        for (let i = 0; i < this.props.libraries.length; i++) {
            console.debug('option: ' + this.props.libraries[i].Name);
            var option = {};
            option.value = this.props.libraries[i].id;
            option.label = this.props.libraries[i].Name;
            drawerSelectOptions.push(option);
        }
        console.debug('drawerSelectOptions: ' + drawerSelectOptions);

        return (
            <Select
                onChange={this.props.handleSelectChange}
                options={drawerSelectOptions}
            />
        );
    }
}

const mapStateToProps = state => ({
    libraries: state.tableList.libraries,
})

const actionCreators = {
    fetchLibraries,
};

export default connect(mapStateToProps, actionCreators)(DrawerSelect)