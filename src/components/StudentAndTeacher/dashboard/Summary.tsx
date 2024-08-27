import React, { useState, useEffect } from 'react';
import MainSideNav from '../Others/MainSideNav'; // Adjust the import path as necessary
import AddStudentModal from './AddStudentModal'; // Adjust the import path as necessary
import { toast } from 'react-toastify'; // Import toast
import { useSelector } from 'react-redux';
import { selectTeacherClass } from '../../../features/teacher/teacherSlice';
import ApiController from '../../../Api/apiCalls';


// Define your quotes here or import from an external file
const quotes = [
  "Education is the most powerful weapon which you can use to change the world.",
  "The only way to do great work is to love what you do.",
  "The future belongs to those who believe in the beauty of their dreams.",
  // Add more quotes as needed
];


const Summary: React.FC = () => {
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [quote, setQuote] = useState('');
  const classroom = useSelector(selectTeacherClass);
  const classroomId = classroom._id;
  const [isInvited, setIsInvited] = useState(false);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleAddStudent = async (studentId: string) => {
    try {
      const response = await ApiController.addStudents(classroomId, studentId);
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
        setIsInvited(true);
      } else {
        toast.error('Failed to add student. Please try again.', {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage =
        error?.response?.data?.error || "Something went wrong. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex flex-row md:min-h-screen bg-gray-100">
      <div className="md:w-72 bg-white">
        <MainSideNav />
      </div>
      <div className="w-full">
        <div className="flex-1 p-8">
          <div className="bg-blue-500 text-white p-4 rounded-md mb-6">
            <h2 className="text-xl font-semibold">{quote}</h2>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Students</h3>
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
              aria-label="Add student"
            >
              Add Student
            </button>
          </div>
        </div>
      </div>
      <AddStudentModal
        isOpen={showAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
        isInvited={isInvited}
        setisInvited={setIsInvited}
        onAddStudent={handleAddStudent}
        classroomId={classroomId}
        page={1}
        limit={4}
      />
    </div>
  );
};

export default Summary;
