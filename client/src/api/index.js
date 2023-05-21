import axios from 'axios';

const baseURL = 'http://localhost:3001';

const token = localStorage.getItem('token');

export const axiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
});