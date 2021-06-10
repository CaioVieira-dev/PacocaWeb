import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:4000/'
    baseURL: 'http://192.168.0.109:4000/'
})

export default api;