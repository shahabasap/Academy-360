import React from "react";

const 
SubNav = () => {
  return (
    <div className="flex flex-row justify-evenly items-center p-9 snap-start">
      <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">
        Summary
      </span>
      <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">
        Chats
      </span>
      <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">
        Exams
      </span>
      <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">
        Materials
      </span>
      <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">
        works
      </span>
      <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">
        Announcements
      </span>
    </div>
  );
};

export default SubNav;
