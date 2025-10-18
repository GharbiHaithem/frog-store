import React from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar'

const Navbar = () => {
  return (
<div className='w-full fixed top-0 left-0   h-[80px]   bg-[#1d4ed7] text-white ' >
     <div className=' px-16 py-5 w-[80%] '>
     <div className='flex justify-between items-center  '>
       <span className='md:text-xl font-bold text-lg  '>ADMIN PANEL </span>
     
     </div>
     </div>
      <LeftSideBar/>
     <div></div>
</div>

  )
}

export default Navbar