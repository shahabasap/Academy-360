import useRole from '../../../hooks/RoleState'
import React from 'react'

const Classrooms = () => {
    const role =useRole()
  return (
    
    <div className="flex flex-row md:min-h-screen bg-gray-100">
  <div className="flex flex-col w-full">
    <div className="flex justify-center items-center w-full mt-16 ">
      <div className="bg-white px-24 py-28 rounded-lg shadow-lg max-w-6xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{role}</h1>
          <button className="border-2 border-[#2E236C] text-black font-semibold  px-4 py-2 rounded-md hover:bg-[#544a8f] hover:text-white   ">
            Add Classroom
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {['Malayalam', 'Science', 'Mathematics'].map((subject, index) => (
            <div key={index} className="relative bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-16 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-2 mt-6">{subject}</h2>
              <p className="text-sm text-gray-700 font-semibold mb-4">Tutor: Majidata Mam</p>
              <button className="absolute bottom-4 right-4 bg-[#2E236C] px-6 py-2 rounded-md text-white hover:bg-[#544a8f] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900">
                Join
              </button>
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-md">
                #123456
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

  
  )

}

export default Classrooms
