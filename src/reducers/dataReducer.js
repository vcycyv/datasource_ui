import * as actions from '../actions/dataAction'

export const initialState = {
    tableList: [],
    datasources: [],
    datasourceContent: "",
    data: [],
    loading: false,
    hasErrors: false,
}
  
export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_TABLE_LIST:
            return { ...state, loading: true }
        case actions.GET_TABLE_LIST_SUCCESS:
            return { ...state, tableList: action.payload, loading: false, hasErrors: false }
        case actions.GET_TABLE_LIST_FAILURE:
            return { ...state, loading: false, hasErrors: true }
        case actions.GET_TABLE_DATA_SUCCESS:
            return { ...state, data: action.payload, loading: false, hasErrors: false }
        case actions.GET_DATASOURCES_SUCCESS:
            return { ...state, datasources: action.payload, loading: false, hasErrors: false }
        case actions.GET_DATASOURCE_CONTENT_SUCCESS:
            return { ...state, datasourceContent: action.payload, loading: false, hasErrors: false }
        default:
            return state
    }
}