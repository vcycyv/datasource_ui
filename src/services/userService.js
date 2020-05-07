import config from 'react-global-configuration'

export const userService = {
    login
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        credentials: 'same-origin'
    };

    return fetch(config.get('apiUrl') + "auth?username=" + username + "&password=" + password, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
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