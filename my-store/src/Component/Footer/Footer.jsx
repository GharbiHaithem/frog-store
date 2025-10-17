import React from 'react';
import { IoLogoFacebook } from "react-icons/io5";
import { FiInstagram } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  const socialClasses = "transition-transform transform hover:scale-125 hover:shadow-lg rounded-full p-2";

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        
        {/* Social Icons */}
        <div className="flex gap-8 mb-6">
          <a
            href="https://www.facebook.com/profile.php?id=100075717586771"
            target="_blank"
            rel="noopener noreferrer"
            className={`${socialClasses} bg-blue-600 hover:bg-blue-700`}
          >
            <IoLogoFacebook className="text-3xl" />
          </a>

          <a
            href="https://www.instagram.com/accounts/login/?next=%2Ffrogstorenabeul%2F&source=omni_redirect"
            target="_blank"
            rel="noopener noreferrer"
            className={`${socialClasses} bg-gradient-to-tr from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600`}
          >
            <FiInstagram className="text-3xl" />
          </a>

          <a
            href="#"
            className={`${socialClasses} bg-black hover:bg-gray-800`}
          >
            <FaTiktok className="text-3xl text-white" />
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-gray-400 text-sm md:text-base text-center">
          &copy; {new Date().getFullYear()} Frog Store. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
