import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import { Connection } from '../components/Connection'
import { fetchConnections } from '../actions/connectionsAction'

const ConnectsPage = ({ dispatch, loading, connections, hasErrors }) => {
  useEffect(() => {
    dispatch(fetchConnections())
  }, [dispatch])

  const renderConnections = () => {
    if (loading) return <p>Loading connections...</p>
    if (hasErrors) return <p>Unable to display connections list.</p>
    return connections.map(connection => <Connection key={connection.id} data={connection} />)
  }

  return (
    <section>
      <h1>connect list</h1>
      {renderConnections()}
    </section>
  )
}

const mapStateToProps = state => ({
  loading: state.connections.loading,
  connections: state.connections.connections,
  hasErrors: state.connections.hasErrors,
})

export default connect(mapStateToProps)(ConnectsPage)