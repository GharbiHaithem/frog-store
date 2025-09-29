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
function App() {
  const [openMenu, setOpenMenu] = useState(false)
  const userfromstorage = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const [openSearch, setOpenSearch] = useState(false)
  const [q, setQ] = useState("");

  const submit = (e) => {
    e?.preventDefault();

  };
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const cartUuid = localStorage.getItem('cartUuid')

  useEffect(() => {
    dispatch(cartDetails(cartUuid))
  }, [dispatch, cartUuid])

  const { detailscart } = useSelector(state => state?.cart)
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
      {openMenu && <div className='fixed mt-[82px] z-50 w-full h-screen  left-0 top-0'>
        <div className='flex flex-col justify-between bg-white'>
          <div className='flex flex-col h-[400px] gap-5 my-10  mx-5  '>
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
          <div className='bg-gray-100 z-50 h-screen px-5  py-5 '>
            <div className='flex gap-1 items-center' onClick={() => {
              !userRecover?.connected ? navigate('/login') : navigate('/commandeuser')
              setOpenMenu(false)
            }}> <CiUser className='text-2xl' /> <span className=''>{userRecover?.connected ? 'Account' : 'Log in'} </span></div>
          </div>
        </div>

      </div>}
      {openSearch && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-[#2f2e2e51]">
          <div className="w-full h-[100px] bg-white z-50 flex items-center justify-center">
            <form onSubmit={submit} className="w-[75%] mx-auto">
              <label htmlFor="search" className="sr-only">Rechercher</label>

              <div className="relative flex items-center">
                {/* input */}
                <input
                  id="search"
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Rechercher..."
                  aria-label="Rechercher"
                  className="block w-full pr-20 pl-4 py-2 border-2 border-black 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       focus:border-indigo-400"
                />

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
