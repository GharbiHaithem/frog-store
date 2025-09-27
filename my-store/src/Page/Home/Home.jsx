import React, { useEffect, useState } from 'react'
import SingleProduct from '../../Component/SingleProduct/SingleProduct'
import x from '../../assets/1acidu.webp'
import x1 from '../../assets/cid.webp'
import a from '../../assets/aqw-removebg-preview.png'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../../Component/ProductCard/ProductCard'
import { useNavigate } from 'react-router-dom'
import i from '../../assets/acccc-removebg-preview.png'
import { allproduct } from '../../features/product/productSlice'
import { Helmet } from 'react-helmet-async'
const Home = () => {
const navigate=useNavigate()
const dispatch = useDispatch()
const products = useSelector((state)=>state?.product?.products)
  const [groupedProducts, setGroupedProducts] = useState({});
console.log(products)
useEffect(()=>{
  dispatch(allproduct ())
},[dispatch])
useEffect(()=>{
   const grouped= products&& products?.length>0 && products.reduce((acc, product) => {
      const catName = product.category?.name || "Sans catégorie";
       if (!acc[catName]) {
          acc[catName] = [];
        }
          acc[catName].push(product);
        return acc;

  },{})
    setGroupedProducts(grouped);
},[products])
console.log(groupedProducts)
  return (
       <>
       <Helmet>
         <title>Checkout</title>
         <meta name="Page de checkout"  content="page a propos des commande a payer"></meta>
       </Helmet>
     <div className=" md:w-[80%] mt-[80px] w-[97%] mx-auto">
     <div className='flex flex-col gap-5'>
     <div className='mt-5'>
  {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category} className="mb-10">
          {/* Nom de la catégorie */}
          <h2 className="text-2xl font-bold mb-4">{category}</h2>

          {/* Liste des produits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p, i) => (
       
                <ProductCard
          img1={p.images_product?.[0]?.url}
          img2={p.images_product?.[1] ? p.images_product?.[1]?.url : p.images_product?.[0]?.url}
          title={p?.titre}
          oldPrice="84.000 DT"
          newPrice={p.prix}
          onClick={()=>{setTimeout(()=>{navigate(`/productSingle/${p?._id}`)},200)}}
        />
            ))}
          </div>
        </div>
      ))}
      
      </div>
     </div>

          <div>

  
     </div>
     </div>

   </>
  )
}

export default Home