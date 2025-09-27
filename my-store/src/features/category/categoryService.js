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
export const createCategory = async(data)=>{
      console.log(data)
      const response = await axios.post(`${base_url2}/create-category`,data)
    console.log(response.data)
    return await response.data
}
export const getAllCategories = async()=>{
  
    const response = await axios.get(`${base_url2}/categories`)
  console.log(response.data)
  return await response.data
}
export const addSousCategory = async(data)=>{
  console.log(data)
  const response = await axios.post(`${base_url2}/categories/${data.catId}/subcategories`, data)
console.log(response.data)
return await response.data
}

export const categorydelete = async(id)=>{
  console.log(id)
  const response = await axios.delete(`${base_url2}/category/${id}`)
console.log(response.data)
return await response.data
}

export const recupereCategory = async(id)=>{
  console.log(id)
  const response = await axios.get(`${base_url2}/recuperer-cat-parent/${id}`)
console.log(response.data)
return await response.data
}
const categoryServices = {
      createCategory,getAllCategories,addSousCategory,categorydelete,recupereCategory }
export default categoryServices
