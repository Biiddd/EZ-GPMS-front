import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5174/api'
});

export default http;
