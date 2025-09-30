import React from "react";
import x from "../../assets/aqw-removebg-preview.png";
import { CiSearch, CiUser, CiShop, CiMenuBurger } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ setOpenMenu, openMenu, setOpenSearch, cartitem }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div
        className={`${
          location.pathname === "/checkout" ? "hidden" : ""
        } fixed top-0 left-1/2 -translate-x-1/2 w-full md:w-[80%] z-20`}
      >
        <div className="w-full h-[80px] px-6 bg-white  flex items-center justify-between ">
          {/* Menu desktop */}
         

          {/* Burger / Close */}
          <div className="md:hidden flex items-center justify-center">
            {!openMenu ? (
              <CiMenuBurger
                className="w-10 h-10 text-gray-700 cursor-pointer hover:text-black transition"
                onClick={() => setOpenMenu(true)}
              />
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
            className="h-[85px] w-[85px] object-contain cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Icons */}
          <div className="flex gap-6 items-center text-gray-700">
            <CiSearch
              className="w-10 h-10 cursor-pointer hover:text-black transition"
              onClick={() => setOpenSearch(true)}
            />
            <CiUser
              className="w-10 h-10 cursor-pointer hover:text-black transition"
              onClick={() => navigate("/login")}
            />
            <div className="relative">
              <CiShop
                onClick={() => navigate("/cart")}
                className="w-10 h-10 cursor-pointer hover:text-black transition"
              />
              <span className="absolute -bottom-2 -right-2 bg-black text-white text-xs w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                {cartitem ? cartitem : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
