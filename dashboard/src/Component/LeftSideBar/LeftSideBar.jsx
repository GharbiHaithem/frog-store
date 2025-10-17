import React from 'react'
import { AiOutlineDashboard, AiTwotoneSkin } from "react-icons/ai";
import { TbCategoryPlus, TbBrandApple } from "react-icons/tb";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { TiFolderAdd } from "react-icons/ti";
import { MdOutlineChecklistRtl } from "react-icons/md";
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { RiShoppingBag3Fill } from "react-icons/ri";
const LeftSideBar = ({ openMenu, setOpenMenu }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onMouseEnter={() => setOpenMenu(true)}
      onMouseLeave={() => setOpenMenu(false)}
      animate={{ width: openMenu ? 240 : 65 }}
      transition={{ duration: 0.3 }}
      className="h-full fixed top-0 left-0 bg-white mt-[60px] shadow-xl p-3 flex flex-col items-start"
    >
      {/* Dashboard */}
      <div className="flex justify-center w-full mb-8">
        <AiOutlineDashboard className="text-2xl text-gray-400" />
      </div>

      {/* Section réutilisable */}
      <SidebarItem
        openMenu={openMenu}
        icon={<AiTwotoneSkin className="text-xl text-gray-500" />}
        title="BANNER"
        items={[
          { label: "Créer Banner", icon: <TiFolderAdd />, path: "/addbanner" },
        ]}
      />

      <SidebarItem
        openMenu={openMenu}
        icon={<TbCategoryPlus className="text-xl text-gray-500" />}
        title="CATEGORY"
        items={[
          { label: "Add Category", icon: <TiFolderAdd />, path: "/addcategory" },
          { label: "List Category", icon: <MdOutlineChecklistRtl />, path: "/listcategory" },
        ]}
      />

      <SidebarItem
        openMenu={openMenu}
        icon={<IoLogoGooglePlaystore className="text-xl text-gray-500" />}
        title="PRODUCTS"
        items={[
          { label: "Add Product", icon: <TiFolderAdd />, path: "/addproduct" },
          { label: "List Products", icon: <MdOutlineChecklistRtl />, path: "/listproduct" },
        ]}
      />

      <SidebarItem
        openMenu={openMenu}
        icon={<TbBrandApple className="text-xl text-gray-500" />}
        title="BRANDS"
        items={[
          { label: "Add Brand", icon: <TiFolderAdd />, path: "/addbrand" },
          { label: "List Brands", icon: <MdOutlineChecklistRtl />, path: "/listbrand" },
        ]}
      />
        <SidebarItem
        openMenu={openMenu}
        icon={<RiShoppingBag3Fill  className="text-xl text-gray-500" />}
        title="ORDER"
        items={[
     
          { label: "List Brands", icon: <MdOutlineChecklistRtl />, path: "/listcommand" },
        ]}
      />
    </motion.div>
  );
};

// 🔹 Composant réutilisable
const SidebarItem = ({ openMenu, icon, title, items }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mb-3">
      <span className="flex items-center gap-3 cursor-pointer">
        {icon}
        {openMenu && <span className="text-sm font-semibold text-gray-600 tracking-wide">{title}</span>}
      </span>

      {openMenu && (
        <div className="flex">
          <span className="border-l ml-3 mt-2 h-[65px]" />
          <div className="flex flex-col ml-3">
            {items.map((item, i) => (
              <div
                key={i}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition"
              >
                <span className="border-b w-[10px] translate-y-[-3px]" />
                <span className="py-1 flex items-center gap-1">
                  {item.icon}
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSideBar;
