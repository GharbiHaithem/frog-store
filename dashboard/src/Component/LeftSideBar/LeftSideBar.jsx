import React, { useState } from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { TiFolderAdd } from "react-icons/ti";
import { MdOutlineChecklistRtl } from "react-icons/md";
import { useNavigate } from 'react-router';
import { TbBrandApple } from "react-icons/tb";
const LeftSideBar = ({openMenu,setOpenMenu}) => {
     
      const navigate = useNavigate()
  return (
    <div  onMouseEnter={()=>setOpenMenu(true)}  onMouseLeave={()=>setOpenMenu(false)} className={` ${openMenu ? 'w-[250px]' : 'w-[60px]'}  h-full fixed top-0 shadow-xl left-0 bg-white px-3 py-3 `}>
    <div  className="flex flex-col gap-5 items-start">  <AiOutlineDashboard style={{ strokeWidth: 2 }}   className='text-4xl font-extrabold mb-10 shadow-sm text-gray-400' />
   <div className='flex  flex-col '>
   <span className='flex gap-3 cursor-pointer items-center'> <TbCategoryPlus  className='text-3xl text-gray-500 cursor-pointer'/> {openMenu && <span  className='text-sm  font-extrabold text-gray-500 tracking-wider'>CATEGORY</span>}</span>
{openMenu && <div className='flex  '>
 <span className=' border-l ml-3 mt-2 h-[70px]'>&nbsp;</span>
<>
<div className='flex flex-col '>
<div onClick={()=>navigate("/addcategory")} className='flex items-center'><span className='border-b-2 -translate-y-3 w-[10px]'>&nbsp;</span><span className='py-2 p-2 px-2 flex items-center gap-2'><TiFolderAdd/>ADD CATEGORY</span></div>
<div className='flex items-center'><span className='border-b-2  -translate-y-3 w-[10px]'>&nbsp;</span><span className='py-2 p-2 px-2 flex items-center gap-2'><MdOutlineChecklistRtl/>LIST CATEGORY</span></div>
</div>
</>
 
 </div>}
   </div>
  <div>
  <span  className='flex gap-3 cursor-pointer items-center'> <IoLogoGooglePlaystore  className='text-3xl text-gray-500 cursor-pointer'/> {openMenu && <span  className='text-sm  font-extrabold text-gray-500 tracking-wider'>PRODUCTS</span>}</span>
  {openMenu && <div className='flex  '>
 <span className=' border-l ml-3 mt-2 h-[70px]'>&nbsp;</span>
<>
<div className='flex flex-col '>
<div onClick={()=>navigate("/addproduct")} className='flex items-center'><span className='border-b-2 -translate-y-3 w-[10px]'>&nbsp;</span><span className='py-2 p-2 px-2 flex items-center gap-2'><TiFolderAdd/>ADD PRODUCT</span></div>
<div onClick={()=>navigate("/listproduct")} className='flex items-center'><span className='border-b-2  -translate-y-3 w-[10px]'>&nbsp;</span><span className='py-2 p-2 px-2 flex items-center gap-2'><MdOutlineChecklistRtl/>LIST PRODUCTS</span></div>
</div>
</>
 
 </div>}
  </div>

  <div>
  <span  className='flex gap-3 cursor-pointer items-center'> <TbBrandApple   className='text-3xl text-gray-500 cursor-pointer'/> {openMenu && <span  className='text-sm  font-extrabold text-gray-500 tracking-wider'>BRANDS</span>}</span>
  {openMenu && <div className='flex  '>
 <span className=' border-l ml-3 mt-2 h-[70px]'>&nbsp;</span>
<>
<div className='flex flex-col '>
<div onClick={()=>navigate("/addbrand")} className='flex items-center'><span className='border-b-2 -translate-y-3 w-[10px]'>&nbsp;</span><span className='py-2 p-2 px-2 flex items-center gap-2'><TiFolderAdd/>ADD BRAND</span></div>
<div onClick={()=>navigate("/listproduct")} className='flex items-center'><span className='border-b-2  -translate-y-3 w-[10px]'>&nbsp;</span><span className='py-2 p-2 px-2 flex items-center gap-2'><MdOutlineChecklistRtl/>LIST BRANDS</span></div>
</div>
</>
 
 </div>}
  </div>
    </div>
    </div>
  )
}

export default LeftSideBar