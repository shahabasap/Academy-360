import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

// Create the axios instance outside of any hook or component
const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Custom hook for API calls
export const useApi = () => {
  const navigate = useNavigate();

  // Setup response interceptor
  const setupInterceptors = useCallback(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        console.log("is working...........");
        return response;
      },
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              navigate('/login');
              break;
            case 400:
              navigate('/blocked');
              break;
            default:
              navigate('/error');
          }
        } else {
          navigate('/error');
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);

  // Call setupInterceptors when the hook is used
  setupInterceptors();
   return axiosInstance

};

// Usage in a component
// function MyComponent() {
//   const { fetchTeacherClassrooms } = useApi();
//
//   // Use fetchTeacherClassrooms here
// }