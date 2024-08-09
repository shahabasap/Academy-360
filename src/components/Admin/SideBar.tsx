import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminMainSideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    if (window.innerWidth < 987) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        id="toggleButton"
        className="fixed top-2 left-2 md:hidden p-2 bg-[#66608C] text-white rounded z-50"
        onClick={handleToggle}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <div
        className={`flex flex-col bg-black w-72 min-h-screen fixed top-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex items-center p-4">
          {/* Logo shown in large sizes */}
          <div className="hidden md:flex flex-shrink-0 mr-4">
            <img
              className="h-16 w-16"
              src="/src/assets/logo.png"
              alt="Academy-360-logo"
            />
          </div>

          {/* Logo shown in smaller sizes */}
          <div className="sm:hidden flex flex-shrink-0">
            <img
              className="h-12 w-12"
              src="/src/assets/logo.png"
              alt="Academy-360-logo"
            />
          </div>

          <div className="flex flex-col ml-2 md:-ml-5 sm:ml-9">
            <h1 className="text-[#66608C] text-xl md:text-2xl font-bold">ACADEMY 360</h1>
            <h3 className="text-[#e0dfe2] text-sm md:text-base font-light">We are the best</h3>
          </div>
        </div>

        <div className="w-full h-full p-4">
          <div className="bg-[#191C24] border text-white border-[#2E236C] rounded-md p-4 h-full">
            <ul className="mt-2">
              <li
                className="mt-2 hover:bg-[#66608C] p-2 hover:text-white rounded-md cursor-pointer text-sm md:text-base"
                onClick={handleItemClick}
              >
                <Link to="/admin/dashboard">Dashboard</Link>
              </li>
              <li
                className="mt-2 hover:bg-[#66608C] p-2 hover:text-white rounded-md cursor-pointer text-sm md:text-base"
                onClick={handleItemClick}
              >
                <Link to="/admin/students">Students</Link>
              </li>
              <li
                className="mt-2 hover:bg-[#66608C] p-2 hover:text-white rounded-md cursor-pointer text-sm md:text-base"
                onClick={handleItemClick}
              >
                <Link to="/admin/teachers">Teachers</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMainSideNav;