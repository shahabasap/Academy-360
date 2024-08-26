import React from 'react';
import { FaHome, FaUser, FaChalkboardTeacher, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfileSidebar: React.FC = () => {
  return (
    <nav className="h-full bg-white flex flex-col md:fixed border-r border-gray-200 shadow-md">
      <ul className="flex-grow">
        <Link to="/teacher/profile">
          <li className="p-4 hover:bg-purple-600 hover:text-white transition-colors duration-300">
            <div className="flex items-center">
              <FaHome className="mr-3 text-purple-600" />
              <span className="text-gray-700 hover:text-white">Overview</span>
            </div>
          </li>
        </Link>
        <Link to="/teacher/profile/management">
          <li className="p-4 hover:bg-purple-600 hover:text-white transition-colors duration-300">
            <div className="flex items-center">
              <FaUser className="mr-3 text-purple-600" />
              <span className="text-gray-700 hover:text-white">Profile Management</span>
            </div>
          </li>
        </Link>
        <Link to="/teacher/profile/classroom">
          <li className="p-4 hover:bg-purple-600 hover:text-white transition-colors duration-300">
            <div className="flex items-center">
              <FaChalkboardTeacher className="mr-3 text-purple-600" />
              <span className="text-gray-700 hover:text-white">Classrooms</span>
            </div>
          </li>
        </Link>
        
      </ul>
     
    </nav>
  );
};

export default ProfileSidebar;
