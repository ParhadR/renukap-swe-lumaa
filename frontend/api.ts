import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // or a fallback: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
