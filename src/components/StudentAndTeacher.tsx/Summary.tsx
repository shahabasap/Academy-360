import React from 'react'
import MainSideNav from '../../Pages/Student/MainSideNav'
import MainTopNav from './MainTopNav'

const Summary = () => {
  return (
    <>
      <div className="flex flex-row">
        <MainSideNav />
        <div className="flex flex-col w-full">
          <MainTopNav />

          <div className="snap-x snap-mandatory overflow-x-auto scrollbar-hidden">
            <div className="flex flex-row justify-evenly items-center p-9 snap-start">
              <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">Summary</span>
              <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">Chats</span>
              <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">Exams</span>
              <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">Materials</span>
              <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">works</span>
              <span className="hover:bg-[#66608C] hover:text-white p-2 px-6 rounded-md">Announcements</span>
            </div>
            <hr className="-mt-6" />
            <div className="p-3">
              {/* Content here */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Summary
