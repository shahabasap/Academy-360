// ProtectedRoute.tsx
import { selectTeacher, TeacherData, teacherLogout } from '../../features/teacher/teacherSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';



const TeacherProtectRoutes: React.FC = () => {
 const isAuthenticated=useSelector(selectTeacher)
 const teacher=useSelector(TeacherData)

 const teacherStatus=teacher?.Approvel?.isApproved
  if(teacherStatus==true)
  {
    return <Navigate to="/teacher" replace />;
  }
  else if (!isAuthenticated) {
    return <Navigate to="/teacher" replace />;
  }
  

  return <Outlet />;
};

export default TeacherProtectRoutes;
