// ProtectedRoute.tsx
import useUserData from '../../hooks/useUserData ';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { TeacherProfileFormData } from '../../types/commonType';

const TeacherProtectRoutes: React.FC = () => {
  const { user } = useUserData("Teacher");

  if (user) {
    const data = user as TeacherProfileFormData;
    if (!data?.Approvel?.isApproved) {
      return <Navigate to="/teacher/profile/update-profilo" replace />;
    }
  }

  return <Outlet />

};

export default TeacherProtectRoutes;
