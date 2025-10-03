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
export const signup = async(data)=>{
      console.log(data)
    const response = await axios.post(`${base_url2}/signup`,data)
  console.log(response.data)
  return await response.data
}
export const getLastUser = async()=>{
  
const response = await axios.get(`${base_url2}/lastuser/get`)
console.log(response.data)
return await response.data
}
export const login = async(data)=>{
  console.log(data)
  const response = await axios.post(`${base_url2}/login`,data)
  console.log(response.data)
  return await response.data
  }
  export const addaddress = async(data)=>{
    console.log(data)
    const response = await axios.put(`${base_url2}/add/adress/${data.id}`,data)
    console.log(response.data)
    return await response.data
    }
  export const updateuser = async(data)=>{
    console.log(data)
    const response = await axios.put(`${base_url2}/update/user/${data.id}`,data)
    console.log(response.data)
    return await response.data
    }
const authServices = {signup,getLastUser,login,updateuser,addaddress
      }
export default authServices
