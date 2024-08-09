import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SignUp from '../../components/StudentAndTeacher/SignUp';

// Teacher SignUp Page
const TeacherSignUpPage = () => {
  const navigate = useNavigate();

  const handleTeacherSignUp = async (values: { name: string; username: string; password: string }) => {
    try {
      const response = await axios.post('/api/auth/teacher/register', values);
      await axios.post('/api/auth/otp', { email: response.data.username });
      navigate('/teacher/verify', { state: { email: values.username } });
  
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return <SignUp  onSubmit={handleTeacherSignUp} signinUrl="/teacher/login" />;
};


export default TeacherSignUpPage