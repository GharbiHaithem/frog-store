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

const LeftSideBar = () => {
  const [openMenu, setOpenMenu] = useState(true); // élargi ou réduit
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur petit écran
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setOpenMenu(false); // mobile par défaut réduit
      else setOpenMenu(true); // desktop par défaut ouvert
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Bouton mobile uniquement si petit écran
  const MobileButton = () => (
    <button
      className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition md:hidden"
      onClick={() => setOpenMenu(!openMenu)}
    >
      {openMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
    </button>
  );

  return (
    <>
      {isMobile && <MobileButton />}

      {/* 🔹 Sidebar unique */}
      <motion.div
        animate={{ width: openMenu ? 240 : 80 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 h-full mt-[60px] bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-xl p-3 flex flex-col items-start z-40`}
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full px-2 mb-8">
          <AiOutlineDashboard className="text-2xl text-blue-200" />
          {!isMobile && (
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="text-blue-200 hover:text-white transition"
            >
              {openMenu ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          )}
        </div>

        {/* Menu items */}
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
          items={[
            { label: "List Commandes", icon: <MdOutlineChecklistRtl />, path: "/listcommand" },
          ]}
        />

        {/* Footer */}
        {openMenu && (
          <div className="absolute bottom-5 left-0 w-full text-center text-sm text-blue-300">
            <p className="opacity-70">&copy; 2025 Your Company</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

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
