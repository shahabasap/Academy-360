
import React from 'react';
import { FaHome, FaUser, FaChalkboardTeacher, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ProfileSidebar: React.FC = () => {
  return (
    <nav className=" h-full bg-[#0000]  flex flex-col md:fixed ">
     
      <ul className="flex-grow">
        <Link to="/teacher/profile">
        <li className="p-4 hover:bg-[#6458ad] hover:text-white">
          <a href="#overview" className="flex items-center">
            <FaHome className="mr-3" /> Overview
          </a>
        </li>
        </Link>
        <Link to="/teacher/profile/management">
        <li className="p-4 hover:bg-[#6458ad] hover:text-white">
          <a href="#profile-management" className="flex items-center">
            <FaUser className="mr-3" /> Profile Management
          </a>
        </li>
        </Link>
        <Link to="/teacher/profile/classroom">
        <li className="p-4 hover:bg-[#6458ad] hover:text-white">
          <a href="#classrooms" className="flex items-center">
            <FaChalkboardTeacher className="mr-3" /> Classrooms
          </a>
        </li>
        </Link>
        
        <li className="p-4 hover:bg-[#6458ad] hover:text-white">
          <a href="#settings" className="flex items-center">
            <FaCog className="mr-3" /> Settings
          </a>
        </li>
      </ul>
      <div className="p-4 border-t border-gray-700 hover:text-white text-center">
        <a href="#logout" className="text-red-500 hover:text-red-400">
          Logout
        </a>
      </div>
    </nav>
  );
};

export default ProfileSidebar;

