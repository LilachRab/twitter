import axios from 'axios';
import { Auth } from '../constants';

const token = Auth.token;

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
