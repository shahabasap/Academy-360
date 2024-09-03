import React from 'react';
import ProfileSidebar from '../profile/profileSidebar'
import { FaUser, FaPhone, FaEnvelope, FaUniversity, FaBriefcase } from 'react-icons/fa';
import useRole from '../../../hooks/RoleState';

const ProfileOverview: React.FC = () => {
   const role=useRole()
   console.log("role",role)

  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
        <div className='w-20 md:w-64 '><ProfileSidebar /></div>
      
      <div className="flex flex-col w-full p-6">
        <h1 className=" text-3xl font-bold text-gray-900 mb-6">Profile Overview</h1>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-500 text-4xl" />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
              <p className="text-gray-600">@johndoe</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaPhone className="text-[#2E236C] text-xl mr-4" />
              <h3 className="text-lg font-medium text-gray-800">Contact Information</h3>
            </div>
            <p className="text-gray-600"><strong>Phone:</strong> +123 456 7890</p>
            <p className="text-gray-600"><strong>Email:</strong> johndoe@example.com</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaUniversity className="text-[#2E236C] text-xl mr-4" />
              <h3 className="text-lg font-medium text-gray-800">Qualifications</h3>
            </div>
            <p className="text-gray-600"><strong>Degree:</strong> M.Sc. in Computer Science</p>
            <p className="text-gray-600"><strong>Institution:</strong> University of Example</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaBriefcase className="text-[#2E236C] text-xl mr-4" />
              <h3 className="text-lg font-medium text-gray-800">Recent Activities</h3>
            </div>
            <p className="text-gray-600"><strong>Classrooms Joined:</strong> Advanced Algorithms, Web Development</p>
            <p className="text-gray-600"><strong>Last Active:</strong> 2 hours ago</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">About John Doe</h3>
          <p className="text-gray-600">
            John Doe is an experienced software engineer with over 10 years of experience in the industry. 
            He specializes in full-stack development, working with a variety of technologies including React, Node.js, and MongoDB.
            In addition to his technical skills, John is passionate about teaching and mentoring aspiring developers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
