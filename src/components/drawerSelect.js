import React, { Component } from 'react';
import { connect } from 'react-redux'
import Select from 'react-select';
import { fetchDrawers } from '../actions/dataAction';

class DrawerSelect extends Component {
    componentDidMount() {
        this.props.fetchDrawers();
    }

    render() {
        let drawerSelectOptions = [];
        for (let i = 0; i < this.props.drawers.length; i++) {
            console.debug('option: ' + this.props.drawers[i].Name);
            var option = {};
            option.value = this.props.drawers[i].id;
            option.label = this.props.drawers[i].Name;
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
    drawers: state.tableList.drawers,
})

const actionCreators = {
    fetchDrawers,
};

export default connect(mapStateToProps, actionCreators)(DrawerSelect)