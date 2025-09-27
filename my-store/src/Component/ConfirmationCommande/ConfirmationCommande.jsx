import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commande as orderfn } from '../../features/commande/commandeSlice'
import { cartDetails } from '../../features/cart/cartSlice'
import GeneratePDF from '../GeneratePdf/GeneratePdf'
import i from '../../assets/spinner-icon-12071.gif'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'

const ConfirmationCommande = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const uuid = localStorage.getItem('cartUuid')
  const dispatch = useDispatch()

  const [pdfUrl, setPdfUrl] = useState(null)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [tt, setTT] = useState(0)

  const { commande, isLoading, commandebyid } = useSelector(state => state?.commande)
  const { detailscart } = useSelector(state => state?.cart)

  useEffect(() => {
    dispatch(orderfn(user?._id))
    dispatch(cartDetails(uuid))
  }, [dispatch])

  useEffect(() => {
    if (commande && commande?.commande?.cart?.items?.length) {
      const totalQuantite = commande?.commande?.cart?.items.reduce((sum, current) => sum + current.quantity, 0)
      setTotalQuantity(totalQuantite)

      const totalprix = commande?.commande?.cart?.items.reduce((sum, current) => sum + current.product.prix * current.quantity, 0)
      const ttt = totalprix + 7

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
         <title>Confirmation commande</title>
         <meta name="Confirmation commande"  content="page Confirmation commande"></meta>
       </Helmet>
      {!isLoading ? (
        <div className="md:w-[80%] w-full mb-20 mt-12 h-auto mx-auto">
          {/* ✅ Confirmation Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg mt-[70px]  p-5 shadow-sm">
            <h1 className="text-2xl font-semibold text-green-800">✅ Votre commande est confirmée</h1>
            <p className="text-sm text-gray-600 mt-1">
              Merci pour votre achat ! Vous recevrez un SMS/WhatsApp de confirmation bientôt.
            </p>
          </div>

          {/* ✅ Articles Commande */}
          <div className="my-8 bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl uppercase font-semibold border-b pb-3 mb-5">🛒 Articles de la commande</h1>
            <div className="flex md:flex-row flex-col gap-8">
              {/* Liste des produits */}
              <div className="flex md:w-[60%] w-full flex-col gap-6">
                {commande?.commande?.cart?.items?.map((prod) => (
                  <div
                    key={prod?._id}
                    className="flex justify-between items-center border rounded-lg p-1 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-2 w-1/2">
                      <img
                        className="w-[70px] h-[70px] rounded-md object-cover border"
                        src={prod?.product?.images_product[0]?.url}
                        alt={prod?.product?.titre}
                      />
                      <span className="text-sm font-medium">{prod?.product?.titre}</span>
                    </div>
                    <div className="flex items-center justify-between gap-6 text-sm w-1/2">
                      <span>{prod?.product?.prix},00 TND</span>
                      <span>x {prod?.quantity}</span>
                      <span className="font-semibold">{prod?.quantity * prod?.product?.prix},00 TND</span>
                    </div>
                  </div>
                ))}

                {/* ✅ Résumé prix */}
                <div className="mt-5 border-t pt-4 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{totalPrice},00 TND</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Frais de livraison</span>
                    <span>7,00 TND</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total TTC</span>
                    <span>{tt},00 TND</span>
                  </div>
                </div>
              </div>

              {/* ✅ Infos commande */}
              <div className="md:w-[40%] w-full flex flex-col gap-3 bg-gray-50 rounded-lg p-5 border">
                <h1 className="text-lg font-semibold uppercase mb-2">📦 Détails de la commande</h1>
                <span className="text-sm font-medium text-gray-700">
                  Référence : <span className="font-semibold text-gray-900">{commande?.commande?.refCommande}</span>
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Paiement : <span className="text-gray-900">Paiement à la livraison</span>
                </span>
                <span className="text-sm font-medium text-gray-700">Livraison : 24h à 48h</span>
              </div>
            </div>
          </div>

          {/* ✅ Génération PDF */}
          <GeneratePDF
            user={user}
            sendMessage2={() => console.log('sendMessage2')}
            sendMessage={() => console.log('sendMessage')}
            commande={commande?.commande}
            pdfUrl={pdfUrl}
            setPdfUrl={setPdfUrl}
          />
        </div>
      ) : (
        <div className="w-full h-[70vh] flex flex-col gap-3 items-center justify-center">
          <img src={i} className="w-[40px] h-[40px]" alt="Loading..." />
          <span className="text-gray-500 text-sm">Chargement de votre commande...</span>
        </div>
      )}
    </>
  )
}

export default ConfirmationCommande
