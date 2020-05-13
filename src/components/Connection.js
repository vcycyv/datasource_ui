import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deleteConnection } from '../actions/connectionsAction'

export const Connection = ({ data }) => {
    const dispatch = useDispatch()
    return (
        <tr key={data.id}>
            <td>{data.Name}</td>
            <td>{data.Type}</td>
            <td>{data.DbName}</td>
            <td>
                <div>
                    <Link to={`/connections/${data.id}`}>Edit</Link>
                    <button 
                        type="button" 
                        className="link-button" 
                        onClick={() => dispatch(deleteConnection(`${data.id}`))}>
                            Delete
                    </button>
                </div>
            </td>
        </tr>
    )
}