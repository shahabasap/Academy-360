import { useParams, useNavigate } from "react-router-dom";
import NavTransparent from "../../NavTransparent";
import groupimage from '../../../assets/Group.png';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ToastContainer } from 'react-toastify';
import useRole from "../../../hooks/RoleState";

const validationSchema = Yup.object({
  password: Yup.string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/, 'Password must contain letters')
    .matches(/[0-9]/, 'Password must contain numbers'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

interface ResetPasswordProps {
  onSubmit: (values: { password: string; confirmPassword: string; token: string }) => Promise<void>;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onSubmit }) => {
  const { token } = useParams<{ token: string }>(); // Extract token from URL params
  const role = useRole();
  const navigate = useNavigate();

  // Set the initial values with the token from the URL
  const initialValues = { password: '', confirmPassword: '', token: token || '' };

  return (
    <>
      <NavTransparent />
      <div className="flex flex-col md:flex-row md:p-20 items-start justify-start sm:p-8 p-2 lg:-mt-24">
        <ToastContainer />
        
        {/* Logo Section */}
        <div className="logo-pic md:flex-1 md:w-50 md:h-auto md:p-24 hidden md:block">
          <img src={groupimage} alt="Group" />
        </div>

        {/* Reset Password Form Section */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmit({ ...values, token: token || '' })}
        >
          {({ isSubmitting }) => (
            <Form className="flex-1 w-full md:w-50 md:h-auto mt-2 sm:p-6">
              <div className="sm:px-4 md:p-10">
                <div className="flex flex-col border border-black border-opacity-20 self-center px-6 py-8 sm:px-4 sm:py-4 md:p-10">
                  <h1 className="text-center text-[#295782] text-2xl font-bold">
                    {role} Reset Password
                  </h1>
                  
                  <Field
                    className="w-full border border-black border-opacity-20 rounded mt-5 p-2"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                  <Field
                    className="w-full border border-black border-opacity-20 rounded mt-5 p-2"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />

                  <button
                    className="mt-7 bg-[#295782] text-white rounded-md px-4 py-2"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Reset Password
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

export default ResetPassword;
