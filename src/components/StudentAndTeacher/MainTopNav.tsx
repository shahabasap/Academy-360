import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import { userLogout } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import doorbellImg from '../../assets/Doorbell.png';
import calendarImg from '../../assets/Calendar Plus.png';
import { teacherLogout } from '../../features/teacher/teacherSlice';
import useRole from "../../hooks/RoleState";


const MainTopNav: React.FC = ({}) => {
  const role =useRole()
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    if(role=="Student")
    {
      dispatch(userLogout())
      // Perform logout logic here
      navigate('/login'); // Redirect to the login page after logout

    }
    else if(role=="Teacher")
    {
      dispatch(teacherLogout())
      // Perform logout logic here
      navigate('/teacher'); // Redirect to the login page after logout


    }


    setIsModalOpen(false);
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='flex flex-row justify-between items-center h-16 w-full border-b-4 border-black border-opacity-5 px-4 sm:px-20'>
        <div className='flex-shrink-0 sm:ml-6'>
          <h1 className='font-bold text-xl '>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {role} Dashboard</h1>
        </div>
        <div className='flex flex-row items-center space-x-4'>
          <img className='w-6 h-auto' src={doorbellImg} alt="Notification" />
          <img className='w-6 h-auto' src={calendarImg} alt="Calendar" />
          <div className='relative'>
            <span
              className='w-11 h-11 border border-[#2E236C] border-opacity-5 rounded-full flex justify-center items-center text-[#2E236C] cursor-pointer'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              A
            </span>
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg'>
                <button
                  className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                  onClick={handleLogout}
                >
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
    </>
  );
};

export default MainTopNav;
