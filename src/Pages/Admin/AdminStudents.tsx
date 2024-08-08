import React, { useState, useEffect } from 'react';
import AdminMainSideNav from './AdminMainSideNav';
import doorbell from '../../assets/Doorbell.png';
import ConfirmationModal from './blockConfirmation'; // Adjust the path as needed
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
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [studentIdToBlock, setStudentIdToBlock] = useState<string | null>(null);
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
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(adminLogout());
    navigate('/admin');
    setIsLogoutModalOpen(false);
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const handleBlockUnblock = (id: string) => {
    setStudentIdToBlock(id);
    setIsBlockModalOpen(true);
  };

  const confirmBlockUnblock = () => {
    if (studentIdToBlock) {
      const updatedStudents = students.map(student =>
        student._id === studentIdToBlock ? { ...student, Is_block: !student.Is_block } : student
      );
      setStudents(updatedStudents);

      // Call the backend API to update the block status
      axios.put(`/api/admin/${updatedStudents.find(student => student._id === studentIdToBlock)?.Is_block ? 'unblock' : 'block'}/${studentIdToBlock}`)
        .then(response => {
          console.log("Student status updated successfully!");
        })
        .catch(error => {
          console.error("There was an error updating the student status!", error);
        });
    }
    setIsBlockModalOpen(false);
    setStudentIdToBlock(null);
  };

  const cancelBlockUnblock = () => {
    setIsBlockModalOpen(false);
    setStudentIdToBlock(null);
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
          isOpen={isLogoutModalOpen}
          onClose={cancelLogout}
          onConfirm={confirmLogout}
          message="Are you sure you want to logout?"
        />
        <ConfirmationModal
          isOpen={isBlockModalOpen}
          onClose={cancelBlockUnblock}
          onConfirm={confirmBlockUnblock}
          message={`Are you sure you want to ${students.find(student => student._id === studentIdToBlock)?.Is_block ? 'unblock' : 'block'} this student?`}
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
