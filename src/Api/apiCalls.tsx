import axios, { AxiosResponse } from 'axios';
import DashboardData from '../types/dashboard'
class ApiController {

  // Student---------------------------------

  async StudentLogout(): Promise<AxiosResponse | undefined> {
    try {
      return await axios.get('/api/auth/logout');
    } catch (error: unknown) {
      console.error('Logout failed:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
      return undefined;
    }
  }

  // Teacher-------------------------------------
  async TeacherLogout(): Promise<AxiosResponse | undefined> {
    try {
      return await axios.get('/api/auth/teacher/logout');
    } catch (error: unknown) {
      console.error('Logout failed:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
      return undefined;
    }
  }


  // Admin---------------------------------------------
  async AdminLogout(): Promise<AxiosResponse | undefined> {
    try {
      return await axios.get('/api/auth/admin/logout');
    } catch (error: unknown) {
      console.error('Logout failed:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
      return undefined;
    }
  }


  
  async  AdminDashboard(): Promise<DashboardData | undefined> {
    try {
      const response: AxiosResponse<DashboardData> = await axios.get('/api/admin/dashboard');
      return response.data;
    } catch (error: unknown) {
      console.error('Failed to fetch dashboard data:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
      return undefined;
    }
  }
}



export default new ApiController();
