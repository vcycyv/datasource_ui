import * as actions from '../actions/serverAction'

export const initialState = {
    servers: [],
    server: {},
    loading: false,
    hasErrors: false,
}
  
export default function serverReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_SERVERS_SUCCESS:
            return { ...state, servers: action.payload, loading: false, hasErrors: false }
        case actions.GET_SERVERS_FAILURE:
            return { ...state, loading: false, hasErrors: true }
        case actions.GET_SERVER_SUCCESS:
            return { ...state, server: action.payload}
        default:
            return state
    }
}