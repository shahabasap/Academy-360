import React from "react";
import {
  FaFileAlt,
  FaComments,
  FaGraduationCap,
  FaBookOpen,
  FaBriefcase,
  FaBullhorn,
} from "react-icons/fa";

const MainSideNav = () => {
  return (
    <div className="flex flex-col   transition-transform duration-300 ease-in-out">
      {/* Navigation links for larger screens */}
      <div className="hidden md:flex  flex-col  h-full fixed left-0 ">
        <div className="bg-white p-4 h-full mt-5">
          <ul className="mt-4 space-y-4">
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-purple-100 p-2 rounded-md transition-all duration-200">
              <FaFileAlt className="h-5 w-5 text-purple-600" />
              <span className="text-gray-700 font-medium hover:text-purple-700">
                Summary
              </span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-purple-100 p-2 rounded-md transition-all duration-200">
              <FaComments className="h-5 w-5 text-purple-600" />
              <span className="text-gray-700 font-medium hover:text-purple-700">
                Chats
              </span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-purple-100 p-2 rounded-md transition-all duration-200">
              <FaGraduationCap className="h-5 w-5 text-purple-600" />
              <span className="text-gray-700 font-medium hover:text-purple-700">
                Exams
              </span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-purple-100 p-2 rounded-md transition-all duration-200">
              <FaBookOpen className="h-5 w-5 text-purple-600" />
              <span className="text-gray-700 font-medium hover:text-purple-700">
                Materials
              </span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-purple-100 p-2 rounded-md transition-all duration-200">
              <FaBriefcase className="h-5 w-5 text-purple-600" />
              <span className="text-gray-700 font-medium hover:text-purple-700">
                Works
              </span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-purple-100 p-2 rounded-md transition-all duration-200">
              <FaBullhorn className="h-5 w-5 text-purple-600" />
              <span className="text-gray-700 font-medium hover:text-purple-700">
                Announcements
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom icons for smaller screens */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 flex justify-around md:hidden">
        <FaFileAlt className="h-5 w-5 text-white hover:text-yellow-300 transition-transform duration-300 transform hover:scale-110 ease-in-out" />
        <FaComments className="h-5 w-5 text-white hover:text-green-300 transition-transform duration-300 transform hover:scale-110 ease-in-out" />
        <FaGraduationCap className="h-5 w-5 text-white hover:text-yellow-300 transition-transform duration-300 transform hover:scale-110 ease-in-out" />
        <FaBookOpen className="h-5 w-5 text-white hover:text-green-300 transition-transform duration-300 transform hover:scale-110 ease-in-out" />
        <FaBriefcase className="h-5 w-5 text-white hover:text-yellow-300 transition-transform duration-300 transform hover:scale-110 ease-in-out" />
        <FaBullhorn className="h-5 w-5 text-white hover:text-green-300 transition-transform duration-300 transform hover:scale-110 ease-in-out" />
      </div>
    </div>
  );
};

export default MainSideNav;
