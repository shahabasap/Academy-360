// ProtectedRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectAdmin } from '../../features/admin/adminSlice';



const AdminIsAuth: React.FC = () => {
 const isAuthenticated =useSelector(selectAdmin)

  if (isAuthenticated) {    
    return <Navigate to="/admin/dashboard" replace />;
};
  
  return <Outlet />;
}

export default AdminIsAuth;
