import { serverService } from '../services/serverService';

export const GET_SERVERS_SUCCESS = 'GET_SERVERS_SUCCESS'
export const GET_SERVERS_FAILURE = 'GET_SERVERS_FAILURE'
export const GET_SERVER_SUCCESS = 'GET_SERVER_SUCCESS'
export const DELETE_SERVER = 'DELETE_SERVER'
export const DELETE_SERVER_FAILURE = 'DELETE_SERVER_FAILURE'

export const getServerListSuccess = serverList => ({
    type: GET_SERVERS_SUCCESS,
    payload: serverList,
})

export const getServerListFailure = () => ({
    type: GET_SERVERS_FAILURE,
})

export const deleteServerAction = (id) => ({
    type: DELETE_SERVER,
    data: id
})

export const deleteServerFailure = () => ({
    type: DELETE_SERVER_FAILURE,
})

export function fetchServers(id) {
    return async dispatch => {
        serverService.getServers(id)
      .then(
          data => { 
              dispatch(getServerListSuccess(data));
          },
          error => {
              dispatch(getServerListFailure());
          }
      );
    }
  }

export function deleteServer(id) {
    return async dispatch => {
      dispatch(deleteServerAction(id))

      serverService.deleteServer(id)
            .then(
                () => { 
                    dispatch(fetchServers());
                },
                error => {
                    dispatch(deleteServerFailure());
                }
            );
    }
}