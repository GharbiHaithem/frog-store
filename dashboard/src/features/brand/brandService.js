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
export const createbrand = async(data)=>{
      console.log(data)
      const response = await axios.post(`${base_url2}/add-brand`,data)
    console.log(response.data)
    return await response.data
}




const brandServices = {
      createbrand}
export default brandServices