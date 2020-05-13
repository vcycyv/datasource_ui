import { connectionService } from '../services/connectionService';

export const GET_CONNECTIONS = 'GET_CONNECTIONS'
export const GET_CONNECTIONS_SUCCESS = 'GET_CONNECTIONS_SUCCESS'
export const GET_CONNECTIONS_FAILURE = 'GET_CONNECTIONS_FAILURE'

export const DELETE_CONNECTION = 'DELET_CONNECTION'
export const DELETE_CONNECTION_SUCCESS = 'DELET_CONNECTION_SUCCESS'
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

export const deleteConnectionAction = (id) => ({
    type: DELETE_CONNECTION,
    data: id
})

export const deleteConnectionSuccess = () => ({
    type: DELETE_CONNECTION_SUCCESS,
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