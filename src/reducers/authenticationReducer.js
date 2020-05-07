import * as actions from '../actions/userAction'

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default function authentication(state = initialState, action) {
    switch (action.type) {
      case actions.LOGIN_REQUEST:
        return {
          loggingIn: true,
          user: action.user
        };
      case actions.LOGIN_SUCCESS:
        return {
          loggedIn: true,
          user: action.user
        };
      case actions.LOGIN_FAILURE:
        return {};
      default:
        return state
    }
  }