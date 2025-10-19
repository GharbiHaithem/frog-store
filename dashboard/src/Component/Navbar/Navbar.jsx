import React from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoNotificationsOutline } from "react-icons/io5";
import './Navbar.css'
const Navbar = () => {
  return (
<div className='w-full fixed top-0 left-0   h-[80px]   bg-[#1d4ed7] text-white ' >
     <div className=' px-16 py-3 w-[80%] '>
     <div className='flex justify-between items-center  '>
       <span className='md:text-xl font-bold text-lg  '>ADMIN PANEL </span>
     <span className='h-[25px]'>
 <Dropdown>
  <Dropdown.Toggle  >
  <IoNotificationsOutline/>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     </span>
     </div>
     </div>
    
     <div></div>
</div>

  )
}

export default Navbar