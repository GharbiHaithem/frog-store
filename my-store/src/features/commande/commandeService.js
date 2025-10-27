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
export const createCommande = async(data)=>{
      console.log(data)
    const response = await axios.post(`${base_url2}/create-commande`,data)

  return await response.data
}
export const commandeByUser = async(id)=>{
      console.log(id)
    const response = await axios.get(`${base_url2}/commande/${id}`)

  return await response.data
}
export const allcommandesUser = async(id)=>{
  console.log(id)
const response = await axios.get(`${base_url2}/commande/user/${id}`)

return await response.data
}
export const commandesbyid = async(id)=>{
  console.log(id)
const response = await axios.get(`${base_url2}/getcommande/${id}`)

return await response.data
}
const commndeServices = {createCommande,commandeByUser,allcommandesUser,commandesbyid
     }
export default commndeServices
