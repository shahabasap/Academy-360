import axios, { AxiosResponse } from 'axios';
import DashboardData from '../types/dashboard'
import { ClassroomData } from '../types/commonType';
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

  // Classrooms------------------------------
  async  CreateClassroom(data:ClassroomData): Promise<any> {
    try {
      
      const response: AxiosResponse<any> = await axios.post('/api/teacher/classroom',{data});
      return response;
     
    } catch (error: unknown) {
     
      return error;
    }
  }
  async  FetchTeacherClassrooms(id:string): Promise<any> {
    try {
      
      const response: AxiosResponse<any> = await axios.get(`/api/teacher/classrooms/${id}`);
      return response;
     
    } catch (error: unknown) {
     
      return error;
    }
  }
  async FetchStudentsDataForInvitation (username: string, classroomid: string,page:number,limit:number ): Promise<any> {
    try {
        
      const response = await axios.post('/api/teacher/students', {username:username,
        classroomid:classroomid,
        page:page,
        limit:limit});

        console.log(response)

      return response;
    } catch (error) {
      return error;
    }
  };
  async JoinClassroom (classroomid: string, teacherid: string ): Promise<any> {
    try {
      const response = await axios.post('/api/teacher/joinclassroom', {classroomid, teacherid});
      return response;
    } catch (error) {
      return error;
    }
  };
  

}

  



export default new ApiController();
