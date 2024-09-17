import { TeacherProfileFormData, FormState } from '../../../types/commonType';
import useUserData from '../../../hooks/useUserData ';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRole from '../../../hooks/RoleState';

const ApprovalMessage = () => {
  const navigate = useNavigate(); // React Router hook to navigate
  const { user } = useUserData('Teacher');
  const role = useRole();
  const [reason, setReason] = useState<string | undefined>(); // Store reason if any

  const handleBackToProfile = () => {
    navigate('/teacher/profile/update-profilo'); // Replace with your profile route
  };

  // Type guard for Teacher profile data
  const isTeacher = (user: FormState | null): user is TeacherProfileFormData => {
    return role === 'Teacher' && user !== null;
  };

  useEffect(() => {
 
    if (user && role === 'Teacher' && isTeacher(user)) {
      if (user?.Approvel?.isApproved==true) {
        navigate('/teacher')
      }
      setReason(user?.Approvel?.message); // Set the rejection reason if it exists
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your Account is Being Reviewed</h1>
        <p className="text-gray-600 mb-6">
          Your account is currently under review by the admin. You will be notified once the approval process is complete.
        </p>

        {/* Conditionally render the rejection reason if available */}
        {reason && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
            <p><strong>Reason for Rejection:</strong></p>
            <p>{reason}</p>
          </div>
        )}

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
