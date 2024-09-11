import React, { useState, useEffect } from 'react';
import ApiController from '../../Api/apiCalls';
import AdminMainSidebar from '../../components/Admin/SideBar';
import AdminMainTopNav from '../../components/Admin/TopNav';
import ConfirmationModal2 from '../../components/Admin/ConfirmationModal2'; // Adjust the path as needed
import ProfileModal from '../../components/Admin/ProfileModal'; // New Modal Component for Viewing Profile
import {TeacherProfileFetch} from '../../types/commonType'


const TeacherManagement = () => {
  const [teachers, setTeachers] = useState<TeacherProfileFetch[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState<string | null>(null);
  const [currentTeacher, setCurrentTeacher] = useState<TeacherProfileFetch | null>(null);
  const [currentAction, setCurrentAction] = useState<'block' | 'unblock' | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Number of teachers per page

  useEffect(() => {
    fetchTeachers(currentPage);
  }, [currentPage]);

  const fetchTeachers = async (page: number) => {
    try {
      const { data, totalPages } = await ApiController.fetchTeachers(page, itemsPerPage);
      setTeachers(data);
      setTotalPages(totalPages);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleBlockUnblock = (id: string, isBlocked: boolean) => {
    const action = isBlocked ? 'unblock' : 'block';
    setCurrentTeacherId(id);
    setCurrentAction(action);
    setIsModalOpen(true); // Open the modal
  };

  const confirmBlockUnblock = async () => {
    if (!currentTeacherId || !currentAction) return;

    setActionInProgress(currentTeacherId);
    try {
      if (currentAction === 'block') {
        await ApiController.blockTeacher(currentTeacherId);
      } else {
        await ApiController.unblockTeacher(currentTeacherId);
      }
      fetchTeachers(currentPage);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setActionInProgress(null);
      setIsModalOpen(false); // Close the modal after action
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewProfile = (teacher: TeacherProfileFetch) => {
    setCurrentTeacher(teacher);
    setIsProfileModalOpen(true);
  };

  const handleApproval = async (teacherId: string) => {
    try {
      await ApiController.approveTeacher(teacherId); // You need to implement this in ApiController
      fetchTeachers(currentPage);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsProfileModalOpen(false); // Close profile modal after approval
    }
  };

  const handleRejection = async (teacherId: string, reason: string) => {
    try {
      // await ApiController.rejectTeacher(teacherId, reason); // You need to implement this in ApiController
      fetchTeachers(currentPage);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsProfileModalOpen(false); // Close profile modal after rejection
    }
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className='flex flex-row bg-[#191C24] min-h-screen'>
      <AdminMainSidebar />
      <div className='flex flex-col w-full'>
        <AdminMainTopNav />
        <div className='p-4'>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Joined Date</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id} className="bg-gray-800 border-b border-gray-700">
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-white">{teacher.name}</td>
                    <td className="px-6 py-4">{teacher.username}</td>
                    <td className="px-6 py-4">
                      {new Date(teacher.JoinedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{teacher.Is_block ? 'Blocked' : 'Active'}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleViewProfile(teacher)}
                        className="font-medium px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleBlockUnblock(teacher._id, teacher.Is_block)}
                        disabled={actionInProgress === teacher._id}
                        className={`font-medium px-4 py-2 rounded ${
                          teacher.Is_block
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        } ${actionInProgress === teacher._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {actionInProgress === teacher._id
                          ? 'Processing...'
                          : teacher.Is_block
                          ? 'Unblock'
                          : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal2
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmBlockUnblock}
      />

      {/* Profile Modal */}
      {currentTeacher && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          teacher={currentTeacher}
          onApprove={() => handleApproval(currentTeacher._id)}
          onReject={(reason: string) => handleRejection(currentTeacher._id, reason)}
        />
      )}
    </div>
  );
};

export default TeacherManagement;
