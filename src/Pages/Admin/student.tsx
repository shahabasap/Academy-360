import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import AdminMainSidebar from '../../components/Admin/SideBar';
import AdminMainTopNav from '../../components/Admin/TopNav';
import ConfirmationModal2 from '../../components/Admin/ConfirmationModal2';

interface Student {
  _id: string;
  username: string;
  name: string;
  Is_block: boolean;
  JoinedDate: string;
}

const TeacherManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<'block' | 'unblock' | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    fetchTeachers(currentPage);
  }, [currentPage]);

  const fetchTeachers = async (page: number) => {
    try {
      const response: AxiosResponse = await axios.get(`/api/admin/students?page=${page}&pageSize=${pageSize}`);
      setStudents(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Failed to load teachers. Please try again later.');
    }
  };

  const handleBlockUnblock = (id: string, isBlocked: boolean) => {
    const action = isBlocked ? 'unblock' : 'block';
    setCurrentStudentId(id);
    setCurrentAction(action);
    setIsModalOpen(true);
  };

  const confirmBlockUnblock = async () => {
    if (!currentStudentId || !currentAction) return;

    setActionInProgress(currentStudentId);
    try {
      const endpoint =
        currentAction === 'unblock'
          ? `/api/admin/student-unblock/${currentStudentId}`
          : `/api/admin/student-block/${currentStudentId}`;
      await axios.put(endpoint);
      fetchTeachers(currentPage); // Refresh the current page data
    } catch (error) {
      console.error(`Error updating teacher status:`, error);
      setError(`Failed to ${currentAction} teacher. Please try again.`);
    } finally {
      setActionInProgress(null);
      setIsModalOpen(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
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
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="bg-gray-800 border-b border-gray-700">
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-white">{student.name}</td>
                    <td className="px-6 py-4">{student.username}</td>
                    <td className="px-6 py-4">
                      {new Date(student.JoinedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{student.Is_block ? 'Blocked' : 'Active'}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleBlockUnblock(student._id, student.Is_block)}
                        disabled={actionInProgress === student._id}
                        className={`font-medium px-4 py-2 rounded ${
                          student.Is_block
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        } ${actionInProgress === student._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {actionInProgress === student._id
                          ? 'Processing...'
                          : student.Is_block
                          ? 'Unblock'
                          : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
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
    </div>
  );
};

export default TeacherManagement;
