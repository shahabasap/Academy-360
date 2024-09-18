
import {selectUserClass } from '../../features/user/userSlice'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectStudentClassroom = () => {
  const studentClassroom=useSelector(selectUserClass)
  
  if(studentClassroom==null)
  {
    return <Navigate to="/classroom" replace />;

  }
  return <Outlet />;
  
}

export default ProtectStudentClassroom
