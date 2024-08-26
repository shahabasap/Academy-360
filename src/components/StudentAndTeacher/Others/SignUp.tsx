import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import NavTransparent from '../../NavTransparent';
import groupImg from '../../../assets/Group.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useRole from "../../../hooks/RoleState";

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters'),
  username: Yup.string()
    .trim()
    .email('Invalid email format')
    .required('Username is required'),
  password: Yup.string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/, 'Password must contain letters')
    .matches(/[0-9]/, 'Password must contain numbers'),
  confirmPassword: Yup.string()
    .trim()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  
});

interface SignupProps {
  onSubmit: (values: { name: string; username: string; password: string; confirmPassword: string }) => Promise<void>;
  signinUrl: string;
}

const SignUp: React.FC<SignupProps> = ({ onSubmit, signinUrl }) => {
  const role=useRole()
  const initialValues = { name: '', username: '', password: '', confirmPassword: '' };
  const navigate = useNavigate();

  return (
    <>
      <NavTransparent />
      <div className="flex flex-col md:flex-row md:p-20 items-start justify-start sm:p-8 p-2 lg:-mt-24">
        <ToastContainer />
        {/* Logo Section */}
        <div className="logo-pic md:flex-1 md:w-50 md:h-auto md:p-24 hidden md:block">
          <img src={groupImg} alt="Logo" />
        </div>

        {/* SignUp Form Section */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex-1 w-full md:w-50 md:h-auto mt-2 sm:p-6 ">
              <div className="sm:px-4 md:p-10">
                <div className="flex flex-col border border-black border-opacity-20 self-center px-6 py-8 sm:px-4 sm:py-4 md:p-10">
                  <h1 className="text-center text-[#295782] text-2xl font-bold">
                    {role} Sign Up
                  </h1>
                  <Field
                    className="w-full border border-black border-opacity-20 rounded mt-5 p-2"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                  
                  <Field
                    className="w-full border border-black border-opacity-20 rounded mt-5 p-2"
                    type="text"
                    name="username"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                  
                  <Field
                    className="w-full border border-black border-opacity-20 rounded mt-5 p-2"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  
                  {/* Confirm Password Field */}
                  <Field
                    className="w-full border border-black border-opacity-20 rounded mt-5 p-2"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                  
                  <span className="mt-2">Forgot your password?</span>
                  <button
                    className="mt-7 bg-[#295782] text-white rounded-md px-4 py-2"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </button>
               
                  <div className="flex items-center my-4">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="px-2 text-gray-600">Already have an account?</span>
                    <hr className="flex-grow border-t border-gray-300" />
                  </div>

                  <button className="bg-[#0060FF] text-white rounded-md px-4 py-2" type="button"
                  onClick={() => navigate(signinUrl)}>
                    Login
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignUp;
