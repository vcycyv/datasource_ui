import config from 'react-global-configuration'
import { authHeader } from '../helpers/authHeader';
import { userService } from './userService';

export const modelService = {
    getModels,
    updateModel,
    deleteModel,
    buildModel,
}

function getModels() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(config.get('apiUrl') + 'models', requestOptions).then(handleResponse);
}

function updateModel(model) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(model),
    };

    return fetch(config.get('apiUrl') + 'models/' + model.ID, requestOptions).then(handleResponse);
}

function deleteModel(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    }

    return fetch(config.get('apiUrl') + 'models/' + id, requestOptions).then(handleResponse);
}

function buildModel(modelRequest) {
    console.debug('data service buildmodel');
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(modelRequest),
    };

    return fetch(config.get('apiUrl') + 'models', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
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