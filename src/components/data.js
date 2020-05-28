import React from 'react'

export const Data = ({ content }) => {
    if (typeof (content) == 'undefined')
        return ""
    let s = processData(JSON.stringify(content))
    let data = getData(s)
    if (data === "")
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
    if ("[]" === str)
        return ""
    
    return str;
}

