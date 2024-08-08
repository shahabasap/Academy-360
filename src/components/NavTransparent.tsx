import React from 'react'
import logo from './../assets/logo-black.png'

const NavTransparent = () => {
  return (
    <nav className="flex bg-transparent p-2 w-full">
        <div className='bg-transparent ml-7'>
            <img className='h-12 w-13'  src={logo} alt="Academy-360-logo" />
            
        </div>
        <div>
        <h1 className='text-[#2E236C] text-2xl ml-7 font-semibold'>ACADEMY 360</h1>
        <h3 className='text-black font-light  float-end '>We are the best</h3>
        </div>
       
      
    </nav>
  )
}

export default NavTransparent
