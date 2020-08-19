import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Router, Switch, Route } from 'react-router-dom'

import { PrivateRoute } from './components/privateRoute';
import { history } from './helpers/history';

import ConnectionsPage from './pages/connectionsPage';
import DrawersPage from './pages/drawersPage';
import DatasetsPage from './pages/datasetsPage';
import DatasourcesPage from './pages/datasourcesPage';
import DatasourceContentPage from './pages/datasourceContentPage';
import LoginPage from './pages/loginPage';
import { userService } from './services/userService';


let App = ({ children }) => {
    return (
        <Container>
            <Navbar bg="light" expand="lg">
                <Nav className="mr-auto">
                    <Nav.Link href="/connections">Connections</Nav.Link>
                    <NavDropdown title="Datasource" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/drawers">Drawer</NavDropdown.Item>
                        <NavDropdown.Item href="/datasets">Dataset</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link onClick={userService.logout}>Logout</Nav.Link>
                </Nav>
            </Navbar>
            <div>
                {children}
            </div>
        </Container>
    )
}

export default () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <App>
                    <PrivateRoute exact path="/connections" component={ConnectionsPage} />
                    <PrivateRoute exact path="/drawers" component={DrawersPage} />
                    <PrivateRoute exact path="/datasets" component={DatasetsPage} />
                    <PrivateRoute exact path="/datasources" component={DatasourcesPage} />
                    <PrivateRoute exact path="/datasources/:datasourceId/content" component={DatasourceContentPage} />
                </App>
            </Switch>
        </Router>
    )
}