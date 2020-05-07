import { combineReducers } from 'redux'

import connectionsReducer from './connectionsReducer'
import dataReducer from './dataReducer'
import authentication from './authenticationReducer'

const rootReducer = combineReducers({
    connections: connectionsReducer,
    dataList: dataReducer,
    authentication: authentication
})

export default rootReducer