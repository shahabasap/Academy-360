import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTransparent from "../../NavTransparent";
import groupimage from "../../assets/Group.png";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRole from "../../../hooks/RoleState";

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
});

interface ForgotPassProps {
  onSubmit: (values: { username: string }) => Promise<void>;
}

const ForgotPassword: React.FC<ForgotPassProps> = ({ onSubmit }) => {
  const [emailSent, setEmailSent] = useState(false);
  const role = useRole();
  const initialValues = { username: "" };
  const navigate = useNavigate();

  const handleFormSubmit = async (values: { username: string }) => {
    try {
      await onSubmit(values);
      setEmailSent(true);
    } catch (error) {
      // The error handling will be managed in the page component
    }
  };

  return (
    <>
      <NavTransparent />
      <div className="flex flex-col md:flex-row items-center justify-center md:p-20 sm:p-8 p-2 lg:-mt-24 min-h-screen bg-gray-50">
        <ToastContainer />
        

        {/* Forgot Password Form Section */}
        <div className="flex-1 w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <h1 className="text-center text-[#295782] text-2xl font-bold mb-6">
                  {role} Forgot Password
                </h1>

                {!emailSent ? (
                  <>
                    <div className="mb-4">
                      <Field
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#295782] transition duration-150"
                        type="text"
                        name="username"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>

                    <button
                      className="w-full mt-4 bg-[#295782] text-white rounded-md py-2 hover:bg-[#1e4766] transition-colors duration-200"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Send Reset Link
                    </button>
                  </>
                ) : (
                  <p className="text-center text-green-500 font-semibold">
                    A reset link has been sent to your email.
                  </p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
