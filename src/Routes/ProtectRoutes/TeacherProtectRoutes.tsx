// ProtectedRoute.tsx
import { selectTeacher } from '../../features/teacher/teacherSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';



const TeacherProtectRoutes: React.FC = () => {
 const isAuthenticated=useSelector(selectTeacher)

  if (!isAuthenticated) {
    return <Navigate to="/teacher" replace />;
  }

  return <Outlet />;
};

export default TeacherProtectRoutes;
