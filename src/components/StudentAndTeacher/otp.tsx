import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { userLogin } from "../../features/user/userSlice";
import NavTransparent from "../NavTransparent";
import groupimage from "../../assets/Group.png";
import { teacherLogin } from "../../features/teacher/teacherSlice";

interface OtpProps {
  role: "student" | "teacher";
}

const Otp: React.FC<OtpProps> = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(300); // 5 minutes in seconds
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    // Initialize timer from local storage
    const storedExpiry = localStorage.getItem('otpExpiry');
    if (storedExpiry) {
      const expiryTime = Number(storedExpiry);
      const remainingTime = Math.max(expiryTime - Date.now(), 0);
      setTimer(Math.ceil(remainingTime / 1000));
    }

    // Start timer interval
    const intervalId = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          toast.error("OTP has expired. Please request a new one.");
          handleReset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Store expiry time in local storage
    const expiryTime = Date.now() + timer * 1000;
    localStorage.setItem('otpExpiry', expiryTime.toString());
  }, [timer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { email } = location.state || { email: "" };
      const response = await axios.post(`/api/auth/${role}/verify`, { otp: otp.join(""), email });
      if(role=="student")
      {
        dispatch(userLogin(response.data));
        navigate('/dashboard');
      }else if(role=="teacher")
      {
        dispatch(teacherLogin(response.data));
        navigate('/teacher/dashboard');
      }
    } catch (error) {
      toast.error("OTP is invalid. Please try again.");
      console.log(error);
    }
  };

  const handleReset = () => {
    setOtp(["", "", "", ""]);
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    // Clear timer and local storage
    setTimer(300);
    localStorage.removeItem('otpExpiry');
  };

  return (
    <>
      <NavTransparent />
      <div className="flex flex-col md:flex-row md:p-20 items-start justify-start sm:p-8 p-2 lg:-mt-24">
        <ToastContainer />
        {/* Logo Section */}
        <div className="logo-pic md:flex-1 md:w-50 md:h-auto md:p-24 hidden md:block">
          <img src={groupimage} alt="" />
        </div>

        {/* OTP Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 w-full md:w-50 md:h-auto mt-2 sm:p-6"
        >
          <div className="sm:px-4 md:p-10">
            <div className="flex flex-col border border-black border-opacity-20 self-center px-6 py-8 sm:px-4 sm:py-4 md:p-10 p-8">
              <h1 className="text-center text-[#295782] text-2xl font-bold">
                OTP
              </h1>
              <div className="flex space-x-2 justify-center mt-4">
                {otp.map((_, index) => (
                  <input
                    type="text"
                    className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:border-blue-500"
                    key={index}
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el!)}
                    maxLength={1}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-6 space-x-4">
                <button type="submit" className="bg-[#0060FF] text-white rounded-md px-4 py-2">
                  Verify
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-500 text-white rounded-md px-4 py-2"
                >
                  Reset
                </button>
              </div>
              <div className="text-center mt-4">
                <p>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Otp;
