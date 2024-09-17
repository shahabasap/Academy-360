import { useDispatch, useSelector } from 'react-redux';
import useRole from'./RoleState';
import ApiController from '../Api/apiCalls';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TeacherData, teacherLogin } from '../features/teacher/teacherSlice';
import { userData, userLogin } from '../features/user/userSlice';
import { FormState } from '../types/commonType';

function useUserData (Role:string):{user:FormState | null,showSidebar:any}{
    const dispatch = useDispatch();
    const role = Role;
    const location = useLocation();
    const navigate = useNavigate();
    const teacher=useSelector(TeacherData)
    const teacherId=teacher._id
    const student=useSelector(userData)
    const studentId =student._id


    const [user, setUser] = useState(null);
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
      if (location.pathname === '/teacher/profile/update-profilo') {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    }, [location.pathname]);
    useEffect(() => {
      setTimeout(() => {
      
      const fetchUserData = async () => {
        
        if (role === "Teacher") {
          console.log("Fetching teacher data");
          const teacher = await ApiController.teacherData(teacherId);
          if (teacher.status === 200) {
            dispatch(teacherLogin(teacher.data));
            setUser(teacher.data);
          } else {
            console.log("Failed to fetch teacher data");
          }
        } else if (role === "Student") {
          const student = await ApiController.studentData(studentId);
          if (student.status === 200) {
            dispatch(userLogin(student.data));
            setUser(student.data);
          } else {
            console.log("Failed to fetch student data");
          }
        }
      };

      fetchUserData().catch(error => {
        console.error("Error fetching user data:", error);
      });
    }, 100);
  }, [role, teacherId, studentId]);
  

    return { user, showSidebar };
};

export default useUserData;
