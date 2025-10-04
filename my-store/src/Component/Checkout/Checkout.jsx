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
import { commande as orderfn } from '../../features/commande/commandeSlice'
import { cartDetails } from "../../features/cart/cartSlice";
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
       newErreur.adress = "* adress et required"
     }
  
     if(!formData.numtel){
       newErreur.numtel ="* numéro teléphone et required"
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



  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [tt, setTT] = useState(0)

  const { commande, commandebyid } = useSelector(state => state?.commande)

 const uuid = localStorage.getItem('cartUuid')
  useEffect(() => {
    dispatch(orderfn(user?._id))
    dispatch(cartDetails(uuid))
  }, [dispatch])

  useEffect(() => {
    if (detailscart && detailscart?.items?.length) {
      const totalQuantite = detailscart?.items.reduce((sum, current) => sum + current.quantity, 0)
      setTotalQuantity(totalQuantite)

      const totalprix = detailscart?.items.reduce((sum, current) => sum + (current.product.prix - ((current.product.prix*current.product.promotion)/100)) * current.quantity, 0)
      const ttt = totalprix + 8

      const formattedPrice = totalprix.toLocaleString()
      const formattedPricett = ttt.toLocaleString()

      setTotalPrice(formattedPrice)
      setTT(formattedPricett)
    } else {
      setTotalQuantity(0)
    }
  }, [detailscart?.items, commande])
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

    <div className="bg-gray-50  py-3">
  <div className="md:w-[80%] w-[95%] mx-auto">
    {/* --- Étape 1 : Informations personnelles --- */}
    <div className="bg-white shadow-md rounded-xl p-5 mb-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-md ${
            step?.step1 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          <i className="fa-solid fa-user"></i>
          1. Informations personnelles
        </h2>
      </div>

      {!isLoading && !step.step1 && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4">
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Prénom"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Nom de famille"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 transition"
          />
          {message && (
            <span className="text-xs text-red-500 font-medium">{message}</span>
          )}
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
            >
              Continuer
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </form>
      )}
    </div>

    {/* --- Étape 2 : Adresse --- */}
    <div className="bg-white shadow-md rounded-xl p-5 mb-6 border border-gray-100">
      <h2
        className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-md ${
          step?.step2 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
        }`}
      >
        <i className="fa-solid fa-location-dot"></i>
        2. Adresse
      </h2>

      {step.step1 && !step.step2 && (
        <form onSubmit={handleSubmit1} className="flex flex-col gap-4 px-4 mt-3">
          <textarea
            name="adress"
            value={formData.adress}
            onChange={handleChange}
            placeholder={`${erreur.adress ? erreur.adress : 'Adresse complète' }`}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            name="numtel"
            value={formData.numtel}
            onChange={handleChange}
            placeholder={`${erreur.numtel ? erreur.numtel  : 'Téléphone'}  `}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 transition"
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
            >
              Suivant
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </form>
      )}
    </div>

    {/* --- Étape 3 : Paiement --- */}
    <div className="bg-white shadow-md rounded-xl p-5  border border-gray-100">
      <h2
        className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-md ${
          step?.step3 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
        }`}
      >
        <i className="fa-solid fa-credit-card"></i>
        3. Paiement
      </h2>

      {step.step2 && (
        <div className="flex flex-col gap-3 mt-3 px-4">
          {options1.map((option) => (
            <label
              key={option.value1}
              className={`flex items-center gap-3 p-3 rounded-lg border transition cursor-pointer ${
                selectedOption1 === option.value1
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                value={option.value1}
                checked={selectedOption1 === option.value1}
                onChange={handleOptionChange1}
              />
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedOption1 === option.value1
                    ? "border-blue-600"
                    : "border-gray-400"
                }`}
              >
                {selectedOption1 === option.value1 && (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                )}
              </span>
              <span className="text-sm text-gray-700 font-medium">
                {option.label}
              </span>
            </label>
          ))}

          <div className="flex justify-end mt-3">
            <button
              onClick={handleSubmit3}
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
            >
              Finaliser
              <i className="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

      <div className="md:bg-[#f9fafb] bg-white border-l px-6 py-6 h-screen border-gray-200 overflow-y-auto">
  {/* Liste des produits */}
  <div className="flex flex-col gap-4 mb-8">
    {detailscart?.items?.map((item, index) => (
      <div
        key={index}
        className="flex justify-between items-center bg-white shadow-sm hover:shadow-md transition rounded-2xl p-3 border border-gray-100"
      >
        {/* Image */}
        <div className="relative rounded-xl  border border-gray-100 shadow-sm">
          <span className="absolute -top-2 -right-2 text-xs font-bold text-white border-2 border-white rounded-lg w-7 h-7 flex items-center justify-center bg-black shadow-md">
            {item?.quantity}
          </span>
          <img
            src={item?.product?.images_product[0]?.url}
            alt={item?.product?.titre}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>

        {/* Infos produit */}
        <div className="flex flex-col flex-1 px-4">
          <span className="font-semibold text-sm text-gray-800 truncate">
            {item?.product?.titre}
          </span>
          <span className="mt-1 text-xs text-gray-500 flex items-center gap-2">
            Size :{" "}
            <span className="bg-gray-900 text-white font-light text-xs px-2 py-0.5 rounded-md border border-gray-200">
              {item?.size}
            </span>
          </span>
        </div>

        {/* Prix */}
        <span className="text-sm font-semibold text-gray-800">
          {(
            item?.product?.prix -
            (item?.product?.prix * item?.product?.promotion) / 100
          ).toFixed(3)}{" "}
          <span className="text-gray-500 text-xs">TND</span>
        </span>
      </div>
    ))}
  </div>

  {/* Résumé panier */}
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
    <div className="flex justify-between items-center text-sm text-gray-700">
      <span>Sous-total</span>
      <span className="font-medium">{totalPrice} TND</span>
    </div>

    <div className="flex justify-between items-center text-sm text-gray-700">
      <span>Livraison</span>
      <span className="font-medium">8.000 TND</span>
    </div>

    <hr className="border-gray-200" />

    <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
      <span>Total</span>
      <span>{tt} TND</span>
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
