import { combineReducers } from 'redux'

import connectionsReducer from './connectionsReducer'
import dataReducer from './dataReducer'
import serverReducer from './serverReducer'
import modelReducer from './modelReducer'
import authentication from './authenticationReducer'

const rootReducer = combineReducers({
    connections: connectionsReducer,
    tableList: dataReducer,
    servers: serverReducer,
    models: modelReducer,
    authentication: authentication
})

export default rootReducer