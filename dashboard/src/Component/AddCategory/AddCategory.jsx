import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { addsouscategorie, createcategory, deletecategorie, getcategories } from '../../features/category/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
const AddCategory = ({ openMenu }) => {
  const dispatch = useDispatch();

  const[addClicked,setAddClicked] = useState(false)
  const[catId,setCatId] = useState(null)
  const schema = yup.object().shape({
    name: yup.string().required('Le nom de la catégorie est requis'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      if(addClicked){
     
        const data={
          catId,
         name: values.name
        } 
        console.log(data)
        dispatch(addsouscategorie(data))
        setTimeout(()=>{
          dispatch(getcategories())
        },2000)
        
      }else{
        dispatch(createcategory( values)); // Passe un objet avec la clé 'name'
      }
   
      formik.resetForm();
      setAddClicked(false)
    },
  });
 useEffect(()=>{
  dispatch(getcategories())
 },[])
 const{categories} = useSelector(state=>state?.category)
 const subCategoryIds = categories.flatMap(cat => cat.subCategories.map(subCat => subCat._id));

 // Étape 2 : Filtrer les catégories principales en excluant celles qui sont dans la liste des sous-catégories
 const mainCategories = categories.filter(cat => !subCategoryIds.includes(cat._id));
 
 console.log(mainCategories);
  return (
    <div className={`w-full max-h-full flex `}>
    <div className='w-1/3'>
    <h1 className={`uppercase text-3xl font-extrabold`}>{addClicked ? "Ajouter une sous categry" :  "Ajouter une catégorie"}</h1>
      <form className="mt-5 flex flex-col" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="name"
          value={formik.values.name}
          className="p-2 outline-none w-[400px] rounded-lg"
          placeholder={` ${addClicked ? 'ADD NAME SOUS  CATEGORY' : 'ADD NAME CATEGORY'} `}
        />
        {formik.touched.name && formik.errors.name && (
          <span className="text-xs font-bold text-[#71aaea] mt-1">
            {formik.errors.name}
          </span>
        )}
        <button
          className="bg-blue-200 text-[#71aaea] w-[400px] text-center p-2 uppercase mt-2"
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
    <div  className='w-2/3 flex  gap-5 flex-wrap  '>
     {mainCategories && mainCategories?.map((cat)=>(
    <>
     <div className='flex flex-col'>
     { <>
      <span onClick={()=>setCatId(cat?._id)}  key={cat?._id} className='uppercase  w-[300px] cursor-pointer relative text-xs p-2 font-bold text-white h-[max-content] bg-black rounded-lg'>{
     
     cat?.name
   
      }
    
     {catId === cat?._id && <div className='absolute  translate-y-[4px] bg-transparent p-1 text-white border-black rounded-lg right-[0px] bottom-1 flex items-center gap-2'><span  onClick={()=>{
      
      setAddClicked(!addClicked)}}><IoIosAddCircle className='p-1 text-2xl text-white' /></span> <span className='p-1' onClick={()=>dispatch(deletecategorie(cat?._id))}><FaRegTrashAlt  className='text-sm text-white' /></span>
      <span className='p-1' onClick={()=>alert('edit')} ><RiEdit2Fill   className='text-sm text-white' /></span></div>}
    
      </span>
      <span >{(cat?.subCategories?.map((x)=>(
        <div onClick={()=>setCatId(x?._id)} key={x?._id} className='text-xs relative mt-1 px-5 p-2 font-thin bg-white text-black'>{x?.name}
       {catId === x?._id && <div onClick={()=>{dispatch(deletecategorie(x?._id))
         setTimeout(()=>{
          dispatch(getcategories())
        },100)
       }} className='absolute p-3 right-[-20px] bottom-[1px]'><FaRegTrashAlt/></div>}
        </div>
      )))}</span>
     </>
      }
     
     </div>
    </>
     ))}
    </div>
    </div>
  );
};

export default AddCategory;
