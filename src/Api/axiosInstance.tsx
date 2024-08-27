import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api', // Base URL set to '/api', which will be proxied to your backend server
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true

});

axiosInstance.interceptors.request.use(
    (config) => {
      // You can modify the config before the request is sent
      // For example, add a token to the headers
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // Handle the request error
      return Promise.reject(error);
    }
  );