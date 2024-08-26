import React, { useState, useEffect } from 'react';
import MainSideNav from '../Others/MainSideNav'; // Adjust the import path as necessary
import Table from '../HtmlComponets/table'; // Adjust the import path as necessary
import AddStudentModal from './AddStudentModal'; // Adjust the import path as necessary
import { toast } from 'react-toastify'; // Import toast
import { useSelector } from 'react-redux';
import { selectTeacherClass } from '../../../features/teacher/teacherSlice';

// Array of quotes
const quotes = [
  "Education is the most powerful weapon which you can use to change the world. – Nelson Mandela",
  "The beautiful thing about learning is that no one can take it away from you. – B.B. King",
  "Education is not preparation for life; education is life itself. – John Dewey",
  "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
  "Education is the key to unlocking the golden door of freedom. – George Washington Carver",
];

const Summary = () => {
  const [students, setStudents] = useState<any[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ]);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [quote, setQuote] = useState('');
  const classroom = useSelector(selectTeacherClass);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleAddStudent = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      try {
        setStudents([
          ...students,
          { ...student, id: (students.length + 1).toString() },
        ]);
        toast.success('Student added successfully!');
      } catch (err) {
        toast.error('Failed to add student. Please try again.');
      } finally {
        setShowAddStudentModal(false);
      }
    } else {
      toast.error('Student not found.');
    }
  };

  return (
    <div className="flex flex-row md:min-h-screen bg-gray-100">
      <div className="md:w-72 bg-white">
        <MainSideNav />
      </div>
      <div className="w-full">
        <div className="flex-1 p-8">
          {/* Banner Section */}
          <div className="bg-blue-500 text-white p-4 rounded-md mb-6">
            <h2 className="text-xl font-semibold">{quote}</h2>
          </div>

          {/* Students Section */}
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
        onAddStudent={handleAddStudent}
        classroomId={classroom?.id ?? ''}
        page={1}
        limit={4}
      />
    </div>
  );
};

export default Summary;
