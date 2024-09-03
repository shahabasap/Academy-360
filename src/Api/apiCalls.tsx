import { AxiosResponse } from 'axios';
import DashboardData from '../types/dashboard'
import { ClassroomData, StudentProfileFormData, TeacherProfileFormData } from '../types/commonType';
import { useApi } from './axiosInstance';
import {Teacher} from '../types/commonType'
import axios from 'axios'
import convertToFormData from '../utils/formdataConverter';



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
  async editStudentProfile(studentId: string, formData: FormData): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.put(`/profile/${studentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error: unknown) {
      return error;
    }
  }
  async updateStudentProfile(formData:FormData,studentid:string): Promise<any> {
    try {
   
      const response: AxiosResponse<any> = await this.axiosInstance.put(`/profile/${studentid}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch teachers. Please try again later.');
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
  async  AdminLogin(values:{ username: string; password: string }): Promise<any> {
    try {
      const response: AxiosResponse<DashboardData> = await this.axiosInstance.post('/auth/admin/login', values);
      return response.data;
    } catch (error: unknown) {
     
      return error;
    }
  }
  // Admin: Fetch Students
  async fetchStudents(page: number, pageSize: number): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.get(`/admin/students?page=${page}&pageSize=${pageSize}`);
      return response;
    } catch (error: unknown) {
      return error;
    }
  }

  // Admin: Block Student
  async blockStudent(studentId: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.put(`/admin/student-block/${studentId}`);
      return response;
    } catch (error: unknown) {
      return error;
    }
  }

  // Admin: Unblock Student
  async unblockStudent(studentId: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.put(`/admin/student-unblock/${studentId}`);
      return response;
    } catch (error: unknown) {
      return error;
    }
  }

// Teacher---------------------------------
async editTeacherProfile(teacherId: string, Data: any): Promise<any> {
  console.log(Data);
  
    try {
    console.log("Starting API call to update teacher profile with ID:", teacherId);
    
    const formData =await convertToFormData(Data);

   
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
  };
      
    // Ensure the Axios instance is properly configured
    const response: AxiosResponse<any> = await this.axiosInstance.post(
      `/teacher/profile/${teacherId}`, 
      formData,
    );
    
    console.log("API response received:", response);
    return response;
  } catch (error: any) {
    console.error("API call failed:", error);

    // You might want to throw the error or return a specific error object
    throw new Error(error.response?.data?.message || "Unknown error occurred");
  }
}



  async fetchTeachers(page: number, limit: number): Promise<{ data: Teacher[], totalPages: number }> {
    try {
      const response: AxiosResponse<{ data: Teacher[], totalPages: number }> = await this.axiosInstance.get(`/admin/teachers`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch teachers. Please try again later.');
    }
  }
  async updateTeacherProfile(formData:FormData,teacherid:string): Promise<any> {
    try {
      console.log("id",teacherid)
      console.log("forma",formData)
      const response: AxiosResponse<any> = await this.axiosInstance.put(`/teacher/profile/${teacherid}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch teachers. Please try again later.');
    }
  }
 
  async blockTeacher(id: string): Promise<void> {
    try {
      await this.axiosInstance.put(`/admin/teacher-block/${id}`);
    } catch (error) {
      throw new Error('Failed to block the teacher. Please try again later.');
    }
  }

  async unblockTeacher(id: string): Promise<void> {
    try {
      await this.axiosInstance.put(`/admin/teacher-unblock/${id}`);
    } catch (error) {
      throw new Error('Failed to unblock the teacher. Please try again later.');
    }
  }

  
  

  // Classrooms------------------------------
  async  fetchClassrooms(page: number, pageSize: number): Promise<any> {
    try {
      
      const response: AxiosResponse<any> = await this.axiosInstance.get(`/admin/classrooms?page=${page}&pageSize=${pageSize}`);
       
      return response.data;
     
    } catch (error: unknown) {
    
      return error;
    }
  }
  async  blockClassroom(classroomid:string): Promise<any> {
    try {
     
      
      const response: AxiosResponse<any> = await this.axiosInstance.patch(`/admin/classroom-block/${classroomid}`);
      return response;
     
    } catch (error: unknown) {
    
      return error;
    }
  }
  async  unblockClassroom(classroomid:string): Promise<any> {
    try {
      
      const response: AxiosResponse<any> = await this.axiosInstance.patch(`/admin/classroom-unblock/${classroomid}`);
      
      return response;
     
    } catch (error: unknown) {
    
      return error;
    }
  }
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
