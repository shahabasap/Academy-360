// ProtectedRoute.tsx
import { selectUser } from '../../features/user/userSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';




const StudentProtectRoute: React.FC = () => {
 const isAuthenticated=useSelector(selectUser)

  if (!isAuthenticated ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default StudentProtectRoute;
