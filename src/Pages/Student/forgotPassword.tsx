import ForgotPassword from '../../components/StudentAndTeacher/Others/ForgotPassword';
import React from 'react';
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const handleRecoverEmail = async (values: { username: string }) => {
    try {
      const response = await axios.post('/api/auth/forgotpassword', values);
      toast.success("Reset link sent successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.", {
        position: "top-center",
      });
    }
  };

  return <ForgotPassword onSubmit={handleRecoverEmail} />;
};

export default ForgotPasswordPage;
