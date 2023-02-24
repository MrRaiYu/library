import axios from 'axios';

axios.interceptors.response.use(res => res.data);