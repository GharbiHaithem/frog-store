import React, { useEffect, useState } from "react";
import x from "../../assets/aqw-removebg-preview.png";
import { CiSearch, CiUser, CiShop, CiMenuBurger } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RotatingText from '../RotatingText/RotatingText'
import { useMediaQuery } from "react-responsive";
import { io } from 'socket.io-client';
const NavBar = ({ setOpenMenu, openMenu, setOpenSearch, cartitem }) => {
  const socket = io('http://localhost:5000');
  const navigate = useNavigate();
  const location = useLocation();
  const isSmall = useMediaQuery({ maxWidth: 640 });
  const isMedium = useMediaQuery({ minWidth: 641, maxWidth: 2024 });

  return (
    <>
    <RotatingText/>
      <div
        className={`${
          location.pathname === "/checkout" ? "hidden" : ""
        } fixed ${isMedium ? 'top-0' : 'top-[60px]'} left-1/2 -translate-x-1/2 w-full md:w-[80%] z-20`}
      >
        <div className={`w-full h-[80px]  px-6 bg-white   flex items-center justify-between `}>
          {/* Menu desktop */}
         

          {/* Burger / Close */}
          <div className="md:hidden flex items-center  gap-10 justify-center">
            {!openMenu ? (
            <>
              <CiMenuBurger
                className="w-10 h-10 text-gray-700 cursor-pointer hover:text-black transition"
                onClick={() => setOpenMenu(true)}
              />
               <img
            src={x}
            alt="Logo"
            className="h-[85px] md:hidden block w-[85px] object-contain cursor-pointer"
            onClick={() => navigate("/")}
          /></>
            ) : (
              <TfiClose
                className="w-10 h-10 text-gray-700 cursor-pointer hover:text-black transition"
                onClick={() => setOpenMenu(false)}
              />
            )}
          </div>

          {/* Logo */}
            <img
            src={x}
            alt="Logo"
            className="h-[85px] hidden md:block w-[85px] object-contain cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Icons */}
          <div className="flex gap-6 items-center text-gray-700">
            <CiSearch
              className="w-10 h-10 cursor-pointer hover:text-black transition"
              onClick={() => setOpenSearch(true)}
            />
     
            <div className="relative">
              <CiShop
                onClick={() => navigate("/cart")}
                className="w-10 h-10 cursor-pointer hover:text-black transition"
              />
           {cartitem>0&&   <span className="absolute -bottom-2 -right-2 bg-black text-white text-xs w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                {cartitem && cartitem }
              </span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
