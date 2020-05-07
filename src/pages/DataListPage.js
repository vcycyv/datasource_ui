import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchConnections } from '../actions/connectionsAction'
import { Data } from '../components/Data'

const DataListPage = ({ dispatch, loading, dataList, hasErrors }) => {
  useEffect(() => {
    dispatch(fetchConnections())
  }, [dispatch])

  const renderDataList = () => {
    if (loading) return <p>Loading data...</p>
    if (hasErrors) return <p>Unable to display data list.</p>
    return dataList.map(data => <Data key={data.id} data={data} />)
  }

  return (
    <section>
      <h1>data list</h1>
      {renderDataList()}
    </section>
  )
}

const mapStateToProps = state => ({
  loading: state.dataList.loading,
  dataList: state.dataList.dataList,
  hasErrors: state.dataList.hasErrors,
})

export default connect(mapStateToProps)(DataListPage)