import React, { useState } from 'react';
import { TeacherProfileFetch, Experience } from '../../types/commonType';
import ApiController from '../../Api/apiCalls';
import { User, Briefcase, Calendar, Phone, Mail, GraduationCap } from 'lucide-react';

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
    if(url.length!==0)
    {
      window.open(url, '_blank');
    }
    
  };

  const handleReject = () => {
    if (rejectionReason.trim() === '') {
      setError('Please enter a rejection reason.');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmReject = async () => {
    await ApiController.RejectTeacher(teacherid, rejectionReason);
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
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center overflow-y-auto ">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-4xl md:w-4/5 lg:w-2/3 xl:w-1/2 relative max-h-90vh overflow-y-auto transition-all duration-300 ease-in-out transform-gpu ">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold mb-6 text-gray-100">Teacher Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 col-span-1">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
              {teacher.photo ? (
                <img
                  src={teacher.photo}
                  alt={`${teacher.name}'s profile`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => openImage(teacher?.photo ? teacher.photo:'')}
                />
              ) : (
                <User size={64} className="text-gray-400" />
              )}
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-100">{teacher.name}</h3>
            <p className="text-gray-400 text-center">{teacher.username}</p>
          </div>
          <div className="space-y-4 col-span-2">
            <InfoItem icon={<User size={20} />} label="Gender" value={teacher.gender || 'Not specified'} />
            {teacher.phone && <InfoItem icon={<Phone size={20} />} label="Phone" value={teacher.phone} />}
            <InfoItem icon={<Calendar size={20} />} label="Joined Date" value={new Date(teacher.JoinedDate).toLocaleDateString()} />
            <InfoItem icon={<Briefcase size={20} />} label="Role" value={teacher.role} />
            {teacher.graduation && (
              <InfoItem
                icon={<GraduationCap size={20} />}
                label="Graduation"
                value={`${teacher.graduation.college}, ${teacher.graduation.course} (${new Date(teacher.graduation.yearFrom).getFullYear()} - ${new Date(teacher.graduation.yearTo).getFullYear()})`}
              />
            )}
            {teacher.postGraduation && (
              <InfoItem
                icon={<GraduationCap size={20} />}
                label="Post-Graduation"
                value={`${teacher.postGraduation.college}, ${teacher.postGraduation.course} (${new Date(teacher.postGraduation.yearFrom).getFullYear()} - ${new Date(teacher.postGraduation.yearTo).getFullYear()})`}
              />
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <CertificateSection label="UG Certificate" imageUrl={teacher?.ugCertificate ? teacher.ugCertificate :''} openImage={openImage} />
          <CertificateSection label="PG Certificate" imageUrl={teacher?.pgCertificate ? teacher?.pgCertificate :''} openImage={openImage} />
        </div>

        {teacher.experiences && teacher.experiences.length > 0 && (
          <div className="mt-8">
            <h4 className="text-xl font-semibold mb-4 text-gray-100">Experiences</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teacher.experiences.map((exp: Experience, index) => (
                <ExperienceCard key={index} experience={exp} />
              ))}
            </div>
          </div>
        )}

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
                  className={`w-full p-3 bg-gray-700 text-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? 'border-red-500' : 'border-gray-600'
                  }`}
                  rows={4}
                />
                {error && <p className="text-red-400 mt-2">{error}</p>}
                <button
                  onClick={handleReject}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-semibold"
                >
                  Submit Rejection
                </button>
              </div>
            )}

            {showConfirmation && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center overflow-y-auto">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 relative max-h-50vh overflow-y-auto">
                  <h4 className="text-xl font-semibold mb-4 text-gray-100">Confirm Rejection</h4>
                  <p className="text-gray-300">Are you sure you want to reject this teacher's profile with the following reason?</p>
                  <p className="mt-2 text-gray-100">
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
                      className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors font-semibold"
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

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 text-gray-300">
    {icon}
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
);

const CertificateSection: React.FC<{ label: string; imageUrl?: string; openImage: (url: string) => void }> = ({
  label,
  imageUrl,
  openImage,
}) => (
  <div className="bg-gray-700 rounded-lg p-4">
    <h4 className="text-lg font-semibold mb-2 text-gray-100">{label}</h4>
    {imageUrl ? (
      <div className="relative h-48 overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={label}
          className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => openImage(imageUrl)}
        />
      </div>
    ) : (
      <div className="h-48 bg-gray-600 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Certificate not provided</p>
      </div>
    )}
  </div>
);

const ExperienceCard: React.FC<{ experience: Experience }> = ({ experience }) => (
  <div className="p-4 bg-gray-700 rounded-lg shadow-md">
    <h4 className="text-lg font-semibold mb-1 text-gray-100">{experience.institute}</h4>
    <p className="text-gray-400">
      {new Date(experience.yearFrom).toLocaleDateString()} -{' '}
      {experience.yearTo ? new Date(experience.yearTo).toLocaleDateString() : 'Present'}
    </p>
  </div>
);

export default ProfileModal;