import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createuser, lastuser, resetState, updateUser } from '../../features/auth/authSlice';
import { createcommande } from '../../features/commande/commandeSlice';
import { useNavigate } from 'react-router';
import { cartDetails, deletecart, deleteproductfromcart } from '../../features/cart/cartSlice';

import i from '../../assets/spinner-icon-12071.gif'
import { Helmet } from 'react-helmet-async';
const Commande = ({userfromstorage,setUserRecover,setDisconnect,disconnect,userRecover}) => {
  const  dispatch = useDispatch()
 
  const [edit,setEdit]=useState({edit1:false,edit2:false,edit3:false})



const{isSuccess,message,user,isLoading,update} = useSelector(state=>state?.auth)
const{detailscart} = useSelector(state=>state?.cart)

 
  const options = [
    { label: "Masculin", value: "Masculin" },
    { label: "Feminin", value: "Feminin" }
  ];
  const options1 = [
    { label:"Payer comptant à la livraison", value1: "Payer comptant à la livraison" },

  ];
  const [selectedOption, setSelectedOption] = useState("Masculin");
  const [selectedOption1, setSelectedOption1] = useState(options1[0].value1);
 
  const[disconnection,setDisconnection] = useState(JSON.parse(localStorage.getItem('disconnect')))

  const [formData, setFormData] = useState({
    firstname:userfromstorage ? userfromstorage.firstname : '',
    lastname:userfromstorage ?userfromstorage.lastname  : '',
  
    adress:userfromstorage && userfromstorage.adress ?userfromstorage.adress : '',
  
    numtel:userfromstorage ?userfromstorage.numtel :   '',
 
    payementMethode:selectedOption1
  });
 
  useEffect(() => {
    console.log("Redux user:", user);
    if (isSuccess && !update &&(user && Object.keys(user).length > 0) ) {
      localStorage.setItem('user', JSON.stringify(user));
      setDisconnection(false)
      const newStep = {
        step1: true,
        step2: false,
        step3: false
      };
      setStep(newStep);
      localStorage.setItem('step', JSON.stringify(newStep));
    
    }
  }, [userfromstorage,user,isSuccess,update]); // Le useEffect dépend de user

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const checkboxes = [
    "Recevez les offres de nos partenaires",
    `Inscrivez-vous à notre newsletter. Vous pouvez vous désinscrire à tout moment. Vous trouverez pour cela nos informations de contact dans les conditions d'utilisation du site.`,
    "J'accepte les termes et conditions et la politique de confidentialité",
  ];



  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      gender: event.target.value,
    });
  };
  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
    setFormData({
      ...formData,
      payementMethode: event.target.value,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const [step, setStep] = useState(() => {
    const storedStep = localStorage.getItem('step');
    return storedStep ? JSON.parse(storedStep) : { step1: false, step2: false, step3: false };
  });
  
  


console.log(disconnection)
  useEffect(()=>{
    if(disconnection){
   dispatch(resetState())
const newStep = {
    step1: false,
    step2: false,
    step3: false
  };
  setStep(newStep);

  localStorage.setItem('disconnect', JSON.stringify(true) ); 
  localStorage.setItem('user', JSON.stringify({}));
 
    }
  
  },[disconnection,dispatch])
console.log(userfromstorage)
  useEffect(()=>{
    if(userfromstorage &&  Object.keys(userfromstorage).length>0  ){
      localStorage.setItem('user', JSON.stringify(userfromstorage));
   
const newStep = {
    step1: true,
    step2: false,
    step3: false
  };
  setStep(newStep)
  localStorage.setItem('step', JSON.stringify(newStep));
  setDisconnection(false)
 
  
    }
    
  },[userfromstorage])


  useEffect(() => {
    if (step) {
      localStorage.setItem('step', JSON.stringify(step));
    }
  }, [step]);
  useEffect(()=>{
    if(disconnection===false){
      localStorage.setItem('disconnect', JSON.stringify(false) ); 
    }else{
      localStorage.setItem('disconnect', JSON.stringify(true) );
    dispatch(resetState()) }
  },[disconnection,dispatch])
  useEffect(()=>{
    if(user && isSuccess && update){
const newStep = {
    step1: true,
    step2: true,
    step3: false
  };
  setStep(newStep);

  localStorage.setItem('user', JSON.stringify(user));
  
    }
    
  },[isSuccess,update,user])
  const [erreur,setErreur]=useState({})
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    let newErreur = {}; // on crée un objet vide pour stocker les erreurs

  if (!formData.lastname) {
    newErreur.lastname = "Le nom est obligatoire";
  }

  if (!formData.firstname) {
    newErreur.firstname = "Le prénom est obligatoire";
  }


  setErreur(newErreur); // on met à jour l'état avec toutes les erreurs
    if (Object.keys(newErreur).length === 0) {
    // submit form
   
    dispatch(createuser(formData));
  }
    if(isSuccess){
      const newStep = {
        step1: true,
        step2: false,
        step3: false
      };
      setStep(newStep);
  
     setDisconnection(false)
    
   
      localStorage.setItem('disconnect', JSON.stringify(false) ); 
     
 
      setEdit((prev)=>({
        ...prev,
        edit1:true,
        edit2:false,
        edit3:false
      }))
    
    }
   };
   const idUserfromDB= useSelector(state=>state?.auth)
    console.log(idUserfromDB?.user?._id)
    useEffect(()=>{
      if(isSuccess){
   localStorage.setItem('user', JSON.stringify(idUserfromDB?.user) ); 
      }
     
 
    },[isSuccess,idUserfromDB])
  const handleSubmit1 = (e) => {
    e.preventDefault();
   
    const data={
      id:JSON.parse(localStorage.getItem('user'))?._id,
    
      adress:formData.adress,
      numtel:formData.numtel
    }
   
    localStorage.setItem('disconnect', JSON.stringify(false) ); 
    let newErreur={}
    if(!formData.adress){
      newErreur.adress = "adress et required"
    }
 
    if(!formData.numtel){
      newErreur.numtel ="numéro teléphone et required"
    }

      setErreur(newErreur); 
       if (Object.keys(newErreur).length === 0) {
    // submit form
   dispatch(updateUser(data))
    const newStep1 = {
    step1: true,
    step2: true,
    step3: true
  };


  setStep(newStep1);

  }
  
  
 
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
   const newStep = {
    step1: true,
    step2: true,
    step3: true
  };
  setStep(newStep);
  localStorage.setItem('step', JSON.stringify(newStep));
  };
  console.log(userfromstorage)
  const navigate = useNavigate()
  const handleSubmit3 = (e) => {
    e.preventDefault();
    dispatch(createcommande({user:userfromstorage?._id , cart:detailscart?._id,payementMethode:formData.payementMethode,adress:formData.adress,numtel:formData.numtel}))
   setTimeout(()=>{
    navigate('/ConfirmationCommande')
    dispatch(deletecart(detailscart?._id))
   localStorage.removeItem('cartUuid')
   },1500)
    const newStep = {
    step1: true,
    step2: true,
    step3: true
  };
  setStep(newStep);
  localStorage.setItem('step', JSON.stringify(newStep));
   
  
  };
  useEffect(()=>{
    if(disconnection===true ){
      const newStep = {
        step1: false,
        step2: false,
        step3: false
      };
      setStep(newStep);
   dispatch(resetState())
    }
  },[disconnection,dispatch])
console.log(erreur)
  return (
 <>
      
       <Helmet>
         <title>Order</title>
         <meta name="Order"  content="Order Page"></meta>
       </Helmet>
 <div className='bg-white mt-[60px]'>
     <div className='md:w-[80%]  w-full h-[max-content] mt-5 p-2 mx-auto'>
      
     
      <div className='flex md:flex-row bg-white flex-col gap-3 justify-between'>
        <div className='md:w-[60%] w-full h-full mx-auto  p-2 my-5'>
          {/* Section 1: Informations personnelles */}
          <div className='flex justify-between items-center'>
            <h1 className={`px-4 py-2 my-5 text-xs font-medium uppercase tracking-wide ${step?.step1 ? 'bg-blue-600 text-white' : ' text-gray-800  bg-gray-100' }  border-l-4 border-blue-600 rounded-md`}>
 1. Informations personnelles
</h1>
        
        
          </div>
        {!isLoading ? <div>
        {step&& edit.edit1===true  ||  ( userfromstorage &&Object.keys(userfromstorage).length>0 && !isLoading )&& <div className='flex flex-col gap-5 text-xs  font-light'>
         {( userfromstorage&& Object.keys(userfromstorage)?.length > 0 && step.step1===true ) &&<span className='text-xs font-light'>Connecté en tant que {(userfromstorage?.firstname + userfromstorage?.lastname)}</span>}  
            
         { userfromstorage&&Object.keys(userfromstorage).length >0 &&  step.step1===true&& <span>Ce n'est pas vous ?<b  className='hover:text-red-500 font-semibold cursor-pointer' onClick={()=>{
         localStorage.setItem('disconnect', JSON.stringify(true));
         setDisconnection(true)
         
              setTimeout(()=>{
              
                setUserRecover({})
              },2000)
                }}> Se déconnecter</b></span>} 
           { step.step1===true&&  <span className='text-xs font-extralight'>Si vous vous déconnectez maintenant, votre panier sera vidé.</span>  } 
            </div>}
            {( !step.step1  )   && <form className='w-full flex flex-col mb-5 border-b gap-3'>
            
              <div className='w-full px-4'>
                <input
                  type='text'
                  name='lastname'
                  value={formData.lastname}
                  onChange={handleChange}
 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder='Prénom'
                    required
                />
                {erreur.lastname && <span className='text-xs mt-1 text-red-600 font-light'>{erreur.lastname}</span>}
              </div>
              <div className='w-full px-4'>
                <input
                  type='text'
               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  name='firstname'
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder='Nom de famille :'
                    required
                />
                 {erreur.firstname && <span className='text-xs mt-1 text-red-600 font-light'>{erreur.firstname}</span>}
              </div>
            
       
            <span  className='text-xs font-semibold text-red-500 p-1   px-5'>   {message}</span>
          
              <div className='flex justify-end w-full'>
                <button onClick={handleSubmit} className="bg-black p-2 text-white uppercase text-sm font-light" type="submit">
                  Continuer
                </button>
              </div>
            </form>}
          </div >: <div className='flex items-center justify-center h-[50px] w-full'><img src={i} className='w-[20px] h-[20px] ' /></div>}

          {/* Section 2: Adresses */}
          
          <div className='w-full mb-10 h-full'>
            <div className='flex justify-between items-center'>
     <h1 className={`px-4 py-2 my-5 text-xs font-medium uppercase tracking-wide ${step?.step2 ? 'bg-blue-600 text-white' : ' text-gray-800  bg-gray-100' }  border-l-4 border-blue-600 rounded-md`}>
  2. Adresses
</h1>

            
             
            </div>
           {(step.step1 && !step.step2 ) && <form className='flex flex-col gap-2 mt-5 mb-20 p-2 h-full'>
              <input
                type='text'
                name="firstname"
                  required
                value={formData.firstname}
                onChange={handleChange}
                disabled
               className="w-full px-4 py-2  bg-gray-200 text-gray-400 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <input
                type='text'
                name="lastname"
                  required
                    disabled
                value={formData.lastname}
                onChange={handleChange}
                   className="w-full px-4 bg-gray-200 py-2 text-gray-400  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <textarea
                name="adress"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder='Address'
                  required
                value={formData.adress}
                onChange={handleChange}
              ></textarea>
                 {erreur.adress && <span className='text-xs mt-1 text-red-600 font-light'>{erreur.adress}</span>}
       
           
         
              <input
                required
                type='text'
                name="numtel"
                value={formData.numtel}
                onChange={handleChange}
    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder='Téléphone'
              />
                {erreur.numtel && <span className='text-xs mt-1 text-red-600 font-light'>{erreur.numtel}</span>}
              <div className='flex justify-end w-full'>
                <button onClick={handleSubmit1}  className="bg-black p-2 text-white uppercase text-sm font-light" type="submit">
                  Continuer
                </button>
              </div>
            </form>}
          </div>

          {/* Section 3: Mode de livraison */}
      
          
          <div className='w-full h-[300px] mb-20'>
          <div className='flex justify-between border-b items-center'>
                                <h1 className={`px-4 py-2 my-5 text-xs font-medium uppercase tracking-wide ${step?.step3 ? 'bg-blue-600 text-white' : ' text-gray-800  bg-gray-100' }  border-l-4 border-blue-600 rounded-md`}>
 4 Paiement
</h1>
          
           
            </div>
            {step&&step.step3==false &&<div className='mt-10'>
              <div className='flex flex-col gap-4   items-start py-4 px-4'>
              
               {options1.map((option, index) => (
  <label
    key={option.value1}
    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition 
      ${selectedOption1 === option.value1 ? "border-blue-600 bg-blue-50" : "border-gray-300"}
    `}
  >
    <input
      type="radio"
      value={option.value1}
      checked={selectedOption1 === option.value1}
      onChange={handleOptionChange1}
      className="hidden"
    />
    <span
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center 
        ${selectedOption1 === option.value1 ? "border-blue-600" : "border-gray-400"}
      `}
    >
      {selectedOption1 === option.value1 && (
        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
      )}
    </span>

    <span className="text-gray-700 text-sm font-medium">
      {index === 1 ? <img src={option.label} alt="" /> : option.label}
    </span>
  </label>
))}

                 <div className='flex justify-end w-full'>
                <button onClick={handleSubmit3}  className="bg-black p-2 text-white uppercase text-sm font-light" type="submit">
                  Continuer
                </button>
              </div>
              </div>
             
              </div>
              
              } 
             
          </div>
        </div>
       
      </div>
    </div>
 </div>
</>
  );
};

export default Commande;
