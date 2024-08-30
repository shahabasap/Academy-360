import { AxiosResponse } from 'axios';
import DashboardData from '../types/dashboard'
import { ClassroomData } from '../types/commonType';
import { useApi } from './axiosInstance';


class ApiController {

   axiosInstance :any=useApi()


  // Student---------------------------------

  async StudentLogout(): Promise<any> {
    try {
      return await this.axiosInstance.get('/auth/logout');
    } catch (error: unknown) {
     
      return error;
    }
  }

  // Teacher-------------------------------------
  async TeacherLogout(): Promise<any> {
    try {
      return await this.axiosInstance.get('/auth/teacher/logout');
    } catch (error: unknown) {
     
      return error;
    }
  }


  // Admin---------------------------------------------
  async AdminLogout(): Promise<any> {
    try {
      return await this.axiosInstance.get('/auth/admin/logout');
    } catch (error: unknown) {
     
      return error;
    }
  }


  
  async  AdminDashboard(): Promise<any> {
    try {
      const response: AxiosResponse<DashboardData> = await this.axiosInstance.get('/admin/dashboard');
      return response.data;
    } catch (error: unknown) {
     
      return error;
    }
  }

  // Classrooms------------------------------
  async  CreateClassroom(data:ClassroomData): Promise<any> {
    try {
      
      const response: AxiosResponse<any> = await this.axiosInstance.post('/teacher/classroom',{data});
      
      return response;
     
    } catch (error: unknown) {
    
      return error;
    }
  }
  async  FetchTeacherClassrooms(id:string): Promise<any> {
    try {
    
      const response: AxiosResponse<any> = await this.axiosInstance.get(`/teacher/classrooms/${id}`);
      return response;
     
    } catch (error: unknown) {
     
      return error;
    }
  }
  async  FetchStudentClassrooms(id:string): Promise<any> {
    try {
      
      const response: AxiosResponse<any> = await this.axiosInstance.get(`/classrooms/${id}`);
      return response;
     
    } catch (error: unknown) {
     
      return error;
    }
  }
  async FetchStudentsDataForInvitation (username: string, classroomid: string,page:number,limit:number ): Promise<any> {
    try {
        
      const response = await this.axiosInstance.post('/teacher/students', {username:username,
        classroomid:classroomid,
        page:page,
        limit:limit});

       

      return response;
    } catch (error) {
      return error;
    }
  };
  async addStudents (classroomid: string, studentid: string ): Promise<any> {
    try {
        
      const response = await this.axiosInstance.get(`/teacher/addStudent?classroomid=${classroomid}&studentid=${studentid}`);
      return response;
    } catch (error) {
      return error;
    }
  };
  async JoinClassroom (classroomid: string, teacherid: string ): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/teacher/joinclassroom', {classroomid, teacherid});
      return response;
    } catch (error) {
      return error;
    }
  };
  
  async AddClassroomsToStudentBucket (classroomid: string, studentid: string ): Promise<any> {
    try {

      const response = await this.axiosInstance.post('/addClassroom', {classroomid, studentid});
       console.log(response)
      return response;
 
    } catch (error) {
      return error;
    }
  };
  async JoinClassroomStudent (classroomid: string, studentid: string ): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/joinClassroom', {classroomid, studentid});

      return response;
 
    } catch (error) {
      return error;
    }
  };
  

}

  



export default new ApiController();
