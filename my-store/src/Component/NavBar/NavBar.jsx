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
        <div className="w-full h-[80px] px-6 bg-white shadow-sm flex items-center justify-between rounded-b-2xl">
          {/* Menu desktop */}
          <div className="hidden md:flex gap-6 items-center text-gray-600 font-medium">
            <Link
              to="/"
              className={`${
                location.pathname === "/" ? "text-black underline" : "hover:text-black"
              } transition text-sm`}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className={`${
                location.pathname === "/contact" ? "text-black underline" : "hover:text-black"
              } transition text-sm`}
            >
              Contact
            </Link>
          </div>

          {/* Burger / Close */}
          <div className="md:hidden flex items-center justify-center">
            {!openMenu ? (
              <CiMenuBurger
                className="w-7 h-7 text-gray-700 cursor-pointer hover:text-black transition"
                onClick={() => setOpenMenu(true)}
              />
            ) : (
              <TfiClose
                className="w-7 h-7 text-gray-700 cursor-pointer hover:text-black transition"
                onClick={() => setOpenMenu(false)}
              />
            )}
          </div>

          {/* Logo */}
          <img
            src={x}
            alt="Logo"
            className="h-[65px] w-[65px] object-contain cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Icons */}
          <div className="flex gap-6 items-center text-gray-700">
            <CiSearch
              className="w-8 h-8 cursor-pointer hover:text-black transition"
              onClick={() => setOpenSearch(true)}
            />
            <CiUser
              className="w-8 h-8 cursor-pointer hover:text-black transition"
              onClick={() => navigate("/login")}
            />
            <div className="relative">
              <CiShop
                onClick={() => navigate("/cart")}
                className="w-8 h-8 cursor-pointer hover:text-black transition"
              />
              <span className="absolute -bottom-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
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
