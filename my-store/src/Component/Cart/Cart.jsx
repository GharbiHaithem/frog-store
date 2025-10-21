import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartDetails, deleteproductfromcart } from '../../features/cart/cartSlice'
import InputQuantity from '../InputQuantity/InputQuantity'
import { FaTrashCan } from "react-icons/fa6"
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet-async'

const Cart = ({ userfromstorage, setQuantity, quantity, handleGenerateAndUpload }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartUuid = localStorage.getItem('cartUuid')

  useEffect(() => {
    dispatch(cartDetails(cartUuid))
  }, [dispatch, cartUuid])

  const { detailscart } = useSelector(state => state?.cart)

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantity(prev => ({ ...prev, [productId]: newQuantity }))
  }

  const handledeletefromcarte = (cartid, productid) => {
    dispatch(deleteproductfromcart({ id: cartid, productId: productid }))
    setTimeout(() => {
      dispatch(cartDetails(cartUuid))
    }, 2000)
  }

  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [tt, setTT] = useState(0)

  useEffect(() => {
    if (detailscart?.items?.length) {
      const totalQuantite = detailscart.items.reduce((sum, cur) => sum + cur.quantity, 0)
      const totalprix = detailscart.items.reduce((sum, cur) => sum + (cur.product.prix - ((cur.product.prix * cur.product.promotion)/100)) * cur.quantity, 0)
      setTotalQuantity(totalQuantite)
      setTotalPrice(totalprix.toLocaleString())
      setTT((totalprix + 8).toLocaleString())
    } else {
      setTotalQuantity(0)
      setTotalPrice(0)
      setTT(0)
    }
  }, [detailscart?.items])

  return (
    <>
      <Helmet>
        <title>Mon Panier</title>
        <meta name="description" content="Page du panier pour gérer vos articles avant paiement" />
      </Helmet>

      <div className="md:w-[80%] w-full mx-auto min-h-[80vh] py-12">
        <div className="flex flex-col md:flex-row gap-8">

          {/* 🛒 Liste des produits */}
          <div className="md:w-3/4 w-full bg-white rounded-xl mt-15 shadow-lg p-6">
            <h1 className="text-2xl font-bold border-b pb-3 mb-6">Panier</h1>

            {!detailscart || detailscart.items?.length === 0 ? (
              <p className="py-20 text-center text-gray-400 text-lg">Votre panier est vide</p>
            ) : (
              <div className="flex flex-col gap-4">
                {detailscart?.items?.map((cart) => (
                  <div key={cart._id} className="flex flex-col md:flex-row items-center md:justify-between gap-4 border-b py-4 last:border-b-0">
                    
                    {/* Image et titre */}
                    <div className="flex items-center gap-4 w-full md:w-1/2">
                      <img
                        src={cart?.product?.images_product[0]?.url}
                        alt={cart?.product?.titre}
                        className="w-[100px] h-[100px] object-cover rounded-lg border"
                      />
                      <div className="flex flex-col w-full gap-1">
                        <span className="uppercase font-semibold text-sm">{cart.product.titre}</span>
                      <div className="flex justify-between gap-3 w-[100%] items-center mt-2">
  {/* Ancien prix */}
  {cart?.product?.promotion > 0 &&<span
    className={`text-gray-500 text-sm ${cart?.product?.promotion > 0 ? 'line-through' : ''}`}
  >
    {cart.product.prix} TND
  </span>}

  {/* Nouveau prix */}
  <span className="text-sm font-medium text-green-600">
    {cart.product.prix - (cart.product.prix * cart?.product?.promotion) / 100} TND
  </span>
 {cart?.product?.promotion >0 &&<span className='bg-green-200 p-2 text-green-600'>-{cart?.product?.promotion} %</span>} 
</div>

                        
                      </div>
                    </div>

                    {/* Quantité + total + supprimer */}
                    <div className="flex items-center justify-between w-full md:w-1/2 gap-4">
                      <InputQuantity
                        quantity={quantity[cart.product._id] || cart.quantity}
                        setQuantity={(newQuantity) => handleQuantityChange(cart.product._id, newQuantity)}
                      />
                      <span className="font-semibold text-gray-700">{cart.product.prix * cart.quantity} TND</span>
                      <div
                        onClick={() => handledeletefromcarte(detailscart._id, cart.product._id)}
                        className="cursor-pointer text-gray-400 hover:text-red-700 transition"
                      >
                        <FaTrashCan size={22} />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Bouton continuer mes achats */}
            {detailscart?.items?.length > 0 && (
              <button
                className="mt-8 w-full md:w-auto bg-black text-white py-3 px-6 uppercase font-medium rounded-lg hover:bg-gray-800 transition"
                onClick={() => navigate('/')}
              >
                Continuer mes achats
              </button>
            )}
          </div>

          {/* 🧾 Résumé de commande */}
      {detailscart?.items?.length > 0 && (
  <div className="md:w-1/4 w-full bg-white rounded-2xl mt-2 shadow-xl p-6 flex flex-col gap-5">
    <h2 className="text-lg font-semibold border-b pb-3 text-gray-800">Résumé</h2>

    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Articles ({totalQuantity})</span>
      <span className="font-semibold text-gray-800">{totalPrice} TND</span>
    </div>

    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Livraison</span>
      <span className="font-semibold text-gray-800">8 TND</span>
    </div>

    <div className="flex justify-between items-center font-bold text-lg border-t pt-4">
      <span className="text-gray-900">Total TTC</span>
      <span className="text-emerald-600">{tt} TND</span>
    </div>

    <button
      className="mt-6 w-full bg-emerald-600 text-white py-3 uppercase font-medium rounded-lg hover:bg-emerald-700 transition shadow-md"
      onClick={() => navigate('/commande')}
    >
      Commander
    </button>
  </div>
)}

        </div>
      </div>
    </>
  )
}

export default Cart
