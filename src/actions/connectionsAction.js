import { connectionService } from '../services/connectionService';

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

      connectionService.getConnections()
            .then(
                user => { 
                    dispatch(getConnectionsSuccess(user));
                },
                error => {
                    dispatch(getConnectionsFailure());
                }
            );
    }
}