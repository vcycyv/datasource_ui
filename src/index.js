import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import config from 'react-global-configuration'

// Local imports
import App from './App'
import rootReducer from './reducers'

// Assets
import './index.css'

config.set({ apiUrl: 'http://localhost:8000/' });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)