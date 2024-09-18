import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ApiController from '../Api/apiCalls';
import { selectTeacherClass, TeacherClassLogin } from '../features/teacher/teacherSlice';
import { selectUserClass, userClassLogin } from '../features/user/userSlice';

function useClassroom(Role: string): { classroomData: any | null } {
    const dispatch = useDispatch();
    const role = Role;
    const teacherClassroom = useSelector(selectTeacherClass);
    const teacherClassroomId = teacherClassroom?._id;
    const studentClassroom = useSelector(selectUserClass);
    const studentClassroomId = studentClassroom?._id;

    const [classroomData, setClassroom] = useState(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (role === "Teacher" && teacherClassroomId) {
                    const classroom = await ApiController.TeacherClassroomData(teacherClassroomId);
                    if (classroom.status === 200) {
                        dispatch(TeacherClassLogin(classroom.data));
                        setClassroom(classroom.data);
                        setError(null);  // Clear any previous errors
                    } else {
                        setError("Failed to fetch teacher data");
                    }
                } else if (role === "Student" && studentClassroomId) {
                    const classroom = await ApiController.ClassroomEntireData(studentClassroomId);
                    if (classroom.status === 200) {
                        dispatch(userClassLogin(classroom.data));
                        setClassroom(classroom.data);
                        setError(null);  // Clear any previous errors
                    } else {
                        setError("Failed to fetch student data");
                    }
                } else {
                    setError("Invalid role or missing classroom ID");
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(`Error fetching user data: ${error.message}`);
                } else {
                    setError("An unknown error occurred while fetching user data.");
                }
            } 
        };


        const timeoutId = setTimeout(() => {
            fetchUserData();
        }, 100);

        return () => clearTimeout(timeoutId);  // Cleanup timeout on unmount
    }, [role, teacherClassroomId, studentClassroomId, dispatch]);

    return { classroomData };
}

export default useClassroom;
