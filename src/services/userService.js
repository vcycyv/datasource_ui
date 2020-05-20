import config from 'react-global-configuration'
import { history } from '../helpers/history';

export const userService = {
    login,
    logout,
}

function login(username, password) {
    const requestOptions = {
        method: 'POST'
    };

    return fetch(config.get('apiUrl') + "auth?username=" + username + "&password=" + password, requestOptions)
        .then(handleResponse)
        .then(response => {
            let token = response.data
            localStorage.setItem('token', JSON.stringify(token));

            return token;
        });
}

function logout() {
    localStorage.removeItem('token');
    history.push('/login');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}