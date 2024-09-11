import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { adminLogin } from '../../features/admin/adminSlice';
import AdminLogin from "../../components/Admin/login";  // Updated import path
import ApiController from '../../Api/apiCalls'

const AdminLoginPage: React.FC = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      const adminData = await ApiController.AdminLogin(values)
      dispatch(adminLogin(adminData.data));
      localStorage.setItem('role','admin'); 
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return <AdminLogin onSubmit={handleSubmit} />;
};

export default AdminLoginPage;
