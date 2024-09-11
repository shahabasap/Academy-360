import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApprovalMessage = () => {
  const navigate = useNavigate(); // React Router hook to navigate

  const handleBackToProfile = () => {
    navigate('/teacher/profile/update-profilo'); // Replace with your profile route
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your Account is Being Reviewed</h1>
        <p className="text-gray-600 mb-6">
          Your account is currently under review by the admin. You will be notified once the approval process is complete.
        </p>
        <button
          onClick={handleBackToProfile}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default ApprovalMessage;
