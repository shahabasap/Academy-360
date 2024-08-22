// ProtectedRoute.tsx
import { selectTeacher } from '../../features/teacher/teacherSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';



const TeacherIsAuth: React.FC = () => {
 const isAuthenticated=useSelector(selectTeacher)

  if (isAuthenticated) {
    return <Navigate to="/teacher/classroom" replace />;
  }
  return <Outlet />;
  
};

export default TeacherIsAuth;
