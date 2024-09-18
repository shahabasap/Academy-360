

// import useValidateToken from "../hooks/useValidateToken";
import axios, { AxiosInstance } from "axios";
import store from '../app/store'
import { TeacherClassLogout, teacherLogout } from "../features/teacher/teacherSlice";
import { userClassLogout, userLogout } from "../features/user/userSlice";
import { adminLogout } from "../features/admin/adminSlice";

// Custom hook for API calls
export const useApi = (): AxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
  });

  const handleLogout = (role: string): void => {
    switch (role) {
      case "teacher":
        store.dispatch(teacherLogout());
        break;
      case "student":
        store.dispatch(userLogout());
        break;
      case "admin":
        store.dispatch(adminLogout());
        break;
      case "teacher-class":
        store.dispatch(TeacherClassLogout());
        break;
      case "student-class":
        store.dispatch(userClassLogout());
        break;
      default:
        console.warn(`Unhandled role: ${role}`);
    }
  };

  const handleUnauthorized = (): void => {
    window.location.href = '/notAuthorized';

  };

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.error("API Error:", error);

      if (error.response) {
        const { data, status } = error.response;

        if (data?.token === false) {
          handleLogout(data.role);
        }

        if (data?.tokenClass === false) {
          handleLogout(data.role);
        }

        if (data?.valid === false) {
          handleUnauthorized();
        }

        switch (status) {
          case 403:
            console.warn("Forbidden access");
            break;
          case 404:
            console.warn("Resource not found");
            break;
          case 500:
            console.error("Server-side error occurred");
            break;
          default:
            console.warn(`Unknown error (${status})`);
        }
      } else {
        console.error("No server response received:", error.message);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

