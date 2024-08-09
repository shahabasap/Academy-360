import React, { useState } from 'react';
import doorbell from '../../assets/Doorbell.png';
import ConfirmationModal from './ConfirmationModal'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../features/admin/adminSlice';
import useRole from '../../hooks/RoleState';



const AdminMainTopNav: React.FC = ({}) => {
  const role =useRole()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(adminLogout())
   navigate('/admin')
    setIsModalOpen(false);
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='flex flex-row justify-between items-center h-16 w-full border-b border-[#66608C] px-4 text-white bg-black'>
        <div className='flex-shrink-0'>
          <h1 className='font-bold text-xl'>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {role} Dashboard
          </h1>
        </div>
        <div className='flex flex-row items-center space-x-4'>
          <img className='w-6 h-auto' src={doorbell} alt="Notification" />
          <button
            className='border-2 border-[#66608C] rounded-md px-2 hover:bg-[#2dafe2] hover:text-black hover:text-white'
            onClick={handleLogoutClick}
          >
            Logout
          </button>
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

export default AdminMainTopNav;