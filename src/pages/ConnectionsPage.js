import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { Connection } from '../components/Connection'
import { fetchConnections } from '../actions/connectionsAction'

const ConnectsPage = ({ dispatch, loading, connections, hasErrors }) => {
    useEffect(() => {
        dispatch(fetchConnections())
    }, [dispatch])

    const renderConnections = () => {
        if (loading) return <p>Loading connections...</p>
        if (hasErrors) return <p>Unable to display connections list.</p>
        return (
            <>
                <Link to={`/connections/new`}>Create</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Data Base</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {connections.map(connection => <Connection key={connection.id} data={connection} />)}
                    </tbody>
                </table>
            </>)
    }
    

    return (<div>{renderConnections()}</div>)
}


const mapStateToProps = state => ({
    loading: state.connections.loading,
    connections: state.connections.connections,
    hasErrors: state.connections.hasErrors,
})

export default connect(mapStateToProps)(ConnectsPage)