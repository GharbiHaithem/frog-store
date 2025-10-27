import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productByid, resetState } from '../../features/product/productSlice'
import InputQuantity from '../InputQuantity/InputQuantity'
import { cartDetails, createcart } from '../../features/cart/cartSlice'
import { Helmet } from 'react-helmet-async'
import { useMediaQuery } from 'react-responsive'
import s from '../../assets/spinner-icon-12071.gif'

const SingleProduct = ({ setQuantity, quantity }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cart, detailscart, isLoadingCart, isSuccess, message } = useSelector(state => state?.cart)
  const { productbyid, isLoading } = useSelector(state => state?.product)

  const cartUuid = localStorage.getItem('cartUuid')
  const [uuidCart, setUuidCart] = useState(cartUuid)

  const [size, setSize] = useState('S')
  const [color, setColor] = useState(null)
  const [imageSelected, setImageSelected] = useState(null)
  const [qtyStock, setQtyStock] = useState(0)

  const isSmall = useMediaQuery({ maxWidth: 640 })
  const isMedium = useMediaQuery({ minWidth: 641, maxWidth: 2024 })

  // 🔹 Reset et fetch product
  useEffect(() => {
    dispatch(resetState())
    dispatch(productByid(id))
  }, [dispatch, id])

  // 🔹 Set UUID du cart
  useEffect(() => {
    if (cart?.cartUuid) {
      localStorage.setItem('cartUuid', cart.cartUuid)
      setUuidCart(cart.cartUuid)
    } else {
      localStorage.setItem('cartUuid', null)
    }
  }, [cart?.cartUuid])

  // 🔹 Fetch details cart après succès ajout
  useEffect(() => {
    if (isSuccess) {
      dispatch(cartDetails(uuidCart))
    }
  }, [isSuccess, dispatch, uuidCart])

  // 🔹 Image sélectionnée
  useEffect(() => {
    setImageSelected(productbyid?.images_product?.[0]?.url || null)
  }, [productbyid])

  // 🔹 Scroll top après chargement
  useEffect(() => {
    if (!isLoading && productbyid) window.scrollTo({ top: 0, left: 0 })
  }, [isLoading, productbyid])

  // 🔹 Quantité stock selon size + color
  useEffect(() => {
    if (productbyid?.sizes && size) {
      const selectedSize = productbyid.sizes.find(s => s.size === size)
      if (selectedSize) {
        if (color) {
          const selectedColor = selectedSize.colors.find(c => c.color === color)
          setQtyStock(selectedColor ? selectedColor.quantity : 0)
        } else {
          // somme de toutes les couleurs si aucune couleur sélectionnée
          const totalQty = selectedSize.colors?.reduce((acc, c) => acc + c.quantity, 0) || 0
          setQtyStock(totalQty)
        }
      }
    }
  }, [size, color, productbyid])

  // 🔹 Total quantity pour "Sold out"
  const totalQuantity = productbyid?.sizes?.reduce(
    (acc, item) => acc + (item.colors?.reduce((a, c) => a + c.quantity, 0) || 0),
    0
  )

  return (
    <>
      <Helmet>
        <title>{productbyid?.titre}</title>
        <meta name={productbyid?.titre} content={productbyid?.titre}></meta>
      </Helmet>

      <div className={`md:w-[80%] ${isMedium ? 'mt-[80px]' : 'mt-[120px]'} w-[95%] mx-auto bg-white p-4 relative`}>
        {/* Loading overlay */}
        {isLoadingCart && (
          <div className="absolute w-full h-full top-0 left-0 backdrop-blur-xs z-50">
            <div className="grid h-full w-full place-items-center">
              <img src={s} className="w-[80px] h-[80px]" />
            </div>
          </div>
        )}

        {isLoading && (
          <div className="absolute top-0 flex items-center justify-center z-50 left-0 bg-white w-full h-full">
            <img src={s} className="w-[80px] h-[80px]" />
          </div>
        )}

        <div className="flex flex-col md:flex-row md:justify-between mt-5 mb-5">
          {/* --- Colonne gauche --- */}
          <div className="md:w-[40%] w-full flex flex-col gap-3">
            <div className="w-full h-auto rounded-2xl overflow-hidden shadow-sm">
              <img
                src={imageSelected}
                className="w-full md:h-full h-[350px] object-cover hover:scale-105 transition-transform duration-300"
                alt="product"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {productbyid?.images_product?.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full h-[110px] rounded-xl overflow-hidden"
                  onClick={() => setImageSelected(img.url)}
                >
                  <img
                    src={img.url}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    alt={`product-${idx}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* --- Colonne droite --- */}
          <div className="md:w-1/2 w-full">
            <h6 className="uppercase mt-3 text-xs font-extralight">Frog store</h6>
            <div className="flex items-center gap-5">
              <h5 className="text-black my-5 font-extrabold text-4xl leading-none" style={{ fontSize: '25px' }}>
                {productbyid?.titre}
              </h5>
              {totalQuantity === 0 && (
                <span className="uppercase italic text-red-500 bg-red-200 p-2 text-xs font-mono">Sold out</span>
              )}
            </div>

            <div className="flex gap-3 items-center">
              {productbyid?.promotion > 0 && (
                <span className="text-black md:font-extrabold font-mono md:text-xl text-shadow-xs leading-none line-through" style={{ fontSize: '15px' }}>
                  {productbyid?.prix.toFixed(2)} DT
                </span>
              )}
              <span className="text-red-600 font-extrabold text-4xl leading-none" style={{ fontSize: '15px' }}>
                {(productbyid?.prix - (productbyid?.prix * productbyid?.promotion) / 100).toFixed(2)} DT
              </span>
              {productbyid?.promotion > 0 && (
                <span className="bg-green-400 text-white uppercase p-1 text-xs font-semibold">
                  Economisée {(productbyid?.prix * productbyid?.promotion / 100).toFixed(2)} DT
                </span>
              )}
            </div>

            {/* --- Sizes --- */}
            <div className="flex flex-col gap-1 mt-5">
              <span className="text-xl font-extralight">Available Sizes</span>
              <div className="flex flex-wrap gap-3 mt-4 bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
                {productbyid?.sizes?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => item.colors?.some(c => c.quantity > 0) && setSize(item.size)}
                    disabled={!item.colors?.some(c => c.quantity > 0)}
                    className={`relative w-12 h-12 rounded-lg text-sm font-semibold uppercase flex items-center justify-center transition-all duration-300 ${
                      !item.colors?.some(c => c.quantity > 0)
                        ? 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed opacity-70'
                        : size === item.size
                        ? 'bg-black text-white border border-black shadow-lg scale-105'
                        : 'bg-white text-black border border-gray-300 hover:border-black hover:scale-105'
                    }`}
                  >
                    {item.size}
                    {size === item.size && (
                      <span className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3 shadow-sm"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* --- Quantity --- */}
              <div className="my-3 flex flex-col gap-1">
                <span className="text-xl font-extralight">Quantity</span>
                <InputQuantity setQuantity={setQuantity} qtyStk={qtyStock} />
              </div>

              {/* --- Colors --- */}
              {size && (
                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-xl font-extralight">Couleurs disponibles</span>
                  <div className="flex flex-wrap gap-3 bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
                    {productbyid?.sizes
                      ?.find(s => s.size === size)
                      ?.colors?.map((colObj, idx) => (
                        <div
                          key={idx}
                          onClick={() => setColor(colObj.color)}
                          className={`w-10 h-10 rounded-full cursor-pointer border-4 transition-all duration-300 ${
                            color === colObj.color ? 'border-black scale-110 shadow-lg' : 'border-gray-200 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: colObj.color }}
                          title={`${colObj.color} - Qty: ${colObj.quantity}`}
                        ></div>
                      ))}
                    {productbyid?.sizes?.find(s => s.size === size)?.colors?.length === 0 && (
                      <span className="text-gray-500 text-sm italic">Aucune couleur disponible</span>
                    )}
                  </div>
                </div>
              )}

              {/* --- Add to Cart / Buy --- */}
              <div className="mt-3 flex flex-col gap-4">
                <button
                  disabled={qtyStock === 0 || !color}
                  className={`${
                    qtyStock === 0 || !color ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100'
                  } text-sm font-light rounded-lg border p-4 transition-all`}
                  onClick={() => {
                    if (!color) return alert('Veuillez choisir une couleur !')
                    dispatch(
                      createcart({
                        cartUuid: uuidCart,
                        productId: productbyid?._id,
                        quantity,
                        size,
                        color,
                      })
                    )
                    setTimeout(() => {
                      dispatch(cartDetails(uuidCart))
                      dispatch(productByid(id))
                      setQuantity(1)
                    }, 3000)
                  }}
                >
                  Ajouter au panier
                </button>

                <button
                  disabled={qtyStock === 0 || !color}
                  className="bg-black cursor-pointer text-white text-sm font-light border rounded-lg p-4"
                  onClick={() => {
                    if (!color) return alert('Veuillez choisir une couleur !')
                    dispatch(
                      createcart({
                        cartUuid: uuidCart,
                        productId: productbyid?._id,
                        quantity,
                        size,
                        color,
                      })
                    )
                    setTimeout(() => {
                      dispatch(cartDetails(uuidCart))
                      setTimeout(() => navigate('/checkout'), 2000)
                    }, 3000)
                  }}
                >
                  Acheter maintenant
                </button>
              </div>

              {/* --- Description --- */}
              <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-2">
                  Description du produit
                </h4>
                <p
                  className="text-gray-600 leading-relaxed text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: productbyid?.description || '<p>Aucune description disponible</p>' }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleProduct
