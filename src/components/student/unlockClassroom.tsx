import React, { useEffect, useState } from 'react';
import { FaUnlock, FaLock } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ApiController from '../../Api/apiCalls';
import { userClassLogin } from '../../features/user/userSlice';
import { IClassroom } from '../../types/commonType';

const UnlockClassroom: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const classroomId = queryParams.get('classroomid') || '';
    const studentId = queryParams.get('studentid') || '';

    const [classroom, setClassroom] = useState<IClassroom | null>(null);
    const [isLocked, setIsLocked] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [classroomResponse, bucketResponse] = await Promise.all([
                    ApiController.classroomData(classroomId),
                    ApiController.ClassroomIsInBucket(classroomId, studentId)
                ]);
                setClassroom(classroomResponse.data);
                setIsLocked(bucketResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load classroom data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [classroomId, studentId]);

    const handleUnlock = async () => {
        try {
            const response = await ApiController.AddClassroomsToStudentBucket(classroomId, studentId);
            if (response.data) {
                setIsLocked(false);
                toast.success('You were added to the classroom successfully');
            } else {
                toast.error(response.response.data.error);
            }
        } catch (error) {
            console.error('Error unlocking classroom:', error);
            toast.error('Failed to add classroom');
        }
    };

    const handleJoin = async () => {
        try {
            const response = await ApiController.JoinClassroomStudent(classroomId, studentId);
            if (response.status === 200) {
                dispatch(userClassLogin(response.data));
                navigate('/dashboard');
            } else {
                toast.error(response.response?.data?.error || 'Failed to join classroom');
            }
        } catch (error) {
            console.error('Error joining classroom:', error);
            toast.error('Failed to join classroom');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="relative w-1/3 h-2/4 bg-[url('https://t4.ftcdn.net/jpg/08/56/14/03/360_F_856140378_ZODrsGty5vU4UEmpeAgzxT6c1QegD3cc.jpg')] bg-cover bg-center shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl group">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                    <h2 className="text-5xl font-bold text-white mb-2 transition-colors duration-300 ease-in-out hover:text-yellow-400"
                        style={{ WebkitTextStroke: '1px red', WebkitTextFillColor: 'white' }}>
                        {classroom?.subject}
                    </h2>
                    <p className="text-2xl text-white font-semibold mb-4">Tutor: {classroom?.teacherid?.name}</p>
                    <p className="text-lg text-white font-semibold mb-4">{classroom?.description}</p>

                    {isLocked ? (
                        <FaLock size={40} color="white" onClick={handleUnlock} className="cursor-pointer" />
                    ) : (
                        <button onClick={handleJoin} className="text-white text-lg border border-white bg-red-600 p-2 rounded-md">
                            Join Now
                        </button>
                    )}

                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-md">
                        #c34kd54d
                    </div>
                </div>
                {isLocked && (
                    <>
                        <div className="absolute inset-0 group-hover:backdrop-blur-md duration-300 ease-in-out"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out border border-indigo-600 cursor-pointer" onClick={handleUnlock}>
                            <FaLock size={40} color="white" className="animate-bounce transform transition-transform duration-500 ease-in-out" />
                            <p className="text-lg text-white font-semibold mt-2">Please unlock</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UnlockClassroom;