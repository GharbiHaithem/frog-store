import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartDetails, deleteproductfromcart } from "../../features/cart/cartSlice";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

const Cart = ({ userfromstorage, setQuantity, quantity }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartUuid = localStorage.getItem("cartUuid");

  const [toast, setToast] = useState(null);

  useEffect(() => {
    dispatch(cartDetails(cartUuid));
  }, [dispatch, cartUuid]);

  const { detailscart, isSuccess } = useSelector((state) => state?.cart);

  useEffect(() => {
    if (isSuccess) {
      dispatch(cartDetails(cartUuid));
    }
  }, [isSuccess, cartUuid, dispatch]);

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tt, setTT] = useState(0);

  useEffect(() => {
    if (detailscart?.items?.length) {
      const totalQuantite = detailscart.items.reduce((sum, cur) => sum + cur.quantity, 0);
      const totalprix = detailscart.items.reduce(
        (sum, cur) =>
          sum +
          (cur.product.prix - (cur.product.prix * cur.product.promotion) / 100) *
            cur.quantity,
        0
      );
      setTotalQuantity(totalQuantite);
      setTotalPrice(totalprix.toLocaleString());
      setTT((totalprix + 8).toLocaleString());
    } else {
      setTotalQuantity(0);
      setTotalPrice(0);
      setTT(0);
    }
  }, [detailscart?.items]);

  const handledeletefromcarte = (cartid, productid) => {
    dispatch(deleteproductfromcart({ id: cartid, productId: productid }));
    setToast("🗑️ Produit supprimé du panier");
    setTimeout(() =>{
         dispatch(cartDetails(cartUuid));
             setToast(null)
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Mon Panier</title>
        <meta
          name="description"
          content="Page du panier pour gérer vos articles avant paiement"
        />
      </Helmet>

      {/* ✅ Message temporaire */}
      {toast && (
        <div className="fixed top-5 right-5 bg-black text-white px-5 py-3 rounded-xl shadow-lg animate-fade-in-down z-50">
          {toast}
        </div>
      )}

      <div className="md:w-[80%] w-full mx-auto min-h-[80vh]  mt-[70px] py-12">
        <div className="flex flex-col md:flex-row gap-8">

          {/* 🛒 Liste des produits */}
          <div className="md:w-3/4 w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-3 mb-6">
              Votre Panier
            </h1>

            {!detailscart || detailscart.items?.length === 0 ? (
              <p className="py-20 text-center text-gray-400 text-lg italic">
                Votre panier est vide 🛍️
              </p>
            ) : (
              <div className="flex flex-col gap-6">
                {detailscart?.items?.map((cart) => (
                  <div
                    key={cart._id}
                    className="flex flex-col md:flex-row items-center md:justify-between gap-6 border-b pb-4 last:border-none transition hover:shadow-md rounded-xl px-3 py-4 bg-gray-50/40"
                  >
                    {/* 🖼️ Image + titre */}
                    <div className="flex items-center gap-4 w-full md:w-1/2">
                      <div className="relative">
                        <img
                          src={cart?.product?.images_product[0]?.url}
                          alt={cart?.product?.titre}
                          className="w-[110px] h-[110px] object-cover rounded-xl border border-gray-200 shadow-sm hover:scale-105 transition-transform"
                        />
                        <span className="absolute -top-3 -right-3 w-[30px] h-[30px] bg-black text-white flex items-center justify-center rounded-full text-sm font-semibold shadow-md">
                          {quantity[cart.product._id] || cart.quantity}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="uppercase font-semibold text-gray-800 text-sm">
                          {cart.product.titre}
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                          {cart?.product?.promotion > 0 && (
                            <span className="text-gray-400 text-sm line-through">
                              {cart.product.prix} TND
                            </span>
                          )}
                          <span className="text-lg font-semibold text-emerald-600">
                            {cart.product.prix -
                              (cart.product.prix * cart.product.promotion) / 100}{" "}
                            TND
                          </span>
                          {cart?.product?.promotion > 0 && (
                            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-lg font-medium">
                              -{cart?.product?.promotion}%
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <span className="bg-gray-200 px-2 py-1 rounded-md text-gray-700">
                            {cart?.size}
                          </span>
                          <span className="text-gray-600">• {cart?.color}</span>
                        </div>
                      </div>
                    </div>

                    {/* 💰 Prix + Supprimer */}
                    <div className="flex items-center justify-between w-full md:w-1/2 gap-4">
                      <span className="font-semibold text-gray-800 text-lg">
                        {(cart.product.prix -
                          (cart.product.prix * cart.product.promotion) / 100) *
                          cart.quantity}{" "}
                        TND
                      </span>
                      <button
                        onClick={() =>
                          handledeletefromcarte(detailscart._id, cart.product._id)
                        }
                        className="text-gray-400 hover:text-red-600 transition transform hover:scale-110"
                      >
                        <FaTrashCan size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 🛍️ Bouton continuer */}
            {detailscart?.items?.length > 0 && (
              <button
                className="mt-8 bg-gray-900 text-white py-3 px-6 uppercase font-semibold rounded-lg hover:bg-gray-800 transition shadow-md"
                onClick={() => navigate("/")}
              >
                Continuer mes achats
              </button>
            )}
          </div>

          {/* 🧾 Résumé de commande */}
          {detailscart?.items?.length > 0 && (
            <div className="md:w-1/4 w-full bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-5 border border-gray-100">
              <h2 className="text-lg font-bold border-b pb-3 text-gray-800">
                Résumé de commande
              </h2>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Articles ({totalQuantity})</span>
                <span className="font-semibold text-gray-800">{totalPrice} TND</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Livraison</span>
                <span className="font-semibold text-gray-800">8 TND</span>
              </div>

              <div className="flex justify-between items-center font-bold text-lg border-t pt-4">
                <span className="text-gray-900">Total TTC</span>
                <span className="text-emerald-600">{tt} TND</span>
              </div>

              <button
                className="mt-6 w-full bg-emerald-600 text-white py-3 uppercase font-medium rounded-lg hover:bg-emerald-700 transition shadow-md"
                onClick={() => navigate("/commande")}
              >
                Commander
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
