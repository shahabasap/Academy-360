import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Username is required'),
  password: Yup.string().trim().required('Password is required'),
});

interface LoginProps {
  onSubmit: (values: { username: string; password: string }) => Promise<void>;
}

const AdminLogin: React.FC<LoginProps> = ({ onSubmit }) => {
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col items-center justify-center space-y-8">
      <ToastContainer />
      <div className="text-center">
        <h1 className="text-[#2dafe2] text-2xl font-bold">ACADEMY 360</h1>
        <h3 className="text-[#e0dfe2] font-light">We are the best</h3>
      </div>
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg">
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******************"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </Form>
          )}
        </Formik>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
