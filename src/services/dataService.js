import config from 'react-global-configuration'
import { authHeader } from '../helpers/authHeader';
import { userService } from './userService';

export const dataService = {
    getTableList,
    getTableData,
    getDatasources,
    getDatasourceContent,
    createDatasource,
    uploadDatasource,
    deleteDatasource,
    getColumns,
    getLibraries,
    createLibrary,
    updateLibrary,
    deleteLibrary,
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
    console.debug('get datasource in service')
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.get('apiUrl') + 'datasources', requestOptions).then(handleResponse);
}

function getDatasourceContent(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.get('apiUrl') + 'datasources/' + id + '/content', requestOptions).then(handleTextResponse);
}

function createDatasource(connectionId, table, drawer) {
    console.debug("createDatasource : connectionId ->" + connectionId + " table -> " + table + " drawer -> " + drawer);
    let datasetRequest = {'Drawer': drawer};
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(datasetRequest)
    };

    return fetch(config.get('apiUrl') + 'connections/' + connectionId + '/tables/' + table + '/csv', requestOptions).then(handleResponse);
}

function uploadDatasource(formData) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: formData,
    };

    return fetch(config.get('apiUrl') + 'datasources', requestOptions).then(handleTextResponse); 
}

function deleteDatasource(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return fetch(config.get('apiUrl') + 'datasources/' + id, requestOptions).then(handleTextResponse);
}

function getColumns(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(config.get('apiUrl') + 'datasources/' + id + '/columns', requestOptions).then(handleTextResponse);
}

function getLibraries(includeData) {
    console.debug('data service get');
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(config.get('apiUrl') + 'libraries?includeData=' + includeData, requestOptions).then(handleResponse);
}

function createLibrary(name) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({'Name': name})
    };

    return fetch(config.get('apiUrl') + 'libraries', requestOptions).then(handleResponse);
}

function updateLibrary(library) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(library)
    };

    return fetch(config.get('apiUrl') + 'libraries/' + library.id, requestOptions).then(handleResponse);
}

function deleteLibrary(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return fetch(config.get('apiUrl') + 'libraries/' + id, requestOptions).then(handleTextResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        return handleResponseInternal(response, data);
    });
}

function handleTextResponse(response) {
    return response.text().then(text => {
        const data = text;
        return handleResponseInternal(response, data);
    });
}

function handleResponseInternal(response, data) {
    if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            userService.logout();
         }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data
}