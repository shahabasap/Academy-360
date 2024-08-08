import React, { useState, useEffect } from 'react';
import AdminMainSideNav from './AdminMainSideNav';
import doorbell from '../../assets/Doorbell.png';
import ConfirmationModal from './ConfirmationModal'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../features/admin/adminSlice';
import axios from 'axios';

interface Teacher {
  _id: string;
  username: string;
  name: string;
  JoinedDate: string;
  LastUpdation: string;
  Is_block: boolean;
}

const AdminTeacher: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch teacher data from the backend
    axios.get('/api/admin/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the teacher data!", error);
      });
  }, []);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(adminLogout());
    navigate('/admin');
    setIsModalOpen(false);
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  const handleBlockUnblock = (id: string) => {
    const updatedTeachers = teachers.map(teacher =>
      teacher._id === id ? { ...teacher, Is_block: !teacher.Is_block } : teacher
    );
    setTeachers(updatedTeachers);

    // Call the backend API to update the block status
    axios.patch(`/api/admin/teachers/${id}`, {
      Is_block: !teachers.find(teacher => teacher._id === id)?.Is_block
    })
      .then(response => {
        console.log("Teacher status updated successfully!");
      })
      .catch(error => {
        console.error("There was an error updating the teacher status!", error);
      });
  };

  return (
    <div className='flex flex-row bg-[#191C24] min-h-screen'>
      <AdminMainSideNav />
      <div className='flex flex-col w-full'>
        <div className='flex flex-row justify-between items-center h-16 w-full border-b border-[#66608C] px-4 text-white bg-black'>
          <div className='flex-shrink-0'>
            <h1 className='font-bold text-xl'>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Teachers
            </h1>
          </div>
          <div className='flex flex-row items-center space-x-4'>
            <img className='w-6 h-auto' src={doorbell} alt="Notification" />
            <button
              className='border-2 border-[#66608C] rounded-md px-2 hover:bg-[#2dafe2] hover:text-black hover:text-white'
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>
        </div>
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={cancelLogout}
          onConfirm={confirmLogout}
        />
        <div className='p-4'>
          <table className='min-w-full bg-[#191C24] text-white'>
            <thead>
              <tr>
                <th className='border-b border-[#66608C] p-4'>Username</th>
                <th className='border-b border-[#66608C] p-4'>Name</th>
                <th className='border-b border-[#66608C] p-4'>Joined Date</th>
                <th className='border-b border-[#66608C] p-4'>Last Updation</th>
                <th className='border-b border-[#66608C] p-4'>Status</th>
                <th className='border-b border-[#66608C] p-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td className='border-b border-[#66608C] p-4'>{teacher.username}</td>
                  <td className='border-b border-[#66608C] p-4'>{teacher.name}</td>
                  <td className='border-b border-[#66608C] p-4'>{new Date(teacher.JoinedDate).toLocaleDateString()}</td>
                  <td className='border-b border-[#66608C] p-4'>{new Date(teacher.LastUpdation).toLocaleDateString()}</td>
                  <td className='border-b border-[#66608C] p-4'>{teacher.Is_block ? 'Blocked' : 'Active'}</td>
                  <td className='border-b border-[#66608C] p-4'>
                    <button
                      className={`px-4 py-2 rounded-md ${teacher.Is_block ? 'bg-red-500' : 'bg-green-500'}`}
                      onClick={() => handleBlockUnblock(teacher._id)}
                    >
                      {teacher.Is_block ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTeacher;
