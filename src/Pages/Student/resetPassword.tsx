import ResetPassword from '../../components/StudentAndTeacher/ResetPassword'
import React from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ResetPasswordStudent = () => {
    const navigate=useNavigate()


  const handleResetPassword = async (values: { password: string; confirmPassword: string,token:string }) => {
    try {
    
      const response = await axios.post('/api/auth/reset-password', {
        token:values.token,
        newPassword: values.password,
      });
      toast.success("Password reset successfully!", {
        position: "top-center",
      });
  

    } catch (error) {
        toast.error("Password reset went wrong!", {
            position: "top-center",
          });
   
    }
  };

    return <ResetPassword onSubmit={handleResetPassword} />
}

export default ResetPasswordStudent
