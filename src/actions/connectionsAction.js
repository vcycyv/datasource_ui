export const GET_CONNECTIONS = 'GET CONNECTIONS'
export const GET_CONNECTIONS_SUCCESS = 'GET_CONNECTIONS_SUCCESS'
export const GET_CONNECTIONS_FAILURE = 'GET_CONNECTIONS_FAILURE'

export const getConnections = () => ({
    type: GET_CONNECTIONS,
  })
  
export const getConnectionsSuccess = connections => ({
type: GET_CONNECTIONS_SUCCESS,
payload: connections,
})

export const getConnectionsFailure = () => ({
type: GET_CONNECTIONS_FAILURE,
})

export function fetchConnections() {
    return async dispatch => {
      dispatch(getConnections())
  
      try {
        const response = await fetch('http://localhost:8000/connections')
        const data = await response.json()
  
        dispatch(getConnectionsSuccess(data))
      } catch (error) {
        dispatch(getConnectionsFailure())
      }
    }
  }