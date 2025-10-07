import { useState } from 'react'

import './App.css'
import Navbar from './Component/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Dashboard from './Component/Dashboard/Dashboard'
import AddCategory from './Component/AddCategory/AddCategory'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './Component/AddProduct/AddProduct'
import ListProduct from './Component/ListProduct/ListProduct'
import AddBrand from './Component/AddBrand/AddBrand'
import AddBanner from './Component/AddBanner/AddBanner'

function App() {
  const[openMenu,setOpenMenu]= useState(false)

  return (
    <>
  
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Layout openMenu={openMenu} setOpenMenu={setOpenMenu} />}>
        <Route index element={<Dashboard />} />
        <Route  path='/addcategory' element={<AddCategory openMenu={openMenu} setOpenMenu={setOpenMenu} />} />
        <Route  path='/addproduct' element={<AddProduct openMenu={openMenu} setOpenMenu={setOpenMenu} />} />
        <Route  path='/listProduct' element={<ListProduct openMenu={openMenu} setOpenMenu={setOpenMenu} />} />
        <Route  path='/addbrand' element={<AddBrand openMenu={openMenu} setOpenMenu={setOpenMenu} />} />
            <Route  path='/addbanner' element={<AddBanner openMenu={openMenu} setOpenMenu={setOpenMenu} />} />
<Route  path='/editcategory/:id' element={<AddProduct openMenu={openMenu} setOpenMenu={setOpenMenu} />} />


        </Route>

      </Routes>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable={false}
pauseOnHover
theme="colored"
bodyClassName="toast-message-body"
style={{width:'700px'}}
/>
    </BrowserRouter> 
    </>
  )
}

export default App
