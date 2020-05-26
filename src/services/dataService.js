import config from 'react-global-configuration'
import { authHeader } from '../helpers/authHeader';
import { userService } from './userService';

export const dataService = {
    getTableList,
    getTableData,
    getDatasources,
    createDatasource,
}

function getTableList(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.get('apiUrl') + 'connections/' + id + '/tables', requestOptions).then(handleResponse);
}

function getTableData(connectionId, table) {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), 'Accept': 'application/json'}
    };

    return fetch(config.get('apiUrl') + 'connections/' + connectionId + '/tables/' + table, requestOptions).then(handleResponse);
}

function getDatasources() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.get('apiUrl') + 'datasource', requestOptions).then(handleResponse);
}

function createDatasource(connectionId, table) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };

    return fetch(config.get('apiUrl') + 'connections/' + connectionId + '/tables/' + table + '/csv', requestOptions).then(handleResponse);
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