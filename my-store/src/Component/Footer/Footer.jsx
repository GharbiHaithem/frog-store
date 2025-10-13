import React from 'react'
import { IoLogoFacebook } from "react-icons/io5";
import { FiInstagram } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
const Footer = () => {
  return (
 <footer className="bg-gray-900 text-white py-6">
  <div className=" mx-auto  ">
    <div className=' flex items-center justify-center border-b  border-gray-500 py-6 gap-10 mb-10'>
<a
  href="https://www.facebook.com/profile.php?id=100075717586771"
  target="_blank"
  rel="noopener noreferrer"
>
  <IoLogoFacebook
    className="text-4xl text-blue-600 hover:text-blue-800 cursor-pointer"
    style={{ fontSize: "20px" }}
  />
</a>
<a
  href="https://www.instagram.com/accounts/login/?next=%2Ffrogstorenabeul%2F&source=omni_redirect"
  target="_blank"
  rel="noopener noreferrer"
>
  <FiInstagram
    className="text-4xl text-pink-600 hover:text-pink-700 cursor-pointer"
    style={{ fontSize: "20px" }}
  />
</a>
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