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
export const getAllBrands = async()=>{
    
    const response = await axios.get(`${base_url2}/brands/get`)

  return await response.data
}

const brandsServices = {getAllBrands
     }
export default brandsServices
