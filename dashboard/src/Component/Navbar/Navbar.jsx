import React from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoNotificationsOutline } from "react-icons/io5";
import './Navbar.css'
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
const Navbar = () => {
  const {commande}= useSelector(state=>state?.commande)
  return (
<div className='w-full fixed top-0 left-0 z-50  h-[80px]   bg-[#1d4ed7] border text-white ' >
     <div className=' px-16 py-3  '>
     <div className='flex justify-between items-center  '>
       <span className='md:text-xl font-bold text-lg  '>ADMIN PANEL </span>
     <span className='h-[25px] '>
 <Dropdown>
  <Dropdown.Toggle  >
  <IoNotificationsOutline/>
  </Dropdown.Toggle>

  <Dropdown.Menu className='w-[300px]'>
 {
  commande?.length > 0 && commande.map((c, i) => (
    <Dropdown.Item
      key={i}
      href="#/action-1"
      className="relative p-3 mb-1 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200 border border-gray-100 cursor-pointer"
    >
      <div className="flex flex-col gap-1">
        {/* Nom et contenu */}
        <p className="text-sm font-semibold text-gray-800">
          {c?.user?.lastname + " " + c?.user?.firstname}
        </p>

        <p className="text-xs text-gray-600">
          <span className="font-medium text-blue-600">a commandé</span>{" "}
          {c?.cart?.items?.length} articles
        </p>
      </div>

       {/* ⏱️ Temps réel */}
      <p className="absolute bottom-1 right-2 text-[10px] text-gray-400 italic">
        {moment(c?.createdAt).fromNow()}
      </p>
    </Dropdown.Item>
  ))
}

   
  
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