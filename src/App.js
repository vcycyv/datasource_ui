import React from 'react'
import { Navbar, Nav} from 'react-bootstrap';
import { Router, Switch, Route } from 'react-router-dom'

import { PrivateRoute } from './components/PrivateRoute';
import { history } from './helpers/history';

import ConnectionsPage from './pages/ConnectionsPage'
import ConnectionPage from './pages/ConnectionPage'
import DataListPage from './pages/DataListPage'
import LoginPage from './pages/LoginPage'
import { userService } from './services/userService'


let App = ({ children }) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Nav className="mr-auto">
                    <Nav.Link href="/connections">Connections</Nav.Link>
                    <Nav.Link href="/dataList">Tables</Nav.Link>
                    <Nav.Link onClick={userService.logout}>Logout</Nav.Link>
                </Nav>
            </Navbar>
            <div>
                {children}
            </div>
        </>
    )
}

export default () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <App>
                    <PrivateRoute exact path="/connections" component={ConnectionsPage} />
                    <PrivateRoute exact path="/connections/:id" component={ConnectionPage} />
                    <PrivateRoute exact path="/dataList" component={DataListPage} />
                </App>
            </Switch>
        </Router>
    )
}