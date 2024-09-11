import React, { useEffect, useState } from 'react';
import { FaUnlock, FaLock } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiController from '../../Api/apiCalls'
import {IClassroom} from '../../types/commonType'
import { toast } from 'react-toastify';
import { userClassLogin } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';

const UnlockClassroom = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const classroomId = queryParams.get('classroomid');
    const studentId = queryParams.get('studentid');
    const[classroom,setClassroom]=useState<IClassroom | null>()
    const [isLocked, setIsLocked] = useState(true);
    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(()=>{
      const classroom= ApiController.classroomData(classroomId as string)
      .then((response)=>{
        setClassroom(response.data)
      }).catch((error)=>{
        setClassroom(null)
      
      })
      const isInBucket=ApiController.ClassroomIsInBucket(classroomId as string,studentId as string)
      .then((response)=>{
        setIsLocked(response.data)
      }).catch((error)=>{
        setIsLocked(true)
       
      })
    },[classroomId,studentId])

    const handleClick = () => {
        const classroom=  ApiController.AddClassroomsToStudentBucket(classroomId as string,studentId as string)
        .then((response)=>{
            if(response.data)
            {
                toast.success("You were added to the classroom succcessfully")
               
            }
            else
            {
                toast.error(response.response.data.error)
            }
           
        }).catch((error)=>{
            
            toast.error("Failed to add classroom")
        })
      

        
      };

        const handleJoin=async()=>{
        const response = await ApiController.JoinClassroomStudent(classroomId as string,studentId as string);
        if (response.status === 200) {
          dispatch(userClassLogin(response.data));
          navigate('/dashboard');
         
        } else {
          toast.error(`${response.response?.data?.error || 'Failed to join classroom'}`);
        }
      }
      
    return (
        <div className='flex items-center justify-center h-screen'>
        <div 
          className="relative w-1/3 h-2/4 bg-[url('https://t4.ftcdn.net/jpg/08/56/14/03/360_F_856140378_ZODrsGty5vU4UEmpeAgzxT6c1QegD3cc.jpg')] bg-cover bg-center shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl group"
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
            <h2 
              className="text-5xl font-bold text-white mb-2 transition-colors duration-300 ease-in-out hover:text-yellow-400"
              style={{ WebkitTextStroke: '1px red', WebkitTextFillColor: 'white' }}
            >
              {classroom?.subject}
            </h2>
            <p className="text-2xl text-white font-semibold mb-4">Tutor:{classroom?.teacherid?.name}</p>
            <p className="text-lg text-white font-semibold mb-4">{classroom?.description}</p>

            <FaLock size={40} color="white" onClick={handleClick} className={`group-hover:hidden transition-opacity duration-300 ease-in-out ${isLocked ? '' : 'hidden'}`} />
             <button onClick={handleJoin} className={`text-white  text-lg border border-white bg-red-600 p-2 rounded-md ${!isLocked ? '' : 'hidden'}`}>Join Now</button>
            
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-md">
              #c34kd54d
            </div>
          </div>
          {isLocked?
          ( 
            <>
            {/* Blur effect */}
            <div className="absolute inset-0 group-hover:backdrop-blur-md duration-300 ease-in-out"></div>
  
            {/* Unlock animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out border border-indigo-600 cursor-pointer" onClick={handleClick}>
             {/* Lock Icon */}
      <FaLock
        size={40}
        color="white"
        className={`transform transition-transform duration-500 ease-in-out ${isLocked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      />
      
      {/* Unlock Icon */}
      <FaUnlock
        size={40}
        color="white"
        className={`absolute transform transition-transform duration-500 ease-in-out ${isLocked ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      />
      
      <p className="text-lg text-white font-semibold mt-2">Please {isLocked ? 'unlock' : 'locked'}</p>
    </div>
             
            </>
            ):null}
         
        </div>
    </div>
    );
}

export default UnlockClassroom;

// Custom CSS for spin animation
const styles = `
  .animate-spin-slow {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
