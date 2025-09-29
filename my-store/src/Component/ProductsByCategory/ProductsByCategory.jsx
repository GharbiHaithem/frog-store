import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'
import {  productsByCat } from '../../features/product/productSlice'
import { useSelector } from 'react-redux'
import ProductCard from '../ProductCard/ProductCard'

const ProductsByCategory = () => {
        const {id} = useParams()
        const dispatch = useDispatch()
        const navigate = useNavigate()
      useEffect(()=>{
          dispatch(productsByCat(id))
      },[dispatch,id])
    const{products} = useSelector(state=>state?.product)
  return (
      <div className=" md:w-[80%] mt-[80px] w-[97%] mx-auto">
   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
{products?.map((prod)=>(
      <ProductCard
      newPrice={prod?.prix-((prod?.prix*prod?.promotion)/100)}
      oldPrice={prod?.prix}
      solde={prod?.promotion}
      key={prod?._id}
      img1={prod?.images_product[0]?.url}
    
         img2={prod.images_product?.[1] ? prod.images_product?.[1]?.url : prod.images_product?.[0]?.url}
      title={prod?.titre}
         onClick={()=>{setTimeout(()=>{navigate(`/productSingle/${prod?._id}`)},200)}}
        
      />
))}
    </div>
    </div>
  )
}

export default ProductsByCategory