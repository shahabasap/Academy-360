import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import AdminMainSidebar from '../../components/Admin/SideBar';
import AdminMainTopNav from '../../components/Admin/TopNav';
import ConfirmationModal2 from '../../components/Admin/ConfirmationModal2'; // Adjust the path as needed

interface Teacher {
  _id: string;
  username: string;
  name: string;
  Is_block: boolean;
  JoinedDate: string;
}

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<'block' | 'unblock' | null>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response: AxiosResponse<Teacher[]> = await axios.get('/api/admin/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Failed to load teachers. Please try again later.');
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
      const endpoint =
        currentAction === 'unblock'
          ? `/api/admin/teacher-unblock/${currentTeacherId}`
          : `/api/admin/teacher-block/${currentTeacherId}`;
      await axios.put(endpoint);
      fetchTeachers();
    } catch (error) {
      console.error(`Error updating teacher status:`, error);
      setError(`Failed to ${currentAction} teacher. Please try again.`);
    } finally {
      setActionInProgress(null);
      setIsModalOpen(false); // Close the modal after action
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
                {teachers.map((teacher) => (
                  <tr key={teacher._id} className="bg-gray-800 border-b border-gray-700">
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-white">{teacher.name}</td>
                    <td className="px-6 py-4">{teacher.username}</td>
                    <td className="px-6 py-4">
                      {new Date(teacher.JoinedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{teacher.Is_block ? 'Blocked' : 'Active'}</td>
                    <td className="px-6 py-4">
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
