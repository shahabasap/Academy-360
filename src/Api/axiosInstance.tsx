import axios, { AxiosInstance } from 'axios';

// Create the axios instance outside of any hook or component
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Setup response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Directly return the response if it's successful
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access (e.g., redirect to login page)
          window.location.href = '/login';
          break;
        case 400:
          // Redirect to a specific page for blocked access
          window.location.href = '/blocked';
          break;
        default:
          // For any other status codes, simply return the error response
          return Promise.reject(error);
      }
    } else {
      // Handle cases where there is no response (e.g., network errors)
      console.error('No response received from the server:', error.message);
      return Promise.reject(error);
    }
  }
);

// Custom hook for API calls
export const useApi = () => {
  return axiosInstance;
};
