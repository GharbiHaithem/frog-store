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
import { Helmet } from 'react-helmet-async'
import { useMediaQuery } from 'react-responsive'

const SingleProduct = ({ setQuantity, quantity }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { cart, detailscart, isLoadingCart, isSuccess ,message} = useSelector(state => state?.cart)
  const cartUuid = localStorage.getItem('cartUuid')
  const [uuidCart, setUuidCart] = useState(cartUuid)
  
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
    else{
      localStorage.setItem('cartUuid', null);
    }

  }, [cart?.cartUuid])

useEffect(()=>{
  if(isSuccess){
    console.log('success add to cart')
     dispatch(cartDetails(cartUuid))
      console.log(detailscart?.items?.length)
  }
},[isSuccess,dispatch])


  console.log(detailscart?.items?.length)
  const [size, setSize] = useState('S')

  const navigate = useNavigate()
  const { productbyid,isLoading ,sizes} = useSelector(state => state?.product)

  const [imageSelected,setImageSelected]= useState( productbyid?.images_product[0]?.url)
  useEffect(()=>{
    setImageSelected(productbyid?.images_product[0]?.url)
  },[productbyid])
  const [qtyStock, setQtyStock] = useState(0);
useEffect(() => {
  if (productbyid?.sizes && size) {
    const selected = productbyid.sizes.find(s => s.size === size);
    setQtyStock(selected ? selected.quantity : 0);
  }
}, [size, productbyid]);
useEffect(() => {
  if (!isLoading && productbyid) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}, [isLoading, productbyid]);
    const isSmall = useMediaQuery({ maxWidth: 640 });
    const isMedium = useMediaQuery({ minWidth: 641, maxWidth: 2024 });
    const totalQuantity = productbyid?.sizes?.reduce(
  (acc, item) => acc + (item.quantity || 0),
  0
);
console.log(totalQuantity)
  return (
     <>
      
       <Helmet>
         <title>{productbyid?.titre}</title>
         <meta name={productbyid?.titre}  content={productbyid?.titre}></meta>
       </Helmet>
  <div className={`md:w-[80%] ${isMedium ? 'mt-[80px]' : 'mt-[120px]'}  w-[95%] mx-auto bg-white p-4 relative`}>
      {isLoadingCart&& <div className='absolute w-full h-full top-0 left-0 backdrop-blur-xs'>
        <div class="grid h-full w-full place-items-center z-50 overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
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
  <div className="w-full h-auto  rounded-2xl overflow-hidden shadow-sm">
    <img
      src={productbyid &&imageSelected}
      className='w-full md:h-full h-[350px] object-cover hover:scale-105 transition-transform duration-300'
      alt="product"
    />
  </div>

  {/* 3 petites images en ligne */}
  <div className='grid grid-cols-3 gap-3'>
    <div className="w-full h-[110px]  rounded-xl overflow-hidden"  onClick={()=>setImageSelected(productbyid?.images_product[0]?.url)}>
      <img
        src={productbyid?.images_product?.length > 0 && productbyid?.images_product[0]?.url}
        className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
        alt="product-thumbnail"
      />
    </div>
    <div className="w-full h-[110px]  rounded-xl overflow-hidden" onClick={()=>setImageSelected(productbyid?.images_product[1]?.url)}>
      <img
        src={productbyid?.images_product?.length > 0 && productbyid?.images_product[1] ? productbyid?.images_product[1]?.url : productbyid?.images_product[0]?.url}
        className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
        alt="product-thumbnail"
      />
    </div>
   {productbyid?.images_product[2] && <div className="w-full h-[110px]  rounded-xl overflow-hidden" onClick={()=>setImageSelected(productbyid?.images_product[2]?.url)}>
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
        <div className='flex items-center gap-5'>
            <h5   className='text-black my-5 font-extrabold text-4xl leading-none' style={{fontSize:'25px'}}>{productbyid?.titre}</h5>
           {totalQuantity==0 && <span className='uppercase italic text-red-500 bg-red-200 p-2 text-xs  font-mono'>Sold out </span>}
        </div>
          <div className='flex gap-3  items-center'>

             {productbyid?.promotion>0 && <span  className='text-black md:font-extrabold font-mono md:text-xl  text-shadow-xs  leading-none line-through' style={{fontSize:'15px'}}>{productbyid?.prix.toFixed(2)} DT</span>}
            <span className='text-red-600 font-extrabold text-4xl leading-none' style={{fontSize:'15px'}}  >{productbyid?.prix - ((productbyid?.prix * productbyid?.promotion) / 100).toFixed(2)} DT</span>
          {productbyid?.promotion>0 &&   <span className='bg-green-400 text-white uppercase p-1 text-xs font-semibold'>Economisée {((productbyid?.prix * productbyid?.promotion) / 100).toFixed(2)} DT</span>}
          </div>
          <div className='flex flex-col gap-1 mt-5 '>
            <span className=' text-xl font-extralight'>Available Sizes</span>
       <div className="flex flex-wrap gap-3 z-0 mt-1">
<div className="flex flex-wrap gap-3 mt-4 bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
  {productbyid?.sizes?.map((item, index) => (
    <button
      key={index}
      onClick={() => item.quantity > 0 && setSize(item.size)}
      disabled={item.quantity === 0}
      className={`relative w-12 h-12 rounded-lg text-sm font-semibold uppercase
        flex items-center justify-center transition-all duration-300
        ${
          item.quantity === 0
            ? "bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed opacity-70"
            : size === item.size
            ? "bg-black text-white border border-black shadow-lg scale-105"
            : "bg-white text-black border border-gray-300 hover:border-black hover:scale-105"
        }`}
    >
      {item.size}
      {size === item.size && item.quantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3 shadow-sm"></span>
      )}
    </button>
  ))}
</div>





</div>

            <div className='my-3 flex flex-col gap-1'>
              <span className=' text-xl font-extralight'>Quantity</span>

           <InputQuantity  setQuantity={setQuantity} qtyStk={qtyStock}/>
{message && (
  <div className="mt-3 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 shadow-sm animate-pulse">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z" />
    </svg>
    <span className="text-sm font-medium">{message}</span>
  </div>
)}

            </div>
    

            <div className='mt-3 flex flex-col gap-4'>
          <button
  disabled={qtyStock === 0}
  className={`${qtyStock === 0 ? 'bg-gray-300 text-white' : 'bg-white text-black'} text-sm font-light cursor-pointer rounded-lg border p-4`}
  onClick={() => {
    dispatch(createcart({
      cartUuid: uuidCart,
      productId: productbyid?._id,
      quantity,
      size
    }));
    setTimeout(() => { dispatch(cartDetails(cartUuid))
       
         dispatch(productByid(id))
         setQuantity(1);
     }, 3000);
  }}
>
  Ajouter au panier
</button>

              <button className='bg-black cursor-pointer text-white text-sm font-light border rounded-lg p-4' onClick={() =>{
                dispatch(createcart({ cartUuid: uuidCart, productId: productbyid?._id, quantity ,size})) 
                   setTimeout(()=>{ dispatch(cartDetails(cartUuid))
                    setTimeout(()=>{   navigate('/checkout')},2000)
                   },5000)
             }}   disabled={qtyStock === 0}>Acheter maintenant</button>
                     {/* --- Description Bande --- */}
<div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
  <h4 className="text-lg font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-2">
    Description du produit
  </h4>
  <p className="text-gray-600 leading-relaxed text-sm md:text-base"   dangerouslySetInnerHTML={{ __html: productbyid?.description || "<p>Aucune description disponible</p>" }}>
   
  </p>
</div>
            </div>
          </div>

        </div>
      </div>
    </div>
</>
  )
}

export default SingleProduct