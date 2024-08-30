import axios, { AxiosInstance } from 'axios';

// Create the axios instance outside of any hook or component
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Setup response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
   
    return response;
  },
  (error) => {
   

    if (error.response) {
     

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
          // Redirect to a general error page
          window.location.href = '/error';
      }
    } else {
      // Handle cases where there is no response
      window.location.href = '/error';
    }
    return Promise.reject(error);
  }
);

// Custom hook for API calls
export const useApi = () => {
  return axiosInstance;
};
