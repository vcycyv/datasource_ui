import * as actions from '../actions/dataAction'

export const initialState = {
    dataList: [],
    loading: false,
    hasErrors: false,
}
  
export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_DATA_LIST:
            return { ...state, loading: true }
        case actions.GET_DATA_LIST_SUCCESS:
            return { dataList: action.payload, loading: false, hasErrors: false }
        case actions.getDataListFailure:
            return { ...state, loading: false, hasErrors: true }
        default:
            return state
    }
}