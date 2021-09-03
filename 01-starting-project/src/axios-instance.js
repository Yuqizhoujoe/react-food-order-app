import axios from 'axios';

const http = axios.create({
    baseURL: 'https://react-http-7f042-default-rtdb.firebaseio.com'
});

export default http;
