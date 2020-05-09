import { userService } from '../services/userService';
import { history } from '../helpers/history';

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE'

export function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                token => { 
                    dispatch(success(token));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(token) { return { type: LOGIN_REQUEST, token } }
    function success(token) { return { type: LOGIN_SUCCESS, token } }
    function failure(token) { return { type: LOGIN_FAILURE, token } }
}