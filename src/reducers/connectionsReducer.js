import * as actions from '../actions/connectionsAction'

export const initialState = {
    connections: [],
    loading: false,
    hasErrors: false,
}
  
export default function connectionsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_CONNECTIONS:
            return { ...state, loading: true }
        case actions.GET_CONNECTIONS_SUCCESS:
            return { connections: action.payload, loading: false, hasErrors: false }
        case actions.GET_CONNECTIONS_FAILURE:
            return { ...state, loading: false, hasErrors: true }
        default:
            return state
    }
}