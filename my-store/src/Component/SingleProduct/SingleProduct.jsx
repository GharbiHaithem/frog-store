import React, { useEffect, useState } from 'react'
import x from '../../assets/1acidu.webp'
import x1 from '../../assets/cid.webp'
import x3 from '../../assets/acid3.webp'
import s from '../../assets/spinner-icon-12071.gif'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productByid, resetState } from '../../features/product/productSlice'
import InputQuantity from '../InputQuantity/InputQuantity'
import { cartDetails, createcart } from '../../features/cart/cartSlice'

const SingleProduct = ({ setQuantity, quantity }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { cart, detailscart, isLoadingCart, isSuccess } = useSelector(state => state?.cart)
  const [uuidCart, setUuidCart] = useState(cart?.cartUuid)
  const cartUuid = localStorage.getItem('cartUuid')
  useEffect(() => {
    dispatch(resetState())
    dispatch(productByid(id))
    setTimeout(() => {

    }, 4000)
  }, [dispatch, id, cartUuid])

  console.log(id)
  useEffect(() => {
    if (cart?.cartUuid) {
      localStorage.setItem('cartUuid', cart?.cartUuid);
      setUuidCart(localStorage.getItem('cartUuid'))
    }

  }, [cart?.cartUuid])




  console.log(detailscart?.items?.length)
  const [size, setSize] = useState('S')
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const navigate = useNavigate()
  const { productbyid,isLoading } = useSelector(state => state?.product)
  return (
  <div className='md:w-[80%] mt-[80px] w-[95%] mx-auto bg-white p-4 relative'>
      {isLoadingCart&& <div className='absolute w-full h-full top-0 left-0 bg-[#dbdbdb9f]'>
        <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
          <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24">
            <path
              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
              stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path
              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
              stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
            </path>
          </svg>
        </div>
      </div>}
      {isLoading&& <div className='absolute top-0 flex items-center justify-center  z-50 left-0 bg-white w-full h-full '>
        <div>
          <img  className='w-[80px] h-[80px] ' src={s} />
        </div>
      </div>}
      <div className="flex flex-col md:flex-row md:justify-between mt-5 mb-5">
        {/* Colonne gauche */}
      {/* Colonne gauche */}
<div className='md:w-[40%] w-full flex flex-col gap-3'>
  {/* Grande image */}
  <div className="w-full h-auto border rounded-2xl overflow-hidden shadow-sm">
    <img
      src={productbyid &&productbyid?.images_product[0]?.url}
      className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
      alt="product"
    />
  </div>

  {/* 3 petites images en ligne */}
  <div className='grid grid-cols-3 gap-3'>
    <div className="w-full h-[110px] border rounded-xl overflow-hidden">
      <img
        src={productbyid?.images_product?.length > 0 && productbyid?.images_product[0]?.url}
        className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
        alt="product-thumbnail"
      />
    </div>
    <div className="w-full h-[110px] border rounded-xl overflow-hidden">
      <img
        src={productbyid?.images_product?.length > 0 && productbyid?.images_product[1] ? productbyid?.images_product[1]?.url : productbyid?.images_product[0]?.url}
        className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
        alt="product-thumbnail"
      />
    </div>
   {productbyid?.images_product[2] && <div className="w-full h-[110px] border rounded-xl overflow-hidden">
      <img
        src={productbyid?.images_product?.length > 0 && productbyid?.images_product[2] ? productbyid?.images_product[2]?.url : productbyid?.images_product[1]?.url}
        className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
        alt="product-thumbnail"
      />
    </div>}
  </div>
</div>


        {/* Colonne droite */}
        <div className='md:w-1/2 w-full'>
          <h6 className='uppercase mt-3 text-xs font-extralight'>Frog store</h6>
          <h5 className='my-5 text-base font-semibold'>{productbyid?.titre}</h5>
          <div className='flex gap-3  items-center'>

             {productbyid?.promotion>0 && <span className=' uppercase md:text-xl  text-xs md:font-extralight font-light line-through '>{productbyid?.prix} DT</span>}
            <span className=' uppercase md:text-xl  text-xs md:font-extralight font-bold'>{productbyid?.prix - ((productbyid?.prix * productbyid?.promotion) / 100)} DT</span>
          {productbyid?.promotion>0 &&   <span className='bg-green-400 text-white uppercase p-1 text-xs font-semibold'>Economisée {(productbyid?.prix * productbyid?.promotion) / 100} DT</span>}
          </div>
          <div className='flex flex-col gap-1 mt-5 '>
            <span className='uppercase text-xs font-extralight'>Size</span>
       <div className="flex flex-wrap gap-3 z-10 mt-4">
  {sizes.map((s) => (
    <button
      key={s}
      onClick={() => setSize(s)}
      className={`w-12 h-12 rounded-lg text-sm font-medium z-0 uppercase
        flex items-center justify-center border transition-all duration-200
        ${
          size === s
            ? "bg-black text-white border-black shadow-md scale-105"
            : "bg-white text-gray-800 border-gray-300 hover:border-black hover:bg-gray-100"
        }`}
    >
      {s}
    </button>
  ))}
</div>

            <div className='my-3 flex flex-col gap-1'>
              <span className='uppercase text-xs font-extralight'>Quantity</span>

              <InputQuantity setQuantity={setQuantity} />
            </div>
            <div className='mt-3 flex flex-col gap-4'>
              <button className='bg-white text-black text-sm font-light border p-4' onClick={() => { dispatch(createcart({ cartUuid: uuidCart, productId: productbyid?._id, quantity ,size})) 
            setTimeout(()=>{ dispatch(cartDetails(cartUuid))},3000)
            }}>Add To Cart</button>
              <button className='bg-black text-white text-sm font-light border p-4' onClick={() =>{
                dispatch(createcart({ cartUuid: uuidCart, productId: productbyid?._id, quantity ,size})) 
                   setTimeout(()=>{ dispatch(cartDetails(cartUuid))
                    setTimeout(()=>{   navigate('/checkout')},2000)
                   },5000)
             }}>Buy It Now</button>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default SingleProduct