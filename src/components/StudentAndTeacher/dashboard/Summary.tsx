import React, { useState, useEffect } from 'react';
import MainSideNav from '../Others/MainSideNav'; // Adjust the import path as necessary
import AddStudentModal from './AddStudentModal'; // Adjust the import path as necessary
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectTeacherClass, TeacherData } from '../../../features/teacher/teacherSlice';
import ApiController from '../../../Api/apiCalls';
import useRole from '../../../hooks/RoleState';
import { selectUserClass, userData, UserState } from '../../../features/user/userSlice';
import useClassroom from '../../../hooks/useClassroom';

const quotes = [
  "Education is the most powerful weapon which you can use to change the world.",
  "The only way to do great work is to love what you do.",
  "The future belongs to those who believe in the beauty of their dreams.",
  // Add more quotes as needed
];

const Summary: React.FC = () => {
  const role = useRole();
  const teacherData = useSelector(selectTeacherClass); // Teacher data from Redux
  const studentData = useSelector(selectUserClass); // Student data from Redux
  const {classroomData}=useClassroom(role)
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [quote, setQuote] = useState<string>('');
  const [classroom, setClassroom] = useState<any>(null);
  const [isInvited, setIsInvited] = useState(false);
  
 

  const classroomId = classroom?._id;

  useEffect(() => {
    if (role === 'Teacher') {
      setClassroom(classroomData? classroomData:teacherData);
    } else if (role === 'Student') {
      setClassroom(classroomData ?classroomData:studentData);
    }
  }, [role, teacherData, studentData]);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleAddStudent = async (studentId: string) => {
    try {
      if (!classroomId) throw new Error("No classroom ID found");

      const response = await ApiController.addStudents(classroomId, studentId);
      if (response.status === 200) {
        toast.success("Student is added to the classroom, invitation mail is sent", {
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
      const errorMessage = error?.response?.data?.error || "Something went wrong. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="md:w-72 bg-white shadow-md">
        <MainSideNav />
      </div>
      <div className="flex-1 p-8">
        <div className="mb-6 border border-l-blue-500 text-blue-600 rounded-lg ">
          <div className="p-6">
            <h2 className="text-2xl font-bold">{quote}</h2>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Classroom Details</h3>
            {classroom ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Subject</p>
                    <p className="font-semibold">{classroom.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Teacher Name</p>
                    <p className="font-semibold">{classroom?.teacherid?.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Created At</p>
                    <p className="font-semibold">{new Date(classroom.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Updated At</p>
                    <p className="font-semibold">{new Date(classroom.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No classroom details available.</p>
            )}
          </div>
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-600 mb-4">{classroom?.description}</p>
            {role === "Teacher" && (
              <button 
                onClick={() => setShowAddStudentModal(true)}
                className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Add Student
              </button>
            )}
          </div>
        </div>
      </div>

     
      {/* Modal for adding students */}
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

      <ToastContainer />
    </div>
  );
};

export default Summary;
