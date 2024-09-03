import React, { useState, useEffect } from 'react';
import ApiController from '../../Api/apiCalls';
import AdminMainSidebar from '../../components/Admin/SideBar';
import AdminMainTopNav from '../../components/Admin/TopNav';
import ConfirmationModal2 from '../../components/Admin/ConfirmationModal2'; // Adjust the path as needed

interface Classroom {
  _id: string;
  subject: string;
  classroomid: string;
  Is_blocked: boolean;
  createdAt: string;
}

const ClassroomManagement = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClassroomId, setCurrentClassroomId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<'block' | 'unblock' | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Number of classrooms per page

  useEffect(() => {
    fetchClassrooms(currentPage);
  }, [currentPage]);

  const fetchClassrooms = async (page: number) => {
    try {
      const { data, totalPages } = await ApiController.fetchClassrooms(page, itemsPerPage);
      setClassrooms(data);
      setTotalPages(totalPages);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleBlockUnblock = (id: string, isBlocked: boolean) => {
    const action = isBlocked ? 'unblock' : 'block';
    setCurrentClassroomId(id);
    setCurrentAction(action);
    setIsModalOpen(true); // Open the modal
  };

  const confirmBlockUnblock = async () => {
    if (!currentClassroomId || !currentAction) return;

    setActionInProgress(currentClassroomId);
    try {
      if (currentAction === 'block') {
        await ApiController.blockClassroom(currentClassroomId);
      } else {
        await ApiController.unblockClassroom(currentClassroomId);
      }
      fetchClassrooms(currentPage);
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

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  console.log("Calssrooms",classrooms)

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
                  <th scope="col" className="px-6 py-3">Subject</th>
                  <th scope="col" className="px-6 py-3">Classroom ID</th>
                  <th scope="col" className="px-6 py-3">Created Date</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {classrooms.map((classroom) => (
                  <tr key={classroom._id} className="bg-gray-800 border-b border-gray-700">
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-white">{classroom.subject}</td>
                    <td className="px-6 py-4">{classroom.classroomid}</td>
                    <td className="px-6 py-4">
                      {new Date(classroom.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{classroom.Is_blocked ? 'Blocked' : 'Active'}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleBlockUnblock(classroom._id, classroom.Is_blocked)}
                        disabled={actionInProgress === classroom._id}
                        className={`font-medium px-4 py-2 rounded ${
                          classroom.Is_blocked
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        } ${actionInProgress === classroom._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {actionInProgress === classroom._id
                          ? 'Processing...'
                          : classroom.Is_blocked
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
    </div>
  );
};

export default ClassroomManagement;
