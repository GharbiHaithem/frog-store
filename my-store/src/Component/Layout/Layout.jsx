import React from 'react'

import { Outlet } from 'react-router'
import { FaWhatsapp } from "react-icons/fa";

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
const Layout = ({openMenu,setOpenMenu,openSearch,setOpenSearch,cartitem}) => {
  return (
    <div className='flex   flex-col '>
    <NavBar cartitem={cartitem} openMenu={openMenu} setOpenMenu={setOpenMenu}  openSearch={openSearch} setOpenSearch={setOpenSearch}/>
    <Outlet/>
<Footer/>
    </div>
  )
}

export default Layout