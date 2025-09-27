import React, { useEffect, useState } from "react";
import x from '../../assets/1acidu.webp'
import { useDispatch, useSelector } from "react-redux";
import { deletecart } from "../../features/cart/cartService";
import { createcommande } from "../../features/commande/commandeSlice";
import { useNavigate } from "react-router-dom";
import { createuser, resetState, updateUser } from "../../features/auth/authSlice";
import i from '../../assets/spinner-icon-12071.gif'
import x1 from "../../assets/aqw-removebg-preview.png";
import { Helmet } from "react-helmet-async";
const Checkout = ({userfromstorage,setUserRecover}) => {
  
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
      email:userfromstorage ?userfromstorage.email : '',
      password: '',
      adress:userfromstorage && userfromstorage.adress ?userfromstorage.adress : '',
      entreprise: '',
      gender:selectedOption,
      codepostal:userfromstorage ? userfromstorage.codepostal : '',
      numtel:userfromstorage ?userfromstorage.numtel :   '',
      ville:userfromstorage ? userfromstorage.ville : '',
      pays:userfromstorage ? userfromstorage.pays : '',
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
  
    if (!formData.email) {
      newErreur.email = "L'email est obligatoire";
    }
  
    if (!formData.password) {
      newErreur.password = "Le mot de passe est obligatoire";
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
        localStorage.setItem('user', JSON.stringify(user) ); 
   
        setEdit((prev)=>({
          ...prev,
          edit1:true,
          edit2:false,
          edit3:false
        }))
      
      }
     };
      console.log(userfromstorage?._id)
    const handleSubmit1 = (e) => {
      e.preventDefault();
     
      const data={
        id:userfromstorage?._id,
        pays:formData.pays,
        codepostal:formData.codepostal,
        ville:formData.ville,
        adress:formData.adress,
        numtel:formData.numtel
      }
     
      localStorage.setItem('disconnect', JSON.stringify(false) ); 
      let newErreur={}
      if(!formData.adress){
        newErreur.adress = "adress et required"
      }
      if(!formData.codepostal){
        newErreur.codepostal ="codepostal et required"
      }
      if(!formData.numtel){
        newErreur.numtel ="numéro teléphone et required"
      }
         if(!formData.pays){
        newErreur.pays ="pays et required"
      }
         if(!formData.ville){
        newErreur.ville ="ville  et required"
      }
        setErreur(newErreur); 
         if (Object.keys(newErreur).length === 0) {
      // submit form
     dispatch(updateUser(data))
      const newStep1 = {
      step1: true,
      step2: true,
      step3: false
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
      dispatch(createcommande({user:userfromstorage?._id , cart:detailscart?._id,ville:formData.ville,pays:formData.pays,payementMethode:formData.payementMethode,codepostal:formData.codepostal,adress:formData.adress,numtel:formData.numtel}))
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
      <title>Checkout</title>
      <meta name="Page de checkout"  content="page a propos des commande a payer"></meta>
    </Helmet>
    <div className="md:w-[80%] mx-auto w-full">
      <div className="flex items-center mt-2">
        <div className="mx-5 h-[60px]  flex flex-col  items-center text-lg font-semibold ">
         <img
                  src={x1}
                  alt="Logo"
                  className="h-[65px] w-[65px] object-contain cursor-pointer"
                  onClick={() => navigate("/")}
                />
   
        </div>
      </div>

      <hr className="border-b border-gray-200 shadow-sm" />
      <div className=" ">
      <div className="grid md:grid-cols-2 grid-cols-1  md:gap-5 items-start">

          <div className='flex md:flex-row bg-white flex-col gap-3 justify-between'>
               <div className='md:w-[60%] w-full  mx-auto  p-2 '>
                 {/* Section 1: Informations personnelles */}
                 <div className='flex justify-between items-center'>
                   <h1 className="px-4 py-2 my-5 text-xs font-medium uppercase tracking-wide bg-gray-100 border-l-4 border-blue-600 rounded-md text-gray-800">
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
                   {( !step.step1  )   && <form className='w-full flex flex-col mb-1 border-b gap-3'>
                   
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
                   
                     <div className='w-full px-4'>
                       <input
                         type='email'
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                         name='email'
                         value={formData.email}
                           required
                         onChange={handleChange}
                         placeholder='Exemple@live.domaine'
                       />
                           {erreur.email && <span className='text-xs mt-1 text-red-600 font-light'>{erreur.email}</span>}
                     </div>
                   <span  className='text-xs font-semibold text-red-500 p-1   px-5'>   {message}</span>
                    <div className='flex flex-col gap-1'>
                      <div className='w-full flex items-center gap-5 px-4'>
                       <input
                         type='password'
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                         name='password'
                         value={formData.password}
                         onChange={handleChange}
                         placeholder='Password'
                       />
                      
                 
                     
                     </div>
                       {erreur.password && <span className='text-xs mt-1 px-4 text-red-600 font-light'>{erreur.password}</span>}
                    </div>
                     <div className='flex justify-end w-full'>
                       <button onClick={handleSubmit} className="bg-black p-2 text-white uppercase text-sm font-light" type="submit">
                         Continuer
                       </button>
                     </div>
                   </form>}
                 </div >: <div className='flex items-center justify-center h-[50px] w-full'><img src={i} className='w-[20px] h-[20px] ' /></div>}
       
                 {/* Section 2: Adresses */}
                 
                 <div className='w-full mb-1 h-full'>
                   <div className='flex justify-between items-center'>
           <h1 className="px-4 py-2 my-1 text-xs font-medium uppercase tracking-wide bg-gray-100 border-l-4 border-blue-600 rounded-md text-gray-800">
         2. Adresses
       </h1>
       
                   
                    
                   </div>
                  {(step.step1 && !step.step2 ) && <form className='flex flex-col gap-2 mt-5 mb-1 p-2'>
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
                       type='text'
                       name="codepostal"
                         required
                       value={formData.codepostal}
                       onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                       placeholder='code postal'
                     />
                              {erreur.codepostal && <span className='text-xs mt-1 text-red-600 font-light'>{erreur.codepostal}</span>}
                     <input
                       type='text'
                         required
                       name="ville"
                       value={formData.ville}
                       onChange={handleChange}
           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                       placeholder='ville'
                     />
                       {erreur.ville && <span className='text-xs mt-1 text-red-600 font-light'>{erreur.ville}</span>}
                     <input
                       required
                       type='text'
                       name="pays"
                       value={formData.pays}
                       onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                       placeholder='pays'
                     />
                          {erreur.pays && <span className='text-xs mt-1 text-red-600 font-light'>{erreur.pays}</span>}
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
                 <div className='flex flex-col gap-1'>
                 <div className='flex justify-between border-b items-center'>
                            <h1 className="px-4 py-1 my-1 text-xs font-medium uppercase tracking-wide bg-gray-100 border-l-4 border-blue-600 rounded-md text-gray-800">
       3 Mode de livraison
       </h1>
                  
                  
                   </div>
             
               {step.step2===true && step.step1===true && step.step3===false  && <div  className='mb-5 h-[max-content] w-full'>
                 <h1 className='bg-gray-100 p-2  flex text-xs font-mono justify-between h-[40px]'><span>PhoneStoreTn Delivery</span><span>Livraison 24h à 48h</span>7,00 TND TTC</h1>
                 <p className='py-5 px-5 text-xs '>Si vous voulez nous laisser un message à propos de votre commande, merci de bien vouloir le renseigner dans le champ ci-contre </p>
               <textarea className='outline-none border w-full'></textarea>  
               <div className='flex justify-end w-full'>
                       <button onClick={handleSubmit2}  className="bg-black p-2 text-white uppercase text-sm font-light" type="submit">
                         Continuer
                       </button>
                     </div>
               </div>
               }
                
                 </div>
                 
                 <div className='w-full h-[max-content] mb-1'>
                 <div className='flex justify-between border-b items-center'>
                                       <h1 className="px-4 py-2 my-5 text-xs font-medium uppercase tracking-wide bg-gray-100 border-l-4 border-blue-600 rounded-md text-gray-800">
        4 Paiement
       </h1>
                 
                  
                   </div>
                   {step&&step.step3==true &&<div className='mt-10'>
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
          <div className="md:bg-[#f5f5f5] bg-white border-l px-5 py-5  h-screen border-gray-200">
          {
            detailscart?.items?.map((item,index)=>(
    <div key={index} className="flex justify-between md:w-[70%] w-full items-center">
              <div className="rounded-xl p-2 border-white border-4 relative">
                <span className="absolute right-0 text-white rounded-xl w-[30px] text-center bg-black border-white border-4 top-0">{item?.quantity}</span>
                <img src={item?.product?.images_product[0]?.url} className="w-[80px] h-[80px] object-cover" />
              </div>
         <div className="flex md:flex-row flex-col ">
               <span className="text-xs font-medium">{item?.product?.titre}</span>
              <span className="bg-black border-3 w-[30px] text-center rounded-lg text-white border-white">S</span>
         </div>
              <span className="text-xs font-normal">TND 67.200</span>
            </div>
            ))
          }
        
            <div className="md:w-[70%] w-full mt-1 flex flex-col gap-4">
              <div className="flex justify-between items-center px-2">
                <span>Subtotal</span>
                <span>TND 67.200</span>
              </div>
              <div className="flex justify-between items-center px-2">
                <span>Shipping</span>
                <span>TND 8.000</span>
              </div>
              <div className="flex justify-between text-lg font-semibold items-center px-2">
                <span>Total</span>
                <span>
                  TND 75.200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
