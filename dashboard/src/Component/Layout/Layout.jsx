import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import { Outlet } from 'react-router'

const Layout = ( ) => {

 const [openMenu, setOpenMenu] = useState(() => {
    // ✅ Lire la valeur initiale depuis localStorage au premier rendu
    return localStorage.getItem("menu") === "true";
  });

  // ✅ Synchroniser `localStorage` à chaque changement de `openMenu`
  useEffect(() => {
    localStorage.setItem("menu", openMenu);
  }, [openMenu]);

  // ✅ Écouter les changements du localStorage depuis d'autres onglets / composants
  useEffect(() => {
    const handleStorageChange = () => {
      setOpenMenu(localStorage.getItem("menu") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
   <>
   <Navbar/>
   <LeftSideBar  openMenu={openMenu} setOpenMenu={setOpenMenu} />
   <div className={` ${openMenu ? 'translate-x-[250px]' : 'translate-x-[80px]' } p-3 max-h-full h-screen mt-20`} >
      <Outlet  openMenu={openMenu} setOpenMenu={setOpenMenu}/>
   </div>
   </>
  )
}

export default Layout