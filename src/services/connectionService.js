import config from 'react-global-configuration'
import { authHeader } from '../helpers/authHeader'
import { userService } from './userService'

export const connectionService = {
    getConnections,
    getConnection,
    createConnection,
    updateConnection,
    deleteConnection
}

function getConnections() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.get('apiUrl') + 'connections', requestOptions).then(handleResponse);
}

function getConnection(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.get('apiUrl') + 'connections/' + id, requestOptions).then(handleResponse);
}

async function createConnection(connection) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(connection)
    };

    const response = await fetch(config.get('apiUrl') + 'connections', requestOptions);
    return handleResponse(response);
}

async function updateConnection(connection) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(connection)
    };

    const response = await fetch(config.get('apiUrl') + 'connections/' + connection.id, requestOptions);
    return handleResponse(response);
}

async function deleteConnection(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    const response = await fetch(config.get('apiUrl') + 'connections/' + id, requestOptions);
    return handleResponse(response);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}