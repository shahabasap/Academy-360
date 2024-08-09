import { useNavigate } from "react-router-dom";
import NavTransparent from "../NavTransparent";
import groupimage from "../../assets/Group.png";
import google from "../../assets/google.png";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ToastContainer } from 'react-toastify';

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Username is required"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain letters")
    .matches(/[0-9]/, "Password must contain numbers"),
});

interface LoginProps {
  role: string;
  onSubmit: (values: { username: string; password: string }) => Promise<void>;
  signupUrl: string; // New prop for signup URL
}

const Login: React.FC<LoginProps> = ({ role, onSubmit, signupUrl }) => {
  const initialValues = { username: '', password: '' };
  const navigate = useNavigate();

  return (
    <>
      <NavTransparent />
      <div className="flex flex-col md:flex-row md:p-20 items-start justify-start sm:p-8 p-2 lg:-mt-24">
        <ToastContainer />
        {/* Logo Section */}
        <div className="logo-pic md:flex-1 md:w-50 md:h-auto md:p-24 hidden md:block">
          <img src={groupimage} alt="" />
        </div>

        {/* Login Form Section */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex-1 w-full md:w-50 md:h-auto mt-2 sm:p-6">
              <div className="sm:px-4 md:p-10">
                <div className="flex flex-col border border-black border-opacity-20 self-center px-6 py-8 sm:px-4 sm:py-4 md:p-10">
                  <h1 className="text-center text-[#295782] text-2xl font-bold">
                    {role} Login
                  </h1>
                  <Field
                    className="w-full border border-black border-opacity-20 rounded mt-5 p-2"
                    type="text"
                    name="username"
                    placeholder="User name please"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                  <Field
                    className="w-full border border-black border-opacity-20 rounded mt-5 p-2"
                    type="password"
                    name="password"
                    placeholder="Password please"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  <span className="mt-2">Forgot your password?</span>
                  <button
                    className="mt-7 bg-[#295782] text-white rounded-md px-4 py-2"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                  <div className="flex items-center my-4">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="px-2 text-gray-600">Or continue with</span>
                    <hr className="flex-grow border-t border-gray-300" />
                  </div>

                  <button className="bg-black text-white rounded-md flex items-center justify-center px-4 py-2 hover:bg-gray-800 transition-colors duration-300">
                    <img className="w-6 h-6 mr-2" src={google} alt="Google logo" />
                    <span className="text-lg font-medium">Login</span>
                  </button>
                  <div className="flex items-center my-4">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="px-2 text-gray-600">Don't have an account?</span>
                    <hr className="flex-grow border-t border-gray-300" />
                  </div>

                  <button
                    className="bg-[#0060FF] text-white rounded-md px-4 py-2"
                    onClick={() => navigate(signupUrl)}
                  >
                    Signup
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

export default Login;
