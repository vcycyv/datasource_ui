import React from 'react'
import { Link } from 'react-router-dom';

export const TableEntry = ({ data, connectionId, func }) => (
    <tr>
        <td><Link to={"/connections/" + connectionId + "/tableList/" + data[0] + "/data"}>{data[0]}</Link></td>
        <td>{data[1] ? "collected" : "not collected"}</td>
        <td>
            <button 
                type="button" 
                className="link-button"
                onClick={func}>
                    Collect
            </button>
        </td>
    </tr>
)