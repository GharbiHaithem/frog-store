import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createuser, login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { TfiEmail } from "react-icons/tfi";
import { PiLockKeyOpenFill } from "react-icons/pi";
import * as yup from 'yup'
import{useFormik} from 'formik'
import { CiFlag1 } from "react-icons/ci";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineHolidayVillage } from "react-icons/md";
import { CiBarcode } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
const Register = () => {
      let signupSchema = yup.object().shape({
    lastname:yup.string().required('lastname is required'),
    firstname:yup.string().required('firstname is required'),
     email:yup.string().email('format invalid email').required('email is required'),
  //   mobile:yup.number().required('mobile is required'),
    password:yup.string().required('password is required').min(4).max(20),
    adress:yup.string().required('adress is required'),
    numtel:yup.string().required('mobile phone is required').min(6),
        ville:yup.string().required('ville is required'),
            pays:yup.string().required('pays is required'),
           codepostal:yup.string().required('codepostal is required'), 
  }) 
  const dispatch = useDispatch()
  const navigate = useNavigate()
 const formik = useFormik({
    initialValues: {
      lastname: "",
      firstname: '',
      email: "",
      password: "",
      adress: "",
      numtel: "",
      ville:'',
      pays:'',
      codepostal:''
    },
    validationSchema: signupSchema,
   onSubmit: (values) => {
  console.log("🔥 Submit déclenché !");
  console.log("✅ Valeurs :", values);
  dispatch(createuser(values));
  formik.resetForm();
}
  });




  const {  message } = useSelector(state => state?.auth)



  return (
    <div className="w-full flex justify-center items-center min-h-[100vh] bg-gray-50 mt-[120px] px-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 uppercase">Creer votre compte</h1>
        
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit} >
          {/* Email */}
          <div className="relative  flex flex-col">
          <MdOutlineDriveFileRenameOutline className="absolute left-3 inset-y-0 my-auto text-gray-400" />
            <input
              type="text"
              name="firstname"
            value={formik.values.firstname} 
            onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
              placeholder="firstname"
              className={`w-full  h-11 pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 
      ${formik.touched.firstname && formik.errors.firstname ? "border-red-500" : "border-gray-300"}`}
            />
          <div className="h-4 mt-1">
    {formik.touched.firstname && formik.errors.firstname && (
      <span className="text-xs text-red-600">{formik.errors.firstname}</span>
    )}
  </div>
          </div>
 
          {/* Password */}
          <div className="relative   flex flex-col">
            <MdOutlineDriveFileRenameOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="lastname"
              value={formik.values.lastname} 
         onChange={formik.handleChange}
             onBlur={formik.handleBlur}
              placeholder="lastname"
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 
      ${formik.touched.lastname && formik.errors.lastname ? "border-red-500" : "border-gray-300"}`}
            />
                <div className="h-4 mt-1">
    {formik.touched.lastname && formik.errors.lastname && (
      <span className="text-xs text-red-600">{formik.errors.lastname}</span>
    )}
  </div>
          </div>
   <div className="relative  flex flex-col">
            <TfiEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formik.values.email} 
           onChange={formik.handleChange}
               onBlur={formik.handleBlur}
              placeholder="email"
             className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 
      ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"}`}
            />
       <div className="h-4 mt-1">
    {formik.touched.email && formik.errors.email && (
      <span className="text-xs text-red-600">{formik.errors.email}</span>
    )}
  </div>      
          </div>
           <div className="relative  flex-col">
            <PiLockKeyOpenFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
            value={formik.values.password} 
           onChange={formik.handleChange}
               onBlur={formik.handleBlur}
              placeholder="Mot de passe"
               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 
      ${formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"}`}
            />
              <div className="h-4 mt-1">
    {formik.touched.password && formik.errors.password && (
      <span className="text-xs text-red-600">{formik.errors.password}</span>
    )}
  </div>  
          </div>
             <div className="relative  flex-col">
            <MdOutlineHolidayVillage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="ville"
           value={formik.values.ville} 
          onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="ville"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 
      ${formik.touched.ville && formik.errors.ville ? "border-red-500" : "border-gray-300"}`}
            />
             <div className="h-4 mt-1">
    {formik.touched.ville && formik.errors.ville && (
      <span className="text-xs text-red-600">{formik.errors.ville}</span>
    )}
  </div>  
          </div>
             <div className="relative  flex-col">
            <CiFlag1 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="pays"
            value={formik.values.pays} 
            onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              placeholder="pays"
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 
      ${formik.touched.pays && formik.errors.pays ? "border-red-500" : "border-gray-300"}`}
            />
             <div className="h-4 mt-1">
    {formik.touched.pays && formik.errors.pays && (
      <span className="text-xs text-red-600">{formik.errors.pays}</span>
    )}
  </div>  
          </div>
            <div className="relative  flex-col">
            <CiLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="adress"
            value={formik.values.adress} 
         onChange={formik.handleChange}
             onBlur={formik.handleBlur}
              placeholder="adress"
             className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 
      ${formik.touched.adress && formik.errors.adress ? "border-red-500" : "border-gray-300"}`}
            />
             <div className="h-4 mt-1">
    {formik.touched.adress && formik.errors.adress && (
      <span className="text-xs text-red-600">{formik.errors.adress}</span>
    )}
  </div>  
          </div>
            <div className="relative  flex-col">
            <CiBarcode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="codepostal"
            value={formik.values.codepostal} 
         onChange={formik.handleChange}
             onBlur={formik.handleBlur}
              placeholder="codepostal"
               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 
      ${formik.touched.codepostal && formik.errors.codepostal ? "border-red-500" : "border-gray-300"}`}
            />
            <div className="h-4 mt-1">
    {formik.touched.codepostal && formik.errors.codepostal && (
      <span className="text-xs text-red-600">{formik.errors.codepostal}</span>
    )}
  </div>   
          </div>
            <div className="relative  flex-col">
            <CiBarcode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="numtel"
            value={formik.values.numtel} 
         onChange={formik.handleChange}
             onBlur={formik.handleBlur}
              placeholder="numtel"
               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 
      ${formik.touched.numtel && formik.errors.numtel ? "border-red-500" : "border-gray-300"}`}
            />
            <div className="h-4 mt-1">
    {formik.touched.numtel && formik.errors.numtel && (
      <span className="text-xs text-red-600">{formik.errors.numtel}</span>
    )}
  </div>   
          </div>
          {/* Bouton login */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold uppercase hover:bg-blue-700 transition duration-300"
          >
        Register
          </button>
        </form>

        {/* Option inscription */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Vous avez Un compte Deja ?{" "}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Créez-en un
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register
