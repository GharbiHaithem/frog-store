import axios from 'axios'

const base_url2 ="https://frog-store-server.onrender.com/api"
const API = axios.create({baseURL:base_url2});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
export const createproduct = async(data)=>{
      console.log(data)
      const response = await axios.post(`${base_url2}/create-product`,data)
    console.log(response.data)
    return await response.data
}
 export const getAllproducts = async()=>{
  
     const response = await axios.get(`${base_url2}/getAllProduct`)
   console.log(response.data)
   return await response.data
 }
 export const getproductsByCatParent = async(data)=>{
  console.log(data)
  
    const response = await axios.get(`${base_url2}/products/by-category/${data}`)
  console.log(response.data)
  return await response.data
}
 export const deleteProduct = async(id)=>{
  console.log(id)
  
    const response = await axios.delete(`${base_url2}/${id}`)
  console.log(response.data)
  return await response.data
}
export const getproductsById = async(id)=>{
  console.log(id)
  
    const response = await axios.get(`${base_url2}/${id}`)
  console.log(response.data)
  return await response.data
}
// export const addSousCategory = async(data)=>{
//   console.log(data)
//   const response = await axios.post(`${base_url2}/categories/${data.catId}/subcategories`, data)
// console.log(response.data)
// return await response.data
// }

// export const categorydelete = async(id)=>{
//   console.log(id)
//   const response = await axios.delete(`${base_url2}/category/${id}`)
// console.log(response.data)
// return await response.data
// }
const productServices = {
      createproduct,getAllproducts,getproductsByCatParent,deleteProduct,getproductsById}
export default productServices