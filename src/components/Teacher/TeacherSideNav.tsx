import React, { useState } from 'react';

const TeacherSideNav = () => {
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
      <div className="relative">
        {/* Toggle Button */}
        <button
          id="toggleButton"
          className="fixed top-2 left-2 mso:block md:hidden p-2 bg-[#2E236C] text-white rounded z-50" // Show at mso breakpoint
          onClick={handleToggle}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div
        className={`flex flex-col bg-[#2E236C] w-72 min-h-screen fixed top-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? '' : 'mso:hidden' // Hide at mso breakpoint when not open
        }`}
      >
        <div className="flex items-center p-4">
          {/* Logo shown in large sizes */}
          <div className="hidden md:flex flex-shrink-0 mr-4">
            <img
              className="h-16 w-16" // Adjust size for larger screens
              src="/src/assets/logo.png"
              alt="Academy-360-logo"
            />
          </div>

          {/* Logo shown in smaller sizes */}
          <div className="sm:hidden flex flex-shrink-0">
            <img
              className="h-12 w-12" // Smaller size for smaller screens
              src="/src/assets/logo.png"
              alt="Academy-360-logo"
            />
          </div>

          <div className="flex flex-col ml-2 md:-ml-5 sm:ml-9">
            {/* Adjusted text sizes */}
            <h1 className="text-white text-xl md:text-2xl font-semibold">ACADEMY 360</h1>
            <h3 className="text-white text-sm md:text-base font-light">We are the best</h3>
          </div>
        </div>

        <div className="w-full h-full p-4">
          <div className="bg-white border rounded-md p-4 h-full">
            {/* Adjusted text sizes */}
            <h2 className="text-[#2E236C] text-lg md:text-xl font-bold">CLASSROOMS</h2>
            <input
              className="mt-2 border border-black border-opacity-20 p-2 w-full text-sm md:text-base" // Adjusted text size and padding
              type="text"
              placeholder="Search"
            />
            <hr className="my-2" />
            <ul className="mt-2">
              {["English", "Physics", "Chemistry", "Biology", "Malayalam"].map((subject) => (
                <li
                  key={subject}
                  className="mt-2 hover:bg-[#66608C] p-2 hover:text-white rounded-md cursor-pointer text-sm md:text-base"
                  onClick={handleItemClick}
                >
                  {subject}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherSideNav;
