import React, { useState, useEffect } from "react";
import { AiOutlineDashboard, AiTwotoneSkin } from "react-icons/ai";
import { TbCategoryPlus, TbBrandApple } from "react-icons/tb";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { TiFolderAdd } from "react-icons/ti";
import { MdOutlineChecklistRtl } from "react-icons/md";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const LeftSideBar = ({openMenu,setOpenMenu}) => {

  const [isMobile, setIsMobile] = useState(false);

  // Détecter si écran est mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(openMenu)
  localStorage.setItem('menu',openMenu)
  return (
    <>
      {/* Bouton mobile + desktop */}
      <button
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {openMenu ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      {/* ✅ Sidebar unique */}
      <motion.aside
        animate={{ width: openMenu ? 240 : 80 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-xl flex flex-col items-start p-3 z-40 mt-[60px] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-center w-full mb-8 mt-2">
          <AiOutlineDashboard className="text-2xl text-blue-200" />
          {openMenu && (
            <h1 className="ml-2 font-semibold tracking-wide text-sm">
              ADMIN PANEL
            </h1>
          )}
        </div>

        {/* Links */}
        <SidebarItem
          openMenu={openMenu}
          icon={<AiTwotoneSkin className="text-xl text-blue-200" />}
          title="BANNER"
          items={[{ label: "Créer Banner", icon: <TiFolderAdd />, path: "/addbanner" }]}
        />

        <SidebarItem
          openMenu={openMenu}
          icon={<TbCategoryPlus className="text-xl text-blue-200" />}
          title="CATEGORY"
          items={[
            { label: "Add Category", icon: <TiFolderAdd />, path: "/addcategory" },
            { label: "List Category", icon: <MdOutlineChecklistRtl />, path: "/listcategory" },
          ]}
        />

        <SidebarItem
          openMenu={openMenu}
          icon={<IoLogoGooglePlaystore className="text-xl text-blue-200" />}
          title="PRODUCTS"
          items={[
            { label: "Add Product", icon: <TiFolderAdd />, path: "/addproduct" },
            { label: "List Products", icon: <MdOutlineChecklistRtl />, path: "/listproduct" },
          ]}
        />

        <SidebarItem
          openMenu={openMenu}
          icon={<TbBrandApple className="text-xl text-blue-200" />}
          title="BRANDS"
          items={[
            { label: "Add Brand", icon: <TiFolderAdd />, path: "/addbrand" },
            { label: "List Brands", icon: <MdOutlineChecklistRtl />, path: "/listbrand" },
          ]}
        />

        <SidebarItem
          openMenu={openMenu}
          icon={<RiShoppingBag3Fill className="text-xl text-blue-200" />}
          title="ORDERS"
          items={[{ label: "List Commandes", icon: <MdOutlineChecklistRtl />, path: "/listcommand" }]}
        />

        {/* Footer */}
        {openMenu && (
          <div className="absolute bottom-4 left-0 w-full text-center text-sm text-blue-300">
            <p className="opacity-70">&copy; 2025 Your Company</p>
          </div>
        )}
      </motion.aside>
    </>
  );
};

// Sous-composant menu
const SidebarItem = ({ openMenu, icon, title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col mb-2 w-full">
      <div
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg hover:bg-blue-800 transition-all duration-300 ${
          open ? "bg-blue-800" : ""
        }`}
      >
        {icon}
        {openMenu && <span className="text-sm font-semibold tracking-wide flex-1">{title}</span>}
        {openMenu && (
          <motion.span animate={{ rotate: open ? 90 : 0 }} className="text-blue-200 text-xs">
            ▶
          </motion.span>
        )}
      </div>

      {open && openMenu && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="ml-6 mt-1 flex flex-col space-y-1 border-l border-blue-400 pl-3"
        >
          {items.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-all duration-200"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LeftSideBar;
