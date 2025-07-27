// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://devtask-q7m5.onrender.com/', // your backend URL
});

// Interceptor to attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
