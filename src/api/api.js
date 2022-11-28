import axios from 'axios';

const API = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export default API;