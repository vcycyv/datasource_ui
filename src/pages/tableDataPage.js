import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchTableData } from '../actions/dataAction'

class TableData extends Component {
    constructor(props) {
        super(props)
        let connectionId = props.match.params.connectionId
        let table = props.match.params.table
        this.state = {
            connectionId,
            table,
        }
    }

    componentDidMount() {
        this.props.fetchTableData(this.state.connectionId, this.state.table)
    }

    render() {
        if (typeof(this.props.data) == 'undefined')
            return ""
        let s = processData(JSON.stringify(this.props.data))
        //let s = processData('[["John","Doe","120 jefferson st.","Riverside","NJ","08075"],["Jack","McGinnis","220 hobo Av.","Phila"," PA","09119"],["John Da Man","Repici","120 Jefferson St.","Riverside"," NJ","08075"],["Stephen","Tyler","7452 Terrace At the Plaza road","SomeTown","SD"," 91234"],["adf","Blankman","adfadf","SomeTown"," SD"," 00298"],["Joan the bone, Anne","Jet","9th, at Terrace plc","Desert City","CO","00123"]]')
        let data = getData(s)
        if(data === "")
            return <></>
        return (
             <div>
                <table>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </div>
        )
    }
}

function getData(str) {
    if (str === "")
        return ""
    let data = JSON.parse(str)
    return data.map((row, i) => <tr key={i}>{getColumns(row)}</tr>)
}

function getColumns(row) {
    return (row.map((column, i) => <td  key={i}>{column}</td>))
}

function processData(str) {
    console.log("processData: " + str)
    if ("[]" === str)
        return ""
    
    console.log("before parse")
    //str = "'" + str + "'"
    console.log(JSON.parse(str)[0][0])
    console.log("after parse")
    return str;
}

const mapStateToProps = state => ({
    loading: state.tableList.loading,
    data: state.tableList.data,
    hasErrors: state.tableList.hasErrors,
})

const actionCreators = {
    fetchTableData,
};

export default connect(mapStateToProps, actionCreators)(TableData)