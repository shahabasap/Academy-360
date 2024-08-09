
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SignUp from '../../components/StudentAndTeacher/SignUp';


// Student SignUp Page
const StudentSignUpPage = () => {
    const navigate = useNavigate();
  
    const handleStudentSignUp = async (values: { name: string; username: string; password: string }) => {
      try {
        const response = await axios.post('/api/auth/register', values);
        await axios.post('/api/auth/otp', { email: response.data.username });
        navigate('/verify', { state: { email: values.username } });

      } catch (error) {
        toast.error("Registration failed. Please try again.");
        console.error(error);
      }
    };
  
    return <SignUp role="Student" onSubmit={handleStudentSignUp} signinUrl="/student/login" />;
  };

  export default StudentSignUpPage