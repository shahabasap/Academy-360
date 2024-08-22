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
    <div className=" flex flex-col md:w-72  transition-transform duration-300 ease-in-out ">
      

      {/* Navigation links for larger screens */}
      <div className="hidden  md:flex flex-col  p-6 pr-10  h-full fixed left-0 border-r-2 border-[#000000] border-opacity-10">
        <div className="bg-white  p-4 h-full mt-5">
          <ul className="mt-4 space-y-4">
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all duration-200">
              <FaFileAlt className="h-5 w-5 text-[#2E236C]" />
              <span className="text-gray-700 font-medium">Summary</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all duration-200">
              <FaComments className="h-5 w-5 text-[#2E236C]" />
              <span className="text-gray-700 font-medium">Chats</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all duration-200">
              <FaGraduationCap className="h-5 w-5 text-[#2E236C]" />
              <span className="text-gray-700 font-medium">Exams</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all duration-200">
              <FaBookOpen className="h-5 w-5 text-[#2E236C]" />
              <span className="text-gray-700 font-medium">Materials</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all duration-200">
              <FaBriefcase className="h-5 w-5 text-[#2E236C]" />
              <span className="text-gray-700 font-medium">Works</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all duration-200">
              <FaBullhorn className="h-5 w-5 text-[#2E236C]" />
              <span className="text-gray-700 font-medium">Announcements</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom icons for smaller screens */}
      <div className="fixed bottom-0 left-0 w-full bg-[#2E236C] p-2 flex justify-around md:hidden">
        <FaFileAlt className="h-5 w-5 text-white" />
        <FaComments className="h-5 w-5 text-white" />
        <FaGraduationCap className="h-5 w-5 text-white" />
        <FaBookOpen className="h-5 w-5 text-white" />
        <FaBriefcase className="h-5 w-5 text-white" />
        <FaBullhorn className="h-5 w-5 text-white" />
      </div>
    </div>
  );
};

export default MainSideNav;
