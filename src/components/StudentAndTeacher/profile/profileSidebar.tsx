import useRole from "../../../hooks/RoleState";
import React, { useState } from "react";
import { FaHome, FaUser, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileSidebar: React.FC = () => {
  const role = useRole();

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
        <Link to={role === "Teacher" ? "/teacher/profile" : "/profile"}>
          <li className="p-4 hover:bg-purple-600 group transition-colors duration-300">
            <div className="flex items-center">
              <FaHome className="mr-3 text-purple-600 group-hover:text-white" />
              <span
                className={` text-gray-700 group-hover:text-white ${
                  isToggled ? "md:hidden" : "hidden md:block"
                }`}
              >
                Overview
              </span>
            </div>
          </li>
        </Link>
        <Link
          to={
            role === "Teacher"
              ? "/teacher/profile/management"
              : "/profile/management"
          }
        >
          <li className="p-4 hover:bg-purple-600 group transition-colors duration-300">
            <div className="flex items-center">
              <FaUser className="mr-3 text-purple-600 group-hover:text-white" />
              <span
                className={` text-gray-700 group-hover:text-white ${
                  isToggled ? "md:hidden" : "hidden md:block"
                }`}
              >
                Profile Management
              </span>
            </div>
          </li>
        </Link>
        {role === "Teacher" ?
        <Link
          to=
            
              "/teacher/profile/attendance-book"
  
          
        >
          <li className="p-4 hover:bg-purple-600 group transition-colors duration-300">
            <div className="flex items-center">
              <FaUserCheck className="mr-3 text-purple-600 group-hover:text-white" />
              <span
                className={` text-gray-700 group-hover:text-white ${
                  isToggled ? "md:hidden" : "hidden md:block"
                }`}
              >
                Attendace
              </span>
            </div>
          </li>
        </Link> :null}
      </ul>
    </nav>
  );
};

export default ProfileSidebar;
