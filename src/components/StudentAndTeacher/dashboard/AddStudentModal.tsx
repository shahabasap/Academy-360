import React, { useState, useEffect } from 'react';
import Table from '../HtmlComponets/table'; // Adjust the import path as necessary
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import ApiController from '../../../Api/apiCalls'
import { useSelector } from 'react-redux';
import { selectTeacherClass } from '../../../features/teacher/teacherSlice';
import useDebounce from '../../../hooks/debounce'; // Adjust the import path

interface Student {
  id: string;
  name: string;
  email: string;
}

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (studentId: string) => void;
  classroomId: string;
  page: number;
  limit: number;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddStudent, 
  classroomId, 
  page, 
  limit 
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // 500ms debounce delay
  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalStudents, setTotalStudents] = useState<number | null>(null);
  const student = useSelector(selectTeacherClass);

  useEffect(() => {
    if (isOpen) {
      fetchStudentsData();
    }
  }, [isOpen, debouncedSearchTerm, currentPage]); // Using debouncedSearchTerm

  const fetchStudentsData = async () => {
    setLoading(true);
    setError(null);

    try {
      const StudentsData = await ApiController.FetchStudentsDataForInvitation(debouncedSearchTerm, student._id, currentPage, limit);
      const { Students, StudentCount } = StudentsData.data;

      setStudents(Students ?? []);
      setTotalStudents(StudentCount ?? null);
    } catch (error) {
      setError('Failed to fetch students. Please try again.');
      toast.error('Failed to fetch students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil((totalStudents || 0) / limit);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (!isOpen) return null;

  const totalPages = Math.ceil((totalStudents ?? 0) / limit);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full"> {/* Adjusted max-w-lg to max-w-xl */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Students to Classroom</h3>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="searchInput">Search by Email</label>
        <input
          id="searchInput"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-full"
          placeholder="Search by email..."
          aria-label="Search students by email"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {totalStudents === 0 || totalStudents === null ? (
            <div className="flex flex-col items-center">
              <p className="text-gray-700 text-lg">No students found.</p>
              <img
                src="path_to_no_students_icon_or_gif"
                alt="No students found"
                className="mt-4"
              />
            </div>
          ) : (
            <Table
              headers={[ 'Name', 'Email', 'Action']}
              data={students.map(student => ({
                ...student,
                action: (
                  <button
                    onClick={() => onAddStudent(student.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    aria-label={`Add ${student.name}`}
                  >
                    Add
                  </button>
                )
              }))}
              currentPage = {currentPage}
              itemsPerPage = {limit}
              
            />
          )}
        </>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          aria-label="Previous page"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
      <button
        onClick={onClose}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors mt-4 w-full"
        aria-label="Close modal"
      >
        Close
      </button>
    </div>
  </div>
  
  );
};

export default AddStudentModal;
