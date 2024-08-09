// ProtectedRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectAdmin } from '../../features/admin/adminSlice';



const AdminProtectRoute: React.FC = () => {
 const isAuthenticated =useSelector(selectAdmin)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectRoute;
