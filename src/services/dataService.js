import config from 'react-global-configuration'
import { authHeader } from '../helpers/authHeader';

export const dataService = {
    getDataList,
    getData
}

function getDataList(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.get('apiUrl') + 'connections/' + id + '/tables', requestOptions).then(handleResponse);
}

function getData(connectionId, table) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.get('apiUrl') + 'connections/' + connectionId + '/tables/' + table, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}