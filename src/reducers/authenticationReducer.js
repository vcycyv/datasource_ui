import * as actions from '../actions/userAction'

let token = JSON.parse(localStorage.getItem('token'));
const initialState = token ? { loggedIn: true, token } : {};

export default function authentication(state = initialState, action) {
    switch (action.type) {
      case actions.LOGIN_REQUEST:
        return {
          loggingIn: true,
          token: action.token
        };
      case actions.LOGIN_SUCCESS:
        return {
          loggedIn: true,
          token: action.token
        };
      case actions.LOGIN_FAILURE:
        return {};
      default:
        return state
    }
  }