import { connectionService } from '../services/connectionService';
import { history } from '../helpers/history';

export const GET_CONNECTIONS = 'GET_CONNECTIONS'
export const GET_CONNECTIONS_SUCCESS = 'GET_CONNECTIONS_SUCCESS'
export const GET_CONNECTIONS_FAILURE = 'GET_CONNECTIONS_FAILURE'

export const GET_CONNECTION = 'GET_CONNECTION'
export const GET_CONNECTION_SUCCESS = 'GET_CONNECTION_SUCCESS'
export const GET_CONNECTION_FAILURE = 'GET_CONNECTION_FAILURE'

export const CREATE_CONNECTION = 'CREATE_CONNECTION'
export const CREATE_CONNECTION_FAILURE = 'CREATE_CONNECTION_FAILURE'

export const UPDATE_CONNECTION = 'UPDATE_CONNECTION'
export const UPDATE_CONNECTION_FAILURE = 'UPDATE_CONNECTION_FAILURE'

export const DELETE_CONNECTION = 'DELET_CONNECTION'
export const DELETE_CONNECTION_FAILURE = 'DELET_CONNECTION_FAILURE'


export const getConnectionsAction = () => ({
    type: GET_CONNECTIONS,
  })
  
export const getConnectionsSuccess = connections => ({
    type: GET_CONNECTIONS_SUCCESS,
    payload: connections,
})

export const getConnectionsFailure = () => ({
    type: GET_CONNECTIONS_FAILURE,
})

export const getConnectionAction = () => ({
    type: GET_CONNECTION,
  })
  
export const getConnectionSuccess = connection => ({
    type: GET_CONNECTION_SUCCESS,
    payload: connection,
})

export const getConnectionFailure = () => ({
    type: GET_CONNECTION_FAILURE,
})

export const createConnectionAction = (connection) => ({
    type: CREATE_CONNECTION,
    payload: connection,
})

export const createConnectionFailure = () => ({
    type: CREATE_CONNECTION_FAILURE,
})

export const updateConnectionAction = (connection) => ({
    type: UPDATE_CONNECTION,
    payload: connection,
})

export const updateConnectionFailure = () => ({
    type: UPDATE_CONNECTION_FAILURE,
})

export const deleteConnectionAction = (id) => ({
    type: DELETE_CONNECTION,
    data: id
})

export const deleteConnectionFailure = () => ({
    type: DELETE_CONNECTION_FAILURE,
})

export function fetchConnections() {
    return async dispatch => {
      dispatch(getConnectionsAction())

      connectionService.getConnections()
            .then(
                connections => { 
                    dispatch(getConnectionsSuccess(connections));
                },
                error => {
                    dispatch(getConnectionsFailure());
                }
            );
    }
}

export function getConnection(id) {
    return async dispatch => {
      dispatch(getConnectionAction())

      connectionService.getConnection(id)
            .then(
                connection => { 
                    dispatch(getConnectionSuccess(connection));
                },
                error => {
                    dispatch(getConnectionFailure());
                }
            );
    }
}

export function createConnection(connection) {
    return async dispatch => {
        connectionService.createConnection(connection)
            .then(
                () => {
                    dispatch(fetchConnections());
                    history.push("/connections")
                },
                error => {
                    dispatch(createConnectionFailure());
                }
            )
    }
}

export function updateConnection(connection) {
    return async dispatch => {
        connectionService.updateConnection(connection)
            .then(
                () => {
                    dispatch(fetchConnections());
                    history.push("/connections")
                },
                error => {
                    dispatch(updateConnectionFailure());
                }
            )
    }
}

export function deleteConnection(id) {
    return async dispatch => {
      dispatch(deleteConnectionAction(id))

      connectionService.deleteConnection(id)
            .then(
                () => { 
                    dispatch(fetchConnections());
                },
                error => {
                    dispatch(deleteConnectionFailure());
                }
            );
    }
}