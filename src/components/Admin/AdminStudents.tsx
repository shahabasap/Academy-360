import React, { useState, useEffect } from 'react';
import AdminMainSideNav from './AdminMainSideNav';
import doorbell from '../../assets/Doorbell.png';
import ConfirmationModal from './ConfirmationModal'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../features/admin/adminSlice';
import axios from 'axios';

interface Student {
  _id: string;
  username: string;
  name: string;
  Joined: string; // Adjusted property name
  Is_block: boolean;
}

const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch student data from the backend
    axios.get('/api/admin/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the student data!", error);
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
    const updatedStudents = students.map(student =>
      student._id === id ? { ...student, Is_block: !student.Is_block } : student
    );
    setStudents(updatedStudents);

    // Call the backend API to update the block status
    axios.patch(`/api/admin/students/${id}`, {
      Is_block: !students.find(student => student._id === id)?.Is_block
    })
      .then(response => {
        console.log("Student status updated successfully!");
      })
      .catch(error => {
        console.error("There was an error updating the student status!", error);
      });
  };

  return (
    <div className='flex flex-row bg-[#191C24] min-h-screen'>
      <AdminMainSideNav />
      <div className='flex flex-col w-full'>
        <div className='flex flex-row justify-between items-center h-16 w-full border-b border-[#66608C] px-4 text-white bg-black'>
          <div className='flex-shrink-0'>
            <h1 className='font-bold text-xl'>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Students
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
                <th className='border-b border-[#66608C] p-4'>Status</th>
                <th className='border-b border-[#66608C] p-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className='border-b border-[#66608C] p-4'>{student.username}</td>
                  <td className='border-b border-[#66608C] p-4'>{student.name}</td>
                  <td className='border-b border-[#66608C] p-4'>{new Date(student.Joined).toLocaleDateString()}</td>
                  <td className='border-b border-[#66608C] p-4'>{student.Is_block ? 'Blocked' : 'Active'}</td>
                  <td className='border-b border-[#66608C] p-4'>
                    <button
                      className={`px-4 py-2 rounded-md ${student.Is_block ? 'bg-red-500' : 'bg-green-500'}`}
                      onClick={() => handleBlockUnblock(student._id)}
                    >
                      {student.Is_block ? 'Unblock' : 'Block'}
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

export default AdminStudents;
