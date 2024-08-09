import React from 'react'
import MainSideNav from '../../components/StudentAndTeacher/MainSideNav'
import MainTopNav from '../../components/StudentAndTeacher/MainTopNav'
import SubNav from '../../components/StudentAndTeacher/SubNav'

const Summary = () => {
  return (
    <>
      <div className="flex flex-row">
        <MainSideNav />
        <div className="flex flex-col w-full">
          <MainTopNav  />

          <div className="snap-x snap-mandatory overflow-x-auto scrollbar-hidden">
            <SubNav />
            <hr className="-mt-6" />
            <div className="p-3">
             
             asodkfoajsdf;kj

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Summary
