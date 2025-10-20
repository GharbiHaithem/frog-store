import React, { useEffect, useState } from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoNotificationsOutline } from "react-icons/io5";
import './Navbar.css'
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
import { commandes, editstatus } from '../../features/commande/commandeSlice';
import { io } from 'socket.io-client';

const socket = io('https://frog-store-server.onrender.com'); 
moment.locale("fr");
const Navbar = () => {
  const dispatch = useDispatch()
   const [commandess, setCommandess] = useState([]);
  
    useEffect(() => {
    socket.on('newCommande', (newCommande) => {
      console.log('🆕 Nouvelle commande reçue :', newCommande);
      setCommandess((prev) => [newCommande, ...prev]); // ✅ ajoute en haut de la liste
    });
  
    return () => socket.off('newCommande');
  }, []);
  
  useEffect(()=>{
     dispatch(commandes());
  },[dispatch])
  const {commande}= useSelector(state=>state?.commande)
  const allCommandes = [...commandess, ...(Array.isArray(commande) ? commande : [])];
  return (
<div className='w-full fixed top-0 left-0 z-50  h-[80px]   bg-[#1d4ed7] border text-white ' >
     <div className=' px-16 py-3  '>
     <div className='flex justify-between items-center  '>
       <span className='md:text-xl font-bold text-lg  '>ADMIN PANEL </span>
     <span className='h-[25px] '>
 <Dropdown>
  <Dropdown.Toggle  className='relative'>
  <IoNotificationsOutline  style={{fontSize:'25px'}}/>
  <div className='absolute w-6 h-6 rounded-full bottom-0 text-center text-xs right-[-5px]  border-2 bg-red-800 text-white '>{allCommandes
    ?.filter(c => c?.status === "Unread")?.length   }</div>
  </Dropdown.Toggle>

<Dropdown.Menu className="w-[300px] " >
  {allCommandes
    ?.filter(c => c?.status === "Unread")        // 🔹 garde seulement les "unread"
    .slice(0, 4)                                 // 🔹 limite à 4 commandes
    .map((c, i) => (
      <Dropdown.Item
    onClick={() => {
    // ✅ 1. Modifier localement le status de la commande cliquée
    setCommandess((prev) =>
      prev.map((cmd) =>
        cmd._id === c._id ? { ...cmd, status: "Read" } : cmd
      )
    );

    // ✅ 2. Envoyer la mise à jour au backend
    dispatch(editstatus(c._id));

    // ✅ 3. (Optionnel) recharger depuis le backend plus tard
    setTimeout(() => {
      dispatch(commandes());
    }, 1000);
  }}
        key={i}
     
        className="relative p-3 mb-1 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200 border border-gray-100 cursor-pointer"
      >
        <div className="flex flex-row gap-1">
          {/* Nom et contenu */}
          <p className="text-sm font-semibold text-gray-800">
            {c?.user?.lastname + " " + c?.user?.firstname}  <span className="font-medium text-blue-600">a commandé</span>{" "}
       

         
            {c?.cart?.items?.length} articles
             </p>
        </div>

        {/* ⏱️ Temps réel */}
        <p className="absolute bottom-1 right-2 text-[10px] text-gray-400 italic">
          {moment(c?.createdAt).fromNow()}
        </p>
      </Dropdown.Item>
    ))
  }

  {/* Aucun résultat */}
  {allCommandes?.filter(c => c?.status === "Unread")?.length === 0 && (
    <div className="p-3 text-center text-gray-400 text-sm italic">
      Aucune nouvelle commande
    </div>
  )}
</Dropdown.Menu>

</Dropdown>
     </span>
     </div>
     </div>
    
     <div></div>
</div>

  )
}

export default Navbar