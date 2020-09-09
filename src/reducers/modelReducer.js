import * as actions from '../actions/modelAction'

export const initialState = {
    models: [],
    loading: false,
    hasErrors: false,
}
  
export default function serverReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_MODELS_SUCCESS:
            return { ...state, models: action.payload, loading: false, hasErrors: false }
        case actions.GET_MODELS_FAILURE:
            return { ...state, loading: false, hasErrors: true }
        default:
            return state
    }
}