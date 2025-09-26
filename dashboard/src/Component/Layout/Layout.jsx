import React from 'react'
import Navbar from '../Navbar/Navbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import { Outlet } from 'react-router'

const Layout = ({openMenu,setOpenMenu} ) => {
  return (
   <>
   <Navbar/>
   <LeftSideBar  openMenu={openMenu} setOpenMenu={setOpenMenu} />
   <div className={` ${openMenu ? 'translate-x-[260px]' : 'translate-x-[70px]' } p-3 max-h-full h-screen `} >
      <Outlet  openMenu={openMenu} setOpenMenu={setOpenMenu}/>
   </div>
   </>
  )
}

export default Layout