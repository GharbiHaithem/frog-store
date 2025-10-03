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
export const createbanner = async(data)=>{
      console.log(data)
      const response = await axios.post(`${base_url2}/createbanner`,data)
    console.log(response.data)
    return await response.data
}
export const getBanner= async()=>{
          const response = await axios.get(`${base_url2}/banner/get`)
           return await response.data
}
export const delBanner= async(data)=>{
          const response = await axios.post(`${base_url2}/banner/delete-img`,data)
           return await response.data
}


const bannerServices = {
      createbanner,getBanner,delBanner}
export default bannerServices