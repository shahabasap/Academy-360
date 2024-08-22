import React from 'react'
import ProfileSidebar from '../profile/profileSidebar'
import Classrooms  from './ClassroomCard '
import useRole from '../../../hooks/RoleState'


const ProfileClassroom = () => {
  const role=useRole()
  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
        <div className='w-64'>
        <ProfileSidebar />
        </div>
    
    <div className="flex flex-col w-full">
      {/* Profile management form and other contents */}
      
      {/* Add the Classrooms section */}
      <Classrooms  />
    </div>
  </div>
  )
}

export default ProfileClassroom
