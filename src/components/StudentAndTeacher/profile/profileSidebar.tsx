import React, { useState } from 'react';
import { FaHome, FaUser, FaChalkboardTeacher,FaAlignJustify } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfileSidebar: React.FC = () => {

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <nav className="bg-white flex flex-col md:fixed h-full fixed left-0 border-r border-gray-200 shadow-md">
      <ul className="flex-grow">
      {/* <li className="p-4 hover:bg-purple-600 group transition-colors duration-300" onClick={handleToggle}>
            <div className="flex items-center">
              <FaAlignJustify className="mr-3 text-purple-600 group-hover:text-white" />
            </div>
          </li> */}
        <Link to="/teacher/profile">
          <li className="p-4 hover:bg-purple-600 group transition-colors duration-300">
            <div className="flex items-center">
              <FaHome className="mr-3 text-purple-600 group-hover:text-white" />
              <span className={` text-gray-700 group-hover:text-white ${isToggled ? 'md:hidden':'hidden md:block' }`}>Overview</span>
            </div>
          </li>
        </Link>
        <Link to="/teacher/profile/management">
          <li className="p-4 hover:bg-purple-600 group transition-colors duration-300">
            <div className="flex items-center">
              <FaUser className="mr-3 text-purple-600 group-hover:text-white" />
              <span className={` text-gray-700 group-hover:text-white ${isToggled ? 'md:hidden':'hidden md:block' }`}>Profile Management</span>
            </div>
          </li>
        </Link>
        <Link to="/teacher/profile/classroom">
          <li className="p-4 hover:bg-purple-600 group transition-colors duration-300">
            <div className="flex items-center">
              <FaChalkboardTeacher className="mr-3 text-purple-600 group-hover:text-white" />
              <span className={` text-gray-700 group-hover:text-white ${isToggled ? 'md:hidden':'hidden md:block' }`}>Classrooms</span>
            </div>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default ProfileSidebar;
