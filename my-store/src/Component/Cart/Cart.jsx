import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartDetails, deleteproductfromcart } from '../../features/cart/cartSlice'
import InputQuantity from '../InputQuantity/InputQuantity'
import { FaTrashCan } from "react-icons/fa6"
import { useNavigate } from 'react-router'

const Cart = ({ userfromstorage, setQuantity, quantity, handleGenerateAndUpload }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartUuid = localStorage.getItem('cartUuid')

  useEffect(() => {
    dispatch(cartDetails(cartUuid))
  }, [dispatch, cartUuid])

  const { detailscart } = useSelector(state => state?.cart)

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantity(prevQuantities => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }))
  }

  const handledeletefromcarte = (cartid, productid) => {
    dispatch(deleteproductfromcart({ id: cartid, productId: productid }))
 setTimeout(()=>{
       dispatch(cartDetails(cartUuid))
 },2000)
  }

  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [tt, setTT] = useState(0)

  useEffect(() => {
    if (detailscart?.items?.length) {
      const totalQuantite = detailscart.items.reduce((sum, current) => sum + current.quantity, 0)
      setTotalQuantity(totalQuantite)

      const totalprix = detailscart.items.reduce((sum, current) => sum + current.product.prix * current.quantity, 0)
      const ttt = totalprix + 7
      setTotalPrice(totalprix.toLocaleString())
      setTT(ttt.toLocaleString())
    } else {
      setTotalQuantity(0)
    }
  }, [detailscart?.items])
console.log(detailscart?.items?.length)
  return (
    <div className="md:w-[80%] w-full mx-auto min-h-[80vh] py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* 🛒 Liste produits */}
        <div className="md:w-3/4 w-full bg-white mt-[60px] rounded-lg shadow-md p-5">
          <h1 className="text-2xl font-bold border-b pb-3 mb-5">Panier</h1>

        {(!detailscart || detailscart.items?.length === 0) && (
  <p className="py-10 text-center text-gray-500">Il n'y a plus d'articles dans votre panier</p>
)}

          <div className="flex flex-col gap-5">
            {detailscart?.items?.map((cart) => (
              <div key={cart._id} className="flex flex-col md:flex-row items-center md:justify-between gap-5 border-b p-4 rounded-lg shadow-sm hover:shadow-md transition">
                {/* Image + titre */}
                <div className="flex items-center gap-4 w-full md:w-1/2">
                  <img
                    src={cart.product.images_product[0]?.url}
                    alt={cart.product.titre}
                    className="w-[80px] h-[80px] object-cover rounded-md border"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="uppercase font-medium text-sm">{cart.product.titre}</span>
                    <span className="text-red-500 font-semibold">{cart.product.prix} TND</span>
                  </div>
                </div>

                {/* Quantité + total + supprimer */}
                <div className="flex items-center justify-between w-full md:w-1/2 gap-4">
                  <InputQuantity
                    quantity={quantity[cart.product._id] || cart.quantity}
                    setQuantity={(newQuantity) => handleQuantityChange(cart.product._id, newQuantity)}
                  />
                  <span className="font-medium">{cart.product.prix * cart.quantity},00 TND</span>
                  <div onClick={() => handledeletefromcarte(detailscart._id, cart.product._id)} className="cursor-pointer text-red-500 hover:text-red-700">
                    <FaTrashCan size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bouton continuer */}
          {detailscart?.items?.length > 0 && (
            <button
              className="mt-8 w-full md:w-auto bg-black text-white py-3 px-6 uppercase font-medium rounded-md hover:bg-gray-800 transition"
              onClick={() => navigate('/')}
            >
              Continuez mes achats
            </button>
          )}
        </div>

        {/* 🧾 Résumé commande */}
        {detailscart?.items?.length > 0 && (
          <div className="md:w-1/4 w-full bg-white rounded-lg shadow-md p-5 flex flex-col gap-5">
            <h2 className="text-lg font-semibold border-b pb-2 mb-3">Résumé</h2>
            <div className="flex justify-between">
              <span>Articles ({totalQuantity})</span>
              <span className="text-red-500 font-semibold">{totalPrice},00 TND</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison</span>
              <span className="text-red-500 font-semibold">7,00 TND</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total TTC</span>
              <span className="text-red-500">{tt},00 TND</span>
            </div>

            <button
              className="mt-5 w-full bg-green-600 text-white py-3 uppercase font-medium rounded-md hover:bg-green-700 transition"
              onClick={() => navigate('/commande')}
            >
              Commander
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
