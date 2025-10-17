import React from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar'

const Navbar = () => {
  return (
<div className='w-full h-[80px] bg-white shadow-slate-950' >
     <div className='fixed top-0 left-0  h-[60px] px-10 py-5 w-[80%] '>
     <div className='flex justify-between items-center  '>
       <span className='md:text-xl font-bold text-xs '>ADMIN PANEL FROG STORE</span>
     
     </div>
     </div>
      <LeftSideBar/>
     <div></div>
</div>

  )
}

export default Navbar