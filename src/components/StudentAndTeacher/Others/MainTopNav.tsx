import React, { useState, useEffect, useRef } from 'react';
import ConfirmationModal from './ConfirmationModal';
import useRole from '../../../hooks/RoleState';
import ApiController from '../../../Api/apiCalls';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../features/user/userSlice';
import { teacherLogout } from '../../../features/teacher/teacherSlice';
import { FaUser, FaSignOutAlt, FaBell, FaCalendarPlus } from 'react-icons/fa'; // Imported icons
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = useRole();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  const cancelLogout = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(false);
  };

  const confirmLogout = async () => {
    let logoutResponse;

    try {
      if (user === "Student") {
        logoutResponse = await ApiController.StudentLogout();
        dispatch(userLogout());
      } else if (user === "Teacher") {
        logoutResponse = await ApiController.TeacherLogout();
        dispatch(teacherLogout());
      }
      handleLogoutResponse(logoutResponse);
      toast.success('Logout successful!');
    } catch (error) {
      handleLogoutError(error);
      toast.error('Logout failed!');
    }
  };

  const handleLogoutResponse = (response: any) => {
    if (response) {
      console.log("Logout successful:", response.data);
      navigate('/login');
    } else {
      console.log("No response received.");
    }
  };

  const handleLogoutError = (error: any) => {
    console.error("Logout failed:", error);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div className='sticky top-0 flex flex-row justify-between items-center h-16 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 z-10 sm:px-20 shadow-lg'>
        <div className='flex items-center'>
          <img
            className='h-12 w-12 md:h-16 md:w-16'
            src="/src/assets/logo.png"
            alt="Academy-360-logo"
          />
          <div className='flex flex-col ml-4'>
            <h1 className='text-white text-base sm:text-lg md:text-2xl font-extrabold tracking-wide mt-3'>
              ACADEMY 360
            </h1>
            <h3 className='text-white sm:text-[3px] text-sm md:text-base font-light tracking-wide'>
              Empowering Education
            </h3>
          </div>
        </div>

        <div className='flex flex-row items-center space-x-4 md:space-x-6'>
          {/* Show FaBell icon in all sizes */}
          <FaBell className='text-white w-6 h-auto cursor-pointer hover:text-yellow-300 transition-transform duration-300 transform hover:scale-110 ease-in-out' />

          {/* Show FaCalendarPlus in different sizes for different screens */}
          <div className='hidden sm:block md:hidden'>
            <FaCalendarPlus className='text-white w-6 h-auto cursor-pointer hover:text-green-300 transition-transform duration-300 transform hover:scale-110 ease-in-out' />
          </div>
          

          {/* Dropdown menu for smaller screens */}
          <div className='relative' ref={dropdownRef}>
            <span
              className='w-11 h-11 border border-white border-opacity-30 rounded-full flex justify-center items-center text-[#2E236C] cursor-pointer bg-white hover:bg-gray-200 transition-colors duration-300 ease-in-out'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className='font-bold text-lg'>A</span>
            </span>
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl'>
                <button
                  className='flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-300 ease-in-out'
                  onClick={() => {
                    navigate('/teacher/profile');
                    setIsDropdownOpen(false);
                  }}
                >
                  <FaUser className="text-purple-600 opacity-80 font-medium mr-3" />
                  Profile
                </button>
                {/* Show Schedule button only in dropdown on smaller screens */}
                <button
                  className='flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-300 ease-in-out'
                  onClick={() => {
                    navigate('/schedule');
                    setIsDropdownOpen(false);
                  }}
                >
                  <FaCalendarPlus className="text-green-600 opacity-80 font-medium mr-3" />
                  Video Schedules
                </button>
                <button
                  className='flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors duration-300 ease-in-out'
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="text-red-600 opacity-80 font-medium mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />
      
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default Navbar;
