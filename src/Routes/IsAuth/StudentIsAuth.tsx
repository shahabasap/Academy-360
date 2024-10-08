// ProtectedRoute.tsx
import { selectUser } from '../../features/user/userSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';




const StudentIsAuth: React.FC = () => {
 const isAuthenticated=useSelector(selectUser)

  if (isAuthenticated ) {
    return <Navigate to="/classroom" replace />;
    
  }
  return <Outlet />;

 
};

export default StudentIsAuth;
