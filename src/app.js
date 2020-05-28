import React from 'react'
import { Navbar, Nav} from 'react-bootstrap';
import { Router, Switch, Route } from 'react-router-dom'

import { PrivateRoute } from './components/privateRoute';
import { history } from './helpers/history';

import ConnectionsPage from './pages/connectionsPage'
import ConnectionPage from './pages/connectionPage'
import TableListPage from './pages/tableListPage'
import TableDataPage from './pages/tableDataPage'
import DatasourcesPage from './pages/datasourcesPage'
import DatasourceContentPage from './pages/datasourceContentPage'
import LoginPage from './pages/loginPage'
import { userService } from './services/userService'


let App = ({ children }) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Nav className="mr-auto">
                    <Nav.Link href="/connections">Connections</Nav.Link>
                    <Nav.Link href="/datasources">Tables</Nav.Link>
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
                    <PrivateRoute exact path="/connections/:connectionId/tableList" component={TableListPage} />
                    <PrivateRoute exact path="/connections/:connectionId/tableList/:table/data" component={TableDataPage} />
                    <PrivateRoute exact path="/datasources" component={DatasourcesPage} />
                    <PrivateRoute exact path="/datasources/:datasourceId/content" component={DatasourceContentPage} />
                </App>
            </Switch>
        </Router>
    )
}