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

export const allcommande = async()=>{
  
const response = await axios.get(`${base_url2}/comande/all`)

return await response.data
}

export const editstatus = async(id)=>{
  
const response = await axios.put(`${base_url2}/edit/status/${id}`)

return await response.data
}
export const delorder = async(id)=>{
    console.log(id)
const response = await axios.delete(`${base_url2}/commande/${id}`)

return await response.data
}
const commndeServices = {createCommande,commandeByUser,allcommandesUser,commandesbyid,allcommande,editstatus,delorder
     }
export default commndeServices
