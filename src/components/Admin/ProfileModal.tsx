import React, { useState } from 'react';
import { TeacherProfileFetch, Experience } from '../../types/commonType';
import ApiController from '../../Api/apiCalls';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: TeacherProfileFetch;
  onApprove: () => void;
  onReject: (reason: string) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  teacher,
  onApprove,
  onReject,
}) => {
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const teacherid = teacher._id;

  if (!isOpen) return null;

  const openImage = (url: string) => {
    window.open(url, '_blank');
  };

  const handleReject = () => {
    if (rejectionReason.trim() === '') {
      setError('Please enter a rejection reason.');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmReject = async () => {
    const rejection = await ApiController.RejectTeacher(teacherid, rejectionReason);
    onReject(rejectionReason);
    setRejectionReason('');
    setShowConfirmation(false);
    onClose();
  };

  const cancelReject = () => {
    setRejectionReason('');
    setShowConfirmation(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl md:w-3/4 lg:w-2/3 xl:w-1/2 relative max-h-screen overflow-y-auto transition-all duration-300 ease-in-out transform-gpu">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl font-bold mb-6 text-gray-800">Teacher Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <img
              src={teacher.photo || '/default-avatar.png'}
              alt={`${teacher.name}'s profile`}
              className="w-48 h-48 rounded-full mx-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => openImage(teacher.photo || '/default-avatar.png')}
            />
            <h3 className="text-2xl font-semibold text-center">{teacher.name}</h3>
            <p className="text-gray-600 text-center">{teacher.username}</p>
          </div>
          <div className="space-y-2">
            <InfoItem label="Gender" value={teacher.gender || 'Nil'} />
            {teacher.phone && <InfoItem label="Phone" value={teacher.phone} />}
            <InfoItem label="Joined Date" value={new Date(teacher.JoinedDate).toLocaleDateString()} />
            <InfoItem label="Role" value={teacher.role} />
            {teacher.graduation && (
              <InfoItem
                label="Graduation"
                value={`${teacher.graduation.college}, ${teacher.graduation.course} (${new Date(
                  teacher.graduation.yearFrom
                ).getFullYear()} - ${new Date(teacher.graduation.yearTo).getFullYear()})`}
              />
            )}
            {teacher.postGraduation && (
              <InfoItem
                label="Post-Graduation"
                value={`${teacher.postGraduation.college}, ${teacher.postGraduation.course} (${new Date(
                  teacher.postGraduation.yearFrom
                ).getFullYear()} - ${new Date(teacher.postGraduation.yearTo).getFullYear()})`}
              />
            )}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {teacher.ugCertificate ? (
            <CertificateSection label="UG Certificate" imageUrl={teacher.ugCertificate} openImage={openImage} />
          ) : (
            <p className="text-gray-500">UG Certificate is not provided</p>
          )}
          {teacher.pgCertificate ? (
            <CertificateSection label="PG Certificate" imageUrl={teacher.pgCertificate} openImage={openImage} />
          ) : (
            <p className="text-gray-500">PG Certificate is not provided</p>
          )}
        </div>
        {teacher.experiences && teacher.experiences.length > 0 && (
          <div className="mt-8">
            <h4 className="text-xl font-semibold mb-4">Experiences</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teacher.experiences.map((exp: Experience, index) => (
                <ExperienceCard key={index} experience={exp} />
              ))}
            </div>
          </div>
        )}

        {/* Approve button only shown if not approved */}
        {teacher.Approvel?.isApproved !== true && (
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={onApprove}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors font-semibold"
            >
              Approve
            </button>
          </div>
        )}

        {/* Show rejection reason and section only if not approved */}
        {teacher.Approvel?.isApproved !== true && (
          <>
            {!showConfirmation && (
              <div className="mt-6">
                <textarea
                  value={rejectionReason}
                  onChange={(e) => {
                    setError('');
                    setRejectionReason(e.target.value);
                  }}
                  placeholder="Enter rejection reason"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={4}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                  onClick={handleReject}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-semibold"
                >
                  Submit Rejection
                </button>
              </div>
            )}

            {/* Confirmation modal */}
            {showConfirmation && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center overflow-y-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 relative max-h-50vh overflow-y-auto">
                  <h4 className="text-xl font-semibold mb-4">Confirm Rejection</h4>
                  <p>Are you sure you want to reject this teacher's profile with the following reason?</p>
                  <p className="mt-2">
                    <strong>Reason:</strong> {rejectionReason}
                  </p>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      onClick={confirmReject}
                      className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-semibold"
                    >
                      Confirm Rejection
                    </button>
                    <button
                      onClick={cancelReject}
                      className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <p className="text-gray-700">
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

const CertificateSection: React.FC<{ label: string; imageUrl?: string; openImage: (url: string) => void }> = ({
  label,
  imageUrl,
  openImage,
}) =>
  imageUrl ? (
    <div>
      <h4 className="text-lg font-semibold mb-2">{label}</h4>
      <img
        src={imageUrl}
        alt={label}
        className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => openImage(imageUrl)}
      />
    </div>
  ) : (
    <p className="text-gray-500">{label} is not provided</p>
  );

const ExperienceCard: React.FC<{ experience: Experience }> = ({ experience }) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
    <h4 className="text-lg font-semibold mb-1">{experience.institute}</h4>
    <p className="text-gray-500">
      {new Date(experience.yearFrom).toLocaleDateString()} -{' '}
      {experience.yearTo ? new Date(experience.yearTo).toLocaleDateString() : 'Present'}
    </p>
  </div>
);

export default ProfileModal;
