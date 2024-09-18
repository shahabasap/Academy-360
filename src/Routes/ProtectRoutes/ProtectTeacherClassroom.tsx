import { selectTeacherClass } from '../../features/teacher/teacherSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectTeacherClassroom = () => {
    const teacherClassroom=useSelector(selectTeacherClass)
   
    if(teacherClassroom==null)
    {
        return <Navigate to='/teacher/classroom' replace/>
    }
    
    return <Outlet />;
}

export default ProtectTeacherClassroom
