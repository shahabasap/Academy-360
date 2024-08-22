import { useNavigate, Link } from "react-router-dom";
import NavTransparent from "../NavTransparent";
import groupimage from "../../assets/Group.png";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import{gapi} from 'gapi-script'
import { useEffect } from "react";
import axios from 'axios';
import useRole from "../../hooks/RoleState";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from "react-redux";
import { userLogin } from "../../features/user/userSlice";
import { teacherLogin } from "../../features/teacher/teacherSlice";
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
  onSubmit: (values: { username: string; password: string }) => Promise<void>;
  signupUrl: string;
  forgotpassURL: string;
}
interface GoogleCredential {
  
  email: string;
  email_verified: boolean;
  name: string;
  
}

const Login: React.FC<LoginProps> = ({ onSubmit, signupUrl, forgotpassURL }) => {
  const role = useRole();
  const navigate = useNavigate();
  const clientId = '997785840858-98tge9f5fb548ukv3sh2mb646dpq594b.apps.googleusercontent.com'
  const dispatch=useDispatch()
 

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
 
    if (credentialResponse.credential) {
      const decodedCredential: GoogleCredential = jwtDecode(credentialResponse.credential);
      const data={
        username:decodedCredential.email,
        name:decodedCredential.name,
        
      }
      try {
        const response=await axios.post('/api/auth/google-signin',{data,role})
      
      
      if(role=="Student")
      {
        dispatch(userLogin(response.data))
        navigate('/dashboard')

      }else if(role=="Teacher")
      {
         dispatch(teacherLogin(response.data))
         navigate('/teacher/dashboard')
      }
        
      } catch (error:any) {
         toast.error(`${error.response.data.error}`)
        
         
      }
      
    }
  };

  const handleGoogleError = () => {
    console.error('Google Sign-In Error');
  };

  return (
    <>
      <NavTransparent />
      <div className="flex flex-col md:flex-row md:p-20 items-start justify-start sm:p-8 p-2 lg:-mt-24">
        <ToastContainer />
        <div className="logo-pic md:flex-1 md:w-50 md:h-auto md:p-24 hidden md:block">
          <img src={groupimage} alt="" />
        </div>

        <Formik
          initialValues={{ username: '', password: '' }}
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
                    placeholder="Username"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                  <Field
                    className="w-full border border-black border-opacity-20 rounded mt-5 p-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  <Link to={forgotpassURL}>
                    <span className="mt-2">Forgot your password?</span>
                  </Link>
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

                  <GoogleLogin width={500}
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
              />
                  <div className="flex items-center my-4">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="px-2 text-gray-600">Don't have an account?</span>
                    <hr className="flex-grow border-gray-300" />
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
