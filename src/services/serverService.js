import config from 'react-global-configuration'
import { authHeader } from '../helpers/authHeader'
import { userService } from './userService';

export const serverService = {
    getServers,
    addServer,
    getServer,
    deleteServer,
}

function getServers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.get('apiUrl') + 'servers', requestOptions).then(handleResponse);
}

function addServer(name, url) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({'Name': name, 'Url': url})
    };

    return fetch(config.get('apiUrl') + 'servers', requestOptions).then(handleResponse);
}

function getServer(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.get('apiUrl') + 'servers/' + id, requestOptions).then(handleResponse);
}

async function deleteServer(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    const response = await fetch(config.get('apiUrl') + 'servers/' + id, requestOptions);
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