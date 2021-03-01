import { serverService } from '../services/serverService';
import { history } from '../helpers/history';

export const GET_SERVERS_SUCCESS = 'GET_SERVERS_SUCCESS'
export const GET_SERVERS_FAILURE = 'GET_SERVERS_FAILURE'
export const GET_SERVER_SUCCESS = 'GET_SERVER_SUCCESS'
export const CREATE_SERVER = 'CREATE_SERVER'
export const CREATE_Server_FAILURE = 'CREATE_Server_FAILURE'
export const DELETE_SERVER = 'DELETE_SERVER'
export const DELETE_SERVER_FAILURE = 'DELETE_SERVER_FAILURE'

export const getServerListSuccess = serverList => ({
    type: GET_SERVERS_SUCCESS,
    payload: serverList,
})

export const getServerListFailure = () => ({
    type: GET_SERVERS_FAILURE,
})

export const createServerAction = (server) => ({
    type: CREATE_SERVER,
    payload: server,
})

export const createServerFailure = () => ({
    type: CREATE_Server_FAILURE,
})

export const deleteServerAction = (id) => ({
    type: DELETE_SERVER,
    data: id
})

export const deleteServerFailure = () => ({
    type: DELETE_SERVER_FAILURE,
})

export function fetchServers() {
    return async dispatch => {
        serverService.getServers()
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

export function createServer(server) {
    return async dispatch => {
        console.log('in createServer():' + server.Name);
        serverService.addServer(server)
            .then(
                () => {
                    dispatch(fetchServers());
                    history.push("/servers")
                },
                error => {
                    dispatch(createServerFailure());
                }
            )
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