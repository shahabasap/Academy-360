import useRole from '../../../hooks/RoleState';
import React, { useEffect, useState } from 'react';
import CreateClassroom from './createClassroom';
import ApiController from '../../../Api/apiCalls';
import { TeacherClassLogin, TeacherData } from '../../../features/teacher/teacherSlice';
import { useSelector } from 'react-redux';
import { ClassroomData, IClassroom } from '../../../types/commonType';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import JoinClassroomModal from './joinClassroom';
import { userData } from '../../../features/user/userSlice';

const Classrooms = () => {
  const role = useRole();
  const teacher = useSelector(TeacherData);
  const student =useSelector(userData)
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCreatedClassroom, setIsCreatedClassroom] = useState(false);
  const [classrooms, setClassrooms] = useState<IClassroom[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        if (role === 'Teacher' && teacher) {
          const response = await ApiController.FetchTeacherClassrooms(teacher._id);
          if (response.status === 200) {
            setClassrooms(response.data);
          } else {
            toast.error('Failed to fetch classrooms.');
          }
        }
      } catch (error) {
        toast.error('An error occurred while fetching classrooms.');
      } finally {
        setLoading(false);
        setIsCreatedClassroom(false);
      }
    };

    fetchClassrooms();
  }, [teacher, isCreatedClassroom, role]);

  const handleCreateClassroom = async (data: ClassroomData) => {
    try {
      if (role === 'Teacher' && teacher) {
        data.teacherid = teacher._id;
      }
      const response = await ApiController.CreateClassroom(data);
      if (response.status === 200) {
        setIsCreatedClassroom(true);
        toast.success(response.data.message);
      } else {
        toast.error(response.response.data.error);
      }
    } catch (error) {
      toast.error('An error occurred while creating the classroom.');
    }
  };

  const handleJoinClassroom = async (classroomId: string) => {
    try {
      let response;
      if (role === 'Teacher' && teacher) {
        response = await ApiController.JoinClassroom(classroomId, teacher._id);
      } else {
        // response = await ApiController.JoinClassroomStudent(classroomId,student._id);
      }
      if (response.status === 200) {
        if (role === 'Teacher') {
          dispatch(TeacherClassLogin(response.data));
          navigate('/teacher/dashboard');
        } else {
          toast.success('Joined classroom successfully!');
        }
      } else {
        toast.error(response.response.data.error);
      }
    } catch (error) {
      toast.error('An error occurred while joining the classroom.');
    }
    setModalOpen(false);
  };

  return (
    <div className="flex flex-row md:min-h-screen bg-gray-100">
      <div className="flex flex-col w-full">
        <div className="flex justify-center items-center w-full mt-16">
          <div className="bg-white px-24 py-28 rounded-lg shadow-lg max-w-6xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome, {role === 'Teacher' && teacher?.name ? teacher.name : 'Student'}!
              </h1>
              <button
                onClick={() => setModalOpen(true)}
                className="border-2 border-[#2E236C] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#544a8f] hover:text-white"
              >
                {role === 'Teacher' ? 'Create Classroom' : 'Join Classroom'}
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#2E236C]"></div>
                <p className="text-gray-700 font-semibold ml-4">Loading classrooms...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {classrooms.map((classroom) => (
                  <div
                    key={classroom._id}
                    className="relative bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-16 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
                  >
                    <h2 className="text-xl font-bold text-gray-900 mb-2 mt-6">{classroom.subject}</h2>
                    <p className="text-sm text-gray-700 font-semibold mb-4">Tutor: {teacher?.name}</p>
                    <button
                      onClick={() => handleJoinClassroom(classroom._id)}
                      className="absolute bottom-4 right-4 bg-[#2E236C] px-6 py-2 rounded-md text-white hover:bg-[#544a8f] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900"
                    >
                      {"Join"}
                    </button>
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-md">
                      {classroom.classroomid}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <CreateClassroom
        isOpen={role === 'Teacher' && isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateClassroom}
      />
      <JoinClassroomModal
        isOpen={role === 'Student' && isModalOpen}
        onClose={() => setModalOpen(false)}
        onJoin={handleJoinClassroom}
      />
      <ToastContainer />
    </div>
  );
};

export default Classrooms;
