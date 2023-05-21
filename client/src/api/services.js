import { axiosInstance } from './index';

export const sendMessage = (message) => {
    const payload = {
        question: message,
    };
    return axiosInstance.post('/api/gpt', payload);
}

export const register = ({email, password, apiKey}) => {
    const payload = {
        email,
        password,
        apiKey,
    }

    return axiosInstance.post('/api/users/register', payload);
}

export const signin = ({email, password, apiKey}) => {
    const payload = {
        email,
        password,
        apiKey,
    }

    return axiosInstance.post('/api/users/signin', payload);
}