import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'

import { PrivateRoute } from './components/PrivateRoute';
import { history } from './helpers/history';

import ConnectsPage from './pages/ConnectsPage'
import DataListPage from './pages/DataListPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={ConnectsPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dataList" component={DataListPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  )
}

export default App