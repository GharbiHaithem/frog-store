import React, { useEffect, useState } from 'react'
import './App.css'
import NavBar from './Component/NavBar/NavBar'
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import EmptyCart from './Component/EmptyCart/EmptyCart';
import Checkout from './Component/Checkout/Checkout';
import Home from './Page/Home/Home';
import SingleProduct from './Component/SingleProduct/SingleProduct';
import { IoIosClose } from "react-icons/io";
import Cart from './Component/Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { cartDetails } from './features/cart/cartSlice';
import Commande from './Component/Commande/Commande'
import ConfirmationCommande from './Component/ConfirmationCommande/ConfirmationCommande'
import LoginForm from './Component/LoginForm/LoginForm';
import { CiUser } from "react-icons/ci";
import Register from './Component/Register/Register';
import CommandeUser from './Component/CommandeUser/CommandeUser';
import DetailsCommande from './Component/DetailsCommande/DetailsCommande'
import { HelmetProvider } from 'react-helmet-async'
import { getcategories } from './features/category/categorySlice';
import ProductsByCategory from './Component/ProductsByCategory/ProductsByCategory';
import { searchproduct } from './features/product/productSlice';
import { useMediaQuery } from 'react-responsive';
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { PiWhatsappLogoThin } from "react-icons/pi";
function App() {
  const [openMenu, setOpenMenu] = useState(false)
  const userfromstorage = JSON.parse(localStorage.getItem('user'))|| undefined
  const navigate = useNavigate()
  const [openSearch, setOpenSearch] = useState(false)
  const [q, setQ] = useState("");
 const { detailscart } = useSelector(state => state?.cart)
  const submit = (e) => {
    e?.preventDefault();

  };
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const cartUuid = localStorage.getItem('cartUuid')

  useEffect(() => {
    if(detailscart?.items?.length){
dispatch(cartDetails(cartUuid))
    }
    
  }, [dispatch, cartUuid,detailscart?.items?.length])

 
  console.log(detailscart?.items?.length)
  const [disconnect, setDisconnect] = useState(JSON.parse(localStorage.getItem('disconnect')) || false)
  useEffect(() => {
    const getDisconnectFromStorage = JSON.parse(localStorage.getItem('disconnect'));
    setDisconnect(getDisconnectFromStorage)
  }, [])
  const { user } = useSelector(state => state?.auth)

  const [userRecover, setUserRecover] = useState(JSON.parse(localStorage.getItem('user')))
  // useEffect(()=>{
  //   dispatch(lastuser());
  // },[dispatch])
  const uuid = localStorage.getItem('cartUuid')
  console.log('uuid User:', uuid);
  useEffect(() => {

    console.log('Stored User:', userRecover);

    if (disconnect === true) {
      // Si disconnect est true, vider le localStorage (c'est là où il devient vide)
      console.log('User disconnected, clearing localStorage...');
      localStorage.setItem('user', JSON.stringify({}));
      localStorage.setItem('disconnect', JSON.stringify(true));
    }
    localStorage.setItem('disconnect', JSON.stringify(false));
  }, [dispatch, disconnect, userRecover, user]);


  console.log(userRecover?.connected)
  useEffect(() => {
    dispatch(getcategories())
  }, [dispatch])
  const { categories } = useSelector(state => state?.category)
       const [search, setSearch] = useState(null)
   
        const handleChange = (e) => {
              setSearch(e.target.value)
  
        }
        useEffect(()=>{
              if(search !== null){
                dispatch(searchproduct({titre:search}))
              }
             
            },[search,dispatch])
       
        const{productsearched}=useSelector(state=>state?.product)
          const isSmall = useMediaQuery({ maxWidth: 640 });
          const isMedium = useMediaQuery({ minWidth: 641, maxWidth: 2024 });

      useEffect(() => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isMessenger = ua.includes("FBAN") || ua.includes("FBAV") || ua.includes("Messenger");

  // 🔒 Vérifie qu'on n'a pas déjà tenté une redirection
  const alreadyRedirected = sessionStorage.getItem("redirectedFromMessenger");

  if (isMessenger && !alreadyRedirected) {
    sessionStorage.setItem("redirectedFromMessenger", "true"); // Évite les boucles

    const currentUrl = window.location.href;
    const chromeUrl = `googlechrome://${currentUrl.replace(/^https?:\/\//, '')}`;

    // 🔥 Essaie d'ouvrir dans Chrome (Android)
    window.location.href = chromeUrl;

    // ⏱️ Fallback au bout de 1,5s (iOS ou si Chrome pas installé)
    setTimeout(() => {
      alert("Veuillez ouvrir ce lien dans votre navigateur (Chrome ou Safari) pour finaliser votre commande.");
    }, 1500);
  }
}, []);
    
  return (
    <HelmetProvider>
      <div>

        <Routes>
          <Route path='/' element={<Layout cartitem={detailscart?.items?.length} setOpenSearch={setOpenSearch} openSearch={openSearch} setOpenMenu={setOpenMenu} openMenu={openMenu} />}>
            <Route index element={<Home />} />
            <Route path='/carts' element={<EmptyCart />} />
            <Route path='/productSingle/:id' element={<SingleProduct setQuantity={setQuantity} quantity={quantity} />} />
            <Route path='/cart' element={<Cart setQuantity={setQuantity} quantity={quantity} />} />
            <Route path='/checkout' element={<Checkout userfromstorage={userfromstorage} setUserRecover={setUserRecover} userRecover={userRecover} />} />
            <Route path='/commande' element={<Commande userfromstorage={userfromstorage} setUserRecover={setUserRecover} userRecover={userRecover} disconnect={disconnect} setDisconnect={setDisconnect} />} />
            <Route path='/ConfirmationCommande' element={<ConfirmationCommande />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<Register />} />
            <Route path='/commandeuser' element={<CommandeUser />} />
            <Route path='/detailscommande/:id' element={<DetailsCommande />} />
            <Route path='/produtscategory/:id' element={<ProductsByCategory />} />
          </Route>
        </Routes>



      </div>
      {openMenu && <div className={`fixed mt-[82px] ${isMedium ? 'top-0' : 'top-[60px]'} z-50  backdrop-blur-xs w-full h-[120vh]  left-0 `}>
        <div className='flex flex-col justify-between w-1/2 h-full bg-white'>
          <div className='flex flex-col h-full   my-10  mx-5  '>
          <div className='flex flex-col h-[50%] '>
              {categories?.map((cat) => (
              <span onClick={() => {

                navigate(`/produtscategory/${cat?._id}`)
                setTimeout(() => {
                  setOpenMenu(false)
                }, 200)
              }

              } className='p-4 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)]'>{cat?.name}</span>

            ))}

          </div>
          <div  className='h-[10%] py-5 flex items-center justify-center px-5'>
            <div className='flex items-center gap-2'>
<CiFacebook  style={{fontSize:'25px'}}/>
<CiLinkedin style={{fontSize:'25px'}}/>
<PiWhatsappLogoThin style={{fontSize:'25px'}} />
          </div></div>
          </div>
        
        </div>

      </div>}
      {openSearch && (
        <div className={`fixed ${isMedium ? 'top-0' : 'top-[60px]'}  left-0 w-full h-full z-50  backdrop-blur-xs`}>
          <div className="w-full h-[100px] bg-white z-50 flex items-center justify-center">
            <form onSubmit={submit} className="w-[95%] mx-auto">
              <label htmlFor="search" className="sr-only">Rechercher</label>

              <div className="relative flex items-center">
                {/* input */}
                   <div className='relative w-full'>
                        <input type='text' name='titre' onChange={handleChange} value={search} placeholder='Recherche' className=' block w-full pr-20 pl-4 py-2 border-2 border-black 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       focus:border-indigo-400  p-2 outline-none' />
                        {productsearched && productsearched?.length>0 && search?.length>0 && <span className='absolute w-full z-[1000] h-[200px] overflow-y-scroll top-10 left-0 bg-gray-50 p-2'>
     {productsearched && productsearched?.map((data)=>(
 <div key={data?._id} onClick={()=>{navigate(`/productSingle/${data?._id}`)
 setSearch('')
 setOpenSearch(!openSearch)  
 }} className='flex items-start gap-2 mt-2'>
<div  className='w-1/4'>
   <img  src={data?.images_product[0]?.url} className='w-[70px] h-[70px] object-cover' />
</div>
 <p className='w-3/4'>{data?.titre}</p>
</div>
     ))}
       </span>}
                  </div>
               

                {/* bouton loupe */}
                <button
                  type="submit"
                  aria-label="Lancer la recherche"
                  className="absolute right-10 top-1/2 -translate-y-1/2 
                       h-8 w-8 flex items-center justify-center rounded-md 
                       hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor"
                    aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
                  </svg>
                </button>

                {/* bouton close */}
                <button
                  type="button"
                  onClick={() => setOpenSearch(false)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 
                       h-8 w-8 flex items-center justify-center rounded-md 
                       hover:bg-gray-100"
                >
                  <IoIosClose className="text-2xl" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </HelmetProvider>
  )
}

export default App
