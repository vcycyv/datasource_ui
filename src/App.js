import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'

import { PrivateRoute } from './components/PrivateRoute';
import { history } from './helpers/history';

import ConnectionsPage from './pages/ConnectionsPage'
import ConnectionPage from './pages/ConnectionPage'
import DataListPage from './pages/DataListPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/connections" component={ConnectionsPage} />
        <PrivateRoute exact path="/connections/:id" component={ConnectionPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dataList" component={DataListPage} />
        <Redirect from="*" to="/connections" />
      </Switch>
    </Router>
  )
}

export default App