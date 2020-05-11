import React from 'react'

export const Connection = ({ data }) => (
    <>
        <td>{data.Name}</td>
        <td>{data.Type}</td>
        <td>{data.DbName}</td>
    </>
)