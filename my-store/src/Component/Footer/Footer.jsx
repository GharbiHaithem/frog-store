import React from 'react'
import { IoLogoFacebook } from "react-icons/io5";
import { FiInstagram } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
const Footer = () => {
  return (
 <footer className="bg-gray-900 text-white py-6">
  <div className=" mx-auto  ">
    <div className=' flex items-center justify-center border-b  border-gray-500 py-6 gap-10 mb-10'>
<IoLogoFacebook   className='text-4xl cursor-pointer'  style={{fontSize:'20px'}} />
<FiInstagram   className='text-4xl cursor-pointer'  style={{fontSize:'20px'}}  />
<FaTiktok     className='text-4xl cursor-pointer' style={{fontSize:'20px'}} />
      
    
    </div>
    <div className="text-center">
      <p className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Frog store. Tous droits réservés.
      </p>
    
    </div>
  </div>
</footer>
  )
}

export default Footer