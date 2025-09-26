import axios from 'axios'

const base_url2 ="http://localhost:5000/api"
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
 export const searchproducts = async({titre})=>{
  console.log(titre)
  const response = await axios.get(`${base_url2}/search/product?titre=${encodeURIComponent(titre)}`)
console.log(response.data)
return await response.data
}
 export const getproductsByCatParent = async(data)=>{
  console.log(data)
  
    const response = await axios.post(`${base_url2}/products/by-category/${data.id}`,{ titre: data.titre,limit:data.limit,sort:data.sort },{
      params: {
        page: data.page
      }  },   
    )
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

      createproduct,getAllproducts,getproductsByCatParent,getproductsById,searchproducts}
export default productServices

  

