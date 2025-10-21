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
export const cart = async(id)=>{
  console.log(id)
    const response = await axios.get(`${base_url2}/cart/${id}`)
  console.log(response.data)
  return await response.data
}
export const addToCart = async(data)=>{
      console.log(data)
      const response = await axios.post(`${base_url2}/add-to-cart/${data.productId}`,data)
    console.log(response.data)
    return await response.data
}
export const deletefromcart = async(data)=>{
  console.log(data)
  const response = await axios.delete(`${base_url2}/cart/${data.id}`,{data:{productId:data.productId}})
console.log(response.data)
return await response.data
}
export const deletecart = async(data)=>{
  console.log(data)
  const response = await axios.delete(`${base_url2}/cart/remove/${data}`)
console.log(response.data)
return await response.data
}
const cartServices = {
      addToCart,cart,deletefromcart,deletecart }
export default cartServices
